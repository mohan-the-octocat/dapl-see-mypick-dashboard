import React, { useContext } from 'react';
import { Maximize2 } from 'lucide-react';
import { ImageContext } from '../../context/ImageContext';

export const ZoomableImage = ({ src, alt, className }) => {
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
