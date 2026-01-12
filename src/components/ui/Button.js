import React from 'react';

export const Button = ({ onClick, children, variant = "primary", disabled = false, className = "" }) => {
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
