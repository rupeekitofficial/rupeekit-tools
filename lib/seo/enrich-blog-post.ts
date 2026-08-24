import type { BlogPost, BlogSection } from '@/data/blog-posts';

function firstSentence(text: string) {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  const match = cleaned.match(/[^.!?]+[.!?]?/);
  return match ? match[0].trim() : cleaned;
}

function firstTwoSentences(text: string) {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  const matches = cleaned.match(/[^.!?]+[.!?]+/g);
  if (!matches?.length) return cleaned;
  return matches.slice(0, 2).join(' ').trim();
}

function stripNumberPrefix(title: string) {
  return title.replace(/^\s*\d+[.)-]?\s*/, '').trim();
}

function questionizeHeading(title: string) {
  const clean = stripNumberPrefix(title);
  if (!clean) return title;
  if (clean.endsWith('?')) return clean;

  const lower = clean.toLowerCase();
  if (/^(how|what|why|when|where|who|which|can|could|should|is|are|do|does|did|will|would)\b/i.test(clean)) {
    return `${clean}?`;
  }
  if (/^calculate\b/i.test(clean)) return `How do you ${lower}?`;
  if (/^track\b/i.test(clean)) return `How do you ${lower}?`;
  if (/^choose\b/i.test(clean)) return `How do you ${lower}?`;
  if (/^set\b/i.test(clean)) return `How do you ${lower}?`;
  if (/^identify\b/i.test(clean)) return `How do you ${lower}?`;
  if (/^review\b/i.test(clean)) return `How should you ${lower}?`;
  if (/^compare\b/i.test(clean)) return `How do you ${lower}?`;

  return `What should you know about ${lower}?`;
}

function hasQuestionHeading(sections: BlogSection[]) {
  return sections.some((section) => section.title.trim().endsWith('?'));
}

function enrichSections(sections: BlogSection[]) {
  if (!sections.length || hasQuestionHeading(sections)) return sections;
  return sections.map((section, index) =>
    index === 0 ? { ...section, title: questionizeHeading(section.title) } : section,
  );
}

export function enrichLegacyBlogPost(post: BlogPost): BlogPost {
  const sections = enrichSections(post.sections);
  const quickAnswer = post.quickAnswer ?? {
    title: 'Quick Answer',
    question: post.h1.endsWith('?') ? post.h1 : `What is the key takeaway from ${post.h1}?`,
    answer: firstSentence(post.intro),
    note: 'Educational information only. Verify current rules, rates and eligibility with official sources where applicable.',
  };

  const answerEngineSummary = post.answerEngineSummary ?? firstTwoSentences(post.intro);

  return {
    ...post,
    sections,
    quickAnswer,
    answerEngineSummary,
  };
}
