import { blogPosts as coreBlogPosts } from './blog-posts';
import { extraBlogPosts } from './extra-blog-posts';
import { CONSOLIDATED_BLOG_SLUGS } from '../lib/consolidated-routes';

export type {
  BlogPost,
  BlogSection,
  FAQItem,
  BlogQuickAnswer,
  BlogQuickAnswerLink,
} from './blog-posts';

export const blogPosts = [...extraBlogPosts, ...coreBlogPosts]
  .filter((post) => !CONSOLIDATED_BLOG_SLUGS.has(post.slug));
