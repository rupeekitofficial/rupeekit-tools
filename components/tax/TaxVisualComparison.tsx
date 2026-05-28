import React from 'react';

interface TaxVisualComparisonProps {
  oldTax: number;
  newTax: number;
}

export function TaxVisualComparison({ oldTax, newTax }: TaxVisualComparisonProps) {
  const maxTax = Math.max(oldTax, newTax, 1);
  const oldWidth = `${(oldTax / maxTax) * 100}%`;
  const newWidth = `${(newTax / maxTax) * 100}%`;

  return (
    <div className="mt-6 space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-600">Old Regime Tax</span>
          <span className="text-slate-800">₹{oldTax.toLocaleString('en-IN')}</span>
        </div>
        <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
          <div 
            className="h-full bg-slate-400 transition-all duration-1000 ease-out" 
            style={{ width: oldWidth }} 
          />
        </div>
      </div>
      
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold">
          <span className="text-slate-600">New Regime Tax</span>
          <span className="text-slate-800">₹{newTax.toLocaleString('en-IN')}</span>
        </div>
        <div className="h-4 w-full rounded-full bg-slate-100 overflow-hidden">
          <div 
            className="h-full bg-brandGrowthGreen transition-all duration-1000 ease-out" 
            style={{ width: newWidth }} 
          />
        </div>
      </div>
    </div>
  );
}
