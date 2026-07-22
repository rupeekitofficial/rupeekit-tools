import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
const pageUrl = `${SITE_URL}/financial-updates/epfo-services-restored-july-2026`;

export const metadata: Metadata = {
  title: 'EPFO Services Restored After Upgrade: What Members Should Know | RupeeKit',
  description:
    'EPFO says member and employer services are live again after a database and software upgrade. Understand possible delays and what members should do.',
  alternates: { canonical: pageUrl },
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    title: 'EPFO Services Restored After Upgrade: What Members Should Know',
    description:
      'A simple story-based explanation of EPFO service restoration, temporary processing delays and practical next steps.',
    url: pageUrl,
    type: 'article',
    locale: 'en_IN',
    images: [
      {
        url: `${SITE_URL}/images/updates/epfo-service-restoration/slide-1.svg`,
        width: 1080,
        height: 1350,
        alt: 'Indian salaried employee checking an EPFO claim after the service restoration notice',
      },
    ],
  },
};

const slides = [
  {
    src: '/images/updates/epfo-service-restoration/slide-1.svg',
    alt: 'Indian salaried employee checking an EPFO claim after the service restoration notice',
  },
  {
    src: '/images/updates/epfo-service-restoration/slide-2.svg',
    alt: 'EPFO database consolidation and software upgrade explained as a system maintenance story',
  },
  {
    src: '/images/updates/epfo-service-restoration/slide-3.svg',
    alt: 'EPFO member services returning in phases after the system upgrade',
  },
  {
    src: '/images/updates/epfo-service-restoration/slide-4.svg',
    alt: 'EPFO member advised not to submit repeated claims during post-upgrade stabilisation',
  },
  {
    src: '/images/updates/epfo-service-restoration/slide-5.svg',
    alt: 'Practical EPFO checklist showing passbook, claim status, patience and official support',
  },
];

export default function EpfoServicesRestoredJuly2026Page() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: 'EPFO Services Restored After Upgrade: What Members Should Know',
    description:
      'EPFO says member and employer services are live again after a database and software upgrade, with some requests processed gradually during stabilisation.',
    datePublished: '2026-07-22',
    dateModified: '2026-07-22',
    mainEntityOfPage: pageUrl,
    author: { '@type': 'Organization', name: 'RupeeKit', url: SITE_URL },
    publisher: { '@type': 'Organization', name: 'RupeeKit', url: SITE_URL },
    image: [`${SITE_URL}/images/updates/epfo-service-restoration/slide-1.svg`],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Financial Updates', item: `${SITE_URL}/financial-updates` },
      { '@type': 'ListItem', position: 3, name: 'EPFO Services Restored', item: pageUrl },
    ],
  };

  return (
    <main className="mx-auto max-w-5xl space-y-8 px-4 py-8 md:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-medium text-brandMuted">
        <Link href="/">Home</Link><span aria-hidden="true">›</span>
        <Link href="/financial-updates">Financial Updates</Link><span aria-hidden="true">›</span>
        <span>EPFO services restored</span>
      </nav>

      <header className="rounded-3xl bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 p-6 text-white shadow-xl md:p-10">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-emerald-300">Official EPFO service notice · explained simply</p>
        <h1 className="text-3xl font-black leading-tight md:text-5xl">EPFO Services Are Back After an Upgrade: Should You Submit Your Claim Again?</h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-200 md:text-base">
          EPFO says its member and employer services are live again after a major database consolidation and software upgrade. Some claims and requests may still take longer while the upgraded system stabilises.
        </p>
        <p className="mt-4 text-xs text-slate-300">Reviewed 22 July 2026 · Source: Employees’ Provident Fund Organisation, Ministry of Labour & Employment</p>
      </header>

      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6 md:p-8">
        <h2 className="text-xl font-black text-emerald-950">Quick answer</h2>
        <p className="mt-3 leading-relaxed text-emerald-950">
          EPFO’s online services have been restored after a system upgrade. You can use the portal again, but claims and service requests may be processed gradually with extra checks. If you have already submitted a request, avoid sending the same request repeatedly unless EPFO specifically asks you to do so.
        </p>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-2xl font-black text-brandDeepNavy">The story: Amit checked his claim five times</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            Amit, a salaried employee in Pune, submitted an EPF claim and later found the portal difficult to access. He worried that his claim had disappeared and considered submitting it again. The official EPFO notice gives him a calmer answer: services are back, but post-upgrade processing may be slower than usual. Repeating the same request can create more confusion rather than speeding it up.
          </p>
        </div>

        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4" aria-label="EPFO service restoration story slides">
          {slides.map((slide, index) => (
            <figure key={slide.src} className="min-w-[82%] snap-center overflow-hidden rounded-3xl border border-brandBorder bg-white shadow-sm sm:min-w-[58%] lg:min-w-[38%]">
              <Image src={slide.src} alt={slide.alt} width={1080} height={1350} className="h-auto w-full" priority={index === 0} />
              <figcaption className="px-4 py-3 text-xs text-brandMuted">Story slide {index + 1} of {slides.length}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2">
        <article className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm">
          <h2 className="text-xl font-black text-brandDeepNavy">What EPFO officially confirmed</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            EPFO stated that it completed a major database consolidation and software upgrade. Member and employer services were made live in phases. During the initial stabilisation period, claims and service requests may be handled gradually with additional verification and validation checks.
          </p>
        </article>
        <article className="rounded-3xl border border-brandBorder bg-brandBgSoft p-6 shadow-sm">
          <h2 className="text-xl font-black text-brandDeepNavy">What this means in normal language</h2>
          <p className="mt-3 leading-relaxed text-slate-700">
            The portal reopening does not mean every pending claim will finish instantly. EPFO is checking the upgraded system while processing requests, so some members may notice slower status changes or longer waiting times.
          </p>
        </article>
      </section>

      <section className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-brandDeepNavy">Who may be affected?</h2>
        <ul className="mt-4 space-y-3 text-slate-700">
          <li><strong>EPF members:</strong> People checking passbooks, claim status or other online services.</li>
          <li><strong>Employers:</strong> Organisations using the employer interface for EPFO-related work.</li>
          <li><strong>People with pending requests:</strong> Some claims may take longer while the system settles.</li>
          <li><strong>People who already submitted correctly:</strong> They generally should not duplicate the same request merely because the status has not moved quickly.</li>
        </ul>
      </section>

      <section className="rounded-3xl border border-amber-200 bg-amber-50 p-6 md:p-8">
        <h2 className="text-2xl font-black text-amber-950">What should you do now?</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5 text-amber-950">
          <li>Use only the official EPFO member or employer portal.</li>
          <li>Check your existing claim or request status before submitting anything again.</li>
          <li>Avoid repeated login attempts during peak hours if the portal is slow.</li>
          <li>Keep your UAN, acknowledgement details and claim reference safely recorded.</li>
          <li>Use EPFO’s official help channel if the issue continues beyond a reasonable period.</li>
        </ol>
      </section>

      <section className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-2xl font-black text-brandDeepNavy">Official authority and source</h2>
        <p className="mt-3 leading-relaxed text-slate-700">
          Authority: Employees’ Provident Fund Organisation, Ministry of Labour & Employment, Government of India. The official portal notice says services were restored after database consolidation and software upgrades, with phased processing and additional checks during stabilisation.
        </p>
        <a href="https://unifiedportal-emp.epfindia.gov.in/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-brandNavy px-5 py-2.5 text-sm font-bold text-white">
          Read the official EPFO notice ↗
        </a>
      </section>

      <section className="rounded-3xl border border-brandBorder bg-brandBgSoft p-5 text-xs leading-relaxed text-brandMuted">
        <h2 className="font-bold text-brandDeepNavy">Source, methodology and disclaimer</h2>
        <p className="mt-2">
          RupeeKit reviewed the public notice displayed on EPFO’s official portal and converted it into a plain-language educational explanation. This page does not claim that a specific member’s request will be completed by a particular date. RupeeKit is not affiliated with EPFO and does not provide legal, tax, investment or personalised financial advice.
        </p>
      </section>
    </main>
  );
}
