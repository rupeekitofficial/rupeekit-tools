import './globals.css';
import Link from 'next/link';
import type { Metadata } from 'next';

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Smart India Calculators';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Free India Salary & Finance Tools`,
    template: `%s | ${siteName}`,
  },
  description: 'Free India-focused salary, tax, EMI, SIP, PF, gratuity and personal finance calculators with formulas, examples and FAQs.',
};

const nav = [
  { href: '/', label: 'Tools' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy-policy', label: 'Privacy' },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
              {siteName}
            </Link>
            <nav className="flex flex-wrap items-center gap-3 text-sm font-medium text-slate-600">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full px-3 py-2 hover:bg-slate-100 hover:text-slate-950">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
            <div>
              <p className="text-base font-semibold">{siteName}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Free India-focused calculators for salary, tax and personal finance decisions.
              </p>
            </div>
            <div className="text-sm text-slate-600">
              <p className="font-semibold text-slate-900">Important</p>
              <p className="mt-2 leading-6">Tools are for educational estimates only. Verify tax, salary and investment decisions with official sources or a qualified professional.</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-slate-600">
              <Link href="/terms" className="hover:text-slate-950">Terms</Link>
              <Link href="/disclaimer" className="hover:text-slate-950">Disclaimer</Link>
              <Link href="/privacy-policy" className="hover:text-slate-950">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
