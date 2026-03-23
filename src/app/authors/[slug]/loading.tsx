import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />

      <div className="mt-8 space-y-8">
        <div className="space-y-2">
          <div className="h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
        </div>

        <div className="h-40 animate-pulse rounded-lg bg-muted" />

        <Card>
          <CardHeader>
            <CardTitle className="h-6 w-32 animate-pulse rounded bg-muted" />
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          </CardContent>
        </Card>

        <div className="space-y-2">
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="grid gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-lg bg-muted" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
