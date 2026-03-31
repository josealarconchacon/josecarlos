import { useEffect } from "react";
import { X } from "lucide-react";
import { PANEL_TITLES } from "../../constants/slidePanel";
import { PanelBody } from "./panels/PanelBody";

function SlidePanelShell({ open, panelId, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const title = panelId ? (PANEL_TITLES[panelId] ?? panelId) : "";

  return (
    <div
      className={`fixed inset-0 z-40 flex max-h-dvh transition-[visibility,opacity] duration-300 ${
        open ? "visible opacity-100" : "pointer-events-none invisible opacity-0"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className="h-full min-w-0 flex-1 bg-black/40 backdrop-blur-[2px] transition-opacity"
        aria-label="Close panel"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />
      <div
        className={`flex h-full w-[min(100%,22rem)] shrink-0 flex-col border-l border-white/10 bg-portfolio-bg shadow-[-12px_0_40px_rgba(0,0,0,0.5)] transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <h2
            id="slide-panel-title"
            className="font-epilogue text-lg font-bold tracking-tight text-white"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex size-10 items-center justify-center rounded-full text-portfolio-accent transition-colors hover:bg-white/5 hover:text-portfolio-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
            aria-label="Close panel"
          >
            <X className="size-5" strokeWidth={2} />
          </button>
        </header>
        <div
          className="min-h-0 flex-1 overflow-y-auto px-4 pb-[max(6rem,env(safe-area-inset-bottom)+5rem)] pt-6"
          role="region"
          aria-labelledby="slide-panel-title"
        >
          {panelId ? <PanelBody panelId={panelId} /> : null}
        </div>
      </div>
    </div>
  );
}

export default SlidePanelShell;
