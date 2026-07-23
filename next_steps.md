# Valmiki Ramayana — Next Steps

## Current State

The project is a Next.js 16 application with:

- Six local Kaanda datasets
- 534 sargas
- 18,162 indexed verses
- Sanskrit text, transliteration, word meanings, and English translations
- Static sarga pages, search, dark mode, gallery, journey map, and responsive layouts

The existing codebase is a strong product baseline, but accessibility, reader interactions, content accuracy, and delivery performance should be addressed before adding larger features.

## Priority 1: Accessibility and Reading Experience

1. Add a skip-navigation link and a stable `main` landmark in `src/app/layout.tsx`.
2. Add proper labels and `htmlFor` associations to the chapter and verse jump controls.
3. Add `lang="sa"` to Devanagari Sanskrit and `lang="sa-Latn"` to transliterated text.
4. Convert journey-map waypoint groups into keyboard-operable controls with focus states and keyboard handlers.
5. Give search and gallery overlays `role="dialog"`, `aria-modal="true"`, focus trapping, and focus restoration.
6. Ensure all lightbox and map animations respect `prefers-reduced-motion`.

Primary files: `src/app/layout.tsx`, `src/components/ShlokaCard.tsx`, `src/components/SargaRail.tsx`, `src/components/SargaExplorer.tsx`, `src/components/SearchModal.tsx`, `src/components/GalleryLightbox.tsx`, and `src/components/JourneyMap.tsx`.

## Priority 2: Fix Reader Interaction Defects

1. Replace `window.location.href` in the search modal with Next.js client-side routing.
2. Make Enter-key search navigation behave exactly like clicking a result.
3. Expand a collapsed arc before executing a chapter jump in `SargaExplorer`.
4. Correct mobile `scroll-padding-top` and `scroll-margin-top` values for the sticky header and sarga rail.
5. Add visible focus and active states for verse anchors and navigation controls.

Primary files: `src/components/SearchModal.tsx`, `src/components/SargaExplorer.tsx`, `src/components/SargaRail.tsx`, and `src/app/globals.css`.

## Priority 3: Reconcile Content and Documentation

The repository currently contains 18,162 verses across 534 sargas, while the README and homepage describe the project as containing 24,000 verses. Confirm whether the difference is expected from the source material or indicates missing scraped content.

After confirming the source of truth:

1. Update `README.md` and homepage copy.
2. Add a data-validation script for Kaanda, sarga, and verse counts.
3. Validate required fields and detect duplicate or malformed verse anchors.
4. Document scraper provenance, rerun instructions, and known source limitations.

Primary files: `README.md`, `src/app/page.tsx`, `data/index.json`, `scripts/scraper.ts`, and `scripts/build-search-index.ts`.

## Priority 4: Performance and Asset Delivery

1. Reduce the 12 MB `public/search-index.json` payload through smaller fields, compression-friendly output, or partitioned loading.
2. Limit search results rendered at once and consider moving indexing work off the main thread if needed.
3. Remove duplicate Inter font delivery and load the required font files through `next/font` or a single local source.
4. Keep only the font formats and weights actually used by the interface.
5. Measure mobile performance, especially initial hero image loading, search startup, and long sarga pages.

Primary files: `scripts/build-search-index.ts`, `src/components/SearchModal.tsx`, `src/app/layout.tsx`, `src/app/globals.css`, and `public/search-index.json`.

## Priority 5: Maintainability and Release Quality

1. Consolidate the duplicated `usePrefersReducedMotion` hook into `src/lib/hooks/`.
2. Remove unused UI components or document why they remain.
3. Remove the remaining unnecessary ESLint suppression in `GalleryLightbox`.
4. Add automated tests for data validation, search routing, verse anchors, and navigation controls.
5. Add CI checks for linting, type checking, production builds, and accessibility smoke tests.

## Suggested Execution Order

1. Accessibility foundations and reader interaction fixes
2. Content-count decision and data validation
3. Search and font performance improvements
4. Hook/component cleanup
5. Automated tests, CI, and mobile performance verification

## Definition of Done

- Keyboard users can reach and operate every primary control.
- Search, chapter jumps, verse anchors, and overlays work without full-page reloads or hidden targets.
- Sanskrit and transliteration are correctly announced by assistive technologies.
- Public content counts match the verified dataset.
- Production lint, type checking, build, and accessibility checks pass.
