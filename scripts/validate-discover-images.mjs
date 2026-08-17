import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const manifest = [
  ...JSON.parse(fs.readFileSync(path.join(root, 'data', 'discover-images.json'), 'utf8')),
  ...JSON.parse(fs.readFileSync(path.join(root, 'data', 'discover-images-fcra.json'), 'utf8')),
];
const baseTools = JSON.parse(fs.readFileSync(path.join(root, 'data', 'tools.json'), 'utf8'));
const growthTools = JSON.parse(fs.readFileSync(path.join(root, 'data', 'growth-tools.json'), 'utf8'));
const decisionTools = JSON.parse(fs.readFileSync(path.join(root, 'data', 'decision-tools-2026.json'), 'utf8'));
const insuranceTools = JSON.parse(fs.readFileSync(path.join(root, 'data', 'insurance-tools-2026.json'), 'utf8'));
const investingTools = JSON.parse(fs.readFileSync(path.join(root, 'data', 'investing-tools-2026.json'), 'utf8'));
const lifestageTools = JSON.parse(fs.readFileSync(path.join(root, 'data', 'lifestage-tools-2026.json'), 'utf8'));
const tools = [...baseTools, ...growthTools, ...decisionTools, ...insuranceTools, ...investingTools, ...lifestageTools];
const errors = [];
const day7BlogSource = fs.readFileSync(
  path.join(root, 'data', 'day7-comparison-blog-posts.ts'),
  'utf8',
);
const day7ImageSlugs = [
  'epf-vs-nps-vs-ppf-retirement-india',
  'cashback-vs-rewards-credit-cards-india',
  'salary-hike-negotiation-beyond-base-pay-india',
  'robo-advisors-vs-diy-index-investing-india',
  'gold-asset-class-sgb-etf-physical-gold-loan-india-2026',
  'fy-2026-27-money-moves-salaried-indians-mid-year-checklist',
];

const CONSOLIDATED_TOOL_SLUGS = new Set(
  fs
    .readFileSync(path.join(root, 'lib', 'consolidated-routes.ts'), 'utf8')
    .match(/CONSOLIDATED_TOOL_SLUGS = new Set\(\[([\s\S]*?)\]\)/)[1]
    .match(/'[^']+'/g)
    .map((s) => s.slice(1, -1)),
);

const imageSitemapSource = fs.readFileSync(
  path.join(root, 'app', 'image-sitemap.xml', 'route.ts'),
  'utf8',
);
const robotsSource = fs.readFileSync(path.join(root, 'app', 'robots.ts'), 'utf8');

if (!imageSitemapSource.includes('discoverImages')) {
  errors.push('Image sitemap is not generated from the Discover image manifest.');
}
if (!robotsSource.includes('/image-sitemap.xml')) {
  errors.push('robots.ts does not advertise the image sitemap.');
}

if (manifest.length !== 95) {
  errors.push(`Expected 95 Discover images, found ${manifest.length}.`);
}

for (const slug of day7ImageSlugs) {
  const imageSource = `/images/discover/${slug}.webp`;
  if (!manifest.some((image) => image.path === `/blog/${slug}` && image.src === imageSource)) {
    errors.push(`Day 7 blog is missing its Discover manifest entry: ${slug}`);
  }
  if (!day7BlogSource.includes(`heroImage: '${imageSource}'`)) {
    errors.push(`Day 7 blog card is missing its hero image reference: ${slug}`);
  }
}

const paths = new Set();
const sources = new Set();
const reusableSources = new Set([
  '/images/discover/epf-corpus-calculator-india.webp',
]);

for (const image of manifest) {
  if (!image.path?.startsWith('/')) errors.push(`Invalid canonical path: ${image.path}`);
  if (paths.has(image.path)) errors.push(`Duplicate canonical path: ${image.path}`);
  paths.add(image.path);

  if (!image.src?.startsWith('/images/discover/') || !image.src.endsWith('.webp')) {
    errors.push(`Unexpected image source for ${image.path}: ${image.src}`);
  }
  if (sources.has(image.src) && !reusableSources.has(image.src)) {
    errors.push(`Duplicate image source: ${image.src}`);
  }
  sources.add(image.src);

  if (image.width < 1200 || image.height < 675) {
    errors.push(`Image is below large-preview dimensions for ${image.path}: ${image.width}x${image.height}`);
  }
  if (Math.abs(image.width / image.height - 16 / 9) > 0.01) {
    errors.push(`Image is not 16:9 for ${image.path}: ${image.width}x${image.height}`);
  }
  if (!image.alt || image.alt.length < 40 || image.alt.length > 160) {
    errors.push(`Alt text should be 40-160 characters for ${image.path}.`);
  }

  const filePath = path.join(root, 'public', image.src.replace(/^\//, ''));
  if (!fs.existsSync(filePath)) {
    errors.push(`Missing image file: ${image.src}`);
    continue;
  }

  const fileSize = fs.statSync(filePath).size;
  if (fileSize > 350_000) {
    errors.push(`Image exceeds 350 KB budget for ${image.path}: ${fileSize} bytes`);
  }

  const header = fs.readFileSync(filePath, { start: 0, end: 11 });
  if (header.subarray(0, 4).toString('ascii') !== 'RIFF' || header.subarray(8, 12).toString('ascii') !== 'WEBP') {
    errors.push(`Image is not a valid WebP container: ${image.src}`);
  }
}

for (const tool of tools) {
  const isLive = tool.status !== 'draft' && tool.status !== 'hidden' && !CONSOLIDATED_TOOL_SLUGS.has(tool.slug);
  const calculatorPath = `/tools/${tool.slug}`;
  if (isLive && !paths.has(calculatorPath)) {
    errors.push(`Live calculator is missing a Discover image: ${calculatorPath}`);
  }
}

if (errors.length) {
  console.error('Discover image validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Discover image validation passed for ${manifest.length} unique pages.`);
