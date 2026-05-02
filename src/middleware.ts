import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Dashboard is client-protected by AuthContext
  // This adds an extra layer — no response for non-browser requests
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/dashboard')) {
    const referer = request.headers.get('referer');
    // Block direct API/curl access
    const userAgent = request.headers.get('user-agent') ?? '';
    if (!userAgent || userAgent.includes('curl') || userAgent.includes('python')) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};