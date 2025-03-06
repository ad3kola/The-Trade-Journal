"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { fetchTradingSessionData } from "@/actions/db/actions";
import { DateRange } from "react-day-picker";

export default function SessionChart({
  docID,
  date,
}: {
  docID: string | null;
  date: DateRange | undefined;
}) {
  const [data, setData] = useState<
    { sessionName: string; wins: number; losses: number }[]
  >([]);

  useEffect(() => {
    if (docID) {
      const getSessionData = async () => {
        const res = await fetchTradingSessionData(docID, date?.from, date?.to);
        setData(res);
      };

      getSessionData();
    }
  }, [docID, date]);

  const chartConfig = {
    wins: {
      label: "Wins",
      color: "hsl(var(--primary))", // Example color
    },
    losses: {
      label: "Losses",
      color: "hsl(var(--foreground))", // Example color
    },
  };

  const chartData = data.map(({ sessionName, wins, losses }) => ({
    session: sessionName,
    wins,
    losses,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trade Session Wins & Losses</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[250px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="session"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="wins" fill={chartConfig.wins.color} radius={4} />
            <Bar dataKey="losses" fill={chartConfig.losses.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing trade data for the last session periods
        </div>
      </CardFooter>
    </Card>
  );
}
