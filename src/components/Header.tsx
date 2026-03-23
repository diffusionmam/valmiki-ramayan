"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { KANDA_META, KANDA_SLUGS } from "@/lib/kanda-meta";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="text-2xl" aria-hidden>
            🙏
          </span>
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

          {/* Kanda Dropdown — simple CSS hover */}
          <div className="group relative">
            <button
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname.startsWith("/kanda") && "bg-accent text-accent-foreground"
              )}
            >
              Kaandas ▾
            </button>
            <div className="invisible absolute left-0 top-full z-50 min-w-[260px] rounded-xl border border-border bg-popover p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:opacity-100">
              {KANDA_SLUGS.map((slug) => {
                const meta = KANDA_META[slug];
                return (
                  <Link
                    key={slug}
                    href={`/kanda/${slug}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent"
                  >
                    <span className="text-lg">{meta.icon}</span>
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
          </div>

          <Link
            href="/about"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/about" && "bg-accent text-accent-foreground"
            )}
          >
            About
          </Link>
          <Link
            href="/resources"
            className={cn(
              "rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
              pathname === "/resources" && "bg-accent text-accent-foreground"
            )}
          >
            Resources
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </Button>
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
              const meta = KANDA_META[slug];
              return (
                <Link
                  key={slug}
                  href={`/kanda/${slug}`}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm hover:bg-accent"
                >
                  <span>{meta.icon}</span>
                  {meta.name}
                </Link>
              );
            })}
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              About
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent"
            >
              Resources
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
