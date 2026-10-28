import { NextResponse, type NextRequest } from "next/server";

const COOKIE = "ape_lab_gate";

async function tokenForPassword(password: string) {
  const data = new TextEncoder().encode(`ape-lab:${password}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const password = process.env.SITE_PASSWORD?.trim();
  if (!password) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/access") ||
    pathname.startsWith("/api/access") ||
    pathname === "/favicon.ico" ||
    pathname === "/logo.png" ||
    pathname === "/robots.txt"
  ) {
    return NextResponse.next();
  }

  // Public files under /public (images, videos, etc.)
  if (/\.(?:png|jpg|jpeg|gif|webp|svg|ico|mp4|webm|woff2?)$/i.test(pathname)) {
    return NextResponse.next();
  }

  const expected = await tokenForPassword(password);
  const got = request.cookies.get(COOKIE)?.value;
  if (got && got === expected) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/access";
  url.searchParams.set("next", pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
