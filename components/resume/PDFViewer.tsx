"use client";

import { useState, useEffect, useRef } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PDFViewerProps {
  downloadUrl: string;
}

export default function PDFViewer({ downloadUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [containerWidth, setContainerWidth] = useState<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    // Initial width measurement with micro-delay for layout settlement
    const timeoutId = setTimeout(updateWidth, 100);

    window.addEventListener("resize", updateWidth);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  // Use local API proxy to prevent third-party CORS blocking
  const proxyUrl = `/api/pdf-proxy?url=${encodeURIComponent(downloadUrl)}`;

  return (
    <div
      className="flex flex-col items-center w-full"
      ref={containerRef}
      role="region"
      aria-label="Interactive PDF Resume Canvas"
    >
      <Document
        file={proxyUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={
          <div className="flex flex-col items-center justify-center py-28 text-text-muted">
            <span
              className="w-6 h-6 rounded-full border-2 border-border-primary border-t-foreground animate-spin mb-3"
              aria-hidden="true"
            />
            <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-text-muted">
              Rendering High-Res PDF Canvas...
            </span>
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center rounded-2xl border border-red-500/20 bg-red-500/5 my-6 max-w-lg mx-auto">
            <p className="text-sm font-bold text-red-600 dark:text-red-400">
              Unable to render PDF canvas in this browser session.
            </p>
            <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
              Third-party cookies or browser canvas restrictions may be active. Use the direct
              buttons above to open or download the document.
            </p>
          </div>
        }
      >
        <div className="flex flex-col gap-6 w-full items-center">
          {numPages &&
            Array.from(new Array(numPages), (_, index) => (
              <div
                key={`page_${index + 1}`}
                className="rounded-xl overflow-hidden shadow-md border border-border-primary bg-white w-full max-w-full flex justify-center transition-all duration-300 hover:shadow-lg"
              >
                <Page
                  pageNumber={index + 1}
                  width={containerWidth ? containerWidth : undefined}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="max-w-full"
                />
              </div>
            ))}
        </div>
      </Document>
    </div>
  );
}
