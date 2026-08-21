export function SkeletonLoader() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero Skeleton */}
      <div className="mb-8 h-[400px] w-full animate-pulse rounded-xl bg-gray-200"></div>

      {/* Category Grid Skeleton */}
      <div className="mb-12">
        <div className="mx-auto mb-6 h-8 w-48 animate-pulse rounded bg-gray-200"></div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="h-24 w-24 animate-pulse rounded-full bg-gray-200"></div>
              <div className="h-4 w-16 animate-pulse rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Section Skeletons */}
      {[...Array(2)].map((_, i) => (
        <div key={i} className="mb-12">
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute left-0 right-0 border-t border-gray-200"></div>
            <div className="relative bg-white px-4 h-8 w-40 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="mb-6 h-56 w-full animate-pulse rounded-xl bg-gray-200"></div>
          <div className="flex gap-4 overflow-hidden">
            {[...Array(4)].map((_, j) => (
              <div key={j} className="min-w-[170px] flex-shrink-0">
                <div className="aspect-square w-full animate-pulse rounded-lg bg-gray-200"></div>
                <div className="mt-2 h-4 w-24 animate-pulse rounded bg-gray-200"></div>
                <div className="mt-1 h-4 w-16 animate-pulse rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}