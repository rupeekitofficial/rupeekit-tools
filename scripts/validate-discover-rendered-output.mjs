import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const siteUrl = 'https://www.rupeekit.co.in';
const manifest = JSON.parse(
  fs.readFileSync(path.join(root, 'data', 'discover-images.json'), 'utf8'),
);
const errors = [];

for (const image of manifest) {
  const htmlPath = path.join(root, '.next', 'server', 'app', `${image.path.replace(/^\//, '')}.html`);
  if (!fs.existsSync(htmlPath)) {
    errors.push(`Missing prerendered HTML for ${image.path}`);
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const imageUrl = `${siteUrl}${image.src}`;

  if (!html.includes(`<meta property="og:image" content="${imageUrl}"`)) {
    errors.push(`Missing Open Graph image for ${image.path}`);
  }
  if (!html.includes(`<meta name="twitter:image" content="${imageUrl}"`)) {
    errors.push(`Missing Twitter image for ${image.path}`);
  }
  if (!html.includes(`alt="${image.alt}"`)) {
    errors.push(`Missing visible hero image or expected alt text for ${image.path}`);
  }
  if ((html.match(new RegExp(imageUrl.replaceAll('.', '\\.'), 'g')) ?? []).length < 3) {
    errors.push(`Expected metadata and schema references to ${image.src} for ${image.path}`);
  }
}

const imageSitemapPath = path.join(root, '.next', 'server', 'app', 'image-sitemap.xml.body');
const robotsPath = path.join(root, '.next', 'server', 'app', 'robots.txt.body');

if (!fs.existsSync(imageSitemapPath)) {
  errors.push('Missing rendered image-sitemap.xml output.');
} else {
  const xml = fs.readFileSync(imageSitemapPath, 'utf8');
  const imageEntryCount = (xml.match(/<image:image>/g) ?? []).length;

  if (imageEntryCount < manifest.length) {
    errors.push(`Expected at least ${manifest.length} image sitemap entries, found ${imageEntryCount}.`);
  }

  for (const image of manifest) {
    const pageUrl = `${siteUrl}${image.path}`;
    const imageUrl = `${siteUrl}${image.src}`;
    if (!xml.includes(`<loc>${pageUrl}</loc>`)) {
      errors.push(`Image sitemap is missing the page URL for ${image.path}.`);
    }
    if (!xml.includes(`<image:loc>${imageUrl}</image:loc>`)) {
      errors.push(`Image sitemap is missing the image URL for ${image.path}.`);
    }
  }

  if (xml.includes('<image:caption>')) {
    errors.push('Image sitemap uses the deprecated image:caption tag.');
  }
}

if (!fs.existsSync(robotsPath)) {
  errors.push('Missing rendered robots.txt output.');
} else if (!fs.readFileSync(robotsPath, 'utf8').includes('Sitemap: https://www.rupeekit.co.in/image-sitemap.xml')) {
  errors.push('Rendered robots.txt does not advertise the image sitemap.');
}

if (errors.length) {
  console.error('Rendered Discover image validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Rendered Discover image validation passed for ${manifest.length} required pages.`);
