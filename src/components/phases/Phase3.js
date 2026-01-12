import React from 'react';
import { Users, PieChart } from 'lucide-react';
import { Card } from '../ui/Card';

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

export default Phase3;
