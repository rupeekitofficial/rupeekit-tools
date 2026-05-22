import type { Metadata } from 'next';
import { blogPosts } from '@/data/blog-posts';
import BlogCard from '@/components/blog/BlogCard';

export const metadata: Metadata = {
  title: 'Personal Finance Blog & Money Guides',
  description: 'Explore free, practical personal finance articles, budgeting advice, investment strategies, and checklist guides for Indian salaried employees.',
};

export default function BlogListingPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Blog Listing Header */}
      <section className="text-center max-w-3xl mx-auto">
        <span className="rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandNavy">
          RupeeKit Library
        </span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-brandDeepNavy md:text-5xl">
          Personal Finance Guides & Resources
        </h1>
        <p className="mt-4 text-brandMuted text-lg leading-relaxed">
          Master budgeting, savings, investing, and tax planning in India with simple, educational, and formula-backed explanations.
        </p>
      </section>

      {/* Grid of Articles */}
      <section className="mt-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              category={post.category}
              date={post.date}
              readTime={post.readTime}
              intro={post.intro}
              visualType={post.visualType}
              visualAlt={post.visualAlt}
            />
          ))}
        </div>
      </section>

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
            Go to Free Calculators
          </a>
        </div>
      </section>
    </div>
  );
}
