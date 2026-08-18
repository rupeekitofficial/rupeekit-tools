import tools from '../data/tools.json';
import growthTools from '../data/growth-tools.json';
import decisionTools from '../data/decision-tools-2026.json';
import insuranceTools from '../data/insurance-tools-2026.json';
import investingTools from '../data/investing-tools-2026.json';
import lifestageTools from '../data/lifestage-tools-2026.json';
import ctrToolSeoOverrides from '../data/ctr-tool-seo-overrides-2026-08-15.json';
import searchGrowthOverrides from '../data/search-growth-overrides-2026-08-17.json';
import directAnswerOverrides from '../data/direct-answer-overrides-2026-08-17.json';
import queryVariantOverrides from '../data/query-variant-tool-overrides-2026-08-18.json';
import { CONSOLIDATED_TOOL_SLUGS } from './consolidated-routes';

export type ToolInput = { key:string; label:string; unit?:string; default:number; min?:number; max?:number; step?:number; help?:string; };
export type ToolOutput = { key:string; label:string; formula:string; format:'currency'|'number'|'percent'; hidden?:boolean; };
export type ToolFaq = { question:string; answer:string; };
export type ToolContentSection = { heading:string; body:string; bullets?:string[]; };
export type ToolQuickAnswerLink = { label:string; href:string; };
export type ToolQuickAnswer = { title:string; question:string; answer:string; formula?:string; example?:string; note?:string; links?:ToolQuickAnswerLink[]; };
export type ToolOfficialSource = { label:string; href:string; };
export type ToolFactRow = { topic:string; explanation:string; };
export type ToolPreset = { id:string; label:string; description?:string; values:Record<string,number>; };
export type Tool = {
  slug:string; name:string; seoTitle?:string; category:string; status:string; targetKeyword:string; shortDescription:string; metaDescription:string;
  inputs:ToolInput[]; outputs:ToolOutput[]; formulaExplanation:string; example:string; faqs:ToolFaq[]; related:string[];
  howToUse?:string[]; assumptions?:string[]; commonMistakes?:string[]; contentSections?:ToolContentSection[]; quickAnswer?:ToolQuickAnswer;
  lastReviewed?:string; lastReviewedIso?:string; officialSources?:ToolOfficialSource[]; presets?:ToolPreset[];
  calculationVersion?:string; factsCheckedIso?:string; nextReviewTrigger?:string; formulaHold?:boolean; calculationTests?:string[];
  factRows?:ToolFactRow[];
};

type ToolSeoCopyOverride = { title:string; description:string };
type QueryVariantToolOverride = Pick<Tool, 'contentSections' | 'faqs' | 'officialSources'>;
const ctrSeoOverrides = ctrToolSeoOverrides as Record<string, ToolSeoCopyOverride>;
const prioritySearchOverrides = searchGrowthOverrides as Record<string, Partial<Tool>>;
const directAnswers = directAnswerOverrides as Record<string, string>;
const queryVariants = queryVariantOverrides as Record<string, Partial<QueryVariantToolOverride>>;
const sourceTools = [...tools, ...growthTools, ...decisionTools, ...insuranceTools, ...investingTools, ...lifestageTools] as Tool[];

function mergeUniqueSources(base: ToolOfficialSource[] = [], extra: ToolOfficialSource[] = []): ToolOfficialSource[] {
  const byHref = new Map<string, ToolOfficialSource>();
  [...base, ...extra].forEach((source) => byHref.set(source.href, source));
  return [...byHref.values()];
}

export const allTools = sourceTools.map((tool) => {
  const priorityOverride = prioritySearchOverrides[tool.slug];
  const mergedTool = priorityOverride ? { ...tool, ...priorityOverride } : tool;
  const seoOverride = ctrSeoOverrides[tool.slug];
  const directAnswer = directAnswers[tool.slug];
  const queryVariant = queryVariants[tool.slug];
  return {
    ...mergedTool,
    ...(seoOverride ? { seoTitle: seoOverride.title, metaDescription: seoOverride.description } : {}),
    ...(directAnswer ? { shortDescription: directAnswer } : {}),
    ...(queryVariant
      ? {
          contentSections: [...(mergedTool.contentSections ?? []), ...(queryVariant.contentSections ?? [])],
          faqs: [...mergedTool.faqs, ...(queryVariant.faqs ?? [])],
          officialSources: mergeUniqueSources(mergedTool.officialSources, queryVariant.officialSources),
        }
      : {}),
  };
});

export function getLiveTools(): Tool[] { return allTools.filter((tool) => tool.status === 'live' && !CONSOLIDATED_TOOL_SLUGS.has(tool.slug)); }
export function getToolBySlug(slug:string): Tool|undefined { return allTools.find((tool) => tool.slug === slug && tool.status === 'live' && !CONSOLIDATED_TOOL_SLUGS.has(tool.slug)); }
export function getRelatedTools(tool:Tool): Tool[] { const live=getLiveTools(); const bySlug=new Map(live.map((item)=>[item.slug,item])); return tool.related.map((slug)=>bySlug.get(slug)).filter(Boolean) as Tool[]; }
