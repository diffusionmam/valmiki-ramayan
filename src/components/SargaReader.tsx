"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Verse } from "@/lib/types";
import { ShlokaCard } from "@/components/ShlokaCard";
import { SargaRail } from "@/components/SargaRail";
import { ReadingProgress } from "@/components/ReadingProgress";

interface SargaReaderProps {
  kandaSlug: string;
  kandaName: string;
  sargaNumber: number;
  maxSarga: number;
  verses: Verse[];
}

/**
 * Client-side reading wrapper. Owns:
 * - IAST transliteration toggle state
 * - Keyboard navigation (←/→ sargas, J/K verses, / focus jump)
 * - Verse-jump-to-N scrolling
 * - Renders SargaRail + ShlokaCards + ReadingProgress
 */
export function SargaReader({
  kandaSlug,
  kandaName,
  sargaNumber,
  maxSarga,
  verses,
}: SargaReaderProps) {
  const router = useRouter();
  const [itransOn, setItransOn] = useState(false);
  const kandaAccentClass = `kanda-${kandaSlug}`;

  const jumpToVerse = useCallback(
    (n: number) => {
      // Verses are 1-indexed by position in the array
      const idx = Math.min(Math.max(0, n - 1), verses.length - 1);
      const verse = verses[idx];
      if (!verse) return;
      const el = document.getElementById(`verse-${verse.number}-${idx}`);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [verses]
  );

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      const typing =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      // Skip if typing or modifier keys held
      if (typing || e.ctrlKey || e.metaKey || e.altKey) return;

      switch (e.key) {
        case "ArrowLeft":
          if (sargaNumber > 1) {
            router.push(`/kanda/${kandaSlug}/sarga/${sargaNumber - 1}/`);
          }
          break;
        case "ArrowRight":
          if (sargaNumber < maxSarga) {
            router.push(`/kanda/${kandaSlug}/sarga/${sargaNumber + 1}/`);
          }
          break;
        case "j": {
          // Scroll down to the next verse
          const current = findCurrentVerse(verses);
          if (current < verses.length - 1) {
            jumpToVerse(current + 2); // 1-indexed
          }
          break;
        }
        case "k": {
          const current = findCurrentVerse(verses);
          if (current > 0) {
            jumpToVerse(current); // 1-indexed, so current index = previous verse number
          }
          break;
        }
        case "/": {
          e.preventDefault();
          const input = document.querySelector<HTMLInputElement>(
            ".sarga-rail input[type='number']"
          );
          input?.focus();
          break;
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, kandaSlug, sargaNumber, maxSarga, verses, jumpToVerse]);

  const totalVerses = verses.length;

  return (
    <>
      <ReadingProgress />
      <div className="flex flex-col gap-0 xl:flex-row xl:gap-8">
        <SargaRail
          kandaSlug={kandaSlug}
          kandaName={kandaName}
          sargaNumber={sargaNumber}
          maxSarga={maxSarga}
          itransOn={itransOn}
          onToggleItrans={() => setItransOn((v) => !v)}
          onVerseJump={jumpToVerse}
          totalVerses={totalVerses}
        />

        {/* Verse list */}
        <div className="min-w-0 flex-1 space-y-8">
          {verses.map((verse, i) => (
            <ShlokaCard
              key={`${verse.number}-${i}`}
              verse={verse}
              index={i}
              showItrans={itransOn}
              kandaAccentClass={kandaAccentClass}
            />
          ))}
        </div>
      </div>
    </>
  );
}

/**
 * Find the index of the verse currently in view (closest to top of viewport).
 */
function findCurrentVerse(verses: Verse[]): number {
  let current = 0;
  let bestTop = Infinity;
  for (let i = 0; i < verses.length; i++) {
    const el = document.getElementById(`verse-${verses[i].number}-${i}`);
    if (!el) continue;
    const top = Math.abs(el.getBoundingClientRect().top - 120); // header offset
    if (top < bestTop) {
      bestTop = top;
      current = i;
    }
  }
  return current;
}
