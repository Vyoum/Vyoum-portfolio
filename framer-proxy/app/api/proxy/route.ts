import { NextResponse } from "next/server";

/** Live Framer site shown while the Next portfolio is still WIP. */
const FRAMER_BASE = "https://vyoumportfolio.framer.website";
const CONTACT_EMAIL = "vyoumagarwal@gmail.com";

export const runtime = "edge";

const BADGE_COVER_SNIPPET = `
<style id="vyoum-framer-badge-cover">
  /* Kill Made-in-Framer badge (injected late by Framer too) */
  #__framer-badge-container,
  #__framer-badge-container *,
  a.__framer-badge,
  [class*="__framer-badge"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
    width: 0 !important;
    height: 0 !important;
    max-width: 0 !important;
    max-height: 0 !important;
    overflow: hidden !important;
    position: fixed !important;
    left: -9999px !important;
  }

  /* Sticky email CTA sits where the badge was (bottom-right), all viewports */
  a.vyoum-email-cta {
    position: fixed;
    right: max(12px, env(safe-area-inset-right));
    bottom: max(12px, env(safe-area-inset-bottom));
    z-index: 2147483647;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    min-width: 148px;
    height: 40px;
    padding: 0 16px;
    border-radius: 12px;
    background: #111;
    color: #fff !important;
    font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1;
    text-decoration: none !important;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.12),
      0 8px 20px rgba(0, 0, 0, 0.18);
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  a.vyoum-email-cta:hover {
    background: #222;
  }

  a.vyoum-email-cta:active {
    transform: translateY(1px);
  }

  @media (max-width: 640px) {
    a.vyoum-email-cta {
      right: max(10px, env(safe-area-inset-right));
      bottom: max(10px, env(safe-area-inset-bottom));
      min-width: 138px;
      height: 38px;
      padding: 0 14px;
      font-size: 13px;
      border-radius: 10px;
    }
  }
</style>
<a class="vyoum-email-cta" href="mailto:${CONTACT_EMAIL}?subject=Project%20inquiry" aria-label="Email Vyoum">
  Email me
</a>
<script id="vyoum-framer-badge-killer">
(function () {
  function nuke() {
    var el = document.getElementById("__framer-badge-container");
    if (el) el.remove();
  }
  nuke();
  new MutationObserver(nuke).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });
})();
</script>
`;

function injectBadgeCover(html: string, hostOrigin: string): string {
  let out = html
    .replaceAll(FRAMER_BASE, hostOrigin)
    .replaceAll("https://vyoumportfolio.framer.website", hostOrigin);

  if (out.includes("</body>")) {
    out = out.replace("</body>", `${BADGE_COVER_SNIPPET}</body>`);
  } else {
    out += BADGE_COVER_SNIPPET;
  }

  return out;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const rawPath = url.searchParams.get("path") || "";
    // path may include ?query from middleware (path + search)
    const targetUrl = rawPath
      ? `${FRAMER_BASE}/${rawPath.replace(/^\/+/, "")}`
      : `${FRAMER_BASE}/`;

    const incoming = request.headers;
    const forwardHeaders = new Headers();

    for (const name of ["user-agent", "accept", "accept-language", "cookie"]) {
      const v = incoming.get(name);
      if (v) forwardHeaders.set(name, v);
    }

    forwardHeaders.set("host", new URL(FRAMER_BASE).host);
    // Avoid compressed bodies so HTML injection can decode as text
    forwardHeaders.set("accept-encoding", "identity");

    const upstreamRes = await fetch(targetUrl, {
      method: "GET",
      headers: forwardHeaders,
      redirect: "follow",
    });

    const contentType = upstreamRes.headers.get("content-type") || "";
    const responseHeaders = new Headers(upstreamRes.headers);
    responseHeaders.delete("content-security-policy");
    responseHeaders.delete("x-frame-options");
    responseHeaders.delete("content-encoding");
    responseHeaders.delete("content-length");

    const buffer = await upstreamRes.arrayBuffer();

    if (contentType.includes("text/html")) {
      const text = new TextDecoder().decode(buffer);
      const replaced = injectBadgeCover(text, url.origin);

      return new NextResponse(replaced, {
        status: upstreamRes.status,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      });
    }

    return new NextResponse(buffer, {
      status: upstreamRes.status,
      headers: responseHeaders,
    });
  } catch (err: unknown) {
    console.error("Proxy error:", err);
    return new NextResponse("Proxy error", { status: 502 });
  }
}
