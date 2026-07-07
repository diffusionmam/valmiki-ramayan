"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchEntry {
  id: string;
  kanda: string;
  kandaName: string;
  sarga: number;
  sargaTitle: string;
  verseNumber: string;
  sanskrit: string;
  translation: string;
}

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
}

// Lazy-loaded MiniSearch instance + data
let miniSearchInstance: { search: (q: string) => SearchEntry[] } | null = null;
let loadPromise: Promise<{ search: (q: string) => SearchEntry[] } | null> | null = null;

async function loadSearchIndex(): Promise<{ search: (q: string) => SearchEntry[] } | null> {
  if (miniSearchInstance) return miniSearchInstance;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    try {
      const { default: MiniSearch } = await import("minisearch");
      const res = await fetch("/search-index.json");
      const entries: SearchEntry[] = await res.json();

      const ms = new MiniSearch({
        fields: ["sanskrit", "translation", "verseNumber"],
        storeFields: [
          "kanda",
          "kandaName",
          "sarga",
          "sargaTitle",
          "verseNumber",
          "sanskrit",
          "translation",
        ],
        searchOptions: {
          prefix: true,
          fuzzy: 0.2,
          boost: { translation: 2, sanskrit: 1.5 },
        },
      });

      ms.addAll(entries);
      miniSearchInstance = ms as unknown as { search: (q: string) => SearchEntry[] };
      return miniSearchInstance;
    } catch (e) {
      console.error("Failed to load search index:", e);
      return null;
    }
  })();

  return loadPromise;
}

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClose = useCallback(() => {
    setQuery("");
    setResults([]);
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      // Preload the index
      if (!loaded) {
        loadSearchIndex().then(() => {
          setLoaded(true);
        });
      }
    }
  }, [open, loaded]);

  // Perform search on query change
  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim() || !loaded) {
        setResults([]);
        return;
      }
      const ms = await loadSearchIndex();
      if (!ms) return;
      const hits = ms.search(q).slice(0, 20) as SearchEntry[];
      setResults(hits);
      setActiveIndex(0);
    },
    [loaded]
  );

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

  // Keyboard navigation within modal
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      handleClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      const r = results[activeIndex];
      window.location.href = `/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${activeIndex}`;
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20"
      onClick={handleClose}
    >
      <div
        className="mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-muted-foreground"
            suppressHydrationWarning
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search 18,000 verses…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          {!loaded && (
            <span className="text-xs text-muted-foreground">Loading…</span>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground"
            aria-label="Close search"
          >
            <kbd className="rounded bg-muted px-1.5 text-[0.65rem] font-mono">ESC</kbd>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim() && results.length === 0 && loaded && (
            <div className="p-8 text-center text-sm text-muted-foreground">
              {loaded
                ? `No results for "${query}"`
                : "Loading search index…"}
            </div>
          )}
          {results.map((r, i) => (
            <Link
              key={r.id}
              href={`/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${i}`}
              onClick={handleClose}
              className={cn(
                "block border-b border-border/30 px-4 py-3 transition-colors",
                i === activeIndex ? "bg-accent" : "hover:bg-accent/50"
              )}
            >
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{r.kandaName}</span>
                <span>·</span>
                <span>Sarga {r.sarga}</span>
                <span>·</span>
                <span className="font-mono">{r.verseNumber}</span>
              </div>
              {r.sanskrit && (
                <p className="mt-1 truncate font-heading text-sm text-saffron-dark dark:text-saffron">
                  {r.sanskrit.replace(/\n/g, " ")}
                </p>
              )}
              {r.translation && (
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {r.translation}
                </p>
              )}
            </Link>
          ))}
        </div>

        {/* Footer */}
        {results.length > 0 && (
          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <span>{results.length} results</span>
            <span className="flex items-center gap-2">
              <kbd className="rounded bg-muted px-1 font-mono">↑↓</kbd> navigate
              <kbd className="rounded bg-muted px-1 font-mono">↵</kbd> open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
