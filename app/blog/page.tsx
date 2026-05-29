import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import BlogListingClient from '@/components/blog/BlogListingClient';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';

export const metadata: Metadata = {
  title: { absolute: 'Personal Finance Blog & Money Guides | RupeeKit' },
  description: 'Explore free, practical personal finance articles, budgeting advice, investment strategies, and checklist guides for Indian salaried employees.',
  alternates: { canonical: `${SITE_URL}/blog` },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
  },
  openGraph: {
    title: 'Personal Finance Blog & Money Guides | RupeeKit',
    description: 'Explore free, practical personal finance articles for Indian salaried employees.',
    url: `${SITE_URL}/blog`,
    siteName: 'RupeeKit',
    type: 'website',
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Personal Finance Blog & Money Guides | RupeeKit',
    description: 'Explore free, practical personal finance articles for Indian salaried employees.',
  },
};

export default function BlogListingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Blog Listing Header — server-rendered for SEO */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandNavy">
          RupeeKit Library
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-brandDeepNavy md:text-5xl">
          Personal Finance Guides &amp; Resources
        </h1>
        <p className="mt-4 text-brandMuted text-lg leading-relaxed">
          Master budgeting, savings, investing, and tax planning in India with simple, educational, and formula-backed explanations.
        </p>
      </section>

      {/* Client component handles search, filter, featured badge */}
      <BlogListingClient posts={blogPosts} />

      {/* Bottom Educational Banner */}
      <section className="mt-16 rounded-[2rem] border border-brandBorder bg-white p-8 text-center shadow-sm max-w-4xl mx-auto">
        <h2 className="text-xl font-bold text-brandDeepNavy">Need Interactive Estimations?</h2>
        <p className="mt-2 text-sm text-brandMuted max-w-xl mx-auto">
          Our articles explain the rules, but you can compute exact outcomes for your income, EMIs, mutual funds, or tax deductions instantly.
        </p>
        <div className="mt-6">
          <a
            href="/#calculators"
            className="rounded-full bg-brandNavy px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-brandDeepNavy hover:shadow-md transition"
          >
            Explore All Calculators
          </a>
        </div>
      </section>
    </div>
  );
}
