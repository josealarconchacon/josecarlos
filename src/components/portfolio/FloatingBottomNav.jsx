import { useState } from "react";
import { FLOATING_BOTTOM_NAV_ITEMS } from "../../constants/floatingBottomNav";

function FloatingBottomNav() {
  const [activeId, setActiveId] = useState("");

  return (
    <nav
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-2"
      aria-label="Primary mobile"
    >
      <div className="pointer-events-auto flex w-[min(100%,20rem)] items-center justify-between gap-1 rounded-full border border-white/10 bg-portfolio-glass px-3 py-2 shadow-lg backdrop-blur-xl sm:max-w-sm sm:px-4">
        {FLOATING_BOTTOM_NAV_ITEMS.map((item) => {
          const { id, label, href, external } = item;
          const IconComponent = item.icon;
          const active = id === activeId;
          return (
            <a
              key={id}
              href={href}
              aria-label={label}
              aria-current={active ? "page" : undefined}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={`relative flex size-11 items-center justify-center rounded-full transition-colors duration-300 active:scale-95 ${
                active
                  ? "text-portfolio-bg"
                  : "text-portfolio-accent hover:text-portfolio-accent-hover"
              }`}
              onClick={() => setActiveId(id)}
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
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export default FloatingBottomNav;
