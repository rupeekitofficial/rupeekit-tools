'use client';

import { useState, useMemo } from 'react';
import { BlogPost } from '@/data/blog-posts';
import BlogCard from './BlogCard';

interface BlogListingClientProps {
  posts: BlogPost[];
}

const CATEGORY_ALL = 'All';

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);

  // Derive unique categories from actual post data, sorted alphabetically
  const categories = useMemo(() => {
    const cats = Array.from(new Set(posts.map((p) => p.category))).sort();
    return [CATEGORY_ALL, ...cats];
  }, [posts]);

  // Filter posts by category and search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((p) => {
      const matchesCat = activeCategory === CATEGORY_ALL || p.category === activeCategory;
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.intro.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [posts, search, activeCategory]);

  // The first post in the original array is the featured/newest
  const featuredSlug = posts[0]?.slug;

  return (
    <div>
      {/* Search + Category Filters */}
      <div className="mt-10 space-y-5">
        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <svg className="h-4 w-4 text-brandMuted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search finance guides…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-brandBorder bg-white py-3 pl-10 pr-4 text-sm text-brandDeepNavy placeholder-brandMuted shadow-sm outline-none transition focus:border-brandNavy focus:ring-1 focus:ring-brandNavy"
            aria-label="Search finance guides"
          />
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by category">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold transition ${
                activeCategory === cat
                  ? 'border-brandNavy bg-brandNavy text-white shadow-sm'
                  : 'border-brandBorder bg-white text-brandMuted hover:border-brandNavy/40 hover:text-brandNavy'
              }`}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      {(search || activeCategory !== CATEGORY_ALL) && (
        <p className="mt-6 text-center text-xs text-brandMuted">
          {filtered.length === 0
            ? 'No articles found. Try a different search or category.'
            : `Showing ${filtered.length} article${filtered.length === 1 ? '' : 's'}`}
        </p>
      )}

      {/* Article Grid */}
      <section className="mt-10" aria-label="Article list">
        {filtered.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post) => (
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
                heroImage={post.heroImage}
                heroImageAlt={post.heroImageAlt}
                isFeatured={post.slug === featuredSlug && activeCategory === CATEGORY_ALL && !search}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-brandBorder bg-white p-10 text-center shadow-sm">
            <p className="text-brandDeepNavy font-bold">No results found</p>
            <p className="mt-2 text-sm text-brandMuted">Try clearing your search or selecting &ldquo;All&rdquo;.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory(CATEGORY_ALL); }}
              className="mt-6 rounded-full bg-brandNavy px-6 py-2.5 text-sm font-bold text-white hover:bg-brandDeepNavy transition"
            >
              Show all articles
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
