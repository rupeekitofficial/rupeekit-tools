import React, { useState } from 'react';
import { TaxInput } from '@/lib/tax/calculator';

interface TaxInputFormProps {
  input: TaxInput;
  onChange: (newInput: TaxInput) => void;
  taxYear: string;
  onTaxYearChange: (year: string) => void;
}

export function TaxInputForm({ input, onChange, taxYear, onTaxYearChange }: TaxInputFormProps) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    basic: true,
    deductions: false,
    other: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleNumChange = (field: keyof TaxInput, value: string) => {
    const num = parseInt(value.replace(/\D/g, ''), 10) || 0;
    onChange({ ...input, [field]: num });
  };

  return (
    <div className="space-y-4">
      {/* Settings Block */}
      <div className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm">
        <label className="block text-sm font-bold text-brandDeepNavy mb-2">Financial Year (FY)</label>
        <select 
          value={taxYear}
          onChange={(e) => onTaxYearChange(e.target.value)}
          className="w-full rounded-xl border border-brandBorder bg-slate-50 px-4 py-3 text-sm text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
        >
          <option value="2024-25">FY 2024-25 (AY 2025-26)</option>
          <option value="2023-24">FY 2023-24 (AY 2024-25)</option>
        </select>
        <p className="mt-1.5 text-[10px] text-brandMuted">Rules last reviewed: May 2026. Verify official tax rules before filing.</p>
        <div className="mt-4 flex items-center gap-3">
          <input 
            type="checkbox" 
            id="isSalaried" 
            checked={input.isSalaried}
            onChange={(e) => onChange({ ...input, isSalaried: e.target.checked })}
            className="h-4 w-4 rounded border-brandBorder text-brandNavy focus:ring-brandNavy"
          />
          <label htmlFor="isSalaried" className="text-sm font-medium text-slate-700">
            Salaried Employee (eligible for Standard Deduction)
          </label>
        </div>
      </div>

      {/* Income Section */}
      <div className="rounded-2xl border border-brandBorder bg-white overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('basic')}
          className="flex w-full items-center justify-between bg-brandBgSoft px-5 py-4 text-left transition hover:bg-slate-100"
        >
          <span className="font-bold text-brandDeepNavy">1. Income Details</span>
          <span className="text-slate-400">{openSections.basic ? '▲' : '▼'}</span>
        </button>
        {openSections.basic && (
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Gross Annual Income</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.grossSalary.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('grossSalary', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="0"
                />
              </div>
              <p className="mt-1 text-[11px] text-brandMuted">Total income before any deductions.</p>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Exempt Allowances (HRA, LTA, etc.)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.hraExemption.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('hraExemption', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="0"
                />
              </div>
              <p className="mt-1 text-[11px] text-brandMuted">Only valid in old regime. Only enter the exempt portion, not the total received.</p>
            </div>
          </div>
        )}
      </div>

      {/* Deductions Section */}
      <div className="rounded-2xl border border-brandBorder bg-white overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('deductions')}
          className="flex w-full items-center justify-between bg-brandBgSoft px-5 py-4 text-left transition hover:bg-slate-100"
        >
          <span className="font-bold text-brandDeepNavy">2. Major Deductions (Old Regime)</span>
          <span className="text-slate-400">{openSections.deductions ? '▲' : '▼'}</span>
        </button>
        {openSections.deductions && (
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Section 80C (PPF, ELSS, EPF, LIC)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.section80C.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('section80C', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="Max 1,50,000"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Section 80D (Health Insurance)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.section80D.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('section80D', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Home Loan Interest (Section 24b)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.homeLoanInterest.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('homeLoanInterest', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="Max 2,00,000 for self-occupied"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Other Deductions Section */}
      <div className="rounded-2xl border border-brandBorder bg-white overflow-hidden shadow-sm">
        <button 
          onClick={() => toggleSection('other')}
          className="flex w-full items-center justify-between bg-brandBgSoft px-5 py-4 text-left transition hover:bg-slate-100"
        >
          <span className="font-bold text-brandDeepNavy">3. Other Deductions</span>
          <span className="text-slate-400">{openSections.other ? '▲' : '▼'}</span>
        </button>
        {openSections.other && (
          <div className="p-5 space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Employer NPS (Sec 80CCD(2))</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.employerNPS.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('employerNPS', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="0"
                />
              </div>
              <p className="mt-1 text-[11px] text-brandGrowthGreen font-medium">Allowed in BOTH old and new tax regimes.</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Other Deductions (Old Regime Only)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.otherDeductionsOldRegime.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('otherDeductionsOldRegime', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="e.g. LTA, 80E, 80G, etc."
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">Other Deductions (Both Regimes)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium">₹</span>
                <input 
                  type="text" 
                  value={input.otherDeductionsBothRegimes.toLocaleString('en-IN')}
                  onChange={(e) => handleNumChange('otherDeductionsBothRegimes', e.target.value)}
                  className="w-full rounded-xl border border-brandBorder bg-white py-3 pl-8 pr-4 text-sm font-bold text-brandDeepNavy outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
                  placeholder="e.g. 80CCH Agniveer Corpus Fund"
                />
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
