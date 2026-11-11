import type { ReactNode } from "react";

/**
 * Printer's crop marks around whatever it wraps: two short ticks at each
 * corner, set off from the box, in the accent colour. Purely decorative.
 * Inside a <Reveal> the ticks draw in when the block scrolls into view.
 */
export default function CropMarks({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`crop ${className}`.trim()}>
      {children}
      <span className="crop__corner crop__corner--tl" aria-hidden="true" />
      <span className="crop__corner crop__corner--tr" aria-hidden="true" />
      <span className="crop__corner crop__corner--bl" aria-hidden="true" />
      <span className="crop__corner crop__corner--br" aria-hidden="true" />
    </div>
  );
}
