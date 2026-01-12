import React from 'react';
import { CheckCircle2, AlertTriangle, ChevronRight } from 'lucide-react';

export const AccordionItem = ({ title, subtitle, status, children, isOpen, onClick }) => (
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
