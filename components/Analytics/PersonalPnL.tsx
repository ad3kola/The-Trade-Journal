"use client";

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
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { fetchAnalyticsPnL } from "@/actions/db/actions";

const chartConfig = {
  personal: {
    label: "Personal",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

export default function PersonalPnL({
  docID,
  date,
}: {
  docID: string | null;
  date: DateRange | undefined;
}) {

  const [chartData, setChartData] = useState<{date: string; value: number}[]>([]);
  const [pnlInfo, setPnlInfo] = useState<{ name: string; value: number } | null>(
    null
  );
  
  useEffect(() => {
    if (docID) {
      const fetchData = async () => {
        const data = await fetchAnalyticsPnL(docID, date?.from, date?.to);
        setPnlInfo({
          name: data.personalPnL.name,
          value: data.personalPnL.value,
        });
  
        setChartData(data.personalPnL.data);
      };
      fetchData();
    }
  }, [docID, date]);

  



  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h3>Total Realized PnL</h3>
        </CardTitle>
        <CardDescription>
          <div className="flex flex-col mt-3 gap-1">
            {pnlInfo?.name}
            <div className="flex items-start gap-2 text-foreground">
              <h3 className="text-4xl lg:text-3xl xl:text-4xl font-extrabold tracking-wide">
                ${pnlInfo?.value.toFixed(2)}
              </h3>
              <span className="bg-purple-950 text-purple-400 rounded-full text-[11px] px-1.5 py-0.5">
                +49%
              </span>
            </div>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="aspect-auto h-[300px]">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            {/* Gradient Definition */}
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-personal)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-personal)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="hsl(242 22% 28% / 40%)" vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="value"
              type="natural"
              fill="var(--color-personal)" 
              stroke="var(--color-personal)"
              strokeWidth={1}
              fillOpacity={0.4}
              dot={{
                fill: "var(--color-personal)"
              }}
              activeDot={{
                r: 3,
              }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
