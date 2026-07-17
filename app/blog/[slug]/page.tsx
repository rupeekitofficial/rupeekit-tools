import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog-posts';
import { getDiscoverImage } from '@/data/discover-images';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const title = post.seoTitle || post.title;
  const description = post.metaDescription;
  const discoverImage = getDiscoverImage(`/blog/${post.slug}`);
  const heroImage = post.heroImage || discoverImage?.src;
  const heroImageAlt = post.heroImageAlt || discoverImage?.alt || title;
  const heroImageWidth = post.heroImageWidth || discoverImage?.width || 1600;
  const heroImageHeight = post.heroImageHeight || discoverImage?.height || 900;
  const imageUrl = heroImage ? `${siteUrl}${heroImage}` : undefined;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: pageUrl,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: 'RupeeKit',
      type: 'article',
      locale: 'en_IN',
      ...(imageUrl && {
        images: [
          {
            url: imageUrl,
            width: heroImageWidth,
            height: heroImageHeight,
            alt: heroImageAlt,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(imageUrl && {
        images: [imageUrl],
      }),
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';
  const pageUrl = `${siteUrl}/blog/${post.slug}`;
  const discoverImage = getDiscoverImage(`/blog/${post.slug}`);
  const heroImage = post.heroImage || discoverImage?.src;
  const imageUrl = heroImage ? `${siteUrl}${heroImage}` : undefined;
  const postWithHero = heroImage
    ? {
        ...post,
        heroImage,
        heroImageAlt: post.heroImageAlt || discoverImage?.alt || post.title,
        heroImageWidth: post.heroImageWidth || discoverImage?.width || 1600,
        heroImageHeight: post.heroImageHeight || discoverImage?.height || 900,
      }
    : post;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.seoTitle || post.title,
    description: post.metaDescription,
    image: imageUrl ? [imageUrl] : undefined,
    mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
    datePublished: post.publishedDateISO || undefined,
    dateModified: post.modifiedDateISO || post.publishedDateISO || undefined,
    inLanguage: 'en-IN',
    author: {
      '@type': 'Person',
      name: 'RupeeKit Editorial Team',
      jobTitle: 'Personal Finance Research',
      worksFor: { '@id': `${siteUrl}/#organization` },
    },
    publisher: { '@id': `${siteUrl}/#organization` },
    isPartOf: { '@id': `${siteUrl}/#website` },
    ...(post.officialSources?.length
      ? { citation: post.officialSources.map((source) => source.href) }
      : {}),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
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
      <BlogArticleLayout post={postWithHero} />
    </>
  );
}
