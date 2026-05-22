import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Start Here: Beginner Money Tools and Guides | RupeeKit',
  description: 'Start your money journey with RupeeKit. Explore free calculators, beginner guides, and educational resources to make confident financial decisions.',
};

export default function StartHerePage() {
  const steps = [
    {
      title: 'Check Your Money Health Score',
      description: 'Assess your current financial situation, habits, and mindset to receive a personalized money health score and actionable next steps.',
      href: '/money-health-check',
      actionText: 'Take the 60-Second Quiz →',
      badge: 'Quiz',
      badgeColor: 'bg-emerald-50 border-emerald-100 text-brandGrowthGreen',
    },
    {
      title: 'Explore Free Calculators',
      description: 'Estimate take-home salary, loan EMIs, GST splits, mutual fund SIP returns, and fixed deposit interest with clear formulas and step-by-step math.',
      href: '/#calculators',
      actionText: 'Browse Calculators →',
      badge: 'Tools',
      badgeColor: 'bg-sky-50 border-sky-100 text-sky-700',
    },
    {
      title: 'Start the 30-Day Budget Challenge',
      description: 'Join our daily checklist challenge to build awareness, audit spending, understand emergency fund needs, and build a solid personal budget.',
      href: '/resources/30-day-budget-challenge',
      actionText: 'Begin Challenge →',
      badge: 'Challenge',
      badgeColor: 'bg-indigo-50 border-indigo-100 text-indigo-700',
    },
    {
      title: 'Read Beginner Finance Guides',
      description: 'Explore simple, jargon-free explanations of core concepts like budgeting rules, emergency funds, debt management, and investing basics.',
      href: '/blog',
      actionText: 'Read Guides →',
      badge: 'Guides',
      badgeColor: 'bg-amber-50 border-amber-100 text-amber-700',
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-12">
      {/* Hero Section */}
      <section className="rounded-3xl bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 px-6 py-10 md:px-12 md:py-12 text-white shadow-xl relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full bg-brandNavy/40 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl font-black tracking-tight leading-tight md:text-5xl text-white">
            Start your money journey with one simple step
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">
            RupeeKit offers free financial calculators, beginner-friendly guides, and interactive educational resources. We explain the formulas and concepts behind the numbers, helping you understand how your money works so you can make confident financial decisions.
          </p>
        </div>
      </section>

      {/* Steps Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl font-black text-brandDeepNavy md:text-3xl">Choose your path</h2>
          <p className="mt-2 text-sm text-brandMuted">Select any option below to begin learning and planning.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.title}
              className="flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition hover:-translate-y-0.5"
            >
              <div>
                <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${step.badgeColor}`}>
                  {step.badge}
                </span>
                <h3 className="mt-4 text-lg font-bold tracking-tight text-brandDeepNavy">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brandMuted">
                  {step.description}
                </p>
              </div>
              <Link
                href={step.href}
                className="mt-6 inline-flex items-center text-xs font-bold text-brandNavy hover:text-brandDeepNavy transition"
              >
                {step.actionText}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Disclaimer */}
      <section className="rounded-2xl border border-brandBorder bg-white p-6 text-xs leading-relaxed text-brandMuted shadow-sm">
        <p className="font-bold text-brandDeepNavy mb-2 text-sm">Educational Disclaimer</p>
        <p>
          RupeeKit content is for general educational information only and is not financial, tax, legal, or investment advice.
        </p>
      </section>
    </div>
  );
}
