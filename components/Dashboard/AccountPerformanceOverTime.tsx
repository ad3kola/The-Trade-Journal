"use client";

import { ArrowDownIcon, ArrowUpIcon, GitCommitVertical } from "lucide-react";
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
import { PnLOverviewCharts } from "@/lib/typings";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;


const percentChange = 85.6;
export default function AccountPerformanceOverTime({
  className,
  data
}: {
  className: string;
  data: PnLOverviewCharts
}) {
  const chartData = data.Profits_Array
  return (
    <Card className={className}>
      <Tabs defaultValue="day">
        <CardHeader className="flex flex-col-reverse pb-0 gap-3 sm:flex-row w-full md:items-center justify-between">
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
            <div className="flex items-start gap-0.5 pb-1.5 md:-mt-3">
              <h1 className="text-3xl font-bold tracking-wide">
                $
                {data.Realized_PnL}
                
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
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
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
                  dataKey="profit"
                  type="natural"
                  fill="url(#fillDesktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  stackId="a"
                  dot={({ cx, cy, payload }) => {
                    const r = 24
                    return (
                      <GitCommitVertical
                        key={payload.month}
                        x={cx - r / 2}
                        y={cy - r / 2}
                        width={r}
                        height={r}
                        fill="hsl(var(--background))"
                        stroke="var(--color-desktop)"
                      />
                    )
                  }}
                />
              </AreaChart>
            </ChartContainer>
          </TabsContent>
        </CardContent>
        <AdditionalStats losses={data.Total_Loss} profits={data.Total_Profit} />{" "}
      </Tabs>
    </Card>
  );
}

function AdditionalStats({
  profits,
  losses,
}: {
  losses: string;
  profits: string;
}) {
  console.log(profits);

  const additionalContent = [
    {
      title: "Total Profits",
      value: profits,
    },
    {
      title: "Total Losses",
      value: losses,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4 mt-4 p-2">
      {additionalContent.map(({ title, value }, indx) => (
        <div
          key={indx}
          className="border-r-2 flex items-center gap-1 justify-center flex-col w-full"
        >
          <h4 className="">{title}</h4>
          <h1 className={"text-2xl font-semibold"}>${value}</h1>
          <div
            className={cn(
              "flex items-center justify-center text-xs p-0.5 rounded-sm",
              Number(value) > 0 ? "text-green-500" : "text-red-500"
            )}
          >
            {Number(value) > 0 ? (
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
