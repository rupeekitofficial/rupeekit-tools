import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Calculator from '@/components/Calculator';
import { getLiveTools, getRelatedTools, getToolBySlug } from '@/lib/tools';

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

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.rupeekit.co.in";
  const pageUrl = `${siteUrl}/tools/${tool.slug}`;

  return {
    title: tool.name,
    description: tool.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: tool.name,
      description: tool.metaDescription,
      url: pageUrl,
      siteName: "RupeeKit",
      type: "article",
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: tool.metaDescription,
    },
  };
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getToolBySlug(params.slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);
  const taxGuideHref = '/blog/itr-2-ay-2026-27-filing-guide';
  const taxGuideToolSlugs = new Set([
    'income-tax-calculator-old-vs-new-regime-india',
    'hra-exemption-calculator-india',
    '80c-deduction-calculator-india',
  ]);
  const showTaxGuideLink = taxGuideToolSlugs.has(tool.slug);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
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

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-950">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>{tool.name}</span>
      </nav>

      <header className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.5fr] lg:items-end">
        <div>
          <span className="rounded-full bg-sky-100 px-4 py-2 text-xs font-bold uppercase tracking-wide text-sky-700">
            {tool.category}
          </span>

          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            {tool.name}
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
            {tool.shortDescription}
          </p>

          {tool.lastReviewed ? (
            <p className="mt-4 text-sm text-slate-500">
              Last reviewed: {tool.lastReviewed}
            </p>
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
          <p className="text-[11px] font-bold uppercase tracking-wide text-sky-800">
            Tax Filing Resource
          </p>
          <h2 className="mt-1 text-lg font-bold text-slate-900">
            ITR-2 AY 2026-27: Who Must File, Due Date & Preparation Guide
          </h2>
          <p className="mt-2 text-sm text-slate-700">
            Use this guide to verify ITR-2 applicability, required documents, and filing steps.
          </p>
          <Link
            href={taxGuideHref}
            className="mt-4 inline-flex items-center rounded-full bg-sky-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-sky-800"
          >
            Read ITR-2 Guide →
          </Link>
        </section>
      ) : null}

      <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
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
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {item.shortDescription}
                  </p>
                </Link>
              ))
            ) : (
              <p className="text-sm text-slate-600">
                More related calculators will be added soon.
              </p>
            )}
          </div>
        </aside>
      </section>

      <section className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-bold">FAQs</h2>

        <div className="mt-6 grid gap-4">
          {tool.faqs.map((faq) => (
            <details key={faq.question} className="rounded-2xl bg-slate-50 p-5">
              <summary className="cursor-pointer font-bold text-slate-950">
                {faq.question}
              </summary>
              <p className="mt-3 leading-7 text-slate-700">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
