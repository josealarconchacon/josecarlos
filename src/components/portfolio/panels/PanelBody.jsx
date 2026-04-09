import { lazy, Suspense } from "react";
import { ShimmerBlock } from "./ShimmerBlock";

const AboutPanelSkeleton = lazy(() =>
  import("./AboutPanelSkeleton").then((m) => ({ default: m.AboutPanelSkeleton })),
);
const ContactPanelSkeleton = lazy(() =>
  import("./ContactPanelSkeleton").then((m) => ({ default: m.ContactPanelSkeleton })),
);
const WorkPanelSkeleton = lazy(() =>
  import("./WorkPanelSkeleton").then((m) => ({ default: m.WorkPanelSkeleton })),
);
const ResumePanelSkeleton = lazy(() =>
  import("./ResumePanelSkeleton").then((m) => ({ default: m.ResumePanelSkeleton })),
);

function PanelLoadingFallback() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-label="Loading panel"
    >
      <ShimmerBlock className="h-5 w-3/5 max-w-xs" />
      <ShimmerBlock className="h-24 w-full" />
      <ShimmerBlock className="h-24 w-full" />
    </div>
  );
}

export function PanelBody({ panelId }) {
  return (
    <Suspense fallback={<PanelLoadingFallback />}>
      {panelId === "work" && <WorkPanelSkeleton />}
      {panelId === "about" && <AboutPanelSkeleton />}
      {panelId === "contact" && <ContactPanelSkeleton />}
      {panelId === "resume" && <ResumePanelSkeleton />}
    </Suspense>
  );
}
