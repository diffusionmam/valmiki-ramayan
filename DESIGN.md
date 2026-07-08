---
name: Srimad Valmiki Ramayana
description: A reverent digital reading home for the complete Valmiki Ramayana — warm parchment, saffron ink, temple-night dark.
colors:
  temple-saffron: "oklch(0.72 0.16 65)"
  deep-saffron: "oklch(0.45 0.12 45)"
  warm-parchment: "oklch(0.98 0.008 75)"
  parchment-surface: "oklch(0.97 0.006 75)"
  temple-ink: "oklch(0.18 0.02 50)"
  warm-border: "oklch(0.88 0.02 70)"
  muted-stone: "oklch(0.50 0.02 50)"
  saffron-tint: "oklch(0.92 0.025 65)"
  focus-saffron: "oklch(0.60 0.10 45)"
  temple-night: "oklch(0.14 0.015 40)"
  night-surface: "oklch(0.18 0.018 40)"
  moonlight: "oklch(0.92 0.01 70)"
  kanda-bala: "oklch(0.72 0.15 68)"
  kanda-ayodhya: "oklch(0.50 0.13 255)"
  kanda-aranya: "oklch(0.52 0.11 150)"
  kanda-kishkindha: "oklch(0.58 0.12 55)"
  kanda-sundara: "oklch(0.55 0.12 210)"
  kanda-yuddha: "oklch(0.52 0.18 25)"
typography:
  display:
    fontFamily: "Noto Serif Devanagari, Noto Serif, Georgia, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Noto Serif Devanagari, Noto Serif, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Noto Serif Devanagari, Noto Serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.08em"
  verse-sanskrit:
    fontFamily: "Noto Serif Devanagari, Noto Serif, Georgia, serif"
    fontSize: "1.15rem"
    fontWeight: 400
    lineHeight: 2.1
    letterSpacing: "0.025em"
  verse-itrans:
    fontFamily: "Noto Serif, Georgia, Times New Roman, serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.9
    letterSpacing: "0.01em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  4xl: "26px"
  pill: "9999px"
components:
  button-primary:
    backgroundColor: "{colors.deep-saffron}"
    textColor: "{colors.warm-parchment}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    height: "32px"
    padding: "10px"
  button-primary-hover:
    backgroundColor: "oklch(0.40 0.12 45)"
    textColor: "{colors.warm-parchment}"
    rounded: "{rounded.lg}"
  button-outline:
    backgroundColor: "{colors.warm-parchment}"
    textColor: "{colors.temple-ink}"
    rounded: "{rounded.lg}"
    padding: "10px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.temple-ink}"
    rounded: "{rounded.lg}"
    padding: "10px"
  card:
    backgroundColor: "{colors.parchment-surface}"
    textColor: "{colors.temple-ink}"
    rounded: "{rounded.xl}"
    padding: "16px"
  badge-secondary:
    backgroundColor: "oklch(0.94 0.015 75)"
    textColor: "oklch(0.25 0.03 50)"
    typography: "{typography.label}"
    rounded: "{rounded.4xl}"
    padding: "1px 8px"
  hero-cta:
    backgroundColor: "color-mix(in oklch, {colors.temple-saffron} 10%, transparent)"
    textColor: "{colors.deep-saffron}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  verse-plaque:
    backgroundColor: "color-mix(in oklch, {colors.temple-saffron} 5%, transparent)"
    textColor: "{colors.deep-saffron}"
    typography: "{typography.verse-sanskrit}"
    rounded: "12px"
    padding: "24px 20px"
---

# Design System: Srimad Valmiki Ramayana

## 1. Overview

**Creative North Star: "The Temple Manuscript"**

This is the visual system for a digital home of a sacred text. The feeling is of opening a treasured manuscript in a quiet temple hall: warm parchment, saffron ink, and reverent whitespace. The verse is always the hero; ornament is devotion around it, never decoration competing with it. The palette is a single warm parchment ground with one signature accent — saffron — used sparingly so its rarity carries the reverence. Depth is conveyed by tonal layering and hairline rings, not by shadows; a soft saffron glow appears only as a response to state (hover, focus, reading progress), never as ambient furniture.

The system is **dual-themed**: a Warm Parchment light mode for daytime reading and a Temple Night dark mode for quiet, low-light study. Both are first-class; dark mode is not an inversion afterthought but a curated "temple at night" with saffron promoted to a glowing primary against a deep warm near-black. A per-book accent system gives each of the six Kaandas its own hue, used only on that book's surfaces — a narrative color device, not a second brand palette.

**What this system explicitly rejects:** the cluttered, dated table-of-links Web-1.0 aesthetic of the legacy valmikiramayan.net; generic SaaS / startup landing-page clichés (cream cards, gradient hero metrics, corporate product-marketing feel — this is a sacred text, not a thing being sold); and over-ornate wedding-invitation kitsch (excessive gold filigree, heavy borders, clip-art motifs, skeuomorphic parchment-scroll effects). Ornament that decorates the chrome cheapens the sacred; a single well-placed ornament is the reverent move.

**Key Characteristics:**
- Warm Parchment ground + single Saffron accent, used sparingly (≤ ~10% of any screen).
- Dual-theme: Warm Parchment (light) / Temple Night (dark), both curated.
- Noto Serif Devanagari carries all Sanskrit and display headings — the soul of the system.
- Per-Kanda accent hues, scoped to each book's surfaces only.
- Flat by default; tonal layering + hairline rings for depth; saffron glow on state only.
- Manuscript-plaque verse typography with a faint rule beneath each shloka.
- Motion is reverent, not theatrical: slow ease-out reveals, glyph draw-on, no bounce.
- Reading ergonomics are sacred: 65ch prose, verse line-height 2.1, reduced-motion honored everywhere.

## 2. Colors: The Temple Palette

A single warm parchment ground with one signature saffron accent, plus a per-book hue system for narrative color. All values are OKLCH; the project is OKLCH-only.

### Primary
- **Temple Saffron** (`oklch(0.72 0.16 65)`): the signature accent. Used on the Om mark, ornament dividers, verse rules, focus rings (via `--saffron`), the hero CTA border/fill tint, kanda glyph color, and the reading-progress bar. The single most recognizable brand color. Rare by design.
- **Deep Saffron** (`oklch(0.45 0.12 45)`): `--primary` and `--saffron-dark`. The primary button fill, the verse Sanskrit text color in light mode, the "Begin reading" CTA text, the logo wordmark. A sindoor-deep saffron that carries weight without shouting.

### Neutral
- **Warm Parchment** (`oklch(0.98 0.008 75)`): `--background`. The body ground — a near-white with the faintest warm tilt toward the saffron hue (chroma 0.008, not a cream). The whole reading surface.
- **Parchment Surface** (`oklch(0.97 0.006 75)`): `--card`. One tonal step darker than the ground; cards and the footer sit on it.
- **Temple Ink** (`oklch(0.18 0.02 50)`): `--foreground`. The body and heading text color — a deep warm brown-black, never pure neutral gray.
- **Warm Border** (`oklch(0.88 0.02 70)`): `--border`. Hairline borders and dividers, warm-tinted to belong to the parchment.
- **Muted Stone** (`oklch(0.50 0.02 50)`): `--muted-foreground`. **Metadata only** — nav secondary text, timestamps, the verse "#" copy button. Never for reading content (see The Muted-Stone Rule).
- **Saffron Tint** (`oklch(0.92 0.025 65)`): `--accent`. Hover/active surface tint for nav and controls; a breath of saffron in a near-neutral.
- **Focus Saffron** (`oklch(0.60 0.10 45)`): `--ring`. The keyboard focus ring color.

### Tertiary — The Six Kaanda Hues
Each book carries its own accent via `--kanda-accent`, set by a `.kanda-{slug}` class on that book's surfaces. Used for the kanda glyph, the hover accent bar, the corner accent wash, and the hero glow variant — never as a second global brand color.
- **Balarka Saffron** (`oklch(0.72 0.15 68)`) — Bala Kanda, Book of Youth.
- **Coronation Indigo** (`oklch(0.50 0.13 255)`) — Ayodhya Kanda, Book of Ayodhya.
- **Dandaka Green** (`oklch(0.52 0.11 150)`) — Aranya Kanda, Book of the Forest.
- **Vanara Amber** (`oklch(0.58 0.12 55)`) — Kishkindha Kanda.
- **Hanuman Ocean** (`oklch(0.55 0.12 210)`) — Sundara Kanda, Book of Beauty.
- **War Vermillion** (`oklch(0.52 0.18 25)`) — Yuddha Kanda, Book of War.

### Dark Theme — Temple Night
The dark theme inverts the ground to **Temple Night** (`oklch(0.14 0.015 40)`, `--background`) — a deep warm near-black, never neutral zinc. **Night Surface** (`oklch(0.18 0.018 40)`, `--card`) is one step lighter. Text becomes **Moonlight** (`oklch(0.92 0.01 70)`). The key move: **Temple Saffron is promoted to `--primary`** in dark mode, so it glows against the deep ground rather than receding. Deep Saffron demotes to `--saffron-dark` at `oklch(0.85 0.12 65)` for light-on-dark accents. Borders become a 10% white overlay (`oklch(1 0 0 / 10%)`). The paper-grain texture lifts to `opacity: 0.06` with `overlay` blend.

### Named Rules
**The One Saffron Rule.** Temple Saffron is the single brand accent. It appears on ≤ ~10% of any given screen — the Om mark, one ornament, one rule, one focus ring. Its rarity is the point. If two saffron elements compete, remove one.

**The Per-Kanda Hue Rule.** Each Kaanda's accent hue is set via `--kanda-accent` on a `.kanda-{slug}` wrapper and used **only** on that book's surfaces (glyph, hover bar, corner wash, hero glow). It is a narrative device, never a second global accent. Do not mix kanda hues on a single surface.

**The Muted-Stone Rule.** Muted Stone (`oklch(0.50 0.02 50)`) is for **metadata only** — nav secondary text, the verse "#" copy affordance, kicker labels. It sits at ~4.0:1 on Warm Parchment, **below** the 4.5:1 body-text target. Reading content (verse translation, word-meaning, descriptions, body copy) must use Temple Ink or a darker shade. If a text is meant to be read, not glanced at, it is never Muted Stone.

## 3. Typography

**Display Font:** Noto Serif Devanagari (fallback: Noto Serif, Georgia, serif)
**Body Font:** Inter (fallback: system-ui, sans-serif)
**Mono Font:** Geist Mono (fallback: monospace)
**Verse Transliteration Font:** Noto Serif (fallback: Georgia, Times New Roman, serif)

**Character:** A devotional-script serif carries every Sanskrit verse and every display heading — the same family renders the sacred text and the page titles, so the page and the verse speak in one voice. Inter handles the English body, UI, and navigation with quiet humanist clarity, stepping back so the serif commands. The pairing contrasts on the serif/sans axis, not on two competing serifs.

### Hierarchy
- **Display** (700, `clamp(2.25rem, 5vw, 3.75rem)`, 1.1, `-0.02em`): The hero title "Srimad Valmiki Ramayana" and page-level h1s. Noto Serif Devanagari. `text-wrap: balance` on h1–h3.
- **Headline** (700, `clamp(1.5rem, 3vw, 1.875rem)`, 1.2, `-0.01em`): Section headings ("The Six Kaandas", "About This Project"). Noto Serif Devanagari.
- **Title** (600, `1.25rem`, 1.3): Card titles and kanda names. Noto Serif Devanagari.
- **Body** (400, `1rem`, 1.625): English prose, descriptions, nav. Inter. Reading prose capped at 65–75ch (`.prose-custom` = 65ch).
- **Label** (600, `0.7rem`, 1.4, `0.08em`, uppercase): The `.verse-label` — verse section markers ("Word Meaning", "Translation"). Inter. **Not** a section eyebrow; see The Label-Not-Eyebrow Rule.
- **Verse Sanskrit** (400, `1.15rem` mobile / `1.3rem` ≥640px, 2.1, `0.025em`): The Devanagari shloka itself, on the manuscript plaque. Noto Serif Devanagari. Color Deep Saffron (light) / Temple Saffron (dark). A faint gradient rule sits beneath each verse via `::after`.
- **Verse ITRANS** (400 italic, `1rem`, 1.9, `0.01em`): Romanized transliteration, centered, Muted Stone. Noto Serif italic.
- **Verse Meaning** (400 italic, `1rem`, 1.8): Word-by-word meaning, Muted Stone italic. **Audit note:** this is reading content in Muted Stone — candidate for a contrast bump per The Muted-Stone Rule.
- **Verse Translation** (400, `1rem`, 1.8): English translation, Temple Ink (foreground).

### Named Rules
**The Devanagari-First Rule.** Noto Serif Devanagari renders every Sanskrit verse **and** every display/headline/title. The page and the verse share one voice. Inter is for English body and UI only. Never set Sanskrit in Inter, and never set an English display heading in a different serif.

**The Verse-Breathes Rule.** Verse Sanskrit uses `line-height: 2.1` and `letter-spacing: 0.025em`. Verses are read aloud and chanted; give the script room to breathe. Never compress verse leading to body proportions for "density".

**The Label-Not-Eyebrow Rule.** The `.verse-label` (0.7rem, 600, `0.08em`, uppercase, with a leading saffron dot) is a verse-section marker **only** — "Word Meaning", "Translation", a verse number. It is **not** a section eyebrow. Do not put a tiny uppercase tracked kicker above every section heading ("ABOUT", "PROCESS", "PRICING"). One named kicker system inside the verse is voice; eyebrows on every section is AI grammar.

## 4. Elevation

**Flat by default.** This system does not use structural shadows. Depth is conveyed three ways: **tonal layering** (Parchment Surface is one OKLCH step darker than the Warm Parchment ground; Night Surface one step lighter than Temple Night), **hairline rings** (cards use `ring-1 ring-foreground/10` — a 1px foreground-tinted ring, not a border, not a shadow), and **a saffron-tinted glow that appears only on state** (hover, focus, the reading-progress fill). The sticky header uses `backdrop-blur-xl` + `bg-background/80` — purposeful glass for legibility over scrolling content, not decorative glassmorphism.

### Shadow Vocabulary
- **Hover Saffron Glow** (`box-shadow` via Tailwind `hover:shadow-lg hover:shadow-saffron/10`): appears on KandaCard hover only. A large, very soft, saffron-tinted lift. Never at rest.
- **Reading-Progress Glow** (`box-shadow: 0 1px 4px oklch(0.72 0.16 65 / 30%)`): the saffron progress bar's faint glow at the top of the viewport. State-only.
- **Header Backdrop** (`backdrop-blur-xl` + `bg-background/80`): the sticky header. Functional glass for reading-over-scroll, not a card aesthetic.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows and glows appear only as a response to state (hover, focus, active progress). If a card casts a shadow at rest, it is wrong.

**The Saffron-Glow-Only Rule.** The only colored glow in the system is saffron (`oklch(0.72 0.16 65)` at low alpha). No neutral drop shadows, no colored glows in other hues. Depth-glow is always saffron and always state-triggered.

## 5. Components

Components are **refined and restrained** — they step back so the verse commands attention. Hairline borders, quiet hovers, no loud fills.

### Buttons
- **Shape:** gently curved (`rounded-lg`, 10px); icon buttons square at `size-8`.
- **Primary:** Deep Saffron fill (`--primary`), Warm Parchment text, 32px height, 10px horizontal padding, `text-sm` medium. Hover darkens slightly (`bg-primary/80`). Focus: `ring-3 ring-ring/50` in Focus Saffron.
- **Outline / Ghost:** transparent or Warm Parchment fill, Temple Ink text, hover lifts to Saffron Tint (`--accent`). Used for nav and secondary actions.
- **Hero CTA (signature):** not a button primitive — a `rounded-full` pill with a `saffron/40` border, `saffron/10` tint fill, Deep Saffron text, `12px 24px` padding, and a trailing chevron. The pill shape + saffron tint is the brand's primary invitation, used once per page.

### Cards / Containers
- **Corner Style:** `rounded-xl` (14px).
- **Background:** Parchment Surface (`--card`), one tonal step darker than the ground.
- **Definition:** `ring-1 ring-foreground/10` (a hairline ring, not a border, not a shadow).
- **Internal Padding:** `p-4` default, `p-6`/`p-8` for verse cards.
- **KandaCard (signature featured card):** extends Card with a per-kanda accent: a `kanda-accent-bar` at the top that scales in on hover, a `kanda-accent-wash` corner gradient, a hand-line-art KandaGlyph in the kanda hue, and `hover:-translate-y-1` lift + the Hover Saffron Glow. The six-card grid is differentiated by per-book hue + glyph, so it is **not** the banned identical-card grid.

### Verse Plaque (signature)
The manuscript surface for a Sanskrit shloka. A `12px`-rounded tile with a 5% saffron `color-mix` wash, `24px 20px` padding, centered text. Corner flourishes via `::before`/`::after` (16px saffron hairline brackets, `opacity 0.25`). The Sanskrit verse in Verse Sanskrit type, with a faint saffron gradient rule (`::after`, 60% width, fading at both ends) beneath it. Transliteration sits below in Verse ITRANS. This is the heart of the reading surface.

### Ornament Divider (signature)
A centered SVG flourish (lotus / kalasha / mandala / diamond / torana) flanked by saffron gradient rules fading to transparent. Used **sparingly** — once in the hero, once at a major transition. Never as a default section separator.

### KandaGlyph (signature)
Hand-crafted line-art SVGs for the six books (bow, throne, tree, vanara, wave, swords), 48×48 viewBox, `strokeWidth 1.4`, `currentColor` so they inherit the kanda hue. Optional `glyph-draw` animates the strokes in via `stroke-dashoffset` on reveal. Stroke-based so they draw-on-reveal and tint per-book.

### Navigation (Header)
Sticky, `h-16` (64px), `z-50`, `border-b border-border/60`, `bg-background/80 backdrop-blur-xl`. Om mark + "Valmiki Ramayana" wordmark (Noto Serif Devanagari, Deep Saffron) with a Devanagari subtitle. Desktop nav: text-sm medium links with `rounded-lg` hover to Saffron Tint; a "Kaandas" dropdown with per-book glyphs; a search trigger (`⌘K`) and theme toggle. Mobile: condensed controls + a slide-down menu. `z-60` for the reading-progress bar that sits below it.

### Reading Progress Bar
Fixed, `top-4rem` (below the header), `h-3px`, a `linear-gradient` from Deep Saffron to Temple Saffron with the Reading-Progress Glow. Width tracks scroll, `transition: width 0.1s linear`, disabled under reduced motion. State-only elevation.

### Badge
`rounded-4xl` (26px, near-pill), `text-xs` medium, `h-5`. Secondary variant (Warm Parchment-tinted surface, dark warm text) used for "Book N" markers on KandaCards.

## 6. Do's and Don'ts

### Do:
- **Do** keep Temple Saffron to ≤ ~10% of any screen — one Om mark, one ornament, one rule, one focus ring. Its rarity carries the reverence (The One Saffron Rule).
- **Do** set Sanskrit verses **and** display headings in Noto Serif Devanagari. The page and the verse share one voice (The Devanagari-First Rule).
- **Do** give verse Sanskrit `line-height: 2.1` and `letter-spacing: 0.025em`. Verses are chanted; let them breathe (The Verse-Breathes Rule).
- **Do** scope each Kaanda's accent hue via `.kanda-{slug}` + `--kanda-accent`, on that book's surfaces only (The Per-Kanda Hue Rule).
- **Do** keep surfaces flat at rest; reserve the saffron glow for hover/focus/progress state (The Flat-By-Default Rule).
- **Do** define cards with `ring-1 ring-foreground/10` (a hairline ring), not a drop shadow.
- **Do** use the `.verse-label` only for verse-section markers (Word Meaning, Translation, verse number), never as a section eyebrow (The Label-Not-Eyebrow Rule).
- **Do** honor `prefers-reduced-motion` everywhere — reveals, glyph-draw, and the progress bar all have instant/crossfade alternatives (already implemented in `globals.css`).
- **Do** use OKLCH for every color value. The project is OKLCH-only.
- **Do** cap reading prose at 65–75ch (`.prose-custom` = 65ch) and use `text-wrap: balance` on h1–h3, `text-wrap: pretty` on long prose.

### Don't:
- **Don't** use Muted Stone (`oklch(0.50 0.02 50)`) for reading content — verse translation, word-meaning, descriptions, or body copy. It sits at ~4.0:1 on Warm Parchment, below the 4.5:1 body-text target. Reading content uses Temple Ink (The Muted-Stone Rule). The verse `.verse-meaning` is a known candidate for a contrast bump.
- **Don't** reproduce the legacy valmikiramayan.net — cluttered, dated table-of-links Web-1.0 with no reading rhythm or atmosphere.
- **Don't** ship generic SaaS / startup landing clichés — cream cards in a grid, gradient hero metric tiles, corporate product-marketing feel. This is a sacred text, not a thing being sold.
- **Don't** use over-ornate wedding-invitation kitsch — excessive gold filigree, heavy borders, clip-art motifs, skeuomorphic parchment-scroll effects. Ornament that decorates the chrome cheapens the sacred.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored side-stripe accent on cards, list items, or callouts. The kanda accent uses a full-width top bar (`kanda-accent-bar`) and a corner wash, never a side stripe.
- **Don't** use `background-clip: text` with a gradient (gradient text). Emphasis comes from weight or size in a single solid color.
- **Don't** use glassmorphism decoratively. The header's `backdrop-blur` is functional (legibility over scroll), not a card aesthetic.
- **Don't** put a tiny uppercase tracked eyebrow above every section. The `.verse-label` is a verse-section marker, not a section kicker (The Label-Not-Eyebrow Rule).
- **Don't** set Sanskrit in Inter, or an English display heading in a different serif. The Devanagari-first pairing is non-negotiable.
- **Don't** mix two kanda hues on a single surface, or promote a kanda hue to a global accent. They are narrative, per-book only.
