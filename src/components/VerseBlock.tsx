import type { Verse } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface VerseBlockProps {
  verse: Verse;
  index: number;
}

export function VerseBlock({ verse, index }: VerseBlockProps) {
  return (
    <Card
      className="overflow-hidden animate-fade-up border-border/50 hover:border-saffron/20 transition-colors"
      style={{ animationDelay: `${Math.min(index * 50, 800)}ms` }}
      id={`verse-${verse.number}-${index}`}
    >
      <CardContent className="p-6 space-y-4">
        {/* Verse Number */}
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="border-saffron/30 text-saffron-dark font-mono text-xs"
          >
            {verse.number}
          </Badge>
          <a
            href={`#verse-${verse.number}-${index}`}
            className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors"
            aria-label={`Link to verse ${verse.number}`}
          >
            #
          </a>
        </div>

        {/* Sanskrit Verse */}
        {verse.sanskrit && (
          <div className="verse-sanskrit rounded-lg bg-saffron/5 p-4 text-center leading-loose">
            {verse.sanskrit}
          </div>
        )}

        {/* Word-by-word Meaning */}
        {verse.wordMeaning && (
          <>
            <Separator className="bg-border/40" />
            <div className="verse-meaning text-sm">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Word Meaning
              </span>
              {verse.wordMeaning}
            </div>
          </>
        )}

        {/* English Translation */}
        {verse.translation && (
          <>
            <Separator className="bg-border/40" />
            <div className="verse-translation text-sm">
              <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
                Translation
              </span>
              <p className="leading-relaxed">{verse.translation}</p>
            </div>
          </>
        )}

        {/* Commentary */}
        {verse.commentary && (
          <>
            <Separator className="bg-border/40" />
            <details className="group">
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-muted-foreground/60 hover:text-muted-foreground transition-colors">
                Commentary ▾
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {verse.commentary}
              </p>
            </details>
          </>
        )}
      </CardContent>
    </Card>
  );
}
