import imageManifest from './discover-images.json';

export type DiscoverImage = {
  path: string;
  src: string;
  alt: string;
  width: number;
  height: number;
};

export const discoverImages = imageManifest as DiscoverImage[];

const discoverImageByPath = new Map(discoverImages.map((image) => [image.path, image]));

function normalizePath(pathname: string) {
  if (pathname === '/') return pathname;
  return pathname.replace(/\/$/, '');
}

export function getDiscoverImage(pathname: string): DiscoverImage | undefined {
  return discoverImageByPath.get(normalizePath(pathname));
}

export function getAbsoluteDiscoverImageUrl(siteUrl: string, pathname: string): string | undefined {
  const image = getDiscoverImage(pathname);
  return image ? `${siteUrl.replace(/\/$/, '')}${image.src}` : undefined;
}
