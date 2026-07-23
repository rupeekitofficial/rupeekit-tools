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

function latestDate(dates: Date[], fallback = STATIC_LAST_MODIFIED): Date {
  if (dates.length === 0) return fallback;
  return new Date(Math.max(...dates.map((date) => date.getTime())));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
  const liveTools = getLiveTools();
  const indexableFinancialUpdates = financialUpdates.filter((update) => update.status !== 'sample');
  const indexableGovernmentUpdates = governmentSalaryUpdates.filter((update) => update.status !== 'sample');

  const toolDates = liveTools.map((tool) =>
    resolveToolLastModified(tool.lastReviewedIso ?? tool.lastReviewed)
  );
  const guideDates = calculatorGuides.map(
    (guide) => parseIsoDate(guide.lastReviewedIso) ?? STATIC_LAST_MODIFIED
  );
  const blogDates = blogPosts.map(
    (post) =>
      parseIsoDate(post.modifiedDateISO) ??
      parseIsoDate(post.publishedDateISO) ??
      STATIC_LAST_MODIFIED
  );
  const financialUpdateDates = indexableFinancialUpdates.map(
    (update) =>
      parseIsoDate((update as { modifiedDate?: string }).modifiedDate) ??
      parseIsoDate(update.publishedDate) ??
      STATIC_LAST_MODIFIED
  );
  const governmentUpdateDates = indexableGovernmentUpdates.map(
    (update) =>
      parseIsoDate((update as { modifiedDate?: string }).modifiedDate) ??
      parseIsoDate(update.publishedDate) ??
      STATIC_LAST_MODIFIED
  );

  const latestToolDate = latestDate(toolDates);
  const latestGuideDate = latestDate(guideDates);
  const latestBlogDate = latestDate(blogDates);
  const latestFinancialUpdateDate = latestDate(financialUpdateDates);
  const latestGovernmentUpdateDate = latestDate(governmentUpdateDates);
  const latestUpdateDate = latestDate([
    ...financialUpdateDates,
    ...governmentUpdateDates,
  ]);
  const latestSiteDate = latestDate([
    ...toolDates,
    ...guideDates,
    ...blogDates,
    ...financialUpdateDates,
    ...governmentUpdateDates,
  ]);

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
    '/api-docs',
    '/affiliate-disclosure',
    '/money-health-check',
    '/resources/30-day-budget-challenge',
    '/resources/recommended-money-tools',
    '/start-here',
    '/government-salary-updates',
    '/financial-updates',
    '/updates',
  ];

  const staticRouteLastModified = new Map<string, Date>([
    ['', latestSiteDate],
    ['/tools', latestToolDate],
    ['/guides', latestGuideDate],
    ['/blog', latestBlogDate],
    ['/financial-updates', latestFinancialUpdateDate],
    ['/government-salary-updates', latestGovernmentUpdateDate],
    ['/updates', latestUpdateDate],
  ]);

  const hubRoutes = new Set(['/blog', '/tools', '/guides']);
  const lowPriorityRoutes = new Set(['/privacy-policy', '/terms', '/disclaimer', '/affiliate-disclosure']);

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: staticRouteLastModified.get(route) ?? STATIC_LAST_MODIFIED,
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
    ...liveTools.map((tool) => {
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
    ...indexableFinancialUpdates.map((u) => {
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
    ...indexableGovernmentUpdates
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
