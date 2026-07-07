"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useInView } from "@/lib/hooks/useInView";
import {
  JOURNEY_WAYPOINTS,
  ROUTE_PATH,
  RIVERS,
  REGIONS,
  type JourneyWaypoint,
} from "@/lib/journey";
import { KandaGlyph } from "@/components/KandaGlyph";
import { KANDA_META } from "@/lib/kanda-meta";

export function JourneyMap() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  const [active, setActive] = useState<JourneyWaypoint | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  function selectWaypoint(wp: JourneyWaypoint) {
    setActive(wp);
    // Auto-scroll panel into view on mobile
    if (panelRef.current && window.innerWidth < 1024) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }

  return (
    <div ref={ref} className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
      {/* ── Map ──────────────────────────────────────────────── */}
      <div className="journey-map-container relative overflow-hidden rounded-2xl border-2 border-border/30 bg-gradient-to-br from-amber-50/40 to-stone-100/30 dark:from-stone-900/40 dark:to-stone-800/20">
        <svg
          viewBox="0 0 1000 700"
          className="h-full w-full"
          role="img"
          aria-label="Ancient map of India showing the Ramayan journey from Ayodhya to Lanka"
        >
          {/* ── Faint grid (cartographic) ─────────────────── */}
          <g opacity="0.06">
            {[100, 200, 300, 400, 500, 600, 700, 800, 900].map((x) => (
              <line key={`v${x}`} x1={x} y1="40" x2={x} y2="660" stroke="currentColor" strokeWidth="0.5" suppressHydrationWarning />
            ))}
            {[100, 200, 300, 400, 500, 600].map((y) => (
              <line key={`h${y}`} x1="40" y1={y} x2="960" y2={y} stroke="currentColor" strokeWidth="0.5" suppressHydrationWarning />
            ))}
          </g>

          {/* ── Ocean background ──────────────────────────── */}
          <rect x="0" y="0" width="1000" height="700" fill="color-mix(in oklch, #3b82f6 3%, transparent)" suppressHydrationWarning />

          {/* ── India landmass (detailed peninsula) ───────── */}
          <path
            d="M 280 90
               C 320 80, 380 85, 440 95
               C 500 88, 560 100, 610 120
               C 660 140, 700 160, 730 200
               C 745 240, 740 280, 730 320
               C 720 360, 700 400, 680 440
               C 670 470, 660 500, 650 530
               C 640 555, 620 575, 600 580
               C 575 578, 555 565, 535 550
               C 510 530, 485 510, 460 495
               C 430 480, 400 470, 380 460
               C 355 445, 335 420, 320 390
               C 305 355, 295 320, 290 280
               C 285 240, 280 195, 275 150
               C 273 125, 276 105, 280 90 Z"
            fill="color-mix(in oklch, #f59e0b 5%, var(--card))"
            stroke="color-mix(in oklch, #92400e 30%, transparent)"
            strokeWidth="1.5"
            suppressHydrationWarning
          />

          {/* ── Himalayan arc (top) ───────────────────────── */}
          <path
            d="M 260 85 C 320 65, 400 60, 480 70 C 560 62, 640 72, 700 95"
            fill="none"
            stroke="color-mix(in oklch, #64748b 40%, transparent)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            suppressHydrationWarning
          />

          {/* ── Lanka island ──────────────────────────────── */}
          <ellipse
            cx="850"
            cy="565"
            rx="60"
            ry="42"
            fill="color-mix(in oklch, #f59e0b 7%, var(--card))"
            stroke="color-mix(in oklch, #92400e 30%, transparent)"
            strokeWidth="1.5"
            suppressHydrationWarning
          />

          {/* ── Rivers ────────────────────────────────────── */}
          {RIVERS.map((river) => (
            <g key={river.name}>
              <path
                d={river.path}
                fill="none"
                stroke="color-mix(in oklch, #3b82f6 35%, transparent)"
                strokeWidth="1.5"
                strokeLinecap="round"
                suppressHydrationWarning
              />
              <text
                x={parseFloat(river.path.match(/M\s+([\d.]+)/)?.[1] ?? "0") + 15}
                y={parseFloat(river.path.match(/M\s+[\d.]+\s+([\d.]+)/)?.[1] ?? "0") - 5}
                fontSize="9"
                fill="color-mix(in oklch, #3b82f6 50%, transparent)"
                fontStyle="italic"
                suppressHydrationWarning
              >
                {river.name}
              </text>
            </g>
          ))}

          {/* ── Region labels (faint italic) ──────────────── */}
          {REGIONS.map((region) => (
            <text
              key={region.name}
              x={region.x}
              y={region.y}
              fontSize="13"
              fill="currentColor"
              opacity="0.12"
              fontStyle="italic"
              textAnchor="middle"
              className="font-heading"
              suppressHydrationWarning
            >
              {region.name}
            </text>
          ))}

          {/* ── Ocean labels ──────────────────────────────── */}
          <text x="200" y="400" fontSize="12" fill="color-mix(in oklch, #3b82f6 25%, transparent)" fontStyle="italic" textAnchor="middle" suppressHydrationWarning>Arabian Sea</text>
          <text x="780" y="350" fontSize="12" fill="color-mix(in oklch, #3b82f6 25%, transparent)" fontStyle="italic" textAnchor="middle" suppressHydrationWarning>Bay of Bengal</text>
          <text x="760" y="640" fontSize="11" fill="color-mix(in oklch, #3b82f6 25%, transparent)" fontStyle="italic" textAnchor="middle" suppressHydrationWarning>Indian Ocean</text>

          {/* ── Ram Setu (dotted bridge) ──────────────────── */}
          <line
            x1="650"
            y1="565"
            x2="790"
            y2="565"
            stroke="color-mix(in oklch, #475569 50%, transparent)"
            strokeWidth="2"
            strokeDasharray="3 4"
            suppressHydrationWarning
          />

          {/* ── Route path (muted slate, dashed) ──────────── */}
          <path
            d={ROUTE_PATH}
            fill="none"
            stroke="color-mix(in oklch, #475569 50%, var(--card))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="6 4"
            strokeDashoffset={inView ? "0" : "3000"}
            style={{ transition: "stroke-dashoffset 4s cubic-bezier(0.16, 1, 0.3, 1)" }}
            suppressHydrationWarning
          />

          {/* ── Waypoint markers ──────────────────────────── */}
          {JOURNEY_WAYPOINTS.map((wp) => {
            const isActive = active?.id === wp.id;
            return (
              <g
                key={wp.id}
                onClick={() => selectWaypoint(isActive ? wp : wp)}
                className="cursor-pointer"
              >
                {/* Pulse ring for active */}
                {isActive && (
                  <circle
                    cx={wp.x}
                    cy={wp.y}
                    r="14"
                    fill="none"
                    stroke={wp.markerColor}
                    strokeWidth="2"
                    opacity="0.5"
                    suppressHydrationWarning
                  >
                    <animate attributeName="r" values="10;18;10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Outer ring (white) */}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r={isActive ? "8" : "6"}
                  fill="var(--card)"
                  stroke={wp.markerColor}
                  strokeWidth="2.5"
                  style={{ transition: "r 0.2s" }}
                  suppressHydrationWarning
                />
                {/* Inner dot (colored) */}
                <circle
                  cx={wp.x}
                  cy={wp.y}
                  r={isActive ? "4" : "3"}
                  fill={wp.markerColor}
                  style={{ transition: "r 0.2s" }}
                  suppressHydrationWarning
                />
                {/* Number badge */}
                <text
                  x={wp.x}
                  y={wp.y - 14}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill={wp.markerColor}
                  suppressHydrationWarning
                >
                  {wp.order}
                </text>
                {/* Name label (shown on hover/active) */}
                <text
                  x={wp.x}
                  y={wp.y + 22}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="currentColor"
                  opacity={isActive ? "1" : "0.5"}
                  className="font-heading"
                  style={{ transition: "opacity 0.2s" }}
                  suppressHydrationWarning
                >
                  {wp.name}
                </text>
              </g>
            );
          })}

          {/* ── Compass rose (bottom-left) ────────────────── */}
          <g transform="translate(80, 620)">
            <circle cx="0" cy="0" r="28" fill="none" stroke="color-mix(in oklch, #92400e 25%, transparent)" strokeWidth="1" suppressHydrationWarning />
            <circle cx="0" cy="0" r="22" fill="none" stroke="color-mix(in oklch, #92400e 15%, transparent)" strokeWidth="0.5" suppressHydrationWarning />
            {/* N pointer */}
            <path d="M 0 -22 L -5 0 L 0 -5 L 5 0 Z" fill="color-mix(in oklch, #92400e 40%, transparent)" suppressHydrationWarning />
            {/* S pointer */}
            <path d="M 0 22 L -5 0 L 0 5 L 5 0 Z" fill="color-mix(in oklch, #92400e 20%, transparent)" suppressHydrationWarning />
            <text x="0" y="-30" textAnchor="middle" fontSize="10" fontWeight="700" fill="color-mix(in oklch, #92400e 50%, transparent)" suppressHydrationWarning>N</text>
            <text x="0" y="38" textAnchor="middle" fontSize="9" fill="color-mix(in oklch, #92400e 30%, transparent)" suppressHydrationWarning>S</text>
            <text x="-32" y="4" textAnchor="middle" fontSize="9" fill="color-mix(in oklch, #92400e 30%, transparent)" suppressHydrationWarning>W</text>
            <text x="32" y="4" textAnchor="middle" fontSize="9" fill="color-mix(in oklch, #92400e 30%, transparent)" suppressHydrationWarning>E</text>
          </g>

          {/* ── Decorative border frame ───────────────────── */}
          <rect x="20" y="20" width="960" height="660" fill="none" stroke="color-mix(in oklch, #92400e 20%, transparent)" strokeWidth="1.5" rx="8" suppressHydrationWarning />
          <rect x="26" y="26" width="948" height="648" fill="none" stroke="color-mix(in oklch, #92400e 12%, transparent)" strokeWidth="0.5" rx="6" suppressHydrationWarning />

          {/* Corner ornaments */}
          {[
            { cx: 26, cy: 26 },
            { cx: 974, cy: 26 },
            { cx: 26, cy: 674 },
            { cx: 974, cy: 674 },
          ].map((c, i) => (
            <circle key={i} cx={c.cx} cy={c.cy} r="4" fill="color-mix(in oklch, #92400e 25%, transparent)" suppressHydrationWarning />
          ))}
        </svg>
      </div>

      {/* ── Side detail panel ────────────────────────────────── */}
      <div ref={panelRef} className="journey-panel lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
        {active ? (
          <ActiveWaypoint
            waypoint={active}
            onClose={() => setActive(null)}
            onPrev={() => {
              const prev = JOURNEY_WAYPOINTS.find((w) => w.order === active.order - 1);
              if (prev) selectWaypoint(prev);
            }}
            onNext={() => {
              const next = JOURNEY_WAYPOINTS.find((w) => w.order === active.order + 1);
              if (next) selectWaypoint(next);
            }}
          />
        ) : (
          <DefaultPanel onSelect={selectWaypoint} />
        )}
      </div>
    </div>
  );
}

// ── Active waypoint detail card ──────────────────────────────
function ActiveWaypoint({
  waypoint,
  onClose,
  onPrev,
  onNext,
}: {
  waypoint: JourneyWaypoint;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const meta = KANDA_META[waypoint.kanda];
  const hasPrev = waypoint.order > 1;
  const hasNext = waypoint.order < JOURNEY_WAYPOINTS.length;

  return (
    <div
      className="rounded-xl border border-border/50 bg-card p-6 shadow-lg"
      style={{ ["--kanda-accent" as string]: undefined }}
    >
      {/* Color bar */}
      <div
        className="mb-4 h-1 rounded-full"
        style={{ background: waypoint.markerColor }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* Number badge in marker color */}
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-heading text-sm font-bold text-white"
            style={{ background: waypoint.markerColor }}
          >
            {waypoint.order}
          </span>
          <div>
            <h3 className="font-heading text-xl font-bold text-foreground">
              {waypoint.name}
            </h3>
            <p className="font-heading text-sm text-muted-foreground/70">
              {waypoint.nameDevanagari}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="Close waypoint details"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" suppressHydrationWarning>
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Significance tagline */}
      <p
        className="mt-3 text-sm font-medium italic"
        style={{ color: waypoint.markerColor }}
      >
        {waypoint.significance}
      </p>

      {/* Full description */}
      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        {waypoint.description}
      </p>

      {/* Kanda + sarga link */}
      <div className="mt-5 flex items-center gap-3 border-t border-border/40 pt-4">
        <span className={cn("flex h-8 w-8 items-center justify-center rounded-lg bg-saffron/10", `kanda-${waypoint.kanda}`)}>
          <span className="kanda-glyph-color">
            <KandaGlyph name={meta.glyph} className="h-5 w-5" />
          </span>
        </span>
        <div className="flex-1">
          <p className="text-xs text-muted-foreground">{meta.name}</p>
          <Link
            href={`/kanda/${waypoint.kanda}/sarga/${waypoint.sarga}/`}
            className="text-sm font-medium text-primary underline underline-offset-2 hover:text-primary/80"
          >
            Read Sarga {waypoint.sarga} →
          </Link>
        </div>
      </div>

      {/* Prev / Next nav */}
      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className={cn(
            "flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            hasPrev ? "hover:bg-accent text-foreground" : "text-muted-foreground/30 cursor-not-allowed"
          )}
        >
          ‹ Previous
        </button>
        <span className="text-xs text-muted-foreground">
          {waypoint.order} / {JOURNEY_WAYPOINTS.length}
        </span>
        <button
          type="button"
          onClick={onNext}
          disabled={!hasNext}
          className={cn(
            "flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
            hasNext ? "hover:bg-accent text-foreground" : "text-muted-foreground/30 cursor-not-allowed"
          )}
        >
          Next ›
        </button>
      </div>
    </div>
  );
}

// ── Default panel (no waypoint selected) ─────────────────────
function DefaultPanel({ onSelect }: { onSelect: (wp: JourneyWaypoint) => void }) {
  return (
    <div className="rounded-xl border border-border/40 bg-card/60 p-6">
      <h3 className="font-heading text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        The Eight Stages
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Click a waypoint on the map to explore each stage of the journey.
      </p>
      <div className="mt-5 space-y-2">
        {JOURNEY_WAYPOINTS.map((wp) => (
          <button
            key={wp.id}
            type="button"
            onClick={() => onSelect(wp)}
            className="group flex w-full items-start gap-3 rounded-lg border border-border/30 p-3 text-left transition-all hover:border-border/60 hover:bg-accent/30"
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-heading text-xs font-bold text-white"
              style={{ background: wp.markerColor }}
            >
              {wp.order}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {wp.name}
              </p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                {wp.significance}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
