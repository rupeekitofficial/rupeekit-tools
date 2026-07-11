import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.rupeekit.co.in";

  const aiCrawlerUserAgents = [
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
  ];

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      ...aiCrawlerUserAgents.map((userAgent) => ({
        userAgent,
        allow: "/",
      })),
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
