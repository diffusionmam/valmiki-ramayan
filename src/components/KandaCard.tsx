import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface KandaCardProps {
  slug: string;
  name: string;
  nameEnglish: string;
  bookNumber: number;
  description: string;
  sargaCount: number;
  icon: string;
  index: number;
}

export function KandaCard({
  slug,
  name,
  nameEnglish,
  bookNumber,
  description,
  sargaCount,
  icon,
  index,
}: KandaCardProps) {
  return (
    <Link href={`/kanda/${slug}`} className="group block">
      <Card
        className={`h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-saffron/10 hover:-translate-y-1 hover:border-saffron/30 animate-fade-up`}
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <span className="text-3xl transition-transform duration-300 group-hover:scale-110">
              {icon}
            </span>
            <Badge variant="secondary" className="text-xs">
              Book {bookNumber}
            </Badge>
          </div>
          <CardTitle className="font-heading text-xl group-hover:text-primary transition-colors">
            {name}
          </CardTitle>
          <CardDescription className="text-sm italic">
            {nameEnglish}
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            >
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            {sargaCount} chapters (sargas)
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
