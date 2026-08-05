import tools from '../data/tools.json';
import growthTools from '../data/growth-tools.json';
import decisionTools from '../data/decision-tools-2026.json';
import insuranceTools from '../data/insurance-tools-2026.json';
import investingTools from '../data/investing-tools-2026.json';

export type ToolInput = {
  key: string;
  label: string;
  unit?: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
};

export type ToolOutput = {
  key: string;
  label: string;
  formula: string;
  format: 'currency' | 'number' | 'percent';
  hidden?: boolean;
};

export type ToolFaq = {
  question: string;
  answer: string;
};

export type ToolContentSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type ToolQuickAnswerLink = {
  label: string;
  href: string;
};

export type ToolQuickAnswer = {
  title: string;
  question: string;
  answer: string;
  formula?: string;
  example?: string;
  note?: string;
  links?: ToolQuickAnswerLink[];
};

export type ToolOfficialSource = {
  label: string;
  href: string;
};

export type ToolPreset = {
  id: string;
  label: string;
  description?: string;
  values: Record<string, number>;
};

export type Tool = {
  slug: string;
  name: string;
  seoTitle?: string;
  category: string;
  status: string;
  targetKeyword: string;
  shortDescription: string;
  metaDescription: string;
  inputs: ToolInput[];
  outputs: ToolOutput[];
  formulaExplanation: string;
  example: string;
  faqs: ToolFaq[];
  related: string[];

  // Optional SEO enrichment fields for Workflow 6
  howToUse?: string[];
  assumptions?: string[];
  commonMistakes?: string[];
  contentSections?: ToolContentSection[];
  quickAnswer?: ToolQuickAnswer;
  lastReviewed?: string;
  lastReviewedIso?: string;
  officialSources?: ToolOfficialSource[];
  presets?: ToolPreset[];
};

export const allTools = [...tools, ...growthTools, ...decisionTools, ...insuranceTools, ...investingTools] as Tool[];

export function getLiveTools(): Tool[] {
  return allTools.filter((tool) => tool.status === 'live');
}

export function getToolBySlug(slug: string): Tool | undefined {
  return allTools.find((tool) => tool.slug === slug && tool.status === 'live');
}

export function getRelatedTools(tool: Tool): Tool[] {
  const live = getLiveTools();
  const bySlug = new Map(live.map((item) => [item.slug, item]));
  return tool.related.map((slug) => bySlug.get(slug)).filter(Boolean) as Tool[];
}
