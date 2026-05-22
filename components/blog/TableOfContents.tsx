'use client';

interface TableOfContentsProps {
  sections: { title: string }[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  return (
    <div className="rounded-3xl border border-brandBorder bg-white p-6 shadow-sm">
      <h3 className="text-base font-bold text-brandDeepNavy uppercase tracking-wider">
        Table of Contents
      </h3>
      <nav className="mt-4">
        <ul className="space-y-2.5 text-sm font-medium text-brandMuted">
          {sections.map((section) => {
            const anchor = slugify(section.title);
            return (
              <li key={section.title} className="leading-snug">
                <a
                  href={`#${anchor}`}
                  className="transition hover:text-brandNavy hover:underline"
                >
                  {section.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
