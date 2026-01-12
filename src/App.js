import React, { useState } from 'react';
import { Analytics } from "@vercel/analytics/react"
import { 
  PieChart, 
  LayoutGrid, 
  X, 
  ChevronRight, 
  CheckCircle2, 
  Search, 
  BarChart2, 
  Target, 
  FileText 
} from 'lucide-react';

// Components
import { Button } from './components/ui/Button';
import Phase1 from './components/phases/Phase1';
import Phase2 from './components/phases/Phase2';
import Phase3 from './components/phases/Phase3';
import Phase4 from './components/phases/Phase4';
import PhaseSimulator from './components/phases/PhaseSimulator';

// Context
import { ImageContext } from './context/ImageContext';

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