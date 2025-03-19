"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import {
  fetchPnLData,
  fetchRRData,
  fetchTradeDataForLast7Trades,
  getAllTrades,
  getCurrentUserDoc,
  tradeCalendar,
} from "@/actions/db/actions";
import { formSchema } from "@/config/zod";
import { z } from "zod";
import Milestones from "@/components/Dashboard/Milestones";
import TradeCalendar from "@/components/Dashboard/TradeCalendar";
import WeekSummary from "@/components/Dashboard/WeekSummary";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import { PnLOverviewCharts } from "@/lib/typings";
import DashbaordSkeleton from "@/components/DashbaordSkeleton";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountPerformanceOverTime from "@/components/Dashboard/AccountPerformanceOverTime";
import WinRate from "@/components/Dashboard/WinRate";

export interface PNLs {
  totalPnL: number;
  highestPositivePnL: number;
  highestNegativePnL: number;
  winRate: number;
}

export interface RR {
  totalRR: number;
  highestPositiveRR: number;
  totalTrades: number;
}

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [docID, setDocID] = useState<string | null>(null);
  const [allTrades, setAllTrades] = useState<z.infer<typeof formSchema>[]>([]);
  const [pnLStats, setPnLStats] = useState<PNLs | null>(null);
  const [RRStats, setRRStats] = useState<RR | null>(null);
  // const [winRate, setWinRate] = useState<number | null>(null);
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);
  const [chartData, setChartData] = useState<PnLOverviewCharts | null>(null);

  // Listen for Auth Changes

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        if (doc) setDocID(doc.docRefID);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!docID) return;
    setIsLoading(true);

    const fetchData = async () => {
      const startOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        1
      );
      const endOfMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      );
      try {
        const [trades, pnL, RR, dates, chart] = await Promise.all([
          getAllTrades(docID, startOfMonth, endOfMonth),
          fetchPnLData(docID, startOfMonth, endOfMonth),
          fetchRRData(docID, startOfMonth, endOfMonth),
          tradeCalendar(docID),
          fetchTradeDataForLast7Trades(docID, startOfMonth, endOfMonth),
        ]);
        setAllTrades(trades);
        setPnLStats(pnL);
        setRRStats(RR);
        setCalendarDates(dates);
        setChartData(chart);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [docID]);
  console.log(chartData);
  // Set Win Rate when `pnLStats` is available
  // useEffect(() => {
  //   if (pnLStats) setWinRate(pnLStats.winRate);
  // }, [pnLStats]);

  const dataWnL = { total: 13, wins: 5, losses: 8 };

  const [dateRange, setDateRange] = useState<
    "today" | "this week" | "this month"
  >("today");
  const cycleDateRange = (direction: "prev" | "next") => {
    const ranges = ["today", "this week", "this month"] as const;
    const currentIndex = ranges.indexOf(dateRange);
    const newIndex =
      direction === "next"
        ? (currentIndex + 1) % ranges.length
        : (currentIndex - 1 + ranges.length) % ranges.length;
    setDateRange(ranges[newIndex]);
  };
  return (
    <main suppressHydrationWarning className="w-full px-2 py-4">
      {isLoading ? (
        <DashbaordSkeleton />
      ) : (
        <>
          {" "}
          <div className="flex items-center justify-between w-full py-2">
            <h3 className="flex-1 w-full ">Dashboard, March 2025</h3>
            <div className="flex items-center  gap-1">
              <Button
                size="sm"
                variant="outline"
                onClick={() => cycleDateRange("prev")}
              >
                <ArrowLeftIcon />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="capitalize w-[100px]"
              >
                {dateRange}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => cycleDateRange("next")}
              >
                <ArrowRightIcon />
              </Button>
            </div>
          </div>
          <div className="flex flex-col w-full gap-3">
            <WeekSummary pnLStats={pnLStats} RRStats={RRStats} />
            <div className="grid grid-cols-1 xl:grid-cols-3  gap-4 w-full">
              <AccountPerformanceOverTime className="col-span-1 xl:col-span-2" />
              <div className="flex lg:flex-col flex-col-reverse gap-4">
                <TradeCalendar calendarDates={calendarDates} />
                <WinRate value={dataWnL.wins / dataWnL.total} />
              </div>
            </div>
            <div className="w-full py-5 flex flex-col gap-4">
              <Milestones />
              <h3 className="px-4 font-semibold text-lg">
                Recent Transactions
              </h3>
              <RecentTransactions allTrades={allTrades} />
            </div>
          </div>
        </>
      )}
    </main>
  );
}
