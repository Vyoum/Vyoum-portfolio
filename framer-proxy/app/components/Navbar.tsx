"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useScroll,
} from "framer-motion";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { name: "Build", href: "#work" },
  { name: "Design", href: "#services" },
  { name: "Launch", href: "#pricing" },
  { name: "Grow", href: "#blog" },
] as const;

const spring = {
  type: "spring" as const,
  stiffness: 380,
  damping: 34,
  mass: 0.7,
};

export default function Navbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      const nextCollapsed = latest > 50;
      setIsCollapsed(nextCollapsed);
      if (!nextCollapsed) setMenuOpen(false);
    });
  }, [scrollY]);

  return (
    <header className="fixed top-6 left-0 z-[100] flex w-full justify-center px-4 md:px-6">
      <div className="relative flex flex-col items-center">
        <LayoutGroup id="site-nav">
          <motion.nav
            layout
            transition={spring}
            aria-label="Primary"
            className="relative flex items-center gap-1 rounded-full border border-black/10 bg-white/75 py-1.5 pr-1.5 pl-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/60"
          >
            <motion.div layout="position" transition={spring} className="shrink-0">
              <Link
                href="/"
                className="flex items-center rounded-full px-3 py-2 no-underline"
              >
                <span className="text-[0.95rem] font-semibold tracking-[-0.02em] text-neutral-900 whitespace-nowrap">
                  Vyoum Agarwaal
                </span>
              </Link>
            </motion.div>

            <AnimatePresence mode="popLayout" initial={false}>
              {!isCollapsed ? (
                <motion.div
                  key="expanded-cluster"
                  layout
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(4px)" }}
                  transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
                  className="flex items-center gap-1"
                >
                  <nav
                    className="mx-1 hidden items-center gap-0.5 md:flex"
                    aria-label="Core pillars"
                  >
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        className="rounded-full px-3.5 py-2 text-sm font-medium text-neutral-500 no-underline transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>

                  <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex size-10 items-center justify-center rounded-full text-neutral-500 transition-colors hover:bg-black/[0.04] hover:text-neutral-900 md:hidden"
                  >
                    <MoreHorizontal size={20} />
                  </button>

                  <Link
                    href="#contact"
                    className="ml-0.5 inline-flex shrink-0 items-center justify-center rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold whitespace-nowrap text-white no-underline shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition hover:opacity-90"
                  >
                    Book a call
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed-dots"
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
                  className="flex items-center pr-0.5"
                >
                  <button
                    type="button"
                    aria-label="Open menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen((open) => !open)}
                    className="flex size-10 items-center justify-center rounded-full text-neutral-600 transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                  >
                    <MoreHorizontal size={20} strokeWidth={2.25} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.nav>
        </LayoutGroup>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="nav-menu"
              initial={{ opacity: 0, y: -10, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-[calc(100%+12px)] z-[110] w-[min(260px,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-black/10 bg-white/90 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm font-medium text-neutral-700 no-underline transition-colors hover:bg-black/[0.04] hover:text-neutral-900"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-1 block rounded-xl bg-neutral-900 px-4 py-3 text-center text-sm font-semibold text-white no-underline"
              >
                Book a call
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
