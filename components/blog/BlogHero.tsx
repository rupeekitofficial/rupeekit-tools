'use client';

import Image from 'next/image';
import { BlogHeroVisual } from './BlogVisuals';

interface BlogHeroProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
  visualType?: string;
  visualAlt?: string;
  heroImage?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
}

export default function BlogHero({
  title,
  category,
  date,
  readTime,
  description,
  visualType,
  visualAlt,
  heroImage,
  heroImageAlt,
  heroImageWidth,
  heroImageHeight,
}: BlogHeroProps) {
  const hasVisual = !!heroImage || !!visualType;

  return (
    <section className="relative rounded-[2rem] bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 p-8 text-white shadow-xl md:p-12 overflow-hidden">
      {/* Decorative Blur Accents */}
      <div
        aria-hidden="true"
        className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none"
      />
      
      <div className={`relative z-10 grid gap-8 items-center ${hasVisual ? 'grid-cols-1 lg:grid-cols-[1.5fr_1fr]' : 'grid-cols-1 max-w-4xl'}`}>
        <div>
          <span className="inline-block rounded-full bg-brandGrowthGreen/15 border border-brandGrowthGreen/30 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandBrightGreen">
            {category}
          </span>
          <h1 className="mt-5 text-3xl font-black tracking-tight leading-tight md:text-5xl text-white">
            {title}
          </h1>
          <p className="mt-4 text-sm md:text-base text-slate-200 leading-relaxed max-w-3xl">
            {description}
          </p>
          <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-300">
            <span>Published: {date}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            <span>{readTime}</span>
          </div>
        </div>

        {hasVisual && (heroImage || visualType) && (
          <div className="w-full flex justify-center">
            {heroImage ? (
              <div className="relative w-full max-w-sm md:max-w-md mx-auto aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-slate-700/60 blog-hero-float">
                <Image
                  src={heroImage}
                  alt={heroImageAlt || visualAlt || title}
                  width={heroImageWidth || 1600}
                  height={heroImageHeight || 900}
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <BlogHeroVisual
                type={visualType!}
                alt={visualAlt || title}
                title={title}
                subtitle={description}
                category={category}
              />
            )}
          </div>
        )}
      </div>
    </section>
  );
}

