import type { Metadata } from 'next';
import Link from 'next/link';
import { getLiveTools } from '@/lib/tools';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';

export const metadata: Metadata = {
  title: { absolute: 'Free India Salary & Finance Calculators | RupeeKit' },
  description:
    'Use free India-focused calculators, beginner guides, and visual breakdowns to estimate salary, loans, savings, tax, and everyday money decisions.',
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: 'Free India Salary & Finance Calculators | RupeeKit',
    description:
      'Use free India-focused calculators, beginner guides, and visual breakdowns to estimate salary, loans, savings, tax, and everyday money decisions.',
    url: SITE_URL,
    siteName: 'RupeeKit',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free India Salary & Finance Calculators | RupeeKit',
    description:
      'Use free India-focused calculators, beginner guides, and visual breakdowns to estimate salary, loans, savings, tax, and everyday money decisions.',
  },
};

export default function HomePage() {
  const tools = getLiveTools();
  const categories = Array.from(new Set(tools.map((tool) => tool.category)));
  const showUpdates = true;
  const featuredTaxGuideHref = '/blog/itr-2-ay-2026-27-filing-guide';
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'RupeeKit',
    alternateName: 'Rupee Kit',
    url: `${SITE_URL}/`,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12 space-y-12 md:space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      {/* Hero & Trust Strip Group */}
      <div className="space-y-6 md:space-y-8">
        {/* Hero Section */}
        <section className="rounded-3xl bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 px-6 py-10 md:px-12 md:py-12 text-white shadow-xl relative overflow-hidden">
          {/* Subtle decorative background accent */}
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-brandNavy/40 blur-3xl pointer-events-none"
          />
          
          <div className="relative z-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brandBrightGreen">
              Free Finance Calculators & Tools
            </p>
            <h1 className="mt-4 text-3xl font-black tracking-tight leading-tight md:text-5xl text-white">
              Understand your money with simple calculators
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 md:text-base">
              Use free calculators, beginner guides, and visual breakdowns to estimate salary, loans, savings, tax, and everyday money decisions.
            </p>
            
            {/* Action buttons */}
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/money-health-check"
                className="rounded-full bg-brandGrowthGreen px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brandBrightGreen hover:shadow-md transition text-center"
              >
                Check Your Money Health Score
              </Link>
              <Link
                href="#calculators"
                className="rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition text-center"
              >
                Explore Free Calculators
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {categories.map((category) => (
                <span key={category} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Strip */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brandDeepNavy">No signup needed</h4>
              <p className="mt-1 text-[11px] text-brandMuted leading-relaxed">
                Use all our calculators instantly. No email address, accounts, or phone numbers required.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brandDeepNavy">Educational estimates</h4>
              <p className="mt-1 text-[11px] text-brandMuted leading-relaxed">
                We focus on teaching the formulas and logic behind the math, helping you understand your choices.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-brandBorder bg-white p-4 shadow-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brandNavy/10 text-brandNavy">
              <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-brandDeepNavy">Beginner-friendly tools</h4>
              <p className="mt-1 text-[11px] text-brandMuted leading-relaxed">
                Designed with clean inputs, clear explanations, and interactive charts for easy decision-making.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Latest Updates Section */}
      {showUpdates && (
      <section className="space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-brandDeepNavy md:text-3xl">
              Latest Updates
            </h2>
            <p className="mt-1 text-sm text-brandMuted">
              Finance, tax, and government salary updates explained for everyday Indians.
            </p>
          </div>
          <Link
            href="/updates"
            className="text-sm font-bold text-brandNavy hover:text-brandDeepNavy transition"
          >
            View all updates →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {/* Financial Updates card */}
          <Link
            href="/financial-updates"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-blue-50 border border-blue-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-800">
                Finance &amp; Tax
              </span>
              <h3 className="mt-3 text-sm font-bold tracking-tight text-brandDeepNavy group-hover:text-brandNavy transition">
                Financial Updates
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-brandMuted">
                RBI, income tax, GST, SEBI, and banking updates explained simply.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-brandBorder text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
              Explore →
            </p>
          </Link>
          {/* Government Salary card */}
          <Link
            href="/government-salary-updates"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                Govt Salary
              </span>
              <h3 className="mt-3 text-sm font-bold tracking-tight text-brandDeepNavy group-hover:text-brandNavy transition">
                Government Salary Updates
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-brandMuted">
                DA, DR, pay commission, pension, and salary circular formats.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-brandBorder text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
              Explore →
            </p>
          </Link>
          {/* State-wise card */}
          <Link
            href="/government-salary-updates#state-wise"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-800">
                State Updates
              </span>
              <h3 className="mt-3 text-sm font-bold tracking-tight text-brandDeepNavy group-hover:text-brandNavy transition">
                State-wise Employee Updates
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-brandMuted">
                Track DA and pay news for state government employees across India.
              </p>
            </div>
            <p className="mt-4 pt-3 border-t border-brandBorder text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
              Explore →
            </p>
          </Link>
        </div>
      </section>
      )}

      <section className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-brandNavy">
              Featured Tax Guide
            </p>
            <h2 className="mt-1 text-lg font-bold text-brandDeepNavy">
              ITR-2 AY 2026-27: Who Must File, Due Date & Preparation Guide
            </h2>
            <p className="mt-1 text-xs text-brandMuted">
              Understand eligibility, deadlines, documents, and filing checkpoints before you submit.
            </p>
            <p className="mt-2 text-xs text-brandMuted">
              Compare outcomes first with the{' '}
              <Link
                href="/tools/income-tax-calculator-old-vs-new-regime-india"
                className="font-semibold text-brandNavy hover:underline"
              >
                Old vs New Tax Regime Calculator
              </Link>
              .
            </p>
          </div>
          <Link
            href={featuredTaxGuideHref}
            className="inline-flex items-center rounded-full border border-brandNavy/20 bg-brandNavy/5 px-4 py-2 text-xs font-bold text-brandNavy transition hover:bg-brandNavy hover:text-white"
          >
            Read Guide →
          </Link>
        </div>
      </section>

      <section className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm">
        <div className="max-w-3xl">
          <h2 className="text-lg font-bold text-brandDeepNavy">Popular Money Questions</h2>
          <p className="mt-1 text-xs text-brandMuted">
            Jump directly to practical answers from RupeeKit calculators and guides.
          </p>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          <li>
            <Link
              href="/tools/income-tax-calculator-old-vs-new-regime-india"
              className="text-sm font-semibold text-brandNavy hover:text-brandDeepNavy hover:underline"
            >
              New Regime vs Old Regime Calculator for India
            </Link>
          </li>
          <li>
            <Link
              href="/tools/emergency-fund-calculator-india"
              className="text-sm font-semibold text-brandNavy hover:text-brandDeepNavy hover:underline"
            >
              How much emergency fund should I have?
            </Link>
          </li>
          <li>
            <Link
              href="/tools/personal-loan-emi-calculator-india"
              className="text-sm font-semibold text-brandNavy hover:text-brandDeepNavy hover:underline"
            >
              Is lower EMI always cheaper?
            </Link>
          </li>
          <li>
            <Link
              href="/tools/hra-exemption-calculator-india"
              className="text-sm font-semibold text-brandNavy hover:text-brandDeepNavy hover:underline"
            >
              Can HRA be claimed in the new tax regime?
            </Link>
          </li>
          <li>
            <Link
              href="/blog/how-much-emergency-fund"
              className="text-sm font-semibold text-brandNavy hover:text-brandDeepNavy hover:underline"
            >
              How much emergency fund do you need?
            </Link>
          </li>
          <li className="sm:col-span-2">
            <Link
              href="/blog/itr-2-ay-2026-27-filing-guide"
              className="text-sm font-semibold text-brandNavy hover:text-brandDeepNavy hover:underline"
            >
              Who must file ITR-2 AY 2026-27?
            </Link>
          </li>
        </ul>
      </section>

      {/* Popular Tools Preview Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-brandDeepNavy md:text-3xl">Popular Tools</h2>
          <p className="mt-2 text-sm text-brandMuted">Quickly access our most used interactive financial utilities.</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Emergency Fund */}
          <Link
            href="/tools/emergency-fund-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Savings
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Emergency Fund Calculator India
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Estimate your 3, 6, 9 or 12 month safety corpus using expenses, EMIs, current savings and shortfall.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 2: Personal Loan EMI */}
          <Link
            href="/tools/personal-loan-emi-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Loans
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Personal Loan EMI Calculator India
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Compare monthly EMI, total interest, processing fee impact, tenure options and affordability.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 3: HRA Exemption */}
          <Link
            href="/tools/hra-exemption-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Tax
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                HRA Exemption Calculator India
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Compare HRA, rent-minus-10%, and city cap rules to estimate old regime HRA exemption.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 4: Salary In-Hand */}
          <Link
            href="/tools/salary-in-hand-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Salary
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Salary In-Hand Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Estimate monthly take-home salary from annual CTC, PF, and tax deductions.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 5: Old vs New Tax Regime */}
          <Link
            href="/tools/income-tax-calculator-old-vs-new-regime-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Tax
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Old vs New Tax Regime Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Compare old and new regime tax estimates, deductions, rebate and cess for supported rule years.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator
              </p>
            </div>
          </Link>

          {/* Card 6: FD / Savings Growth */}
          <Link
            href="/tools/fd-calculator-india"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
                Savings
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                FD / Savings Growth Calculator
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Calculate interest earned and maturity amounts for fixed deposits.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Open calculator →
              </p>
            </div>
          </Link>

          {/* Card 7: Money Health Check */}
          <Link
            href="/money-health-check"
            className="group flex flex-col justify-between rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
          >
            <div>
              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandGrowthGreen">
                Quiz
              </span>
              <h3 className="mt-3 text-base font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                Money Health Check
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Take a 60-second quiz to discover your financial wellness score.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-brandBorder">
              <p className="text-xs font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                Start Health Check →
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Engagement Layer: "Start with one simple step" */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandNavy">
            Engagement Hub
          </span>
          <h2 className="mt-4 text-3xl font-black tracking-tight text-brandDeepNavy md:text-4xl">
            Start with one simple step
          </h2>
          <p className="mt-2 text-brandMuted">
            Building financial security doesn&apos;t happen overnight. Choose an interactive option below to start.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <div className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
            <div>
              <span className="inline-block rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandGrowthGreen">
                Quiz
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                Check Money Health
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Take our 60-second self-reflection quiz to discover your Money Health Score and get 3 next steps.
              </p>
            </div>
            <Link
              href="/money-health-check"
              className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
            >
              Start Quiz <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
            <div>
              <span className="inline-block rounded-full bg-indigo-50 border border-indigo-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700">
                Challenge
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                30-Day Challenge
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Check off one bite-sized money checklist task daily. Track progress easily in your browser.
              </p>
            </div>
            <Link
              href="/resources/30-day-budget-challenge"
              className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
            >
              Join Challenge <span className="ml-1">→</span>
            </Link>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5">
            <div>
              <span className="inline-block rounded-full bg-amber-50 border border-amber-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                Guides
              </span>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                Finance Guides
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                Explore our beginner-friendly guides on budgeting, emergency funds, debt, and spending habits.
              </p>
            </div>
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
            >
              Read Guides <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Personal Finance Roadmap — Compact Preview */}
      <section className="rounded-3xl border border-brandBorder bg-white p-6 md:p-10 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brandNavy">
              Financial Milestones
            </span>
            <h2 className="mt-4 text-2xl font-black text-brandDeepNavy md:text-3xl">
              Your Personal Finance Roadmap
            </h2>
            <p className="mt-2 text-sm text-brandMuted">
              Six foundational milestones to build lasting financial security. Start with the basics.
            </p>
          </div>
          <Link
            href="/resources"
            className="shrink-0 self-start rounded-full border border-brandNavy/20 bg-brandNavy/5 px-4 py-2 text-xs font-bold text-brandNavy hover:bg-brandNavy hover:text-white transition"
          >
            See Full Roadmap →
          </Link>
        </div>

        {/* Compact 3-step preview */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-xs font-black text-white">1</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Foundation</span>
            </div>
            <p className="text-sm font-bold text-brandDeepNavy">Track &amp; Budget</p>
            <p className="mt-1 text-xs leading-relaxed text-brandMuted">Know your in-hand income and track where every rupee goes each month.</p>
          </div>
          <div className="rounded-2xl border border-sky-100 bg-sky-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-xs font-black text-white">2</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Safety Net</span>
            </div>
            <p className="text-sm font-bold text-brandDeepNavy">Emergency Fund</p>
            <p className="mt-1 text-xs leading-relaxed text-brandMuted">Build 3–6 months of expenses in a liquid, accessible account before investing.</p>
          </div>
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500 text-xs font-black text-white">3</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700">Growth</span>
            </div>
            <p className="text-sm font-bold text-brandDeepNavy">Pay Off Debt</p>
            <p className="mt-1 text-xs leading-relaxed text-brandMuted">Eliminate high-interest debt using Snowball or Avalanche strategy before compounding.</p>
          </div>
        </div>

        <p className="mt-5 text-center text-xs text-brandMuted">
          Stages 4–6 cover investing, insurance, and wealth compounding.{' '}
          <Link href="/resources" className="font-bold text-brandNavy hover:underline">
            View the complete roadmap →
          </Link>
        </p>
      </section>

      {/* Calculators Grid Section */}
      <section id="calculators" className="scroll-mt-20 space-y-8">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-brandDeepNavy md:text-4xl">All Financial Calculators</h2>
          <p className="mt-2 text-brandMuted">Start with any tool below. Accurate estimations for standard financial regimes.</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link 
              key={tool.slug} 
              href={`/tools/${tool.slug}`} 
              className="group flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
            >
              <div>
                <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/25 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brandNavy">
                  {tool.category}
                </span>
                <h3 className="mt-4 text-xl font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                  {tool.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-brandMuted">
                  {tool.shortDescription}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-brandBorder">
                <p className="text-sm font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                  Open calculator →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Educational Walkthrough Section */}
      <section className="rounded-[2rem] border border-brandBorder bg-white p-6 shadow-sm md:p-10">
        <h2 className="text-2xl font-black text-brandDeepNavy md:text-3xl">How to use these tools</h2>
        <p className="mt-2 text-brandMuted max-w-2xl text-sm">Follow three easy steps to plan your taxes, investments, and expenses accurately.</p>
        
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandBorder/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandNavy/10 text-brandNavy font-bold">1</div>
            <p className="mt-4 font-bold text-brandDeepNavy text-base">Enter your values</p>
            <p className="mt-2 text-xs leading-relaxed text-brandMuted">Use values from your offer letter, bank statement, or savings schedule for accurate calculations.</p>
          </div>
          <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandBorder/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandNavy/10 text-brandNavy font-bold">2</div>
            <p className="mt-4 font-bold text-brandDeepNavy text-base">Review the formula</p>
            <p className="mt-2 text-xs leading-relaxed text-brandMuted">We explain the calculations behind each tool. Learn how your money is calculated, not just the end number.</p>
          </div>
          <div className="rounded-2xl bg-brandBgSoft p-5 border border-brandBorder/80">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brandNavy/10 text-brandNavy font-bold">3</div>
            <p className="mt-4 font-bold text-brandDeepNavy text-base">Verify decisions</p>
            <p className="mt-2 text-xs leading-relaxed text-brandMuted">Use results as educational guides. Always cross-verify major tax and loan choices with qualified professionals.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
