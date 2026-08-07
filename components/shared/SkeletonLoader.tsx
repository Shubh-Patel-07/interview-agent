export function SkeletonCard() {
  return (
    <div className="glass-card p-6 rounded-3xl border border-slate-200/80 bg-white space-y-4 shadow-sm">
      <div className="h-4 w-1/3 bg-slate-200 animate-pulse rounded-md" />
      <div className="h-8 w-2/3 bg-slate-200 animate-pulse rounded-md" />
      <div className="h-3 w-1/2 bg-slate-200 animate-pulse rounded-md" />
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="glass-card rounded-3xl border border-slate-200/80 bg-white p-6 space-y-4 shadow-sm">
      <div className="h-6 w-1/4 bg-slate-200 animate-pulse rounded-md mb-6" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-12 w-full bg-slate-100 animate-pulse rounded-xl" />
      ))}
    </div>
  );
}
