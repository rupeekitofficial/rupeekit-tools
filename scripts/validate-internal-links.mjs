import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITE_URL = 'https://www.rupeekit.co.in';
const toolFiles = [
  'tools.json',
  'growth-tools.json',
  'decision-tools-2026.json',
  'insurance-tools-2026.json',
  'investing-tools-2026.json',
  'lifestage-tools-2026.json',
];

function read(rel) {
  return fs.readFileSync(path.join(ROOT, rel), 'utf8');
}

function fail(message) {
  console.error(`❌ ${message}`);
  failures += 1;
}

function walk(dir, extensions = new Set(['.ts', '.tsx', '.js', '.mjs'])) {
  const absolute = path.join(ROOT, dir);
  if (!fs.existsSync(absolute)) return [];
  const out = [];
  for (const entry of fs.readdirSync(absolute, { withFileTypes: true })) {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(rel, extensions));
    else if (extensions.has(path.extname(entry.name))) out.push(rel);
  }
  return out;
}

function extractSetMembers(source, constantName) {
  const match = source.match(new RegExp(`export const ${constantName} = new Set\\(\\[([\\s\\S]*?)\\]\\)`));
  if (!match) return new Set();
  return new Set([...match[1].matchAll(/['"]([^'"]+)['"]/g)].map((m) => m[1]));
}

function extractBlogSlugs() {
  const slugs = new Set();
  for (const rel of fs.readdirSync(path.join(ROOT, 'data'))) {
    if (!rel.endsWith('.ts')) continue;
    const source = read(path.join('data', rel));
    if (!source.includes('BlogPost') && !source.includes('relatedCalculators')) continue;
    for (const match of source.matchAll(/(?:"slug"|slug)\s*:\s*['"]([^'"]+)['"]/g)) {
      slugs.add(match[1]);
    }
  }
  return slugs;
}

function addInbound(target, source, kind) {
  if (!inbound.has(target)) inbound.set(target, []);
  inbound.get(target).push({ source, kind });
}

let failures = 0;
const consolidatedSource = read('lib/consolidated-routes.ts');
const consolidatedTools = extractSetMembers(consolidatedSource, 'CONSOLIDATED_TOOL_SLUGS');
const consolidatedBlogs = extractSetMembers(consolidatedSource, 'CONSOLIDATED_BLOG_SLUGS');

const tools = toolFiles.flatMap((fileName) =>
  JSON.parse(read(path.join('data', fileName))).map((tool) => ({ ...tool, _file: fileName }))
);
const liveTools = tools.filter((tool) => tool.status === 'live' && !consolidatedTools.has(tool.slug));
const liveToolBySlug = new Map(liveTools.map((tool) => [tool.slug, tool]));
const blogSlugs = new Set([...extractBlogSlugs()].filter((slug) => !consolidatedBlogs.has(slug)));

const inbound = new Map();

// Hub pages are real crawl paths and prevent strict orphans. We still report
// contextual inbound links separately so a page linked only from a directory is visible.
for (const tool of liveTools) addInbound(`/tools/${tool.slug}`, '/tools', 'hub');
for (const slug of blogSlugs) addInbound(`/blog/${slug}`, '/blog', 'hub');

for (const tool of liveTools) {
  for (const relatedSlug of tool.related || []) {
    if (!liveToolBySlug.has(relatedSlug)) continue;
    addInbound(`/tools/${relatedSlug}`, `/tools/${tool.slug}`, 'related-tool');
  }
}

// Blog relatedCalculators are stored across several TS data modules. They are
// counted as contextual discovery links even when the module is split out.
for (const rel of fs.readdirSync(path.join(ROOT, 'data'))) {
  if (!rel.endsWith('.ts')) continue;
  const source = read(path.join('data', rel));
  for (const arrayMatch of source.matchAll(/relatedCalculators\s*:\s*\[([\s\S]*?)\]/g)) {
    for (const slugMatch of arrayMatch[1].matchAll(/['"]([^'"]+)['"]/g)) {
      const slug = slugMatch[1];
      if (liveToolBySlug.has(slug)) addInbound(`/tools/${slug}`, `data/${rel}`, 'blog-related-calculator');
    }
  }
}

// Count literal in-body links from app/components/data. This intentionally uses
// file paths as the source when a reusable component is shared across routes.
for (const rel of [...walk('app'), ...walk('components'), ...walk('data')]) {
  const source = read(rel);
  for (const match of source.matchAll(/['"]\/(tools|blog)\/([a-z0-9-]+)['"]/g)) {
    const target = `/${match[1]}/${match[2]}`;
    if (target === '/tools/' || target === '/blog/') continue;
    addInbound(target, rel, 'in-body');
  }
}

for (const tool of liveTools) {
  const target = `/tools/${tool.slug}`;
  if ((inbound.get(target) || []).length === 0) fail(`Orphan live tool: ${target}`);
}
for (const slug of blogSlugs) {
  const target = `/blog/${slug}`;
  if ((inbound.get(target) || []).length === 0) fail(`Orphan blog page: ${target}`);
}

const sitemapSource = read('app/sitemap.ts');
for (const required of ['getLiveTools()', 'blogPosts.map', 'indexableFinancialUpdates.map', 'indexableGovernmentUpdates']) {
  if (!sitemapSource.includes(required)) fail(`app/sitemap.ts is missing expected route source: ${required}`);
}
for (const slug of consolidatedTools) {
  if (liveToolBySlug.has(slug)) fail(`Consolidated tool still treated as live: ${slug}`);
}
for (const slug of consolidatedBlogs) {
  if (blogSlugs.has(slug)) fail(`Consolidated blog still treated as live: ${slug}`);
}

const toolRoute = read('app/tools/[slug]/page.tsx');
const blogRoute = read('app/blog/[slug]/page.tsx');
for (const [label, source] of [['tool route', toolRoute], ['blog route', blogRoute]]) {
  if (!source.includes('canonical: pageUrl')) fail(`${label} missing self-canonical metadata`);
  if (!source.includes('index: true') || !source.includes('follow: true')) fail(`${label} missing index/follow robots metadata`);
  if (!source.includes("'max-image-preview': 'large'")) fail(`${label} missing max-image-preview:large`);
}

const taxRoutePath = 'app/tools/income-tax-calculator-old-vs-new-regime-india/page.tsx';
if (fs.existsSync(path.join(ROOT, taxRoutePath))) {
  const taxRoute = read(taxRoutePath);
  if (!taxRoute.includes('canonical:') || !taxRoute.includes('index: true') || !taxRoute.includes("'max-image-preview': 'large'")) {
    fail('Dedicated income-tax calculator route is missing canonical/index/max-image-preview metadata');
  }
}

const redirectsSource = read('next.config.mjs');
const expectedRedirects = [
  ['/blog/home-loan-eligibility-25000-salary-india', '/blog/home-loan-eligibility-by-salary-india'],
  ['/blog/home-loan-eligibility-40000-salary-india', '/blog/home-loan-eligibility-by-salary-india'],
  ['/blog/home-loan-eligibility-45000-salary-india', '/blog/home-loan-eligibility-by-salary-india'],
  ['/tools/net-worth-tracker-calculator-india', '/tools/net-worth-calculator-india'],
];
for (const [source, destination] of expectedRedirects) {
  if (!redirectsSource.includes(`source: '${source}'`) || !redirectsSource.includes(`destination: '${destination}'`)) {
    fail(`Missing direct consolidation redirect: ${source} -> ${destination}`);
  }
}
if (!redirectsSource.includes('statusCode: 301')) fail('Consolidation redirects are not explicitly 301');

const auditRows = liveTools.map((tool) => {
  const refs = inbound.get(`/tools/${tool.slug}`) || [];
  const contextual = refs.filter((ref) => ref.kind !== 'hub');
  return {
    url: `${SITE_URL}/tools/${tool.slug}`,
    inSitemap: true,
    canonical: `${SITE_URL}/tools/${tool.slug}`,
    inboundLinkCount: refs.length,
    contextualInboundLinkCount: contextual.length,
    indexedStatus: 'unknown-not-queried',
  };
});

console.log(`INDEXING_AUDIT_ROWS=${JSON.stringify(auditRows)}`);
console.log(`ℹ️ ${liveTools.length} live tools, ${blogSlugs.size} blog pages, ${auditRows.filter((row) => row.contextualInboundLinkCount === 0).length} tools linked only from hub-level discovery.`);

if (failures > 0) {
  console.error(`\nInternal-link/indexing validation failed with ${failures} error(s).`);
  process.exit(1);
}

console.log('✅ Sitemap sources, canonical/robots metadata, redirects, and zero-orphan crawl paths validated.');
