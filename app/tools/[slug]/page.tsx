import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import Calculator from '@/components/Calculator';
import DownloadHraChecklistButton from '@/components/hra/DownloadHraChecklistButton';
import PersonalLoanDecisionSimulator from '@/components/personal-loan/PersonalLoanDecisionSimulator';
import AnswerEngineSummary from '@/components/seo/AnswerEngineSummary';
import FactsTable from '@/components/seo/FactsTable';
import QuickAnswerBox from '@/components/seo/QuickAnswerBox';
import { getLiveTools, getRelatedTools, getToolBySlug, type Tool, type ToolQuickAnswer } from '@/lib/tools';

const SITE_URL = 'https://www.rupeekit.co.in';
const HRA_SLUG = 'hra-exemption-calculator-india';
const HRA_META_TITLE = 'HRA Calculator FY 2026-27 | Rule 279 & 50% City Check';
const HRA_META_DESCRIPTION =
  'Calculate HRA exemption under Rule 279. Check the 50% city list and compare actual HRA, rent minus 10% of salary, and old-regime exempt HRA.';
const HRA_H1 = 'HRA Exemption Calculator India';
const PERSONAL_LOAN_SLUG = 'personal-loan-emi-calculator-india';
const PERSONAL_LOAN_META_TITLE = 'Personal Loan EMI Calculator 2026 | EMI, Fees & Total Cost';
const PERSONAL_LOAN_META_DESCRIPTION =
  'Calculate personal loan EMI, interest, processing fee, GST and total repayment in India. Compare tenure and check affordability before applying.';
const PERSONAL_LOAN_ANSWER_ENGINE_SUMMARY =
  'RupeeKit\'s Personal Loan EMI Calculator estimates monthly EMI, total interest, total repayment, processing fee impact, EMI burden, tenure comparison, and repayment schedule using user-entered assumptions. It is a neutral educational calculator and does not provide loan approval, lender recommendations, or live bank interest rates.';
const SIP_SLUG = 'sip-calculator-india';
const EMERGENCY_FUND_SLUG = 'emergency-fund-calculator-india';
const EMERGENCY_FUND_META_TITLE = 'Emergency Fund Calculator India 2026 | Include EMIs';
const EMERGENCY_FUND_META_DESCRIPTION =
  'Calculate a 3, 6, 9 or 12-month emergency fund from essential expenses and home, personal or car-loan EMIs. See your shortfall and savings plan.';
const EMERGENCY_FUND_H1 = 'Emergency Fund Calculator India';
const LAST_REVIEWED_ISO_BY_SLUG: Record<string, string> = {
  [HRA_SLUG]: '2026-07-16',
  [PERSONAL_LOAN_SLUG]: '2026-07-16',
  [EMERGENCY_FUND_SLUG]: '2026-07-16',
  [SIP_SLUG]: '2026-05-01',
  'fd-calculator-india': '2026-05-01',
};

const liveToolSlugs = new Set(getLiveTools().map((tool) => tool.slug));
const blogSlugs = new Set(blogPosts.map((post) => post.slug));

const HRA_TOC = [
  { id: 'how-to-calculate-hra-exemption', title: 'How is HRA exemption calculated?' },
  { id: 'hra-exemption-formula-under-rule-279', title: 'HRA Exemption Formula under Rule 279' },
  { id: 'fy-2026-27-hra-city-rules-50-and-40-salary-cap', title: 'Which cities use the 50% HRA salary cap?' },
  { id: 'old-tax-regime-vs-new-tax-regime-for-hra', title: 'Can HRA be claimed in the new tax regime?' },
  { id: 'hra-calculation-example', title: 'HRA Calculation Example' },
  { id: 'documents-required-to-claim-hra', title: 'What documents are required for HRA exemption?' },
  { id: 'what-if-you-missed-hra-proof-submission', title: 'What if You Missed HRA Proof Submission?' },
  { id: 'can-you-pay-rent-to-parents-and-claim-hra', title: 'Can you pay rent to parents and claim HRA?' },
  { id: 'landlord-details-and-relationship-disclosure', title: 'Landlord Details and Relationship Disclosure' },
  { id: 'common-hra-claim-mistakes', title: 'Common HRA Claim Mistakes' },
  { id: 'when-this-calculator-is-useful', title: 'When This Calculator Is Useful' },
  { id: 'source-and-methodology', title: 'Source and methodology' },
  { id: 'faqs', title: 'FAQs' },
] as const;

const PERSONAL_LOAN_TOC = [
  { id: 'how-is-personal-loan-emi-calculated', title: 'How is personal loan EMI calculated?' },
  { id: 'is-lower-emi-always-cheaper', title: 'Is lower EMI always cheaper?' },
  { id: 'what-affects-your-personal-loan-emi', title: 'What affects your personal loan EMI?' },
  { id: 'how-does-processing-fee-affect-total-loan-cost', title: 'How does processing fee affect total loan cost?' },
  { id: 'how-much-emi-is-safe-for-monthly-income', title: 'How much EMI is safe for monthly income?' },
  { id: 'can-prepayment-reduce-total-interest', title: 'Can prepayment reduce total interest?' },
  { id: 'what-happens-if-you-miss-or-pause-emi', title: 'What happens if you miss or pause EMI?' },
  { id: 'does-rupeekit-show-live-personal-loan-interest-rates', title: 'Does RupeeKit show live personal loan interest rates?' },
  { id: 'is-rupeekit-a-lender', title: 'Is RupeeKit a lender?' },
  { id: 'source-and-methodology', title: 'Source and methodology' },
  { id: 'faqs', title: 'FAQs' },
] as const;

const SIP_TOC = [
  { id: 'answer-engine-summary', title: 'Answer Engine Summary' },
  { id: 'what-happens-if-you-miss-a-sip', title: 'What happens if you miss a SIP?' },
  { id: 'can-you-pause-and-restart-sip-later', title: 'Can you pause and restart SIP later?' },
  { id: 'what-is-step-up-sip', title: 'What is step-up SIP?' },
  { id: 'how-much-sip-is-needed-for-a-goal', title: 'How much SIP is needed for a goal?' },
  { id: 'how-does-inflation-affect-sip-planning', title: 'How does inflation affect SIP planning?' },
  { id: 'can-emi-amount-be-redirected-into-sip-after-loan-closure', title: 'Can EMI amount be redirected into SIP after loan closure?' },
  { id: 'is-sip-return-guaranteed', title: 'Is SIP return guaranteed?' },
  { id: 'sip-calculator-facts', title: 'SIP Calculator Facts' },
  { id: 'source-and-methodology', title: 'Source and methodology' },
  { id: 'faqs', title: 'FAQs' },
] as const;

const PERSONAL_LOAN_SECTION_IDS: Record<string, string> = {
  'What Is a Personal Loan EMI?': 'what-is-a-personal-loan-emi',
  'How is personal loan EMI calculated?': 'how-is-personal-loan-emi-calculated',
  'Personal Loan EMI Formula': 'how-is-personal-loan-emi-calculated',
  'How to Use This Personal Loan EMI Calculator': 'how-to-use-this-calculator',
  'EMI Calculation Example': 'emi-calculation-example',
  'Personal Loan EMI Example': 'emi-calculation-example',
  'What affects your personal loan EMI?': 'what-affects-your-personal-loan-emi',
  'Why Tenure in Months Matters': 'tenure-in-months',
  'How does processing fee affect total loan cost?': 'how-does-processing-fee-affect-total-loan-cost',
  'Processing Fee and Total Borrowing Cost': 'how-does-processing-fee-affect-total-loan-cost',
  'Processing Fee and Total Cost': 'how-does-processing-fee-affect-total-loan-cost',
  'Is lower EMI always cheaper?': 'is-lower-emi-always-cheaper',
  'Why Lower EMI Is Not Always Cheaper': 'is-lower-emi-always-cheaper',
  'Interest Rate vs Total Interest': 'is-lower-emi-always-cheaper',
  'How much EMI is safe for monthly income?': 'how-much-emi-is-safe-for-monthly-income',
  'Can prepayment reduce total interest?': 'can-prepayment-reduce-total-interest',
  'What happens if you miss or pause EMI?': 'what-happens-if-you-miss-or-pause-emi',
  'Does RupeeKit show live personal loan interest rates?': 'does-rupeekit-show-live-personal-loan-interest-rates',
  'Is RupeeKit a lender?': 'is-rupeekit-a-lender',
  'Can I Use This for SBI, HDFC, BOB or IDFC Personal Loans?': 'sbi-hdfc-bob-idfc-usage',
  'Common Mistakes Before Taking a Personal Loan': 'common-mistakes-before-taking-a-personal-loan',
};

type ContextualLink = {
  href: string;
  label: string;
};

function getToolHeading(slug: string, fallback: string) {
  if (slug === HRA_SLUG) return HRA_H1;
  if (slug === EMERGENCY_FUND_SLUG) return EMERGENCY_FUND_H1;
  return fallback;
}

function getToolDescription(slug: string, fallback: string) {
  return slug === HRA_SLUG ?
    'Calculate your likely HRA exemption under Rule 279 in seconds. Enter your salary, HRA, rent, and city type to compare the three legal limits and estimate how much HRA can stay tax-exempt under the old regime. Includes FY 2026-27 metro-city rules, a worked example, and a document checklist.' :
    fallback;
}

function listLabels(labels: string[]) {
  if (labels.length === 0) return '';
  if (labels.length === 1) return labels[0];
  if (labels.length === 2) return `${labels[0]} and ${labels[1]}`;
  return `${labels.slice(0, -1).join(', ')}, and ${labels[labels.length - 1]}`;
}

function firstSentence(text: string) {
  const match = text.trim().match(/[^.!?]+[.!?]?/);
  return match ? match[0].trim() : text.trim();
}

function buildFallbackQuickAnswer(tool: Tool): ToolQuickAnswer {
  const keyInputs = tool.inputs.slice(0, 3).map((input) => input.label);
  const keyOutputs = tool.outputs.slice(0, 3).map((output) => output.label);
  const conciseFormula = firstSentence(tool.formulaExplanation);
  const conciseExample = firstSentence(tool.example);

  return {
    title: `${tool.name} Quick Answer`,
    question: `How does this calculator work?`,
    answer:
      keyInputs.length > 0 && keyOutputs.length > 0
        ? `It estimates ${listLabels(keyOutputs)} using inputs such as ${listLabels(keyInputs)}.`
        : 'It converts your inputs into educational estimate outputs using the calculator formula shown on this page.',
    formula: conciseFormula.length <= 220 ? conciseFormula : undefined,
    example: conciseExample.length <= 220 ? conciseExample : undefined,
    note:
      'Educational estimate only. RupeeKit does not provide personalized financial, tax, legal, investment, or loan advice.',
  };
}

function buildGenericAnswerEngineSummary(tool: Tool) {
  const keyInputs = tool.inputs.slice(0, 4).map((input) => input.label);
  const keyOutputs = tool.outputs.slice(0, 4).map((output) => output.label);
  const methodLine = firstSentence(tool.formulaExplanation);
  const inputText = keyInputs.length > 0 ? listLabels(keyInputs) : 'the values you enter';
  const outputText = keyOutputs.length > 0 ? listLabels(keyOutputs) : 'the result metrics';

  return `This calculator estimates ${outputText} using ${inputText}. ${methodLine} Results are educational estimates only and should be verified with official records, lender statements, payroll data, or filing utilities where applicable.`;
}

function buildGenericCalculatorFacts(tool: Tool) {
  const keyInputs = tool.inputs.slice(0, 4).map((input) => input.label);
  const keyOutputs = tool.outputs.slice(0, 4).map((output) => output.label);
  return [
    {
      topic: 'Calculation type',
      explanation: 'Formula-based educational estimate from user-entered values',
    },
    {
      topic: 'Key inputs',
      explanation: keyInputs.length > 0 ? listLabels(keyInputs) : 'Depends on calculator mode and input fields',
    },
    {
      topic: 'Primary outputs',
      explanation: keyOutputs.length > 0 ? listLabels(keyOutputs) : 'Depends on calculator mode and output fields',
    },
    {
      topic: 'Method reference',
      explanation: firstSentence(tool.formulaExplanation),
    },
    {
      topic: 'Advice boundary',
      explanation:
        'RupeeKit provides educational information only and does not provide personalized financial, tax, legal, investment, or loan advice.',
    },
  ];
}

// This slug has its own literal route at app/tools/income-tax-calculator-old-vs-new-regime-india/page.tsx.
// It must be excluded here too, otherwise this dynamic route and that literal route both try to
// pre-render the same output path, and the build nondeterministically picks a winner.
const SLUGS_WITH_DEDICATED_ROUTE = new Set(['income-tax-calculator-old-vs-new-regime-india']);

export function generateStaticParams() {
  return getLiveTools()
    .filter((tool) => !SLUGS_WITH_DEDICATED_ROUTE.has(tool.slug))
    .map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  if (SLUGS_WITH_DEDICATED_ROUTE.has(params.slug)) return {};
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const pageUrl = `${SITE_URL}/tools/${tool.slug}`;
  const description =
    tool.slug === HRA_SLUG
      ? HRA_META_DESCRIPTION
      : tool.slug === PERSONAL_LOAN_SLUG
        ? PERSONAL_LOAN_META_DESCRIPTION
        : tool.slug === EMERGENCY_FUND_SLUG
          ? EMERGENCY_FUND_META_DESCRIPTION
        : tool.metaDescription;
  const pageTitle =
    tool.slug === HRA_SLUG
      ? HRA_META_TITLE
      : tool.slug === PERSONAL_LOAN_SLUG
        ? PERSONAL_LOAN_META_TITLE
        : tool.slug === EMERGENCY_FUND_SLUG
          ? EMERGENCY_FUND_META_TITLE
        : tool.name;

  return {
    title:
      tool.slug === HRA_SLUG || tool.slug === PERSONAL_LOAN_SLUG || tool.slug === EMERGENCY_FUND_SLUG
        ? { absolute: pageTitle }
        : tool.seoTitle
          ? { absolute: tool.seoTitle }
          : tool.name,
    description,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: 'RupeeKit',
      type: 'article',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description,
    },
  };
}

function HraEducationalContent({ links }: { links: ContextualLink[] }) {
  return (
    <>
      <section id="how-to-calculate-hra-exemption" className="scroll-mt-24">
        <h2 className="text-2xl font-bold">How is HRA exemption calculated?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Use this HRA exemption calculator to calculate HRA exemption by comparing three legal limits under Rule 279.
          Enter salary components, actual HRA received, rent paid, and city cap. The lowest value is the likely exempt
          amount under old tax regime HRA exemption.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
          <li>Actual HRA received.</li>
          <li>Rent paid minus 10% of salary.</li>
          <li>City-based cap: 50% or 40% of salary.</li>
        </ul>
        <p className="mt-4 leading-8 text-slate-700">
          Use the calculator above to calculate HRA exemption instantly using your salary, HRA received, rent paid and city type.
        </p>
      </section>

      <section id="hra-exemption-formula-under-rule-279" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">HRA Exemption Formula under Rule 279</h2>
        <p className="mt-4 leading-8 text-slate-700">
          The HRA calculation formula is the least of these values: actual HRA received, rent paid minus 10% of salary,
          and the city salary cap. This HRA tax exemption calculator follows that structure so your HRA exemption
          calculation and HRA deduction calculation remain easy to understand.
        </p>
        <p className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 text-slate-700">
          Trust note: this tool gives an estimate only. If your salary structure, landlord relationship, or declaration
          process is complex, verify with your employer payroll team or CA before filing.
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Formula Part 1</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Actual HRA received</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Formula Part 2</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">Rent paid minus 10% of salary</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Formula Part 3</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">50% or 40% city salary cap</p>
          </div>
        </div>
      </section>

      <section id="fy-2026-27-hra-city-rules-50-and-40-salary-cap" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Which cities use the 50% HRA salary cap?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Rule 279 HRA exemption uses two city groups for salary cap.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[680px] rounded-2xl border border-slate-200 text-left text-xs text-slate-700 md:text-sm">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold">City category</th>
                <th className="px-4 py-3 font-semibold">Salary cap</th>
                <th className="px-4 py-3 font-semibold">Example cities</th>
                <th className="px-4 py-3 font-semibold">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">Specified city list</td>
                <td className="px-4 py-3">50% of salary</td>
                <td className="px-4 py-3">Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune, Ahmedabad, Bengaluru</td>
                <td className="px-4 py-3">Use this cap when your city is in the Rule 279 specified list.</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">Other Indian cities</td>
                <td className="px-4 py-3">40% of salary</td>
                <td className="px-4 py-3">Cities not listed in the specified 50% group</td>
                <td className="px-4 py-3">Use this cap for non-specified city category cases.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="old-tax-regime-vs-new-tax-regime-for-hra" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Can HRA be claimed in the new tax regime?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          HRA exemption is relevant under the old tax regime. In the default new tax regime, HRA exemption is generally
          not available, so this calculator is best used for old regime tax planning and comparison.
        </p>
      </section>

      <section id="hra-calculation-example" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">HRA Calculation Example</h2>

        <h3 className="mt-5 text-xl font-bold">A) Metro/50% city example: Bengaluru</h3>
        <p className="mt-3 leading-8 text-slate-700">
          Annual basic salary + DA is Rs 6,00,000. Annual HRA received is Rs 2,40,000 and annual rent paid is
          Rs 3,00,000. Actual HRA received is Rs 2,40,000. 50% of salary is Rs 3,00,000. Rent paid minus 10% of salary
          is Rs 2,40,000. The least value is Rs 2,40,000, so exempt HRA is Rs 2,40,000.
        </p>

        <h3 className="mt-5 text-xl font-bold">B) Other city/40% example: Indore</h3>
        <p className="mt-3 leading-8 text-slate-700">
          Annual basic salary + DA is Rs 6,00,000. Annual HRA received is Rs 2,40,000 and annual rent paid is
          Rs 3,00,000. Actual HRA received is Rs 2,40,000. 40% of salary is Rs 2,40,000. Rent paid minus 10% of salary
          is Rs 2,40,000. The least value is Rs 2,40,000, so exempt HRA is Rs 2,40,000.
        </p>
      </section>

      <section id="documents-required-to-claim-hra" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">What documents are required for HRA exemption?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
          <li>Rent receipts.</li>
          <li>Rent agreement, if available.</li>
          <li>Landlord PAN where applicable.</li>
          <li>Employer HRA declaration.</li>
          <li>Salary slip showing basic salary, DA if applicable, and HRA.</li>
          <li>Bank transfer proof if rent is paid digitally.</li>
          <li>Landlord relationship disclosure where required.</li>
        </ul>
        <DownloadHraChecklistButton className="mt-4" />
      </section>

      <section id="what-if-you-missed-hra-proof-submission" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">What if You Missed HRA Proof Submission?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          If proof was missed during payroll declaration, employer TDS may be higher. In many cases, you can still claim
          eligible HRA exemption while filing your return, subject to records and current filing rules.
        </p>
      </section>

      <section id="can-you-pay-rent-to-parents-and-claim-hra" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Can you pay rent to parents and claim HRA?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Yes, if rent is genuinely paid and documented. Keep receipts and payment trail, and ensure rental income is
          disclosed by parents where required.
        </p>
      </section>

      <section id="landlord-details-and-relationship-disclosure" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Landlord Details and Relationship Disclosure</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Where Form 12BB, Form 124, or any applicable employer declaration asks for landlord details, keep the
          landlord name, address, PAN/Aadhaar where applicable, rent paid and relationship with the landlord ready.
        </p>
      </section>

      <section id="common-hra-claim-mistakes" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Common HRA Claim Mistakes</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
          <li>Using the wrong city cap for HRA exemption calculation.</li>
          <li>Assuming full HRA is exempt without applying the least-of-three rule.</li>
          <li>Using non-eligible salary components in the HRA calculation formula.</li>
          <li>Submitting incomplete rent records or missing landlord PAN where needed.</li>
          <li>Missing landlord detail disclosure where requested in employer declaration.</li>
        </ul>
      </section>

      <section id="when-this-calculator-is-useful" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">When This Calculator Is Useful</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
          <li>Before choosing between old and new regime during payroll planning.</li>
          <li>When you want a quick HRA exemption calculation estimate.</li>
          <li>When reviewing if full HRA received can actually stay tax-exempt.</li>
        </ul>

        {links.length ? (
          <>
            <h3 className="mt-6 text-xl font-bold">Related reads and calculators</h3>
            <p className="mt-3 leading-8 text-slate-700">
              For full planning, compare with your{' '}
              {links.map((link, index) => (
                <span key={link.href}>
                  {index > 0 ? ', ' : ''}
                  <Link href={link.href} className="font-medium text-sky-700 hover:underline">
                    {link.label}
                  </Link>
                </span>
              ))}
              .
            </p>
          </>
        ) : null}
      </section>
    </>
  );
}

function SipEducationalContent({ links, lastReviewed }: { links: ContextualLink[]; lastReviewed?: string }) {
  return (
    <>
      <section id="what-happens-if-you-miss-a-sip" className="scroll-mt-24">
        <h2 className="text-2xl font-bold">What happens if you miss a SIP?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Missing SIP installments can reduce your projected corpus because fewer contributions get time to compound.
          In RupeeKit, the missed SIP scenario estimates this impact using your selected contribution gap and return
          assumptions. It is a planning estimate and not a prediction of actual fund performance.
        </p>
      </section>

      <section id="can-you-pause-and-restart-sip-later" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Can you pause and restart SIP later?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          SIPs can be paused and restarted, but pausing usually lowers projected corpus because the skipped period does
          not accumulate contributions. RupeeKit&apos;s pause-and-restart view helps compare continuity versus pause
          scenarios with the same return inputs. Use it as an educational comparison before deciding your savings plan.
        </p>
      </section>

      <section id="what-is-step-up-sip" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">What is step-up SIP?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Step-up SIP means increasing the SIP amount periodically, usually every year, instead of keeping it flat.
          RupeeKit estimates how these planned increases may change invested amount and projected future value compared
          with regular SIP. This helps you evaluate whether gradual contribution growth may support long-term goals.
        </p>
      </section>

      <section id="how-much-sip-is-needed-for-a-goal" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">How much SIP is needed for a goal?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Goal SIP mode estimates a monthly SIP amount for a target corpus using your expected return and time horizon.
          RupeeKit also lets you compare regular SIP and step-up SIP style assumptions for the same goal. This is a
          planning estimate only and should be reviewed as income, tenure, or market assumptions change.
        </p>
      </section>

      <section id="how-does-inflation-affect-sip-planning" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">How does inflation affect SIP planning?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Inflation reduces the real purchasing power of future money, so a corpus target may need adjustment over
          time. RupeeKit&apos;s inflation-adjusted view converts projected corpus into today&apos;s value terms for
          practical goal planning. This helps compare nominal growth and real-value outcomes side by side.
        </p>
      </section>

      <section id="can-emi-amount-be-redirected-into-sip-after-loan-closure" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Can EMI amount be redirected into SIP after loan closure?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          After a loan closes, some households may choose to redirect the freed EMI amount into SIP contributions for
          goal planning. RupeeKit includes an EMI-to-SIP redirect scenario to estimate how this change may affect the
          projected corpus over remaining tenure. It is an educational planning scenario, not a recommendation.
        </p>
      </section>

      <section id="is-sip-return-guaranteed" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Is SIP return guaranteed?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          No. SIP returns are market-linked and not guaranteed. RupeeKit uses user-entered return assumptions only for
          projection, so actual outcomes can be higher or lower than estimated values.
        </p>
      </section>

      <FactsTable
        id="sip-calculator-facts"
        title="SIP Calculator Facts"
        className="mt-8"
        rows={[
          { topic: 'SIP return', explanation: 'Market-linked and not guaranteed' },
          { topic: 'Calculation type', explanation: 'Monthly compounding-style estimate' },
          { topic: 'Step-up SIP', explanation: 'SIP amount increases yearly or by selected interval' },
          { topic: 'Inflation-adjusted value', explanation: 'Shows future value in today\'s purchasing-power terms' },
          { topic: 'Missed SIP impact', explanation: 'Estimates reduction from skipped installments' },
          { topic: 'EMI-to-SIP redirect', explanation: 'Scenario planner after EMI closure' },
          { topic: 'Product recommendation', explanation: 'RupeeKit does not recommend mutual funds' },
        ]}
      />

      <section id="source-and-methodology" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Source and methodology</h2>
        {lastReviewed ? <p className="mt-2 text-sm text-slate-500">Last reviewed: {lastReviewed}</p> : null}
        <p className="mt-4 leading-8 text-slate-700">
          This calculator uses user-entered SIP amount, expected return, tenure, optional step-up, missed SIP, pause,
          goal, inflation, and EMI redirect assumptions. It uses monthly compounding-style projection for educational
          planning. It does not recommend mutual funds, does not fetch live fund returns, and does not guarantee outcomes.
        </p>
      </section>

      {links.length ? (
        <section className="mt-8">
          <h2 className="text-2xl font-bold">Related calculators and guides</h2>
          <p className="mt-4 leading-8 text-slate-700">
            For broader money planning, also review{' '}
            {links.map((link, index) => (
              <span key={link.href}>
                {index > 0 ? ', ' : ''}
                <Link href={link.href} className="font-medium text-sky-700 hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
            .
          </p>
        </section>
      ) : null}
    </>
  );
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  if (SLUGS_WITH_DEDICATED_ROUTE.has(params.slug)) notFound();
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const isHraPage = tool.slug === HRA_SLUG;
  const isPersonalLoanPage = tool.slug === PERSONAL_LOAN_SLUG;
  const isSipPage = tool.slug === SIP_SLUG;
  const isEmergencyFundPage = tool.slug === EMERGENCY_FUND_SLUG;
  const heading = getToolHeading(tool.slug, tool.name);
  const description = getToolDescription(tool.slug, tool.shortDescription);

  const related = getRelatedTools(tool);

  const contextualLinks: ContextualLink[] = [
    liveToolSlugs.has('salary-in-hand-calculator-india') ? {
      href: '/tools/salary-in-hand-calculator-india',
      label: 'salary in-hand calculator',
    } : null,
    liveToolSlugs.has('income-tax-calculator-old-vs-new-regime-india') ? {
      href: '/tools/income-tax-calculator-old-vs-new-regime-india',
      label: 'Old vs New Tax Regime Calculator',
    } : null,
    liveToolSlugs.has('80c-deduction-calculator-india') ? {
      href: '/tools/80c-deduction-calculator-india',
      label: '80C deduction calculator',
    } : null,
    liveToolSlugs.has('emi-calculator-india') ? {
      href: '/tools/emi-calculator-india',
      label: 'EMI calculator',
    } : null,
    blogSlugs.has('itr-2-ay-2026-27-filing-guide') ? {
      href: '/blog/itr-2-ay-2026-27-filing-guide',
      label: 'ITR-2 filing guide',
    } : null,
    blogSlugs.has('how-much-emergency-fund') ? {
      href: '/blog/how-much-emergency-fund',
      label: 'emergency fund guide',
    } : null,
  ].filter((item): item is ContextualLink => item !== null);

  const hraLinks: ContextualLink[] = [
    liveToolSlugs.has('income-tax-calculator-old-vs-new-regime-india')
      ? { href: '/tools/income-tax-calculator-old-vs-new-regime-india', label: 'Old vs New Tax Regime Calculator' }
      : null,
    liveToolSlugs.has('80c-deduction-calculator-india')
      ? { href: '/tools/80c-deduction-calculator-india', label: '80C deduction calculator' }
      : null,
    liveToolSlugs.has('salary-in-hand-calculator-india')
      ? { href: '/tools/salary-in-hand-calculator-india', label: 'salary in-hand calculator' }
      : null,
    blogSlugs.has('itr-2-ay-2026-27-filing-guide')
      ? { href: '/blog/itr-2-ay-2026-27-filing-guide', label: 'ITR-2 filing guide' }
      : null,
  ].filter((item): item is ContextualLink => item !== null);

  const hasLowerEmiBlog = blogSlugs.has('lower-emi-not-always-cheaper');
  const hasProcessingFeeBlog = blogSlugs.has('personal-loan-processing-fee-explained');
  const personalLoanLinks: ContextualLink[] = [
    hasLowerEmiBlog
      ? { href: '/blog/lower-emi-not-always-cheaper', label: 'why lower EMI is not always cheaper guide' }
      : null,
    hasProcessingFeeBlog
      ? {
          href: '/blog/personal-loan-processing-fee-explained',
          label: 'personal loan processing fee explained guide',
        }
      : null,
    liveToolSlugs.has('emergency-fund-calculator-india')
      ? { href: '/tools/emergency-fund-calculator-india', label: 'emergency fund calculator for cash-buffer planning' }
      : null,
    liveToolSlugs.has('fd-calculator-india')
      ? { href: '/tools/fd-calculator-india', label: 'FD calculator for low-volatility parking scenarios' }
      : null,
    { href: '/resources', label: 'RupeeKit resources hub for checklists and planning guides' },
  ].filter((item): item is ContextualLink => item !== null);

  const emergencyFundLinks: ContextualLink[] = [
    blogSlugs.has('how-much-emergency-fund')
      ? { href: '/blog/how-much-emergency-fund', label: 'emergency fund guide' }
      : null,
    liveToolSlugs.has('personal-loan-emi-calculator-india')
      ? { href: '/tools/personal-loan-emi-calculator-india', label: 'personal loan EMI calculator' }
      : null,
    liveToolSlugs.has('fd-calculator-india')
      ? { href: '/tools/fd-calculator-india', label: 'FD calculator' }
      : null,
    liveToolSlugs.has('sip-calculator-india')
      ? { href: '/tools/sip-calculator-india', label: 'SIP calculator' }
      : null,
    liveToolSlugs.has('recurring-deposit-calculator-india')
      ? { href: '/tools/recurring-deposit-calculator-india', label: 'recurring deposit calculator' }
      : null,
  ].filter((item): item is ContextualLink => item !== null);

  const sipLinks: ContextualLink[] = [
    liveToolSlugs.has('fd-calculator-india')
      ? { href: '/tools/fd-calculator-india', label: 'FD calculator for fixed-return comparison' }
      : null,
    liveToolSlugs.has('personal-loan-emi-calculator-india')
      ? { href: '/tools/personal-loan-emi-calculator-india', label: 'personal loan EMI calculator for obligation planning' }
      : null,
    liveToolSlugs.has('emergency-fund-calculator-india')
      ? { href: '/tools/emergency-fund-calculator-india', label: 'emergency fund calculator before aggressive investing' }
      : null,
    blogSlugs.has('how-much-emergency-fund')
      ? { href: '/blog/how-much-emergency-fund', label: 'guide on how much emergency fund may be practical' }
      : null,
    { href: '/resources', label: 'RupeeKit resources hub' },
  ].filter((item): item is ContextualLink => item !== null);

  const taxGuideHref = '/blog/itr-2-ay-2026-27-filing-guide';
  const taxGuideToolSlugs = new Set([
    'income-tax-calculator-old-vs-new-regime-india',
    'hra-exemption-calculator-india',
    '80c-deduction-calculator-india',
  ]);
  const showTaxGuideLink = blogSlugs.has('itr-2-ay-2026-27-filing-guide') && taxGuideToolSlugs.has(tool.slug);
  const showPersonalLoanLinkOnEmiPage =
    tool.slug === 'emi-calculator-india' && liveToolSlugs.has(PERSONAL_LOAN_SLUG);
  const effectiveQuickAnswer = tool.quickAnswer ?? buildFallbackQuickAnswer(tool);
  const genericAnswerEngineSummary = buildGenericAnswerEngineSummary(tool);
  const genericCalculatorFacts = buildGenericCalculatorFacts(tool);
  const personalLoanFacts = [
    {
      topic: 'EMI formula',
      explanation: 'Uses loan amount, monthly interest rate, and tenure',
    },
    {
      topic: 'Lower EMI',
      explanation: 'May increase total interest if tenure is longer',
    },
    {
      topic: 'Processing fee',
      explanation: 'Can increase total borrowing cost',
    },
    {
      topic: 'GST',
      explanation: 'May apply on fees depending on lender/product terms',
    },
    {
      topic: 'Prepayment',
      explanation: 'May reduce interest, but charges may apply',
    },
    {
      topic: 'Live rates',
      explanation: 'RupeeKit does not fetch live lender rates',
    },
    {
      topic: 'Loan approval',
      explanation: 'RupeeKit does not provide loan approval',
    },
    {
      topic: 'Data privacy',
      explanation: 'Calculator values are processed in-browser and not saved by default',
    },
  ];
  const hasSourceMethodologyInSections =
    Array.isArray(tool.contentSections)
    && tool.contentSections.some((section) => /source and methodology/i.test(section.heading));
  const showGenericSourceMethodology =
    !isHraPage && !isPersonalLoanPage && !isSipPage && !hasSourceMethodologyInSections;

  const pageUrl = `${SITE_URL}/tools/${tool.slug}`;

  const faqSchema =
    tool.faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: tool.faqs.map((faq) => ({
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
        name: 'Calculators',
        item: `${SITE_URL}/tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: heading,
        item: pageUrl,
      },
    ],
  };

  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: isHraPage ? 'HRA Exemption Calculator India' : tool.name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Any',
    url: pageUrl,
    description: isHraPage
      ? 'Calculate likely HRA exemption under Indian tax rules.'
      : tool.metaDescription,
    dateModified: LAST_REVIEWED_ISO_BY_SLUG[tool.slug],
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
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
      {tool.howToUse && tool.howToUse.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HowTo',
              name: `How to use the ${tool.name}`,
              step: tool.howToUse.map((text, i) => ({
                '@type': 'HowToStep',
                position: i + 1,
                text,
              })),
            }),
          }}
        />
      ) : null}

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-950">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/tools" className="hover:text-slate-950">
          Calculators
        </Link>
        <span className="mx-2">/</span>
        <span>{heading}</span>
      </nav>

      <header className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.5fr] lg:items-end">
        <div>
          <span className="rounded-full bg-sky-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-700">
            {tool.category}
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            {heading}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{description}</p>

          {isHraPage ? (
            <p className="mt-4 text-sm text-slate-500">
              Last reviewed: {tool.lastReviewed ?? 'July 2026'}
              <br />
              Reviewed for FY 2026-27 HRA city-rule changes.
            </p>
          ) : isPersonalLoanPage ? (
            <p className="mt-4 text-sm text-slate-500">Last reviewed: {tool.lastReviewed ?? 'July 2026'}</p>
          ) : tool.lastReviewed ? (
            <p className="mt-4 text-sm text-slate-500">Last reviewed: {tool.lastReviewed}</p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          <p className="font-bold">Educational estimate only</p>
          <p className="mt-2">
            Results can vary based on company policy, lender terms, tax law, and personal assumptions.
          </p>
          {isHraPage ? (
            <p className="mt-2">
              For HRA claims, verify final eligibility and documentation with your employer payroll team, CA, and
              official rules before filing.
            </p>
          ) : null}
          {isPersonalLoanPage ? (
            <p className="mt-2">
              RupeeKit is not a lender, does not provide loan approval, and does not publish official live bank rates.
            </p>
          ) : null}
          {isEmergencyFundPage ? (
            <p className="mt-2">
              Emergency fund outputs are planning estimates only and are not financial or investment advice.
            </p>
          ) : null}
          <p className="mt-2 text-xs text-amber-800">See the Source and methodology section below for details.</p>
        </div>
      </header>

      {isPersonalLoanPage ? (
          <div className="mt-10">
            <PersonalLoanDecisionSimulator
              tool={tool}
              quickAnswer={effectiveQuickAnswer}
              answerEngineSummary={PERSONAL_LOAN_ANSWER_ENGINE_SUMMARY}
            />
          </div>
      ) : (
        <>
          <div className="mt-10">
            <Calculator tool={tool} />
          </div>
          {effectiveQuickAnswer ? (
            <section className="mt-6">
              <QuickAnswerBox
                title={effectiveQuickAnswer.title}
                question={effectiveQuickAnswer.question}
                answer={effectiveQuickAnswer.answer}
                formula={effectiveQuickAnswer.formula}
                example={effectiveQuickAnswer.example}
                note={effectiveQuickAnswer.note}
                links={effectiveQuickAnswer.links}
              />
            </section>
          ) : null}
          <AnswerEngineSummary
            id="answer-engine-summary"
            summary={
              isSipPage
                ? 'A SIP calculator estimates the future value of monthly investments using SIP amount, expected annual return, and investment duration. RupeeKit\'s SIP calculator also shows step-up SIP, goal SIP, missed SIP impact, pause-and-restart scenarios, inflation-adjusted value, and EMI-to-SIP redirect scenarios. Results are educational estimates only because mutual fund returns are market-linked and not guaranteed.'
                : genericAnswerEngineSummary
            }
          />
        </>
      )}

      {isEmergencyFundPage ? (
        <section className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50 p-5">
          <p className="text-sm leading-7 text-slate-700">
            An emergency fund is money kept aside only for genuine financial shocks such as job loss, medical
            expenses, urgent home repair or an EMI gap. In India, the right target is usually not based on salary
            alone. It should reflect essential monthly expenses, dependants, loan obligations and income stability.
            Use this emergency fund calculator to estimate a practical 3, 6, 9 or 12 month buffer and see how much
            you may need to save each month to get there.
          </p>
        </section>
      ) : null}

      {showPersonalLoanLinkOnEmiPage ? (
        <section className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm leading-7 text-slate-700">
            Need EMI for a personal loan? Use the{' '}
            <Link
              href="/tools/personal-loan-emi-calculator-india"
              className="font-semibold text-emerald-800 hover:underline"
            >
              Personal Loan EMI Calculator India
            </Link>
            .
          </p>
        </section>
      ) : null}

      {showTaxGuideLink ? (
        <section className="mt-8 rounded-2xl border border-sky-200 bg-sky-50 p-5">
          <p className="text-[11px] font-bold uppercase tracking-wide text-sky-800">Tax Filing Resource</p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">
            ITR-2 AY 2026-27: Who Must File, Due Date and Preparation Guide
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Use this guide to verify ITR-2 applicability, required documents, and filing steps.
          </p>
          <Link
            href={taxGuideHref}
            className="mt-4 inline-flex items-center rounded-full bg-sky-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-800"
          >
            Read ITR-2 Guide
          </Link>
        </section>
      ) : null}

      <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          {isHraPage ? (
            <HraEducationalContent links={contextualLinks} />
          ) : isSipPage ? (
            <SipEducationalContent links={sipLinks} lastReviewed={tool.lastReviewed} />
          ) : (
            <>
              {!isPersonalLoanPage && !isEmergencyFundPage ? (
                <>
                  <h2 className="text-2xl font-bold">Formula used</h2>
                  <p className="mt-4 leading-8 text-slate-700">{tool.formulaExplanation}</p>
                </>
              ) : null}

              {!isPersonalLoanPage && !isEmergencyFundPage ? (
                <>
                  <h2 className="mt-8 text-2xl font-bold">Example calculation</h2>
                  <p className="mt-4 leading-8 text-slate-700">{tool.example}</p>
                </>
              ) : null}

              {tool.howToUse?.length && !isPersonalLoanPage && !isEmergencyFundPage ? (
                <>
                  <h2 className="mt-8 text-2xl font-bold">How to use this calculator</h2>
                  <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-700">
                    {tool.howToUse.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ol>
                </>
              ) : null}

              {tool.assumptions?.length ? (
                <>
                  <h2 className="mt-8 text-2xl font-bold">Important assumptions</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                    {tool.assumptions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {tool.commonMistakes?.length && !isPersonalLoanPage && !isEmergencyFundPage ? (
                <>
                  <h2 className="mt-8 text-2xl font-bold">Common mistakes to avoid</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                    {tool.commonMistakes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {tool.contentSections?.map((section) => (
                <section
                  key={section.heading}
                  id={
                    isPersonalLoanPage
                      ? PERSONAL_LOAN_SECTION_IDS[section.heading]
                      : isEmergencyFundPage && section.heading === 'Source and Methodology'
                        ? 'source-and-methodology'
                        : undefined
                  }
                  className="mt-8 scroll-mt-24"
                >
                  <h2 className="text-2xl font-bold">{section.heading}</h2>
                  {isEmergencyFundPage && section.heading === 'Source and Methodology' ? (
                    <p className="mt-2 text-sm text-slate-500">Last reviewed: {tool.lastReviewed ?? 'July 2026'}</p>
                  ) : null}
                  <p className="mt-4 leading-8 text-slate-700">{section.body}</p>
                  {isEmergencyFundPage && section.heading === 'Source and Methodology' ? (
                    <p className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700">
                      Educational estimate only. RupeeKit does not provide financial, investment, legal or tax advice.
                      The result is for planning support only.
                    </p>
                  ) : null}

                  {isEmergencyFundPage && section.heading === 'Emergency Fund by Life Situation' ? (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[680px] rounded-2xl border border-slate-200 text-left text-xs text-slate-700 md:text-sm">
                        <thead className="bg-slate-50 text-slate-900">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Life situation</th>
                            <th className="px-4 py-3 font-semibold">Emergency fund range</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">Single salaried person, stable job</td>
                            <td className="px-4 py-3">May consider 3-6 months</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">Married couple, dual income</td>
                            <td className="px-4 py-3">May consider 3-6 months</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">Married couple, single income</td>
                            <td className="px-4 py-3">May consider 6-9 months</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">Family with kids and EMI</td>
                            <td className="px-4 py-3">May consider 6-12 months</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">Freelancer or business owner</td>
                            <td className="px-4 py-3">May consider 9-12 months</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">Unstable income</td>
                            <td className="px-4 py-3">May consider 9-12 months</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  ) : null}

                  {isEmergencyFundPage && section.heading === 'Where should you keep emergency fund in India?' ? (
                    <>
                      <div className="mt-4 overflow-x-auto">
                        <table className="w-full min-w-[680px] rounded-2xl border border-slate-200 text-left text-xs text-slate-700 md:text-sm">
                          <thead className="bg-slate-50 text-slate-900">
                            <tr>
                              <th className="px-4 py-3 font-semibold">Option</th>
                              <th className="px-4 py-3 font-semibold">Good for</th>
                              <th className="px-4 py-3 font-semibold">Caution</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-slate-200">
                              <td className="px-4 py-3">Savings account</td>
                              <td className="px-4 py-3">Instant access for immediate needs</td>
                              <td className="px-4 py-3">Returns may be lower than other options</td>
                            </tr>
                            <tr className="border-t border-slate-200">
                              <td className="px-4 py-3">Sweep-in FD</td>
                              <td className="px-4 py-3">Quick access with linked deposit discipline</td>
                              <td className="px-4 py-3">Bank terms and break conditions may vary</td>
                            </tr>
                            <tr className="border-t border-slate-200">
                              <td className="px-4 py-3">Short-term FD</td>
                              <td className="px-4 py-3">Planned parking for part of emergency corpus</td>
                              <td className="px-4 py-3">Premature withdrawal terms can apply</td>
                            </tr>
                            <tr className="border-t border-slate-200">
                              <td className="px-4 py-3">Liquid fund</td>
                              <td className="px-4 py-3">Low-risk liquid option for some households</td>
                              <td className="px-4 py-3">Not risk-free; exit terms and volatility can vary</td>
                            </tr>
                            <tr className="border-t border-slate-200">
                              <td className="px-4 py-3">Small cash at home</td>
                              <td className="px-4 py-3">Urgent same-day cash-only situations</td>
                              <td className="px-4 py-3">Keep only a limited amount for safety</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm leading-6 text-amber-900">
                        Keep at least one part of your emergency fund instantly accessible. Do not keep your core
                        emergency money in equity, crypto, long lock-in products or anything that may fall sharply
                        when you need cash.
                      </p>
                    </>
                  ) : null}

                  {section.bullets?.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {isEmergencyFundPage ? (
                <>
                  <section className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">3-Month vs 6-Month vs 9-Month vs 12-Month Emergency Fund</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      A 3-month target may cover short disruptions for stable households, while 6 months is a common
                      baseline for many families. A 9 or 12 month target can be more practical when income is variable,
                      dependants are high, or EMI obligations are large.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[680px] rounded-2xl border border-slate-200 text-left text-xs text-slate-700 md:text-sm">
                        <thead className="bg-slate-50 text-slate-900">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Fund size</th>
                            <th className="px-4 py-3 font-semibold">May suit</th>
                            <th className="px-4 py-3 font-semibold">Caution</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">3 months</td>
                            <td className="px-4 py-3">Stable salaried income with lower fixed obligations</td>
                            <td className="px-4 py-3">May be thin for job loss, medical shocks, or high EMIs</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">6 months</td>
                            <td className="px-4 py-3">Many households with moderate EMI and dependants</td>
                            <td className="px-4 py-3">Review after expense spikes or income instability</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">9 months</td>
                            <td className="px-4 py-3">Single-income families or higher uncertainty phases</td>
                            <td className="px-4 py-3">Needs disciplined monthly top-ups to maintain target</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3">12 months</td>
                            <td className="px-4 py-3">Business/freelance income, high obligations, or volatile cash flow</td>
                            <td className="px-4 py-3">Avoid over-allocating if it blocks essential debt reduction goals</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">Should EMI be included in emergency fund calculation?</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      Yes, EMI commitments are usually included because they remain due during income disruption.
                      This calculator adds monthly EMI commitments to essential expenses before multiplying by
                      target months.
                    </p>
                  </section>

                  <section className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">How often should you review your emergency fund?</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                      <li>Recalculate monthly survival cost after rent, school fee, insurance, or EMI changes.</li>
                      <li>Review target months after job changes, role changes, or family dependency changes.</li>
                      <li>Keep at least one part of the corpus instantly accessible.</li>
                      <li>Refill emergency savings after any withdrawal.</li>
                      <li>Review the plan at least every 6 to 12 months.</li>
                    </ul>
                  </section>

                  <section className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">Is an emergency fund different from investment savings?</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      Emergency money is for immediate liquidity during shocks. Investment savings are usually for
                      long-term growth goals and can carry market risk or lock-ins. Keep your core emergency corpus
                      separate from long-term investment buckets.
                    </p>
                  </section>
                </>
              ) : null}

              {isPersonalLoanPage ? (
                <>
                  <section id="what-affects-your-personal-loan-emi" className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">What affects your personal loan EMI?</h2>
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                      <li>Higher loan amount generally increases monthly EMI.</li>
                      <li>Higher annual interest rate increases EMI and total interest cost.</li>
                      <li>Longer tenure can reduce EMI but may increase total interest paid.</li>
                      <li>Existing EMIs affect your overall monthly debt burden.</li>
                      <li>Processing fee can increase total borrowing cost even when EMI stays unchanged.</li>
                    </ul>
                  </section>

                  <section id="tenure-comparison-12-24-36-48-60-months" className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">Tenure Comparison: 12, 24, 36, 48, 60 Months</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      Use the tenure comparison table and visuals on this page to compare EMI, total interest, and total
                      repayment across common month-based options before selecting a tenure.
                    </p>
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full min-w-[680px] rounded-2xl border border-slate-200 text-left text-xs text-slate-700 md:text-sm">
                        <thead className="bg-slate-50 text-slate-900">
                          <tr>
                            <th className="px-4 py-3 font-semibold">Tenure choice</th>
                            <th className="px-4 py-3 font-semibold">EMI impact</th>
                            <th className="px-4 py-3 font-semibold">Total interest impact</th>
                            <th className="px-4 py-3 font-semibold">Useful when</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3 font-medium">Short tenure</td>
                            <td className="px-4 py-3">Higher monthly EMI</td>
                            <td className="px-4 py-3">Usually lower total interest</td>
                            <td className="px-4 py-3">Cash flow can handle higher EMI and you want faster closure</td>
                          </tr>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-3 font-medium">Long tenure</td>
                            <td className="px-4 py-3">Lower monthly EMI</td>
                            <td className="px-4 py-3">Usually higher total interest</td>
                            <td className="px-4 py-3">Need lower monthly EMI to manage near-term budget pressure</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </section>

                  <section id="emi-burden-on-monthly-income" className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">What is EMI burden on monthly income?</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      This page estimates EMI-to-income and total EMI burden percentages so you can check affordability.
                      This is a budgeting indicator only and not a lender approval signal.
                    </p>
                  </section>

                  <section id="live-bank-interest-rates" className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">Does RupeeKit show live bank interest rates?</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      No. RupeeKit does not fetch live lender rates, offers, approvals, or disbursal data. Enter
                      official lender values for loan amount, annual interest rate, fees, and tenure before using
                      results for comparison.
                    </p>
                  </section>

                  <section id="personal-loan-repayment-schedule-amortization" className="mt-8 scroll-mt-24">
                    <h2 className="text-2xl font-bold">Personal Loan Repayment Schedule / Amortization</h2>
                    <p className="mt-4 leading-8 text-slate-700">
                      The yearly amortization summary shows how each year&apos;s EMI is split between principal and
                      interest. It helps you understand how repayment composition changes over the loan tenure.
                    </p>
                  </section>
                </>
              ) : null}

              {isPersonalLoanPage && personalLoanLinks.length ? (
                <section className="mt-8">
                  <h2 className="text-2xl font-bold">Related calculators and guides</h2>
                  <p className="mt-4 leading-8 text-slate-700">
                    You can cross-check this estimate using related RupeeKit tools and guides:{' '}
                    {personalLoanLinks.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? ', ' : ''}
                        <Link href={link.href} className="font-medium text-sky-700 hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                </section>
              ) : null}

              {isEmergencyFundPage && emergencyFundLinks.length ? (
                <section className="mt-8">
                  <h2 className="text-2xl font-bold">Related calculators and guides</h2>
                  <p className="mt-4 leading-8 text-slate-700">
                    You can continue planning with these RupeeKit resources:{' '}
                    {emergencyFundLinks.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? ', ' : ''}
                        <Link href={link.href} className="font-medium text-sky-700 hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                </section>
              ) : null}

              {isHraPage && hraLinks.length ? (
                <section className="mt-8">
                  <h2 className="text-2xl font-bold">Related calculators and guides</h2>
                  <p className="mt-4 leading-8 text-slate-700">
                    HRA exemption only applies under the old tax regime, so also compare using:{' '}
                    {hraLinks.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? ', ' : ''}
                        <Link href={link.href} className="font-medium text-sky-700 hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                </section>
              ) : null}

              {!isHraPage && !isPersonalLoanPage && !isEmergencyFundPage && !isSipPage && contextualLinks.length ? (
                <section className="mt-8">
                  <h2 className="text-2xl font-bold">Related calculators and guides</h2>
                  <p className="mt-4 leading-8 text-slate-700">
                    You can cross-check this estimate using:{' '}
                    {contextualLinks.map((link, index) => (
                      <span key={link.href}>
                        {index > 0 ? ', ' : ''}
                        <Link href={link.href} className="font-medium text-sky-700 hover:underline">
                          {link.label}
                        </Link>
                      </span>
                    ))}
                    .
                  </p>
                </section>
              ) : null}

              {!isEmergencyFundPage ? (
                <>
                  <h2 className="mt-8 text-2xl font-bold">When this tool is useful</h2>
                  <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                    <li>When you want a fast estimate before making a financial or salary decision.</li>
                    <li>When you want to compare different assumptions in seconds.</li>
                    <li>When you want to understand the formula behind the result.</li>
                  </ul>
                </>
              ) : null}
            </>
          )}
        </article>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold">Related calculators</h2>

            <div className="mt-5 grid gap-3">
              {related.length > 0 ? (
                related.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/tools/${item.slug}`}
                    className="rounded-2xl border border-slate-200 p-4 transition hover:border-sky-200 hover:bg-sky-50"
                  >
                    <p className="font-bold text-slate-950">{item.name}</p>
                    <p className="mt-1 text-sm leading-5 text-slate-600">{item.shortDescription}</p>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-slate-600">More related calculators will be added soon.</p>
              )}
            </div>
          </div>

          {isHraPage || isPersonalLoanPage || isSipPage ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">On this page</h2>
              <nav className="mt-4">
                <ul className="space-y-2 text-sm text-slate-700">
                  {(isHraPage ? HRA_TOC : isPersonalLoanPage ? PERSONAL_LOAN_TOC : SIP_TOC).map((section) => (
                    <li key={section.id}>
                      <a href={`#${section.id}`} className="hover:text-sky-700 hover:underline">
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ) : null}
        </aside>
      </section>

      {isHraPage ? (
        <section id="source-and-methodology" className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 scroll-mt-24">
          <h2 className="text-2xl font-bold">Source and methodology</h2>
          <p className="mt-4 leading-8 text-slate-700">
            This calculator compares actual HRA, rent paid minus 10% of salary, and city-based salary cap. It is
            designed for educational estimation under old-regime HRA rules and should be verified with employer payroll,
            official guidance, or a qualified tax professional.
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            This calculator uses the HRA exemption formula under Rule 279 of the Income-tax Rules, 2026. The estimated
            exemption is calculated as the least of:
          </p>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-slate-700">
            <li>Actual HRA received</li>
            <li>Rent paid minus 10% of salary</li>
            <li>50% of salary for specified cities or 40% of salary for other cities</li>
          </ol>
          <p className="mt-4 leading-8 text-slate-700">
            For FY 2026-27, the specified 50% cities include Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune,
            Ahmedabad and Bengaluru. Please verify your final claim with your employer, payroll team or tax
            professional before filing.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            Official source:{' '}
            <a
              href="https://www.incometax.gov.in/iec/foportal/sites/default/files/2026-03/En-Notified-IT-Rules-2026-20-03-2026.pdf?mobile-app=1"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky-700 hover:underline"
            >
              Income-tax Rules, 2026 notification, Ministry of Finance / CBDT
            </a>
            .
          </p>
        </section>
      ) : null}

      {isPersonalLoanPage ? (
        <FactsTable
          id="personal-loan-calculator-facts"
          title="Personal Loan EMI Calculator Facts"
          rows={personalLoanFacts}
        />
      ) : !isSipPage ? (
        <FactsTable id="calculator-facts" rows={genericCalculatorFacts} />
      ) : null}

      {showGenericSourceMethodology ? (
        <section id="source-and-methodology" className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 scroll-mt-24">
          <h2 className="text-2xl font-bold">Source and methodology</h2>
          {tool.lastReviewed ? <p className="mt-2 text-sm text-slate-500">Last reviewed: {tool.lastReviewed}</p> : null}
          <p className="mt-4 leading-8 text-slate-700">
            This calculator uses user-entered values and the formula logic shown on this page to generate educational
            estimates. Method reference: {firstSentence(tool.formulaExplanation)}
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            Inputs are processed in-page to show planning outputs. RupeeKit does not provide personalized financial,
            tax, legal, investment, or loan advice.
          </p>
        </section>
      ) : null}

      <section
        id="faqs"
        className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 scroll-mt-24"
      >
        <h2 className="text-2xl font-bold">FAQs</h2>

        <div className="mt-6 grid gap-4">
          {tool.faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl bg-slate-50 p-5">
              <summary className="cursor-pointer font-bold text-slate-950">{faq.question}</summary>
              <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      {isPersonalLoanPage ? (
        <section id="source-and-methodology" className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8 scroll-mt-24">
          <h2 className="text-2xl font-bold">Source and methodology</h2>
          <p className="mt-2 text-sm text-slate-500">Last reviewed: {tool.lastReviewed ?? 'July 2026'}</p>
          <p className="mt-4 leading-8 text-slate-700">
            This calculator uses the standard reducing-balance EMI formula based on loan amount, monthly interest rate,
            and tenure in months. It also estimates processing fee impact and EMI burden using user-entered values.
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            RupeeKit does not show live bank interest rates or loan offers. Verify final rates, fees, eligibility,
            prepayment and foreclosure charges on the official lender website.
          </p>
          <p className="mt-4 leading-8 text-slate-700">
            RupeeKit is not a lender and does not provide loan approval, disbursal, or official bank rate quotes.
          </p>
          <p className="mt-4 text-sm leading-6 text-slate-700">
            RupeeKit is not affiliated with SBI, HDFC, Bank of Baroda, IDFC, ICICI, Axis Bank or any lender. You can
            use this calculator for any lender by entering the official loan amount, interest rate and tenure offered
            by that lender. Always verify latest rates, fees, eligibility, prepayment charges and foreclosure charges
            on the lender&apos;s official website.
          </p>
        </section>
      ) : null}
    </div>
  );
}
