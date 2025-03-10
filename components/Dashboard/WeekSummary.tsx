"use client";

import { useEffect, useState } from "react";
import anime from "animejs";
import {
  ChartColumnIncreasingIcon,
  DollarSign,
  EyeClosedIcon,
  EyeIcon,
  Percent,
} from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { ChartPieIcon } from "@heroicons/react/24/solid";
import { PNLs, RR } from "@/app/(dashboard)/overview/[id]/page";
import { Button } from "../ui/button";

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
        setDisplayValue((Number(anim.animations[0].currentValue)));
      },
    });

    return () => animation.pause();
  }, [value])

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
  const [hideBalance, setHidden] = useState(false);

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
        {content.map(({ title, Icon, value, prefix, isInteger }, indx) => {
          const isRealizedPnL = title.toLowerCase() === "realized pnl";

          return (
            <Card key={indx}>
              <div className="p-2 flex w-full gap-3 items-center justify-start h-full">
                <div
                  className={cn(
                    "text-[#fff] flex items-center justify-center rounded-lg h-full bg-primary dark:text-foreground shrink-0 px-3",
                    indx % 2 && "order-2"
                  )}
                >
                  <Icon className="h-[22px] w-[22px] sm:w-[27px] sm:h-[27px]" />
                </div>
                <div
                  className={cn(
                    "py-4 flex tracking-wide flex-col w-full flex-1 gap-1 relative",
                    indx % 2 && "pl-2"
                  )}
                >
                  {isRealizedPnL && (
                    <Button
                      onClick={() => setHidden(!hideBalance)}
                      variant="outline"
                      size="sm"
                      className="w-fit absolute right-2 top-4.5 px-1.5"
                    >
                      {hideBalance ? (
                        <EyeClosedIcon className="cursor-pointer h-4 w-4" />
                      ) : (
                        <EyeIcon className="cursor-pointer h-4 w-4" />
                      )}
                    </Button>
                  )}
                  <p className="text-[12px] sm:text-sm uppercase font-medium text-foreground/60">
                    {title}
                  </p>
                  <div className="flex w-full gap-2 items-center -mt-2">
                    <h3 className="tracking-wider mt-1 text-xl sm:text-2xl md:text-3xl font-bold">
                      {isRealizedPnL && hideBalance ? (
                        "****"
                      ) : (
                        <>
                          {prefix}
                          <AnimatedNumber value={value} isInteger={isInteger} />
                        </>
                      )}
                    </h3>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default WeekSummary;
