import { NextResponse } from "next/server";

/** Live Framer site shown while the Next portfolio is still WIP. */
const FRAMER_BASE = "https://vyoumportfolio.framer.website";

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const path = (url.searchParams.get("path") || "").replace(/^\/+/, "");
    const targetUrl = path ? `${FRAMER_BASE}/${path}` : `${FRAMER_BASE}/`;

    const incoming = request.headers;
    const forwardHeaders = new Headers();

    for (const name of [
      "user-agent",
      "accept",
      "accept-language",
      "cookie",
      "accept-encoding",
    ]) {
      const v = incoming.get(name);
      if (v) forwardHeaders.set(name, v);
    }

    forwardHeaders.set("host", new URL(FRAMER_BASE).host);

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
      const host = url.origin;
      const text = new TextDecoder().decode(buffer);
      const replaced = text
        .replaceAll(FRAMER_BASE, host)
        .replaceAll("https://vyoumportfolio.framer.website", host);

      return new NextResponse(replaced, {
        status: upstreamRes.status,
        headers: responseHeaders,
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
