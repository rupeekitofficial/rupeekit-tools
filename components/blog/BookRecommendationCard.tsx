'use client';

interface BookItem {
  title: string;
  bestFor: string;
  learn: string;
  whyHelps: string;
}

interface BookRecommendationCardProps {
  book: BookItem;
}

export default function BookRecommendationCard({ book }: BookRecommendationCardProps) {
  return (
    <div className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm hover:shadow-md transition duration-300">
      {/* Book Title Header */}
      <h3 className="text-xl font-bold tracking-tight text-brandDeepNavy border-b border-brandBorder pb-3">
        📖 {book.title}
      </h3>

      {/* Details Grid */}
      <div className="mt-4 space-y-3.5 text-sm">
        <div>
          <span className="font-bold text-brandDeepNavy text-xs uppercase tracking-wide block">
            Best For
          </span>
          <p className="mt-1 text-brandMuted leading-relaxed">{book.bestFor}</p>
        </div>

        <div>
          <span className="font-bold text-brandDeepNavy text-xs uppercase tracking-wide block">
            What You&apos;ll Learn
          </span>
          <p className="mt-1 text-brandMuted leading-relaxed">{book.learn}</p>
        </div>

        <div>
          <span className="font-bold text-brandDeepNavy text-xs uppercase tracking-wide block">
            Why It Helps
          </span>
          <p className="mt-1 text-brandMuted leading-relaxed">{book.whyHelps}</p>
        </div>
      </div>

      {/* Check on Amazon Button */}
      <div className="mt-6 pt-4 border-t border-brandBorder">
        <a
          href="#"
          className="inline-block w-full text-center rounded-full bg-brandGrowthGreen py-2.5 text-sm font-bold text-white shadow-sm hover:bg-brandBrightGreen hover:shadow-md transition duration-200"
        >
          Check on Amazon
        </a>
      </div>
    </div>
  );
}
