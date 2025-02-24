import {
  ChartColumnIncreasingIcon,
  DollarSign,
  Percent,
} from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { ChartPieIcon } from "@heroicons/react/24/solid";

const WeekSummary = () => {
  const content = [
    {
      title: "Realized PnL",
      Icon: DollarSign,
      color: "bg-green-500",
      value: 798.48,
    },
    {
      title: "Total Trades",
      Icon: ChartColumnIncreasingIcon,
      color: "bg-purple-500",
      value: 12.8,
    },
    {
      title: "Total R:R",
      Icon: ChartPieIcon,
      color: "bg-blue-600",
      value: 12.8,
    },
    {
      title: "Highest PnL",
      Icon: Percent,
      color: "bg-pink-500",
      value: 12.8,
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
                <h3 className="tracking-wider text-2xl xl:text-3xl font-bold">{value}</h3>
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
                <p className="text-[12px] md:text-[13px] font-light"> <span className="font-semibold">3.48%</span> Since last week</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default WeekSummary;
