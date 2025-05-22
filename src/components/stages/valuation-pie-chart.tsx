"use client";

import { Pie, PieChart } from "recharts";

import { type ChartConfig, ChartContainer } from "@/components/ui/chart";
import { type PieChartData } from "@/type/app";

const RADIAN = Math.PI / 180;

type CustomizedLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type ValuationPieChartProps = {
  chartData: PieChartData[];
  chartConfig: ChartConfig;
};
export function ValuationPieChart({
  chartData,
  chartConfig,
}: ValuationPieChartProps) {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]">
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
