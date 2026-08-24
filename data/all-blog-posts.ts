import { blogPosts as coreBlogPosts } from './blog-posts';
import { extraBlogPosts } from './extra-blog-posts';
import { day4ComplianceBlogPosts } from './day4-compliance-blog-posts';
import { day7ComparisonBlogPosts } from './day7-comparison-blog-posts';
import queryVariantBlogOverrides from './query-variant-blog-overrides-2026-08-18.json';
import issue76BlogOverrides from './issue-76-blog-overrides-2026-08-23.json';
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
type Issue76BlogOverride = Pick<BlogPost, 'relatedCalculators'>;
const queryVariantOverrides = queryVariantBlogOverrides as Record<string, Partial<BlogQueryVariantOverride>>;
const issue76Overrides = issue76BlogOverrides as Record<string, Partial<Issue76BlogOverride>>;

export const blogPosts = [
  ...day7ComparisonBlogPosts,
  ...day4ComplianceBlogPosts,
  ...extraBlogPosts,
  ...coreBlogPosts,
]
  .filter((post) => !CONSOLIDATED_BLOG_SLUGS.has(post.slug))
  .map((post) => {
    const queryOverride = queryVariantOverrides[post.slug];
    const issue76Override = issue76Overrides[post.slug];
    if (!queryOverride && !issue76Override) return post;
    return {
      ...post,
      sections: [...post.sections, ...(queryOverride?.sections ?? [])],
      faqs: [...post.faqs, ...(queryOverride?.faqs ?? [])],
      relatedCalculators: [
        ...new Set([
          ...post.relatedCalculators,
          ...(issue76Override?.relatedCalculators ?? []),
        ]),
      ],
    };
  });
