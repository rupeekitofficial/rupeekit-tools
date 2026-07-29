/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
  async redirects() {
    // Slugs removed in 71d098d ("Replace old Financial Updates with EPFO
    // story"). Google still has these indexed and keeps re-crawling them,
    // which shows up as "Not found (404)" in Search Console coverage.
    const removedFinancialUpdateSlugs = [
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
    ];
    return removedFinancialUpdateSlugs.map((slug) => ({
      source: `/financial-updates/${slug}`,
      destination: '/financial-updates',
      permanent: true,
    }));
  },
};

export default nextConfig;
