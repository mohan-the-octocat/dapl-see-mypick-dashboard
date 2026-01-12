# Promax Digital: MyPick Transformation Dashboard

## 📌 Project Overview
**Client:** MyPick Pvt. Ltd. (Pickles & Condiments Manufacturer)  
**Consultant:** Promax Digital  
**Objective:** Leverage data analytics to drive sales growth, optimize brand positioning, and refine store/promotion strategies for the upcoming fiscal year.

This React application serves as the **interactive pitch deck** for Promax's proposal to MyPick. It transforms raw Excel analysis into an engaging, data-driven story, featuring interactive visualizations, a sales simulator, and clear strategic recommendations.

## 💼 Problem Context
MyPick, a 30-year-old family business, is transitioning to a data-driven organization. The Managing Director, Mr. Rao, has provided two key datasets to shortlist a consulting partner:
1.  **Sales Data:** Annual sales from a sample of stores, including variables like Store Type (Commercial/Residential), Location (Provision/Multi-Product), and Promotion Spend (Discount vs. Volume).
2.  **Brand Perception Data:** Consumer similarity ratings (Likert 1-7) comparing MyPick against 5 competitors (Priya, Ruchi, MDH, Mother's Recipe, Nolin's) and an "Ideal" brand.

**Key Business Questions:**
*   Which store types and locations yield the best performance?
*   Which promotion strategy (Discount vs. Volume) delivers better ROI?
*   How is MyPick perceived relative to competitors and the "Ideal" brand?
*   Does the market have distinct customer segments?

## 🚀 Application Phases
The dashboard guides the client through a 5-phase narrative:
1.  **Framing & Forensics (EDA):** Auditing the evidence, identifying data limitations, and establishing research hypotheses.
2.  **Quantitative Ballistics (Modeling):** "Building the Legal Case" using OLS Regression (for Sales drivers) and Multi-Dimensional Scaling (MDS) (for Brand positioning).
3.  **Strategic Interpretation:** Turning statistical coefficients into actionable business strategy (Segmentation & ROI).
4.  **Conclusion:** The final verdict and roadmap for the next fiscal year.
5.  **Interactive Simulator:** A real-time "What-If" analysis tool allowing the client to adjust Promotion Spend and Store Location to forecast Sales based on the regression model.

## 🛠️ Tech Stack & Dependencies
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

*   **Core:** `react`, `react-dom`
*   **Styling:** `tailwindcss` (Utility-first CSS)
*   **Icons:** `lucide-react`
*   **Visualization:** `recharts` (Charts), Custom SVG implementations
*   **Analytics:** `@vercel/analytics` (Privacy-friendly simulation tracking)
*   **Data Processing:** `xlsx` (Excel parsing)

## 💻 Local Setup & Installation

### Prerequisites
*   Node.js (v14.0.0 or higher)
*   npm (v6.0.0 or higher)

### Steps
1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd dapl-see-v1
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: If you encounter peer dependency issues, use `npm install --legacy-peer-deps`.*

3.  **Run the development server:**
    ```bash
    npm start
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the dashboard in your browser.

4.  **Build for production:**
    ```bash
    npm run build
    ```
    Builds the app for production to the `build` folder.

## 📁 Repository Structure
```
dapl-see-v1/
├── docs/               # Analysis reports, raw data, and problem context
├── scripts/            # Python/JS scripts used for EDA and Modeling
├── public/
│   └── assets/         # Generated plots and visualizations
├── src/
│   ├── App.js          # Main Application Logic & UI
│   ├── index.js        # Entry point
│   └── index.css       # Global styles (Tailwind imports)
└── package.json        # Project manifest
```

## 📊 Analytics Methodology
*   **Sales Model:** OLS Regression with HC3 Robust Standard Errors (to handle heteroscedasticity).
*   **Perceptual Map:** Non-Metric Multi-Dimensional Scaling (MDS) based on dissimilarity matrices.
*   **Segmentation:** K-Means Clustering on respondent rating vectors.

---
*Created for the MyPick Strategic Transformation Pitch.*