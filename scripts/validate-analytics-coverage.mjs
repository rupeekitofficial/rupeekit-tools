import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const toolFiles = [
  'data/tools.json',
  'data/growth-tools.json',
  'data/decision-tools-2026.json',
  'data/insurance-tools-2026.json',
  'data/investing-tools-2026.json',
  'data/lifestage-tools-2026.json',
];

const errors = [];

async function readText(relativePath) {
  return fs.readFile(path.join(ROOT, relativePath), 'utf8');
}

async function readJson(relativePath) {
  return JSON.parse(await readText(relativePath));
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

function extractConsolidatedToolSlugs(source) {
  const section = source.match(/CONSOLIDATED_TOOL_SLUGS\s*=\s*new Set\(\[([\s\S]*?)\]\)/)?.[1] ?? '';
  return new Set([...section.matchAll(/['"]([^'"]+)['"]/g)].map((match) => match[1]));
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await walk(full));
    else files.push(full);
  }
  return files;
}

const [
  calculatorSource,
  boundarySource,
  analyticsLinkSource,
  analyticsSource,
  toolPageSource,
  consolidatedSource,
] = await Promise.all([
  readText('components/Calculator.tsx'),
  readText('components/CalculatorAnalyticsBoundary.tsx'),
  readText('components/AnalyticsLink.tsx'),
  readText('lib/analytics.ts'),
  readText('app/tools/[slug]/page.tsx'),
  readText('lib/consolidated-routes.ts'),
]);

const consolidatedToolSlugs = extractConsolidatedToolSlugs(consolidatedSource);
const liveTools = [];
const slugs = new Set();

for (const toolFile of toolFiles) {
  const tools = await readJson(toolFile);
  const liveInFile = tools.filter(
    (tool) => tool.status === 'live' && !consolidatedToolSlugs.has(tool.slug)
  );

  assert(liveInFile.length > 0, `${toolFile} has no live analytics-covered tools`);

  for (const tool of liveInFile) {
    assert(typeof tool.slug === 'string' && tool.slug.length > 0, `${toolFile} has a live tool without a slug`);
    assert(typeof tool.category === 'string' && tool.category.length > 0, `${tool.slug} is missing tool_category source data`);
    assert(!slugs.has(tool.slug), `Duplicate live tool slug prevents deterministic analytics coverage: ${tool.slug}`);
    slugs.add(tool.slug);
    liveTools.push({ slug: tool.slug, category: tool.category, source: toolFile });
  }

  console.log(`Analytics coverage: ${toolFile} -> ${liveInFile.length} live tools`);
}

assert(
  toolPageSource.includes('<Calculator tool={tool}'),
  'Dynamic tool route must render every live tool through components/Calculator.tsx'
);
assert(
  calculatorSource.includes('<CalculatorAnalyticsBoundary') && calculatorSource.includes('{calculator}'),
  'Calculator must wrap standard and bespoke renderers in CalculatorAnalyticsBoundary'
);
assert(
  boundarySource.includes("trackAnalyticsEvent('calculator_used', parameters)") &&
    boundarySource.includes("trackAnalyticsEvent('result_viewed', parameters)"),
  'CalculatorAnalyticsBoundary must emit calculator_used and result_viewed'
);
assert(
  analyticsLinkSource.includes("trackAnalyticsEvent('guide_click'") &&
    analyticsLinkSource.includes("trackAnalyticsEvent('tool_cta_click'"),
  'AnalyticsLink must emit guide_click and tool_cta_click'
);
assert(
  analyticsSource.includes('tool_slug: string') && analyticsSource.includes('tool_category: string'),
  'Analytics event base must require tool_slug and tool_category'
);

const sourceRoots = ['app', 'components', 'lib'];
for (const sourceRoot of sourceRoots) {
  const files = await walk(path.join(ROOT, sourceRoot));
  for (const file of files.filter((file) => /\.(ts|tsx)$/.test(file))) {
    const relative = path.relative(ROOT, file).replaceAll(path.sep, '/');
    if (relative === 'app/layout.tsx' || relative === 'lib/analytics.ts') continue;
    const source = await fs.readFile(file, 'utf8');
    if (/\b(?:window\.)?gtag\s*\(/.test(source)) {
      errors.push(`Raw gtag() call found outside analytics helper: ${relative}`);
    }
  }
}

if (errors.length) {
  console.error('\nAnalytics coverage validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`\nAnalytics coverage validation passed for ${liveTools.length} live tool slugs.`);
console.log('Reachable event path: app/tools/[slug] -> Calculator -> CalculatorAnalyticsBoundary');
console.log('Required events: calculator_used, result_viewed, guide_click, tool_cta_click');
console.log('Required segmentation params: tool_slug, tool_category');
