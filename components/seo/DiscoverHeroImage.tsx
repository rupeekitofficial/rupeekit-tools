'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';
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
  const pathname = usePathname();
  const isCalculatorRoute = pathname?.startsWith('/tools/');

  return (
    <>
      {isCalculatorRoute ? (
        <style jsx global>{`
          @media (min-width: 1024px) {
            header:has(.rupeekit-calculator-discover-hero) {
              grid-template-columns: minmax(0, 1fr) !important;
              align-items: start !important;
            }

            header:has(.rupeekit-calculator-discover-hero) > div:first-child {
              max-width: 64rem;
            }

            header:has(.rupeekit-calculator-discover-hero) > div:nth-child(2) {
              width: 100%;
            }

            header:has(.rupeekit-calculator-discover-hero)
              > div:nth-child(2)
              > :not(.rupeekit-calculator-discover-hero) {
              max-width: 48rem;
            }
          }
        `}</style>
      ) : null}

      <figure
        className={`relative aspect-video w-full overflow-hidden border border-slate-200 bg-slate-950 ${
          isCalculatorRoute
            ? 'rupeekit-calculator-discover-hero rounded-[2rem] shadow-2xl'
            : 'rounded-3xl shadow-lg'
        } ${className}`}
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
    </>
  );
}
