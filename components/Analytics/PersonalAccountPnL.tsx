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
import { PnLDetails } from "@/lib/typings";
import { DateRange } from "react-day-picker";
import { fetchAnalyticsPnL } from "@/actions/db/actions";
import { cn } from "@/lib/utils";

export interface Props {
  date: string;
  profit?: number;
  loss?: number;
}


export default function GradientChart({
  docID,
  date,
  colors
}: {
  docID: string | null;
  date: DateRange |undefined;
  colors: {up: string, down: string};
}) {
  const [active, setActive] = useState("profits");
  const [chartData, setChartData] = useState<PnLDetails[]>([]);
  const [PnLInfo, setPnlInfo] = useState<{ name: string; totalPnL: number }>();

  const chartConfig = {
    profits: {
      label: "Profits",
      color: colors.up === "primary" ? `hsl(var(--${colors.up}))` : colors.up, 
    },
    losses: {
      label: "Losses",
      color: colors.down === "foreground" ? `hsl(var(--${colors.down}))` : colors.down,
    },
  } satisfies ChartConfig

  useEffect(() => {
    if (docID) {
      const getPersonalPnLs = async () => {
        const data = await fetchAnalyticsPnL(docID, date?.from, date?.to);
        setPnlInfo(data.personalPnL);
        if (active == "profits") {
          setChartData(data.personalPnL.wins);
        }
        if (active == "losses") {
          setChartData(data.personalPnL.losses);
        }
      };
      getPersonalPnLs();
    }
  }, [active, date, docID]);

  console.log(chartData);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        {PnLInfo && <div className="grid flex-1 gap-2 text-center sm:text-left">
          <CardTitle>{PnLInfo?.name}</CardTitle>
          <CardDescription className={cn("text-3xl tracking-wider font-extrabold text-foreground")}>
            ${PnLInfo.totalPnL.toFixed(2)}
          </CardDescription>
        </div>}
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
      <CardContent className="px-2 pt-4 pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={active == "profits" ? "var(--color-profits)" : "var(--color-losses)"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={active == "profits" ? "var(--color-profits)" : "var(--color-losses)"}
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
              dataKey="value"
              type="natural"
              fill="url(#fillDesktop)"
              stroke={active === "profits" ? "var(--color-profits)" : "var(--color-losses)"}
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
