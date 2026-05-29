'use client';

import React, { useCallback, useState } from 'react';
import type { EmergencyFundPlanPdfData } from '@/components/emergency-fund/EmergencyFundPlanPdfDocument';

const EMERGENCY_FUND_PLAN_FILE_NAME = 'emergency-fund-plan-rupeekit.pdf';

function getGeneratedAt() {
  return new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildPayload(partial?: Partial<EmergencyFundPlanPdfData>): EmergencyFundPlanPdfData {
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
    monthlyEssentialExpenses: 0,
    monthlyEmiCommitments: 0,
    monthlySurvivalCost: 0,
    currentEmergencySavings: 0,
    targetMonths: 6,
    targetEmergencyFund: 0,
    currentShortfall: 0,
    monthlySavingCapacity: 0,
    monthsToReachTarget: 0,
    threeMonthFund: 0,
    sixMonthFund: 0,
    nineMonthFund: 0,
    twelveMonthFund: 0,
    ...partial,
  };
}

export function useDownloadEmergencyFundPlanPdf() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadEmergencyFundPlanPdf = useCallback(
    async (partial?: Partial<EmergencyFundPlanPdfData>) => {
      setError(null);
      setIsGenerating(true);

      try {
        const [{ pdf }, { EmergencyFundPlanPdfDocument }] = await Promise.all([
          import('@react-pdf/renderer'),
          import('@/components/emergency-fund/EmergencyFundPlanPdfDocument'),
        ]);

        const payload = buildPayload(partial);
        const element = React.createElement(EmergencyFundPlanPdfDocument, {
          data: payload,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const blob = await pdf(element as any).toBlob();

        const url = URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.href = url;
        anchor.download = EMERGENCY_FUND_PLAN_FILE_NAME;
        anchor.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Emergency fund plan PDF generation failed:', err);
        setError('Could not generate the emergency fund plan PDF. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    },
    []
  );

  return {
    isGenerating,
    error,
    handleDownloadEmergencyFundPlanPdf,
  };
}

