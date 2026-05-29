import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
const TITLE = 'About RupeeKit | Free India Finance Calculators';
const DESCRIPTION =
  'Learn about RupeeKit, a free India-focused finance calculator website for salary, tax, EMI, savings and personal finance planning.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
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

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black tracking-tight">About</h1>
      <p className="mt-6 leading-8 text-slate-700">
        This website provides free India-focused calculators for salary, tax, loans, savings and personal finance planning. Every tool is designed to be practical, mobile-friendly and easy to understand.
      </p>
      <p className="mt-4 leading-8 text-slate-700">
        The calculators are educational estimates only. Users should verify important financial, tax, employment or investment decisions with official sources or qualified professionals.
      </p>
    </div>
  );
}
