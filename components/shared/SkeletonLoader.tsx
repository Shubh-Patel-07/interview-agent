export function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
      <div className="h-4 w-1/3 skeleton-shimmer rounded-md" />
      <div className="h-8 w-2/3 skeleton-shimmer rounded-md" />
      <div className="h-3 w-1/2 skeleton-shimmer rounded-md" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
      <div className="h-6 w-1/4 skeleton-shimmer rounded-md mb-6" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-12 w-full skeleton-shimmer rounded-xl" />
      ))}
    </div>
  );
}
