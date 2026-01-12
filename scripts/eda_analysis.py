import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np
import os

# Set plotting style
sns.set_theme(style="whitegrid")
output_dir = "docs/eda_outputs"
os.makedirs(output_dir, exist_ok=True)

# 1. Load Data
sales_df = pd.read_csv("public/Data/source_data/SalesData.csv")
brand_df = pd.read_csv("public/Data/source_data/BrandRatings.csv")

print(f"Initial Sales Data Shape: {sales_df.shape}")
print(f"Initial Brand Data Shape: {brand_df.shape}")

# --- PART 1: SALES FORENSICS ---

# 2. Data Cleaning: Sales Data
# Row 48 has '.' for Sales. Convert to numeric and coerce errors to NaN
sales_df['Sales'] = pd.to_numeric(sales_df['Sales'], errors='coerce')

# Check for missing values
missing_sales = sales_df[sales_df['Sales'].isna()]
print(f"Detected Missing Sales at index: {missing_sales.index.tolist()}")

# Imputation Strategy (Per Plan): Group Mean based on Location and Type
# Identify the profile of the missing row (ID 48, index 47)
if not missing_sales.empty:
    missing_row = sales_df.loc[missing_sales.index[0]]
    m_loc = missing_row['Location']
    m_type = missing_row['Type']

    # Calculate group mean
    group_mean = sales_df[(sales_df['Location'] == m_loc) & (sales_df['Type'] == m_type)]['Sales'].mean()
    print(f"Imputing missing value with group mean (Location={m_loc}, Type={m_type}): {group_mean:.2f}")

    sales_df['Sales'] = sales_df['Sales'].fillna(group_mean)

# 3. Categorical Standardization
# Quick check of categories
print("Location Levels:", sales_df['Location'].unique())
print("Type Levels:", sales_df['Type'].unique())

# 4. Univariate Analysis (Visualizations)
plt.figure(figsize=(10, 6))
sns.boxplot(data=sales_df[['Sales', 'SPDisc', 'SPMore']])
plt.title("Distribution of Sales and Promotion Spend (Outlier Detection)")
plt.savefig(f"{output_dir}/sales_promo_boxplot.png")
plt.close()

plt.figure(figsize=(12, 4))
plt.subplot(1, 3, 1)
sns.histplot(sales_df['Sales'], kde=True)
plt.title("Sales Distribution")

plt.subplot(1, 3, 2)
sns.histplot(sales_df['SPDisc'], kde=True)
plt.title("Discount Promotion Distribution")

plt.subplot(1, 3, 3)
sns.histplot(sales_df['SPMore'], kde=True)
plt.title("Volume Promotion Distribution")
plt.tight_layout()
plt.savefig(f"{output_dir}/univariate_distributions.png")
plt.close()

# 5. Bivariate Analysis
# Correlation Heatmap
plt.figure(figsize=(8, 6))
corr = sales_df[['Sales', 'SPDisc', 'SPMore']].corr()
sns.heatmap(corr, annot=True, cmap='coolwarm', fmt=".2f")
plt.title("Correlation Matrix (Checking for Multicollinearity)")
plt.savefig(f"{output_dir}/correlation_heatmap.png")
plt.close()

# Relationship Discovery
plt.figure(figsize=(12, 5))
plt.subplot(1, 2, 1)
sns.scatterplot(data=sales_df, x='SPDisc', y='Sales', hue='Location')
plt.title("Sales vs. Discount Promotion")

plt.subplot(1, 2, 2)
sns.scatterplot(data=sales_df, x='SPMore', y='Sales', hue='Location')
plt.title("Sales vs. Volume Promotion")
plt.tight_layout()
plt.savefig(f"{output_dir}/sales_vs_promo_scatter.png")
plt.close()

# --- PART 2: BRAND FORENSICS (NEW) ---
print("\n--- Brand Forensics ---")

# Brand Map (From BrandCodes.csv logic)
brand_map = {
    '1': 'MDH', '2': 'Priya', '3': 'MyPick', '4': 'Ruchi',
    '5': 'Nolin', '6': 'Mother', '7': 'Ideal'
}

# A. Witness Credibility (Variance Analysis)
# Calculate standard deviation across the rating columns (excluding 'Case')
# rating_cols are all columns starting with 'B'
rating_cols = [c for c in brand_df.columns if c.startswith('B')]
brand_df['respondent_std'] = brand_df[rating_cols].std(axis=1)

# Flag straight-liners (std < 0.5 is suspicious - e.g., all 4s or 4s and 5s)
straight_liners = brand_df[brand_df['respondent_std'] < 0.5]
print(f"Suspect Witnesses (Straight-liners): {len(straight_liners)} out of {len(brand_df)}")
if len(straight_liners) > 0:
    print(f"IDs of Suspect Witnesses: {straight_liners['Case'].tolist()}")

# Visualizing Respondent Variance
plt.figure(figsize=(10, 5))
sns.histplot(brand_df['respondent_std'], kde=True, color='purple')
plt.title("Witness Credibility: Respondent Variance (incl. Brand 'Ideal')")
plt.xlabel("Standard Deviation of Ratings (Higher = More Discriminating)")
plt.savefig(f"{output_dir}/respondent_variance.png")
plt.close()

# B. The 'Ideal' Lineup (H2 Test)
# We want to know who is closest to Brand 7 (Ideal).
# Columns are B17, B27, B37... (or B71... but data seems sorted Bxy where x<y)
# Let's find columns that end with '7'
ideal_cols = [c for c in rating_cols if c.endswith('7') and len(c)==3]

# Calculate Mean Similarity to Ideal for each brand
ideal_means = {}
for col in ideal_cols:
    # Col name is like B17. The other brand is the digit that is NOT 7.
    brand_code = col.replace('B', '').replace('7', '')
    brand_name = brand_map.get(brand_code, f"Brand {brand_code}")
    ideal_means[brand_name] = brand_df[col].mean()

# Convert to DF for plotting
ideal_df = pd.DataFrame(list(ideal_means.items()), columns=['Brand', 'Mean_Similarity'])
ideal_df = ideal_df.sort_values('Mean_Similarity', ascending=False)

plt.figure(figsize=(10, 6))
sns.barplot(data=ideal_df, x='Mean_Similarity', y='Brand', hue='Brand', palette='viridis', legend=False)
plt.title("Similarity to Brand 'Ideal' (Raw Ratings)")
plt.xlabel("Mean Similarity Score (7 = Identical)")
plt.axvline(x=7, color='r', linestyle='--', label="Identical to Brand 'Ideal'")
plt.legend()
plt.savefig(f"{output_dir}/ideal_proximity_bar.png")
plt.close()

# C. The Market Texture (Heatmap of Mean Ratings)
# Calculate mean of ALL pairs to see the landscape
pair_means = brand_df[rating_cols].mean()
# We can just plot the top 15 pairs
top_pairs = pair_means.sort_values(ascending=False).head(15)

# MAP LABELS TO NAMES
mapped_labels = []
for col in top_pairs.index:
    # col is Bxy e.g. B34
    c1 = col[1]
    c2 = col[2]
    name1 = brand_map.get(c1, c1)
    name2 = brand_map.get(c2, c2)
    mapped_labels.append(f"{name1} - {name2}")

plt.figure(figsize=(12, 6))
sns.barplot(x=top_pairs.values, y=mapped_labels, hue=mapped_labels, palette='magma', legend=False)
plt.title("Top 15 Most Similar Brand Pairs (Market Clumping)")
plt.xlabel("Mean Similarity Rating (7 = Identical)")
plt.tight_layout()
plt.savefig(f"{output_dir}/top_pairs_bar.png")
plt.close()


print("Full EDA Analysis complete. Outputs saved to docs/eda_outputs/")
