import type { MetadataRoute } from 'next';
import { getLiveTools } from '@/lib/tools';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';
  const staticRoutes = ['', '/about', '/contact', '/privacy-policy', '/terms', '/disclaimer'];
  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: route === '' ? 'daily' as const : 'monthly' as const,
      priority: route === '' ? 1 : 0.5,
    })),
    ...getLiveTools().map((tool) => ({
      url: `${baseUrl}/tools/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
