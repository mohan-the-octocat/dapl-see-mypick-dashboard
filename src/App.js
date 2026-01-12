import React, { useState, useContext } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { 
  BarChart2, 
  Target, 
  Map, 
  FileText, 
  ChevronRight, 
  CheckCircle2, 
  Store,
  Users,
  TrendingUp,
  Search,
  PieChart,
  LayoutGrid,
  AlertTriangle,
  X,
  Maximize2
} from 'lucide-react';

// --- Configuration & Helpers ---
// NOTE: Images must be in the public/assets folder
const ASSET_PATH = '/assets'; 

// --- Image Zoom Context & Components ---
const ImageContext = React.createContext({
  openImage: (src, alt) => {},
  closeImage: () => {}
});

const ZoomableImage = ({ src, alt, className }) => {
  const { openImage } = useContext(ImageContext);
  return (
    <div 
      className="relative group cursor-zoom-in w-full h-full flex justify-center items-center" 
      onClick={(e) => { e.stopPropagation(); openImage(src, alt); }}
    >
      <img src={src} alt={alt} className={className} />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 rounded-lg pointer-events-none">
         <div className="bg-white/90 p-2 rounded-full shadow-sm">
            <Maximize2 className="w-5 h-5 text-slate-700" />
         </div>
      </div>
    </div>
  );
};

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = "primary", disabled = false, className = "" }) => {
  const baseStyle = "px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 text-sm";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:bg-slate-50",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50"
  };
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const AccordionItem = ({ title, subtitle, status, children, isOpen, onClick }) => (
  <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
    <button 
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-slate-50/50 hover:bg-slate-100 transition-all text-left"
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${status === 'PASSED' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
           {status === 'PASSED' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
        </div>
        <div>
          <div className="font-bold text-slate-700 text-sm">{title}</div>
          <div className="text-xs text-slate-500">{subtitle}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
         <div className={`text-xs font-bold px-2 py-1 rounded ${status === 'PASSED' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {status}
         </div>
         <ChevronRight className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
      </div>
    </button>
    {isOpen && (
      <div className="p-4 border-t border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        {children}
      </div>
    )}
  </div>
);

// --- Phase 1: Framing & EDA ---
const Phase1 = () => {
  const [activeFinding, setActiveFinding] = useState('sales');

  return (
  <div className="space-y-12 animate-in fade-in duration-500">
    <div>
      <h2 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Phase 1: Framing & Forensics</h2>
      <p className="text-lg text-slate-500 mt-2 font-medium">Defining the problem and auditing the evidence.</p>
    </div>

    {/* 1.1 Business Context (Full Wide) */}
    <Card className="overflow-hidden border-none shadow-xl bg-white group">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-80 md:h-auto relative overflow-hidden">
           <img 
             src={`${ASSET_PATH}/pickles-closeup.jpg`} 
             alt="Indian Pickles Context" 
             className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 to-transparent flex items-end p-8">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <Store className="w-5 h-5 text-yellow-400" />
                  <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Since 1996</span>
                </div>
                <h4 className="text-2xl font-black">Heritage Meets Data</h4>
              </div>
           </div>
        </div>
        <div className="flex-1 p-10 border-l-8 border-l-blue-600">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">1.1 Business Context</h3>
              <p className="text-xl text-slate-600 leading-relaxed font-medium">
                MyPick, a 30-year-old family legacy in pickles and condiments, is at a critical inflection point. 
                The mandate: <span className="text-blue-600 font-bold">Transition from intuition-based to data-driven decision making.</span>
              </p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-10">
            <div className="space-y-4">
              <h4 className="font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Primary Objectives</h4>
              <ul className="space-y-4">
                {[
                  { icon: <Target className="text-blue-600"/>, label: "Maximize Sales Revenue", desc: "Top-line growth optimization" },
                  { icon: <Map className="text-emerald-600"/>, label: "Brand Positioning", desc: "Closing the gap to the 'Ideal' brand" },
                  { icon: <Users className="text-purple-600"/>, label: "Market Segmentation", desc: "Unlocking hidden consumer clusters" }
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-default">
                    <div className="p-2 bg-white rounded-lg shadow-sm h-fit">{obj.icon}</div>
                    <div>
                      <div className="font-bold text-slate-800">{obj.label}</div>
                      <div className="text-xs text-slate-500 font-medium">{obj.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-black text-slate-400 uppercase text-xs tracking-[0.2em]">Operational Strategy</h4>
              <ul className="space-y-4">
                {[
                  { icon: <Store className="text-orange-600"/>, label: "Location Optimization", desc: "Residential vs Commercial focus" },
                  { icon: <TrendingUp className="text-blue-600"/>, label: "Promotion Efficiency", desc: "Discount vs Volume ROI Audit" }
                ].map((obj, i) => (
                  <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100 transition-all duration-300 hover:bg-white hover:shadow-lg hover:scale-105 cursor-default">
                    <div className="p-2 bg-white rounded-lg shadow-sm h-fit">{obj.icon}</div>
                    <div>
                      <div className="font-bold text-slate-800">{obj.label}</div>
                      <div className="text-xs text-slate-500 font-medium">{obj.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>

    {/* 1.2 EDA */}
    <div className="space-y-6">
        <h3 className="text-3xl font-black text-slate-900">1.2 Forensic Findings (EDA)</h3>
        
        {/* Sales Data Accordion */}
        <AccordionItem
          title="Evidence A: Sales Data Forensic Audit"
          subtitle="Distribution Analysis & Outlier Detection"
          status="PASSED"
          isOpen={activeFinding === 'sales'}
          onClick={() => setActiveFinding(activeFinding === 'sales' ? null : 'sales')}
        >
            <div className="grid lg:grid-cols-2 gap-12 items-center p-4">
                <div className="bg-slate-50 rounded-3xl p-8 flex justify-center border border-slate-100 shadow-inner">
                   <ZoomableImage src={`${ASSET_PATH}/univariate_distributions.png`} alt="Sales Distribution" className="h-80 md:h-96 w-full object-contain drop-shadow-2xl" />
                </div>
                <div className="space-y-8">
                    <div className="space-y-4">
                        <p className="text-xl font-bold text-slate-800 leading-tight">
                            The "Bimodal" Performance Signature
                        </p>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            Distribution reveals a critical bifurcation, suggesting store location/type are the primary drivers of performance variance.
                        </p>
                    </div>
                    <div className="grid gap-4 text-base">
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0"/>
                            <p className="text-blue-900"><strong>Imputation:</strong> Row 47 forensic fix using subgroup mean (93.28L).</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex gap-4">
                            <CheckCircle2 className="w-6 h-6 text-blue-600 shrink-0"/>
                            <p className="text-blue-900"><strong>Validity:</strong> Linearity confirmed OLS as the correct analytical path.</p>
                        </div>
                    </div>
                </div>
            </div>
        </AccordionItem>

        {/* Brand Data Accordion */}
        <AccordionItem
          title="Evidence B: Brand Perception Audit"
          subtitle="Respondent Quality & Market Texture"
          status="PASSED"
          isOpen={activeFinding === 'brand'}
          onClick={() => setActiveFinding(activeFinding === 'brand' ? null : 'brand')}
        >
            <div className="space-y-8 p-4">
                <div className="grid md:grid-cols-2 gap-8">
                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-3">
                            <Users className="w-6 h-6 text-purple-600"/> Witness Credibility
                        </h4>
                        <div className="bg-white rounded-xl p-4 mb-4 border border-slate-100">
                            <ZoomableImage src={`${ASSET_PATH}/respondent_variance.png`} alt="Variance analysis showing zero straight-liners" className="w-full h-48 object-contain" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium text-center">
                            <strong>0 Straight-liners detected.</strong> High-quality, discriminative data confirmed.
                        </p>
                     </div>

                     <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
                        <h4 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-3">
                            <Target className="w-6 h-6 text-purple-600"/> The "Ideal" Gap (H2)
                        </h4>
                        <div className="bg-white rounded-xl p-4 mb-4 border border-slate-100">
                            <ZoomableImage src={`${ASSET_PATH}/ideal_proximity_bar.png`} alt="Ideal Proximity Bar Chart" className="w-full h-48 object-contain" />
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed font-medium text-center">
                            <strong>MDH (4.37)</strong> leads. MyPick (2.56) lags in the commodity cluster.
                        </p>
                     </div>
                </div>

                <div className="p-8 bg-purple-50/30 rounded-3xl border-2 border-purple-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <LayoutGrid className="w-64 h-64" />
                    </div>
                    <h4 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 relative z-10">
                        <LayoutGrid className="w-8 h-8 text-purple-600"/> Market Texture & Perception
                    </h4>
                    <div className="flex flex-col lg:flex-row gap-12 items-center relative z-10">
                         <div className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm w-full lg:w-1/2">
                            <ZoomableImage src={`${ASSET_PATH}/top_pairs_bar.png`} alt="Similarity analysis showing top brand pairs" className="h-64 w-full object-contain" />
                         </div>
                         <div className="w-full lg:w-1/2 space-y-6">
                             <div className="inline-block px-4 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-black uppercase tracking-widest mb-2">
                                Critical Forensic Finding
                             </div>
                             <h5 className="text-3xl font-black text-slate-900 leading-tight">
                                The "Commodity Trap"
                             </h5>
                             <p className="text-lg text-slate-600 leading-relaxed">
                                High similarity (5.70) between <strong>MyPick and Ruchi</strong> confirms consumers perceive the brand as undifferentiated.
                             </p>
                             <div className="p-4 bg-white/50 rounded-2xl border border-purple-100">
                                <p className="text-purple-900 font-bold italic text-base">
                                    "Breaking this perception is the prerequisite for premiumization."
                                </p>
                             </div>
                         </div>
                    </div>
                </div>
            </div>
        </AccordionItem>
    </div>

    {/* 1.3 Hypotheses */}
    <Card className="p-10 border-l-8 border-l-indigo-600 bg-white shadow-xl">
        <h3 className="text-3xl font-black text-slate-900 mb-8 flex items-center gap-4">
            <FileText className="w-10 h-10 text-indigo-600"/> 1.3 Research Hypotheses
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:bg-indigo-100/50 transition-colors">
                <span className="text-indigo-600 font-black text-xl mb-2 block">H1</span>
                <p className="text-slate-700 leading-relaxed font-medium">"Buy-More" (Volume) promotions exhibit higher elasticity than "Discount" (Price).</p>
            </div>
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:bg-indigo-100/50 transition-colors">
                <span className="text-indigo-600 font-black text-xl mb-2 block">H2</span>
                <p className="text-slate-700 leading-relaxed font-medium">MyPick is perceived as "Traditional" and is significantly distant from the "Ideal" brand.</p>
            </div>
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:bg-indigo-100/50 transition-colors">
                <span className="text-indigo-600 font-black text-xl mb-2 block">H3</span>
                <p className="text-slate-700 leading-relaxed font-medium">The market is heterogeneous; Cluster Analysis will reveal distinct customer segments.</p>
            </div>
            <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 hover:bg-indigo-100/50 transition-colors">
                <span className="text-indigo-600 font-black text-xl mb-2 block">H4</span>
                <p className="text-slate-700 leading-relaxed font-medium">Multi-Product/Commercial stores yield higher sales than Provision/Residential ones.</p>
            </div>
        </div>
    </Card>

    {/* 1.4 Data Limitations */}
    <Card className="p-10 border-l-8 border-l-red-600 bg-red-50/20 shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10">
          <AlertTriangle className="w-48 h-48 text-red-600" />
      </div>
      <div className="relative z-10">
        <h3 className="text-3xl font-black text-red-900 mb-8">1.4 Data Limitations</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-6 items-start p-6 bg-white/80 rounded-2xl border-2 border-red-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="p-3 bg-red-100 rounded-xl">
              <Search className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h4 className="font-black text-red-900 text-lg">Snapshot Data constraints</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1 font-medium">Cross-sectional data for 2023. Insights are powerful for the current state but lack longitudinal seasonality trends.</p>
            </div>
          </div>
          <div className="flex gap-6 items-start p-6 bg-white/80 rounded-2xl border-2 border-red-100 shadow-sm transition-transform hover:-translate-y-1">
            <div className="p-3 bg-red-100 rounded-xl">
              <BarChart2 className="w-8 h-8 text-red-600" />
            </div>
            <div>
              <h4 className="font-black text-red-900 text-lg">Revenue-Focused Lens</h4>
              <p className="text-slate-600 text-sm leading-relaxed mt-1 font-medium">Maximizing <strong>Revenue</strong>, not Margin. Current dataset excludes COGS, directing our focus to top-line performance.</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
  );
};

// --- Phase 2: Modeling ---
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

// --- Phase 5: Simulator ---
const PhaseSimulator = () => {
  const [promoA, setPromoA] = useState(5);
  const [promoB, setPromoB] = useState(5);
  const [isResidential, setIsResidential] = useState(true);

  // Equation: 81.13 + 103.12(Loc) + 1.88(Disc) + 0.42(More)
  const base = 81.13;
  const locVal = isResidential ? 103.12 : 0;
  const discVal = 1.88 * promoA;
  const moreVal = 0.42 * promoB;
  const total = Math.round(base + locVal + discVal + moreVal);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Sales Simulator</h2>
        <p className="text-slate-600">Test the strategy with the Regression Model.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="p-6 bg-white border-2 border-blue-100 shadow-md">
          <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600"/> Interactive Sales Forecast
          </h3>
          
          <div className="space-y-6">
            <div 
              className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer hover:bg-slate-100 transition-colors" 
              onClick={() => setIsResidential(!isResidential)}
            >
              <span className="text-sm font-bold text-slate-700">Store Location</span>
              <div className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${isResidential ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                {isResidential ? "Residential (+103.12L)" : "Commercial (Baseline)"}
              </div>
            </div>

            <div className="p-4 bg-blue-50/30 rounded-xl border border-blue-50">
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                <label>Discount Spend (SPDisc)</label>
                <span className="font-mono text-blue-600 bg-white px-2 py-1 rounded border border-blue-100">{promoA} L</span>
              </div>
              <input 
                type="range" min="0" max="20" 
                value={promoA} onChange={(e) => setPromoA(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-medium">0L</span>
                <span className="text-[10px] text-blue-500 font-bold">Impact: +1.88x ROI</span>
                <span className="text-[10px] text-slate-400 font-medium">20L</span>
              </div>
            </div>

            <div className="p-4 bg-purple-50/30 rounded-xl border border-purple-50">
              <div className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                <label>Volume Spend (SPMore)</label>
                <span className="font-mono text-purple-600 bg-white px-2 py-1 rounded border border-purple-100">{promoB} L</span>
              </div>
              <input 
                type="range" min="0" max="20" 
                value={promoB} onChange={(e) => setPromoB(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between mt-2">
                <span className="text-[10px] text-slate-400 font-medium">0L</span>
                <span className="text-[10px] text-purple-500 font-bold">Impact: +0.42x (Inefficient)</span>
                <span className="text-[10px] text-slate-400 font-medium">20L</span>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Projected Annual Sales</div>
              <div className="bg-slate-900 rounded-2xl p-6 text-center shadow-inner">
                <div className="text-5xl font-black text-white flex items-center justify-center gap-3">
                  {total} <span className="text-xl text-blue-400 font-bold uppercase">Lakhs</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 font-mono">Equation: 81.13 + 103.12(Loc) + 1.88(Disc) + 0.42(More)</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Phase 3: Strategy ---
const Phase3 = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-800">Phase 3: Strategic Interpretation</h2>
        <p className="text-slate-600">Turning Coefficients into Cash Flow.</p>
      </div>

      {/* Segmentation Context */}
      <Card className="p-6 border-l-4 border-l-purple-500">
        <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-500"/> Market Segmentation (H3 Verified)
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="flex flex-col bg-slate-50 rounded-xl border border-slate-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop" alt="Traditionalist" className="w-full h-32 object-cover opacity-80" />
            <div className="p-4">
              <div className="font-bold text-slate-700 mb-1">Cluster 0: "Traditionalists"</div>
              <p className="text-xs text-slate-500">Largest group. They view <strong>MDH as Ideal</strong>. Hard to convert.</p>
            </div>
          </div>
          <div className="flex flex-col bg-blue-50 rounded-xl border border-blue-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop" alt="Believer" className="w-full h-32 object-cover opacity-80" />
            <div className="p-4">
              <div className="font-bold text-blue-800 mb-1">Cluster 1: "The Believers"</div>
              <p className="text-xs text-blue-600">High-value niche. <strong>MyPick is Ideal</strong>. Retain & Clone.</p>
            </div>
          </div>
          <div className="flex flex-col bg-green-50 rounded-xl border border-green-100 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop" alt="Opportunity" className="w-full h-32 object-cover opacity-80" />
            <div className="p-4">
              <div className="font-bold text-green-800 mb-1">Cluster 2: "The Opportunity"</div>
              <p className="text-xs text-green-600">They rate MDH poorly. The "Gap" in the market. <strong>Prime Target</strong>.</p>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400 font-mono border-t border-slate-100 pt-3">
          <PieChart className="w-3 h-3"/> Silhouette Score = 0.52 (Meaningful Separation)
        </div>
      </Card>

      <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-5 border-l-4 border-l-green-500">
             <h4 className="font-bold text-slate-800 mb-1">Store Strategy: "Residential First"</h4>
             <p className="text-sm text-slate-600">
               <strong>Action:</strong> De-prioritize Commercial expansion. The data proves Residential locations are the sole driver of store performance ($p=0.000$).
             </p>
          </Card>

          <Card className="p-5 border-l-4 border-l-red-500">
             <h4 className="font-bold text-slate-800 mb-1">Promo Strategy: "Phased Reduction"</h4>
             <p className="text-sm text-slate-600">
               <strong>Action:</strong> Stop the cash bleed. "Buy-More" offers have no significant impact ($p=0.53$). Reallocate budget to Discounts.
             </p>
          </Card>

          <Card className="p-5 border-l-4 border-l-indigo-500 bg-indigo-50">
             <h4 className="font-bold text-indigo-900 mb-1">Brand Strategy: "Dual-Track"</h4>
             <p className="text-sm text-indigo-800">
               <strong>Innovation:</strong> Don't force MyPick up-market.
               <br/>1. <strong>Legacy MyPick:</strong> Pivot to "Value Leader" (Price Fighter).
               <br/>2. <strong>New Sub-Brand:</strong> Launch a premium brand to chase "Ideal" (Cluster 2).
             </p>
          </Card>
      </div>
    </div>
  );
};

// --- Phase 4: Conclusion ---
const Phase4 = ({ goToSimulator }) => (
  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="text-center py-12">
      <div className="inline-flex items-center justify-center p-5 bg-green-100 text-green-700 rounded-full mb-6 shadow-sm border-4 border-white">
        <CheckCircle2 className="w-12 h-12" />
      </div>
      <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Case Closed</h2>
      <p className="text-xl text-slate-500 mt-4 max-w-2xl mx-auto leading-relaxed italic">
        "MyPick is a Residential-First brand trapped in a Commodity perception. 
        We have the map to get out."
      </p>
    </div>

    <div className="grid lg:grid-cols-2 gap-8">
      {/* Strategic Verdicts */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6">
          <Target className="w-8 h-8 text-blue-600" />
          The Strategic Verdict
        </h3>
        
        <div className="p-6 bg-blue-50/50 border-2 border-blue-100 rounded-2xl flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow relative">
          <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-blue-200">1</div>
          <div className="flex-1">
            <h4 className="font-extrabold text-slate-800 text-xl mb-1">Pivot to Residential</h4>
            <p className="text-slate-600 leading-relaxed mb-4">Commercial stores are underperforming by <strong>103 Lakhs/year</strong>. Residential presence is our primary engine for immediate growth.</p>
            <Button variant="primary" onClick={goToSimulator} className="text-xs">
               <TrendingUp className="w-4 h-4" /> Simulate Scenario
            </Button>
          </div>
        </div>

        <div className="p-6 bg-indigo-50/50 border-2 border-indigo-100 rounded-2xl flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-indigo-200">2</div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-xl mb-1">Optimize Marketing ROI</h4>
            <p className="text-slate-600 leading-relaxed">Discounts work (1.88x ROI), Volume deals don't. Shift budget to price-based promotions to maximize conversion.</p>
          </div>
        </div>

        <div className="p-6 bg-purple-50/50 border-2 border-purple-100 rounded-2xl flex gap-5 items-start shadow-sm hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-black text-xl shrink-0 shadow-lg shadow-purple-200">3</div>
          <div>
            <h4 className="font-extrabold text-slate-800 text-xl mb-1">Chase the Ideal Point</h4>
            <p className="text-slate-600 leading-relaxed">MyPick is far from "Ideal". Launch a premium sub-brand to capture <strong>Cluster 2 (The Opportunity)</strong> while pivoting the core brand to Value Leader.</p>
          </div>
        </div>
      </div>

      {/* Future Research */}
      <div className="space-y-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3 mb-6">
          <Search className="w-8 h-8 text-slate-400" />
          The Next Case
        </h3>

        <div className="grid gap-4">
          <div className="flex gap-4 items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Profitability Audit</h4>
              <p className="text-sm text-slate-500">Need COGS data to calculate true ROI, not just Revenue Lift.</p>
            </div>
          </div>

          <div className="flex gap-4 items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Linked Loyalty Data</h4>
              <p className="text-sm text-slate-500">Connect Perception to Purchase history to validate Segment behavior.</p>
            </div>
          </div>

          <div className="flex gap-4 items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <LayoutGrid className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Customer Profiles</h4>
              <p className="text-sm text-slate-500">Collect demographics to predict exactly where the segments live.</p>
            </div>
          </div>

          <div className="flex gap-4 items-center p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 transition-colors group">
            <div className="p-3 bg-slate-100 rounded-xl text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <Map className="w-8 h-8" />
            </div>
            <div>
              <h4 className="font-bold text-slate-800 text-lg">Longitudinal Tracking</h4>
              <p className="text-sm text-slate-500">Biannual Perceptual Mapping to track movement towards "Ideal".</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function App() {
  const [activeStep, setActiveStep] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const steps = [
    { id: "eda", title: "1. Framing & EDA", icon: <Search className="w-5 h-5" />, content: <Phase1 /> },
    { id: "modeling", title: "2. Modeling", icon: <BarChart2 className="w-5 h-5" />, content: <Phase2 /> },
    { id: "strategy", title: "3. Strategy", icon: <Target className="w-5 h-5" />, content: <Phase3 /> },
    { id: "conclusion", title: "4. Conclusion", icon: <FileText className="w-5 h-5" />, content: <Phase4 goToSimulator={() => setActiveStep(4)} /> },
    { id: "simulator", title: "5. Simulator", icon: <LayoutGrid className="w-5 h-5" />, content: <PhaseSimulator /> }
  ];

  return (
    <ImageContext.Provider value={{ openImage: (src, alt) => setModalImage({ src, alt }), closeImage: () => setModalImage(null) }}>
      <Analytics />
      <div className="flex flex-col md:flex-row h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden relative">
        {/* Mobile Toggle & Sidebar Control */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md md:hidden"
        >
          {isSidebarOpen ? <X className="w-6 h-6 text-slate-600"/> : <LayoutGrid className="w-6 h-6 text-slate-600"/>}
        </button>

        {/* Sidebar */}
        <div className={`
            bg-white border-r border-slate-200 flex flex-col shrink-0 z-40 transition-all duration-300 ease-in-out
            fixed md:relative h-full
            ${isSidebarOpen ? 'w-72 translate-x-0' : 'w-0 -translate-x-full md:w-0 md:translate-x-0 md:overflow-hidden'}
        `}>
          <div className="p-6 border-b border-slate-100 flex justify-between items-center whitespace-nowrap">
            <div>
              <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <PieChart className="text-blue-600 shrink-0" />
                Promax Digital
              </h1>
              <p className="text-xs text-slate-500 mt-1">MyPick Transformation Plan</p>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="hidden md:block p-1 hover:bg-slate-100 rounded-full text-slate-400">
               <ChevronRight className="w-5 h-5 rotate-180" />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 whitespace-nowrap">
            {steps.map((step, idx) => (
              <button
                key={step.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left ${
                  activeStep === idx 
                    ? 'bg-blue-50 text-blue-700 shadow-sm border border-blue-100' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={`p-1.5 rounded-md shrink-0 ${activeStep === idx ? 'bg-blue-100' : 'bg-slate-100'}`}>
                  {step.icon}
                </span>
                {step.title}
                {idx < activeStep && <CheckCircle2 className="w-4 h-4 ml-auto text-emerald-500" />}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100 bg-slate-50 whitespace-nowrap">
            <div className="text-[10px] text-slate-400 uppercase font-bold mb-2">Technical Appendix</div>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-500">OLS Reg</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-500">MDS</span>
              <span className="px-2 py-1 bg-white border border-slate-200 rounded text-[10px] text-slate-500">HC3</span>
            </div>
          </div>
        </div>

        {/* Collapsed Sidebar Toggle (Desktop) */}
        {!isSidebarOpen && (
           <div className="hidden md:flex flex-col items-center py-4 border-r border-slate-200 bg-white z-30 w-16 shrink-0">
              <button onClick={() => setIsSidebarOpen(true)} className="p-3 mb-6 hover:bg-slate-50 rounded-lg text-blue-600">
                 <PieChart className="w-6 h-6" />
              </button>
              <div className="flex flex-col gap-4 w-full px-2">
                {steps.map((step, idx) => (
                   <button 
                     key={step.id}
                     onClick={() => setActiveStep(idx)}
                     className={`p-2 rounded-lg flex justify-center transition-colors relative group ${activeStep === idx ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                   >
                     {step.icon}
                     {/* Tooltip */}
                     <div className="absolute left-full ml-2 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none z-50">
                        {step.title}
                     </div>
                   </button>
                ))}
              </div>
           </div>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50">
          <div className="max-w-5xl mx-auto h-full flex flex-col">
            {/* Step Content */}
            <div className="flex-1">
              {steps[activeStep].content}
            </div>

            {/* Footer Navigation */}
            <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-200/60 pb-8">
              <Button 
                variant="secondary" 
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
              >
                Previous
              </Button>
              
              <div className="flex gap-1">
                {steps.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full ${i === activeStep ? 'bg-blue-600' : 'bg-slate-200'}`} />
                ))}
              </div>

              <Button 
                variant="primary" 
                onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                disabled={activeStep === steps.length - 1}
              >
                Next Phase <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </main>

        {/* Global Image Modal */}
        {modalImage && (
           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setModalImage(null)}>
             <button className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors" onClick={() => setModalImage(null)}>
               <X className="w-8 h-8" />
             </button>
             <div className="max-w-7xl max-h-screen p-2" onClick={(e) => e.stopPropagation()}>
                <img src={modalImage.src} alt={modalImage.alt} className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-200" />
                <p className="text-white text-center mt-4 font-medium text-lg tracking-wide drop-shadow-md">{modalImage.alt}</p>
             </div>
           </div>
        )}
      </div>
    </ImageContext.Provider>
  );
}
