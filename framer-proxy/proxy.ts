import { NextRequest, NextResponse } from "next/server";

const FRAMER_PROXY_ENABLED = process.env.FRAMER_PROXY !== "0";

/**
 * Next.js 16+: file convention is `proxy.ts` (replaces `middleware.ts`).
 * Rewrites traffic to /api/proxy so we can inject badge-cover + email CTA.
 */
export function proxy(request: NextRequest) {
  if (!FRAMER_PROXY_ENABLED) {
    return NextResponse.next();
  }

  const { pathname, search } = request.nextUrl;

  // Keep Next internals + the Framer HTML proxy API itself
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/proxy") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = "/api/proxy";
  rewriteUrl.search = "";
  rewriteUrl.searchParams.set(
    "path",
    pathname === "/" ? "" : pathname.replace(/^\//, "") + search
  );

  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
