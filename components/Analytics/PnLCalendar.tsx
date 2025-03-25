"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { fetchAnalyticsCalendarPnL } from "@/actions/db/actions";
import { Button } from "../ui/button";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CalendarPnLChart from "./CalendarPnLChart";
import StrategyRadar from "./StrategyRadar";

function PnLCalendar({ docID }: { docID: string | null }) {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [trades, setTrades] = useState<
    { date: string; total: number; tradesCount: number }[]
  >([]);
  const daysInMonth = currentMonth.daysInMonth();
  const startDay = currentMonth.startOf("month").day(); // Get starting weekday
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Fetch calendar PnL on component mount and whenever docID or currentMonth changes
  useEffect(() => {
    if (docID) {
      const fetchCalendarPnL = async () => {
        const data = await fetchAnalyticsCalendarPnL(docID);

        setTrades(data); // Update state with fetched trades data
      };
      fetchCalendarPnL();
    }
  }, [docID, currentMonth]);

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "month"));
  };

  const handleNextYear = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "year"));
  };

  const handlePreviousYear = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "year"));
  };
  return (
    <div className="grid grid-cols-1 col-span-1 xl:grid-cols-3 gap-4 lg:col-span-2 xl:col-span-3">
      <Card className="xl:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-between w-full gap-2">
              <Button
                size="sm"
                variant={"outline"}
                onClick={handlePreviousYear}
              >
                <ChevronDoubleLeftIcon className="h-3 w-3" />
              </Button>
              <div className=" flex-1 flex items-center w-full justify-center gap-4 sm:gap-8">
                <Button
                  size="sm"
                  variant={"outline"}
                  onClick={handlePreviousMonth}
                >
                  <ChevronLeftIcon className="h-3 w-3" />
                </Button>
                <CardTitle className="mx-2 whitespace-nowrap">
                  {currentMonth.format("MMMM YYYY")}
                </CardTitle>
                <Button size="sm" variant={"outline"} onClick={handleNextMonth}>
                  <ChevronRightIcon className="h-3 w-3" />
                </Button>
              </div>
              <Button size="sm" variant={"outline"} onClick={handleNextYear}>
                <ChevronDoubleRightIcon className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="py-2 px-1 sm:p-6">
          <div className="grid grid-cols-7 gap-1 text-center ">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="font-medium text-xs border rounded-sm text-foreground py-1"
              >
                {day}
              </div>
            ))}

            {/* Empty cells for start offset */}
            {Array.from({ length: startDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {monthDays.map((day) => {
              const dateKey = currentMonth.date(day).format("MM/DD/YYYY");
              const pnl = trades.find((trade) => trade.date == dateKey) || null;
              return (
                <div
                  key={day}
                  className={`p-2 rounded-sm sm:h-20 h-[60px] lg:h-[84px] flex shadow-none hover:opacity-80 cursor-pointer flex-col justify-start ${
                    pnl && pnl.total > 0
                      ? "bg-green-950 text-green-500"
                      : pnl && pnl.total < 0
                      ? "bg-red-950 text-red-600"
                      : "bg-input font-bold text-gray-400 z-40"
                  }`}
                >
                  <p className="text-xs lg:text-sm font-normal">
                    {day.toString().padStart(2, "0")}
                  </p>
                  {pnl !== null && (
                    <>
                      <div className="text-xs md:text-sm whitespace-nowrap lg:text-base mt-2 text-center font-semibold tracking-wide flex flex-col">
                        ${Math.abs(pnl.total)}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
          <Card className={cn("p-4 gap-3")}>
            <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
              Account Balance & PnL
            </CardTitle>
            <CardContent className="p-0 py-2 flex flex-col gap-2">
              <h1 className=" text-3xl font-bold ">
                {" "}
                ${(39032.5).toLocaleString()}
              </h1>
              <h4 className="text-sm">
                Total Profits Made: <span>{}</span>
              </h4>
              <h4 className="text-sm">
                Total Profits Made: <span>{}</span>
              </h4>
              <h4 className="text-sm">
                Total Losses Made: <span>{}</span>
              </h4>
            </CardContent>
          </Card>
          <CalendarPnLChart />
        </div>
        <StrategyRadar />
      </div>
    </div>
  );
}

export default PnLCalendar;
