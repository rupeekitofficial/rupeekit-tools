'use client';

import type { HraChecklistPdfData } from '@/components/hra/HraChecklistPdfDocument';
import { useDownloadHraChecklistPdf } from '@/hooks/useDownloadHraChecklistPdf';

interface DownloadHraChecklistButtonProps {
  data?: Partial<HraChecklistPdfData>;
  className?: string;
}

export default function DownloadHraChecklistButton({
  data,
  className = '',
}: DownloadHraChecklistButtonProps) {
  const { isGenerating, error, handleDownloadHraChecklistPdf } = useDownloadHraChecklistPdf();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => handleDownloadHraChecklistPdf(data)}
        disabled={isGenerating}
        className="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
      >
        {isGenerating ? 'Preparing PDF...' : 'Download HRA Checklist PDF'}
      </button>
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
