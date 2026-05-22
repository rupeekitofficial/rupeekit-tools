'use client';

interface BlogHeroProps {
  title: string;
  category: string;
  date: string;
  readTime: string;
  description: string;
}

export default function BlogHero({ title, category, date, readTime, description }: BlogHeroProps) {
  return (
    <section className="relative rounded-[2rem] bg-gradient-to-br from-brandDeepNavy via-brandNavy to-slate-900 p-8 text-white shadow-xl md:p-12 overflow-hidden">
      {/* Decorative Blur Accents */}
      <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-brandGrowthGreen/20 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 max-w-4xl">
        <span className="inline-block rounded-full bg-brandGrowthGreen/15 border border-brandGrowthGreen/30 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-brandBrightGreen">
          {category}
        </span>
        <h1 className="mt-5 text-3xl font-black tracking-tight leading-tight md:text-5xl text-white">
          {title}
        </h1>
        <p className="mt-4 text-base md:text-lg text-slate-200 leading-relaxed max-w-3xl">
          {description}
        </p>
        <div className="mt-6 flex items-center gap-4 text-xs font-medium text-slate-300">
          <span>Published: {date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span>{readTime}</span>
        </div>
      </div>
    </section>
  );
}
