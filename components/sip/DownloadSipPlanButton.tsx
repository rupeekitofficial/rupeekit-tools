'use client';

import type { SipPlanPdfData } from '@/components/sip/SipPlanPdfDocument';
import { useDownloadSipPlanPdf } from '@/hooks/useDownloadSipPlanPdf';

type DownloadSipPlanButtonProps = {
  data?: Partial<SipPlanPdfData>;
  className?: string;
};

export default function DownloadSipPlanButton({
  data,
  className = '',
}: DownloadSipPlanButtonProps) {
  const { isGenerating, error, handleDownloadSipPlanPdf } = useDownloadSipPlanPdf();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => handleDownloadSipPlanPdf(data)}
        disabled={isGenerating}
        className="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
      >
        {isGenerating ? 'Preparing PDF...' : 'Download SIP Plan'}
      </button>
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}

