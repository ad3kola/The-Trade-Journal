"use client";

import { useEffect, useMemo, useState } from "react";
import { Cell, Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

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
  ChartStyle,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchMostTradedCoins } from "@/actions/db/actions";

interface CoinData {
  id: number;
  name: string;
  count: number;
  fill: string;
}

export default function MostTradedCoins({ docID }: { docID: string | null }) {
  const [coins, setCoins] = useState<CoinData[]>([]);
  const [selectedName, setSelectedName] = useState<string | undefined>();

  useEffect(() => {
    if (docID) {
      const fetchData = async () => {
        const data = await fetchMostTradedCoins(docID);
        setCoins(data);
        if (data.length > 0) setSelectedName(data[0].name);
      };
      fetchData();
    }
  }, [docID]);

  const activeIndex = useMemo(
    () => coins.findIndex((coin) => coin.name === selectedName),
    [selectedName, coins]
  );
  // Generate chartConfig dynamically based on coin data
  const chartConfig: ChartConfig = useMemo(() => {
    return coins.reduce((acc, coin, index) => {
      acc[coin.name] = {
        label: coin.name,
        color: `hsl(${(index * 60 + 270) % 360}, 70%, 50%)`, // Generate distinct purplish colors
      };
      return acc;
    }, {} as ChartConfig);
  }, [coins]);

  console.log(coins);

  return (
    <Card className="flex flex-col">
      <ChartStyle id="pie-interactive" config={chartConfig} />
      <CardHeader className="flex-row items-start space-y-0 pb-0">
        <div className="grid gap-1">
          <CardTitle className="text-lg">Most Traded Coins by Volume</CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-2">
            <CardDescription className="md:col-span-2">
              An Interactive pie chart showing the distribution of your most
              traded coins by volume. Use the dropdown to explore.
            </CardDescription>
            <div className="md:col-span-2">
              <Select value={selectedName} onValueChange={setSelectedName}>
                <SelectTrigger className="h-11 w-[180px] rounded-lg pl-3.5">
                  <SelectValue placeholder="Select a coin" />
                </SelectTrigger>
                <SelectContent align="end" className="rounded-xl">
                  {coins.map((coin) => (
                    <SelectItem
                      key={coin.name}
                      value={coin.name}
                      className="rounded-lg"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span
                          className="flex h-4 w-4 shrink-0 rounded-sm"
                          style={{
                            backgroundColor: chartConfig[coin.name]?.color,
                          }}
                        />
                        {coin.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-4">
        <ChartContainer
          className="mx-auto aspect-square w-full max-w-[300px]"
          config={chartConfig}
        >
          <PieChart>
            <Pie
              data={coins}
              dataKey="count"
              nameKey="name"
              innerRadius={60}
              strokeWidth={5}
              fill="red"
              activeIndex={activeIndex}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <g>
                  <Sector {...props} outerRadius={outerRadius + 10} />
                  <Sector
                    {...props}
                    outerRadius={outerRadius + 25}
                    innerRadius={outerRadius + 12}
                  />
                </g>
              )}
            >
              {coins.map((coin) => (
                <Cell key={coin.name} fill={chartConfig[coin.name]?.color} />
              ))}
              <Label
                content={({ viewBox }) =>
                  viewBox && "cx" in viewBox && "cy" in viewBox ? (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {coins[activeIndex]?.count?.toLocaleString() || "0"}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground"
                      >
                        Trades
                      </tspan>
                    </text>
                  ) : null
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
