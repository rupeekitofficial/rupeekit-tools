'use client';

import React, { useCallback, useState } from 'react';
import type { SipPlanPdfData } from '@/components/sip/SipPlanPdfDocument';
import { trackPdfDownload } from '@/lib/events';

const SIP_PLAN_REPORT_FILE_NAME = 'sip-plan-report-rupeekit.pdf';

function getGeneratedAt() {
  return new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildPayload(partial?: Partial<SipPlanPdfData>): SipPlanPdfData {
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
    modeLabel: 'Regular SIP',
    inputs: [],
    resultHighlights: [],
    delayCost: {
      startingNow: 0,
      startingAfterOneYear: 0,
      difference: 0,
      note: 'Delay cost is an estimate based on the same assumed return and duration. It is not a guarantee.',
    },
    milestones: [],
    inflationAdjusted: {
      inflationRate: 0,
      futureValue: 0,
      presentValue: 0,
    },
    reviewChecklist: [],
    disclaimer:
      'Educational estimate only. Actual mutual fund returns may vary due to market movement, expense ratio, exit load, taxes, and fund performance.',
    ...partial,
  };
}

export function useDownloadSipPlanPdf() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadSipPlanPdf = useCallback(async (partial?: Partial<SipPlanPdfData>) => {
    setError(null);
    setIsGenerating(true);

    try {
      const [{ pdf }, { SipPlanPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/sip/SipPlanPdfDocument'),
      ]);

      const payload = buildPayload(partial);
      const element = React.createElement(SipPlanPdfDocument, { data: payload });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(element as any).toBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = SIP_PLAN_REPORT_FILE_NAME;
      anchor.click();
      URL.revokeObjectURL(url);
      trackPdfDownload({
        page: '/tools/sip-calculator-india',
        toolSlug: 'sip-calculator-india',
        context: 'sip-plan-report',
      });
    } catch (downloadError) {
      console.error('SIP plan PDF generation failed:', downloadError);
      setError('Could not generate the SIP plan PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    isGenerating,
    error,
    handleDownloadSipPlanPdf,
  };
}

