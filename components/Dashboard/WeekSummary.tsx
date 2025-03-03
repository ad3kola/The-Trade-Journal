"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import { ChartColumnIncreasingIcon, DollarSign, Percent } from "lucide-react";
import { Card } from "../ui/card";
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
    anime({
      targets: { val: 0 },
      val: value,
      easing: "easeOutExpo",
      duration: 2250,
      round: 100,
      update: (anim) => {
        setDisplayValue(Number(anim.animations[0].currentValue)); // Ensure it's a number
      },
    });
  }, []);

  return isInteger
    ? String(Math.floor(displayValue)).padStart(2, "0") // Ensure "08", "12", etc.
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
      Icon: DollarSign,
      value: pnLStats?.totalPnL ?? 0,
      prefix: "$",
      isInteger: false,
    },
    {
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
    },
    {
      title: "Highest PnL",
      Icon: Percent,
      value: pnLStats?.highestPositivePnL ?? 0,
      prefix: "$",
      isInteger: false,
    },
  ];

  return (
    <section>
      <div className="w-full grid gap-4 grid-cols-2">
        {content.map(
          ({ title, Icon, value, prefix, isInteger }, indx) => {
            return (
              <Card key={indx}>
                <div className="p-2 flex w-full gap-3 items-center justify-start h-full">
                  <div
                    className={cn(
                      "text-foreground flex items-center justify-center rounded-lg h-full bg-primary shrink-0 px-3",
                      indx % 2 && "order-2"
                    )}
                  >
                    <Icon className="h-[22px] w-[22px] sm:w-[27px] sm:h-[27px]" />
                  </div>
                  <div className={cn("py-4 flex tracking-wide flex-col w-full flex-1 gap-1", indx % 2 && "pl-2")}>
                    <p className="text-[12px] sm:text-sm uppercase font-medium text-foreground/60">
                      {title}
                    </p>
                    <div className="flex w-full gap-2 items-center -mt-2">
                      <h3 className="tracking-wider mt-1 text-xl sm:text-2xl md:text-3xl font-bold">
                        {prefix}
                        <AnimatedNumber value={value} isInteger={isInteger} />
                      </h3>
                    </div>
                  </div>
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
