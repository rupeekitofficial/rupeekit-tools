import type { Metadata } from 'next';
import Link from 'next/link';
import AnswerEngineSummary from '@/components/seo/AnswerEngineSummary';
import FactsTable from '@/components/seo/FactsTable';
import QuickAnswerBox from '@/components/seo/QuickAnswerBox';
import { TaxCalculatorApp } from '@/components/tax/TaxCalculatorApp';
import { calculateIndianIncomeTax, type TaxInput } from '@/lib/tax/calculator';
import { availableTaxYears } from '@/lib/tax/indiaIncomeTaxRules';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
const PAGE_URL = `${SITE_URL}/tools/income-tax-calculator-old-vs-new-regime-india`;
const REVIEWED_LABEL = 'June 2, 2026 (IST)';

const pageTitle = 'Income Tax Old vs New Regime Calculator FY 2025-26 | RupeeKit';
const pageDescription =
  'Compare old vs new tax regime for FY 2025-26 / AY 2026-27, FY 2024-25 / AY 2025-26, and FY 2023-24 / AY 2024-25 with deductions, rebate, cess, and break-even guidance.';

const quickAnswer = {
  title: 'Quick Answer',
  question: 'Which is better: old or new tax regime?',
    answer:
    'The better tax regime depends on your income, deductions, exemptions, age group, and salary structure. The old regime may help when eligible deductions and exemptions are high, while the new regime may be simpler when deductions are low. Use this calculator to compare estimated tax under both regimes before choosing.',
  formula: 'Tax difference = Old regime tax - New regime tax',
  example:
    'If the old regime tax estimate is Rs 85,000 and the new regime tax estimate is Rs 78,000, the calculator shows a Rs 7,000 lower estimate under the new regime before final verification.',
  note:
    'Educational estimate only. Verify final tax treatment with official income-tax guidance, employer payroll, Form 16, AIS, Form 26AS, or a qualified tax professional.',
  links: [
    { label: 'HRA Exemption Calculator India', href: '/tools/hra-exemption-calculator-india' },
    { label: 'ITR-2 AY 2026-27 Filing Guide', href: '/blog/itr-2-ay-2026-27-filing-guide' },
    { label: 'Resources', href: '/resources' },
  ],
};

const comparisonRows = [
  {
    factor: 'Best suited when',
    oldRegime: 'Eligible deductions and exemptions are meaningfully higher.',
    newRegime: 'Deductions are lower and a simpler estimate is preferred.',
  },
  {
    factor: 'Deductions and exemptions',
    oldRegime: 'Many deductions and exemptions may matter when eligibility exists.',
    newRegime: 'Most old-regime deductions and exemptions are not central to the estimate.',
  },
  {
    factor: 'HRA relevance',
    oldRegime: 'HRA exemption can change the result where it applies.',
    newRegime: 'HRA usually does not affect the estimate in the same way.',
  },
  {
    factor: 'Simplicity',
    oldRegime: 'Needs more deduction tracking and document review.',
    newRegime: 'May be simpler when deduction claims are limited.',
  },
  {
    factor: 'Calculator use',
    oldRegime: 'Useful for testing HRA, 80C, 80D, home loan interest, and similar inputs.',
    newRegime: 'Useful for low-deduction and payroll-declaration comparisons.',
  },
  {
    factor: 'Final decision',
    oldRegime: 'Verify with current rules, employer payroll, Form 16, AIS/Form 26AS, and official guidance.',
    newRegime: 'Verify with current rules, employer payroll, Form 16, AIS/Form 26AS, and official guidance.',
  },
];

const baseExampleInput: TaxInput = {
  grossSalary: 0,
  hraExemption: 0,
  homeLoanInterest: 0,
  section80C: 0,
  section80D: 0,
  employerNPS: 0,
  otherDeductionsOldRegime: 0,
  otherDeductionsBothRegimes: 0,
  isSalaried: true,
  ageGroup: 'below60',
};

function formatInr(value: number) {
  return `Rs ${Math.round(value).toLocaleString('en-IN')}`;
}

const latestSupportedFy = availableTaxYears[0];

const exampleScenarios = [
  {
    title: 'Salaried person with low deductions',
    description:
      'A salaried employee with moderate income and very few deduction claims wants a quick comparison before year-end planning.',
    input: {
      ...baseExampleInput,
      grossSalary: 900000,
    },
  },
  {
    title: 'Salaried person with HRA and 80C deductions',
    description:
      'A salaried employee claiming HRA and Section 80C wants to see whether these old-regime inputs materially change the result.',
    input: {
      ...baseExampleInput,
      grossSalary: 1200000,
      hraExemption: 180000,
      section80C: 150000,
      section80D: 25000,
    },
  },
  {
    title: 'Person comparing old vs new regime before ITR filing',
    description:
      'A taxpayer reviews salary, home-loan interest, and deduction assumptions before choosing a regime at return-filing time.',
    input: {
      ...baseExampleInput,
      grossSalary: 1400000,
      section80C: 120000,
      section80D: 25000,
      homeLoanInterest: 150000,
    },
  },
  {
    title: 'Person checking regime choice before employer declaration',
    description:
      'A payroll declaration comparison uses salary structure, employer NPS, and deduction assumptions before submitting employer choices.',
    input: {
      ...baseExampleInput,
      grossSalary: 1000000,
      employerNPS: 50000,
      section80C: 50000,
    },
  },
].map((scenario) => {
  const result = calculateIndianIncomeTax(scenario.input, latestSupportedFy);
  const difference = Math.abs(result.oldRegime.finalTax - result.newRegime.finalTax);
  const takeaway =
    result.recommendedRegime === 'Equal'
      ? 'Based on these inputs, the calculator estimates the same tax under both regimes.'
      : `Based on these inputs, the calculator estimates ${formatInr(difference)} lower tax under the ${result.recommendedRegime.toLowerCase()} regime.`;

  return {
    ...scenario,
    oldTax: result.oldRegime.finalTax,
    newTax: result.newRegime.finalTax,
    takeaway,
  };
});

const faqs = [
  {
    question: 'How is old vs new tax regime calculated?',
    answer:
      'This calculator compares estimated tax under both regimes using your income, deductions, exemptions, and salary-related inputs available in RupeeKit. It is an educational estimate, not an official filing utility.',
  },
  {
    question: 'Which tax regime is better for salaried employees?',
    answer:
      'There is no single best answer for every salaried employee. The old regime may help when eligible deductions and exemptions are high, while the new regime may be simpler when deductions are low. Verify with payroll records and official guidance before choosing.',
  },
  {
    question: 'Is the old regime better if I claim HRA?',
    answer:
      'HRA can materially change the old-regime estimate when you are eligible to claim it, but the result still depends on your full salary structure and other deductions. Use the calculator to compare both regimes and verify before filing.',
  },
  {
    question: 'Does the new tax regime allow deductions?',
    answer:
      'Some items may still be relevant depending on current rules and taxpayer profile, but many old-regime deduction and exemption categories are not used in the same way under the new regime. Check official guidance for the applicable year.',
  },
  {
    question: 'Should I choose tax regime before ITR filing?',
    answer:
      'Many taxpayers compare regimes before employer declaration and review the choice again before ITR filing if income, deductions, or exemptions changed during the year. Use the calculator for comparison and verify the final choice before submission.',
  },
  {
    question: 'Can I change tax regime while filing ITR?',
    answer:
      'This depends on taxpayer profile, income type, and the applicable-year rules. Verify current official income-tax guidance, employer payroll records, and filing rules before assuming a change is available.',
  },
  {
    question: 'Is this calculator official?',
    answer:
      'No. This is a RupeeKit educational calculator and not an official government filing utility. Cross-check final numbers with the Income Tax Department portal, Form 16, AIS, and Form 26AS.',
  },
  {
    question: 'Does RupeeKit provide tax advice?',
    answer:
      'No. RupeeKit is not a tax advisor and does not provide personalized tax or legal advice. The page is for educational comparison only.',
  },
];

export const metadata: Metadata = {
  title: { absolute: pageTitle },
  description: pageDescription,
  alternates: {
    canonical: PAGE_URL,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: PAGE_URL,
    siteName: 'RupeeKit',
    type: 'article',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
  },
};

export default function IncomeTaxCalculatorPage() {
  const faqSchema =
    faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
          })),
        }
      : null;

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
        name: 'Old vs New Tax Regime Calculator India',
        item: PAGE_URL,
      },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Old vs New Tax Regime Calculator India',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: PAGE_URL,
    description: pageDescription,
    publisher: {
      '@type': 'Organization',
      name: 'RupeeKit',
      url: SITE_URL,
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationSchema) }}
      />
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}

      <nav className="mb-8 text-sm text-slate-500 no-print">
        <Link href="/" className="transition hover:text-slate-950">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-slate-900">Income Tax Old vs New Regime Calculator FY 2025-26</span>
      </nav>

      <header className="mb-8 grid gap-6 lg:grid-cols-[1fr_0.52fr] lg:items-start no-print">
        <div>
          <span className="mb-4 inline-block rounded-full bg-brandNavy/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brandNavy">
            Tax Comparison Tool
          </span>
          <h1 className="text-4xl font-black tracking-tight text-brandDeepNavy md:text-5xl lg:text-6xl">
            Income Tax Old vs New Regime Calculator FY 2025-26
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">
            Compare old vs new tax regime using income, deductions, exemptions, and salary structure. Use this
            educational income tax calculator old vs new regime page to estimate the tax difference before employer
            declaration or ITR filing. Supports calculations for FY 2025-26 (AY 2026-27) and earlier years.
          </p>
        </div>
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 shadow-sm">
          <p className="font-bold">Educational estimate only</p>
          <p className="mt-2 text-amber-800">
            Calculator inputs stay in your browser by default and are not saved as tax records. Verify final tax with
            official income-tax guidance, employer payroll, Form 16, AIS, and Form 26AS before filing or submitting a
            declaration.
          </p>
        </div>
      </header>

        <section className="mb-6 no-print">
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm leading-7 text-emerald-900">
          <p className="font-bold">Supported years</p>
          <p className="mt-1">
            This calculator supports FY 2025-26 / AY 2026-27, FY 2024-25 / AY 2025-26, and FY 2023-24 / AY 2024-25
            for educational comparison. Verify final tax in the official filing utility.
          </p>
        </div>
      </section>

      <section className="mb-6 no-print">
        <QuickAnswerBox
          title={quickAnswer.title}
          question={quickAnswer.question}
          answer={quickAnswer.answer}
          formula={quickAnswer.formula}
          example={quickAnswer.example}
          note={quickAnswer.note}
          links={quickAnswer.links}
        />
      </section>

      <AnswerEngineSummary
        id="answer-engine-summary"
        className="mb-10 no-print"
        summary="This old vs new tax regime calculator compares estimated income tax under both regimes using income, deductions, exemptions, age group, and salary structure. It supports FY 2025-26 / AY 2026-27, FY 2024-25 / AY 2025-26, and FY 2023-24 / AY 2024-25 for educational comparison before employer declaration or ITR filing. Results are educational estimates only and should be verified with official guidance, Form 16, AIS, Form 26AS, and payroll records."
      />

      <TaxCalculatorApp />

      <section className="mt-12 space-y-8 no-print">
        <section
          id="how-does-the-old-vs-new-tax-regime-calculator-work"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            How does the old vs new tax regime calculator work?
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            The calculator applies the RupeeKit tax logic to the income, deduction, exemption, salary, and age-group
            inputs you enter. It then estimates old-regime tax and new-regime tax side by side so you can compare the
            difference using the same input set. Supported years are FY 2025-26 / AY 2026-27, FY 2024-25 / AY 2025-26,
            and FY 2023-24 / AY 2024-25.
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            This makes the page useful for old vs new tax regime calculator online searches, but the output remains an
            educational comparison rather than a filing confirmation.
          </p>
        </section>

        <section
          id="how-to-compare-old-and-new-tax-regime-in-india"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            How to compare old and new tax regime in India?
          </h2>
          <ol className="mt-4 space-y-3 text-sm leading-7 text-slate-700 md:text-base">
            <li>1. Enter salary and income details using the same assumptions for both regimes.</li>
            <li>2. Add deductions and exemptions that may affect the old-regime estimate, such as HRA, 80C, 80D, or home-loan interest where applicable.</li>
            <li>3. Review the estimated tax difference instead of assuming one regime is always better.</li>
            <li>4. Re-check the result before employer declaration and again before ITR filing if your numbers changed.</li>
          </ol>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[860px] rounded-2xl border border-slate-200 text-left text-sm text-slate-700">
              <caption className="pb-3 text-left text-lg font-bold text-brandDeepNavy">
                Old vs New Tax Regime Comparison
              </caption>
              <thead className="bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-4 py-3 font-semibold">Factor</th>
                  <th className="px-4 py-3 font-semibold">Old tax regime</th>
                  <th className="px-4 py-3 font-semibold">New tax regime</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {comparisonRows.map((row) => (
                  <tr key={row.factor}>
                    <td className="px-4 py-3 font-semibold text-slate-900">{row.factor}</td>
                    <td className="px-4 py-3">{row.oldRegime}</td>
                    <td className="px-4 py-3">{row.newRegime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section
          id="income-tax-calculation-old-vs-new-regime-example"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            Income tax calculation old vs new regime: example
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            The example cards below use the latest supported RupeeKit rule year, FY {latestSupportedFy}. Based on your
            inputs, the calculator estimates both regimes and shows the directional difference. Verify before filing or
            submitting declaration.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {exampleScenarios.map((scenario) => (
              <article
                key={scenario.title}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm"
              >
                <h3 className="text-lg font-bold text-slate-900">{scenario.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">{scenario.description}</p>
                <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                  <p>
                    Old regime estimate: <span className="font-semibold text-slate-900">{formatInr(scenario.oldTax)}</span>
                  </p>
                  <p className="mt-1">
                    New regime estimate: <span className="font-semibold text-slate-900">{formatInr(scenario.newTax)}</span>
                  </p>
                </div>
                <p className="mt-4 text-sm leading-7 text-slate-700">{scenario.takeaway}</p>
                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Verify before filing or submitting declaration.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="which-tax-regime-is-better-for-salaried-employees"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            Which tax regime is better for salaried employees?
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            For salaried employees, the answer depends on actual deduction eligibility and salary structure. The old
            regime may help when HRA, 80C, 80D, home-loan interest, or similar items are meaningful. The new regime may
            be simpler when those deductions are low or not being used.
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            Use this income tax calculator old vs new regime page before payroll declaration and again before filing if
            your income or deduction profile changed during the year.
          </p>
        </section>

        <section
          id="what-deductions-can-change-the-old-vs-new-tax-regime-result"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            What deductions can change the old vs new tax regime result?
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            The old vs new tax regime result can change when eligible deductions or exemptions materially reduce the
            old-regime estimate. Common comparison inputs on this page include HRA, Section 80C, Section 80D, home-loan
            interest, employer NPS, and other eligible deduction buckets already supported by the calculator logic.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-slate-700 md:text-base">
            <li>Use HRA-specific assumptions only when the exemption is genuinely applicable.</li>
            <li>Do not assume every deduction is available in both regimes.</li>
            <li>Reconcile deduction assumptions with payroll records, Form 16, AIS, and Form 26AS.</li>
          </ul>
        </section>

        <section
          id="should-you-choose-old-regime-or-new-regime-while-filing-itr"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            Should you choose old regime or new regime while filing ITR?
          </h2>
          <p className="mt-4 leading-8 text-slate-700">
            Use the calculator as a decision-support tool, not as final filing proof. Many taxpayers first compare
            regimes before employer declaration and then review the numbers again before ITR filing once Form 16, AIS,
            and Form 26AS are available.
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            If your income type, deductions, exemptions, or payroll treatment changed during the year, verify the final
            regime choice using current official guidance and return-filing rules.
          </p>
        </section>

        <section
          id="common-mistakes-while-comparing-old-and-new-tax-regime"
          className="scroll-mt-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8"
        >
          <h2 className="text-2xl font-bold text-brandDeepNavy">
            Common mistakes while comparing old and new tax regime
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-sm leading-7 text-slate-700 md:text-base">
            <li>Comparing regimes without entering the same income base in both cases.</li>
            <li>Assuming the old regime is always better when HRA or 80C exists, without checking the full estimate.</li>
            <li>Ignoring the effect of home-loan interest, health-insurance deductions, or employer NPS where supported.</li>
            <li>Using payroll assumptions from earlier months without reconciling final Form 16, AIS, and Form 26AS.</li>
            <li>Treating an educational calculator result as official tax advice or final filing confirmation.</li>
          </ul>
        </section>
      </section>

      <FactsTable
        id="calculator-facts"
        className="mt-12 no-print"
        rows={[
          {
            topic: 'Calculation purpose',
            explanation: 'Educational comparison of old-regime and new-regime income-tax estimates for FY 2025-26 / AY 2026-27 and earlier supported years',
          },
          {
            topic: 'Main inputs',
            explanation: 'Income, age group, deductions, exemptions, salary structure, and supported regime-specific fields',
          },
          {
            topic: 'Primary output',
            explanation: 'Estimated old-regime tax, estimated new-regime tax, and tax difference',
          },
          {
            topic: 'Related tax pages',
            explanation: 'HRA calculator, ITR filing guide, and RupeeKit tax-planning resources',
          },
          {
            topic: 'Advice boundary',
            explanation: 'Educational information only. RupeeKit is not a tax advisor and does not provide personalized tax or legal advice.',
          },
        ]}
      />

      <section
        id="source-and-methodology"
        className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 no-print"
      >
        <h2 className="text-2xl font-bold text-brandDeepNavy">Source and methodology</h2>
        <p className="mt-2 text-sm text-slate-500">Last reviewed: {REVIEWED_LABEL}</p>
        <p className="mt-4 leading-8 text-slate-700">
          This calculator compares estimated tax under old and new tax regime inputs using user-entered income,
          deductions, exemptions, and applicable calculator logic in RupeeKit. It is designed for educational
          comparison only. It does not replace official income-tax guidance, employer payroll calculations, Form 16,
          AIS/Form 26AS, or advice from a qualified tax professional.
        </p>
        <p className="mt-4 leading-8 text-slate-700">
          Educational disclaimer: RupeeKit is not a tax advisor and does not provide personalized tax or legal advice.
          Use the output to compare scenarios, not to finalize filing without verification.
        </p>
        <p className="mt-4 leading-8 text-slate-700">
          Tax verification note: confirm final treatment with current official income-tax guidance, employer payroll,
          Form 16, AIS, Form 26AS, and filing-utility validation before acting on the estimate.
        </p>
      </section>

      <section className="mt-12 grid gap-6 no-print md:grid-cols-2">
        <div className="rounded-3xl border border-brandBorder bg-slate-50 p-6">
          <h2 className="text-lg font-bold text-brandDeepNavy">Related tax links</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7">
            <li>
              <Link href="/tools/salary-in-hand-calculator-india" className="font-medium text-sky-700 hover:underline">
                Salary In-Hand Calculator India
              </Link>
            </li>
            <li>
              <Link href="/tools/hra-exemption-calculator-india" className="font-medium text-sky-700 hover:underline">
                HRA Exemption Calculator India
              </Link>
            </li>
            <li>
              <Link href="/tools/80c-deduction-calculator-india" className="font-medium text-sky-700 hover:underline">
                Section 80C Deduction Calculator India
              </Link>
            </li>
            <li>
              <Link href="/blog/income-tax-calculator-2026-calculator-guide" className="font-medium text-sky-700 hover:underline">
                Income Tax Calculator 2026 planning guide
              </Link>
            </li>
            <li>
              <Link href="/resources" className="font-medium text-sky-700 hover:underline">
                RupeeKit resources
              </Link>
            </li>
          </ul>
        </div>
        <div className="rounded-3xl border border-brandNavy/10 bg-brandBgSoft p-6">
          <h2 className="text-lg font-bold text-brandDeepNavy">Before filing or declaring</h2>
          <p className="mt-3 text-sm leading-7 text-slate-700">
            Review the{' '}
            <Link href="/blog/itr-2-ay-2026-27-filing-guide" className="font-semibold text-brandNavy hover:underline">
              ITR-2 AY 2026-27 filing guide
            </Link>{' '}
            and compare HRA assumptions with the{' '}
            <Link href="/tools/hra-exemption-calculator-india" className="font-semibold text-brandNavy hover:underline">
              HRA Exemption Calculator India
            </Link>
            . This can help you verify the regime comparison before employer declaration or return filing.
          </p>
        </div>
      </section>

      <section className="mt-14 no-print">
        <h2 className="text-2xl font-bold text-brandDeepNavy">FAQs</h2>
        <div className="mt-6 space-y-5">
          {faqs.map((faq) => (
            <div key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-5">
              <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
