'use client';
import React, { useState, useMemo } from 'react';
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
  ageGroup: 'below60',
};

const scenarioPresets = [
  {
    label: '₹8L salary, no deductions',
    taxYear: '2025-26',
    input: {
      grossSalary: 800000,
      hraExemption: 0,
      homeLoanInterest: 0,
      section80C: 0,
      section80D: 0,
      employerNPS: 0,
      otherDeductionsOldRegime: 0,
      otherDeductionsBothRegimes: 0,
      isSalaried: true,
      ageGroup: 'below60' as const,
    },
  },
  {
    label: '₹12.75L salary, no deductions',
    taxYear: '2025-26',
    input: {
      grossSalary: 1275000,
      hraExemption: 0,
      homeLoanInterest: 0,
      section80C: 0,
      section80D: 0,
      employerNPS: 0,
      otherDeductionsOldRegime: 0,
      otherDeductionsBothRegimes: 0,
      isSalaried: true,
      ageGroup: 'below60' as const,
    },
  },
  {
    label: '₹15L salary, moderate deductions',
    taxYear: '2025-26',
    input: {
      grossSalary: 1500000,
      hraExemption: 150000,
      homeLoanInterest: 0,
      section80C: 150000,
      section80D: 25000,
      employerNPS: 0,
      otherDeductionsOldRegime: 25000,
      otherDeductionsBothRegimes: 0,
      isSalaried: true,
      ageGroup: 'below60' as const,
    },
  },
  {
    label: '₹20L salary, high deductions',
    taxYear: '2025-26',
    input: {
      grossSalary: 2000000,
      hraExemption: 200000,
      homeLoanInterest: 150000,
      section80C: 150000,
      section80D: 50000,
      employerNPS: 50000,
      otherDeductionsOldRegime: 50000,
      otherDeductionsBothRegimes: 0,
      isSalaried: true,
      ageGroup: 'below60' as const,
    },
  },
  {
    label: 'HRA-heavy case',
    taxYear: '2025-26',
    input: {
      grossSalary: 1600000,
      hraExemption: 180000,
      homeLoanInterest: 0,
      section80C: 100000,
      section80D: 25000,
      employerNPS: 0,
      otherDeductionsOldRegime: 15000,
      otherDeductionsBothRegimes: 0,
      isSalaried: true,
      ageGroup: 'below60' as const,
    },
  },
  {
    label: 'Home loan + 80C case',
    taxYear: '2025-26',
    input: {
      grossSalary: 1800000,
      hraExemption: 0,
      homeLoanInterest: 200000,
      section80C: 150000,
      section80D: 25000,
      employerNPS: 0,
      otherDeductionsOldRegime: 25000,
      otherDeductionsBothRegimes: 0,
      isSalaried: true,
      ageGroup: 'below60' as const,
    },
  },
] as const;

export function TaxCalculatorApp() {
  const [input, setInput] = useState<TaxInput>(initialInput);
  const [taxYear, setTaxYear] = useState<string>('2025-26');
  const [activeTab, setActiveTab] = useState<'current' | 'future'>('current');
  const [formResetToken, setFormResetToken] = useState(0);

  const result = useMemo(() => {
    try {
      return calculateIndianIncomeTax(input, taxYear);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [input, taxYear]);

  const applyPreset = (preset: (typeof scenarioPresets)[number]) => {
    setInput({ ...initialInput, ...preset.input });
    setTaxYear(preset.taxYear);
    setActiveTab('current');
    setFormResetToken((currentToken) => currentToken + 1);
  };

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

      <div className="mb-6 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-4 flex-col md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold text-brandDeepNavy">Scenario presets</p>
            <p className="mt-1 text-xs leading-6 text-brandMuted">
              Use these educational examples to compare common salary and deduction patterns before you adjust the inputs.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenarioPresets.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => applyPreset(preset)}
                className="rounded-full border border-brandBorder bg-slate-50 px-3 py-2 text-xs font-semibold text-brandDeepNavy transition hover:border-brandNavy hover:bg-brandBgSoft"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          {activeTab === 'current' ? (
            <TaxInputForm 
              key={formResetToken}
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
