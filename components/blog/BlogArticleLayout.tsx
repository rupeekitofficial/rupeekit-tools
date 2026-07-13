'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog-posts';
import BlogHero from './BlogHero';
import TableOfContents from './TableOfContents';
import RelatedCalculatorLinks from './RelatedCalculatorLinks';
import FAQSection from './FAQSection';
import FinanceDisclaimer from './FinanceDisclaimer';
import AffiliateDisclosure from './AffiliateDisclosure';
import BrokerAffiliateDisclosure from './BrokerAffiliateDisclosure';
import BookRecommendationCard from './BookRecommendationCard';
import QuickAnswerBox from '@/components/seo/QuickAnswerBox';
import AnswerEngineSummary from '@/components/seo/AnswerEngineSummary';
import { BlogInlineVisual, BlogSharePreviewCard } from './BlogVisuals';
import BrokerComparisonCard from './BrokerComparisonCard';
import { Tax2026Stats, Tax2026CTA, Tax2026CompactCTA, CommonMistakesCards } from './Tax2026Visuals';
import {
  FilingDeadlineTimeline,
  CapitalGainsRateShift,
  OldVsNewRegimeSlabSnapshot,
  RebateComparison,
  ITR2TriggerMatrix
} from './ITR2DataVisuals';

interface BlogArticleLayoutProps {
  post: BlogPost;
}

function formatBlogDateLabel(isoDate?: string, fallback?: string) {
  if (!isoDate) return fallback ?? 'Not specified';
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) return fallback ?? 'Not specified';
  return parsed.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata',
  });
}

export default function BlogArticleLayout({ post }: BlogArticleLayoutProps) {
  const isEmergencyFundGuide = post.slug === 'how-much-emergency-fund';
  const showTaxCrossLinks =
    post.slug === 'itr-2-ay-2026-27-filing-guide' ||
    post.slug === 'income-tax-calculator-2026-calculator-guide' ||
    post.slug === 'personal-finance-checklist-for-salaried-people';
  const lastUpdatedLabel = formatBlogDateLabel(post.modifiedDateISO || post.publishedDateISO, post.date);
  const answerEngineSummary =
    post.answerEngineSummary ||
    `${post.h1} explains the key assumptions, practical steps, and common mistakes so you can plan with clearer estimates. This article is educational information only and should be cross-verified with official rules and records where required.`;

  // Helper to slugify section titles to match Table of Contents links
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs md:text-sm text-brandMuted mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brandNavy transition font-medium">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-brandNavy transition font-medium">
          Blog
        </Link>
        <span>/</span>
        <span className="text-brandText truncate max-w-[200px] md:max-w-none">{post.title}</span>
      </nav>

      {/* Hero Header */}
      <BlogHero
        title={post.h1}
        category={post.category}
        date={post.date}
        readTime={post.readTime}
        description={post.metaDescription}
        visualType={post.visualType}
        visualAlt={post.visualAlt}
        heroImage={post.heroImage}
        heroImageAlt={post.heroImageAlt}
        heroImageWidth={post.heroImageWidth}
        heroImageHeight={post.heroImageHeight}
      />

      {/* Main Grid Layout */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.42fr]">
        
        {/* Left Column: Article Body */}
        <article className="flex flex-col gap-8">
          
          {/* Amazon affiliate disclosure at top if applicable */}
          {post.amazonDisclosure && <AffiliateDisclosure />}

          {/* Broker affiliate disclosure at top if applicable */}
          {post.brokerAffiliateDisclosure && <BrokerAffiliateDisclosure />}

          <div className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
            {/* Intro */}
            <p className="text-base md:text-lg leading-relaxed text-slate-800 font-medium">
              {post.intro}
            </p>

            {post.quickAnswer ? (
              <div className="mt-6">
                <QuickAnswerBox
                  title={post.quickAnswer.title || 'Quick Answer'}
                  question={post.quickAnswer.question}
                  answer={post.quickAnswer.answer}
                  formula={post.quickAnswer.formula}
                  example={post.quickAnswer.example}
                  note={post.quickAnswer.note}
                  links={post.quickAnswer.links}
                />
              </div>
            ) : null}

            <AnswerEngineSummary className="mt-6" summary={answerEngineSummary} />

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                Last updated: {lastUpdatedLabel}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Educational information only. Verify applicability with official guidance and qualified professionals where needed.
              </p>
            </div>

            {isEmergencyFundGuide ? (
              <>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-slate-700">
                  Want to calculate your own safety corpus? Use the{' '}
                  <Link
                    href="/tools/emergency-fund-calculator-india"
                    className="font-semibold text-brandNavy hover:underline"
                  >
                    Emergency Fund Calculator India
                  </Link>{' '}
                  to estimate your 3, 6, 9 or 12 month emergency fund based on monthly expenses, EMI burden and
                  current savings.
                </p>
                <div className="mt-4 rounded-2xl border border-brandBorder bg-brandBgSoft p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-brandNavy">Related Planning Tools</p>
                  <p className="mt-2 text-xs leading-relaxed text-slate-700">
                    Continue with{' '}
                    <Link href="/tools/emergency-fund-calculator-india" className="font-semibold text-brandNavy hover:underline">
                      Emergency Fund Calculator India
                    </Link>
                    ,{' '}
                    <Link href="/tools/personal-loan-emi-calculator-india" className="font-semibold text-brandNavy hover:underline">
                      Personal Loan EMI Calculator India
                    </Link>
                    ,{' '}
                    <Link href="/tools/fd-calculator-india" className="font-semibold text-brandNavy hover:underline">
                      FD Calculator India
                    </Link>{' '}
                    and{' '}
                    <Link href="/tools/sip-calculator-india" className="font-semibold text-brandNavy hover:underline">
                      SIP Calculator India
                    </Link>
                    .
                  </p>
                </div>
              </>
            ) : null}

            {showTaxCrossLinks ? (
              <div className="mt-4 rounded-2xl border border-sky-200 bg-sky-50 p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-sky-800">Tax Planning Links</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-700">
                  Compare regimes with the{' '}
                  <Link href="/tools/income-tax-calculator-old-vs-new-regime-india" className="font-semibold text-sky-800 hover:underline">
                    Old vs New Tax Regime Calculator
                  </Link>
                  {' '}and the{' '}
                  <Link href="/tools/income-tax-calculator-old-vs-new-regime-india" className="font-semibold text-sky-800 hover:underline">
                    Income Tax Calculator Old vs New Regime
                  </Link>
                  . For alternate phrasing, use the{' '}
                  <Link href="/tools/income-tax-calculator-old-vs-new-regime-india" className="font-semibold text-sky-800 hover:underline">
                    New Regime vs Old Regime Calculator
                  </Link>
                  .{' '}
                  For HRA-specific estimation, use the{' '}
                  <Link href="/tools/hra-exemption-calculator-india" className="font-semibold text-sky-800 hover:underline">
                    HRA Exemption Calculator India
                  </Link>
                  . For return-prep steps, read the{' '}
                  <Link href="/blog/itr-2-ay-2026-27-filing-guide" className="font-semibold text-sky-800 hover:underline">
                    ITR-2 AY 2026-27 Filing Guide
                  </Link>
                  .
                </p>
              </div>
            ) : null}

            {post.slug === 'itr-2-ay-2026-27-filing-guide' && (
              <div className="mt-6 rounded-2xl border border-brandBorder bg-brandBgSoft p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brandDeepNavy">
                  Editorial Note
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                  This page is educational and does not guarantee tax savings or filing outcomes.
                  Always verify dates, rates, and eligibility from official government sources before filing.
                </p>
              </div>
            )}

            {post.slug === 'income-tax-calculator-2026-calculator-guide' && (
              <>
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-amber-900">
                    ⚠️ Educational Estimate Only
                  </p>
                  <p className="mt-2 text-xs leading-relaxed text-amber-800">
                    Tax rules can change by financial year. This guide is for educational planning only. Verify the latest slabs, deductions, rebates, and filing rules before making tax decisions.
                  </p>
                </div>
                <Tax2026CompactCTA />
              </>
            )}

            {/* Sections */}
            <div className="mt-8 space-y-10">
              {post.sections.map((section, idx) => {
                const sectionId = slugify(section.title);
                return (
                  <Fragment key={section.title}>
                    <section id={sectionId} className="scroll-mt-24 border-t border-brandBorder pt-8 first:border-0 first:pt-0">
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-brandDeepNavy">
                        {section.title}
                      </h2>
                      
                      {/* Paragraphs */}
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="mt-4 text-sm md:text-base leading-relaxed text-slate-700">
                          {p}
                        </p>
                      ))}

                      {/* Bullets */}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-4 list-disc space-y-2.5 pl-6 text-sm md:text-base text-slate-700">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {/* Example Calculations / Blocks */}
                      {section.example && (
                        <div className="mt-5 rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] p-5">
                          <h4 className="text-sm font-bold text-brandDeepNavy uppercase tracking-wider">
                            Practical Example: {section.example.title}
                          </h4>
                          <p className="mt-2 text-xs md:text-sm leading-relaxed text-slate-700">
                            {section.example.details}
                          </p>
                        </div>
                      )}
                    </section>
                    {idx === 0 && post.visualType && (
                      <BlogInlineVisual
                        type={post.visualType}
                        title={post.visualTitle || ''}
                        subtitle={post.visualSubtitle || ''}
                        alt={post.visualAlt || ''}
                      />
                    )}
                    {post.slug === 'itr-2-ay-2026-27-filing-guide' && section.title === 'Who must file ITR-2 for AY 2026-27?' && <ITR2TriggerMatrix />}
                    {post.slug === 'itr-2-ay-2026-27-filing-guide' && section.title === 'What changed in ITR-2 AY 2026-27?' && <CapitalGainsRateShift />}
                    {post.slug === 'itr-2-ay-2026-27-filing-guide' && section.title === 'ITR-2 due date and key deadlines' && <FilingDeadlineTimeline />}
                    {post.slug === 'itr-2-ay-2026-27-filing-guide' && section.title === 'Old vs new tax regime quick reminder' && (
                      <>
                        <OldVsNewRegimeSlabSnapshot />
                        <RebateComparison />
                      </>
                    )}
                    {post.slug === 'income-tax-calculator-2026-calculator-guide' && section.title === 'Why Use an Income Tax Calculator for 2026?' && (
                      <Tax2026Stats />
                    )}
                    {post.slug === 'income-tax-calculator-2026-calculator-guide' && section.title === 'Common Mistakes to Avoid' && (
                      <CommonMistakesCards />
                    )}
                    {post.slug === 'income-tax-calculator-2026-calculator-guide' && section.title === 'How to Project Your Future Taxes' && (
                      <div className="mt-8 mb-8">
                        <Tax2026CTA />
                      </div>
                    )}
                  </Fragment>
                );
              })}
            </div>

            {/* Broker comparison table with real CTA links */}
            {post.slug === 'zerodha-vs-upstox-vs-angel-one-demat-account' && (
              <BrokerComparisonCard />
            )}

            {/* Book lists for the books article */}
            {post.books && post.books.length > 0 && (
              <div className="mt-8 border-t border-brandBorder pt-8 space-y-6">
                <h2 className="text-2xl font-black text-brandDeepNavy">
                  Top Recommended Books
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {post.books.map((book) => (
                    <BookRecommendationCard key={book.title} book={book} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Soft CTA to use RupeeKit calculators at the end of article */}
            <div className="mt-10 border-t border-brandBorder pt-8">
              <div className="rounded-2xl bg-brandBgSoft border border-brandBorder p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-brandDeepNavy">Estimate Your Own Finances</h4>
                  <p className="text-xs text-brandMuted mt-1">
                    {isEmergencyFundGuide
                      ? 'Use the dedicated emergency fund calculator to estimate your safety corpus target and shortfall.'
                      : 'Try our free interactive calculators to plan your savings, loans, and taxes.'}
                  </p>
                </div>
                <Link
                  href={isEmergencyFundGuide ? '/tools/emergency-fund-calculator-india' : '/#calculators'}
                  className="rounded-full bg-brandGrowthGreen px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brandBrightGreen hover:shadow-md transition whitespace-nowrap"
                >
                  {isEmergencyFundGuide ? 'Go to Calculator' : 'Go to Calculators'}
                </Link>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <FAQSection faqs={post.faqs} />

          {/* Finance educational disclaimer */}
          <FinanceDisclaimer />

        </article>

        {/* Right Column: Sidebar (Sticky on Desktop) */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents sections={post.sections} />
          <RelatedCalculatorLinks slugs={post.relatedCalculators} />
          {post.visualType && <BlogSharePreviewCard post={post} />}
        </aside>

      </div>
    </div>
  );
}
