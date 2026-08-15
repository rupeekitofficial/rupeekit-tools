import fs from 'node:fs';

const mustContain = (file, text) => {
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes(text)) throw new Error(`${file} is missing required performance marker: ${text}`);
  return source;
};

const discover = mustContain('components/seo/DiscoverHeroImage.tsx', 'width={image.width}');
if (!discover.includes('height={image.height}') || !discover.includes('aspect-video') || !discover.includes('fetchPriority')) {
  throw new Error('DiscoverHeroImage must keep dimensions, reserved aspect ratio and priority fetch support.');
}

const blog = mustContain('components/blog/BlogHero.tsx', 'width={heroImageWidth || 1600}');
if (!blog.includes('height={heroImageHeight || 900}') || !blog.includes('aspect-[16/9]') || !blog.includes('fetchPriority="high"')) {
  throw new Error('BlogHero must keep explicit dimensions, reserved aspect ratio and high fetch priority.');
}
if (blog.startsWith("'use client'")) throw new Error('BlogHero should remain server-rendered.');

mustContain('app/tools/[slug]/page.tsx', '<DiscoverHeroImage image={discoverImage} priority />');
console.log('Performance readiness validation passed.');
