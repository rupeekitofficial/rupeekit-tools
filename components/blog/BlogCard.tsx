'use client';

import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  intro: string;
}

export default function BlogCard({ slug, title, category, date, readTime, intro }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col justify-between rounded-3xl border border-brandBorder bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md hover:border-brandNavy/35"
    >
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="inline-block rounded-full bg-brandNavy/10 border border-brandNavy/20 px-3 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brandNavy">
            {category}
          </span>
          <span className="text-[11px] text-brandMuted">{readTime}</span>
        </div>
        <h3 className="mt-4 text-xl font-bold tracking-tight text-brandDeepNavy group-hover:text-brandNavy transition">
          {title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-brandMuted line-clamp-3">
          {intro}
        </p>
      </div>
      <div className="mt-6 pt-4 border-t border-brandBorder flex items-center justify-between text-xs">
        <span className="text-brandMuted">{date}</span>
        <span className="font-bold text-brandGrowthGreen group-hover:text-brandBrightGreen transition">
          Read Article →
        </span>
      </div>
    </Link>
  );
}
