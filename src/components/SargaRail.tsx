"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface SargaRailProps {
  kandaSlug: string;
  kandaName: string;
  sargaNumber: number;
  maxSarga: number;
  /** Whether IAST transliteration is shown. */
  itransOn: boolean;
  onToggleItrans: () => void;
  /** Jump to a verse number (scrolls to the verse anchor). */
  onVerseJump: (n: number) => void;
  totalVerses: number;
}

/**
 * Sticky navigation rail for the sarga reading experience.
 * - Desktop (xl+): slim left rail with full controls.
 * - Mobile/tablet: compact sticky top bar under the header.
 */
export function SargaRail({
  kandaSlug,
  kandaName,
  sargaNumber,
  maxSarga,
  itransOn,
  onToggleItrans,
  onVerseJump,
  totalVerses,
}: SargaRailProps) {
  const hasPrev = sargaNumber > 1;
  const hasNext = sargaNumber < maxSarga;

  return (
    <>
      {/* ── Desktop left rail (xl+) ──────────────────────────── */}
      <aside className={cn("sarga-rail hidden w-52 shrink-0 xl:block")}>
        <div className={cn("rounded-xl border border-border/50 bg-card/60 p-4 backdrop-blur-sm", `kanda-${kandaSlug}`)}>
          {/* Sarga number */}
          <div className="mb-3">
            <p className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
              {kandaName}
            </p>
            <p className="mt-1 font-heading text-2xl font-bold text-foreground">
              {sargaNumber}
              <span className="text-base font-normal text-muted-foreground">
                {" "}/ {maxSarga}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">{totalVerses} verses</p>
          </div>

          {/* IAST toggle */}
          <button
            type="button"
            onClick={onToggleItrans}
            aria-pressed={itransOn}
            className={cn(
              "mb-3 flex w-full items-center justify-between rounded-lg border px-3 py-2 text-xs font-medium transition-colors",
              itransOn
                ? "border-saffron/40 bg-saffron/10 text-saffron-dark dark:text-saffron"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            <span>IAST</span>
            <span
              className={cn(
                "flex h-4 w-7 items-center rounded-full px-0.5 transition-colors",
                itransOn ? "bg-saffron" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "h-3 w-3 shrink-0 rounded-full bg-white shadow-sm transition-transform duration-200",
                  itransOn ? "translate-x-3" : "translate-x-0"
                )}
              />
            </span>
          </button>

          {/* Verse jump */}
          <div className="mb-4">
            <label className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
              Go to verse
            </label>
            <input
              type="number"
              min={1}
              max={totalVerses}
              placeholder="—"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const n = parseInt(e.currentTarget.value, 10);
                  if (!Number.isNaN(n) && n >= 1 && n <= totalVerses) {
                    onVerseJump(n);
                    e.currentTarget.value = "";
                  }
                }
              }}
              className="w-full rounded-lg border border-border bg-background px-2.5 py-1.5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>

          {/* Prev / Next */}
          <div className="flex flex-col gap-1.5">
            {hasPrev ? (
              <Link
                href={`/kanda/${kandaSlug}/sarga/${sargaNumber - 1}/`}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs font-medium transition-colors hover:border-saffron/40 hover:bg-accent/50"
              >
                <ChevronIcon className="h-3 w-3 rotate-180" />
                Previous
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 rounded-lg border border-border/30 px-3 py-2 text-xs text-muted-foreground/40">
                <ChevronIcon className="h-3 w-3 rotate-180" />
                Previous
              </span>
            )}
            {hasNext ? (
              <Link
                href={`/kanda/${kandaSlug}/sarga/${sargaNumber + 1}/`}
                className="flex items-center gap-1.5 rounded-lg border border-border/60 px-3 py-2 text-xs font-medium transition-colors hover:border-saffron/40 hover:bg-accent/50"
              >
                Next
                <ChevronIcon className="h-3 w-3" />
              </Link>
            ) : (
              <span className="flex items-center gap-1.5 rounded-lg border border-border/30 px-3 py-2 text-xs text-muted-foreground/40">
                Next
                <ChevronIcon className="h-3 w-3" />
              </span>
            )}
          </div>

          <Link
            href={`/kanda/${kandaSlug}/`}
            className="mt-3 block text-center text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
          >
            All chapters
          </Link>

          {/* Keyboard hint */}
          <div className="mt-4 border-t border-border/40 pt-3">
            <p className="text-[0.6rem] leading-relaxed text-muted-foreground/60">
              <kbd className="rounded bg-muted px-1 font-mono">J</kbd>/
              <kbd className="rounded bg-muted px-1 font-mono">K</kbd> verses ·{" "}
              <kbd className="rounded bg-muted px-1 font-mono">←</kbd>/
              <kbd className="rounded bg-muted px-1 font-mono">→</kbd> sargas
            </p>
          </div>
        </div>
      </aside>

      {/* ── Mobile / tablet top bar (< xl) ───────────────────── */}
      <div className="sticky top-16 z-30 mb-6 flex items-center gap-2 rounded-xl border border-border/50 bg-background/90 px-3 py-2 backdrop-blur-md xl:hidden">
        <Link
          href={`/kanda/${kandaSlug}/`}
          className="truncate text-xs font-medium text-muted-foreground hover:text-foreground"
        >
          {kandaName}
        </Link>
        <span className="text-muted-foreground/40">·</span>
        <span className="text-xs font-semibold text-foreground">
          {sargaNumber}/{maxSarga}
        </span>

        <div className="ml-auto flex items-center gap-1.5">
          {hasPrev ? (
            <Link
              href={`/kanda/${kandaSlug}/sarga/${sargaNumber - 1}/`}
              className="rounded-lg border border-border/60 px-2 py-1 text-xs transition-colors hover:border-saffron/40"
              aria-label="Previous sarga"
            >
              ‹
            </Link>
          ) : (
            <span className="rounded-lg border border-border/30 px-2 py-1 text-xs text-muted-foreground/40">
              ‹
            </span>
          )}
          {hasNext ? (
            <Link
              href={`/kanda/${kandaSlug}/sarga/${sargaNumber + 1}/`}
              className="rounded-lg border border-border/60 px-2 py-1 text-xs transition-colors hover:border-saffron/40"
              aria-label="Next sarga"
            >
              ›
            </Link>
          ) : (
            <span className="rounded-lg border border-border/30 px-2 py-1 text-xs text-muted-foreground/40">
              ›
            </span>
          )}
          <button
            type="button"
            onClick={onToggleItrans}
            aria-pressed={itransOn}
            className={cn(
              "rounded-lg border px-2 py-1 text-[0.7rem] font-medium transition-colors",
              itransOn
                ? "border-saffron/40 bg-saffron/10 text-saffron-dark dark:text-saffron"
                : "border-border text-muted-foreground"
            )}
          >
            IAST
          </button>
        </div>
      </div>
    </>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      suppressHydrationWarning
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
