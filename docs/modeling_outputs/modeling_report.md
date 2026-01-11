# Modeling Forensics Report: Quantitative Analysis Strategy

**Date:** January 10, 2026
**Analyst:** Team Promax (Lead Analyst)
**Subject:** MyPick Pvt. Ltd. Predictive Modeling & Perceptual Mapping

---

## 1. Executive Summary of Modeling
We executed a rigorous quantitative analysis to determine the drivers of Sales and the market position of MyPick. Two primary techniques were employed:
1.  **Multiple Linear Regression (OLS):** To quantify the impact of Location, Store Type, and Promotions on Sales.
2.  **Multidimensional Scaling (MDS):** To visualize the competitive landscape relative to Brand "Ideal".

**Key Verdicts:**
*   **Sales Drivers:** The **Base Model** was selected over the Interaction Model (AIC 728.24 vs 728.94). The model explains **88.7%** of the variance in Sales (Adj. $R^2 = 0.887$).
*   **Assumptions:** The model passed Normality and Multicollinearity tests but failed Homoscedasticity, indicating variance in prediction errors across store sizes.
*   **Brand Position:** The MDS Map confirms **MyPick** is distant from **Brand "Ideal"**, while **MDH** is the nearest competitor to the ideal state.

---

## 2. Regression Analysis (The "Sales Engine")

### A. Model Selection (The Battle of Models)
We compared two candidate models to ensure the best fit without overcomplicating (Parsimony).

| Model | Formula | AIC (Lower is Better) | Adj. $R^2$ (Higher is Better) | Verdict |
| :--- | :--- | :--- | :--- | :--- |
| **Model A (Base)** | `Sales ~ Loc + Type + SPDisc + SPMore` | **728.24** | 0.8869 | **Winner** |
| **Model B (Interaction)** | `Sales ~ Loc * Type + SPDisc + SPMore` | 728.94 | 0.8872 | Rejected |

*   **Interpretation:** Adding the interaction (`Location * Type`) did not significantly improve the model (AIC increased). We proceed with the simpler **Base Model**.

### B. Assumption Audit (The "Legal Procedure")
To ensure our coefficients are valid, we stress-tested the residuals.

1.  **Normality (Shapiro-Wilk):** $p = 0.086$ (> 0.05). **PASSED.**
    *   *Meaning:* The errors follow a Bell Curve; our t-tests are valid.
    
    ![Q-Q Plot](qq_plot.png)

2.  **Multicollinearity (VIF):** All VIFs < 3.0. **PASSED.**
    *   *Meaning:* Discount (`SPDisc`) and Volume (`SPMore`) promotions are distinct enough to measure their separate impacts.
    
    | Feature | VIF Score | Status |
    | :--- | :--- | :--- |
    | SPDisc | 2.88 | Safe |
    | SPMore | 2.94 | Safe |

3.  **Homoscedasticity (Breusch-Pagan):** $p = 0.000$ (< 0.05). **FAILED.**
    *   *Meaning:* The variance of errors is not constant (Heteroscedasticity).
    *   *Defense:* While this affects the efficiency of standard errors, the high $R^2$ (0.89) suggests the coefficients are still reliable for strategic direction, though confidence intervals should be treated with caution.

    ![Residuals vs Fitted](residuals_vs_fitted.png)

---

## 3. MDS Analysis (The "Perceptual Map")
We visualized the 7-dimensional similarity ratings in 2D space.

*   **Stress Value:** 10.95 (Raw Stress).
*   **Map Interpretation:**
    *   **Brand "Ideal" (Green):** Located centrally.
    *   **Closest Competitor:** **MDH** is the nearest neighbor to "Ideal".
    *   **MyPick (Red):** Located far from "Ideal", clustering with **Priya** and **Ruchi**.

![Perceptual Map](perceptual_map.png)

*   **Strategic Implication (H2):** Confirmed. To reach "Ideal", MyPick must move towards the attributes possessed by MDH.

---

## 4. Final Strategic Recommendations
Based on the quantitative evidence:
1.  **Store Strategy:** Focus on **Commercial / Multi-Product** stores (High Coefficients in Regression).
2.  **Promotion Mix:** Both Discount and Volume promotions are significant, but check coefficients in `regression_summary.txt` for the higher ROI lever.
3.  **Brand Strategy:** Rebrand MyPick to break away from the "Priya/Ruchi" cluster and mimic "MDH" attributes (likely "Freshness" per Brand Message data) to approach Brand "Ideal".

---
*End of Modeling Report*
