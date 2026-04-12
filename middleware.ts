import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  DEFAULT_LOCALE,
  getCanonicalLocale,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  resolvePreferredLocale,
} from "@/i18n/locales";

const PUBLIC_FILE = /\.[^/]+$/;

const shouldBypass = (pathname: string) =>
  pathname.startsWith("/_next") ||
  pathname.startsWith("/api") ||
  pathname === "/favicon.ico" ||
  PUBLIC_FILE.test(pathname);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const preferredLocale = resolvePreferredLocale({
    cookieLocale: request.cookies.get(LOCALE_COOKIE_NAME)?.value,
    acceptLanguage: request.headers.get("accept-language"),
  });

  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (!firstSegment) {
    const response = NextResponse.redirect(new URL(`/${preferredLocale || DEFAULT_LOCALE}`, request.url));
    response.cookies.set(LOCALE_COOKIE_NAME, preferredLocale || DEFAULT_LOCALE, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  if (isSupportedLocale(firstSegment)) {
    const response = NextResponse.next();
    response.cookies.set(LOCALE_COOKIE_NAME, firstSegment, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const canonicalLocale = getCanonicalLocale(firstSegment);

  if (canonicalLocale) {
    const url = request.nextUrl.clone();
    url.pathname = `/${canonicalLocale}/${segments.slice(1).join("/")}`.replace(/\/$/, "");
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE_NAME, canonicalLocale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
    return response;
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLocale || DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  const response = NextResponse.redirect(url);
  response.cookies.set(LOCALE_COOKIE_NAME, preferredLocale || DEFAULT_LOCALE, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
