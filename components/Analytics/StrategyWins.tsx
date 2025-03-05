"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

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
import { fetchStrategyWins, fetchUserMetrics } from "@/actions/db/actions"; // Ensure these functions are imported correctly

// Function to format metric names
function formatMetric(metric: string) {
  return metric
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
}

export default function StrategyWins({ docID }: { docID: string | null }) {
  const [chartData, setChartData] = useState<{ metric: string; wins: number }[]>([]);

  useEffect(() => {
    const loadMetricsAndWins = async () => {
      const fetchedMetrics = await fetchUserMetrics(); // Fetch metrics
      if (docID) {
        const winData = await Promise.all(
          fetchedMetrics.map(async (metric) => ({
            metric: formatMetric(metric), // Format the metric names
            wins: await fetchStrategyWins(docID, metric), // Fetch wins for each metric
          }))
        );

        setChartData(winData); // Update chart data
      }
    };

    loadMetricsAndWins();
  }, [docID]);

  const chartConfig: ChartConfig = chartData.reduce((acc, { metric }) => {
    acc[metric] = {
      label: metric,
      color: `hsl(var(--primary))`, 
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Strategy Win Rate</CardTitle>
        <CardDescription>Performance per strategy metric</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className='aspect-auto h-[250px]' config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="metric"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)} // Abbreviate the metric names
              hide
            />
            <XAxis dataKey="wins" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar dataKey="wins" radius={4} fill="hsl(var(--primary))">
              <LabelList
                dataKey="metric"
                position="insideLeft"
                offset={8}
                className="fill-foreground tracking-wide font-bold"
                fontSize={12}
              />
              <LabelList
                dataKey="wins"
                position="right"
                offset={8}
                className="fill-foreground font-bold"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing strategy performance data for the last few months
        </div>
      </CardFooter>
    </Card>
  );
}
