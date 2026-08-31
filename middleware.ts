import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const isToolPage = request.nextUrl.pathname.startsWith('/tools/');
  const hasParameters = request.nextUrl.searchParams.size > 0;

  if (isToolPage && hasParameters) {
    response.headers.set('X-Robots-Tag', 'noindex, follow');
  }

  return response;
}

export const config = {
  matcher: ['/tools/:path*'],
};
