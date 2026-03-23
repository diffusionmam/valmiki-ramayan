export default function SargaLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb skeleton */}
      <div className="h-5 w-48 animate-pulse rounded bg-muted" />

      <div className="mt-8 mb-8 space-y-4">
        <div className="flex gap-3">
          <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
          <div className="h-6 w-32 animate-pulse rounded-full bg-muted" />
        </div>
        <div className="h-9 w-3/4 animate-pulse rounded bg-muted" />
        <div className="h-24 w-full animate-pulse rounded-xl bg-muted" />
      </div>

      <div className="h-px w-full bg-muted mb-8" />

      {/* Verse skeletons */}
      <div className="space-y-6">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-border/50 p-6 space-y-4">
            <div className="h-5 w-16 animate-pulse rounded-full bg-muted" />
            <div className="h-20 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-px w-full bg-muted" />
            <div className="space-y-2">
              <div className="h-3 w-20 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
