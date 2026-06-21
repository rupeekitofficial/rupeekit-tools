import Link from 'next/link';
import type {
  DiscoverCalculatorCta,
  DiscoverCalculatorLink,
} from '@/lib/discover-content';

interface DiscoverArticleCalloutsProps {
  summary?: string;
  whyItMatters?: string;
  whoItAffects?: string;
  lastUpdatedLabel?: string;
  sourceMethodology?: string[];
  calculatorCta?: DiscoverCalculatorCta;
  relatedCalculatorLinks?: DiscoverCalculatorLink[];
}

export default function DiscoverArticleCallouts({
  summary,
  whyItMatters,
  whoItAffects,
  lastUpdatedLabel,
  sourceMethodology,
  calculatorCta,
  relatedCalculatorLinks,
}: DiscoverArticleCalloutsProps) {
  const hasHighlights = Boolean(summary || whyItMatters || whoItAffects);
  const hasMethodology = Boolean(lastUpdatedLabel || sourceMethodology?.length);
  const hasLinks = Boolean(calculatorCta || relatedCalculatorLinks?.length);

  if (!hasHighlights && !hasMethodology && !hasLinks) {
    return null;
  }

  return (
    <div className="mt-6 space-y-4">
      {hasHighlights ? (
        <section className="rounded-2xl border border-brandBorder bg-brandBgSoft p-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-brandNavy">
            Discover-ready summary
          </p>
          {summary ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{summary}</p>
          ) : null}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {whyItMatters ? (
              <div className="rounded-2xl border border-brandBorder bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brandDeepNavy">
                  Why it matters
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{whyItMatters}</p>
              </div>
            ) : null}
            {whoItAffects ? (
              <div className="rounded-2xl border border-brandBorder bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brandDeepNavy">
                  Who it affects
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{whoItAffects}</p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasMethodology ? (
        <section className="rounded-2xl border border-brandBorder bg-white p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            {lastUpdatedLabel ? (
              <div className="md:max-w-[220px]">
                <p className="text-[11px] font-bold uppercase tracking-wide text-brandDeepNavy">
                  Last updated
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-700">{lastUpdatedLabel}</p>
              </div>
            ) : null}

            {sourceMethodology && sourceMethodology.length > 0 ? (
              <div className="flex-1">
                <p className="text-[11px] font-bold uppercase tracking-wide text-brandDeepNavy">
                  Source and methodology
                </p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700">
                  {sourceMethodology.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasLinks ? (
        <section className="rounded-2xl border border-brandBorder bg-white p-5">
          {calculatorCta ? (
            <div className="rounded-2xl border border-brandNavy/15 bg-brandNavy/5 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-brandNavy">
                Calculator CTA
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {calculatorCta.description}
              </p>
              <Link
                href={calculatorCta.href}
                className="mt-4 inline-flex rounded-full bg-brandGrowthGreen px-4 py-2 text-xs font-bold text-white transition hover:bg-brandBrightGreen"
              >
                {calculatorCta.label}
              </Link>
            </div>
          ) : null}

          {relatedCalculatorLinks && relatedCalculatorLinks.length > 0 ? (
            <div className="mt-4">
              <p className="text-[11px] font-bold uppercase tracking-wide text-brandDeepNavy">
                Related calculator links
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {relatedCalculatorLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-brandNavy/15 bg-brandNavy/5 px-3 py-1.5 text-xs font-semibold text-brandNavy transition hover:bg-brandNavy/10"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
