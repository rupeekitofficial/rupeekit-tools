'use client';

import React, { useCallback, useState } from 'react';
import type { HraChecklistPdfData } from '@/components/hra/HraChecklistPdfDocument';

const HRA_CHECKLIST_FILE_NAME = 'hra-exemption-checklist-fy-2026-27-rupeekit.pdf';

function getGeneratedAt() {
  return new Date().toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function buildPayload(partial?: Partial<HraChecklistPdfData>): HraChecklistPdfData {
  const logoUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/brand/rupeekit_logo_horizontal_transparent.png`
      : undefined;

  return {
    generatedAt: getGeneratedAt(),
    logoUrl,
    ...partial,
  };
}

export function useDownloadHraChecklistPdf() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownloadHraChecklistPdf = useCallback(async (partial?: Partial<HraChecklistPdfData>) => {
    setError(null);
    setIsGenerating(true);

    try {
      const [{ pdf }, { HraChecklistPdfDocument }] = await Promise.all([
        import('@react-pdf/renderer'),
        import('@/components/hra/HraChecklistPdfDocument'),
      ]);

      const payload = buildPayload(partial);
      const element = React.createElement(HraChecklistPdfDocument, { data: payload });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const blob = await pdf(element as any).toBlob();

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = HRA_CHECKLIST_FILE_NAME;
      anchor.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('HRA checklist PDF generation failed:', err);
      setError('Could not generate the checklist PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    isGenerating,
    error,
    handleDownloadHraChecklistPdf,
  };
}
