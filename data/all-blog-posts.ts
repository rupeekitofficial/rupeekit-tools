import { blogPosts as coreBlogPosts } from './blog-posts';
import { extraBlogPosts } from './extra-blog-posts';
import { day4ComplianceBlogPosts } from './day4-compliance-blog-posts';
import { day7ComparisonBlogPosts } from './day7-comparison-blog-posts';
import queryVariantBlogOverrides from './query-variant-blog-overrides-2026-08-18.json';
import { CONSOLIDATED_BLOG_SLUGS } from '../lib/consolidated-routes';
import type { BlogPost } from './blog-posts';

export type {
  BlogPost,
  BlogSection,
  FAQItem,
  BlogQuickAnswer,
  BlogQuickAnswerLink,
} from './blog-posts';

type BlogQueryVariantOverride = Pick<BlogPost, 'sections' | 'faqs'>;
const queryVariantOverrides = queryVariantBlogOverrides as Record<string, Partial<BlogQueryVariantOverride>>;

export const blogPosts = [
  ...day7ComparisonBlogPosts,
  ...day4ComplianceBlogPosts,
  ...extraBlogPosts,
  ...coreBlogPosts,
]
  .filter((post) => !CONSOLIDATED_BLOG_SLUGS.has(post.slug))
  .map((post) => {
    const override = queryVariantOverrides[post.slug];
    if (!override) return post;
    return {
      ...post,
      sections: [...post.sections, ...(override.sections ?? [])],
      faqs: [...post.faqs, ...(override.faqs ?? [])],
    };
  });
