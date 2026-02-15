"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mb-6 rounded-full bg-red-100 p-4 text-red-600 dark:bg-red-900/30 dark:text-red-400">
        <AlertCircle className="h-10 w-10" />
      </div>
      <h2 className="mb-2 text-3xl font-bold tracking-tight">
        Něco se pokazilo
      </h2>
      <p className="mb-8 max-w-md text-muted-foreground">
        Omlouváme se, ale při načítání této stránky došlo k neočekávané chybě.
        Zkuste to prosím znovu.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Button onClick={() => reset()} size="lg" className="gap-2">
          <RefreshCcw className="h-4 w-4" />
          Zkusit znovu
        </Button>
        <Button variant="outline" size="lg" asChild className="gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            Zpět na úvod
          </Link>
        </Button>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="mt-12 w-full max-w-2xl rounded-lg border bg-muted/50 p-4 text-left font-mono text-sm">
          <p className="font-bold text-red-500">Error: {error.message}</p>
          {error.digest && (
            <p className="mt-2 text-muted-foreground">Digest: {error.digest}</p>
          )}
        </div>
      )}
    </div>
  );
}
