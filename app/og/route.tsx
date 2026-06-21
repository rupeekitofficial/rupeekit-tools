import type { NextRequest } from 'next/server';
import { ImageResponse } from 'next/og';
import {
  DISCOVER_OG_HEIGHT,
  DISCOVER_OG_WIDTH,
  SITE_NAME,
  type DiscoverOgImageKind,
} from '@/lib/seo';

export const runtime = 'edge';

const kindLabels: Record<DiscoverOgImageKind, string> = {
  'calculator-tool': 'Calculator tool',
  'blog-article': 'Blog article',
  'blog-hub': 'Blog hub',
  'updates-hub': 'Updates hub',
  'financial-update': 'Financial update',
  'financial-updates-hub': 'Financial updates hub',
  'government-salary-update': 'Government salary update',
  'government-salary-hub': 'Government salary updates hub',
};

function cleanText(value: string | null, maxLength: number, fallback: string) {
  const cleaned = (value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLength);

  return cleaned || fallback;
}

function getTheme(kind: DiscoverOgImageKind) {
  switch (kind) {
    case 'financial-update':
    case 'financial-updates-hub':
      return {
        accent: '#1D4ED8',
        accentSoft: '#DBEAFE',
        badge: '#E0F2FE',
        badgeText: '#0F3E8A',
        marker: '#3B82F6',
      };
    case 'government-salary-update':
    case 'government-salary-hub':
      return {
        accent: '#C2410C',
        accentSoft: '#FFEDD5',
        badge: '#FEF3C7',
        badgeText: '#9A3412',
        marker: '#F97316',
      };
    case 'updates-hub':
      return {
        accent: '#0F766E',
        accentSoft: '#CCFBF1',
        badge: '#DCFCE7',
        badgeText: '#115E59',
        marker: '#14B8A6',
      };
    default:
      return {
        accent: '#0F3E8A',
        accentSoft: '#DCFCE7',
        badge: '#E8F5E9',
        badgeText: '#166534',
        marker: '#43A047',
      };
  }
}

function MiniVisual({
  accent,
  accentSoft,
  marker,
}: {
  accent: string;
  accentSoft: string;
  marker: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: 420,
        height: 500,
        padding: 34,
        borderRadius: 34,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0.78))',
        border: `2px solid ${accentSoft}`,
        boxShadow: '0 22px 60px rgba(15, 23, 42, 0.20)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <div
            style={{
              display: 'flex',
              padding: '10px 16px',
              borderRadius: 999,
              background: accentSoft,
              color: accent,
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            India-focused
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
            }}
          >
            <div
              style={{
                display: 'flex',
                color: '#334155',
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
              }}
            >
              Educational preview
            </div>
            <div
              style={{
                display: 'flex',
                color: '#0F172A',
                fontSize: 44,
                fontWeight: 800,
              }}
            >
              Discover-ready
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 96,
            height: 96,
            borderRadius: 28,
            background: accent,
            color: '#FFFFFF',
            fontSize: 36,
            fontWeight: 800,
          }}
        >
          Rs
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 18,
          height: 180,
          width: '100%',
        }}
      >
        {[72, 114, 154, 128].map((height, index) => (
          <div
            key={`${height}-${index}`}
            style={{
              display: 'flex',
              width: 62,
              height,
              borderRadius: '20px 20px 12px 12px',
              background: index === 3 ? marker : accent,
              opacity: index === 0 ? 0.35 : index === 1 ? 0.55 : index === 2 ? 0.75 : 1,
            }}
          />
        ))}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 112,
              height: 112,
              borderRadius: 999,
              background: accentSoft,
              border: `8px solid ${marker}`,
            }}
          />
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          gap: 14,
          width: '100%',
        }}
      >
        {['Clarity', 'Method', 'Context'].map((label) => (
          <div
            key={label}
            style={{
              display: 'flex',
              padding: '12px 16px',
              borderRadius: 18,
              background: '#F8FAFC',
              border: '1px solid #E2E8F0',
              color: '#334155',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export function GET(request: NextRequest) {
  const kind = cleanText(
    request.nextUrl.searchParams.get('kind'),
    40,
    'blog-article'
  ) as DiscoverOgImageKind;
  const title = cleanText(request.nextUrl.searchParams.get('title'), 110, SITE_NAME);
  const summary = cleanText(request.nextUrl.searchParams.get('summary'), 180, '');
  const category = cleanText(request.nextUrl.searchParams.get('category'), 40, kindLabels[kind]);
  const theme = getTheme(kind);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0F172A 0%, #0F3E8A 58%, #1E293B 100%)',
          color: '#FFFFFF',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -140,
            right: -80,
            width: 420,
            height: 420,
            borderRadius: 999,
            background: 'rgba(67, 160, 71, 0.14)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -120,
            left: -100,
            width: 360,
            height: 360,
            borderRadius: 999,
            background: 'rgba(255, 255, 255, 0.08)',
          }}
        />

        <div
          style={{
            display: 'flex',
            width: '100%',
            padding: '72px 76px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 44,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              width: 940,
              height: 560,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      padding: '12px 18px',
                      borderRadius: 999,
                      background: theme.badge,
                      color: theme.badgeText,
                      fontSize: 22,
                      fontWeight: 700,
                    }}
                  >
                    {category}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      padding: '12px 18px',
                      borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.18)',
                      color: '#E2E8F0',
                      fontSize: 22,
                      fontWeight: 600,
                    }}
                  >
                    {kindLabels[kind]}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    color: '#E2E8F0',
                    fontSize: 26,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                  }}
                >
                  {SITE_NAME}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  color: '#FFFFFF',
                  fontSize: 78,
                  fontWeight: 800,
                  lineHeight: 1.08,
                  maxHeight: 256,
                  overflow: 'hidden',
                }}
              >
                {title}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 22,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  color: '#CBD5E1',
                  fontSize: 33,
                  lineHeight: 1.35,
                  maxHeight: 138,
                  overflow: 'hidden',
                }}
              >
                {summary || 'Educational India-focused explainer with clear context, source-aware framing, and a calculator-friendly next step.'}
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  color: '#A7F3D0',
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: 0.6,
                  textTransform: 'uppercase',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: '#43A047',
                  }}
                />
                Clear headline
                <div
                  style={{
                    display: 'flex',
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: '#43A047',
                  }}
                />
                Source-aware
                <div
                  style={{
                    display: 'flex',
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: '#43A047',
                  }}
                />
                Non-clickbait
              </div>
            </div>
          </div>

          <MiniVisual
            accent={theme.accent}
            accentSoft={theme.accentSoft}
            marker={theme.marker}
          />
        </div>
      </div>
    ),
    {
      width: DISCOVER_OG_WIDTH,
      height: DISCOVER_OG_HEIGHT,
    }
  );
}
