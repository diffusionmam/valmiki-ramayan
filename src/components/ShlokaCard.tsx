"use client";

import { useState } from "react";
import type { Verse } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { devanagariToIASTMemo } from "@/lib/transliterate";
import { Reveal } from "@/components/Reveal";

interface ShlokaCardProps {
  verse: Verse;
  index: number;
  showItrans: boolean;
  kandaAccentClass: string;
}

export function ShlokaCard({
  verse,
  index,
  showItrans,
  kandaAccentClass,
}: ShlokaCardProps) {
  const [copied, setCopied] = useState(false);
  const anchorId = `verse-${verse.number}-${index}`;

  async function copyLink() {
    const url = `${window.location.origin}${window.location.pathname}#${anchorId}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Reveal delay={Math.min(index * 40, 400)}>
      <Card
        id={anchorId}
        className={cn(
          "overflow-hidden border-border/50 transition-colors hover:border-saffron/20",
          kandaAccentClass
        )}
      >
        <CardContent className="p-6 space-y-4 sm:p-8">
          {/* Verse number + copy link */}
          <div className="flex items-center justify-between">
            <span className="verse-label font-mono text-xs">
              {verse.number}
            </span>
            <button
              type="button"
              onClick={copyLink}
              className="flex items-center gap-1 text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
              aria-label="Copy link to this verse"
            >
              {copied ? "Copied" : "#"}
            </button>
          </div>

          {/* Sanskrit verse on manuscript plaque */}
          {verse.sanskrit && (
            <div className="verse-plaque">
              <div className="verse-sanskrit leading-loose">
                {verse.sanskrit}
              </div>
              {showItrans && (
                <div className="verse-itrans">
                  {devanagariToIASTMemo(verse.sanskrit)}
                </div>
              )}
            </div>
          )}

          {/* Word-by-word meaning */}
          {verse.wordMeaning && (
            <div className="verse-meaning text-sm">
              <span className="verse-label mb-1 block">Word Meaning</span>
              {verse.wordMeaning}
            </div>
          )}

          {/* English translation */}
          {verse.translation && (
            <div className="verse-translation text-sm">
              <span className="verse-label mb-1 block">Translation</span>
              <p className="leading-relaxed">{verse.translation}</p>
            </div>
          )}

          {/* Commentary — ornamented <details> */}
          {verse.commentary && (
            <details className="commentary-toggle">
              <summary>
                <ChevronSmall />
                Commentary
              </summary>
              <div className="commentary-body">{verse.commentary}</div>
            </details>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}

function ChevronSmall() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      suppressHydrationWarning
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}
