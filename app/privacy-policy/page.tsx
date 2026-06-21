import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
const TITLE = 'Privacy Policy | RupeeKit';
const DESCRIPTION =
  "Read RupeeKit's privacy policy for calculators, analytics, cookies and user data handling.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `${SITE_URL}/privacy-policy`,
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

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-black tracking-tight">Privacy Policy</h1>
      <p className="mt-6 leading-8 text-slate-700">
        RupeeKit calculators are designed for educational estimation. Calculator values are processed in the browser
        and are not saved by default.
      </p>
      <p className="mt-4 leading-8 text-slate-700">
        If RupeeKit later adds optional email, download-history, or save features, only data that you explicitly submit
        for those features will be stored.
      </p>
      <h2 className="mt-8 text-2xl font-bold">Cookies and analytics</h2>
      <p className="mt-4 leading-8 text-slate-700">
        Analytics and advertising tools may use cookies or similar technologies. You can control cookies through your browser settings.
      </p>
      <h2 className="mt-8 text-2xl font-bold">Sensitive data handling</h2>
      <p className="mt-4 leading-8 text-slate-700">
        RupeeKit calculators do not collect PAN, Aadhaar, bank account details, card data, or sensitive financial
        documents through the calculator workflow. We avoid collecting sensitive financial or identity data unless a
        future feature clearly requires it and requests explicit user consent.
      </p>
      <h2 className="mt-8 text-2xl font-bold">Contact</h2>
      <p className="mt-4 leading-8 text-slate-700">For privacy questions, contact: rupeekitofficial@gmail.com</p>
    </div>
  );
}
