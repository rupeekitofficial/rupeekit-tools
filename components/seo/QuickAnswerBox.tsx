import Link from 'next/link';

export type QuickAnswerLink = {
  label: string;
  href: string;
};

type QuickAnswerBoxProps = {
  title?: string;
  question: string;
  answer: string;
  formula?: string;
  example?: string;
  note?: string;
  links?: QuickAnswerLink[];
};

function toSectionId(title: string) {
  return `quick-answer-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')}`;
}

export default function QuickAnswerBox({
  title = 'Quick Answer',
  question,
  answer,
  formula,
  example,
  note,
  links = [],
}: QuickAnswerBoxProps) {
  const sectionId = toSectionId(title);

  return (
    <section
      aria-labelledby={sectionId}
      className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 shadow-sm md:p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h2 id={sectionId} className="text-lg font-bold text-slate-950">
          {title}
        </h2>
        <span className="rounded-full bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-sky-700">
          Quick Answer
        </span>
      </div>

      <p className="mt-3 text-sm leading-7 text-slate-700">
        <span className="font-semibold text-slate-900">{question}</span>{' '}
        {answer}
      </p>

      {(formula || example) ? (
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {formula ? (
            <div className="rounded-xl border border-sky-100 bg-white p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Formula</p>
              <p className="mt-1 text-sm font-medium text-slate-900">{formula}</p>
            </div>
          ) : null}
          {example ? (
            <div className="rounded-xl border border-sky-100 bg-white p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">Example</p>
              <p className="mt-1 text-sm text-slate-700">{example}</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {note ? (
        <p className="mt-3 rounded-xl border border-slate-200 bg-white p-3 text-xs leading-6 text-slate-700">
          {note}
        </p>
      ) : null}

      {links.length ? (
        <nav aria-label="Quick answer related links" className="mt-3">
          <ul className="flex flex-wrap gap-2">
            {links.map((link) => (
              <li key={`${link.href}-${link.label}`}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full border border-sky-200 bg-white px-3 py-1 text-xs font-semibold text-sky-700 hover:bg-sky-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </section>
  );
}
