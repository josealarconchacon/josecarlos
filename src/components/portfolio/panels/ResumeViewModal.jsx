import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { RESUME_PDF_URL } from "../../../constants/resume";

const MotionBackdrop = motion.div;
const MotionPanel = motion.div;

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export function ResumeViewModal({ open, onClose }) {
  const bodyRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(560);
  const [numPages, setNumPages] = useState(null);

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

  useEffect(() => {
    if (!open) return;
    const el = bodyRef.current;
    if (!el) return;
    const measure = () =>
      setPageWidth(Math.max(280, Math.min(920, el.clientWidth - 48)));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [open]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <MotionBackdrop
          key="resume-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Résumé full view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
          onClick={onClose}
        >
          <MotionPanel
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[min(92dvh,900px)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-portfolio-bg shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/5"
          >
            <header className="flex shrink-0 items-center justify-between border-b border-white/10 px-4 py-3">
              <p className="font-epilogue text-sm font-semibold tracking-wide text-white">
                Résumé
              </p>
              <button
                type="button"
                onClick={onClose}
                className="flex size-10 items-center justify-center rounded-full text-portfolio-accent transition-colors hover:bg-white/10 hover:text-portfolio-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-portfolio-accent"
                aria-label="Close preview"
              >
                <X className="size-5" strokeWidth={2} />
              </button>
            </header>
            <div
              ref={bodyRef}
              className="min-h-0 flex-1 overflow-y-auto px-4 py-4"
            >
              <Document
                file={RESUME_PDF_URL}
                onLoadSuccess={({ numPages: n }) => setNumPages(n)}
                loading={
                  <p className="py-12 text-center font-manrope text-sm text-portfolio-text-muted">
                    Loading…
                  </p>
                }
                error={
                  <p className="py-12 text-center font-manrope text-sm text-portfolio-accent-hover">
                    Could not load PDF.
                  </p>
                }
                className="flex flex-col gap-4"
              >
                {numPages
                  ? Array.from({ length: numPages }, (_, i) => (
                      <Page
                        key={i + 1}
                        pageNumber={i + 1}
                        width={pageWidth}
                        className="rounded-lg border border-white/10 bg-white/[0.06] shadow-lg [&_.react-pdf__Page__canvas]:mx-auto [&_.react-pdf__Page__canvas]:block"
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                      />
                    ))
                  : null}
              </Document>
            </div>
          </MotionPanel>
        </MotionBackdrop>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
