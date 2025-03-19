"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChartColumnIncreasingIcon,
  CircleDollarSign,
  PercentCircleIcon,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { cn } from "@/lib/utils";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { PNLs, RR } from "@/app/(dashboard)/overview/[id]/page";

const AnimatedNumber = ({
  value,
  isInteger,
}: {
  value: number;
  isInteger?: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = anime({
      targets: { val: displayValue },
      val: value,
      easing: "easeOutExpo",
      duration: 2000,
      round: 1,
      update: (anim) => {
        setDisplayValue(Number(anim.animations[0].currentValue));
      },
    });

    return () => animation.pause();
  }, [value]);

  return isInteger
    ? String(Math.floor(displayValue)).padStart(2, "0")
    : displayValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
};

const WeekSummary = ({
  pnLStats,
  RRStats,
}: {
  pnLStats: PNLs | null;
  RRStats: RR | null;
}) => {
  const formattedTrades = RRStats?.totalTrades ?? 0;

  const content = [
    {
      title: "Realized PnL",
      Icon: CircleDollarSign,
      value: pnLStats?.totalPnL ?? 0,
      prefix: "$",
      isInteger: false,
      previousValue: 0,
      percentChange: 10.8,
    },

    {
      title: "Highest PnL",
      Icon: PercentCircleIcon,
      value: pnLStats?.highestPositivePnL ?? 0,
      prefix: "$",
      isInteger: false,
      previousValue: 0,
      percentChange: 21.2,
    },    {
      title: "Total Trades",
      Icon: ChartColumnIncreasingIcon,
      value: formattedTrades,
      isInteger: true,
    },
    {
      title: "Total R:R",
      Icon: ChartPieIcon,
      value: RRStats?.totalRR ?? 0,
      isInteger: false,
      previousValue: 0,
    },
  ];

  return (
    <section>
      <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {content.map(
          ({ title, Icon, value, prefix, isInteger, percentChange }, indx) => {
            return (
              <Card key={indx} className="rounded-sm">
                <div className="py-2 flex w-full gap-3 items-center justify-start h-full">
                  <CardHeader
                    className={cn(
                      "py-2 flex tracking-wide flex-col w-full flex-1 gap-1 relative"
                    )}
                  >
                    <div className="flex justify-between w-full items-start">
                      <p className="text-sm font-medium text-foreground/80">
                        {title}
                      </p>
                      <div className="p-2 rounded-sm dark:bg-input bg-accent w-8 h-8">
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <CardContent className="flex flex-col w-full p-0">
                      <div className="flex w-full gap-2 items-center -mt-3">
                        <h3 className="tracking-wider text-2xl font-bold">
                          <>
                            {prefix}
                            <AnimatedNumber
                              value={value}
                              isInteger={isInteger}
                            />
                          </>
                        </h3>
                        {percentChange && <div
                          className={cn(
                            "flex items-center justify-center text-xs p-0.5 rounded-sm",
                            percentChange > 0
                              ? "bg-green-950 text-green-500"
                              : "bg-red-950 text-red-500"
                          )}
                        >
                          {percentChange > 0 ? (
                            <ArrowUpIcon className="h-3 w-4" />
                          ) : (
                            <ArrowDownIcon className="h-3 w-4" />
                          )}
                          {percentChange}%
                        </div>}
                      </div>
                      <p
                        className="
                        text-[11px] mt-1 md:mt-0 text-foreground/80"
                      >
                        vs. $98.14 last period
                      </p>
                    </CardContent>
                  </CardHeader>
                </div>
              </Card>
            );
          }
        )}
      </div>
    </section>
  );
};

export default WeekSummary;
