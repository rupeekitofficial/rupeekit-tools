'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { calculateIndianIncomeTax, TaxInput } from '@/lib/tax/calculator';
import { TaxInputForm } from './TaxInputForm';
import { TaxResultPanel } from './TaxResultPanel';
import { TaxFutureProjection } from './TaxFutureProjection';

const initialInput: TaxInput = {
  grossSalary: 1200000,
  hraExemption: 0,
  homeLoanInterest: 0,
  section80C: 150000,
  section80D: 25000,
  employerNPS: 0,
  otherDeductionsOldRegime: 0,
  otherDeductionsBothRegimes: 0,
  isSalaried: true,
};

export function TaxCalculatorApp() {
  const [input, setInput] = useState<TaxInput>(initialInput);
  const [taxYear, setTaxYear] = useState<string>('2024-25');
  const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const result = useMemo(() => {
    try {
      return calculateIndianIncomeTax(input, taxYear);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [input, taxYear]);

  if (!mounted) return <div className="animate-pulse h-[600px] bg-slate-100 rounded-3xl w-full"></div>;

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-6 flex gap-2 border-b border-brandBorder pb-4">
        <button
          onClick={() => setActiveTab('current')}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === 'current' ? 'bg-brandNavy text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Current Calculation
        </button>
        <button
          onClick={() => setActiveTab('future')}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${activeTab === 'future' ? 'bg-brandGrowthGreen text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >
          Future Projection
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          {activeTab === 'current' ? (
            <TaxInputForm 
              input={input} 
              onChange={setInput} 
              taxYear={taxYear} 
              onTaxYearChange={setTaxYear} 
            />
          ) : (
            <TaxFutureProjection baseInput={input} taxYear={taxYear} />
          )}
        </div>
        <div>
          <TaxResultPanel result={result} input={input} taxYear={taxYear} />
        </div>
      </div>
    </div>
  );
}
