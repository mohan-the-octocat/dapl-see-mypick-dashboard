import React, { useState } from 'react';
import { 
  Store, 
  Target, 
  Map, 
  Users, 
  TrendingUp, 
  CheckCircle2, 
  LayoutGrid, 
  FileText, 
  AlertTriangle, 
  Search, 
  BarChart2 
} from 'lucide-react';
import { Card } from '../ui/Card';
import { AccordionItem } from '../ui/AccordionItem';
import { ZoomableImage } from '../ui/ZoomableImage';
import { ASSET_PATH } from '../../config';

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

export default Phase1;
