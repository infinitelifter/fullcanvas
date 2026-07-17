export default function Logo({
  fill = "#26242C",
  width = 204,
  height = 59,
}: {
  fill?: string;
  width?: number;
  height?: number;
}) {
  return (
    <svg viewBox="0 0 900 260" width={width} height={height} role="img" aria-label="Full Canvas Digital">
      <g fill={fill} fontFamily="Georgia, 'Times New Roman', serif">
        <text x="450" y="120" textAnchor="middle" fontSize="64" letterSpacing="14">
          FULL CANVAS
        </text>
        <rect x="285" y="157" width="330" height="1.5" />
        <text
          x="450"
          y="201"
          textAnchor="middle"
          fontSize="19"
          letterSpacing="17"
          fontFamily="var(--font-sans), Helvetica, Arial, sans-serif"
        >
          D I G I T A L
        </text>
      </g>
    </svg>
  );
}
