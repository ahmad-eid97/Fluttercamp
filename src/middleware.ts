import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
//= Config
import { i18n } from '@/i18n.config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(locale => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`);
  const savedLocaleCookie = request.cookies.get('fluttercamp-locale');
  const savedLocale = "ar";
  const currentLocale = request.nextUrl.pathname.split('/')[1];
  const token = request.cookies.get('fluttercamp-auth-token')?.value;
  const handledPathname = pathname.substring(3);

  const authRoutes = ['/login', '/forget-password', '/signup'];
  const globalRoutes = ['/about', '/contact', '/library', '/blogs', '/blog', '/tracks', '/course', '/cart', '/search']

  let protectedRoute = false;
  let globalRoute = false;

  if (!globalRoutes.includes(handledPathname) && !authRoutes.includes(handledPathname) && pathname !== '/' && pathname !== `/${savedLocaleCookie?.value || savedLocale}`) {
    protectedRoute = true;
  }

  authRoutes.forEach((route) => {
    if (pathname.includes(route)) protectedRoute = false;
  });

  globalRoutes.forEach((route) => {
    if (pathname.includes(route)) {
      globalRoute = true;
      protectedRoute = false;
    }
    return;
  });


  if (token && !protectedRoute && !globalRoute && pathname !== '/' && pathname !== `/${savedLocaleCookie?.value || savedLocale}`) {
    return NextResponse.redirect(new URL(`/${savedLocaleCookie?.value || savedLocale}`, request.url));
  } else if (!token && protectedRoute) {
    return NextResponse.redirect(new URL(`/${savedLocaleCookie?.value || savedLocale}/login`, request.url));
  }

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = savedLocaleCookie?.value || savedLocale || 'ar';
    const query = request.nextUrl.search;
    return NextResponse.redirect(new URL(`/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}${query ? query : ''}`, request.url));
  }

  if (!savedLocaleCookie) {
    const response = NextResponse.next();
    response.cookies.set({
      name: 'fluttercamp-locale',
      value: currentLocale || 'ar',
      path: '/',
    });
    return response;
  }

  // Redirect if current locale is not same as saved locale
  if (savedLocaleCookie && currentLocale !== savedLocaleCookie.value) {
    const query = request.nextUrl.search;
    const locale = pathname.split('/')[1];
    const purePathname = pathname.substring(pathname.indexOf(locale) + 3);
    return NextResponse.redirect(new URL(`/${savedLocaleCookie.value}${purePathname.startsWith('/') ? '' : '/'}${purePathname}${query ? query : ''}`, request.url));
  }

  const requestHeaders = new Headers(request.headers);


  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    }
  })
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.png|imgs|illustrations|fonts|css|webfonts|favicon).*)']
}