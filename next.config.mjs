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
