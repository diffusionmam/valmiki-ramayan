import Link from "next/link";

interface SargaListProps {
  kandaSlug: string;
  sargas: Array<{
    number: number;
    title: string;
    verseCount: number;
  }>;
}

export function SargaList({ kandaSlug, sargas }: SargaListProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {sargas.map((sarga, i) => (
        <Link
          key={sarga.number}
          href={`/kanda/${kandaSlug}/sarga/${sarga.number}`}
          className="group flex items-center gap-3 rounded-xl border border-border/60 bg-card p-4 transition-all duration-200 hover:border-saffron/40 hover:bg-accent/50 hover:shadow-sm animate-fade-up"
          style={{ animationDelay: `${Math.min(i * 30, 500)}ms` }}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-heading text-sm font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {sarga.number}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground group-hover:text-primary transition-colors">
              {sarga.title}
            </p>
            {sarga.verseCount > 0 && (
              <p className="text-xs text-muted-foreground">
                {sarga.verseCount} verses
              </p>
            )}
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="shrink-0 text-muted-foreground/40 transition-transform group-hover:translate-x-1 group-hover:text-primary"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      ))}
    </div>
  );
}
