"use client";

import { Cell, LabelList, Pie, PieChart, type PieLabel } from "recharts";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", value: 20, fill: "var(--color-chrome)" },
  { browser: "safari", value: 80, fill: "var(--color-safari)" },
];

const chartConfig = {
  value: {
    label: "Value",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(240 1% 42%)",
  },
  safari: {
    label: "Safari",
    color: "hsl(240 2% 26%)",
  },
} satisfies ChartConfig;

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function ValuationPieChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          startAngle={90}
          endAngle={-450}
          labelLine={false}
          label={renderCustomizedLabel}
        />
      </PieChart>
    </ChartContainer>
  );
}
