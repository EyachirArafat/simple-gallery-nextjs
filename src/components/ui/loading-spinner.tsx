export default function LoadingSpinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClasses = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        {/* Outer glow */}
        <div
          className={`absolute inset-0 rounded-full bg-purple-500/20 blur-lg animate-pulse ${sizeClasses[size]}`}
        />

        {/* Spinner */}
        <div
          className={`${sizeClasses[size]} border-2 border-gray-700 border-t-purple-500 rounded-full animate-spin`}
        />
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="rounded-2xl bg-gray-800/50 border border-gray-700/50 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-[4/3] bg-gray-700/50" />

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-700/50 rounded w-3/4" />
        <div className="h-3 bg-gray-700/50 rounded w-1/2" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 bg-gray-700/50 rounded w-12" />
          <div className="h-3 bg-gray-700/50 rounded w-12" />
          <div className="h-3 bg-gray-700/50 rounded w-12" />
        </div>
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
