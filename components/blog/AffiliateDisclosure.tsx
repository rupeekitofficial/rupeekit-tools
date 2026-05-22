'use client';

export default function AffiliateDisclosure() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-xs leading-relaxed text-amber-900 shadow-sm flex items-start gap-2.5">
      <svg
        className="h-5 w-5 text-amber-600 shrink-0 mt-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p>
        <span className="font-bold">Affiliate Disclosure:</span> As an Amazon Associate, RupeeKit may earn from qualifying purchases. This means we may earn a small commission if you buy books or products via our links, at no extra cost to you.
      </p>
    </div>
  );
}
