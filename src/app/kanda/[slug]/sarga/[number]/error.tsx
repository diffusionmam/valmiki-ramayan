"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SargaError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-4 py-24 text-center">
      <span className="text-5xl mb-6">📜</span>
      <h2 className="font-heading text-2xl font-bold text-foreground">
        Unable to Load Chapter
      </h2>
      <p className="mt-3 text-muted-foreground">
        Something went wrong while loading this sarga. The verse data may be
        temporarily unavailable.
      </p>
      <div className="mt-6 flex gap-3">
        <Button onClick={reset}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link href="/">Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
