import type { Metadata } from 'next';
import Link from 'next/link';

import AnswerEngineSummary from '@/components/seo/AnswerEngineSummary';
import EditorialByline from '@/components/seo/EditorialByline';
import QuickAnswerBox from '@/components/seo/QuickAnswerBox';
import {
  CORRECTIONS_POLICY_URL,
  EDITORIAL_POLICY_URL,
  SITE_URL,
  editorialTeamRef,
} from '@/lib/seo/editorial';

const PAGE_URL = `${SITE_URL}/8th-pay-commission`;
const CALCULATOR_URL = '/tools/8th-pay-commission-salary-calculator-india';
const LAST_REVIEWED_ISO = '2026-08-12';

const TITLE = '8th Pay Commission 2026: Fitment Factor, Salary & Status';
const DESCRIPTION =
  'What is settled about the 8th Pay Commission and what is still only a scenario — fitment factor, how revised basic pay is calculated, DA merger, and where to check the official position.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'RupeeKit',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESCRIPTION },
};

const settledVsSpeculation = [
  {
    claim: 'A fitment factor of 2.57 / 2.86 / 3.68 has been approved',
    verdict: 'Not settled',
    detail:
      'No fitment factor has been notified. 2.57 is the factor the 7th CPC used; the larger numbers circulating are association demands and media projections, not decisions. Every figure on our calculator is a user-selectable scenario for exactly this reason.',
  },
  {
    claim: 'Revised basic = current basic × fitment factor',
    verdict: 'Settled mechanics',
    detail:
      'This is how a pay commission revision has historically worked. The multiplier is unknown; the arithmetic is not. DA, HRA and transport allowance are then recalculated on the new basic.',
  },
  {
    claim: 'DA resets to zero on implementation',
    verdict: 'Historically true',
    detail:
      'When a new pay structure takes effect, accumulated DA is merged into the revised basic and the DA percentage restarts from a low base. This is why a large fitment factor does not translate into a proportionate rise in take-home pay.',
  },
  {
    claim: 'Arrears will be paid from the effective date',
    verdict: 'Depends on notification',
    detail:
      'Whether arrears are paid, and from which date, is decided in the government resolution accepting the recommendations — not by the Commission itself. Do not plan around an arrears figure until the resolution is published.',
  },
];

const faqs = [
  {
    question: 'What is the fitment factor, in plain terms?',
    answer:
      'It is a single multiplier applied to your existing basic pay to arrive at your revised basic pay. If your basic is Rs 44,900 and the factor is 2.57, your revised basic is Rs 1,15,393. Everything computed as a percentage of basic — DA, HRA, transport allowance, and eventually pension and gratuity — is then recalculated on the higher figure, which is why this one number dominates every projection you see.',
  },
  {
    question: 'Has the 8th Pay Commission fitment factor been announced?',
    answer:
      'No. As at the last review of this page, no fitment factor has been officially notified. Figures being quoted publicly are either the 7th CPC factor of 2.57 used as a reference point, or demands and projections from employee associations and media. Treat every salary projection — including ours — as a scenario, not a forecast.',
  },
  {
    question: 'Why does a 2.57x fitment factor not mean 2.57x my salary?',
    answer:
      'Because your current gross already includes a large DA component that gets merged into the revised basic and then restarts near zero. The multiplier applies to basic pay, not to gross. A big jump in basic combined with a DA reset typically produces a much smaller increase in actual take-home pay than the headline factor suggests.',
  },
  {
    question: 'When will the 8th Pay Commission be implemented?',
    answer:
      'Implementation follows a sequence: the Commission is constituted, terms of reference are notified, it submits recommendations, the government issues a resolution accepting or modifying them, and departments then issue pay-fixation orders. Dates circulating before the government resolution are projections. Check the Department of Expenditure and PIB for the official position rather than relying on news aggregation.',
  },
  {
    question: 'How will it affect pension and gratuity?',
    answer:
      'Pension revision has historically tracked the pay revision, and gratuity is computed on basic plus DA, so both move with the revised structure. The exact mechanism — whether by notional pay fixation or a flat multiplier — is set out in the government resolution, and it has differed between commissions.',
  },
];

const relatedTools = [
  {
    href: CALCULATOR_URL,
    label: '8th Pay Commission Salary Calculator',
    note: 'Run your own basic pay through selectable fitment-factor scenarios and see revised basic, DA, HRA and gross.',
  },
  {
    href: '/tools/salary-in-hand-calculator-india',
    label: 'In-Hand Salary Calculator',
    note: 'Work back from gross to take-home after PF, professional tax and income tax.',
  },
  {
    href: '/tools/gratuity-calculator-india',
    label: 'Gratuity Calculator',
    note: 'Gratuity is computed on basic plus DA, so a pay revision moves it too.',
  },
  {
    href: '/tools/hra-exemption-calculator-india',
    label: 'HRA Exemption Calculator',
    note: 'A higher basic changes both your HRA and the exemption you can claim on it.',
  },
  {
    href: '/tools/epf-corpus-calculator-india',
    label: 'EPF Corpus Calculator',
    note: 'Higher basic means higher statutory contributions and a larger long-run corpus.',
  },
  {
    href: '/tools/nps-calculator-india',
    label: 'NPS Calculator',
    note: 'Central government employees under NPS contribute a percentage of basic plus DA.',
  },
];

const relatedReading = [
  {
    href: '/blog/how-to-calculate-in-hand-salary-from-ctc-india',
    label: 'How to Calculate In-Hand Salary from CTC in India',
    note: 'Why gross and take-home diverge — the same reason a fitment factor overstates the raise.',
  },
  {
    href: '/blog/new-labour-code-gratuity-rules-india-2026',
    label: 'New Labour Code Gratuity Rules 2026',
    note: 'How the wage definition change interacts with basic pay.',
  },
  {
    href: '/government-salary-updates',
    label: 'Government Salary Updates',
    note: 'DA, pay revision, pension and allowance tracking.',
  },
];

const officialSources = [
  {
    label: 'Department of Expenditure, Ministry of Finance — pay commission orders',
    href: 'https://doe.gov.in',
  },
  {
    label: 'Press Information Bureau — official announcements',
    href: 'https://www.pib.gov.in/',
  },
  {
    label: 'Labour Bureau — AICPI-IW index used for DA calculation',
    href: 'https://labourbureau.gov.in',
  },
];

export default function EighthPayCommissionHubPage() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      inLanguage: 'en-IN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@type': 'Thing', name: '8th Central Pay Commission' },
      author: editorialTeamRef,
      reviewedBy: editorialTeamRef,
      publisher: { '@id': `${SITE_URL}/#organization` },
      publishingPrinciples: EDITORIAL_POLICY_URL,
      correctionsPolicy: CORRECTIONS_POLICY_URL,
      dateModified: LAST_REVIEWED_ISO,
      citation: officialSources.map((source) => source.href),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: '8th Pay Commission', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: { '@type': 'Answer', text: faq.answer },
      })),
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      {schemas.map((schema) => (
        <script
          key={schema['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-950">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>8th Pay Commission</span>
      </nav>

      <header className="mt-8">
        <span className="rounded-full bg-amber-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-amber-800">
          Government Salary
        </span>
        <h1 className="mt-5 text-4xl font-black tracking-tight text-brandDeepNavy md:text-5xl">
          8th Pay Commission 2026: Fitment Factor, Salary &amp; Status
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Almost every 8th Pay Commission number in circulation is a projection
          wearing the clothes of a decision. This page separates what is actually
          settled from what is not, explains the arithmetic that will apply
          whatever the final factor turns out to be, and points you at the
          official sources.
        </p>
        <EditorialByline className="mt-4" updatedIso={LAST_REVIEWED_ISO} />
      </header>

      <div className="mt-8">
        <QuickAnswerBox
          title="Quick Answer"
          question="How much will salary rise under the 8th Pay Commission?"
          answer="Revised basic pay = current basic pay × fitment factor. No fitment factor has been officially notified, so no reliable rupee answer exists yet. The 7th Pay Commission used 2.57, which is why it is the common reference point. Because accumulated DA is merged into the revised basic and restarts near zero, take-home pay rises by considerably less than the fitment factor implies."
          formula="Revised basic = current basic × fitment factor; DA, HRA and TA are then recalculated on the revised basic"
          example="A current basic of Rs 44,900 at a 2.57 factor gives a revised basic of Rs 1,15,393 — a scenario, not a forecast."
          note="No fitment factor has been notified. Every figure here is a planning scenario. Confirm the official position on doe.gov.in and pib.gov.in."
          links={[
            {
              label: 'Run your own basic pay through the scenarios',
              href: CALCULATOR_URL,
            },
          ]}
        />
      </div>

      <AnswerEngineSummary
        className="mt-6"
        summary="RupeeKit's 8th Pay Commission hub explains that revised basic pay equals current basic pay multiplied by a fitment factor, that no fitment factor has been officially notified as at August 2026, and that widely quoted figures such as 2.57 are references to the 7th Pay Commission rather than decisions. Because accumulated dearness allowance is merged into the revised basic and restarts from a low base, the increase in take-home pay is materially smaller than the fitment factor suggests. Arrears and pension revision depend on the government resolution accepting the recommendations, not on the Commission's report alone."
      />

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brandDeepNavy">
          Settled vs speculation
        </h2>
        <div className="mt-5 space-y-4">
          {settledVsSpeculation.map((row) => (
            <div
              key={row.claim}
              className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h3 className="font-bold text-slate-900">{row.claim}</h3>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                    row.verdict === 'Not settled'
                      ? 'bg-rose-100 text-rose-700'
                      : row.verdict === 'Depends on notification'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {row.verdict}
                </span>
              </div>
              <p className="mt-3 leading-7 text-slate-600">{row.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brandDeepNavy">
          Why the headline factor overstates your raise
        </h2>
        <p className="mt-4 leading-8 text-slate-700">
          Your current gross is basic plus a DA percentage that has been climbing
          for years, plus HRA and allowances. When a new pay structure takes
          effect, that accumulated DA is folded into the revised basic and the DA
          percentage restarts near zero. So the fitment factor is applied to
          basic, but a large part of what it &ldquo;adds&rdquo; is money you were
          already receiving as DA.
        </p>
        <p className="mt-4 leading-8 text-slate-700">
          The practical consequence: compare <em>revised gross against current
          gross</em>, never revised basic against current basic. The{' '}
          <Link
            href={CALCULATOR_URL}
            className="font-semibold text-brandNavy underline underline-offset-2"
          >
            8th Pay Commission salary calculator
          </Link>{' '}
          lets you set the fitment factor and DA percentage yourself so you can
          see that gap for your own pay, rather than a stock example.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brandDeepNavy">
          Calculators for this cluster
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm transition hover:border-brandNavy/30 hover:shadow-md"
            >
              <p className="font-bold text-brandNavy">{tool.label}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tool.note}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brandDeepNavy">Read next</h2>
        <ul className="mt-5 space-y-3">
          {relatedReading.map((item) => (
            <li key={item.href} className="rounded-2xl border border-brandBorder bg-white p-5">
              <Link
                href={item.href}
                className="font-bold text-brandNavy underline underline-offset-2"
              >
                {item.label}
              </Link>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="faqs" className="mt-12">
        <h2 className="text-2xl font-bold text-brandDeepNavy">
          8th Pay Commission questions, answered
        </h2>
        <div className="mt-5 space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm"
            >
              <h3 className="font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 leading-7 text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="source-and-methodology"
        className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
      >
        <h2 className="text-2xl font-bold text-brandDeepNavy">Source and methodology</h2>
        <p className="mt-4 leading-8 text-slate-700">
          This page describes the mechanics of a pay commission revision, which
          are stable across commissions, and is explicit about which inputs are
          undecided. It does not state a fitment factor as fact, and it does not
          reproduce projections from news aggregation as if they were decisions.
          When the government resolution is published, this page and the
          calculator will be revised against it and the review date updated.
        </p>
        <ul className="mt-4 space-y-2">
          {officialSources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-semibold text-brandNavy underline underline-offset-2"
              >
                {source.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm leading-relaxed text-slate-500">
          Educational information only, not personal financial advice. RupeeKit is
          not affiliated with or endorsed by any government department. Spotted
          something out of date?{' '}
          <Link href="/corrections-policy" className="underline underline-offset-2">
            Tell us
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
