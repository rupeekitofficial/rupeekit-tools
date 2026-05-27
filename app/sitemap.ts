import type { MetadataRoute } from 'next';
import { getLiveTools } from '@/lib/tools';
import { blogPosts } from '@/data/blog-posts';
import { financialUpdates } from '@/data/financial-updates';
import { governmentSalaryUpdates } from '@/data/government-salary-updates';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
  const staticRoutes = [
    '',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/blog',
    '/resources',
    '/affiliate-disclosure',
    '/money-health-check',
    '/resources/30-day-budget-challenge',
    '/start-here',
    '/government-salary-updates',
    '/financial-updates',
  ];
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
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...financialUpdates.map((u) => ({
      url: `${baseUrl}/financial-updates/${u.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...governmentSalaryUpdates.map((u) => ({
      url: `${baseUrl}/government-salary-updates/${u.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}

