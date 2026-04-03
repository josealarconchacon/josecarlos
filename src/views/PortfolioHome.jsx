import { useEffect, useState } from "react";
import HeroSection from "../components/portfolio/HeroSection";
import FloatingBottomNav from "../components/portfolio/FloatingBottomNav";
import SlidePanelShell from "../components/portfolio/SlidePanelShell";
import { prefetchAllPanels } from "../components/portfolio/panels/prefetchPanels";

function PortfolioHome() {
  const [activePanel, setActivePanel] = useState(null);
  const panelOpen = activePanel !== null;

  useEffect(() => {
    prefetchAllPanels();
  }, []);

  const handleOpenPanel = (panelId) => {
    setActivePanel(panelId);
  };

  return (
    <div className="relative h-dvh max-h-dvh overflow-hidden bg-portfolio-bg">
      <div
        className={`relative z-0 flex h-full flex-col transition-[transform] duration-300 ease-out will-change-transform ${
          panelOpen ? "-translate-x-[min(18%,5.5rem)] md:-translate-x-[min(22%,8rem)]" : ""
        }`}
      >
        <main
          id="main"
          tabIndex={-1}
          className="relative min-h-0 flex-1 outline-none"
        >
          <HeroSection />
        </main>
        <FloatingBottomNav
          activePanel={activePanel}
          onOpenPanel={handleOpenPanel}
          elevated={panelOpen}
        />
      </div>

      <SlidePanelShell
        open={panelOpen}
        panelId={activePanel}
        onClose={() => setActivePanel(null)}
      />
    </div>
  );
}

export default PortfolioHome;
