import React, { useState } from 'react';
import { BarChart2, CheckCircle2, Map } from 'lucide-react';
import { Card } from '../ui/Card';
import { AccordionItem } from '../ui/AccordionItem';
import { ZoomableImage } from '../ui/ZoomableImage';
import { ASSET_PATH } from '../../config';

const Phase2 = () => {
  const [openAssumption, setOpenAssumption] = useState('normality');

  return (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div>
      <h2 className="text-2xl font-bold text-slate-800">Phase 2: Quantitative Ballistics</h2>
      <p className="text-slate-600">Building the "Legal Case" with Regression and MDS.</p>
    </div>

    {/* Regression Results */}
    <Card className="p-6">
      <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <BarChart2 className="w-5 h-5 text-emerald-500"/> Sales Drivers (Regression Analysis)
      </h3>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
           <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100 text-center">
             <div className="text-xs text-emerald-600 uppercase font-bold">Model Fit</div>
             <div className="text-2xl font-bold text-emerald-800">89%</div>
             <div className="text-[10px] text-emerald-600">Adj. R-Squared</div>
           </div>
           <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 text-center">
             <div className="text-xs text-blue-600 uppercase font-bold">Res. Lift</div>
             <div className="text-2xl font-bold text-blue-800">+103L</div>
             <div className="text-[10px] text-blue-600">Location Impact</div>
           </div>
           <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-100 text-center">
             <div className="text-xs text-indigo-600 uppercase font-bold">Disc. ROI</div>
             <div className="text-2xl font-bold text-indigo-800">1.88x</div>
             <div className="text-[10px] text-indigo-600">Sales per 1L Spend</div>
           </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-700 font-mono">
          <p className="font-bold mb-2">Equation (Base Model):</p>
          Sales = 81.13 + 103.12*(Loc=Residential) + 1.88*(SPDisc) + 0.42*(SPMore)
        </div>

        <div className="space-y-3 mt-6">
           <h4 className="font-bold text-sm text-slate-700 mb-2">Model Assumptions (Audit)</h4>
           
           <AccordionItem 
              title="Normality of Errors" 
              subtitle="Shapiro-Wilk Test (p=0.086)"
              status="PASSED"
              isOpen={openAssumption === 'normality'}
              onClick={() => setOpenAssumption(openAssumption === 'normality' ? null : 'normality')}
           >
              <div className="flex flex-col gap-4">
                 <div className="bg-slate-50 rounded-lg p-4 flex justify-center border border-slate-100">
                    <ZoomableImage src={`${ASSET_PATH}/qq_plot.png`} alt="Q-Q Plot" className="h-64 md:h-96 w-full object-contain" />
                 </div>
                 <p className="text-sm text-slate-600 px-2">The points hug the diagonal line, confirming that the model's errors are normally distributed. We can trust the p-values and confidence intervals.</p>
              </div>
           </AccordionItem>

           <AccordionItem 
              title="Multicollinearity Check" 
              subtitle="Variance Inflation Factor (VIF < 3.0)"
              status="PASSED"
              isOpen={openAssumption === 'multicollinearity'}
              onClick={() => setOpenAssumption(openAssumption === 'multicollinearity' ? null : 'multicollinearity')}
           >
               <div className="p-6 bg-slate-50 rounded-lg border border-slate-100">
                 <p className="text-sm text-slate-600">
                   <strong>Confirmed:</strong> The "Discount" and "Volume" variables are statistically distinct. 
                   There is no "conspiracy" or overlap between these two strategies in the data. All VIF scores are well below the threshold of 5.0.
                 </p>
               </div>
           </AccordionItem>

           <AccordionItem 
              title="Homoscedasticity" 
              subtitle="Breusch-Pagan Test (p=0.000)"
              status="FAILED"
              isOpen={openAssumption === 'homoscedasticity'}
              onClick={() => setOpenAssumption(openAssumption === 'homoscedasticity' ? null : 'homoscedasticity')}
           >
              <div className="flex flex-col gap-4">
                 <div className="bg-slate-50 rounded-lg p-4 flex justify-center border border-slate-100">
                    <ZoomableImage src={`${ASSET_PATH}/residuals_vs_fitted.png`} alt="Residuals" className="h-64 md:h-96 w-full object-contain" />
                 </div>
                 <div className="space-y-3 px-2">
                    <p className="text-sm text-slate-600">
                      <strong>The Problem:</strong> The error variance increases as Sales increase (funnel shape). Large stores have more volatile sales than small ones, violating the constant variance assumption.
                    </p>
                    <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg font-medium border border-red-100 flex items-center gap-3">
                       <CheckCircle2 className="w-5 h-5 shrink-0" />
                       <span><strong>The Forensic Fix:</strong> We re-validated all drivers using <strong>HC3 Robust Standard Errors</strong>. The results remained significant, confirming our strategy is mathematically bulletproof.</span>
                    </div>
                 </div>
              </div>
           </AccordionItem>
        </div>
      </div>
    </Card>

    {/* MDS Map */}
    <Card className="p-6">
      <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
        <Map className="w-5 h-5 text-purple-500"/> The Perceptual Map (MDS)
      </h3>
      <div className="bg-slate-100 rounded-lg p-4 border border-slate-200 flex items-center justify-center min-h-[300px]">
         <ZoomableImage src={`${ASSET_PATH}/perceptual_map.png`} alt="Perceptual Map" className="max-h-80 object-contain rounded shadow-sm" />
      </div>
      <div className="mt-4 text-sm text-slate-600">
        <div className="mb-2 text-xs font-mono text-slate-500">Goodness of Fit: Stress Value = 10.95 (Acceptable)</div>
        <strong>Strategic Finding:</strong> MyPick (Red) is trapped in the bottom-right "Commodity" cluster with Ruchi/Priya. 
        It is significantly distant from <strong>Brand "Ideal"</strong> (Green) and the market leader <strong>MDH</strong>.
      </div>
    </Card>
  </div>
  );
};

export default Phase2;
