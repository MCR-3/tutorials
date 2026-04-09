"use client";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

/* ── Chart wrappers ──────────────────────────────────────────── */

type DataPoint = Record<string, string | number>;

export function TutorialLineChart({
  data,
  dataKey,
  xKey = "x",
  color,
  height = 300,
}: {
  data: DataPoint[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <div className="my-6">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey={xKey}
            tick={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
          />
          <YAxis tick={{ fontFamily: "var(--font-mono)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              border: "1px solid var(--border)",
              borderRadius: 6,
              background: "var(--color-white)",
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color ?? "var(--color-green)"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TutorialBarChart({
  data,
  dataKey,
  xKey = "x",
  color,
  height = 300,
}: {
  data: DataPoint[];
  dataKey: string;
  xKey?: string;
  color?: string;
  height?: number;
}) {
  return (
    <div className="my-6">
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={data}
          margin={{ top: 8, right: 16, bottom: 8, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey={xKey}
            tick={{ fontFamily: "var(--font-mono)", fontSize: 12 }}
          />
          <YAxis tick={{ fontFamily: "var(--font-mono)", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              border: "1px solid var(--border)",
              borderRadius: 6,
              background: "var(--color-white)",
            }}
          />
          <Bar
            dataKey={dataKey}
            fill={color ?? "var(--color-green)"}
            radius={[3, 3, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── MDX component map ───────────────────────────────────────── */

export const mdxComponents = {
  TutorialLineChart,
  TutorialBarChart,
};
