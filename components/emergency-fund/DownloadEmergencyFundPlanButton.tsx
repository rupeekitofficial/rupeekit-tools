'use client';

import type { EmergencyFundPlanPdfData } from '@/components/emergency-fund/EmergencyFundPlanPdfDocument';
import { useDownloadEmergencyFundPlanPdf } from '@/hooks/useDownloadEmergencyFundPlanPdf';

interface DownloadEmergencyFundPlanButtonProps {
  data?: Partial<EmergencyFundPlanPdfData>;
  className?: string;
}

export default function DownloadEmergencyFundPlanButton({
  data,
  className = '',
}: DownloadEmergencyFundPlanButtonProps) {
  const { isGenerating, error, handleDownloadEmergencyFundPlanPdf } =
    useDownloadEmergencyFundPlanPdf();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => handleDownloadEmergencyFundPlanPdf(data)}
        disabled={isGenerating}
        className="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
      >
        {isGenerating ? 'Preparing PDF...' : 'Download Emergency Fund Plan'}
      </button>
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
