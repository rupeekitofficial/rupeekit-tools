import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

function readText(...segments) {
  return fs.readFileSync(path.join(root, ...segments), 'utf8');
}

let errors = 0;

function fail(message) {
  errors += 1;
  console.error(`FAIL: ${message}`);
}

function ensure(condition, message) {
  if (!condition) fail(message);
}

const blogCardSource = readText('components', 'blog', 'BlogCard.tsx');
const blogVisualsSource = readText('components', 'blog', 'BlogVisuals.tsx');
const blogGeneratedVisualSource = readText('components', 'blog', 'BlogGeneratedVisual.tsx');
const blogDataSource = readText('data', 'blog-posts.ts');

ensure(
  blogCardSource.includes('BlogGeneratedVisual'),
  'BlogCard must use BlogGeneratedVisual for the fallback image/visual state'
);

ensure(
  !blogCardSource.includes('justify-center text-brandNavy/20 font-black'),
  'BlogCard still contains the old plain RupeeKit placeholder fallback'
);

ensure(
  !blogVisualsSource.includes('dangerouslySetInnerHTML'),
  'BlogVisuals must not inject a large inline CSS block into the rendered HTML'
);

ensure(
  !blogVisualsSource.includes('const cssStyles ='),
  'BlogVisuals must not keep the old inline CSS string block'
);

ensure(
  blogVisualsSource.includes('fallback-finance-card'),
  'BlogVisuals should route unknown visual types to the generated fallback visual'
);

ensure(
  blogGeneratedVisualSource.includes('fallback-finance-card'),
  'BlogGeneratedVisual must support the fallback-finance-card variant'
);

const requiredBlogVisualTypes = [
  ['old-vs-new-tax-regime-which-is-better', 'old-vs-new-tax-regime'],
  ['old-tax-regime-deductions-checklist', 'checklist'],
  ['new-tax-regime-vs-old-regime-for-salaried-employees', 'new-tax-regime-vs-old-regime'],
  ['income-tax-calculation-example-old-vs-new-regime', 'income-tax-calculator'],
  ['how-to-choose-tax-regime-before-itr-filing', 'itr-tax-guide'],
];

for (const [slug, expectedVisualType] of requiredBlogVisualTypes) {
  const slugMarker = `slug: '${slug}'`;
  const startIndex = blogDataSource.indexOf(slugMarker);
  ensure(startIndex !== -1, `Missing blog post entry for ${slug}`);
  if (startIndex === -1) continue;

  const endIndex = blogDataSource.indexOf("\n  },\n  {", startIndex);
  const block = blogDataSource.slice(startIndex, endIndex === -1 ? blogDataSource.length : endIndex);
  ensure(
    block.includes(`visualType: '${expectedVisualType}'`),
    `${slug} should use visualType '${expectedVisualType}'`
  );
  ensure(
    /visualAlt:\s*'[^']{12,}'/.test(block),
    `${slug} should have a descriptive visualAlt`
  );
}

if (errors > 0) {
  process.exitCode = 1;
  console.error(`Blog visual validation failed with ${errors} issue(s).`);
} else {
  console.log('Blog visual validation passed.');
}
