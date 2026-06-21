'use client';
import React, { useState, useCallback } from 'react';
import { TaxInput, TaxResult } from '@/lib/tax/calculator';
import { buildTaxPdfData } from '@/lib/tax/buildTaxPdfData';

export function useDownloadTaxPdf() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadTaxPdf = useCallback(
    async (input: TaxInput | null, result: TaxResult | null, taxYear: string) => {
      setError(null);

      if (!result || !input) {
        setError('Please calculate your tax before downloading the PDF.');
        return;
      }

      // Sanity checks
      if (
        isNaN(result.oldRegime.finalTax) ||
        isNaN(result.newRegime.finalTax) ||
        result.oldRegime.finalTax === undefined ||
        result.newRegime.finalTax === undefined
      ) {
        setError('Calculation result contains invalid values. Please recalculate.');
        return;
      }

      setIsGenerating(true);
      try {
        // Dynamic import so @react-pdf/renderer is never part of SSR bundle
        const [{ pdf }, { TaxSummaryPdfDocument }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('@/components/tax/TaxSummaryPdfDocument'),
        ]);

        const data = buildTaxPdfData(input, result, taxYear);
        const element = React.createElement(TaxSummaryPdfDocument, { data });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blob = await pdf(element as any).toBlob();

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rupeekit-tax-regime-comparison-report-fy-${taxYear}.pdf`;
        a.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('PDF generation failed:', err);
        setError('PDF generation failed. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return { handleDownloadTaxPdf, isGenerating, error };
}
