"use client";

import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsTrigger } from "../ui/tabs";
import { TabsList } from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const additionalContent = [
  {
    title: "Total Profits",
    value: 295.86,
  },
  {
    title: "Total Losses",
    value: -36.82,
  },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

const percentChange = 85.6;
export default function AccountPerformanceOverTime({
  className,
}: {
  className: string;
}) {
  return (
    <Card className={className}>
      <Tabs defaultValue="day">
        <CardHeader className="flex flex-col pb-0 sm:flex-row w-full md:items-center justify-between">
          <div>
            <h3>Account Performance </h3>
          </div>
          <TabsList className="p-1 bg-background border rounded-md w-fit">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="py-0">
          <TabsContent value={"day"}>
            <div className="flex items-start gap-0.5 pb-1.5">
              <h1 className="text-3xl font-bold tracking-wide">
                ${additionalContent[0].value - Math.abs(additionalContent[1].value)}k
              </h1>
              <div
                className={cn(
                  "flex items-center justify-center text-xs p-0.5 rounded-sm",
                  percentChange > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {percentChange > 0 ? (
                  <ArrowUpIcon className="h-3 w-4" />
                ) : (
                  <ArrowDownIcon className="h-3 w-4" />
                )}
                {percentChange}%
              </div>
            </div>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value={"week"}>
            <div className="flex items-start gap-0.5 pb-1.5">
              <h1 className="text-3xl font-bold tracking-wide">
                ${additionalContent[0].value - Math.abs(additionalContent[1].value)}k
              </h1>
              <div
                className={cn(
                  "flex items-center justify-center text-xs p-0.5 rounded-sm",
                  percentChange > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {percentChange > 0 ? (
                  <ArrowUpIcon className="h-3 w-4" />
                ) : (
                  <ArrowDownIcon className="h-3 w-4" />
                )}
                {percentChange}%
              </div>
            </div>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value={"month"}>
            <div className="flex items-start gap-0.5 pb-1.5">
              <h1 className="text-3xl font-bold tracking-wide">
                ${additionalContent[0].value - Math.abs(additionalContent[1].value)}k
              </h1>
              <div
                className={cn(
                  "flex items-center justify-center text-xs p-0.5 rounded-sm",
                  percentChange > 0 ? "text-green-500" : "text-red-500"
                )}
              >
                {percentChange > 0 ? (
                  <ArrowUpIcon className="h-3 w-4" />
                ) : (
                  <ArrowDownIcon className="h-3 w-4" />
                )}
                {percentChange}%
              </div>
            </div>
            <ChartContainer config={chartConfig}>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <defs>
                  <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--color-desktop)"
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
        <AdditionalStats />{" "}
      </Tabs>
    </Card>
  );
}

function AdditionalStats() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2 py-2">
      {additionalContent.map(({ title, value }, indx) => (
        <div
          key={indx}
          className="border-r-2 flex items-center gap-1 justify-center flex-col w-full"
        >
          <h4 className="">{title}</h4>
          <h1 className={"text-xl font-semibold"}>${Math.abs(value)}k</h1>
          <div
            className={cn(
              "flex items-center justify-center text-xs p-0.5 rounded-sm",
              value > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {value > 0 ? (
              <ArrowUpIcon className="h-3 w-4" />
            ) : (
              <ArrowDownIcon className="h-3 w-4" />
            )}
            {percentChange}%
          </div>
        </div>
      ))}
    </div>
  );
}
