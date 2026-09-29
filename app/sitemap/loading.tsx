import { Skeleton } from "@/components/ui/Skeleton";

export default function SitemapLoading() {
  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
      <div className="max-w-6xl mx-auto w-full space-y-10 pt-6 md:pt-10">
        <Skeleton className="h-3 w-40" />

        <div className="flex flex-col sm:flex-row justify-between gap-4 p-3 rounded-2xl border border-border-primary">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-48" />
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4 pb-8 border-b border-border-primary/80">
          <div className="space-y-3">
            <Skeleton className="h-5 w-48 rounded-full" />
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-11 w-32 rounded-full" />
            <Skeleton className="h-11 w-32 rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-border-primary p-6 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-2xl border border-border-primary p-6 space-y-3">
              <div className="flex justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-12 rounded-full" />
              </div>
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
