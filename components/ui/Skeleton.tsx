import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-hover-bg", className)}
      {...props}
    />
  );
}

export function BlogCardSkeleton() {
  return (
    <div className="flex flex-col bg-background border border-border-primary rounded-xl overflow-hidden">
      <Skeleton className="w-full aspect-[16/10] rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-2/3" />
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col bg-background border border-border-primary rounded-xl overflow-hidden">
      <Skeleton className="w-full aspect-[16/10] rounded-none" />
      <div className="p-5 space-y-3">
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-14 rounded-sm" />
          <Skeleton className="h-4 w-12 rounded-sm" />
          <Skeleton className="h-4 w-16 rounded-sm" />
        </div>
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );
}

export function BlogDetailSkeleton() {
  return (
    <div className="max-w-3xl mx-auto w-full space-y-8">
      <Skeleton className="h-3 w-32" />
      <Skeleton className="h-3 w-20" />
      <div className="space-y-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-3/4" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="w-full aspect-[16/7] rounded-2xl" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}

export function ProjectDetailSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 md:px-10 md:pt-10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-9 w-48 rounded-full" />
      </div>

      {/* Hero card */}
      <div className="rounded-3xl border border-border-primary p-5 sm:p-8 md:p-10 dark:bg-card-bg">
        <div className="flex flex-wrap gap-2.5">
          <Skeleton className="h-7 w-28 rounded-full" />
          <Skeleton className="h-7 w-20 rounded-full" />
          <Skeleton className="h-7 w-24" />
        </div>
        <div className="mt-5 space-y-3">
          <Skeleton className="h-8 w-full sm:h-10" />
          <Skeleton className="h-8 w-4/5 sm:h-10" />
        </div>
        <Skeleton className="mt-5 h-4 w-2/3" />
        <div className="mt-7 flex gap-3">
          <Skeleton className="h-12 w-36 rounded-full" />
          <Skeleton className="h-12 w-40 rounded-full" />
        </div>
        <Skeleton className="mt-8 w-full aspect-[16/10] rounded-2xl sm:aspect-[2/1]" />
      </div>

      {/* Section grid */}
      <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:mt-14 xl:grid-cols-[14rem_minmax(0,1fr)]">
        <div className="flex gap-2 xl:flex-col xl:gap-1">
          {[68, 56, 48].map((width, i) => (
            <Skeleton key={i} className="h-8 rounded-full xl:h-7 xl:w-full xl:rounded-r-xl xl:rounded-l-none" style={{ width: `${width}%` }} />
          ))}
        </div>

        <div className="min-w-0 space-y-14 sm:space-y-16">
          <div className="space-y-6">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-8 w-56" />
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border-primary md:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 rounded-none" />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-8 w-64" />
            <div className="space-y-3">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-28 rounded-2xl" />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-8 w-52" />
            <div className="grid gap-4 sm:grid-cols-2">
              {[0, 1].map((i) => (
                <Skeleton key={i} className="h-40 rounded-2xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AboutSkeleton() {
  return (
    <div className="max-w-4xl mx-auto w-full space-y-10 pt-6">
      <Skeleton className="h-3 w-40" />
      <div className="flex flex-col sm:flex-row justify-between gap-4 pb-8 border-b border-border-primary/80">
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
      <div className="space-y-6 pl-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-border-primary p-6 space-y-3">
            <Skeleton className="h-4 w-32 rounded-full" />
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        ))}
      </div>
    </div>
  );
}


export { Skeleton };
