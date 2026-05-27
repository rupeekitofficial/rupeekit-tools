import React from 'react';

type VisualType =
  | 'rbi'
  | 'income-tax'
  | 'gst'
  | 'sebi'
  | 'banking'
  | 'personal-finance'
  | 'government-salary'
  | 'da-dr'
  | 'pay-commission'
  | 'pension'
  | 'state-wise'
  | 'updates-hub'
  | 'financial-updates';

interface UpdateVisualProps {
  type: VisualType;
  size?: 'sm' | 'md';
  className?: string;
}

export default function UpdateVisual({ type, size = 'md', className = '' }: UpdateVisualProps) {
  const dim = size === 'sm' ? 40 : 56;
  const navy = '#003080';
  const green = '#43A047';
  const bgNavy = '#EEF3FF';
  const bgGreen = '#E8F5E9';

  const visuals: Record<VisualType, React.ReactNode> = {
    rbi: (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="RBI Banking institution icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <rect x="14" y="22" width="5" height="18" rx="1" fill={navy} opacity="0.8" />
        <rect x="21" y="22" width="5" height="18" rx="1" fill={navy} opacity="0.8" />
        <rect x="28" y="22" width="5" height="18" rx="1" fill={navy} opacity="0.8" />
        <rect x="35" y="22" width="5" height="18" rx="1" fill={navy} opacity="0.8" />
        <path d="M10 22 L28 11 L46 22 Z" fill={navy} />
        <rect x="10" y="40" width="36" height="4" rx="2" fill={navy} />
      </svg>
    ),
    'income-tax': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Income Tax document with percentage icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <rect x="13" y="9" width="26" height="34" rx="3" fill="white" stroke={navy} strokeWidth="2" />
        <path d="M31 9 L39 17 L31 17 Z" fill={bgNavy} stroke={navy} strokeWidth="1.5" strokeLinejoin="round" />
        <line x1="17" y1="23" x2="28" y2="23" stroke={navy} strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="29" x2="31" y2="29" stroke={green} strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="35" x2="24" y2="35" stroke={navy} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <text x="31" y="38" fill={green} fontSize="10" fontWeight="bold">%</text>
      </svg>
    ),
    gst: (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="GST invoice split icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgGreen} />
        <rect x="11" y="8" width="34" height="40" rx="3" fill="white" stroke={green} strokeWidth="2" />
        <rect x="11" y="8" width="34" height="12" rx="3" fill={green} />
        <text x="15" y="18" fill="white" fontSize="8" fontWeight="bold">INVOICE</text>
        <line x1="28" y1="24" x2="28" y2="44" stroke={green} strokeWidth="1" strokeDasharray="2 2" />
        <line x1="15" y1="28" x2="41" y2="28" stroke={navy} strokeWidth="1" opacity="0.3" />
        <line x1="15" y1="34" x2="41" y2="34" stroke={navy} strokeWidth="1" opacity="0.3" />
        <line x1="15" y1="40" x2="41" y2="40" stroke={navy} strokeWidth="1" opacity="0.3" />
        <rect x="29" y="41" width="10" height="5" rx="1" fill={green} opacity="0.3" />
      </svg>
    ),
    sebi: (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="SEBI markets uptrend chart icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <rect x="11" y="32" width="7" height="14" rx="2" fill={navy} opacity="0.4" />
        <rect x="21" y="24" width="7" height="22" rx="2" fill={navy} opacity="0.6" />
        <rect x="31" y="18" width="7" height="28" rx="2" fill={navy} opacity="0.8" />
        <polyline points="14,36 24,28 34,20 44,13" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="44" cy="13" r="3" fill={green} />
      </svg>
    ),
    banking: (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Banking safe vault icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <rect x="13" y="13" width="28" height="28" rx="4" fill="white" stroke={navy} strokeWidth="2" />
        <circle cx="27" cy="27" r="8" fill="none" stroke={navy} strokeWidth="2" />
        <circle cx="27" cy="27" r="3" fill={navy} />
        <line x1="35" y1="27" x2="40" y2="27" stroke={navy} strokeWidth="2.5" strokeLinecap="round" />
        <rect x="13" y="16" width="4" height="6" rx="1" fill={navy} opacity="0.5" />
        <rect x="13" y="32" width="4" height="6" rx="1" fill={navy} opacity="0.5" />
      </svg>
    ),
    'personal-finance': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Personal finance wallet icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgGreen} />
        <rect x="9" y="18" width="38" height="24" rx="4" fill="white" stroke={green} strokeWidth="2" />
        <rect x="9" y="22" width="38" height="6" fill={green} opacity="0.15" />
        <rect x="30" y="23" width="13" height="9" rx="2" fill="white" stroke={green} strokeWidth="1.5" />
        <circle cx="36.5" cy="27.5" r="2" fill={green} opacity="0.5" />
        <circle cx="18" cy="36" r="4" fill={green} opacity="0.5" />
        <circle cx="20" cy="38" r="4" fill={green} opacity="0.8" />
      </svg>
    ),
    'government-salary': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Government salary payslip icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <rect x="9" y="9" width="38" height="38" rx="3" fill="white" stroke={navy} strokeWidth="2" />
        <rect x="9" y="9" width="38" height="9" rx="3" fill={navy} />
        <line x1="13" y1="24" x2="26" y2="24" stroke={navy} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="30" y1="24" x2="43" y2="24" stroke={green} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="30" x2="26" y2="30" stroke={navy} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="30" y1="30" x2="43" y2="30" stroke={green} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="13" y1="36" x2="26" y2="36" stroke={navy} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="30" y1="36" x2="43" y2="36" stroke={green} strokeWidth="1.5" strokeLinecap="round" />
        <rect x="13" y="40" width="30" height="3" rx="1" fill={navy} opacity="0.15" />
      </svg>
    ),
    'da-dr': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="DA and DR percentage rate badge icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgGreen} />
        <circle cx="28" cy="28" r="18" fill="white" stroke={green} strokeWidth="2" />
        <text x="14" y="36" fill={navy} fontSize="20" fontWeight="900">%</text>
        <polyline points="38,34 43,27 38,21" stroke={green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    ),
    'pay-commission': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Pay commission document stack icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <rect x="18" y="14" width="24" height="30" rx="3" fill={bgNavy} stroke={navy} strokeWidth="1.5" />
        <rect x="14" y="16" width="24" height="30" rx="3" fill="white" stroke={navy} strokeWidth="2" />
        <line x1="18" y1="26" x2="34" y2="26" stroke={navy} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        <line x1="18" y1="32" x2="34" y2="32" stroke={green} strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="38" x2="28" y2="38" stroke={navy} strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
    pension: (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Pension support and payment icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgGreen} />
        <circle cx="26" cy="15" r="6" fill={navy} opacity="0.8" />
        <path d="M16 30 Q16 22 26 22 Q36 22 36 30 L36 36 L16 36 Z" fill={navy} opacity="0.8" />
        <line x1="33" y1="29" x2="39" y2="46" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <line x1="36" y1="46" x2="43" y2="46" stroke={green} strokeWidth="3" strokeLinecap="round" />
        <circle cx="15" cy="43" r="5" fill={green} opacity="0.7" />
        <text x="12" y="46.5" fill="white" fontSize="7" fontWeight="bold">₹</text>
      </svg>
    ),
    'state-wise': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="State-wise location pin card icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <path d="M28 9 C20 9 14 15 14 22 C14 31 28 45 28 45 C28 45 42 31 42 22 C42 15 36 9 28 9 Z" fill={navy} />
        <circle cx="28" cy="22" r="6" fill="white" />
        <rect x="11" y="47" width="34" height="4" rx="2" fill={green} opacity="0.4" />
      </svg>
    ),
    'updates-hub': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Updates hub dashboard icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgNavy} />
        <circle cx="19" cy="19" r="6" fill={navy} />
        <circle cx="37" cy="19" r="6" fill={green} />
        <circle cx="19" cy="37" r="6" fill={green} opacity="0.7" />
        <circle cx="37" cy="37" r="6" fill={navy} opacity="0.7" />
        <line x1="25" y1="19" x2="31" y2="19" stroke={navy} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
        <line x1="19" y1="25" x2="19" y2="31" stroke={green} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
        <line x1="25" y1="37" x2="31" y2="37" stroke={navy} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
        <line x1="37" y1="25" x2="37" y2="31" stroke={green} strokeWidth="1.5" strokeDasharray="2 2" opacity="0.4" />
      </svg>
    ),
    'financial-updates': (
      <svg width={dim} height={dim} viewBox="0 0 56 56" fill="none" aria-label="Financial updates rupee refresh icon" role="img">
        <rect width="56" height="56" rx="12" fill={bgGreen} />
        <circle cx="28" cy="28" r="16" fill="white" stroke={green} strokeWidth="2" />
        <text x="20" y="34" fill={navy} fontSize="16" fontWeight="900">₹</text>
        <path d="M44 28 C44 21 39 15 32 12" stroke={green} strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M30 9 L33 13 L37 10" fill="none" stroke={green} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  };

  return (
    <div className={`inline-flex items-center justify-center flex-shrink-0 ${className}`}>
      {visuals[type] ?? visuals['updates-hub']}
    </div>
  );
}
