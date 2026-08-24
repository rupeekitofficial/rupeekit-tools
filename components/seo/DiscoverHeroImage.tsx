import Image from 'next/image';
import type { DiscoverImage } from '@/data/discover-images';

type HeroImage = Pick<DiscoverImage, 'src' | 'alt' | 'width' | 'height'>;

type DiscoverHeroImageProps = {
  image: HeroImage;
  className?: string;
  priority?: boolean;
};

export default function DiscoverHeroImage({
  image,
  className = '',
  priority = false,
}: DiscoverHeroImageProps) {
  return (
    <figure
      className={`relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-lg ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-full w-full object-contain"
        sizes="(min-width: 1280px) 1152px, (min-width: 1024px) calc(100vw - 8rem), (min-width: 640px) calc(100vw - 4rem), calc(100vw - 2rem)"
        priority={priority}
      />
      <figcaption className="sr-only">{image.alt}</figcaption>
    </figure>
  );
}
