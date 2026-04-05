import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_COOKIE = "auth_token";
const EXPIRES_COOKIE = "auth_token_expires_at";

const PUBLIC_AUTH_PAGES = ["/login", "/register"];
const PROTECTED_PREFIXES = ["/mahasiswa", "/profile"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const expiresAtRaw = request.cookies.get(EXPIRES_COOKIE)?.value;
  const expiresAt = expiresAtRaw ? Number(expiresAtRaw) : NaN;
  const validSession =
    Boolean(token) && Number.isFinite(expiresAt) && Date.now() <= expiresAt;

  if (isProtectedPath(pathname) && !validSession) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (PUBLIC_AUTH_PAGES.includes(pathname) && validSession) {
    return NextResponse.redirect(new URL("/mahasiswa", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mahasiswa/:path*", "/profile/:path*", "/login", "/register"],
};
