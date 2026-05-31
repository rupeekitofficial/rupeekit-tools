'use client';

import type { PersonalLoanEmiReportPdfData } from '@/components/personal-loan/PersonalLoanEmiReportPdfDocument';
import { useDownloadPersonalLoanReportPdf } from '@/hooks/useDownloadPersonalLoanReportPdf';

interface DownloadPersonalLoanReportButtonProps {
  data?: Partial<PersonalLoanEmiReportPdfData>;
  className?: string;
}

export default function DownloadPersonalLoanReportButton({
  data,
  className = '',
}: DownloadPersonalLoanReportButtonProps) {
  const { isGenerating, error, handleDownloadPersonalLoanReportPdf } =
    useDownloadPersonalLoanReportPdf();

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => handleDownloadPersonalLoanReportPdf(data)}
        disabled={isGenerating}
        className="inline-flex items-center rounded-full bg-emerald-700 px-4 py-2 text-sm font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
      >
        {isGenerating ? 'Preparing PDF...' : 'Download Personal Loan EMI Report'}
      </button>
      <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-600">
        Includes EMI estimate, total repayment, true cost with fees, tenure comparison, affordability indicator,
        prepayment scenario, repayment schedule, hidden-charge checklist, methodology, and educational disclaimer.
      </p>
      {error ? <p className="mt-2 text-xs text-rose-700">{error}</p> : null}
    </div>
  );
}
