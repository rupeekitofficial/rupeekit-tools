import type { Metadata } from 'next';
import Link from 'next/link';
import { TaxCalculatorApp } from '@/components/tax/TaxCalculatorApp';
import { availableTaxYears } from '@/lib/tax/indiaIncomeTaxRules';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';

export const metadata: Metadata = {
  title: 'Income Tax Calculator Old vs New Regime India | RupeeKit',
  description: 'Compare old vs new income tax regime in India, estimate tax payable, deductions, rebate, cess, and savings with RupeeKit’s calculator.',
  alternates: {
    canonical: `${SITE_URL}/tools/income-tax-calculator-old-vs-new-regime-india`,
  },
  openGraph: {
    title: 'Income Tax Calculator Old vs New Regime India | RupeeKit',
    description: 'Compare old vs new income tax regime in India, estimate tax payable, deductions, rebate, cess, and savings with RupeeKit’s calculator.',
    url: `${SITE_URL}/tools/income-tax-calculator-old-vs-new-regime-india`,
    siteName: 'RupeeKit',
    type: 'article',
    locale: 'en_IN',
  },
};

const faqs = [
  {
    question: 'Which tax regime is better for me?',
    answer: 'The new regime is generally better if you have few deductions (less than ₹1.5L - ₹2L depending on income level) due to lower slab rates. The old regime is often better if you claim maximum 80C, HRA, and home loan interest deductions. Our calculator runs the exact math to show you the comparison.'
  },
  {
    question: 'Does the calculator include Section 87A rebate?',
    answer: 'Yes, it accurately models Section 87A rebate rules (e.g., up to ₹5L in the old regime, and up to ₹7L in the new regime for FY 24-25) including marginal relief where applicable.'
  },
  {
    question: 'Does the calculator include cess?',
    answer: 'Yes, the standard 4% Health and Education Cess is calculated and added to the final tax liability automatically.'
  },
  {
    question: 'Are HRA and 80C deductions allowed in the new regime?',
    answer: 'No, major deductions like HRA, LTA, Section 80C, and Section 80D are not allowed under the new tax regime. However, standard deduction for salaried employees and employer NPS contributions under 80CCD(2) are allowed.'
  },
  {
    question: 'Which financial year does this calculator support?',
    answer: `This calculator currently supports: ${availableTaxYears.map(y => `FY ${y}`).join(' and ')}. We only include years where official tax rules have been formally passed or notified.`
  }
];

export default function IncomeTaxCalculatorPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="text-sm text-slate-500 mb-8 no-print">
        <Link href="/" className="hover:text-slate-950 transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-slate-900 font-medium">Income Tax Calculator</span>
      </nav>

      <header className="mb-10 grid gap-6 lg:grid-cols-[1fr_0.5fr] lg:items-start no-print">
        <div>
          <span className="inline-block rounded-full bg-brandNavy/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brandNavy mb-4">
            Tax Planning
          </span>
          <h1 className="text-4xl font-black tracking-tight text-brandDeepNavy md:text-5xl lg:text-6xl">
            Income Tax Calculator
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-600 leading-relaxed">
            Compare the old vs new tax regime accurately for India. Estimate your tax payable, view detailed slab calculations, and find out which regime saves you more money.
          </p>
        </div>
        
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900 shadow-sm">
          <p className="font-bold flex items-center gap-2">
            ⚠️ Educational Estimate Only
          </p>
          <p className="mt-2 text-amber-800">
            Educational estimate only. Tax rules can change by financial year. Verify latest slabs, rebates, deductions, and filing rules before acting.
          </p>
        </div>
      </header>

      {/* Main App */}
      <TaxCalculatorApp />

      {/* Educational Content & Links */}
      <section className="mt-16 grid gap-8 lg:grid-cols-3 no-print">
        <div className="lg:col-span-2 space-y-12">
          <article className="prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-brandDeepNavy mb-4">How to Use This Calculator</h2>
            <p>
              To get the most accurate tax comparison, follow these steps:
            </p>
            <ul>
              <li><strong>Select the correct Financial Year (FY):</strong> Tax rules, particularly in the new regime, change frequently (such as the standard deduction increase in Budget 2024). Make sure you are calculating for the right year.</li>
              <li><strong>Input all income sources:</strong> Include your basic salary, DA, bonuses, and any other income. Do not deduct anything yourself before entering.</li>
              <li><strong>Add your deductions:</strong> Enter your Section 80C investments (like ELSS, PPF), health insurance (80D), and any home loan interest (Section 24).</li>
              <li><strong>Review the detailed breakdown:</strong> Don&apos;t just look at the final number. Expand the &quot;How this was calculated&quot; section to see exactly how your income was taxed across different slabs.</li>
            </ul>

            <h2 className="text-2xl font-bold text-brandDeepNavy mt-10 mb-4">Old Regime vs New Regime Explained</h2>
            <p>
              The <strong>Old Tax Regime</strong> offers around 70 different exemptions and deductions, including HRA, LTA, and Section 80C. However, its base tax slabs are higher. It is usually beneficial for individuals who maximize their investment deductions and claim high rent allowances.
            </p>
            <p>
              The <strong>New Tax Regime</strong> is the default tax regime in India. It offers significantly lower tax slab rates but strips away almost all major deductions except for the standard deduction (for salaried individuals) and employer NPS contributions. It is incredibly beneficial for new earners or those who prefer higher in-hand salary without locking their money in tax-saving instruments.
            </p>

            <h2 className="text-2xl font-bold text-brandDeepNavy mt-10 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index}>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </article>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-brandBorder bg-slate-50 p-6">
            <h3 className="font-bold text-brandDeepNavy mb-4">Related Calculators</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/tools/salary-in-hand-calculator-india" className="text-brandNavy hover:underline font-medium text-sm">
                  Salary In-Hand Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/80c-deduction-calculator-india" className="text-brandNavy hover:underline font-medium text-sm">
                  Section 80C Deduction Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/hra-exemption-calculator-india" className="text-brandNavy hover:underline font-medium text-sm">
                  HRA Exemption Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/sip-calculator-india" className="text-brandNavy hover:underline font-medium text-sm">
                  SIP Calculator
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="rounded-3xl bg-brandBgSoft border border-brandNavy/10 p-6">
            <h3 className="font-bold text-brandNavy text-sm tracking-wide uppercase mb-2">Tax Filing Resource</h3>
            <p className="font-bold text-lg text-brandDeepNavy mb-3">
              ITR-2 Filing Guide
            </p>
            <p className="text-sm text-slate-700 mb-4 leading-relaxed">
              Use this comprehensive guide to verify ITR-2 applicability, required documents, and preparation steps.
            </p>
            <Link href="/blog/itr-2-ay-2026-27-filing-guide" className="inline-block rounded-full bg-brandGrowthGreen px-5 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-600">
              Read Guide →
            </Link>
          </div>
        </aside>
      </section>
    </div>
  );
}
