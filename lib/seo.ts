const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'RupeeKit';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rupeekit.co.in';

export const SITE_NAME = siteName;
export const SITE_URL = siteUrl;
export const DISCOVER_OG_WIDTH = 1600;
export const DISCOVER_OG_HEIGHT = 900;

export const INDEXABLE_ROBOTS = {
  index: true,
  follow: true,
  'max-image-preview': 'large',
} as const;

export type DiscoverOgImageKind =
  | 'calculator-tool'
  | 'blog-article'
  | 'blog-hub'
  | 'updates-hub'
  | 'financial-update'
  | 'financial-updates-hub'
  | 'government-salary-update'
  | 'government-salary-hub';

export interface DiscoverOgImageInput {
  kind: DiscoverOgImageKind;
  title: string;
  summary?: string;
  category?: string;
  alt?: string;
}

export interface PrimarySocialImageInput extends DiscoverOgImageInput {
  heroImage?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
}

function normalizeText(value: string | undefined, maxLength: number) {
  return (value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);
}

function getKindLabel(kind: DiscoverOgImageKind) {
  switch (kind) {
    case 'calculator-tool':
      return 'Calculator tool';
    case 'blog-article':
      return 'Blog article';
    case 'blog-hub':
      return 'Blog hub';
    case 'updates-hub':
      return 'Updates hub';
    case 'financial-update':
      return 'Financial update';
    case 'financial-updates-hub':
      return 'Financial updates hub';
    case 'government-salary-update':
      return 'Government salary update';
    case 'government-salary-hub':
      return 'Government salary updates hub';
    default:
      return 'Article';
  }
}

export function buildDiscoverOgImageUrl(input: DiscoverOgImageInput) {
  const params = new URLSearchParams({
    kind: input.kind,
    title: normalizeText(input.title, 110),
  });

  const summary = normalizeText(input.summary, 170);
  const category = normalizeText(input.category, 40);

  if (summary) {
    params.set('summary', summary);
  }

  if (category) {
    params.set('category', category);
  }

  return `${SITE_URL}/og?${params.toString()}`;
}

export function buildDiscoverOgImageAlt(input: DiscoverOgImageInput) {
  if (input.alt) {
    return normalizeText(input.alt, 180);
  }

  const category = normalizeText(input.category, 50);
  const label = getKindLabel(input.kind);
  const title = normalizeText(input.title, 100);
  const categoryPrefix = category ? `${category} ` : '';

  return normalizeText(
    `Illustrated ${categoryPrefix}${label.toLowerCase()} preview for ${title} on ${SITE_NAME}.`,
    180
  );
}

export function buildDiscoverOgImage(input: DiscoverOgImageInput) {
  return {
    url: buildDiscoverOgImageUrl(input),
    width: DISCOVER_OG_WIDTH,
    height: DISCOVER_OG_HEIGHT,
    alt: buildDiscoverOgImageAlt(input),
  };
}

export function buildAbsoluteSiteUrl(pathOrUrl: string) {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }

  return `${SITE_URL}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

export function buildPrimarySocialImage(input: PrimarySocialImageInput) {
  if (input.heroImage) {
    return {
      url: buildAbsoluteSiteUrl(input.heroImage),
      width: input.heroImageWidth || DISCOVER_OG_WIDTH,
      height: input.heroImageHeight || DISCOVER_OG_HEIGHT,
      alt: normalizeText(input.heroImageAlt || input.alt || input.title, 180),
    };
  }

  return buildDiscoverOgImage(input);
}
