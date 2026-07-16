import { buildLlmsFullCatalog } from '@/lib/seo/llms-full';

export const dynamic = 'force-static';
export const revalidate = 86_400;

export function GET() {
  return new Response(buildLlmsFullCatalog(), {
    headers: {
      'Cache-Control': 'public, max-age=0, s-maxage=86400, stale-while-revalidate=604800',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
