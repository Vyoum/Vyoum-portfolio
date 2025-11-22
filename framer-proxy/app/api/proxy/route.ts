// app/api/proxy/route.ts
import { NextResponse } from "next/server";

const FRAMER_BASE = "https://vyoumportfolio.framer.website"; // <-- change this

export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const path = url.searchParams.get("path") || "";
    const targetUrl = `${FRAMER_BASE}/${path}`;

    // forward basic headers
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

    // important: Framer host
    forwardHeaders.set("host", new URL(FRAMER_BASE).host);

    const upstreamRes = await fetch(targetUrl, {
      method: "GET",
      headers: forwardHeaders,
      redirect: "follow",
    });

    const contentType = upstreamRes.headers.get("content-type") || "";
    const originalHeaders = new Headers(upstreamRes.headers);

    // Remove headers that might conflict
    originalHeaders.delete("content-security-policy");
    originalHeaders.delete("x-frame-options");

    const buffer = await upstreamRes.arrayBuffer();

    // Optional: rewrite absolute URLs in HTML so user stays on your domain
    if (contentType.includes("text/html")) {
      const text = new TextDecoder().decode(buffer);
      const replaced = text.replaceAll(
        FRAMER_BASE,
        // This is your domain on Vercel – update later if needed
        "https://yourdomain.com"
      );

      return new NextResponse(replaced, {
        status: upstreamRes.status,
        headers: originalHeaders,
      });
    }

    // Non-HTML (images, CSS, JS) – passthrough
    return new NextResponse(buffer, {
      status: upstreamRes.status,
      headers: originalHeaders,
    });
  } catch (err: any) {
    console.error("Proxy error:", err);
    return new NextResponse("Proxy error", { status: 502 });
  }
}