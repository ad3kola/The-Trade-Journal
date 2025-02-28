"use client";

import { TrendingDown } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Losses } from "@/lib/typings";

export default function LossGradientChart({
  chartData,
}: {
  chartData: Losses[];
}) {
  const chartConfig = {
    loss: {
      label: "Loss",
      color: "hsla(0, 0%, 90%, 1)", // Whitish shade
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loss Trend</CardTitle>
        <CardDescription>Last 7 Days Performance</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            {/* Horizontal Grid Only */}
            <CartesianGrid vertical={false} strokeWidth={1} stroke="hsla(0, 0%, 70%, 0.3)" />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={{ stroke: "hsla(0, 0%, 80%, 0.8)", strokeWidth: 1 }}
              tickMargin={8}
            />

            {/* Disable Hover Line (Cursor) */}
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              <linearGradient id="lossGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsla(0, 0%, 90%, 1)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="hsla(0, 0%, 90%, 1)" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <Area
              dataKey="loss"
              type="monotone"
              fill="url(#lossGradient)"
              stroke="hsla(0, 0%, 90%, 1)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Losses decreased by 3.1% this week <TrendingDown className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing loss trends for the last 7 days
        </div>
      </CardFooter>
    </Card>
  );
}
