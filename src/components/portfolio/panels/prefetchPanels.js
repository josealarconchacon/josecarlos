const PANEL_IMPORTS = {
  about: () => import("./AboutPanelSkeleton"),
  contact: () => import("./ContactPanelSkeleton"),
  work: () => import("./WorkPanelSkeleton"),
  resume: () => import("./ResumePanelSkeleton"),
};

export function prefetchPanel(panelId) {
  PANEL_IMPORTS[panelId]?.();
}

export function prefetchAllPanels() {
  Object.values(PANEL_IMPORTS).forEach((fn) => fn());
}
