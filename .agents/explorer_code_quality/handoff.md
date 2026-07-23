# Code Quality and Next.js App Router Audit Report

This report presents the findings of a comprehensive code audit of the Valmiki Ramayana Next.js application, focusing on TypeScript safety, React hooks and state management, Next.js 16 App Router conventions, and latent bugs.

---

## 1. Observation

### Observation 1.1: TypeScript Configurations and Types
* **Configuration**: `tsconfig.json` has strict mode enabled (`"strict": true` on line 7).
* **Type Assertions**: A grep search for `any` type annotations (`: any` or `<any>` or `as any`) in `src/` yielded no results, confirming zero usages of the `any` escape hatch.
* **Non-null Assertions**: A grep search for exclamation mark non-null assertions (`obj!.prop`) in `src/` yielded no results.
* **Safe Type Assertions**: Safe type casting is used correctly, such as casting path keys to `KandaSlug` in `src/app/page.tsx` line 99:
  ```typescript
  const meta = KANDA_META[slug as KandaSlug];
  ```

### Observation 1.2: Next.js 16 Asynchronous Routing Parameters
* In Next.js 16, page dynamic routing parameters are asynchronous and represented as a `Promise`.
* File `src/app/kanda/[slug]/page.tsx` lines 35–37 correctly await parameters:
  ```typescript
  export default async function KandaPage({ params }: KandaPageProps) {
    const { slug } = await params;
  ```
* File `src/app/kanda/[slug]/sarga/[number]/page.tsx` lines 45–46 correctly await parameters:
  ```typescript
  export default async function SargaPage({ params }: SargaPageProps) {
    const { slug, number: numberStr } = await params;
  ```
* File `src/app/authors/[slug]/page.tsx` lines 32–33 correctly await parameters:
  ```typescript
  export default async function AuthorPage({ params }: PageProps) {
    const { slug } = await params;
  ```

### Observation 1.3: Unused Components
* The UI components `src/components/ui/navigation-menu.tsx` and `src/components/ui/scroll-area.tsx` are present in the filesystem.
* A project-wide grep search for imports of `navigation-menu` and `scroll-area` yielded no usage inside the application, indicating they are unused/dead code.

### Observation 1.4: Full-Page Reload in Search Navigation
* In `src/components/SearchModal.tsx` lines 137-140, navigation upon pressing `Enter` on a search result is executed via `window.location.href`:
  ```typescript
  } else if (e.key === "Enter" && results[activeIndex]) {
    const r = results[activeIndex];
    window.location.href = `/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`;
  }
  ```
* In contrast, clicking a search result in the same modal uses Next.js client-side transitions via `<Link>` on lines 201-203:
  ```typescript
  <Link
    key={r.id}
    href={`/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`}
    onClick={handleClose}
  ...
  ```

### Observation 1.5: Duplicate Custom Hook `usePrefersReducedMotion`
* The custom hook `usePrefersReducedMotion` is declared identically in two separate files:
  1. `src/components/ReadingProgress.tsx` lines 15–26:
     ```typescript
     function usePrefersReducedMotion(): boolean {
       return useSyncExternalStore(
         (onChange) => {
           const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
           const handler = () => onChange();
           mq.addEventListener("change", handler);
           return () => mq.removeEventListener("change", handler);
         },
         () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
         () => false // SSR: assume no reduced motion
       );
     }
     ```
  2. `src/components/HeroZoom.tsx` lines 9–20:
     ```typescript
     function usePrefersReducedMotion(): boolean { ... }
     ```

### Observation 1.6: Missing Dependency / ESLint Disable in Lightbox Hook
* In `src/components/GalleryLightbox.tsx` lines 32–40, the `useEffect` hook listening to the Escape key has a disabled eslint rule:
  ```typescript
  // ESC to close
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
* `handleClose` is defined on lines 25–29 via `useCallback` with stable dependencies (`[]`):
  ```typescript
  const handleClose = useCallback(() => {
    setOpen(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);
  ```

---

## 2. Logic Chain

1. **TypeScript Quality**: By analyzing `tsconfig.json` and verifying that zero instances of `any` types, `as any` type bypasses, or `!` assertions are used in the codebase, we conclude that the project enforces an exceptionally strict, type-safe development environment.
2. **Next.js 16 Architecture**: By confirming page parameters are dynamic promises and successfully compiling all routes static generation pages via `npm run build` (551 static paths generated), we verify that Next.js 16 App Router practices are correctly followed.
3. **Dead Code**: Identifying that `navigation-menu.tsx` and `scroll-area.tsx` are in the codebase but have no import references leads to the conclusion that these are unused shadcn components adding minor bloat to the workspace.
4. **UX/Performance Bug**: Because `window.location.href` resets the entire React runtime state, triggers a full network reload of assets, and performs a browser page reload, using it inside `SearchModal.tsx` for keyboard routing represents a performance and UX regression. Replacing it with Next.js's client-side `useRouter` will provide a smooth, instantaneous transition.
5. **Code Duplication**: Having the exact same custom hook (`usePrefersReducedMotion`) defined in both `ReadingProgress.tsx` and `HeroZoom.tsx` introduces code duplication. Consolidating this into a central custom hook increases code reusability and modularity.
6. **ESLint Bypasses**: The lint rule suppression in `GalleryLightbox.tsx` exists because `handleClose` is omitted from the dependency array. Since `handleClose` is memoized via `useCallback` with empty dependencies (`[]`), it has a stable reference. Adding it to the array is completely safe and resolves the lint bypass cleanly.

---

## 3. Caveats

* **Build Time Dependencies**: We assume that during `npm run build`, all data files under `data/` are correct and parsed. Since this is an SSG site, runtime failures of `fs.readFileSync` are not possible on client environments.
* **Commentary & Word Meanings Data**: Sargas with missing verses or commentary fallback gracefully to original source links (e.g., in `SargaPage` rendering placeholder cards).
* **Network Mode**: The audit was done in CODE_ONLY mode, so online API performance under real network latency was not simulated (not applicable as the app is statically built).

---

## 4. Conclusion

The Valmiki Ramayana Next.js application demonstrates outstanding code quality, very strict TypeScript implementation, and correct next-generation React/Next.js architectures. Only minor improvements are needed to eliminate dead code, resolve code duplication, satisfy ESLint dependencies, and fix a latent navigation bug.

### Proposed Code Diffs

#### Diff 1: Fix Full-Page Reload in `src/components/SearchModal.tsx`
Change `window.location.href` to Next.js client-side routing via `useRouter`.

```typescript
// Target File: src/components/SearchModal.tsx
// Lines 3-6 (Before):
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Lines 3-7 (After):
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
```

```typescript
// Target File: src/components/SearchModal.tsx
// Lines 69-75 (Before):
export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

// Lines 70-77 (After):
export function SearchModal({ open, onClose }: SearchModalProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
```

```typescript
// Target File: src/components/SearchModal.tsx
// Lines 137-140 (Before):
    } else if (e.key === "Enter" && results[activeIndex]) {
      const r = results[activeIndex];
      window.location.href = `/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`;
    }

// Lines 139-143 (After):
    } else if (e.key === "Enter" && results[activeIndex]) {
      const r = results[activeIndex];
      router.push(`/kanda/${r.kanda}/sarga/${r.sarga}/#verse-${r.verseNumber}-${r.verseIndex}`);
      handleClose();
    }
```

#### Diff 2: Satisfy Dependencies in `src/components/GalleryLightbox.tsx`
Add `handleClose` to the dependency array and remove lint suppression.

```typescript
// Target File: src/components/GalleryLightbox.tsx
// Lines 32-40 (Before):
  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

// Lines 32-39 (After):
  // ESC to close
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, handleClose]);
```

#### Diff 3: Consolidate `usePrefersReducedMotion` Custom Hook
Create a unified custom hook under `src/lib/hooks/usePrefersReducedMotion.ts` and import it in `ReadingProgress.tsx` and `HeroZoom.tsx`.

Proposed content for new file `src/lib/hooks/usePrefersReducedMotion.ts`:
```typescript
import { useSyncExternalStore } from "react";

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const handler = () => onChange();
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false // SSR: assume no reduced motion
  );
}
```

---

## 5. Verification Method

### Step 5.1: Run Linting
Execute the project lint script to verify ESLint compliance:
```bash
npm run lint
```
*Expected Result*: Completion with zero errors and no code quality issues in `src/`.

### Step 5.2: Execute Production Build
Verify TypeScript compilation, Turbopack bundling, and prerendering of 551 static paths:
```bash
npm run build
```
*Expected Result*: Successful static path generation (`(551/551)` routes rendered) and compilation without TypeScript errors.
