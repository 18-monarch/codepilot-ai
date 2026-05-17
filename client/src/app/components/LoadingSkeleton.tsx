// Loading skeleton component
export function LoadingSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-muted rounded ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <LoadingSkeleton className="h-12 w-12 rounded-lg" />
      <LoadingSkeleton className="h-6 w-3/4" />
      <LoadingSkeleton className="h-4 w-full" />
      <LoadingSkeleton className="h-4 w-5/6" />
    </div>
  );
}
