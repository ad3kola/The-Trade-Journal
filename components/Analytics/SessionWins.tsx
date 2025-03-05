"use client";

import { TrendingUp } from "lucide-react";
import { LabelList, Pie, PieChart } from "recharts";

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
import { useEffect, useState } from "react";
import { fetchMostWinsInTradedSessionTimes } from "@/actions/db/actions";

export default function SessionWins({ docID }: { docID: string | null }) {
  const [data, setData] = useState<{ sessionName: string; count: number }[]>([]);

  useEffect(() => {
    if (docID) {
      const getSessionData = async () => {
        const res = await fetchMostWinsInTradedSessionTimes(docID);
        setData(res);
      };

      getSessionData();
    }
  }, [docID]);

  // Dynamically generating the chart configuration based on session data
  const chartConfig = data.reduce((acc, { sessionName }, index) => {
    acc[sessionName] = {
      label: sessionName,
      color: `hsl(${(index * 60 +260) % 360}, 70%, 50%)`, // Generate distinct color for each session
    };
    return acc;
  }, {} as ChartConfig);

  // Preparing the chart data for PieChart rendering
  const chartData = data.map(({ sessionName, count }) => ({
    session: sessionName,
    Trades: count,
    fill: chartConfig[sessionName]?.color || "gray", 
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Wins</CardTitle>
        <CardDescription>January - June 2024 - {docID}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="session" hideLabel />}
            />
            <Pie data={chartData} dataKey="Trades">
              <LabelList
                dataKey="session"
                className="fill-foreground"
                stroke="none"
                fontSize={12}
                formatter={(value: string) => chartConfig[value]?.label || value}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
