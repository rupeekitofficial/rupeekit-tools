'use client';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm md:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-brandDeepNavy">
        Frequently Asked Questions
      </h2>
      <div className="mt-6 grid gap-4">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            className="group rounded-2xl border border-brandBorder bg-brandBgSoft p-5 [&_summary::-webkit-details-marker]:hidden"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-1.5 font-bold text-brandDeepNavy outline-none transition group-open:text-brandNavy">
              <span>{faq.question}</span>
              <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                <svg
                  className="h-5 w-5 text-brandMuted"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-brandMuted border-t border-brandBorder pt-3">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
