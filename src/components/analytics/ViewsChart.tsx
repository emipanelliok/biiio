"use client";

interface DataPoint {
  date: string;
  views: number;
}

interface ViewsChartProps {
  data: DataPoint[];
}

export default function ViewsChart({ data }: ViewsChartProps) {
  const max = Math.max(...data.map(d => d.views));
  const min = Math.min(...data.map(d => d.views));
  const range = max - min || 1;

  const width = 600;
  const height = 140;
  const padding = { top: 10, right: 10, bottom: 24, left: 10 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const points = data.map((d, i) => ({
    x: padding.left + (i / (data.length - 1)) * chartWidth,
    y: padding.top + (1 - (d.views - min) / range) * chartHeight,
    ...d,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - padding.bottom} L ${points[0].x} ${height - padding.bottom} Z`;

  return (
    <div className="w-full overflow-hidden">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d2aef8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#d2aef8" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 0.33, 0.66, 1].map((t) => (
          <line
            key={t}
            x1={padding.left}
            x2={width - padding.right}
            y1={padding.top + t * chartHeight}
            y2={padding.top + t * chartHeight}
            stroke="rgba(0,0,0,0.05)"
            strokeWidth="1"
          />
        ))}

        {/* Area fill */}
        <path d={areaD} fill="url(#chartGrad)" />

        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke="#d2aef8"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          i % 2 === 0 && (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#d2aef8"
              stroke="white"
              strokeWidth="2"
            />
          )
        ))}

        {/* X-axis labels */}
        {points
          .filter((_, i) => i % 3 === 0)
          .map((p) => (
            <text
              key={p.date}
              x={p.x}
              y={height - 4}
              textAnchor="middle"
              fontSize="9"
              fill="#aaa3b5"
            >
              {p.date}
            </text>
          ))}
      </svg>
    </div>
  );
}
