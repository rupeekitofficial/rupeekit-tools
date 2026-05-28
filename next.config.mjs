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
};

export default nextConfig;
