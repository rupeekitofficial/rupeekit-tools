import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const PRIORITY_TOOL_SLUGS = [
  'emergency-fund-calculator-india',
  'personal-loan-emi-calculator-india',
  'hra-exemption-calculator-india',
  'sip-calculator-india',
  'fd-calculator-india',
  'income-tax-calculator-old-vs-new-regime-india',
];

const PRIORITY_BLOG_SLUGS = [
  'how-much-emergency-fund',
  'itr-2-ay-2026-27-filing-guide',
  'income-tax-calculator-2026-calculator-guide',
  'old-vs-new-tax-regime-which-is-better',
  'old-tax-regime-deductions-checklist',
  'new-tax-regime-vs-old-regime-for-salaried-employees',
  'income-tax-calculation-example-old-vs-new-regime',
  'how-to-choose-tax-regime-before-itr-filing',
];

const NEW_TAX_BLOG_SLUGS = new Set([
  'old-vs-new-tax-regime-which-is-better',
  'old-tax-regime-deductions-checklist',
  'new-tax-regime-vs-old-regime-for-salaried-employees',
  'income-tax-calculation-example-old-vs-new-regime',
  'how-to-choose-tax-regime-before-itr-filing',
]);

let errors = 0;

function fail(message) {
  errors += 1;
  console.error(`FAIL: ${message}`);
}

function ensure(condition, message) {
  if (!condition) fail(message);
}

function readText(...segments) {
  return fs.readFileSync(path.join(root, ...segments), 'utf8');
}

function readJson(...segments) {
  return JSON.parse(readText(...segments));
}

const tools = readJson('data', 'tools.json');
const toolBySlug = new Map(tools.map((tool) => [tool.slug, tool]));

const toolPageSource = readText('app', 'tools', '[slug]', 'page.tsx');
const homePageSource = readText('app', 'page.tsx');
const resourcesPageSource = readText('app', 'resources', 'page.tsx');
const blogPageSource = readText('app', 'blog', '[slug]', 'page.tsx');
const blogLayoutSource = readText('components', 'blog', 'BlogArticleLayout.tsx');
const blogFaqSectionSource = readText('components', 'blog', 'FAQSection.tsx');
const factsTableSource = readText('components', 'seo', 'FactsTable.tsx');
const sipCalculatorSource = readText('components', 'sip', 'SipPlannerCalculator.tsx');
const dedicatedIncomeTaxToolSource = readText('app', 'tools', 'income-tax-calculator-old-vs-new-regime-india', 'page.tsx');
const sitemapSource = readText('app', 'sitemap.ts');
const blogDataSource = readText('data', 'blog-posts.ts');
const llmsTxtPath = path.join(root, 'public', 'llms.txt');
const llmsTxtSource = fs.existsSync(llmsTxtPath) ? fs.readFileSync(llmsTxtPath, 'utf8') : '';

function getBlogBlock(slug) {
  const marker = `slug: '${slug}'`;
  const start = blogDataSource.indexOf(marker);
  if (start === -1) return '';
  const nextStart = blogDataSource.indexOf(`\n  {\n    slug: '`, start + marker.length);
  return blogDataSource.slice(start, nextStart === -1 ? blogDataSource.length : nextStart);
}

for (const slug of PRIORITY_TOOL_SLUGS) {
  const tool = toolBySlug.get(slug);
  ensure(Boolean(tool), `Missing priority tool record: ${slug}`);
  if (!tool) continue;

  ensure(tool.status === 'live', `Priority tool is not live: ${slug}`);
  ensure(Boolean(tool.quickAnswer), `Priority tool missing quickAnswer: ${slug}`);
  ensure(
    typeof tool.quickAnswer?.question === 'string' && tool.quickAnswer.question.trim().length > 0,
    `quickAnswer.question missing for ${slug}`
  );
  ensure(
    typeof tool.quickAnswer?.answer === 'string' && tool.quickAnswer.answer.trim().length > 0,
    `quickAnswer.answer missing for ${slug}`
  );

  const minimumFaqCount = 8;
  ensure(
    Array.isArray(tool.faqs) && tool.faqs.length >= minimumFaqCount,
    `Priority tool must have at least ${minimumFaqCount} FAQs: ${slug}`
  );
  ensure(typeof tool.lastReviewed === 'string' && tool.lastReviewed.trim().length > 0, `Priority tool missing lastReviewed: ${slug}`);

  const hasSourceMethodology = Array.isArray(tool.contentSections)
    && tool.contentSections.some((section) => /source and methodology/i.test(section.heading));

  if (slug === 'emergency-fund-calculator-india') {
    ensure(hasSourceMethodology, 'Emergency fund tool missing Source and Methodology section in data/tools.json');
    const sourceText = (tool.contentSections || [])
      .filter((section) => /source and methodology/i.test(section.heading))
      .map((section) => section.body)
      .join(' ')
      .toLowerCase();
    ensure(sourceText.includes('monthly essential expenses'), 'Emergency methodology text should mention monthly essential expenses');
    ensure(sourceText.includes('emi commitments'), 'Emergency methodology text should mention EMI commitments');
    ensure(sourceText.includes('current emergency savings'), 'Emergency methodology text should mention current emergency savings');
    ensure(sourceText.includes('target months'), 'Emergency methodology text should mention target months');
    ensure(sourceText.includes('monthly saving capacity'), 'Emergency methodology text should mention monthly saving capacity');
  }

  if (slug === 'personal-loan-emi-calculator-india') {
    ensure(
      Array.isArray(tool.faqs) && tool.faqs.length >= 10,
      'Personal loan tool must have at least 10 visible FAQs'
    );
    ensure(
      typeof tool.quickAnswer?.question === 'string'
        && /how is personal loan emi calculated\?/i.test(tool.quickAnswer.question),
      'Personal loan quickAnswer question is missing or misaligned'
    );
    ensure(
      toolPageSource.includes('PERSONAL_LOAN_ANSWER_ENGINE_SUMMARY')
        && toolPageSource.includes('id="answer-engine-summary"'),
      'Personal loan page is missing the dedicated Answer Engine Summary block'
    );
    ensure(
      toolPageSource.includes('Personal Loan EMI Calculator Facts')
        && toolPageSource.includes('id="personal-loan-calculator-facts"'),
      'Personal loan page is missing the Personal Loan EMI Calculator Facts table'
    );
    ensure(
      toolPageSource.includes('id="source-and-methodology"') && toolPageSource.includes('isPersonalLoanPage'),
      'Personal loan page is missing source-and-methodology rendering block'
    );
    ensure(
      toolPageSource.includes('standard reducing-balance EMI formula')
        && toolPageSource.includes('processing fee impact')
        && toolPageSource.includes('EMI burden'),
      'Personal loan methodology block is missing required formula/fee/burden wording'
    );
    ensure(
      /RupeeKit is not a lender/i.test(toolPageSource)
        && /live bank interest rates/i.test(toolPageSource),
      'Personal loan page is missing required educational disclaimer wording'
    );
    ensure(
      toolPageSource.includes("'@type': 'WebApplication'")
        && toolPageSource.includes("'@type': 'BreadcrumbList'"),
      'Personal loan page schema blocks for WebApplication or Breadcrumb are missing'
    );
  }

  if (slug === 'hra-exemption-calculator-india') {
    ensure(
      toolPageSource.includes('id="source-and-methodology"') && toolPageSource.includes('isHraPage'),
      'HRA page is missing source-and-methodology rendering block'
    );
    ensure(
      toolPageSource.includes('actual HRA')
        && toolPageSource.includes('rent paid minus 10% of salary')
        && toolPageSource.includes('city-based salary cap'),
      'HRA methodology block is missing required comparison wording'
    );
  }

  if (slug === 'sip-calculator-india') {
    ensure(hasSourceMethodology, 'SIP tool missing Source and Methodology section in data/tools.json');
    const sourceText = (tool.contentSections || [])
      .filter((section) => /source and methodology/i.test(section.heading))
      .map((section) => section.body)
      .join(' ')
      .toLowerCase();
    ensure(sourceText.includes('monthly sip amount'), 'SIP methodology should mention monthly SIP amount');
    ensure(sourceText.includes('expected annual return'), 'SIP methodology should mention expected annual return');
    ensure(sourceText.includes('investment duration'), 'SIP methodology should mention investment duration');
    ensure(sourceText.includes('monthly compounding-style projection'), 'SIP methodology should mention monthly compounding-style projection');
    ensure(
      toolPageSource.includes('SipEducationalContent') && toolPageSource.includes('isSipPage'),
      'SIP page rendering block is missing in app/tools/[slug]/page.tsx'
    );
    ensure(
      toolPageSource.includes('Answer Engine Summary')
        && toolPageSource.includes('id="answer-engine-summary"'),
      'SIP page is missing the Answer Engine Summary block'
    );
    ensure(
      toolPageSource.includes('What happens if you miss a SIP?')
        && toolPageSource.includes('Can you pause and restart SIP later?')
        && toolPageSource.includes('What is step-up SIP?')
        && toolPageSource.includes('How much SIP is needed for a goal?')
        && toolPageSource.includes('How does inflation affect SIP planning?')
        && toolPageSource.includes('Can EMI amount be redirected into SIP after loan closure?')
        && toolPageSource.includes('Is SIP return guaranteed?'),
      'SIP page is missing one or more citation-ready answer sections'
    );
    ensure(
      toolPageSource.includes('SIP Calculator Facts')
        && toolPageSource.includes('id="sip-calculator-facts"')
        && factsTableSource.includes('Topic')
        && factsTableSource.includes('RupeeKit explanation'),
      'SIP page is missing the SIP Calculator Facts table'
    );
    ensure(
      /optional step-up,\s*missed sip,\s*pause,\s*goal,\s*inflation,\s*and emi redirect assumptions/i.test(toolPageSource)
        && /does not recommend mutual funds/i.test(toolPageSource)
        && /does not fetch live fund returns/i.test(toolPageSource)
        && /does not guarantee outcomes/i.test(toolPageSource),
      'SIP source and methodology wording is missing required educational disclosures'
    );
    ensure(
      toolPageSource.includes('id="source-and-methodology"'),
      'SIP source-and-methodology section id is missing'
    );
    ensure(
      sipCalculatorSource.includes('Educational estimate only'),
      'SIP calculator should include a visible educational disclaimer'
    );
  }
}

ensure(fs.existsSync(llmsTxtPath), 'public/llms.txt file is missing');
ensure(llmsTxtSource.includes('# RupeeKit'), 'public/llms.txt should include the RupeeKit heading');
ensure(
  llmsTxtSource.includes('https://www.rupeekit.co.in/tools/sip-calculator-india'),
  'public/llms.txt should include the SIP calculator URL'
);

ensure(
  toolPageSource.includes('@type\': \'FAQPage\'') && toolPageSource.includes('tool.faqs.map((faq) =>'),
  'Tool FAQPage schema should be generated from visible tool.faqs'
);
ensure(
  toolPageSource.includes('tool.faqs.length > 0'),
  'Tool FAQPage schema should only render when visible FAQs exist'
);
ensure(
  toolPageSource.includes('buildFallbackQuickAnswer') && toolPageSource.includes('effectiveQuickAnswer'),
  'Tool page should provide quick answer fallback support for all calculators'
);
ensure(
  toolPageSource.includes('id="answer-engine-summary"'),
  'Tool page should include a visible Answer Engine Summary block'
);
ensure(
  toolPageSource.includes('id="calculator-facts"'),
  'Tool page should include a visible Calculator Facts section for non-SIP calculators'
);
ensure(
  toolPageSource.includes('showGenericSourceMethodology') && toolPageSource.includes('id="source-and-methodology"'),
  'Tool page should include generic source-and-methodology fallback handling'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('QuickAnswerBox')
    && dedicatedIncomeTaxToolSource.includes('id="answer-engine-summary"')
    && dedicatedIncomeTaxToolSource.includes('id="calculator-facts"')
    && dedicatedIncomeTaxToolSource.includes('id="source-and-methodology"'),
  'Dedicated income-tax calculator page should include quick answer, answer summary, facts, and methodology sections'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('const faqSchema =')
    && dedicatedIncomeTaxToolSource.includes('faqs.length > 0'),
  'Dedicated income-tax FAQPage schema must be conditional on visible FAQs'
);
ensure(
  [...dedicatedIncomeTaxToolSource.matchAll(/question:\s*'[^']+'/g)].length >= 8,
  'Dedicated income-tax calculator should include at least 8 visible FAQs'
);
ensure(
  dedicatedIncomeTaxToolSource.includes("question: 'Which is better: old or new tax regime?'"),
  'Dedicated income-tax quick answer question is missing or misaligned'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('How does the old vs new tax regime calculator work?')
    && dedicatedIncomeTaxToolSource.includes('How to compare old and new tax regime in India?')
    && dedicatedIncomeTaxToolSource.includes('Income tax calculation old vs new regime: example')
    && dedicatedIncomeTaxToolSource.includes('Which tax regime is better for salaried employees?')
    && dedicatedIncomeTaxToolSource.includes('What deductions can change the old vs new tax regime result?')
    && dedicatedIncomeTaxToolSource.includes('Should you choose old regime or new regime while filing ITR?')
    && dedicatedIncomeTaxToolSource.includes('Common mistakes while comparing old and new tax regime'),
  'Dedicated income-tax page is missing one or more required query-style answer sections'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('Old vs New Tax Regime Comparison')
    && dedicatedIncomeTaxToolSource.includes('Best suited when')
    && dedicatedIncomeTaxToolSource.includes('Final decision'),
  'Dedicated income-tax comparison table is missing or incomplete'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('Source and methodology')
    && dedicatedIncomeTaxToolSource.includes('Last reviewed:')
    && dedicatedIncomeTaxToolSource.includes('RupeeKit is not a tax advisor'),
  'Dedicated income-tax methodology block is missing required trust wording'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('/tools/hra-exemption-calculator-india')
    && dedicatedIncomeTaxToolSource.includes('/blog/itr-2-ay-2026-27-filing-guide')
    && dedicatedIncomeTaxToolSource.includes('/resources'),
  'Dedicated income-tax page should include internal links to related RupeeKit tax pages'
);
ensure(
  dedicatedIncomeTaxToolSource.includes('canonical: PAGE_URL'),
  'Dedicated income-tax page canonical is missing or not self-referencing'
);

const disallowedSchemaTokens = [
  /@type['"]?\s*:\s*['"]Product['"]/,
  /@type['"]?\s*:\s*['"]Review['"]/,
  /@type['"]?\s*:\s*['"]AggregateRating['"]/,
  /ratingValue/i,
];

for (const pattern of disallowedSchemaTokens) {
  const combinedSources = `${toolPageSource}\n${blogPageSource}\n${blogLayoutSource}\n${dedicatedIncomeTaxToolSource}`;
  ensure(!pattern.test(combinedSources), `Disallowed schema token found in page schema sources: ${pattern}`);
}

const staticRouteBlock = sitemapSource.match(/const staticRoutes = \[([\s\S]*?)\];/);
const staticRoutes = new Set(
  (staticRouteBlock?.[1]?.match(/'([^']*)'/g) || []).map((entry) => entry.slice(1, -1))
);

const liveToolPaths = tools
  .filter((tool) => tool.status === 'live')
  .map((tool) => `/tools/${tool.slug}`);

const allBlogSlugs = [...new Set(
  [...blogDataSource.matchAll(/slug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1])
)];
const publishedBlogSlugs = new Set();
const draftBlogSlugs = new Set();

for (const slug of allBlogSlugs) {
  const block = getBlogBlock(slug);
  if (/status:\s*'draft'/.test(block)) {
    draftBlogSlugs.add(slug);
  } else {
    publishedBlogSlugs.add(slug);
  }
}

const blogPaths = [...publishedBlogSlugs].map((slug) => `/blog/${slug}`);

const sitemapPaths = new Set([...staticRoutes, ...liveToolPaths, ...blogPaths]);

const priorityPaths = [
  '/tools/emergency-fund-calculator-india',
  '/tools/personal-loan-emi-calculator-india',
  '/tools/hra-exemption-calculator-india',
  '/tools/sip-calculator-india',
  '/tools/fd-calculator-india',
  '/tools/income-tax-calculator-old-vs-new-regime-india',
  '/blog/how-much-emergency-fund',
  '/blog/itr-2-ay-2026-27-filing-guide',
  '/blog/income-tax-calculator-2026-calculator-guide',
  '/blog/old-vs-new-tax-regime-which-is-better',
  '/blog/old-tax-regime-deductions-checklist',
  '/blog/new-tax-regime-vs-old-regime-for-salaried-employees',
  '/blog/income-tax-calculation-example-old-vs-new-regime',
  '/blog/how-to-choose-tax-regime-before-itr-filing',
  '/resources',
];

for (const pagePath of priorityPaths) {
  ensure(sitemapPaths.has(pagePath), `Priority path missing from sitemap derivation: ${pagePath}`);
}
ensure(staticRoutes.has(''), 'Homepage root route is missing from sitemap staticRoutes');
ensure(
  blogPageSource.includes('publishedBlogPosts.map((post) =>')
    && blogPageSource.includes('publishedBlogPosts.find((p) => p.slug === params.slug)'),
  'Blog route should only generate and resolve published blog posts'
);
ensure(
  sitemapSource.includes('publishedBlogPosts.map((post) =>'),
  'Sitemap should only include published blog posts'
);
ensure(
  blogLayoutSource.includes('Last reviewed:'),
  'Blog layout should show a visible Last reviewed label'
);
ensure(
  blogLayoutSource.includes('RupeeKit does not provide personalized tax, legal, investment, or financial advice.'),
  'Blog layout should include the required tax-safe disclaimer wording'
);

for (const slug of PRIORITY_BLOG_SLUGS) {
  ensure(publishedBlogSlugs.has(slug), `Priority published blog slug missing from data/blog-posts.ts: ${slug}`);

  const block = getBlogBlock(slug);
  ensure(block.length > 0, `Unable to read blog block from data/blog-posts.ts for: ${slug}`);
  ensure(/quickAnswer:\s*\{/.test(block), `Priority blog missing quickAnswer config: ${slug}`);
  ensure(/question:\s*'[^']+/.test(block), `Priority blog quickAnswer.question missing: ${slug}`);
  ensure(/answer:\s*'[^']+/.test(block), `Priority blog quickAnswer.answer missing: ${slug}`);
  ensure(/answerEngineSummary:\s*'[^']+/.test(block), `Priority blog missing answerEngineSummary: ${slug}`);
  ensure(/reviewedDateISO:\s*'[^']+/.test(block), `Priority blog missing reviewedDateISO: ${slug}`);
  ensure(
    [...block.matchAll(/question:\s*'[^']+'/g)].length >= 8,
    `Priority blog must have at least 8 FAQs: ${slug}`
  );

  if (NEW_TAX_BLOG_SLUGS.has(slug)) {
    ensure(
      block.includes('/tools/income-tax-calculator-old-vs-new-regime-india'),
      `Priority tax blog missing internal calculator link: ${slug}`
    );
    ensure(
      /title:\s*'Source and methodology'/.test(block),
      `Priority tax blog missing Source and methodology section: ${slug}`
    );
    ensure(
      block.includes('official income-tax guidance, employer payroll, Form 16, AIS, Form 26AS, and a qualified tax professional'),
      `Priority tax blog missing safe disclaimer wording in content block: ${slug}`
    );
  }
}

for (const slug of draftBlogSlugs) {
  ensure(!sitemapPaths.has(`/blog/${slug}`), `Draft-only blog should not be present in sitemap derivation: ${slug}`);
}

ensure(
  blogLayoutSource.includes('QuickAnswerBox') && blogLayoutSource.includes('post.quickAnswer'),
  'Blog quick answer rendering is missing in BlogArticleLayout'
);
ensure(
  blogLayoutSource.includes('AnswerEngineSummary') && blogLayoutSource.includes('answerEngineSummary'),
  'Blog answer engine summary rendering is missing in BlogArticleLayout'
);
ensure(
  blogLayoutSource.includes('Last updated:') && blogLayoutSource.includes('Educational information only.'),
  'Blog layout should show last updated and educational note near the top'
);
const blogQuickAnswerIndex = blogLayoutSource.indexOf('post.quickAnswer');
const blogAnswerSummaryIndex = blogLayoutSource.indexOf('<AnswerEngineSummary');
const blogSectionsIndex = blogLayoutSource.indexOf('/* Sections */');
ensure(
  blogQuickAnswerIndex !== -1
    && blogAnswerSummaryIndex !== -1
    && blogSectionsIndex !== -1
    && blogQuickAnswerIndex < blogAnswerSummaryIndex
    && blogAnswerSummaryIndex < blogSectionsIndex,
  'Blog quick answer should render before long-form sections'
);

ensure(
  blogPageSource.includes("'@type': 'Article'"),
  'Blog page is missing Article schema'
);
ensure(
  blogPageSource.includes("'@type': 'BreadcrumbList'"),
  'Blog page is missing Breadcrumb schema'
);

ensure(
  blogPageSource.includes("const faqSchema = post.faqs && post.faqs.length > 0 ?"),
  'FAQPage schema must be conditional on visible FAQs'
);
ensure(
  blogLayoutSource.includes('<FAQSection faqs={post.faqs} />'),
  'Visible FAQ section binding is missing from blog layout'
);
ensure(
  blogFaqSectionSource.includes('if (!faqs || faqs.length === 0) return null;'),
  'FAQSection visibility guard is missing for empty FAQ arrays'
);

ensure(homePageSource.includes('canonical: SITE_URL'), 'Homepage canonical is missing or not self-canonical');
ensure(
  resourcesPageSource.includes('canonical: `${SITE_URL}/resources`'),
  'Resources page canonical is missing or not self-canonical'
);
ensure(
  toolPageSource.includes('canonical: pageUrl') && toolPageSource.includes('const pageUrl = `${SITE_URL}/tools/${tool.slug}`;'),
  'Tool page canonical is missing or not self-canonical'
);
ensure(
  blogPageSource.includes('canonical: pageUrl') && blogPageSource.includes('const pageUrl = `${siteUrl}/blog/${post.slug}`;'),
  'Blog page canonical is missing or not self-canonical'
);

if (errors > 0) {
  console.error(`\nAI SEO readiness validation failed with ${errors} issue(s).`);
  process.exit(1);
}

console.log('PASS: AI SEO readiness validation passed.');
