import { ImageResponse } from 'next/og';
import {
  getBaseDiscoverImage,
  getDiscoverCreativeBriefBySlug,
} from '@/data/discover-images';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const brief = getDiscoverCreativeBriefBySlug(params.slug);
  if (!brief) return new Response('Discover creative not found', { status: 404 });

  const baseImage = getBaseDiscoverImage(brief.path);
  if (!baseImage) return new Response('Discover base image not found', { status: 404 });

  const origin = new URL(request.url).origin;
  const baseImageUrl = `${origin}${baseImage.src}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#0f172a',
        }}
      >
        <img
          src={baseImageUrl}
          alt=""
          width={1600}
          height={900}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'linear-gradient(90deg, rgba(2, 6, 23, 0.82) 0%, rgba(2, 6, 23, 0.44) 42%, rgba(2, 6, 23, 0.06) 72%), linear-gradient(0deg, rgba(2, 6, 23, 0.45) 0%, rgba(2, 6, 23, 0) 42%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 96,
            bottom: 92,
            width: 880,
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              fontSize: 82,
              lineHeight: 1.02,
              fontWeight: 800,
              letterSpacing: '-0.035em',
              color: '#ffffff',
              textShadow: '0 4px 22px rgba(2, 6, 23, 0.55)',
            }}
          >
            {brief.safeHook}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              color: '#d1fae5',
              fontSize: 28,
              fontWeight: 700,
              letterSpacing: '0.01em',
            }}
          >
            <span>RupeeKit</span>
            <span style={{ color: '#86efac' }}>•</span>
            <span style={{ color: '#e2e8f0', fontWeight: 500 }}>
              India personal finance
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1600,
      height: 900,
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000',
      },
    },
  );
}
