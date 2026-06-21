'use client';

interface FinanceDisclaimerProps {
  title?: string;
  text?: string;
}

const DEFAULT_TEXT =
  'The content on this page is provided for general informational and educational purposes only. It does not constitute financial, tax, legal, or investment advice. Individual situations vary; always consult with a certified tax expert or financial advisor before making major financial decisions.';

export default function FinanceDisclaimer({
  title = 'Educational Disclaimer',
  text = DEFAULT_TEXT,
}: FinanceDisclaimerProps) {
  return (
    <div className="rounded-2xl border border-brandBorder bg-white p-5 text-xs leading-relaxed text-brandMuted shadow-sm">
      <p className="font-bold text-brandDeepNavy mb-1">{title}</p>
      <p>{text}</p>
    </div>
  );
}
