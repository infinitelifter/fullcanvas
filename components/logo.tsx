/**
 * The "FULL CANVAS" wordmark, left-aligned in a viewBox cropped to the text
 * with room on the right for wider serif fallbacks (Georgia isn't installed
 * everywhere), so it lines up with the container edge in every font.
 */
export default function Logo({
  fill = "#26242C",
  width = 172,
  height = 17,
}: {
  fill?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="120 68 590 58" width={width} height={height} role="img" aria-label="Full Canvas">
      <text
        x="122"
        y="120"
        fontSize="64"
        letterSpacing="14"
        fill={fill}
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        FULL CANVAS
      </text>
    </svg>
  );
}
