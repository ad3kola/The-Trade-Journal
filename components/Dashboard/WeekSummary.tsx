"use client";

import { useEffect, useState } from "react";
import { ChartColumnIncreasingIcon, DollarSign, Percent } from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { ChartPieIcon } from "@heroicons/react/24/solid";

// Assuming this function fetches the data from the API
const fetchTotalPnL = async (id: string) => {
  try {
    const response = await fetch(`/api/trade?id=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch total PnL");
    }
    const data = await response.json();
    return data.totalPnL; // Assuming the API returns { totalPnL: number }
  } catch (error) {
    console.error("Error fetching PnL:", error);
    return 0; // Default to 0 in case of error
  }
};

const fetchRRData = async (id: string) => {
  try {
    const response = await fetch(`/api/trade?id=${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch total PnL");
    }
    const data = await response.json();
    return data.totalRR; // Assuming the API returns { totalPnL: number }
  } catch (error) {
    console.error("Error fetching PnL:", error);
    return 0; // Default to 0 in case of error
  }
};

const WeekSummary = ({ id }: { id: string }) => {
  const [totalPnL, setTotalPnL] = useState<number | null>(null);
  const [tradeCount, setTradeCount] = useState<number>(0);
  const [totalRR, setTotalRR] = useState<number>(0);
  // Fetch the data when the component mounts
  useEffect(() => {

    const fetchAllTrades = async () => {
      const res = await fetch(`/api/trade?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTradeCount(data.trades.length);
    };
    const fetchPnLData = async () => {
      const data = await fetchTotalPnL(id);
      setTotalPnL(data); // Store the fetched data
    };
    const fetchTotalRR = async () => {
      const data = await fetchRRData(id);
      setTotalRR(data);
    };


    fetchTotalRR();
    fetchAllTrades();
    fetchPnLData();
  }, [id]); 
  console.log(totalRR)

  if (totalPnL === null) {
    return <div>Loading...</div>;
  }

  const content = [
    {
      title: "Realized PnL",
      Icon: DollarSign,
      color: "bg-green-500",
      value: totalPnL.toFixed(2),
    },
    {
      title: "Total Trades",
      Icon: ChartColumnIncreasingIcon,
      color: "bg-purple-500",
      value: tradeCount, // Replace with actual total trades data
    },
    {
      title: "Total R:R",
      Icon: ChartPieIcon,
      color: "bg-blue-600",
      value: totalRR.toFixed(2),
    },
    {
      title: "Highest PnL",
      Icon: Percent,
      color: "bg-pink-500",
      value: 12.8, // Replace with actual highest PnL data
    },
  ];

  return (
    <section>
      <div className="w-full grid gap-4 grid-cols-2">
        {content.map(({ title, Icon, value, color }, indx) => (
          <Card key={indx}>
            <div className="py-4 px-4 sm:px-6 flex flex-col w-full gap-4 items-start justify-between">
              <div className="flex items-start w-full justify-between gap-2">
                <div className="flex flex-1 flex-col gap-1">
                  <p className="text-sm uppercase font-medium text-foreground/60">
                    {title}
                  </p>
                  <h3 className="tracking-wider text-2xl xl:text-3xl font-bold">
                    {value}
                  </h3>
                </div>
                <div
                  className={cn(
                    "text-foreground flex items-center justify-center rounded-full h-[38px] md:h-[45px] shrink-0 w-[38px] md:w-[45px]",
                    color
                  )}
                >
                  <Icon className="h-[20px] w-[20px] md:w-[27px] md:h-[27px]" />
                </div>
              </div>
              <p className="text-[12px] md:text-[13px] font-light">
                <span className="font-semibold">3.48%</span> Since last week
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WeekSummary;
