import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const toolFiles = [
  'data/tools.json','data/growth-tools.json','data/decision-tools-2026.json','data/insurance-tools-2026.json','data/investing-tools-2026.json','data/lifestage-tools-2026.json',
];
const errors=[];
const readText=(p)=>fs.readFile(path.join(ROOT,p),'utf8');
const readJson=async(p)=>JSON.parse(await readText(p));
const assert=(c,m)=>{if(!c)errors.push(m)};
const consolidatedSource=await readText('lib/consolidated-routes.ts');
const section=consolidatedSource.match(/CONSOLIDATED_TOOL_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/)?.[1]??'';
const consolidated=new Set([...section.matchAll(/['"]([^'"]+)['"]/g)].map(m=>m[1]));
let count=0;
for(const file of toolFiles){const tools=await readJson(file);const live=tools.filter(t=>t.status==='live'&&!consolidated.has(t.slug));assert(live.length>0,`${file} has no live analytics-covered tools`);for(const t of live){assert(t.slug&&t.category,`${file} has invalid analytics source data`);count++;}}
const [calculator,boundary,link,analytics,toolPage]=await Promise.all([
readText('components/Calculator.tsx'),readText('components/CalculatorAnalyticsBoundary.tsx'),readText('components/AnalyticsLink.tsx'),readText('lib/analytics.ts'),readText('app/tools/[slug]/page.tsx')]);
assert(toolPage.includes('<Calculator tool={tool}'),'Dynamic tool route must render through Calculator');
assert(calculator.includes('<CalculatorAnalyticsBoundary'),'Calculator must use CalculatorAnalyticsBoundary');
assert(boundary.includes("trackAnalyticsEvent('calculator_used'")&&boundary.includes("trackAnalyticsEvent('result_viewed'"),'Boundary must emit calculator events');
assert(link.includes("trackAnalyticsEvent('guide_click'")&&link.includes("trackAnalyticsEvent('tool_cta_click'"),'AnalyticsLink must emit click events');
assert(analytics.includes('tool_slug: string')&&analytics.includes('tool_category: string'),'Analytics base must require slug/category');
if(errors.length){console.error(errors.join('\n'));process.exit(1)}
console.log(`Analytics coverage validation passed for ${count} live tool slugs.`);
