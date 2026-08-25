import type { Metadata } from 'next';
import Link from 'next/link';

import AnswerEngineSummary from '@/components/seo/AnswerEngineSummary';
import EditorialByline from '@/components/seo/EditorialByline';
import QuickAnswerBox from '@/components/seo/QuickAnswerBox';
import { PAY_MATRIX_LEVELS } from '@/data/pay-matrix-levels';
import {
  CORRECTIONS_POLICY_URL,
  EDITORIAL_POLICY_URL,
  SITE_URL,
  editorialTeamRef,
} from '@/lib/seo/editorial';

const PAGE_URL = `${SITE_URL}/8th-pay-commission`;
const CALCULATOR_URL = '/tools/8th-pay-commission-salary-calculator-india';
const ARREARS_CALCULATOR_URL = '/tools/8th-pay-commission-arrears-calculator-india';
const PENSION_CALCULATOR_URL = '/tools/8th-pay-commission-pension-calculator-india';
const LAST_REVIEWED_ISO = '2026-08-17';

const TITLE = '8th Pay Commission 2026: Fitment Factor, Salary & Status';
const DESCRIPTION =
  'Official 8th Pay Commission status for August 2026: report timeline, consultation milestones, current activity, and what remains unnotified for salary, HRA, pension and arrears.';

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
    claim: 'Revised X/Y/Z HRA rates have been approved',
    verdict: 'Not settled',
    detail:
      'No 8th CPC HRA percentages or revised city classifications have been notified. Current 7th CPC HRA can be used as a clearly labelled planning reference, but not presented as the future rule.',
  },
  {
    claim: 'A single pension multiplier has been approved',
    verdict: 'Not settled',
    detail:
      'No pension revision multiplier, parity formula or notional pay-fixation method has been notified. Pension scenarios must keep current DR separate and state which illustrative method they use.',
  },
  {
    claim: 'Arrears will be paid from the effective date',
    verdict: 'Depends on notification',
    detail:
      'Whether arrears are paid, and from which date, is decided in the government resolution accepting the recommendations — not by the Commission itself. Do not plan around an arrears figure until the resolution is published.',
  },
];

const officialStatus = [
  {
    milestone: 'Commission constituted',
    date: '3 November 2025',
    status: 'Completed',
    detail: 'The Government of India constituted the 8th Central Pay Commission. Its 18-month period is for submitting recommendations; it is not an implementation deadline.',
  },
  {
    milestone: 'Public questionnaire',
    date: '5 February-31 March 2026',
    status: 'Closed',
    detail: 'The official questionnaire window has ended. Treat deadline searches as a completed consultation milestone, not a current submission opportunity.',
  },
  {
    milestone: 'Memoranda and representations',
    date: '5 March-15 June 2026',
    status: 'Closed',
    detail: 'The main online memorandum-submission window is closed. Separate visit-specific representation deadlines can still appear in official notices.',
  },
  {
    milestone: 'Report and recommendations',
    date: 'Within 18 months of constitution',
    status: 'In progress',
    detail: 'No final report, fitment factor, pay matrix, HRA rule, pension-revision method or arrears order is published on the official site as at this review.',
  },
  {
    milestone: 'Government implementation',
    date: 'Not notified',
    status: 'Not notified',
    detail: 'A government resolution and departmental fixation orders are needed after recommendations. An expected effect date is not the same as a notified implementation or payment date.',
  },
];

const currentActivities = [
  {
    activity: 'Jaipur stakeholder visit',
    schedule: '31 August-1 September 2026',
    deadline: 'Representations requested by 18 August 2026',
  },
  {
    activity: 'Chennai and Puducherry visits',
    schedule: 'Chennai 7-8 September; Puducherry 9 September 2026',
    deadline: 'Representations requested by 18 August 2026',
  },
  {
    activity: 'Chandigarh stakeholder visit',
    schedule: '16-18 September 2026',
    deadline: 'Representations requested by 25 August 2026',
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
    href: ARREARS_CALCULATOR_URL,
    label: '8th Pay Commission Arrears Calculator',
    note: 'Model current versus projected basic, DA, HRA and other eligible pay across dates you choose. No date is assumed official.',
  },
  {
    href: PENSION_CALCULATOR_URL,
    label: '8th Pay Commission Pension Calculator',
    note: 'Compare current basic pension plus DR with an unofficial flat-multiplier scenario while keeping future DR separate.',
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
    label: '8th Central Pay Commission — official website and current notices',
    href: 'https://8cpc.gov.in/',
  },
  {
    label: '8th CPC — official questionnaire page',
    href: 'https://8cpc.gov.in/8th-central-pay-commission/',
  },
  {
    label: '8th CPC — official memorandum-submission page',
    href: 'https://8cpc.gov.in/8cpc-memorandum-submission/',
  },
  {
    label: 'PIB — terms of reference and 18-month report period',
    href: 'https://www.pib.gov.in/PressReleasePage.aspx?PRID=2183289',
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
            {
              label: 'Model an arrears period without assuming a date',
              href: ARREARS_CALCULATOR_URL,
            },
          ]}
        />
      </div>

      <AnswerEngineSummary
        className="mt-6"
        summary="RupeeKit's 8th Pay Commission hub explains that revised basic pay equals current basic pay multiplied by a fitment factor, that no fitment factor has been officially notified as at August 2026, and that widely quoted figures such as 2.57 are references to the 7th Pay Commission rather than decisions. Because accumulated dearness allowance is merged into the revised basic and restarts from a low base, the increase in take-home pay is materially smaller than the fitment factor suggests. Arrears and pension revision depend on the government resolution accepting the recommendations, not on the Commission's report alone."
      />

      <section className="mt-12 rounded-3xl border border-sky-200 bg-sky-50 p-5 md:p-8">
        <p className="text-xs font-bold uppercase tracking-wide text-sky-800">Official status checked 17 August 2026</p>
        <h2 className="mt-2 text-2xl font-bold text-brandDeepNavy">8th Pay Commission timeline and what is pending</h2>
        <p className="mt-3 max-w-3xl leading-7 text-slate-700">
          The Commission is active and collecting evidence, but the official record still does not contain a final fitment factor, pay matrix, revised HRA rate, pension method, implementation date or arrears order.
        </p>
        <div className="mt-5 overflow-x-auto rounded-2xl border border-sky-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-sky-100/70 text-xs uppercase tracking-wide text-sky-900">
              <tr><th className="px-4 py-3">Milestone</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">What it means</th></tr>
            </thead>
            <tbody className="divide-y divide-sky-100">
              {officialStatus.map((item) => (
                <tr key={item.milestone}>
                  <td className="px-4 py-4 font-bold text-slate-900">{item.milestone}</td>
                  <td className="px-4 py-4 text-slate-600">{item.date}</td>
                  <td className="px-4 py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{item.status}</span></td>
                  <td className="px-4 py-4 leading-6 text-slate-600">{item.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold text-brandDeepNavy">Current official activity</h2>
        <p className="mt-3 leading-7 text-slate-700">
          The official site lists stakeholder visits scheduled after this review date. These notices show evidence gathering is active; they do not announce salary or pension outcomes.
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {currentActivities.map((item) => (
            <article key={item.activity} className="rounded-2xl border border-brandBorder bg-white p-5 shadow-sm">
              <h3 className="font-bold text-slate-900">{item.activity}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.schedule}</p>
              <p className="mt-3 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">{item.deadline}</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-500">
          Visit schedules and representation deadlines can change. Confirm the latest notice on the official 8th CPC website before acting.
        </p>
      </section>

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
          Scenarios by pay matrix level
        </h2>
        <p className="mt-4 leading-8 text-slate-700">
          Each level starts from a different cell of the current matrix, so the
          same fitment factor produces a very different figure. Pick your level
          to see the four published scenarios applied to its entry pay, and how
          much of the apparent rise is really the DA merge.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {PAY_MATRIX_LEVELS.map((entry) => (
            <Link
              key={entry.slug}
              href={`/8th-pay-commission/${entry.slug}`}
              className="rounded-full border border-brandBorder bg-white px-4 py-2 text-sm font-semibold text-brandNavy transition hover:border-brandNavy/40 hover:bg-slate-50"
            >
              Level {entry.level}
            </Link>
          ))}
        </div>
        <p className="mt-4 text-sm leading-6 text-slate-500">
          Levels 15 to 18 are fixed-pay apex posts held by a very small number of
          officers and are not published as separate pages.
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
