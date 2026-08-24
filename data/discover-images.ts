import imageManifest from './discover-images.json';
import fcraImageManifest from './discover-images-fcra.json';
import creativeBriefManifest from './discover-creative-briefs-2026-08-24.json';

export type DiscoverImage = {
  path: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type DiscoverCreativeBrief = {
  path: string;
  priority: 'P0' | 'P1';
  contentType: 'article' | 'calculator';
  safeHook: string;
  story: string;
  composition: string;
  generationPrompt: string;
  avoid: string[];
};

// Keep the exported sitemap inventory bound to the original static WebP files.
// Priority pages may render a programmatic Discover card on-page and in metadata,
// but the base editorial image remains crawlable through the image sitemap.
export const discoverImages = [
  ...imageManifest,
  ...fcraImageManifest,
] as DiscoverImage[];

export const discoverCreativeBriefs = creativeBriefManifest as DiscoverCreativeBrief[];

const discoverImageByPath = new Map(discoverImages.map((image) => [image.path, image]));
const creativeBriefByPath = new Map(discoverCreativeBriefs.map((brief) => [brief.path, brief]));
const creativeBriefBySlug = new Map(
  discoverCreativeBriefs.map((brief) => [brief.path.split('/').filter(Boolean).at(-1) ?? '', brief]),
);

function normalizePath(pathname: string) {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/$/, '');
}

function slugFromPath(pathname: string) {
  return normalizePath(pathname).split('/').filter(Boolean).at(-1);
}

export function getBaseDiscoverImage(pathname: string): DiscoverImage | undefined {
  return discoverImageByPath.get(normalizePath(pathname));
}

export function getDiscoverCreativeBrief(pathname: string): DiscoverCreativeBrief | undefined {
  return creativeBriefByPath.get(normalizePath(pathname));
}

export function getDiscoverCreativeBriefBySlug(slug: string): DiscoverCreativeBrief | undefined {
  return creativeBriefBySlug.get(slug);
}

export function getDiscoverImage(pathname: string): DiscoverImage | undefined {
  const normalizedPath = normalizePath(pathname);
  const baseImage = discoverImageByPath.get(normalizedPath);
  if (!baseImage) return undefined;

  const brief = creativeBriefByPath.get(normalizedPath);
  const slug = slugFromPath(normalizedPath);
  if (!brief || !slug) return baseImage;

  return {
    ...baseImage,
    src: `/discover-image/${slug}`,
  };
}

export function getAbsoluteDiscoverImageUrl(siteUrl: string, pathname: string): string | undefined {
  const image = getDiscoverImage(pathname);
  return image ? `${siteUrl.replace(/\/$/, '')}${image.src}` : undefined;
}
