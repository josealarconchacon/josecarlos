import { ShimmerBlock } from "./ShimmerBlock";

export function ContactPanelSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 px-1 @[480px]:grid-cols-2">
      <ShimmerBlock className="h-10 w-full rounded-lg" />
      <ShimmerBlock className="h-10 w-full rounded-lg" />
      <ShimmerBlock className="h-28 w-full rounded-lg @[480px]:col-span-2" />
      <ShimmerBlock className="h-11 w-full rounded-lg @[480px]:col-span-2" />
    </div>
  );
}
