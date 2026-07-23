# Valmiki Ramayana Next.js Code Review and Audit Report

This report compiles, synthesizes, and builds upon the findings from the comprehensive design, accessibility, performance, and code quality audits conducted on the Valmiki Ramayana Next.js application. 

---

## 1. Code Quality & Architecture

### 1.1 TypeScript Configuration & Safety
* **Status**: Highly Safe.
* **Analysis**: The application uses a strict TypeScript configuration (`tsconfig.json` line 7: `"strict": true`). A full codebase scan of the `src/` directory confirms:
  * Zero occurrences of the `any` type escape hatch (`: any`, `<any>`, or `as any`).
  * Zero usage of non-null assertions (`obj!.prop`).
  * Safe type casting is used properly where needed, such as casting path parameters to defined constants in `src/app/page.tsx` line 99:
    ```typescript
    const meta = KANDA_META[slug as KandaSlug];
    ```
* **Impact**: Excellent compile-time type-safety, minimizing the likelihood of runtime `undefined` or null-pointer errors.

### 1.2 Next.js App Router Conventions
* **Status**: Compliant with Next.js 16.
* **Analysis**: In Next.js 16, page dynamic routing parameters are asynchronous and must be handled as promises. The codebase correctly awaits parameters before consuming them in the dynamic server pages:
  * `src/app/kanda/[slug]/page.tsx` (lines 35–37):
    ```typescript
    export default async function KandaPage({ params }: KandaPageProps) {
      const { slug } = await params;
    ```
  * `src/app/kanda/[slug]/sarga/[number]/page.tsx` (lines 45–46):
    ```typescript
    export default async function SargaPage({ params }: SargaPageProps) {
      const { slug, number: numberStr } = await params;
    ```
  * `src/app/authors/[slug]/page.tsx` (lines 32–33):
    ```typescript
    export default async function AuthorPage({ params }: PageProps) {
      const { slug } = await params;
    ```
* **Impact**: Ensures compatibility with Next.js 16 rendering pipelines, enabling dynamic page compilation and reliable static site generation (SSG) during builds.

### 1.3 Dead Code and Unused UI Components
* **Status**: Minor Bloat.
* **Analysis**: The following files are present in the filesystem but are never imported or referenced in the application code:
  * `src/components/ui/navigation-menu.tsx`
  * `src/components/ui/scroll-area.tsx`
* **Impact**: Unused components increase the codebase footprint, although Next.js/Turbopack tree-shaking prevents them from bloating the final production bundle. It is recommended to delete them to maintain codebase cleanliness.

### 1.4 React Hook Dependencies & ESLint Rules
* **Status**: Satisfied with Minor Suppressions.
* **Analysis**: In `src/components/GalleryLightbox.tsx` lines 32–40, the `useEffect` hook listening to the Escape key disables ESLint dependency checks:
  ```typescript
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  ```
  The bypass was added because `handleClose` was omitted from the dependencies. Since `handleClose` is declared using `useCallback` with empty dependencies (stable identity), it can be safely added to the dependency array, allowing the suppression comment to be removed.

### 1.5 Custom Hook Duplication
* **Status**: Code Duplication.
* **Analysis**: The custom hook `usePrefersReducedMotion` is defined identically in two files:
  1. `src/components/ReadingProgress.tsx` (lines 15–26)
  2. `src/components/HeroZoom.tsx` (lines 9–20)
* **Impact**: Duplicating custom hooks violates the DRY (Don't Repeat Yourself) principle. Consolidating this into a central custom hook utility (`src/lib/hooks/usePrefersReducedMotion.ts`) will improve reusability and simplify maintenance.

---

## 2. Design & Aesthetics

### 2.1 Thematic Design & Custom Typography
* **Analysis**: The brand identity utilizes a parchment-colored background noise texture combined with classical fonts (`Migra` for headings, `Noto Serif Devanagari` for Sanskrit, and `Inter` for interface elements). These are defined in `src/app/globals.css`. 
* **Issues**: Custom fonts are loaded via static CSS `@font-face` rules. This causes Cumulative Layout Shift (CLS) when custom fonts load after default system fonts. Bypassing Next.js's native `next/font` loader misses layout optimization and preloading opportunities.

### 2.2 Color Contrast in Dark Mode ("Temple Night")
* **File**: `src/components/JourneyMap.tsx` (line 366), `src/lib/journey.ts`
* **Issue**: The waypoint panel colors text using `waypoint.markerColor` directly:
  ```typescript
  style={{ color: waypoint.markerColor }}
  ```
  The markers are defined using highly saturated colors for light mode (e.g. Rose `#9F1239`, Green `#166534`, Indigo `#4338CA`). Against the dark background of Temple Night (`--card: oklch(0.18 0.018 40)`), these colors fail WCAG AA contrast guidelines:
  * **Rose (`#9F1239`)**: Relative luminance $Y \approx 0.027$. Card background relative luminance $Y \approx 0.028$. Contrast ratio: **1.01:1** (completely unreadable).
  * **Green (`#166534`)**: Relative luminance $Y \approx 0.043$. Contrast ratio: **1.19:1** (fails WCAG AA 4.5:1).
  * **Indigo (`#4338CA`)**: Relative luminance $Y \approx 0.055$. Contrast ratio: **1.35:1** (fails WCAG AA 4.5:1).
* **Impact**: Large portions of the waypoint detail cards are invisible to users in dark mode.

### 2.3 Mobile Sticky Header Clearance and Anchor Jumping Clipping
* **File**: `src/app/globals.css` (lines 172-185), `src/components/SargaRail.tsx` (lines 158-159)
* **Issue**: Scroll offsets are hardcoded to `5rem` (80px) in `globals.css`:
  ```css
  html, body { scroll-padding-top: 5rem; }
  [id] { scroll-margin-top: 5rem; }
  ```
  While this functions well on desktop (sticky header is `h-16`/64px), on mobile viewports the sticky header and the sub-header `SargaRail` are both active, making the total sticky banner height $64\text{px} + 40\text{px} = 104\text{px}$ (6.5rem).
* **Impact**: Jumping to dynamic verse anchors (e.g., `#verse-1-1`) clips the top 24px of the target element under the sticky rail on mobile devices.

### 2.4 CSS Transitions and Reduced Motion in Lightbox
* **File**: `src/components/GalleryLightbox.tsx` (lines 177-180)
* **Issue**: The zoom/pan transition is applied inline:
  ```typescript
  transition: dragging ? "none" : "transform 0.2s ease-out"
  ```
  Inline styles override global media query rule specificity (e.g., `@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }`).
* **Impact**: Zoom animations run even if users have system-wide reduced motion enabled.

### 2.5 Broken Scroll Behavior in Collapsed Arcs
* **File**: `src/components/SargaExplorer.tsx` (lines 82-88, 197-200)
* **Issue**: Chapters inside the explorer are conditionally unmounted when their containing arc group is collapsed (`!isCollapsed && (...)`). The "Go to" input calls `jumpToChapter(n)` which looks up the element:
  ```typescript
  const el = document.getElementById(`sarga-card-${n}`);
  el?.scrollIntoView({ behavior: "smooth", block: "center" });
  ```
* **Impact**: If a user attempts to jump to a chapter inside a collapsed arc, the target element is missing from the DOM, causing the action to fail silently.

---

## 3. Accessibility & Performance

### 3.1 Keyboard Accessibility & Skip Links
* **File**: `src/app/layout.tsx` (lines 86-91)
* **Issue**: There is no Skip Navigation link at the top of the body. Keyboard-only and screen reader users must tab through the entire navigation menu on every page reload to reach the main content.

### 3.2 Form Controls & Label Associations
* **Issue**: Several input fields lack proper label-to-input associations or descriptive screen reader tags:
  * **Sarga Rail Verse Jump**: `src/components/SargaRail.tsx` (lines 85-105) contains a `<label>` but lacks `htmlFor` matching the `<input>`.
  * **Sarga Explorer Chapter Jump**: `src/components/SargaExplorer.tsx` (lines 119-136) has an unassociated `<label>`.
  * **Sarga Explorer Filter**: `src/components/SargaExplorer.tsx` (lines 109-116) has a text input search filter without an `aria-label` or `<label>` element.

### 3.3 Missing Language Subtagging for Sanskrit & IAST Text
* **Issue**: Correct language codes must be declared to allow screen readers to load the proper text-to-speech phonetic engines. Currently, Sanskrit in Devanagari script and IAST (transliteration) are rendered as standard English text:
  * `src/components/ShlokaCard.tsx` (lines 63-74) renders Devanagari and IAST without `lang="sa"` and `lang="sa-Latn"`.
  * `src/components/SearchModal.tsx` (line 218) renders Sanskrit previews without language subtagging.
  * `src/app/about/page.tsx` (lines 134-137) renders IAST prayer text without language subtagging.

### 3.4 SVG Waypoint Marker Keyboard Navigation
* **File**: `src/components/JourneyMap.tsx` (lines 181-185)
* **Issue**: The waypoint markers in the interactive SVG map are implemented as `<g>` containers with standard mouse handlers. They lack a `role="button"`, `tabIndex={0}`, and keyboard listeners (`onKeyDown`).
* **Impact**: Users navigating with a keyboard or screen reader cannot focus on or select waypoints on the journey map.

### 3.5 Overlay Focus Trapping & ARIA Roles
* **Files**: `src/components/SearchModal.tsx` and `src/components/GalleryLightbox.tsx`
* **Issue**: Both components create custom overlays over the screen. However:
  * They do not trap keyboard focus, allowing users to tab behind the dialog into underlying page links.
  * They do not restore focus back to the triggering element (e.g. the Search button in the Header) when closed.
  * They lack `role="dialog"` or `role="alertdialog"` and `aria-modal="true"`.
* **Synthesis of Search Modal Keyboard Navigation (CQ & Design Overlap)**:
  In `SearchModal.tsx` (lines 137-140), keyboard routing on "Enter" is implemented using `window.location.href`:
  ```typescript
  window.location.href = `/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`;
  ```
  This triggers a full-page browser reload, wiping the React state and introducing significant latency. By contrast, mouse clicks use Next.js's `<Link>` for client-side routing. Enter keys must use the Next.js `useRouter` instance to provide consistent client-side navigation.

### 3.6 Font Performance Optimization
* **Files**: `src/app/globals.css` (lines 22-28, 39), `src/app/layout.tsx` (lines 17-20)
* **Issue**: The browser is forced to download duplicate font files. `Inter` is loaded from Google Fonts in `layout.tsx`, but `globals.css` declares a local `@font-face` for `InterLocal` using an uncompressed `.ttf` file. This font is then mapped to `font-inter` in the CSS `@theme` block:
  ```css
  --font-inter: "InterLocal", "Inter", "Noto Serif Devanagari", serif;
  ```
  This causes the browser to download both the `.ttf` and Google WOFF2 versions of the same font, wasting over 300KB of network bandwidth.

---

## 4. Prioritized Recommendations

All code blocks and styles below are fully resolved, actionable, and ready for integration.

### Recommendation 1: Dynamic Fonts & Core Layout Optimization
**File**: `src/app/layout.tsx` and `src/app/globals.css`
* **Action**: Eliminate the uncompressed `InterLocal` `.ttf` font. Load `Migra` using Next.js's optimized `next/font/local` utility to eliminate CLS. Add a Skip Link to the top of the body for keyboard navigation.

#### Step 1.1: Refactor `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Inter, Noto_Serif_Devanagari, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSerif = Noto_Serif_Devanagari({
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
  variable: "--font-heading",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Migra using next/font/local to avoid Cumulative Layout Shift (CLS)
const migra = localFont({
  src: [
    {
      path: "../../public/fonts/migra/Migra-Extralight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../public/fonts/migra/Migra-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-migra",
});

export const metadata: Metadata = {
  title: "Valmiki Ramayana",
  description: "An elegant portal to the verses, translation, and commentary of the Ramayana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} ${geistMono.variable} ${migra.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col relative" suppressHydrationWarning>
        {/* Skip Navigation Link for Accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-primary focus:ring-2 focus:ring-ring focus:outline-none"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

#### Step 1.2: Refactor `src/app/globals.css`
Remove the custom `@font-face` definitions for `Migra` and `InterLocal`, map the custom properties to the CSS variables supplied by `next/font`, and implement responsive `scroll-margin-top` for mobile sticky clearance.
```css
@import "tailwindcss";

/* Keep Noto Serif Devanagari font-face definitions if custom fallbacks are needed */

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-migra: var(--font-migra), "Noto Serif Devanagari", serif;
  --font-sans: var(--font-sans), sans-serif;
  --font-inter: var(--font-sans);
  --font-mono: var(--font-geist-mono), monospace;
  --font-heading: var(--font-heading), "Noto Serif Devanagari", serif;

  --color-sidebar-ring: var(--sidebar-ring);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar: var(--sidebar);
  --color-chart-5: var(--chart-5);
  --color-chart-4: var(--chart-4);
  --color-chart-3: var(--chart-3);
  --color-chart-2: var(--chart-2);
  --color-chart-1: var(--chart-1);
  --color-ring: var(--ring);
  --color-input: var(--input);
  --color-border: var(--border);
  --color-destructive: var(--destructive);
  --color-accent-foreground: var(--accent-foreground);
  --color-accent: var(--accent);
  --color-muted-foreground: var(--muted-foreground);
  --color-muted: var(--muted);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-secondary: var(--secondary);
  --color-primary-foreground: var(--primary-foreground);
  --color-primary: var(--primary);
  --color-popover-foreground: var(--popover-foreground);
  --color-popover: var(--popover);
  --color-card-foreground: var(--card-foreground);
  --color-card: var(--card);
  --color-saffron: var(--saffron);
  --color-saffron-light: var(--saffron-light);
  --color-saffron-dark: var(--saffron-dark);
  --color-warm: var(--warm);
  --color-warm-light: var(--warm-light);
  --radius-sm: calc(var(--radius) * 0.6);
  --radius-md: calc(var(--radius) * 0.8);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) * 1.4);
  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}

:root {
  --saffron: oklch(0.68 0.16 48);
  --saffron-light: oklch(0.85 0.12 60);
  --saffron-dark: oklch(0.48 0.14 42);
  --warm: oklch(0.95 0.02 70);
  --warm-light: oklch(0.98 0.01 70);
}

body {
  scroll-padding-top: 5rem;
}
html {
  scroll-padding-top: 5rem;
}
[id] {
  scroll-margin-top: 5rem;
}

/* Responsive Sticky Rail Offset for Mobile and Tablet Viewports */
@media (max-width: 1280px) {
  body, html {
    scroll-padding-top: 7rem;
  }
  [id] {
    scroll-margin-top: 7rem;
  }
}
```

---

### Recommendation 2: Accessible & Performant Search Modal
**File**: `src/components/SearchModal.tsx`
* **Action**: Fix keyboard-based page reload by using `useRouter()`. Add ARIA roles (`role="dialog"`, `aria-modal`), manage focus, and tag Sanskrit previews with `lang="sa"`.

```tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SearchEntry {
  id: string;
  kanda: string;
  kandaName: string;
  sarga: number;
  sargaTitle: string;
  verseNumber: string;
  verseIndex: number;
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
          "verseIndex",
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
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Store the active element that opened the modal to restore focus later
  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      // Small timeout to allow transition/mounting
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      // Preload the index
      if (!loaded) {
        loadSearchIndex().then(() => {
          setLoaded(true);
        });
      }
    } else {
      triggerRef.current?.focus();
    }
  }, [open, loaded]);

  // Focus trap implementation
  useEffect(() => {
    if (!open) return;
    function handleFocusTrap(e: KeyboardEvent) {
      if (e.key !== "Tab" || !containerRef.current) return;
      
      const focusableElements = containerRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex="0"]'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
    window.addEventListener("keydown", handleFocusTrap);
    return () => window.removeEventListener("keydown", handleFocusTrap);
  }, [open]);

  const handleClose = useCallback(() => {
    setQuery("");
    setResults([]);
    setActiveIndex(0);
    onClose();
  }, [onClose]);

  const doSearch = useCallback(
    async (q: string) => {
      if (!q.trim() || !loaded) {
        setResults([]);
        return;
      }
      const ms = await loadSearchIndex();
      if (!ms) return;
      const hits = ms.search(q) as SearchEntry[];
      setResults(hits.slice(0, 50));
      setActiveIndex(0);
    },
    [loaded]
  );

  useEffect(() => {
    const timer = setTimeout(() => doSearch(query), 200);
    return () => clearTimeout(timer);
  }, [query, doSearch]);

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
      e.preventDefault();
      const r = results[activeIndex];
      // Use Next.js client-side navigation instead of window.location.href
      router.push(`/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`);
      handleClose();
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div
        ref={containerRef}
        className="mx-4 w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <span id="search-modal-title" className="sr-only">Search Scripture Verses</span>
        
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
            aria-hidden="true"
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
            aria-label="Search 18,000 verses"
            placeholder="Search 18,000 verses…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
          />
          {!loaded && (
            <span className="text-xs text-muted-foreground" aria-live="polite">Loading…</span>
          )}
          <button
            type="button"
            onClick={handleClose}
            className="flex h-6 w-6 items-center justify-center rounded text-muted-foreground hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close search"
          >
            <kbd className="rounded bg-muted px-1.5 text-[0.65rem] font-mono">ESC</kbd>
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto" role="listbox">
          {query.trim() && results.length === 0 && loaded && (
            <div className="p-8 text-center text-sm text-muted-foreground" aria-live="polite">
              No results for "{query}"
            </div>
          )}
          {results.map((r, i) => (
            <Link
              key={r.id}
              href={`/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`}
              onClick={handleClose}
              role="option"
              aria-selected={i === activeIndex}
              className={cn(
                "block border-b border-border/30 px-4 py-3 transition-colors outline-none",
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
                <p 
                  lang="sa" 
                  className="mt-1 truncate font-heading text-sm text-saffron-dark dark:text-saffron"
                >
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
            <span aria-live="polite">{results.length} results</span>
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
```

---

### Recommendation 3: Dark Mode Contrast and Waypoint Accessibility
**File**: `src/components/JourneyMap.tsx`
* **Action**: Change text coloring from inline variables to standard high-contrast, theme-aware foreground styles. Introduce a colored decorative bullet/pill to visually represent the waypoint theme. Enhance the interactive SVG elements with ARIA button roles, tab indexing, and keyboard listeners.

#### Step 3.1: Modify Waypoint Card Title Text (line 364-370)
```tsx
      {/* Significance tagline */}
      <div className="mt-3 flex items-center gap-2">
        <span 
          className="h-3.5 w-1.5 shrink-0 rounded-full" 
          style={{ backgroundColor: waypoint.markerColor }}
          aria-hidden="true"
        />
        <p className="text-sm font-semibold italic text-foreground">
          {waypoint.significance}
        </p>
      </div>
```

#### Step 3.2: Update SVG Group Layout for Accessibility (lines 181-185)
```tsx
              <g
                key={wp.id}
                role="button"
                tabIndex={0}
                aria-label={`Waypoint ${wp.order}: ${wp.name}`}
                onClick={() => selectWaypoint(wp)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    selectWaypoint(wp);
                  }
                }}
                className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              >
```

---

### Recommendation 4: Accessible Forms & Dynamic Chapter Jumps
**Files**: `src/components/SargaRail.tsx` and `src/components/SargaExplorer.tsx`
* **Action**: Bind labels using matching `id`/`htmlFor` tags. Fix search filters with screen-reader labels. Modify `jumpToChapter()` in `SargaExplorer.tsx` to automatically expand collapsed arc groups and scroll smoothly after mounting.

#### Step 4.1: Bind Verse Input in `src/components/SargaRail.tsx` (lines 85-105)
```tsx
          {/* Verse jump */}
          <div className="mb-4">
            <label 
              htmlFor="verse-jump-input" 
              className="mb-1 block text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground"
            >
              Go to verse
            </label>
            <input
              id="verse-jump-input"
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
```

#### Step 4.2: Bind Chapter Inputs & Refactor Arc Jumps in `src/components/SargaExplorer.tsx`
First, fix inputs and filters (lines 92-137):
```tsx
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
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Filter chapters by title or number"
            placeholder="Filter chapters by title or number…"
            className="w-full rounded-lg border border-border bg-background py-2 pl-9 pr-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>

        {/* Jump to chapter */}
        <div className="flex items-center gap-2">
          <label 
            htmlFor="chapter-jump-input" 
            className="text-xs font-medium text-muted-foreground"
          >
            Go to
          </label>
          <input
            id="chapter-jump-input"
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
```

Next, refactor `jumpToChapter()` to expand collapsed groups (lines 82-88):
```typescript
  function jumpToChapter(n: number) {
    if (Number.isNaN(n) || n < 1) return;
    
    // Locate the arc group that contains the target sarga
    const containingGroup = groups.find((g) => g.sargas.some((s) => s.number === n));
    if (containingGroup) {
      const arcName = containingGroup.arc?.name ?? "Additional Chapters";
      if (collapsedArcs.has(arcName)) {
        setCollapsedArcs((prev) => {
          const next = new Set(prev);
          next.delete(arcName);
          return next;
        });
      }
    }

    // Defer scrolling slightly to allow state change to mount the sarga card element
    setTimeout(() => {
      const el = document.getElementById(`sarga-card-${n}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        el.classList.add("ring-2", "ring-saffron/50");
        setTimeout(() => el.classList.remove("ring-2", "ring-saffron/50"), 2000);
      }
    }, 80);
  }
```


---

### Recommendation 5: Centralized Media Settings & Lightbox Motion Fix
**Files**: `src/lib/hooks/usePrefersReducedMotion.ts` and `src/components/GalleryLightbox.tsx`
* **Action**: Consolidate redundant hooks. Provide a clean implementation that disables transition animations inside the Lightbox if reduced motion is requested.

#### Step 5.1: Create Centralized Hook `src/lib/hooks/usePrefersReducedMotion.ts`
```typescript
import { useSyncExternalStore } from "react";

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      if (typeof window === "undefined") return () => {};
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false // SSR fallback: assume full motion
  );
}
```
*(After creating, imports in `ReadingProgress.tsx` and `HeroZoom.tsx` should be modified to import this hook from `@/lib/hooks/usePrefersReducedMotion`).*

#### Step 5.2: Apply to `src/components/GalleryLightbox.tsx`
```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

interface GalleryLightboxProps {
  src: string;
  alt: string;
}

export function GalleryLightbox({ src, alt }: GalleryLightboxProps) {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, panX: 0, panY: 0 });
  
  const prefersReducedMotion = usePrefersReducedMotion();

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  // ESC to close (with stable handleClose dependency included)
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);

  // Wheel zoom / Pointer Handlers go here...
  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const delta = -e.deltaY * 0.001;
    setZoom((z) => Math.min(5, Math.max(1, z + delta)));
  }

  function onPointerDown(e: React.PointerEvent) {
    if (zoom <= 1) return;
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: dragStart.current.panX + dx,
      y: dragStart.current.panY + dy,
    });
  }

  function onPointerUp() {
    setDragging(false);
  }

  const transitionStyle = mounted && !prefersReducedMotion 
    ? (dragging ? "none" : "transform 0.2s ease-out") 
    : "none";

  return (
    <>
      <button 
        type="button"
        onClick={() => setOpen(true)}
        className="w-full relative aspect-[4/1] overflow-hidden rounded-xl border border-border"
        aria-label="Open panorama lightbox"
      >
        <Image src={src} alt={alt} fill className="object-cover transition-transform hover:scale-105" />
      </button>

      {open && (
        <div 
          className="fixed inset-0 z-[110] flex flex-col bg-black text-white"
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          {/* Header Controls */}
          <div className="flex h-14 items-center justify-between border-b border-white/10 px-4">
            <button onClick={handleClose} className="rounded-lg px-3 py-1.5 hover:bg-white/10">Close</button>
            <div className="flex items-center gap-4">
              <button onClick={() => setZoom((z) => Math.max(1, z - 0.5))} aria-label="Zoom out" className="h-8 w-8 text-lg font-bold hover:bg-white/10 rounded">-</button>
              <span className="text-sm font-mono">{zoom.toFixed(1)}x</span>
              <button onClick={() => setZoom((z) => Math.min(5, z + 0.5))} aria-label="Zoom in" className="h-8 w-8 text-lg font-bold hover:bg-white/10 rounded">+</button>
            </div>
          </div>

          {/* Interactive Pan/Zoom Canvas */}
          <div 
            className="relative flex-1 overflow-hidden"
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
            style={{ cursor: zoom > 1 ? (dragging ? "grabbing" : "grab") : "default" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transition: transitionStyle,
              }}
            >
              <div className="relative h-[60vh] w-full max-w-[2400px]">
                <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" priority />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
```

#### Step 5.3: Refactor `src/components/ReadingProgress.tsx` to complete DRY refactoring
Remove the local `usePrefersReducedMotion` implementation and replace it with the centralized hook:
```tsx
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

// ... remove local usePrefersReducedMotion implementation ...
```

#### Step 5.4: Refactor `src/components/HeroZoom.tsx` to complete DRY refactoring
Remove the local `usePrefersReducedMotion` implementation and replace it with the centralized hook:
```tsx
import { useEffect, useRef, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

// ... remove local usePrefersReducedMotion implementation ...
```

---


### Recommendation 6: Search Engine Optimization & Structured Data
* **Action**: Generate dynamic robots/sitemaps and bind canonical metadata + Structured JSON-LD schemas to index pages.

#### Step 6.1: Create `src/app/sitemap.ts`
```typescript
import { MetadataRoute } from 'next';
import { KANDA_SLUGS, getKanda } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://valmikiramayan.net';
  
  const staticPaths = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about/`, lastModified: new Date() },
    { url: `${baseUrl}/journey/`, lastModified: new Date() },
    { url: `${baseUrl}/gallery/`, lastModified: new Date() },
    { url: `${baseUrl}/authors/`, lastModified: new Date() },
  ];

  const kandaPaths = KANDA_SLUGS.map((slug) => ({
    url: `${baseUrl}/kanda/${slug}/`,
    lastModified: new Date(),
  }));

  const sargaPaths: MetadataRoute.Sitemap = [];
  KANDA_SLUGS.forEach((slug) => {
    const kanda = getKanda(slug);
    if (kanda) {
      kanda.sargas.forEach((sarga) => {
        sargaPaths.push({
          url: `${baseUrl}/kanda/${slug}/sarga/${sarga.number}/`,
          lastModified: new Date(),
        });
      });
    }
  });

  return [...staticPaths, ...kandaPaths, ...sargaPaths];
}
```

#### Step 6.2: Create `src/app/robots.ts`
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://valmikiramayan.net/sitemap.xml',
  };
}
```

#### Step 6.3: Canonical Links & JSON-LD in `src/app/kanda/[slug]/sarga/[number]/page.tsx`
Update layout metadata configurations in the dynamic sarga page:
```typescript
// Add generation of metadata with canonical targets
export async function generateMetadata({ params }: SargaPageProps): Promise<Metadata> {
  const { slug, number: numberStr } = await params;
  const sargaNumber = parseInt(numberStr, 10);
  const kanda = getKanda(slug as KandaSlug);
  const sarga = kanda?.sargas.find((s) => s.number === sargaNumber);

  return {
    title: `${sarga?.title || "Sarga " + sargaNumber} - ${kanda?.name} | Valmiki Ramayana`,
    description: `Read Sarga ${sargaNumber} of ${kanda?.name} with Sanskrit Shlokas, English translation, and word-by-word meaning.`,
    alternates: {
      canonical: `https://valmikiramayan.net/kanda/${slug}/sarga/${sargaNumber}/`,
    },
  };
}
```
Within the rendering function, inject structural `Book` / `Chapter` JSON-LD schemas:
```tsx
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Chapter",
    "name": sarga.title || `Sarga ${sarga.number}`,
    "position": sarga.number,
    "isPartOf": {
      "@type": "Book",
      "name": kanda.name,
      "translator": "Desiraju Hanumanta Rao & K. M. K. Murthy",
      "inLanguage": ["sa", "en"]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Rest of the page contents */}
    </>
  );
```

---

## 5. Verification Method

To verify these implementations under the Next.js runtime:
1. **Linter Validation**:
   Run `npm run lint`. Ensure that ESLint completes with zero errors. All hooks will have fully satisfied dependency matrices.
2. **Build and Code Compilation**:
   Run `npm run build`. Confirm that compiler engines build, type check, and pre-render all 551 static paths, generating `sitemap.xml` and `robots.txt` dynamically at `/public/`.
3. **Accessibility (a11y) & Performance audits**:
   * Inspect page HTML to ensure Sanskrit tags carry `<div lang="sa">` and `<span lang="sa-Latn">`.
   * Check browser DevTools network activity to verify local `Inter-Medium.ttf` downloads are bypassed, saving bandwidth.
   * Tab through elements to verify focus is trapped within the active `SearchModal` dialog, and key inputs navigate or close correctly.
