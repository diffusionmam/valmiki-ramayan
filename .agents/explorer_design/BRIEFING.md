# BRIEFING — 2026-07-09T13:32:00+05:30

## Mission
Audit the Design, Aesthetics, and UI/UX of the Valmiki Ramayana Next.js application, focusing on premium aesthetic, responsiveness, dark mode, transitions, and accessibility.

## 🔒 My Identity
- Archetype: Explorer
- Roles: UI/UX Auditor, Design Investigator
- Working directory: `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/.agents/explorer_design`
- Original parent: `9fcfbacc-bd7f-41ea-9922-ea660fc59f1a`
- Milestone: Design and UI/UX Audit

## 🔒 Key Constraints
- Read-only investigation — do NOT implement source changes (write reports/analysis/handoffs only)
- Focus strictly on design, styling, color harmony, responsiveness, transitions, typography, and contrast accessibility

## Current Parent
- Conversation ID: `9fcfbacc-bd7f-41ea-9922-ea660fc59f1a`
- Updated: 2026-07-09T13:32:00+05:30

## Investigation State
- **Explored paths**: `src/app/globals.css`, `src/app/layout.tsx`, `src/components/ThemeToggle.tsx`, `src/components/Header.tsx`, `src/components/SargaReader.tsx`, `src/components/ShlokaCard.tsx`, `src/components/Reveal.tsx`, `src/lib/hooks/useInView.ts`, `src/components/HeroZoom.tsx`, `src/components/ReadingProgress.tsx`, `src/components/SargaRail.tsx`, `src/components/JourneyMap.tsx`, `src/lib/journey.ts`, `src/app/page.tsx`, `src/components/KandaCard.tsx`, `src/components/KandaGlyph.tsx`, `src/components/Ornament.tsx`, `src/components/SearchModal.tsx`, `src/components/GalleryLightbox.tsx`, `src/app/gallery/page.tsx`, `src/app/journey/page.tsx`, `src/app/kanda/[slug]/page.tsx`, `src/app/kanda/[slug]/sarga/[number]/page.tsx`
- **Key findings**:
  1. **Color Contrast Violations in Journey Map**: The significance tagline in `JourneyMap`'s details panel uses hardcoded dark colors (e.g. indigo, green, rose) which have very low contrast (under 2:1) in dark mode, making the text unreadable.
  2. **Obscured Anchor Jumps on Mobile**: Combined sticky header + sarga-rail height is ~104px on mobile, but `scroll-margin-top` is only 80px (5rem), resulting in the top 24px of verses being cut off upon anchor jumping.
  3. **Full Page Reloads in Keyboard Search**: Pressing 'Enter' in `SearchModal` redirects using `window.location.href` instead of client-side routing, causing unnecessary hard reloads and slowing down UX.
  4. **Reduced Motion Discrepancy in Lightbox**: In `GalleryLightbox`, the transition style is hardcoded inline and doesn't respect `prefers-reduced-motion` settings.
  5. **Broken Jump-to-Chapter in Collapsed Arcs**: The "Go to" input in `SargaExplorer` fails if the target chapter resides inside a collapsed arc because the card is not mounted in the DOM.
  6. **Performant Rendering and Elegant Theming**: Beautiful typography (Migra and Inter), paper grain texture, custom SVG icons with draw-on-reveal, and smooth scroll transitions. Excellent GPU-friendly parallax zooms.
- **Unexplored areas**: None.

## Key Decisions Made
- Audited color contrast via OKLCH calculations for both light and dark themes.
- Checked responsiveness, mobile layout parameters, and keyboard interaction flows.
- Audited scroll performance (throttle mechanisms in scroll listeners).

## Artifact Index
- `/home/atharva/projects/valmiki-ramayan/valmiki-ramayan/.agents/explorer_design/handoff.md` — Final audit report
