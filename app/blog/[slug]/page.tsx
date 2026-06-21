import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { publishedBlogPosts } from '@/data/blog-posts';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import { buildPrimarySocialImage, INDEXABLE_ROBOTS, SITE_NAME, SITE_URL } from '@/lib/seo';

export function generateStaticParams() {
  return publishedBlogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = publishedBlogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const description = post.metaDescription;
  const ogImage = buildPrimarySocialImage({
    kind: 'blog-article',
    title,
    summary: description,
    category: post.category,
    alt: post.heroImageAlt,
    heroImage: post.heroImage,
    heroImageAlt: post.heroImageAlt,
    heroImageWidth: post.heroImageWidth,
    heroImageHeight: post.heroImageHeight,
  });

  return {
    title,
    description,
    alternates: {
      canonical: pageUrl,
    },
    robots: INDEXABLE_ROBOTS,
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: SITE_NAME,
      type: 'article',
      locale: 'en_IN',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = publishedBlogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  const pageUrl = `${SITE_URL}/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const ogImage = buildPrimarySocialImage({
    kind: 'blog-article',
    title,
    summary: post.metaDescription,
    category: post.category,
    alt: post.heroImageAlt,
    heroImage: post.heroImage,
    heroImageAlt: post.heroImageAlt,
    heroImageWidth: post.heroImageWidth,
    heroImageHeight: post.heroImageHeight,
  });

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: post.metaDescription,
    image: [ogImage.url],
    datePublished: post.publishedDateISO || undefined,
    dateModified: post.modifiedDateISO || undefined,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl }
    ]
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <BlogArticleLayout post={post} />
    </>
  );
}
