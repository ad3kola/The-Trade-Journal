"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PnLOverviewCharts } from "@/lib/typings";

export interface Props {
  date: string;
  profit?: number;
  loss?: number;
}

const chartConfig = {
  profits: {
    label: "Profits",
    color: "hsl(var(--primary))",
  },
  losses: {
    label: "Losses",
    color: "hsl(var(--foreground))",
  },
} satisfies ChartConfig;

export default function GradientChart({
  chartData,
}: {
  chartData: PnLOverviewCharts;
}) {
  const [active, setActive] = useState("profits");
  const [filteredData, setFilteredData] = useState<Props[]>([]);

  useEffect(() => {
    if (active == "profits") {
      setFilteredData(chartData.profits);
    }
    if (active == "losses") {
      setFilteredData(chartData.losses);
    }
  }, [active, chartData]);

  console.log(filteredData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-2 text-center sm:text-left">
          <CardTitle>Trade Performance Overview</CardTitle>
          <CardDescription>
            Displaying the realized Profits & Losses from the last 10
            trades
          </CardDescription>
        </div>
        <Select value={active} onValueChange={setActive}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="profits" className="rounded-lg">
              Profits
            </SelectItem>
            <SelectItem value="losses" className="rounded-lg">
              Losses
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={
                    active == "profits"
                      ? "var(--color-profits)"
                      : "var(--color-losses)"
                  }
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={
                    active == "profits"
                      ? "var(--color-profits)"
                      : "var(--color-losses)"
                  }
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="hsl(242 22% 28% / 20%)" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey={active === "profits" ? "Profit" : "Loss"}
              type="natural"
              fill="url(#fillDesktop)"
              stroke={
                active === "profits"
                  ? "var(--color-profits)"
                  : "var(--color-losses)"
              }
              dot={{
                fill:
                  active === "profits"
                    ? "var(--color-profits)" // Fill color for profit dots
                    : "var(--color-losses)", // Fill color for loss dots
              }}
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
