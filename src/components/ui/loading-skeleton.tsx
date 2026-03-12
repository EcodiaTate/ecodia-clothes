export function LoadingSkeleton() {
  return (
    <div>
      <div />
      <div>
        <div />
        <div />
        <div />
      </div>
      <div>
        <div />
        <div />
      </div>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div>
      <div />
      <div />
      <div />
    </div>
  );
}

export function LoadingGrid({ count = 4 }: { count?: number }) {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}
