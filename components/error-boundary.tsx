"use client";

import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  error: Error | null;
  resetQuery: () => void;
}

export function ErrorBoundary({ error, resetQuery }: ErrorBoundaryProps) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-semibold">Something went wrong</h2>
        <p className="mt-2 text-gray-600">{error?.message}</p>
        <Button onClick={resetQuery} className="mt-4">
          Try again
        </Button>
      </div>
    </div>
  );
}
