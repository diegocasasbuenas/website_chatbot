interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  className?: string;
}

export function ConnectionLine({ startX, startY, endX, endY, className = "" }: ConnectionLineProps) {
  return (
    <svg
      className={`absolute top-0 left-0 pointer-events-none ${className}`}
      style={{
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}