import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "RupeeKit";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.rupeekit.co.in";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "rupeekitofficial@gmail.com";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} - Free India Salary & Finance Calculators`,
    template: `%s | ${siteName}`,
  },
  description:
    "RupeeKit offers free India-focused salary, EMI, SIP, GST, and FD calculators with simple explanations and examples.",
  keywords: [
    "RupeeKit",
    "salary calculator India",
    "in hand salary calculator",
    "EMI calculator India",
    "SIP calculator India",
    "GST calculator India",
    "FD calculator India",
    "finance calculators India",
  ],
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${siteName} - Free India Salary & Finance Calculators`,
    description:
      "Free India-focused salary, EMI, SIP, GST, and FD calculators with simple explanations.",
    url: siteUrl,
    siteName,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} - Free India Salary & Finance Calculators`,
    description:
      "Free India-focused salary, EMI, SIP, GST, and FD calculators.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <body>
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){window.dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        ) : null}

        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <a href="/" className="text-xl font-bold text-slate-900">
              {siteName}
            </a>

            <nav className="flex gap-4 text-sm text-slate-700">
              <a href="/" className="hover:text-slate-950">
                Home
              </a>
              <a href="/about" className="hover:text-slate-950">
                About
              </a>
              <a href="/contact" className="hover:text-slate-950">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="mt-12 border-t bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-600">
            <div className="mb-4 font-semibold text-slate-900">{siteName}</div>

            <p className="mb-4 max-w-3xl">
              Free India-focused calculators for salary, EMI, SIP, GST, FD, and
              personal finance planning. Results are for educational and
              informational purposes only.
            </p>

            <div className="mb-4 flex flex-wrap gap-4">
              <a href="/about" className="hover:text-slate-950">
                About
              </a>
              <a href="/contact" className="hover:text-slate-950">
                Contact
              </a>
              <a href="/privacy-policy" className="hover:text-slate-950">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-slate-950">
                Terms
              </a>
              <a href="/disclaimer" className="hover:text-slate-950">
                Disclaimer
              </a>
            </div>

            <p className="mb-2">Contact: {contactEmail}</p>
            <p>© {new Date().getFullYear()} {siteName}. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
