import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
  const adminToken = request.cookies.get('admin-token');

  if (isAdminRoute && !adminToken) {
    return NextResponse.redirect(new URL('/admin-login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
