'use client';

import React, { useCallback, useState } from 'react';
import type { PersonalLoanEmiReportPdfData } from '@/components/personal-loan/PersonalLoanEmiReportPdfDocument';

const PERSONAL_LOAN_REPORT_FILE_NAME = 'personal-loan-emi-report-rupeekit.pdf';

function getGeneratedAt() {
  return new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildPayload(
  partial?: Partial<PersonalLoanEmiReportPdfData>
): PersonalLoanEmiReportPdfData {
  const logoUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/brand/rupeekit_logo_horizontal_transparent.png`
      : undefined;

  const safeGeneratedAt =
    partial?.generatedAt && partial.generatedAt.trim().length > 0
      ? partial.generatedAt
      : getGeneratedAt();

  return {
    generatedAt: safeGeneratedAt,
    logoUrl,
    principal: 0,
    annualInterestRate: 0,
    tenureMonths: 0,
    processingFeePercent: 0,
    monthlyIncome: 0,
    existingMonthlyEmi: 0,
    monthlyEmi: 0,
    totalInterest: 0,
    totalRepayment: 0,
    estimatedProcessingFee: 0,
    totalCostWithFee: 0,
    emiToIncomePercent: 0,
    totalEmiBurdenPercent: 0,
    tenureComparison: [],
    amortization: [],
    ...partial,
  };
}

export function useDownloadPersonalLoanReportPdf() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadPersonalLoanReportPdf = useCallback(
    async (partial?: Partial<PersonalLoanEmiReportPdfData>) => {
      setError(null);
      setIsGenerating(true);

      try {
        const [{ pdf }, { PersonalLoanEmiReportPdfDocument }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('@/components/personal-loan/PersonalLoanEmiReportPdfDocument'),
        ]);

        const payload = buildPayload(partial);
        const element = React.createElement(PersonalLoanEmiReportPdfDocument, {
          data: payload,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blob = await pdf(element as any).toBlob();

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = PERSONAL_LOAN_REPORT_FILE_NAME;
        anchor.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Personal loan EMI report PDF generation failed:', err);
        setError('Could not generate the EMI report PDF. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    isGenerating,
    error,
    handleDownloadPersonalLoanReportPdf,
  };
}
