import React from 'react';
import { 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Search, 
  LayoutGrid, 
  Map,
  ChevronRight
} from 'lucide-react';
import { Button } from '../ui/Button';

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

export default Phase4;
