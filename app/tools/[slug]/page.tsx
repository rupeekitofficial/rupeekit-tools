import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import Calculator from '@/components/Calculator';
import DownloadHraChecklistButton from '@/components/hra/DownloadHraChecklistButton';
import { getLiveTools, getRelatedTools, getToolBySlug } from '@/lib/tools';

const SITE_URL = 'https://www.rupeekit.co.in';
const HRA_SLUG = 'hra-exemption-calculator-india';
const HRA_META_TITLE = 'HRA Exemption Calculator India 2026 | Old Regime Rule 279';
const HRA_META_DESCRIPTION =
  'Calculate HRA exemption under the old tax regime using 2026 city rules. Compare actual HRA, rent minus 10% of salary, and 50% or 40% salary caps.';
const HRA_H1 = 'HRA Exemption Calculator India';

const liveToolSlugs = new Set(getLiveTools().map((tool) => tool.slug));
const blogSlugs = new Set(blogPosts.map((post) => post.slug));

const HRA_TOC = [
  { id: 'how-to-calculate-hra-exemption', title: 'How to Calculate HRA Exemption' },
  { id: 'hra-exemption-formula-under-rule-279', title: 'HRA Exemption Formula under Rule 279' },
  { id: 'fy-2026-27-hra-city-rules-50-and-40-salary-cap', title: 'FY 2026-27 HRA City Rules: 50% and 40% Salary Cap' },
  { id: 'old-tax-regime-vs-new-tax-regime-for-hra', title: 'Old Tax Regime vs New Tax Regime for HRA' },
  { id: 'hra-calculation-example', title: 'HRA Calculation Example' },
  { id: 'documents-required-to-claim-hra', title: 'Documents Required to Claim HRA' },
  { id: 'what-if-you-missed-hra-proof-submission', title: 'What if You Missed HRA Proof Submission?' },
  { id: 'can-you-pay-rent-to-parents-and-claim-hra', title: 'Can You Pay Rent to Parents and Claim HRA?' },
  { id: 'landlord-details-and-relationship-disclosure', title: 'Landlord Details and Relationship Disclosure' },
  { id: 'common-hra-claim-mistakes', title: 'Common HRA Claim Mistakes' },
  { id: 'when-this-calculator-is-useful', title: 'When This Calculator Is Useful' },
  { id: 'source-and-methodology', title: 'Source and methodology' },
  { id: 'faqs', title: 'FAQs' },
] as const;

type ContextualLink = {
  href: string;
  label: string;
};

function getToolHeading(slug: string, fallback: string) {
  return slug === HRA_SLUG ? HRA_H1 : fallback;
}

function getToolDescription(slug: string, fallback: string) {
  return slug === HRA_SLUG ?
    'Calculate your likely HRA exemption under Rule 279 in seconds. Enter your salary, HRA, rent, and city type to compare the three legal limits and estimate how much HRA can stay tax-exempt under the old regime. Includes FY 2026-27 metro-city rules, a worked example, and a document checklist.' :
    fallback;
}

export function generateStaticParams() {
  return getLiveTools().map((tool) => ({ slug: tool.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tool = getToolBySlug(params.slug);
  if (!tool) return {};

  const pageUrl = `${SITE_URL}/tools/${tool.slug}`;
  const description = tool.slug === HRA_SLUG ? HRA_META_DESCRIPTION : tool.metaDescription;

  return {
    title: tool.slug === HRA_SLUG ? { absolute: HRA_META_TITLE } : tool.name,
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
      title: tool.slug === HRA_SLUG ? HRA_META_TITLE : tool.name,
      description,
      url: pageUrl,
      siteName: 'RupeeKit',
      type: 'article',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title: tool.slug === HRA_SLUG ? HRA_META_TITLE : tool.name,
      description,
    },
  };
}

function HraEducationalContent({ links }: { links: ContextualLink[] }) {
  return (
    <>
      <section id="how-to-calculate-hra-exemption" className="scroll-mt-24">
        <h2 className="text-2xl font-bold">How to Calculate HRA Exemption</h2>
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
      </section>

      <section id="fy-2026-27-hra-city-rules-50-and-40-salary-cap" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">FY 2026-27 HRA City Rules: 50% and 40% Salary Cap</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Rule 279 HRA exemption uses two city groups for salary cap.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full rounded-2xl border border-slate-200 text-left text-sm text-slate-700">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold">City group</th>
                <th className="px-4 py-3 font-semibold">Cities</th>
                <th className="px-4 py-3 font-semibold">Salary cap used in HRA formula</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">50% salary cap</td>
                <td className="px-4 py-3">Mumbai, Kolkata, Delhi, Chennai, Hyderabad, Pune, Ahmedabad, Bengaluru</td>
                <td className="px-4 py-3">50% of salary for specified cities</td>
              </tr>
              <tr className="border-t border-slate-200">
                <td className="px-4 py-3 font-medium">40% salary cap</td>
                <td className="px-4 py-3">Other Indian cities</td>
                <td className="px-4 py-3">40% of salary for other cities</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="old-tax-regime-vs-new-tax-regime-for-hra" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Old Tax Regime vs New Tax Regime for HRA</h2>
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
        <h2 className="text-2xl font-bold">Documents Required to Claim HRA</h2>
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
        <h2 className="text-2xl font-bold">Can You Pay Rent to Parents and Claim HRA?</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Yes, if rent is genuinely paid and documented. Keep receipts and payment trail, and ensure rental income is
          disclosed by parents where required.
        </p>
      </section>

      <section id="landlord-details-and-relationship-disclosure" className="mt-8 scroll-mt-24">
        <h2 className="text-2xl font-bold">Landlord Details and Relationship Disclosure</h2>
        <p className="mt-4 leading-8 text-slate-700">
          Where the applicable employer declaration or prescribed form asks for landlord details, keep the landlord
          name, address, PAN/Aadhaar where applicable, rent paid and relationship with the landlord ready.
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

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const isHraPage = tool.slug === HRA_SLUG;
  const heading = getToolHeading(tool.slug, tool.name);
  const description = getToolDescription(tool.slug, tool.shortDescription);

  const related = getRelatedTools(tool);

  const contextualLinks: ContextualLink[] = [
    liveToolSlugs.has('salary-in-hand-calculator-india') ? {
      href: '/tools/salary-in-hand-calculator-india',
      label: 'salary in-hand calculator',
    } : null,
    liveToolSlugs.has('income-tax-calculator-india') ? {
      href: '/tools/income-tax-calculator-india',
      label: 'income tax calculator',
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

  const taxGuideHref = '/blog/itr-2-ay-2026-27-filing-guide';
  const taxGuideToolSlugs = new Set([
    'income-tax-calculator-old-vs-new-regime-india',
    'hra-exemption-calculator-india',
    '80c-deduction-calculator-india',
  ]);
  const showTaxGuideLink = blogSlugs.has('itr-2-ay-2026-27-filing-guide') && taxGuideToolSlugs.has(tool.slug);

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

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-950">
          Home
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
              Last updated: May 2026
              <br />
              Reviewed for FY 2026-27 HRA city-rule changes.
            </p>
          ) : tool.lastReviewed ? (
            <p className="mt-4 text-sm text-slate-500">Last reviewed: {tool.lastReviewed}</p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-900">
          <p className="font-bold">Educational estimate only</p>
          <p className="mt-2">
            Calculator results can vary based on company policy, lender terms, tax law,
            investment assumptions or personal details.
          </p>
        </div>
      </header>

      <div className="mt-10">
        <Calculator tool={tool} />
      </div>

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
          ) : (
            <>
              <h2 className="text-2xl font-bold">Formula used</h2>
              <p className="mt-4 leading-8 text-slate-700">{tool.formulaExplanation}</p>

              <h2 className="mt-8 text-2xl font-bold">Example calculation</h2>
              <p className="mt-4 leading-8 text-slate-700">{tool.example}</p>

              {tool.howToUse?.length ? (
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

              {tool.commonMistakes?.length ? (
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
                <section key={section.heading}>
                  <h2 className="mt-8 text-2xl font-bold">{section.heading}</h2>
                  <p className="mt-4 leading-8 text-slate-700">{section.body}</p>

                  {section.bullets?.length ? (
                    <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              <h2 className="mt-8 text-2xl font-bold">When this tool is useful</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-slate-700">
                <li>When you want a fast estimate before making a financial or salary decision.</li>
                <li>When you want to compare different assumptions in seconds.</li>
                <li>When you want to understand the formula behind the result.</li>
              </ul>
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

          {isHraPage ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-900">On this page</h2>
              <nav className="mt-4">
                <ul className="space-y-2 text-sm text-slate-700">
                  {HRA_TOC.map((section) => (
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
              href="https://www.incometaxindia.gov.in/documents/d/guest/en-notified-it-rules-2026-20-03-2026-pdf"
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
    </div>
  );
}
