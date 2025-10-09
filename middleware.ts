import { NextRequest, NextResponse } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Check if the pathname already includes a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has a locale, let it continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // For root path, redirect to default locale
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${defaultLocale}`, request.url));
  }

  // For other paths, check if there is a language preference in the cookie
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  
  if (cookieLocale && locales.includes(cookieLocale)) {
    // Redirect to the locale from the cookie
    return NextResponse.redirect(
      new URL(`/${cookieLocale}${pathname}`, request.url)
    );
  }

  // Default redirect to the default locale
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: [
    // Match all paths except those starting with:
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};