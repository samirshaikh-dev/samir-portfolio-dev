import { Skeleton } from "@/components/ui/Skeleton";

export default function ResumeLoading() {
  return (
    <main className="relative flex flex-col flex-1 px-5 sm:px-8 md:px-10 pb-20 overflow-hidden">
      <div className="max-w-5xl mx-auto w-full space-y-10 pt-6 md:pt-10">
        {/* Breadcrumb skeleton */}
        <Skeleton className="h-3 w-40" />

        {/* Status bar skeleton */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 p-3 rounded-2xl border border-border-primary">
          <Skeleton className="h-4 w-60" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Header skeleton */}
        <div className="flex flex-col md:flex-row justify-between gap-4 pb-8 border-b border-border-primary/80">
          <div className="space-y-3">
            <Skeleton className="h-5 w-48 rounded-full" />
            <Skeleton className="h-12 w-80" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-11 w-36 rounded-full" />
            <Skeleton className="h-11 w-32 rounded-full" />
          </div>
        </div>

        {/* Telemetry metrics bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="rounded-2xl border border-border-primary p-5 space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-6 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          ))}
        </div>

        {/* Viewer shell skeleton */}
        <div className="rounded-3xl border border-border-primary p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center pb-4 border-b border-border-primary">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>
          <div className="flex justify-center py-20">
            <Skeleton className="w-full max-w-2xl aspect-[1/1.4] rounded-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
