import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, GripVertical, X } from "lucide-react";
import {
  RESUME_DOWNLOAD_FILENAME,
  RESUME_PDF_URL,
} from "../../constants/resume";
import { PANEL_TITLES } from "../../constants/slidePanel";
import { PanelBody } from "./panels/PanelBody";

/** Default narrow width for the panel */
const NARROW_WIDTH_PX = 352;
/** Dragging the left edge toward the screen center stops shy of full viewport. */
const MAX_WIDTH_PX = 720;
const BACKDROP_MIN_PX = 40;

function clampPanelWidth(px) {
  const cap = Math.min(MAX_WIDTH_PX, window.innerWidth - BACKDROP_MIN_PX);
  const floor = Math.min(NARROW_WIDTH_PX, window.innerWidth);
  return Math.round(Math.max(floor, Math.min(cap, px)));
}

function SlidePanelShell({ open, panelId, onClose }) {
  const [panelWidth, setPanelWidth] = useState(NARROW_WIDTH_PX);
  const dragRef = useRef(null);
  const shellRef = useRef(null);
  const prevOpenRef = useRef(open);

  useEffect(() => {
    if (open && !prevOpenRef.current) {
      setPanelWidth(clampPanelWidth(NARROW_WIDTH_PX));
    }
    prevOpenRef.current = open;
  }, [open]);

  useEffect(() => {
    if (open) return;
    const root = shellRef.current;
    const active = document.activeElement;
    if (!(root && active instanceof HTMLElement && root.contains(active))) return;
    active.blur();
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onResize = () => setPanelWidth((w) => clampPanelWidth(w));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [open]);

  const endDrag = useCallback(() => {
    dragRef.current = null;
  }, []);

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

  const bounds =
    typeof window !== "undefined"
      ? {
          min: Math.min(NARROW_WIDTH_PX, window.innerWidth),
          max: Math.min(MAX_WIDTH_PX, window.innerWidth - BACKDROP_MIN_PX),
        }
      : { min: NARROW_WIDTH_PX, max: MAX_WIDTH_PX };

  return (
    <div
      ref={shellRef}
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
        className={`relative flex h-full max-w-full shrink-0 flex-col border-l border-white/10 bg-portfolio-bg shadow-[-12px_0_40px_rgba(0,0,0,0.5)] transition-[transform] duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: panelWidth }}
      >
        <div
          role="separator"
          aria-orientation="vertical"
          aria-label="Resize side panel"
          aria-valuemin={bounds.min}
          aria-valuemax={bounds.max}
          aria-valuenow={panelWidth}
          tabIndex={open ? 0 : -1}
          className="group absolute inset-y-0 -left-3 z-50 flex w-6 cursor-ew-resize touch-none select-none items-center justify-center outline-none max-[380px]:-left-2 max-[380px]:w-5"
          onPointerDown={(e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            dragRef.current = { startX: e.clientX, startWidth: panelWidth };
            e.currentTarget.setPointerCapture(e.pointerId);
          }}
          onPointerMove={(e) => {
            const drag = dragRef.current;
            if (!drag) return;
            const dx = drag.startX - e.clientX;
            setPanelWidth(clampPanelWidth(drag.startWidth + dx));
          }}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onLostPointerCapture={endDrag}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              e.preventDefault();
              setPanelWidth((w) => clampPanelWidth(w + 24));
            } else if (e.key === "ArrowRight") {
              e.preventDefault();
              setPanelWidth((w) => clampPanelWidth(w - 24));
            } else if (e.key === "Home") {
              e.preventDefault();
              setPanelWidth(clampPanelWidth(bounds.min));
            } else if (e.key === "End") {
              e.preventDefault();
              setPanelWidth(clampPanelWidth(bounds.max));
            }
          }}
        >
          <span className="flex h-14 w-1.5 items-center justify-center rounded-full bg-white/15 shadow-lg ring-1 ring-white/10 transition group-hover:bg-white/25 group-focus-visible:bg-white/25 group-focus-visible:ring-2 group-focus-visible:ring-portfolio-accent">
            <GripVertical
              className="size-4 text-white/60"
              strokeWidth={2}
              aria-hidden
            />
          </span>
        </div>
        <header className="flex shrink-0 items-center gap-2 border-b border-white/10 px-4 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <h2
            id="slide-panel-title"
            className="min-w-0 flex-1 truncate font-epilogue text-lg font-bold tracking-tight text-white"
          >
            {title}
          </h2>
          <div className="flex shrink-0 items-center gap-0.5">
            {panelId === "resume" ? (
              <a
                href={RESUME_PDF_URL}
                download={RESUME_DOWNLOAD_FILENAME}
                target="_blank"
                rel="noopener noreferrer"
                className="flex size-10 items-center justify-center rounded-full text-portfolio-accent transition-colors hover:bg-white/5 hover:text-portfolio-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
                aria-label="Download résumé (PDF)"
              >
                <ArrowDown className="size-5" strokeWidth={2} aria-hidden />
              </a>
            ) : null}
            <button
              type="button"
              onClick={onClose}
              className="flex size-10 items-center justify-center rounded-full text-portfolio-accent transition-colors hover:bg-white/5 hover:text-portfolio-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
              aria-label="Close panel"
            >
              <X className="size-5" strokeWidth={2} />
            </button>
          </div>
        </header>
        <div
          className={`@container min-h-0 flex-1 overflow-y-auto px-4 pb-[max(6rem,env(safe-area-inset-bottom)+5rem)] ${panelId === "resume" ? "pt-4" : "pt-6"}`}
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
