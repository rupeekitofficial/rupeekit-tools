'use client';
import React from 'react';
import { TaxInput, TaxResult } from '@/lib/tax/calculator';
import { TaxVisualComparison } from './TaxVisualComparison';
import { TaxSlabBreakdown } from './TaxSlabBreakdown';
import { useDownloadTaxPdf } from '@/hooks/useDownloadTaxPdf';

interface TaxResultPanelProps {
  result: TaxResult | null;
  input: TaxInput;
  taxYear: string;
}

export function TaxResultPanel({ result, input, taxYear }: TaxResultPanelProps) {
  const { handleDownloadTaxPdf, isGenerating, error } = useDownloadTaxPdf();

  if (!result) return null;

  const { recommendedRegime, oldRegime, newRegime, savingsAmount } = result;

  let recommendationTitle = '';
  let recommendationClass = '';
  let rationale = '';

  if (recommendedRegime === 'Old') {
    recommendationTitle = 'Old Regime is Better';
    recommendationClass = 'bg-indigo-50 border-indigo-200 text-indigo-900';
    rationale = `Old regime saves you ₹${savingsAmount.toLocaleString('en-IN')} because your total deductions (₹${oldRegime.totalDeductions.toLocaleString('en-IN')}) are high enough to offset the lower slab rates of the new regime.`;
  } else if (recommendedRegime === 'New') {
    recommendationTitle = 'New Regime is Better';
    recommendationClass = 'bg-brandGrowthGreen/10 border-brandGrowthGreen/30 text-brandDeepNavy';
    rationale = `New regime saves you ₹${savingsAmount.toLocaleString('en-IN')}. Your old regime deductions aren't high enough to beat the lower tax slabs and higher rebate in the new regime.`;
  } else {
    recommendationTitle = 'Both Regimes are Equal';
    recommendationClass = 'bg-slate-50 border-slate-200 text-slate-800';
    rationale = 'The tax liability is identical in both regimes for your current income and deductions.';
  }

  return (
    <div className="sticky top-28 lg:top-32 z-10 rounded-3xl border border-brandBorder bg-white p-6 md:p-8 shadow-sm">
      <h2 className="text-xl font-black text-brandDeepNavy tracking-tight">Your Tax Estimate</h2>
      <p className="mt-1 text-xs text-brandMuted">For {result.taxYear}</p>

      {/* Recommendation Banner */}
      <div className={`mt-6 rounded-2xl border p-5 ${recommendationClass}`}>
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80">Recommendation</p>
        <p className="mt-1 text-lg font-black">{recommendationTitle}</p>
        <p className="mt-2 text-xs leading-relaxed opacity-90">{rationale}</p>
      </div>

      {/* Result Transparency Preview */}
      <div className="mt-4 rounded-xl bg-slate-50 p-4 border border-slate-100 text-sm">
        <h4 className="font-bold text-slate-700 mb-2 border-b border-slate-200 pb-1">Calculation Quick Summary</h4>
        <div className="space-y-1.5 text-slate-600">
          <div className="flex justify-between">
            <span>Taxable Income (Old):</span>
            <span className="font-medium">₹{oldRegime.taxableIncome.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span>Taxable Income (New):</span>
            <span className="font-medium">₹{newRegime.taxableIncome.toLocaleString('en-IN')}</span>
          </div>
          {(oldRegime.rebate > 0 || newRegime.rebate > 0) && (
            <div className="flex justify-between text-brandGrowthGreen">
              <span>Rebates Applied:</span>
              <span className="font-medium">₹{Math.max(oldRegime.rebate, newRegime.rebate).toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="flex justify-between text-xs pt-1 border-t border-slate-200 mt-1">
            <span>Includes 4% Health &amp; Ed. Cess</span>
            <span>✓</span>
          </div>
        </div>
      </div>

      <TaxVisualComparison oldTax={oldRegime.finalTax} newTax={newRegime.finalTax} />

      <TaxSlabBreakdown oldRegime={oldRegime} newRegime={newRegime} />

      <div className="mt-8 flex flex-col gap-3 pt-6 border-t border-brandBorder">
        <div>
          <button
            onClick={() => handleDownloadTaxPdf(input, result, taxYear)}
            disabled={isGenerating}
            className="w-full rounded-full bg-brandNavy px-4 py-3 text-sm font-bold text-white hover:bg-brandDeepNavy transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isGenerating ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating PDF…
              </>
            ) : (
              <>📄 Save Tax Summary as PDF</>
            )}
          </button>
          <p className="text-center text-[10px] text-brandMuted mt-2">
            Downloads a clean estimate summary using only your entered values and calculated result.
          </p>
          {error && (
            <p className="text-center text-[10px] text-red-600 mt-1 font-medium">{error}</p>
          )}
        </div>
        <p className="text-center text-[10px] leading-relaxed text-brandMuted mt-2">
          Educational estimate only. Tax rules change by financial year. Verify latest slabs, rebates, and deductions before filing your ITR. RupeeKit does not provide financial or tax advice.
        </p>
      </div>
    </div>
  );
}
