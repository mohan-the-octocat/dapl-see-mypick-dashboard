import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm
from statsmodels.formula.api import ols
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.stats.diagnostic import het_breuschpagan
from scipy.stats import shapiro
from sklearn.manifold import MDS
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
import os

# Set style
sns.set_theme(style="whitegrid")
output_dir = "docs/modeling_outputs"
os.makedirs(output_dir, exist_ok=True)

# --- LOAD & PREP DATA ---
sales_df = pd.read_csv("public/Data/source_data/SalesData.csv")
brand_df = pd.read_csv("public/Data/source_data/BrandRatings.csv")

# Clean Sales Data
sales_df['Sales'] = pd.to_numeric(sales_df['Sales'], errors='coerce')
missing_row = sales_df[sales_df['Sales'].isna()].iloc[0]
group_mean = sales_df[(sales_df['Location'] == missing_row['Location']) &
                      (sales_df['Type'] == missing_row['Type'])]['Sales'].mean()
sales_df['Sales'] = sales_df['Sales'].fillna(group_mean)

# --- PART 1: REGRESSION ANALYSIS ---
print("--- PART 1: REGRESSION ANALYSIS ---")

# Model A: Base Model
model_a = ols('Sales ~ C(Location) + C(Type) + SPDisc + SPMore', data=sales_df).fit()

# Model B: Interaction Model
model_b = ols('Sales ~ C(Location) * C(Type) + SPDisc + SPMore', data=sales_df).fit()

# Compare Models
print(f"Model A AIC: {model_a.aic:.2f}, Adj. R2: {model_a.rsquared_adj:.4f}")
print(f"Model B AIC: {model_b.aic:.2f}, Adj. R2: {model_b.rsquared_adj:.4f}")

# Select Best
best_model = model_a # As found previously

# --- NEW: ROBUST REGRESSION (HC3) ---
print("\n--- ROBUST REGRESSION (HC3 Correction for Heteroscedasticity) ---")
# HC3 is the recommended correction for small samples with heteroscedasticity
model_robust = ols('Sales ~ C(Location) + C(Type) + SPDisc + SPMore', data=sales_df).fit(cov_type='HC3')
print(model_robust.summary())

# Save Summaries
with open(f"{output_dir}/regression_summary.txt", "w") as f:
    f.write(model_a.summary().as_text())
with open(f"{output_dir}/regression_robust_summary.txt", "w") as f:
    f.write(model_robust.summary().as_text())

# --- ASSUMPTION TESTING ---
print("\n--- Assumption Testing ---")
residuals = model_a.resid
shapiro_test = shapiro(residuals)
print(f"Shapiro-Wilk p={shapiro_test.pvalue:.4f}")
bp_test = het_breuschpagan(residuals, model_a.model.exog)
print(f"Breusch-Pagan p={bp_test[1]:.4f}")

# Visuals
plt.figure(figsize=(6, 6))
sm.qqplot(residuals, line='45', fit=True)
plt.title("Q-Q Plot of Residuals")
plt.savefig(f"{output_dir}/qq_plot.png")
plt.close()

plt.figure(figsize=(8, 6))
sns.scatterplot(x=model_a.fittedvalues, y=residuals)
plt.axhline(0, color='red', linestyle='--')
plt.title("Residuals vs Fitted")
plt.savefig(f"{output_dir}/residuals_vs_fitted.png")
plt.close()

# --- PART 2: MDS ANALYSIS ---
print("\n--- PART 2: MDS ANALYSIS ---")
n_brands = 7
brand_names = ['MDH', 'Priya', 'MyPick', 'Ruchi', 'Nolin', 'Mother', 'Ideal']
dist_matrix = np.zeros((n_brands, n_brands))
for i in range(1, n_brands + 1):
    for j in range(i + 1, n_brands + 1):
        col_name = f"B{i}{j}"
        if col_name in brand_df.columns:
            similarity = brand_df[col_name].mean()
            distance = 8 - similarity
            dist_matrix[i-1, j-1] = distance
            dist_matrix[j-1, i-1] = distance

mds = MDS(n_components=2, dissimilarity='precomputed', random_state=42, normalized_stress='auto')
coords = mds.fit_transform(dist_matrix)
stress = mds.stress_

plt.figure(figsize=(10, 8))
plt.scatter(coords[:, 0], coords[:, 1], c='blue', s=100)
for i, txt in enumerate(brand_names):
    if txt == 'MyPick':
        plt.scatter(coords[i, 0], coords[i, 1], c='red', s=150, label='MyPick')
        plt.annotate(txt, (coords[i, 0]+0.1, coords[i, 1]), fontweight='bold', color='red')
    elif txt == 'Ideal':
        plt.scatter(coords[i, 0], coords[i, 1], c='green', s=150, label='Brand Ideal')
        plt.annotate(txt, (coords[i, 0]+0.1, coords[i, 1]), fontweight='bold', color='green')
    else:
        plt.annotate(txt, (coords[i, 0]+0.1, coords[i, 1]))
plt.title(f"Perceptual Map (MDS) - Stress: {stress:.2f}")
plt.xlabel("Dim 1: Heritage/Emotional <--- vs ---> Functional/Utility")
plt.ylabel("Dim 2: Low Perception <--- vs ---> Ideal Quality")
plt.grid(True)
plt.axhline(0, color='grey', linewidth=0.5)
plt.axvline(0, color='grey', linewidth=0.5)
plt.legend()
plt.savefig(f"{output_dir}/perceptual_map.png")
plt.close()

# --- PART 3: SEGMENTATION ANALYSIS ---
print("\n--- PART 3: SEGMENTATION ANALYSIS ---")
X_seg = brand_df.drop('Case', axis=1)
kmeans = KMeans(n_clusters=3, random_state=42, n_init=10)
brand_df['Cluster'] = kmeans.fit_predict(X_seg)
plt.figure(figsize=(8, 6))
sns.boxplot(data=brand_df, x='Cluster', y='B37', palette='Set2')
plt.title("Is Segmentation Meaningful? (MyPick Similarity to Ideal by Cluster)")
plt.savefig(f"{output_dir}/segmentation_boxplot.png")
plt.close()

print("Full Modeling Analysis complete.")
