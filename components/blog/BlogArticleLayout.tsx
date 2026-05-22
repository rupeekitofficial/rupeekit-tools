'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import type { BlogPost } from '@/data/blog-posts';
import BlogHero from './BlogHero';
import TableOfContents from './TableOfContents';
import RelatedCalculatorLinks from './RelatedCalculatorLinks';
import FAQSection from './FAQSection';
import FinanceDisclaimer from './FinanceDisclaimer';
import AffiliateDisclosure from './AffiliateDisclosure';
import BookRecommendationCard from './BookRecommendationCard';
import { BlogInlineVisual, BlogSharePreviewCard } from './BlogVisuals';

interface BlogArticleLayoutProps {
  post: BlogPost;
}

export default function BlogArticleLayout({ post }: BlogArticleLayoutProps) {
  // Helper to slugify section titles to match Table of Contents links
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav className="text-xs md:text-sm text-brandMuted mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brandNavy transition font-medium">
          Home
        </Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-brandNavy transition font-medium">
          Blog
        </Link>
        <span>/</span>
        <span className="text-brandText truncate max-w-[200px] md:max-w-none">{post.title}</span>
      </nav>

      {/* Hero Header */}
      <BlogHero
        title={post.h1}
        category={post.category}
        date={post.date}
        readTime={post.readTime}
        description={post.metaDescription}
        visualType={post.visualType}
        visualAlt={post.visualAlt}
      />

      {/* Main Grid Layout */}
      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.42fr]">
        
        {/* Left Column: Article Body */}
        <article className="flex flex-col gap-8">
          
          {/* Amazon affiliate disclosure at top if applicable */}
          {post.amazonDisclosure && <AffiliateDisclosure />}

          <div className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
            {/* Intro */}
            <p className="text-base md:text-lg leading-relaxed text-slate-800 font-medium">
              {post.intro}
            </p>

            {/* Sections */}
            <div className="mt-8 space-y-10">
              {post.sections.map((section, idx) => {
                const sectionId = slugify(section.title);
                return (
                  <Fragment key={section.title}>
                    <section id={sectionId} className="scroll-mt-24 border-t border-brandBorder pt-8 first:border-0 first:pt-0">
                      <h2 className="text-xl md:text-2xl font-black tracking-tight text-brandDeepNavy">
                        {section.title}
                      </h2>
                      
                      {/* Paragraphs */}
                      {section.paragraphs.map((p, pIdx) => (
                        <p key={pIdx} className="mt-4 text-sm md:text-base leading-relaxed text-slate-700">
                          {p}
                        </p>
                      ))}

                      {/* Bullets */}
                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-4 list-disc space-y-2.5 pl-6 text-sm md:text-base text-slate-700">
                          {section.bullets.map((bullet) => (
                            <li key={bullet}>{bullet}</li>
                          ))}
                        </ul>
                      )}

                      {/* Example Calculations / Blocks */}
                      {section.example && (
                        <div className="mt-5 rounded-2xl border border-brandNavy/10 bg-brandNavy/[0.02] p-5">
                          <h4 className="text-sm font-bold text-brandDeepNavy uppercase tracking-wider">
                            💡 Practical Example: {section.example.title}
                          </h4>
                          <p className="mt-2 text-xs md:text-sm leading-relaxed text-slate-700">
                            {section.example.details}
                          </p>
                        </div>
                      )}
                    </section>
                    {idx === 0 && post.visualType && (
                      <BlogInlineVisual
                        type={post.visualType}
                        title={post.visualTitle || ''}
                        subtitle={post.visualSubtitle || ''}
                        alt={post.visualAlt || ''}
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>

            {/* Book lists for the books article */}
            {post.books && post.books.length > 0 && (
              <div className="mt-8 border-t border-brandBorder pt-8 space-y-6">
                <h2 className="text-2xl font-black text-brandDeepNavy">
                  Top Recommended Books
                </h2>
                <div className="grid gap-6 sm:grid-cols-2">
                  {post.books.map((book) => (
                    <BookRecommendationCard key={book.title} book={book} />
                  ))}
                </div>
              </div>
            )}
            
            {/* Soft CTA to use RupeeKit calculators at the end of article */}
            <div className="mt-10 border-t border-brandBorder pt-8">
              <div className="rounded-2xl bg-brandBgSoft border border-brandBorder p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-brandDeepNavy">Estimate Your Own Finances</h4>
                  <p className="text-xs text-brandMuted mt-1">
                    Try our free interactive calculators to plan your savings, loans, and taxes.
                  </p>
                </div>
                <Link
                  href="/#calculators"
                  className="rounded-full bg-brandGrowthGreen px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brandBrightGreen hover:shadow-md transition whitespace-nowrap"
                >
                  Go to Calculators
                </Link>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <FAQSection faqs={post.faqs} />

          {/* Finance educational disclaimer */}
          <FinanceDisclaimer />

        </article>

        {/* Right Column: Sidebar (Sticky on Desktop) */}
        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:self-start">
          <TableOfContents sections={post.sections} />
          <RelatedCalculatorLinks slugs={post.relatedCalculators} />
          {post.visualType && <BlogSharePreviewCard post={post} />}
        </aside>

      </div>
    </div>
  );
}
