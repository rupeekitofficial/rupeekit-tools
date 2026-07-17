import Image from 'next/image';
import type { DiscoverImage } from '@/data/discover-images';

type DiscoverHeroImageProps = {
  image: DiscoverImage;
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
      className={`relative aspect-video w-full overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-lg ${className}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="h-full w-full object-cover"
        sizes="(min-width: 1024px) 42vw, 100vw"
        priority={priority}
      />
    </figure>
  );
}
