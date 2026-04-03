import { FLOATING_BOTTOM_NAV_ITEMS } from "../../constants/floatingBottomNav";
import { prefetchPanel } from "./panels/prefetchPanels";

function FloatingBottomNav({ activePanel, onOpenPanel, elevated }) {
  return (
    <nav
      className={`pointer-events-none fixed bottom-0 left-0 right-0 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2 transition-[z-index] duration-0 ${
        elevated ? "z-[60]" : "z-40"
      }`}
      aria-label="Primary mobile"
    >
      <div className="pointer-events-auto flex w-[min(100%,20rem)] items-center justify-between gap-1 rounded-full border border-white/10 bg-portfolio-glass px-3 py-2 shadow-lg backdrop-blur-xl sm:max-w-sm sm:px-4">
        {FLOATING_BOTTOM_NAV_ITEMS.map((item) => {
          const { id, label, icon: IconComponent, panel } = item;
          const active = activePanel === panel;
          return (
            <div key={id} className="group relative flex justify-center">
              <span
                className="pointer-events-none absolute bottom-[calc(100%+0.5rem)] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/15 bg-[#2a2a2a]/95 px-2.5 py-1 font-manrope text-[0.65rem] font-semibold text-white shadow-lg opacity-0 backdrop-blur-sm transition-opacity duration-200 [@media(hover:hover)]:group-hover:opacity-100 group-focus-within:opacity-100"
                aria-hidden
              >
                {label}
              </span>
              <button
                type="button"
                aria-label={label}
                aria-pressed={active}
                className={`relative flex size-11 items-center justify-center rounded-full transition-colors duration-300 active:scale-95 ${
                  active
                    ? "text-portfolio-bg"
                    : "text-portfolio-accent hover:text-portfolio-accent-hover"
                }`}
                onPointerEnter={() => prefetchPanel(panel)}
                onPointerDown={() => prefetchPanel(panel)}
                onFocus={() => prefetchPanel(panel)}
                onClick={() => onOpenPanel(panel)}
              >
                {active ? (
                  <span
                    className="absolute inset-0 rounded-full bg-portfolio-accent"
                    aria-hidden
                  />
                ) : null}
                <IconComponent
                  className="relative z-10 size-[1.35rem]"
                  strokeWidth={1.75}
                />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
}

export default FloatingBottomNav;
