'use client';

import React from 'react';

export type BlogGeneratedVisualVariant =
  | 'budget-flow'
  | 'fifty-thirty-twenty'
  | 'emergency-fund'
  | 'books-library'
  | 'expense-tracker'
  | 'saving-vs-investing'
  | 'monthly-expense-plan'
  | 'debt-snowball'
  | 'habit-tracker'
  | 'checklist'
  | 'itr-tax-guide'
  | 'income-tax-calculator'
  | 'old-vs-new-tax-regime'
  | 'old-tax-regime-deductions'
  | 'new-tax-regime-vs-old-regime'
  | 'hra-documents'
  | 'repo-rate-loan'
  | 'fallback-finance-card';

type VisualMode = 'hero' | 'inline' | 'thumbnail';

interface BlogGeneratedVisualProps {
  variant: BlogGeneratedVisualVariant;
  mode: VisualMode;
  title?: string;
  subtitle?: string;
  category?: string;
  alt: string;
}

const NAVY = '#002070';
const DEEP_NAVY = '#00184d';
const GREEN = '#43A047';
const BRIGHT_GREEN = '#63b34c';
const LIGHT = '#f8fbff';
const MUTED = '#94a3b8';

function normalizeText(value: string | undefined, maxLength: number) {
  return (value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function splitTextIntoLines(value: string, maxCharacters = 28, maxLines = 2) {
  const words = normalizeText(value, maxCharacters * maxLines).split(' ').filter(Boolean);
  if (words.length === 0) return [];

  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidateLine = currentLine ? `${currentLine} ${word}` : word;
    if (candidateLine.length <= maxCharacters || currentLine.length === 0) {
      currentLine = candidateLine;
      continue;
    }

    lines.push(currentLine);
    currentLine = word;
    if (lines.length === maxLines - 1) {
      break;
    }
  }

  if (currentLine && lines.length < maxLines) {
    lines.push(currentLine);
  }

  if (lines.length > maxLines) {
    return lines.slice(0, maxLines);
  }

  const consumed = lines.join(' ').length;
  const sourceText = normalizeText(value, maxCharacters * maxLines);
  if (lines.length === maxLines && consumed < sourceText.length) {
    lines[maxLines - 1] = `${lines[maxLines - 1].slice(0, Math.max(0, maxCharacters - 1)).trimEnd()}…`;
  }

  return lines;
}

function TextLines({
  lines,
  x,
  y,
  lineHeight,
  fontSize,
  fill,
  fontWeight,
  textAnchor = 'start',
}: {
  lines: string[];
  x: number;
  y: number;
  lineHeight: number;
  fontSize: number;
  fill: string;
  fontWeight: number | string;
  textAnchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      x={x}
      y={y}
      fill={fill}
      fontSize={fontSize}
      fontWeight={fontWeight}
      textAnchor={textAnchor}
    >
      {lines.map((line, index) => (
        <tspan key={`${index}-${line}`} x={x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function Pill({
  x,
  y,
  width,
  label,
  fill,
  textFill,
}: {
  x: number;
  y: number;
  width: number;
  label: string;
  fill: string;
  textFill: string;
}) {
  return (
    <>
      <rect x={x} y={y} width={width} height="34" rx="17" fill={fill} opacity="0.96" />
      <text x={x + width / 2} y={y + 22} textAnchor="middle" fill={textFill} fontSize="14" fontWeight="700">
        {label}
      </text>
    </>
  );
}

function IllustrationFrame({
  x,
  y,
  width,
  height,
  children,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  children: React.ReactNode;
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} rx="34" fill="#0b1632" opacity="0.72" />
      <rect x={x + 1.5} y={y + 1.5} width={width - 3} height={height - 3} rx="32" fill="none" stroke="#223058" />
      {children}
    </g>
  );
}

function FinanceGrid({ x, y }: { x: number; y: number }) {
  return (
    <g opacity="0.28">
      {Array.from({ length: 7 }).map((_, columnIndex) =>
        Array.from({ length: 4 }).map((__, rowIndex) => (
          <circle
            key={`${columnIndex}-${rowIndex}`}
            cx={x + columnIndex * 42}
            cy={y + rowIndex * 42}
            r="2.4"
            fill={columnIndex % 2 === 0 ? GREEN : '#d7e3ff'}
          />
        ))
      )}
    </g>
  );
}

function renderIllustration(variant: BlogGeneratedVisualVariant, mode: VisualMode) {
  const isThumbnail = mode === 'thumbnail';

  switch (variant) {
    case 'budget-flow':
      return (
        <>
          <rect x="700" y="182" width="360" height="260" rx="28" fill="#0f1c3d" opacity="0.9" />
          <rect x="726" y="212" width="100" height="46" rx="12" fill={NAVY} />
          <rect x="847" y="212" width="100" height="46" rx="12" fill="#334155" />
          <rect x="968" y="212" width="66" height="46" rx="12" fill={GREEN} />
          <path d="M 770 258 L 770 384" stroke={GREEN} strokeWidth="6" strokeLinecap="round" />
          <path d="M 898 258 L 898 384" stroke="#7dd3fc" strokeWidth="6" strokeLinecap="round" />
          <path d="M 1000 258 L 1000 384" stroke={BRIGHT_GREEN} strokeWidth="6" strokeLinecap="round" />
          <rect x="724" y="362" width="108" height="52" rx="14" fill="#15264e" />
          <rect x="842" y="340" width="112" height="74" rx="14" fill="#12253e" />
          <rect x="968" y="322" width="66" height="92" rx="14" fill="#18352e" />
          <text x="774" y="242" textAnchor="middle" fill="#fff" fontSize={isThumbnail ? 12 : 14} fontWeight="700">
            Income
          </text>
          <text x="897" y="242" textAnchor="middle" fill="#fff" fontSize={isThumbnail ? 12 : 14} fontWeight="700">
            Needs
          </text>
          <text x="1001" y="242" textAnchor="middle" fill="#fff" fontSize={isThumbnail ? 12 : 14} fontWeight="700">
            Savings
          </text>
        </>
      );

    case 'fifty-thirty-twenty':
      return (
        <>
          <rect x="705" y="170" width="374" height="290" rx="30" fill="#0f1c3d" opacity="0.9" />
          {[92, 212, 332].map((cx, index) => (
            <g key={cx}>
              <circle cx={cx + 615} cy="316" r="58" fill="none" stroke="#243457" strokeWidth="16" />
              <circle
                cx={cx + 615}
                cy="316"
                r="58"
                fill="none"
                stroke={index === 2 ? GREEN : index === 0 ? NAVY : '#64748b'}
                strokeWidth="16"
                strokeDasharray={index === 0 ? '180 360' : index === 1 ? '108 360' : '72 360'}
                transform={`rotate(-90 ${cx + 615} 316)`}
                strokeLinecap="round"
              />
            </g>
          ))}
          <text x="707" y="410" fill="#fff" fontSize="15" fontWeight="700">Needs</text>
          <text x="827" y="410" fill="#fff" fontSize="15" fontWeight="700">Wants</text>
          <text x="947" y="410" fill="#fff" fontSize="15" fontWeight="700">Savings</text>
        </>
      );

    case 'emergency-fund':
      return (
        <>
          <rect x="706" y="166" width="372" height="298" rx="32" fill="#0e1a38" opacity="0.92" />
          <path
            d="M 820 224 C 859 202, 901 202, 940 224 V 299 C 940 351, 900 397, 880 408 C 860 397, 820 351, 820 299 Z"
            fill="#163765"
          />
          <path
            d="M 880 245 C 905 245, 925 265, 925 290 C 925 329, 894 355, 880 365 C 866 355, 835 329, 835 290 C 835 265, 855 245, 880 245 Z"
            fill={GREEN}
          />
          <rect x="955" y="226" width="90" height="24" rx="12" fill="#143058" />
          <rect x="955" y="262" width="90" height="24" rx="12" fill="#143058" />
          <rect x="955" y="298" width="90" height="24" rx="12" fill="#143058" />
          <rect x="955" y="334" width="90" height="24" rx="12" fill="#143058" />
          <rect x="955" y="370" width="90" height="24" rx="12" fill="#143058" />
          <rect x="965" y="232" width="55" height="12" rx="6" fill="#dbeafe" />
          <rect x="965" y="268" width="42" height="12" rx="6" fill="#dbeafe" />
          <rect x="965" y="304" width="63" height="12" rx="6" fill="#dbeafe" />
          <rect x="965" y="340" width="36" height="12" rx="6" fill="#dbeafe" />
          <rect x="965" y="376" width="70" height="12" rx="6" fill="#dbeafe" />
        </>
      );

    case 'books-library':
      return (
        <>
          <rect x="710" y="188" width="352" height="232" rx="28" fill="#112042" />
          <rect x="740" y="382" width="292" height="14" rx="7" fill="#31456d" />
          {[
            { x: 748, width: 58, height: 166, fill: NAVY },
            { x: 814, width: 56, height: 126, fill: GREEN },
            { x: 878, width: 54, height: 176, fill: '#23395d' },
            { x: 940, width: 58, height: 146, fill: BRIGHT_GREEN },
          ].map((book) => (
            <g key={book.x}>
              <rect x={book.x} y={214 + (176 - book.height)} width={book.width} height={book.height} rx="6" fill={book.fill} />
              <rect x={book.x + 7} y={232 + (176 - book.height)} width={book.width - 14} height="5" rx="2.5" fill="#ffffff" opacity="0.28" />
              <rect x={book.x + 7} y={376 + (176 - book.height)} width={book.width - 14} height="5" rx="2.5" fill="#ffffff" opacity="0.28" />
            </g>
          ))}
        </>
      );

    case 'expense-tracker':
      return (
        <>
          <rect x="706" y="178" width="368" height="270" rx="30" fill="#111d3c" />
          {[
            { x: 734, y: 212, w: 88, h: 76, fill: '#12264d', label: 'Bills' },
            { x: 834, y: 212, w: 88, h: 76, fill: '#163765', label: 'Food' },
            { x: 934, y: 212, w: 88, h: 76, fill: '#182d50', label: 'Travel' },
            { x: 784, y: 300, w: 88, h: 76, fill: '#17384b', label: 'Health' },
            { x: 884, y: 300, w: 88, h: 76, fill: '#143058', label: 'Other' },
          ].map((card, index) => (
            <g key={card.label}>
              <rect x={card.x} y={card.y} width={card.w} height={card.h} rx="18" fill={card.fill} />
              <rect x={card.x + 14} y={card.y + 16} width={card.w - 28} height="10" rx="5" fill="#dbeafe" opacity="0.65" />
              <rect x={card.x + 14} y={card.y + 36} width={40 + index * 4} height="10" rx="5" fill={index % 2 === 0 ? GREEN : '#7dd3fc'} />
            </g>
          ))}
        </>
      );

    case 'saving-vs-investing':
      return (
        <>
          <rect x="706" y="180" width="368" height="268" rx="30" fill="#0f1c3d" />
          <rect x="742" y="300" width="112" height="112" rx="24" fill="#12264d" />
          <rect x="864" y="260" width="172" height="152" rx="24" fill="#143058" />
          <path d="M 800 330 C 845 330, 866 305, 910 286" stroke={GREEN} strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="800" cy="330" r="16" fill={NAVY} />
          <circle cx="910" cy="286" r="16" fill={GREEN} />
          <rect x="884" y="318" width="112" height="16" rx="8" fill="#dbeafe" opacity="0.72" />
          <rect x="884" y="342" width="84" height="16" rx="8" fill="#dbeafe" opacity="0.54" />
          <rect x="884" y="366" width="132" height="16" rx="8" fill="#dbeafe" opacity="0.42" />
        </>
      );

    case 'monthly-expense-plan':
      return (
        <>
          <rect x="700" y="180" width="370" height="270" rx="30" fill="#0f1c3d" />
          <rect x="734" y="214" width="134" height="140" rx="22" fill="#12264d" />
          <path d="M 756 244 L 801 214 L 846 244" stroke="#dbeafe" strokeWidth="4" fill="none" strokeLinecap="round" />
          <rect x="768" y="244" width="36" height="50" rx="7" fill="#1d3358" />
          <rect x="862" y="214" width="170" height="80" rx="22" fill="#143058" />
          <rect x="862" y="308" width="170" height="46" rx="14" fill="#15264e" />
          <rect x="862" y="364" width="170" height="46" rx="14" fill="#17384b" />
          <rect x="878" y="230" width="132" height="14" rx="7" fill="#dbeafe" opacity="0.75" />
          <rect x="878" y="252" width="96" height="14" rx="7" fill={GREEN} />
          <rect x="878" y="324" width="124" height="12" rx="6" fill="#dbeafe" opacity="0.7" />
          <rect x="878" y="348" width="72" height="12" rx="6" fill={BRIGHT_GREEN} />
          <rect x="878" y="380" width="112" height="12" rx="6" fill="#dbeafe" opacity="0.72" />
        </>
      );

    case 'debt-snowball':
      return (
        <>
          <rect x="700" y="166" width="372" height="296" rx="30" fill="#0e1a38" />
          {[0, 1, 2, 3].map((step) => (
            <g key={step}>
              <rect
                x={760 + step * 54}
                y={374 - step * 34}
                width="74"
                height={32 + step * 24}
                rx="12"
                fill={step % 2 === 0 ? NAVY : GREEN}
              />
              <text
                x={797 + step * 54}
                y={394 - step * 34}
                textAnchor="middle"
                fill="#fff"
                fontSize="12"
                fontWeight="700"
              >
                {step === 0 ? 'Card' : step === 1 ? 'Loan' : step === 2 ? 'EMI' : 'Debt'}
              </text>
            </g>
          ))}
          <path d="M 757 410 C 818 370, 892 344, 974 306" stroke={GREEN} strokeWidth="7" fill="none" strokeLinecap="round" />
          <path d="M 970 306 l 12 2 l -6 10" fill={GREEN} />
        </>
      );

    case 'habit-tracker':
      return (
        <>
          <rect x="708" y="176" width="366" height="278" rx="30" fill="#111d3c" />
          <rect x="742" y="210" width="298" height="214" rx="22" fill="#14264b" />
          {Array.from({ length: 4 }).map((_, rowIndex) =>
            Array.from({ length: 5 }).map((__, columnIndex) => (
              <rect
                key={`${rowIndex}-${columnIndex}`}
                x={764 + columnIndex * 50}
                y={232 + rowIndex * 42}
                width="32"
                height="28"
                rx="8"
                fill={rowIndex < 2 && columnIndex % 2 === 0 ? GREEN : '#23395d'}
              />
            ))
          )}
        </>
      );

    case 'checklist':
    case 'old-tax-regime-deductions':
      return (
        <>
          <rect x="716" y="184" width="338" height="250" rx="30" fill="#101d3b" />
          <rect x="762" y="214" width="246" height="182" rx="22" fill="#f8fbff" />
          {['Documents', 'Proofs', 'Dates', 'Notes'].map((label, index) => (
            <g key={label}>
              <circle cx="792" cy={252 + index * 35} r="10" fill={index < 3 ? GREEN : '#cbd5e1'} />
              {index < 3 ? <path d={`M ${787 + index * 0} ${252 + index * 35} l 4 5 l 8 -10`} stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" /> : null}
              <rect x="815" y={243 + index * 35} width={120 - index * 4} height="10" rx="5" fill="#cbd5e1" />
            </g>
          ))}
        </>
      );

    case 'itr-tax-guide':
      return (
        <>
          <rect x="708" y="168" width="366" height="286" rx="30" fill="#0e1a38" />
          <rect x="748" y="202" width="136" height="174" rx="22" fill="#ffffff" />
          <rect x="770" y="224" width="92" height="16" rx="8" fill={NAVY} />
          <rect x="770" y="252" width="76" height="12" rx="6" fill="#cbd5e1" />
          <rect x="770" y="274" width="88" height="12" rx="6" fill="#cbd5e1" />
          <rect x="770" y="296" width="64" height="12" rx="6" fill="#cbd5e1" />
          <rect x="770" y="322" width="90" height="28" rx="9" fill={GREEN} />
          <rect x="918" y="218" width="110" height="28" rx="14" fill="#143058" />
          <rect x="918" y="258" width="110" height="28" rx="14" fill="#143058" />
          <rect x="918" y="298" width="110" height="28" rx="14" fill="#143058" />
          <rect x="934" y="224" width="74" height="12" rx="6" fill="#dbeafe" />
          <rect x="934" y="264" width="54" height="12" rx="6" fill="#dbeafe" />
          <rect x="934" y="304" width="62" height="12" rx="6" fill="#dbeafe" />
        </>
      );

    case 'income-tax-calculator':
      return (
        <>
          <rect x="708" y="178" width="356" height="270" rx="30" fill="#111d3c" />
          <rect x="744" y="208" width="154" height="66" rx="18" fill="#f8fbff" />
          <rect x="766" y="228" width="112" height="16" rx="8" fill="#cbd5e1" />
          <rect x="766" y="252" width="52" height="8" rx="4" fill={GREEN} />
          {[
            { x: 918, y: 210, h: 34 },
            { x: 918, y: 252, h: 28 },
            { x: 918, y: 294, h: 22 },
            { x: 918, y: 336, h: 16 },
          ].map((bar, index) => (
            <rect key={index} x={bar.x} y={bar.y} width={110} height={bar.h} rx="12" fill={index < 2 ? NAVY : index === 2 ? '#334155' : GREEN} />
          ))}
          <g transform="translate(742 296)">
            {Array.from({ length: 12 }).map((_, key) => (
              <rect
                key={key}
                x={(key % 4) * 34}
                y={Math.floor(key / 4) * 26}
                width="24"
                height="18"
                rx="5"
                fill={key === 10 ? GREEN : '#243457'}
              />
            ))}
          </g>
        </>
      );

    case 'old-vs-new-tax-regime':
    case 'new-tax-regime-vs-old-regime':
      return (
        <>
          <rect x="702" y="178" width="374" height="278" rx="30" fill="#101d3b" />
          <rect x="736" y="212" width="146" height="188" rx="20" fill="#12264d" />
          <rect x="916" y="212" width="122" height="188" rx="20" fill="#17384b" />
          <rect x="757" y="242" width="104" height="14" rx="7" fill="#dbeafe" opacity="0.75" />
          <rect x="757" y="266" width="74" height="48" rx="12" fill="#1d3358" />
          <rect x="757" y="324" width="98" height="14" rx="7" fill="#dbeafe" opacity="0.65" />
          <rect x="937" y="242" width="76" height="14" rx="7" fill="#dbeafe" opacity="0.75" />
          <rect x="937" y="266" width="44" height="48" rx="12" fill={GREEN} />
          <rect x="937" y="324" width="72" height="14" rx="7" fill="#dbeafe" opacity="0.65" />
          <path d="M 890 288 L 905 288" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
          <path d="M 903 280 L 914 288 L 903 296" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </>
      );

    case 'hra-documents':
      return (
        <>
          <rect x="704" y="178" width="370" height="272" rx="30" fill="#111d3c" />
          <path d="M 756 224 h 132 l 18 24 h 116 v 142 h -266 z" fill="#17384b" />
          <rect x="776" y="266" width="130" height="18" rx="9" fill="#dbeafe" opacity="0.82" />
          <rect x="776" y="296" width="100" height="12" rx="6" fill="#dbeafe" opacity="0.56" />
          <rect x="776" y="320" width="84" height="12" rx="6" fill="#dbeafe" opacity="0.56" />
          <rect x="930" y="250" width="88" height="26" rx="13" fill={GREEN} />
          <rect x="930" y="284" width="88" height="26" rx="13" fill="#334155" />
          <rect x="930" y="318" width="88" height="26" rx="13" fill="#243b60" />
        </>
      );

    case 'repo-rate-loan':
      return (
        <>
          <rect x="704" y="172" width="372" height="286" rx="30" fill="#101d3b" />
          <path d="M 744 360 C 784 326, 826 326, 864 344 C 902 362, 944 286, 1020 248" stroke={GREEN} strokeWidth="8" fill="none" strokeLinecap="round" />
          <circle cx="744" cy="360" r="14" fill={NAVY} />
          <circle cx="864" cy="344" r="14" fill="#7dd3fc" />
          <circle cx="1020" cy="248" r="14" fill={GREEN} />
          <rect x="754" y="224" width="122" height="86" rx="20" fill="#f8fbff" />
          <rect x="778" y="244" width="74" height="14" rx="7" fill="#cbd5e1" />
          <rect x="778" y="268" width="54" height="10" rx="5" fill={GREEN} />
          <rect x="910" y="224" width="124" height="128" rx="22" fill="#163765" />
          <rect x="934" y="248" width="76" height="12" rx="6" fill="#dbeafe" opacity="0.8" />
          <rect x="934" y="272" width="44" height="12" rx="6" fill="#dbeafe" opacity="0.8" />
          <rect x="934" y="296" width="60" height="12" rx="6" fill="#dbeafe" opacity="0.8" />
        </>
      );

    default:
      return (
        <>
          <rect x="704" y="176" width="372" height="280" rx="32" fill="#101d3b" />
          <rect x="744" y="214" width="154" height="104" rx="22" fill="#12264d" />
          <rect x="916" y="214" width="118" height="104" rx="22" fill="#17384b" />
          <rect x="744" y="334" width="112" height="90" rx="18" fill="#143058" />
          <rect x="868" y="334" width="166" height="90" rx="18" fill="#162e56" />
          <FinanceGrid x={772} y={244} />
        </>
      );
  }
}

export function BlogGeneratedVisual({
  variant,
  mode,
  title,
  subtitle,
  category,
  alt,
}: BlogGeneratedVisualProps) {
  const isThumbnail = mode === 'thumbnail';
  const headerLabel = normalizeText(category || subtitle || 'RupeeKit', 28);
  const titleLines = mode === 'thumbnail' ? [] : splitTextIntoLines(title || headerLabel, isThumbnail ? 18 : 30, 2);
  const subtitleLines = !isThumbnail && subtitle ? splitTextIntoLines(subtitle, 34, 2) : [];
  const smallCaption = isThumbnail ? normalizeText(subtitle || category || 'Editorial finance visual', 28) : '';

  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full w-full overflow-hidden rounded-2xl border border-slate-700/70 bg-slate-950 shadow-inner"
    >
      <svg
        aria-hidden="true"
        focusable="false"
        viewBox="0 0 1200 675"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id={`blog-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={DEEP_NAVY} />
            <stop offset="55%" stopColor="#0a214e" />
            <stop offset="100%" stopColor="#07172f" />
          </linearGradient>
          <linearGradient id={`blog-accent-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={GREEN} />
            <stop offset="100%" stopColor={BRIGHT_GREEN} />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="1200" height="675" fill={`url(#blog-grad-${variant})`} />
        <circle cx="1030" cy="115" r="164" fill={GREEN} opacity="0.10" />
        <circle cx="930" cy="565" r="220" fill={NAVY} opacity="0.18" />
        <circle cx="175" cy="570" r="194" fill="#1a3767" opacity="0.18" />
        <path d="M 0 500 C 220 420, 380 590, 600 510 S 980 420, 1200 500" stroke="#7dd3fc" strokeWidth="2" opacity="0.15" fill="none" />
        <path d="M 0 106 C 180 144, 320 84, 480 118 S 780 168, 1200 106" stroke="#8dd6ff" strokeWidth="2" opacity="0.12" fill="none" />

        <Pill x={58} y={58} width={Math.max(154, headerLabel.length * 8 + 36)} label={headerLabel} fill={NAVY} textFill="#ffffff" />
        <text x="1136" y="83" textAnchor="end" fill="#dbeafe" fontSize="16" fontWeight="700" opacity="0.8">
          rupeekit.co.in
        </text>

        {!isThumbnail ? (
          <>
            <TextLines
              lines={titleLines}
              x={58}
              y={160}
              lineHeight={45}
              fontSize={titleLines.length > 1 ? 39 : 44}
              fill="#ffffff"
              fontWeight={800}
            />
            {subtitleLines.length > 0 ? (
              <TextLines
                lines={subtitleLines}
                x={58}
                y={310}
                lineHeight={31}
                fontSize={24}
                fill="#dbeafe"
                fontWeight={500}
              />
            ) : null}
            <rect x="58" y="344" width="222" height="10" rx="5" fill={`url(#blog-accent-${variant})`} />
          </>
        ) : (
          <>
            <TextLines
              lines={splitTextIntoLines(smallCaption, 22, 2)}
              x={58}
              y={160}
              lineHeight={26}
              fontSize={22}
              fill="#ffffff"
              fontWeight={700}
            />
            <rect x="58" y="210" width="168" height="9" rx="4.5" fill="#dbeafe" opacity="0.55" />
            <rect x="58" y="228" width="124" height="9" rx="4.5" fill={`url(#blog-accent-${variant})`} />
          </>
        )}

        <IllustrationFrame x={isThumbnail ? 664 : 676} y={isThumbnail ? 176 : 170} width={isThumbnail ? 470 : 466} height={isThumbnail ? 296 : 294}>
          {renderIllustration(variant, mode)}
        </IllustrationFrame>

        <FinanceGrid x={92} y={436} />
        <FinanceGrid x={272} y={466} />
        <FinanceGrid x={462} y={452} />
      </svg>
    </div>
  );
}
