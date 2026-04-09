export function ShimmerBlock({ className }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-white/10 ${className ?? ""}`}
      aria-hidden
    />
  );
}
