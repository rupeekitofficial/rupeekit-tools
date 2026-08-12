/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/blog/home-loan-eligibility-25000-salary-india',
        destination: '/blog/home-loan-eligibility-by-salary-india',
        statusCode: 301,
      },
      {
        source: '/blog/home-loan-eligibility-40000-salary-india',
        destination: '/blog/home-loan-eligibility-by-salary-india',
        statusCode: 301,
      },
      {
        source: '/blog/home-loan-eligibility-45000-salary-india',
        destination: '/blog/home-loan-eligibility-by-salary-india',
        statusCode: 301,
      },
      {
        source: '/tools/net-worth-tracker-calculator-india',
        destination: '/tools/net-worth-calculator-india',
        statusCode: 301,
      },
      // Slugs removed in 71d098d ("Replace old Financial Updates with EPFO
      // story"). Google still has these indexed and keeps re-crawling them,
      // which shows up as a coverage issue in Search Console.
      ...[
        'rbi-repo-rate-explainer',
        'income-tax-regime-comparison',
        'gst-council-explainer',
        'sebi-mutual-fund-explainer',
        'banking-fd-rate-tracker',
        'personal-finance-epf-explainer',
        'government-salary-da-link',
        'hra-exemption-explainer',
        'nps-tier1-explainer',
        'tds-26as-explainer',
      ].map((slug) => ({
        source: `/financial-updates/${slug}`,
        destination: '/financial-updates',
        statusCode: 301,
      })),
    ];
  },
  // Disable build trace collection — avoids a Next.js 14.2.x ENOENT bug on Windows
  // where _not-found/page.js.nft.json is missing during trace collection.
  // This does not affect dev, runtime, or static export output.
  experimental: {
    outputFileTracingExcludes: {
      '*': [],
    },
  },
  webpack: (config) => {
    config.resolve.fallback = { ...config.resolve.fallback };
    return config;
  },
};

export default nextConfig;
