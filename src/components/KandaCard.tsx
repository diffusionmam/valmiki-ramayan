import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { KandaGlyph } from "@/components/KandaGlyph";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/utils";
import type { KandaSlug, KandaGlyphName } from "@/lib/kanda-meta";

interface KandaCardProps {
  slug: KandaSlug;
  name: string;
  nameDevanagari: string;
  nameEnglish: string;
  bookNumber: number;
  description: string;
  sargaCount: number;
  glyph: KandaGlyphName;
  index: number;
}

export function KandaCard({
  slug,
  name,
  nameDevanagari,
  nameEnglish,
  bookNumber,
  description,
  sargaCount,
  glyph,
  index,
}: KandaCardProps) {
  return (
    <Reveal delay={index * 90} className="h-full">
      <Link href={`/kanda/${slug}/`} className="group block h-full">
        <Card
          className={cn(
            "relative h-full overflow-hidden transition-all duration-300",
            "hover:shadow-lg hover:shadow-saffron/10 hover:-translate-y-1 hover:border-saffron/30",
            `kanda-${slug}`
          )}
        >
          {/* Accent top border, drawn on hover */}
          <span
            className="kanda-accent-bar absolute inset-x-0 top-0 h-px scale-x-0 opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
            aria-hidden
          />

          {/* Subtle accent wash in the corner */}
          <span
            className="kanda-accent-wash pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />

          <CardHeader className="relative pb-3">
            <div className="flex items-start justify-between">
              <span className="kanda-glyph-color transition-transform duration-300 group-hover:scale-110">
                <KandaGlyph name={glyph} className="h-8 w-8" />
              </span>
              <Badge variant="secondary" className="text-xs">
                Book {bookNumber}
              </Badge>
            </div>
            <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
              {name}
            </CardTitle>
            <CardDescription className="space-y-0.5">
              <span className="block font-heading text-sm text-muted-foreground/70">
                {nameDevanagari}
              </span>
              <span className="block text-sm italic">{nameEnglish}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="relative">
            <p className="mb-3 text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {description}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-saffron"
                suppressHydrationWarning
              >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              {sargaCount} chapters (sargas)
            </div>
          </CardContent>
        </Card>
      </Link>
    </Reveal>
  );
}
