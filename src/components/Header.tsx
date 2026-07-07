"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { KANDA_META, KANDA_SLUGS } from "@/lib/kanda-meta";
import type { KandaSlug } from "@/lib/kanda-meta";
import { KandaGlyph } from "@/components/KandaGlyph";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchModal } from "@/components/SearchModal";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [kandaOpen, setKandaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const kandaRef = useRef<HTMLDivElement>(null);

  // Cmd+k / Ctrl+k to open search
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Close the kanda dropdown on outside click or Escape.
  useEffect(() => {
    if (!kandaOpen) return;
    function onPointer(e: PointerEvent) {
      if (kandaRef.current && !kandaRef.current.contains(e.target as Node)) {
        setKandaOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setKandaOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [kandaOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <OmMark className="h-7 w-7 text-saffron" />
          <div className="flex flex-col">
            <span className="font-heading text-lg font-bold leading-tight text-primary">
              Valmiki Ramayana
            </span>
            <span className="text-[0.65rem] font-medium uppercase tracking-widest text-muted-foreground">
              श्रीमद्वाल्मीकीयरामायणम्
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            href="/"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/" && "bg-accent text-accent-foreground"
            )}
          >
            Home
          </Link>

          {/* Kanda dropdown — keyboard accessible */}
          <div className="relative" ref={kandaRef}>
            <button
              type="button"
              onClick={() => setKandaOpen((v) => !v)}
              aria-haspopup="menu"
              aria-expanded={kandaOpen}
              className={cn(
                "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                pathname.startsWith("/kanda") && "bg-accent text-accent-foreground"
              )}
            >
              Kaandas
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={cn("transition-transform", kandaOpen && "rotate-180")}
                suppressHydrationWarning
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
            {kandaOpen && (
              <div
                role="menu"
                className="absolute left-0 top-full z-50 mt-1 min-w-[280px] rounded-xl border border-border bg-popover p-2 shadow-xl"
              >
                {KANDA_SLUGS.map((slug) => {
                  const meta = KANDA_META[slug as KandaSlug];
                  return (
                    <Link
                      key={slug}
                      href={`/kanda/${slug}/`}
                      onClick={() => setKandaOpen(false)}
                      role="menuitem"
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <KandaGlyph
                        name={meta.glyph}
                        className="h-6 w-6 shrink-0"
                      />
                      <div>
                        <div className="font-medium">{meta.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {meta.nameEnglish} · {meta.sargaCount} chapters
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link
            href="/journey/"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/journey" && "bg-accent text-accent-foreground"
            )}
          >
            Journey
          </Link>

          <Link
            href="/about/"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/about" && "bg-accent text-accent-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/resources/"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/resources" && "bg-accent text-accent-foreground"
            )}
          >
            Resources
          </Link>

          <span className="mx-1 h-5 w-px bg-border" aria-hidden />

          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Search verses"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              suppressHydrationWarning
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <span className="hidden lg:inline">Search</span>
            <kbd className="hidden rounded bg-muted px-1 font-mono text-[0.65rem] lg:inline">⌘K</kbd>
          </button>

          <ThemeToggle />
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Search verses"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              suppressHydrationWarning
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Home
            </Link>
            {KANDA_SLUGS.map((slug) => {
              const meta = KANDA_META[slug as KandaSlug];
              return (
                <Link
                  key={slug}
                  href={`/kanda/${slug}/`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                >
                  <KandaGlyph name={meta.glyph} className="h-5 w-5 shrink-0" />
                  {meta.name}
                </Link>
              );
            })}
            <Link
              href="/journey/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Journey
            </Link>
            <Link
              href="/about/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              About
            </Link>
            <Link
              href="/resources/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Resources
            </Link>
          </nav>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}

/** Custom Om-style mark for the logo. */
function OmMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      suppressHydrationWarning
      className={className}
    >
      {/* Stylized Om curl */}
      <path d="M8 14 C 4 14, 4 9, 9 9 C 14 9, 15 14, 11 16 C 7 18, 8 23, 13 22 C 18 21, 19 15, 24 15 C 28 15, 28 20, 24 20" />
      <path d="M22 9 C 24 7, 27 8, 27 11" />
      <circle cx="24" cy="6" r="0.8" fill="currentColor" stroke="none" />
      <path d="M13 22 C 14 25, 18 26, 21 24" />
    </svg>
  );
}
