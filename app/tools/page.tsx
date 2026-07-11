import type { Metadata } from 'next';
import Link from 'next/link';
import { getLiveTools } from '@/lib/tools';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
const TITLE = 'Free Financial Calculators India | RupeeKit';
const DESCRIPTION =
  'Browse all free RupeeKit calculators for India — salary, income tax, EMI, home loan, PPF, EPF, SIP, FD, gold loan and more. No signup, instant results.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/tools`,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/tools`,
    siteName: 'RupeeKit',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
};

const CATEGORY_ORDER = ['Salary', 'Tax', 'Loans', 'Savings', 'Investments', 'Retirement'];

export default function ToolsIndexPage() {
  const tools = getLiveTools();
  const categories = Array.from(new Set(tools.map((tool) => tool.category))).sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? CATEGORY_ORDER.length : ia) - (ib === -1 ? CATEGORY_ORDER.length : ib);
  });

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
    ],
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'RupeeKit Financial Calculators for India',
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: tool.name,
      url: `${SITE_URL}/tools/${tool.slug}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-slate-950">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span>Calculators</span>
      </nav>

      <header className="mt-6 max-w-3xl">
        <h1 className="text-3xl font-black tracking-tight text-brandDeepNavy md:text-4xl">
          Free Financial Calculators for India
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-brandMuted md:text-base">
          All {tools.length} RupeeKit calculators in one place — salary, income tax, loans, savings,
          investments and retirement. Every tool is free, needs no signup, runs instantly in your
          browser, and explains the formula behind the result.
        </p>
      </header>

      <div className="mt-10 space-y-12">
        {categories.map((category) => (
          <section key={category} className="space-y-5">
            <h2 className="text-2xl font-black tracking-tight text-brandDeepNavy">
              {category} Calculators
            </h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tools
                .filter((tool) => tool.category === category)
                .map((tool) => (
                  <Link
                    key={tool.slug}
                    href={`/tools/${tool.slug}`}
                    className="group flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
                  >
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-brandDeepNavy transition group-hover:text-brandNavy">
                        {tool.name}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-brandMuted">
                        {tool.shortDescription}
                      </p>
                    </div>
                    <div className="mt-5 pt-3 border-t border-brandBorder">
                      <p className="text-sm font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
                        Open calculator →
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>

      <section className="mt-14 rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-xl font-bold text-brandDeepNavy">About these calculators</h2>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          RupeeKit calculators are built for Indian salary structures, tax rules and financial
          products. Each one shows the formula, a worked example, common mistakes and FAQs, so you
          understand the math rather than just the final number. All results are educational
          estimates — verify major tax, loan and investment decisions with official sources or a
          qualified professional. New here? Start with the{' '}
          <Link href="/start-here" className="font-medium text-sky-700 hover:underline">
            Start Here guide
          </Link>{' '}
          or take the{' '}
          <Link href="/money-health-check" className="font-medium text-sky-700 hover:underline">
            Money Health Check
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
