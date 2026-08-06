import { blogPosts as coreBlogPosts } from './blog-posts';
import { extraBlogPosts } from './extra-blog-posts';
import { day4ComplianceBlogPosts } from './day4-compliance-blog-posts';
import { CONSOLIDATED_BLOG_SLUGS } from '../lib/consolidated-routes';

export type {
  BlogPost,
  BlogSection,
  FAQItem,
  BlogQuickAnswer,
  BlogQuickAnswerLink,
} from './blog-posts';

export const blogPosts = [
  ...day4ComplianceBlogPosts,
  ...extraBlogPosts,
  ...coreBlogPosts,
].filter((post) => !CONSOLIDATED_BLOG_SLUGS.has(post.slug));
