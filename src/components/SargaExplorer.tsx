"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { KandaArc } from "@/lib/kanda-arcs";
import { Reveal } from "@/components/Reveal";

interface SargaExplorerProps {
  kandaSlug: string;
  sargas: Array<{
    number: number;
    title: string;
    verseCount: number;
  }>;
  arcs: KandaArc[];
}

interface SargaItem {
  number: number;
  title: string;
  verseCount: number;
}

interface ArcGroup {
  arc: KandaArc | null;
  sargas: SargaItem[];
}

export function SargaExplorer({ kandaSlug, sargas, arcs }: SargaExplorerProps) {
  const [filter, setFilter] = useState("");
  const [collapsedArcs, setCollapsedArcs] = useState<Set<string>>(new Set());

  // Group sargas into arcs (or a single "All Chapters" group if no arcs)
  const groups: ArcGroup[] = useMemo(() => {
    if (arcs.length === 0) {
      return [{ arc: null, sargas }];
    }

    const mapped: ArcGroup[] = arcs.map((arc) => ({
      arc,
      sargas: sargas.filter((s) => s.number >= arc.start && s.number <= arc.end),
    }));

    // Catch any sargas not covered by an arc
    const covered = new Set<number>();
    arcs.forEach((arc) => {
      for (let n = arc.start; n <= arc.end; n++) covered.add(n);
    });
    const orphans = sargas.filter((s) => !covered.has(s.number));
    if (orphans.length > 0) {
      mapped.push({ arc: null, sargas: orphans });
    }

    return mapped;
  }, [sargas, arcs]);

  // Filter sargas within each group
  const filteredGroups = useMemo(() => {
    if (!filter.trim()) return groups;
    const q = filter.toLowerCase();
    return groups.map((g) => ({
      ...g,
      sargas: g.sargas.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          String(s.number).includes(q) ||
          (g.arc && g.arc.name.toLowerCase().includes(q))
      ),
    }));
  }, [groups, filter]);

  function toggleArc(name: string) {
    setCollapsedArcs((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  function jumpToChapter(n: number) {
    if (Number.isNaN(n) || n < 1) return;
    const el = document.getElementById(`sarga-card-${n}`);
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
    el?.classList.add("ring-2", "ring-saffron/50");
    setTimeout(() => el?.classList.remove("ring-2", "ring-saffron/50"), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Controls bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Filter */}
        <div className="relative flex-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50"
            suppressHydrationWarning
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter chapters by title or number…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Jump to chapter */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground">
            Go to
          </label>
          <input
            type="number"
            min={1}
            max={sargas.length}
            placeholder="—"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                jumpToChapter(parseInt(e.currentTarget.value, 10));
                e.currentTarget.value = "";
              }
            }}
            className="w-20 rounded-lg border border-border bg-background px-2.5 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
      </div>

      {/* Arc groups */}
      <div className="space-y-6">
        {filteredGroups.map((group, gi) => {
          const arcName = group.arc?.name ?? "Additional Chapters";
          const isCollapsed = collapsedArcs.has(arcName);
          const sargaCount = group.sargas.length;
          const verseCount = group.sargas.reduce((s, x) => s + x.verseCount, 0);

          if (filter.trim() && sargaCount === 0) return null;

          return (
            <Reveal key={arcName} delay={gi * 60}>
              <div className="rounded-xl border border-border/40 bg-card/30 overflow-hidden">
                {/* Arc header */}
                <button
                  type="button"
                  onClick={() => toggleArc(arcName)}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition-colors hover:bg-accent/30"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      className={cn(
                        "shrink-0 text-muted-foreground transition-transform",
                        !isCollapsed && "rotate-90"
                      )}
                      suppressHydrationWarning
                    >
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">
                        {arcName}
                      </h3>
                      {group.arc && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {group.arc.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 text-right text-xs text-muted-foreground">
                    {group.arc && (
                      <span className="mr-3 text-muted-foreground/60">
                        Sargas {group.arc.start}–{group.arc.end}
                      </span>
                    )}
                    {sargaCount} chapters · {verseCount.toLocaleString()} verses
                  </div>
                </button>

                {/* Sarga cards */}
                {!isCollapsed && (
                  <div className="border-t border-border/30 p-3">
                    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {group.sargas.map((sarga) => (
                        <Link
                          key={sarga.number}
                          id={`sarga-card-${sarga.number}`}
                          href={`/kanda/${kandaSlug}/sarga/${sarga.number}/`}
                          className="group flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3 transition-all duration-200 hover:border-saffron/40 hover:bg-accent/40 hover:shadow-sm"
                        >
                          <div className="kanda-glyph-color flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-saffron/10 font-heading text-sm font-bold">
                            {sarga.number}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                              {sarga.title}
                            </p>
                            {sarga.verseCount > 0 && (
                              <p className="text-xs text-muted-foreground">
                                {sarga.verseCount} verses
                              </p>
                            )}
                          </div>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary"
                            suppressHydrationWarning
                          >
                            <path d="m9 18 6-6-6-6" />
                          </svg>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>

      {filter.trim() &&
        filteredGroups.every((g) => g.sargas.length === 0) && (
          <div className="rounded-xl border border-border/40 bg-card p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No chapters match &ldquo;{filter}&rdquo;.
            </p>
          </div>
        )}
    </div>
  );
}
