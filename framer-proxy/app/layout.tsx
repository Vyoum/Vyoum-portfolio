import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "./components/SmoothScroll";
import CustomCursor from "./components/CustomCursor";
import MotionProvider from "./components/MotionProvider";
import { SITE } from "./lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const description =
  "AI engineer building production agentic workflows, AI automation, and full-stack web apps. LangGraph systems running across 50+ schools; AIR 2 at Razorpay Buildathon.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: `${SITE.name} | AI Engineer`,
  description,
  openGraph: {
    title: `${SITE.name} | AI Engineer`,
    description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | AI Engineer`,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} antialiased`}>
        <MotionProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </MotionProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
