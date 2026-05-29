import type { Metadata } from "next";

import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "RupeeKit";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.rupeekit.co.in";
const contactEmail =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL || "rupeekitofficial@gmail.com";
const gaId = process.env.NEXT_PUBLIC_GA_ID;

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/rupeekitofficial/",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61589666252483",
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/rupeekitofficial/",
  },
  {
    name: "X",
    href: "https://x.com/rupeekit",
  },
];

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
  icons: {
    icon: "/brand/rupeekit_icon_from_social_logo_transparent_square.png",
    apple: "/brand/rupeekit_icon_from_social_logo_transparent_square.png",
  },
  robots: {
    "max-image-preview": "large",
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
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    email: contactEmail,
    sameAs: socialLinks.map((link) => link.href),
  };

  return (
    <html lang="en-IN">
      <body className="bg-brandBgSoft text-brandText min-h-screen flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

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

        <SiteHeader />

        <main className="flex-grow">{children}</main>

        <SiteFooter />

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
