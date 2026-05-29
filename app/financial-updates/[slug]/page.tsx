import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { financialUpdates } from '@/data/financial-updates';
import UpdateVisual from '@/components/updates/UpdateVisual';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';

type VisualKey =
  | 'rbi'
  | 'income-tax'
  | 'gst'
  | 'sebi'
  | 'banking'
  | 'personal-finance'
  | 'government-salary'
  | 'financial-updates';

const categoryVisualMap: Record<string, VisualKey> = {
  RBI: 'rbi',
  'Income Tax': 'income-tax',
  GST: 'gst',
  SEBI: 'sebi',
  Banking: 'banking',
  'Personal Finance': 'personal-finance',
  Markets: 'sebi',
  'Government Salary': 'government-salary',
};

const categoryBadgeColors: Record<string, string> = {
  RBI: 'bg-blue-50 text-blue-800 border-blue-200',
  'Income Tax': 'bg-indigo-50 text-indigo-800 border-indigo-200',
  GST: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  SEBI: 'bg-violet-50 text-violet-800 border-violet-200',
  Banking: 'bg-slate-100 text-slate-700 border-slate-200',
  'Personal Finance': 'bg-green-50 text-green-800 border-green-200',
  Markets: 'bg-amber-50 text-amber-800 border-amber-200',
  'Government Salary': 'bg-orange-50 text-orange-800 border-orange-200',
};

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return financialUpdates.map((u) => ({ slug: u.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const update = financialUpdates.find((u) => u.slug === params.slug);
  if (!update) return { title: 'Update Not Found | RupeeKit' };
  const cleanSummary = update.summary.substring(0, 155);
  const pageUrl = `${SITE_URL}/financial-updates/${update.slug}`;
  return {
    title: { absolute: `${update.title} | RupeeKit Updates` },
    description: cleanSummary,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title: `${update.title} | RupeeKit Updates`,
      description: cleanSummary,
      url: pageUrl,
      siteName: 'RupeeKit',
      type: 'article',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${update.title} | RupeeKit Updates`,
      description: cleanSummary,
    },
  };
}

export default function FinancialUpdateDetailPage({ params }: PageProps) {
  const update = financialUpdates.find((u) => u.slug === params.slug);
  if (!update) notFound();
  const pageUrl = `${SITE_URL}/financial-updates/${update.slug}`;
  const dateModified = (update as { modifiedDate?: string }).modifiedDate || update.publishedDate;

  const visualType = (categoryVisualMap[update.category] ?? 'financial-updates') as VisualKey;
  const catColor = categoryBadgeColors[update.category] ?? 'bg-slate-100 text-slate-700 border-slate-200';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: update.title,
    description: update.summary,
    datePublished: update.publishedDate,
    dateModified,
    author: {
      '@type': 'Organization',
      name: 'RupeeKit',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'RupeeKit',
      url: SITE_URL,
    },
    mainEntityOfPage: pageUrl,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Financial Updates',
        item: `${SITE_URL}/financial-updates`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: update.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 md:py-12 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-brandMuted font-medium flex-wrap">
        <Link href="/" className="hover:text-brandNavy transition">Home</Link>
        <span aria-hidden="true">›</span>
        <Link href="/updates" className="hover:text-brandNavy transition">Updates</Link>
        <span aria-hidden="true">›</span>
        <Link href="/financial-updates" className="hover:text-brandNavy transition">Financial Updates</Link>
        <span aria-hidden="true">›</span>
        <span className="text-brandText line-clamp-1 max-w-[200px]">{update.title}</span>
      </nav>

      {/* Hero Header */}
      <section className="rounded-3xl bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 px-6 py-8 md:px-10 md:py-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <UpdateVisual type={visualType} size="sm" />
            <span className={`inline-block rounded-full border px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide ${catColor}`}>
              {update.category}
            </span>
            <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white/80">
              Educational Summary
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight leading-snug md:text-3xl text-white">
            {update.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-300">
            <span>{update.sourceName}</span>
            <span>·</span>
            <span>
              {new Date(update.publishedDate).toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="rounded-3xl border border-brandBorder bg-white p-6 md:p-8 shadow-sm">
        <p className="text-base leading-relaxed text-slate-700">{update.summary}</p>
      </section>

      {/* What Happened */}
      {update.whatHappened && (
        <section className="rounded-3xl border border-brandBorder bg-white p-6 md:p-8 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-brandDeepNavy flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brandNavy/10 text-brandNavy text-xs font-bold">1</span>
            What to Know
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">{update.whatHappened}</p>
        </section>
      )}

      {/* Why It Matters */}
      <section className="rounded-3xl border border-brandBorder bg-brandBgSoft p-6 md:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-brandDeepNavy flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brandNavy/10 text-brandNavy text-xs font-bold">2</span>
          Why It Matters
        </h2>
        <p className="text-sm leading-relaxed text-slate-700">{update.whyItMatters}</p>
      </section>

      {/* Who May Be Affected */}
      {update.whoMayBeAffected && (
        <section className="rounded-3xl border border-brandBorder bg-white p-6 md:p-8 shadow-sm space-y-3">
          <h2 className="text-lg font-bold text-brandDeepNavy flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brandNavy/10 text-brandNavy text-xs font-bold">3</span>
            Who May Be Affected
          </h2>
          <p className="text-sm leading-relaxed text-slate-700">{update.whoMayBeAffected}</p>
        </section>
      )}

      {/* Announcement vs Order Note */}
      {update.announcementVsOrderNote && (
        <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8 shadow-sm space-y-3">
          <h2 className="text-base font-bold text-amber-900">Announcement vs Official Order</h2>
          <p className="text-sm leading-relaxed text-amber-800">{update.announcementVsOrderNote}</p>
        </section>
      )}

      {/* What to Verify */}
      <section className="rounded-3xl border border-green-200 bg-green-50 p-6 md:p-8 shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-green-900 flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-200 text-green-800 text-xs font-bold">✓</span>
          What to Verify
        </h2>
        <p className="text-sm leading-relaxed text-green-900">{update.whatToVerify}</p>
      </section>

      {/* Official Source Link */}
      {update.sourceUrl && (
        <section className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-brandDeepNavy mb-3">Official Source</h2>
          <p className="text-xs text-brandMuted mb-4">
            Always verify information from the official government or regulatory body source below before making any financial decisions.
          </p>
          <a
            href={update.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-brandNavy px-6 py-2.5 text-sm font-bold text-white hover:bg-brandDeepNavy transition shadow-sm"
          >
            Visit Official Source ↗
          </a>
          <p className="mt-3 text-[11px] text-brandMuted">
            Opens {update.sourceName} · External official website
          </p>
        </section>
      )}

      {/* Tags */}
      {update.tags && update.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {update.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-brandBgSoft border border-brandBorder px-3 py-1 text-[11px] font-medium text-brandMuted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Related RupeeKit Links */}
      {update.relatedRupeeKitLinks.length > 0 && (
        <section className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-brandDeepNavy mb-4">Related RupeeKit Tools</h2>
          <div className="flex flex-wrap gap-3">
            {update.relatedRupeeKitLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full bg-brandNavy/5 border border-brandNavy/15 px-4 py-2 text-sm font-semibold text-brandNavy hover:bg-brandNavy/10 transition"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Educational Disclaimer */}
      <section className="rounded-2xl border border-brandBorder bg-brandBgSoft p-5 text-xs leading-relaxed text-brandMuted">
        <p className="font-bold text-brandDeepNavy mb-1">Educational Disclaimer</p>
        <p>
          RupeeKit updates are for general educational information only and are not financial, tax, legal, or investment advice. Always verify rules, rates, eligibility, dates, and circulars from official government or regulatory sources before taking any action. RupeeKit is not affiliated with or endorsed by any government body mentioned on this page.
        </p>
      </section>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        <Link
          href="/financial-updates"
          className="inline-flex items-center gap-2 text-sm font-bold text-brandNavy hover:text-brandDeepNavy transition"
        >
          ← Back to Financial Updates
        </Link>
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 text-sm font-semibold text-brandMuted hover:text-brandNavy transition"
        >
          Browse all updates →
        </Link>
      </div>
    </div>
  );
}
