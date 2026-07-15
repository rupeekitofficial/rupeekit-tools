import type { MetadataRoute } from 'next';
import { getLiveTools } from '@/lib/tools';
import { blogPosts } from '@/data/blog-posts';
import { financialUpdates } from '@/data/financial-updates';
import { governmentSalaryUpdates } from '@/data/government-salary-updates';
import { calculatorGuides } from '@/data/calculator-guides';

const STATIC_LAST_MODIFIED = new Date('2026-05-29');

function parseIsoDate(value?: string): Date | null {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function resolveToolLastModified(lastReviewed?: string): Date {
  if (!lastReviewed) return STATIC_LAST_MODIFIED;
  const trimmed = lastReviewed.trim();
  if (/^[A-Za-z]+\s+\d{4}$/.test(trimmed)) {
    return STATIC_LAST_MODIFIED;
  }
  return parseIsoDate(trimmed) ?? STATIC_LAST_MODIFIED;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
  const staticRoutes = [
    '',
    '/tools',
    '/about',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/blog',
    '/guides',
    '/resources',
    '/affiliate-disclosure',
    '/money-health-check',
    '/resources/30-day-budget-challenge',
    '/resources/recommended-money-tools',
    '/start-here',
    '/government-salary-updates',
    '/financial-updates',
    '/updates',
  ];

  const hubRoutes = new Set(['/blog', '/tools', '/guides']);
  const lowPriorityRoutes = new Set(['/privacy-policy', '/terms', '/disclaimer', '/affiliate-disclosure']);

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: route === '' ? new Date() : STATIC_LAST_MODIFIED,
      changeFrequency: (
        route === '' ? 'daily' :
        hubRoutes.has(route) ? 'weekly' :
        'monthly'
      ) as 'daily' | 'weekly' | 'monthly' | 'yearly',
      priority:
        route === '' ? 1 :
        hubRoutes.has(route) ? 0.8 :
        lowPriorityRoutes.has(route) ? 0.3 :
        0.5,
    })),
    ...getLiveTools().map((tool) => {
      const lastModified = resolveToolLastModified(tool.lastReviewedIso ?? tool.lastReviewed);
      return {
        url: `${baseUrl}/tools/${tool.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    }),
    ...calculatorGuides.map((guide) => ({
      url: `${baseUrl}/guides/${guide.slug}`,
      lastModified: parseIsoDate(guide.lastReviewedIso) ?? STATIC_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    ...blogPosts.map((post) => {
      const lastModified =
        parseIsoDate(post.modifiedDateISO) ??
        parseIsoDate(post.publishedDateISO) ??
        STATIC_LAST_MODIFIED;
      return {
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    }),
    ...financialUpdates.map((u) => {
      const lastModified =
        parseIsoDate((u as { modifiedDate?: string }).modifiedDate) ??
        parseIsoDate(u.publishedDate) ??
        STATIC_LAST_MODIFIED;
      return {
        url: `${baseUrl}/financial-updates/${u.slug}`,
        lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      };
    }),
    ...governmentSalaryUpdates
      .filter((u) => u.status !== 'sample')
      .map((u) => {
        const lastModified =
          parseIsoDate((u as { modifiedDate?: string }).modifiedDate) ??
          parseIsoDate(u.publishedDate) ??
          STATIC_LAST_MODIFIED;
        return {
          url: `${baseUrl}/government-salary-updates/${u.slug}`,
          lastModified,
          changeFrequency: 'monthly' as const,
          priority: 0.6,
        };
      }),
  ];
}
