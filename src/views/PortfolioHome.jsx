import HeroSection from "../components/portfolio/HeroSection";
import FloatingBottomNav from "../components/portfolio/FloatingBottomNav";

function PortfolioHome() {
  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-portfolio-bg">
      <main id="main" className="relative min-h-0 flex-1">
        <HeroSection />
      </main>
      <FloatingBottomNav />
    </div>
  );
}

export default PortfolioHome;
