import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { Card } from '../ui/Card';

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

export default PhaseSimulator;
