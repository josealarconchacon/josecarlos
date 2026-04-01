import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Eye } from "lucide-react";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import { RESUME_PDF_URL } from "../../../constants/resume";
import { ResumeViewModal } from "./ResumeViewModal";

pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

export function ResumePanelSkeleton() {
  const wrapRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(280);
  const [numPages, setNumPages] = useState(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const measure = () => setPageWidth(Math.max(200, el.clientWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
      <div
        ref={wrapRef}
        className="group relative -mx-4 -mt-6 max-h-[calc(100dvh-10.5rem)] min-h-0 overflow-y-auto px-0"
      >
        {}
        <button
          type="button"
          onClick={() => setViewerOpen(true)}
          className="absolute bottom-3 right-2 z-20 flex items-center gap-2 rounded-full border border-white/20 bg-portfolio-bg/95 px-3 py-2 font-manrope text-xs font-semibold text-white shadow-lg backdrop-blur-md transition active:scale-95 md:hidden"
          aria-label="Open résumé preview"
        >
          <Eye
            className="size-4 shrink-0 text-portfolio-accent"
            strokeWidth={2}
          />
          View
        </button>

        {}
        <div className="pointer-events-none absolute inset-0 z-10 hidden items-center justify-center bg-black/0 opacity-0 transition-all duration-300 md:pointer-events-none md:flex md:group-hover:pointer-events-auto md:group-hover:bg-black/45 md:group-hover:opacity-100">
          <button
            type="button"
            onClick={() => setViewerOpen(true)}
            className="pointer-events-auto flex translate-y-2 items-center gap-2 rounded-full border border-portfolio-accent/40 bg-portfolio-bg/95 px-5 py-2.5 font-manrope text-sm font-semibold text-white shadow-xl ring-1 ring-white/10 transition duration-300 group-hover:translate-y-0 hover:border-portfolio-accent-hover/60 hover:text-portfolio-accent-hover active:scale-95"
            aria-label="Open résumé preview"
          >
            <Eye
              className="size-[1.15rem] shrink-0 text-portfolio-accent"
              strokeWidth={2}
            />
            View résumé
          </button>
        </div>

        <Document
          file={RESUME_PDF_URL}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          loading={
            <p className="px-2 py-8 text-center font-manrope text-sm text-portfolio-text-muted">
              Loading résumé…
            </p>
          }
          error={
            <p className="px-2 py-8 text-center font-manrope text-sm text-portfolio-accent-hover">
              Could not load the PDF. Ensure{" "}
              <code className="text-portfolio-accent">
                public/Jose_Alarcon_Chacon_Resume.pdf
              </code>{" "}
              exists.
            </p>
          }
          className="flex flex-col gap-3"
        >
          {numPages
            ? Array.from({ length: numPages }, (_, i) => (
                <Page
                  key={i + 1}
                  pageNumber={i + 1}
                  width={pageWidth}
                  className="rounded-lg border border-white/10 bg-white/5 [&_.react-pdf__Page__canvas]:mx-auto [&_.react-pdf__Page__canvas]:block"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))
            : null}
        </Document>
      </div>

      <ResumeViewModal open={viewerOpen} onClose={() => setViewerOpen(false)} />
    </>
  );
}
