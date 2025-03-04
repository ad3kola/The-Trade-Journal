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
import WinRate from "@/components/Dashboard/WinRate";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import { Skeleton } from "@/components/ui/skeleton";
import { PnLOverviewCharts } from "@/lib/typings";
import GradientChart from "@/components/Dashboard/Chart";
import { cn } from "@/lib/utils";

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
  const [winRate, setWinRate] = useState<number | null>(null);
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

  // Fetch Data when `docID` is available
  useEffect(() => {
    if (!docID) return;
    setIsLoading(true);

    const fetchData = async () => {
      try {
        const [trades, pnL, RR, dates, chart] = await Promise.all([
          getAllTrades(docID),
          fetchPnLData(docID),
          fetchRRData(docID),
          tradeCalendar(docID),
          fetchTradeDataForLast7Trades(docID),
        ]);

        setAllTrades(trades);
        setPnLStats(pnL);
        setRRStats(RR);
        setCalendarDates(dates);
        setChartData(chart);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [docID]);

  // Set Win Rate when `pnLStats` is available
  useEffect(() => {
    if (pnLStats) setWinRate(pnLStats.winRate);
  }, [pnLStats]);

  // Log Chart Data inside `useEffect`
  useEffect(() => {
    if (chartData) console.log(chartData);
  }, [chartData]);

  return (
    <main suppressHydrationWarning className="w-full px-2 py-4">
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full items-start">
          <div className="grid gap-4 grid-cols-1 col-span-1 lg:col-span-2 w-full">
          <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((_, indx) => (
              <div
                key={indx}
                className="rounded-lg border bg-input/20 border-input px-2 py-3 flex w-full"
              >
                <Skeleton
                  className={cn(
                    "text-foreground flex items-center w-full max-w-12 justify-center h-full shrink-0",
                    indx % 2 && "order-2"
                  )}
                />
                <div className="flex-1 overflow-hidden flex flex-col justify-start gap-3 pl-3 w-full">
                  <Skeleton className="h-2 w-[60%]" />
                  <Skeleton className="h-2 w-1/3" />
                  <Skeleton className="h-2 mt-4 w-[75%]" />
                </div>
              </div>
            ))}
          </div>
            <div className="skeleton-card">
              <Skeleton className="w-40 h-2.5" />
              <Skeleton className="w-[80%] h-2" />
              <Skeleton className="w-40 h-10" />
              <Skeleton className="h-72 lg:h-96 w-full rounded-2xl mt-2" />
              <Skeleton className="h-60 w-full rounded-2xl mt-2" />
            </div>
          </div>
          <div className="grid gap-4 col-span-1 grid-cols-1">
              <div className="skeleton-card p-6 h-fit">
                <Skeleton className="w-72 h-3.5" />
                <div className="grid grid-cols-8 gap-4 w-full mt-4">
                  {new Array(48).fill(null).map((_, indx) => (
                    <Skeleton
                      key={indx}
                      className="h-8 w-full rounded-md mt-2"
                    />
                  ))}
                </div>
              </div>
              <div className="skeleton-card gap-6">
                <Skeleton className="w-52 h-3.5" />
                <Skeleton className="rounded-full h-60 w-60" />
                <Skeleton className="w-[60%] h-3.5" />
                <Skeleton className="w-[80%] h-3.5" />
            </div>
          <div className="skeleton-card w-full lg:h-auto py-6">
          <Skeleton className="w-[45%] h-4 mr-auto" />
          <Skeleton className="skeleton-card h-16 mt-5 rounded-2xl"/>
          </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start w-full">

            <div className="flex flex-col w-full col-span-2 gap-3">
              <WeekSummary pnLStats={pnLStats} RRStats={RRStats} />
              {chartData && <GradientChart chartData={chartData} />}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 md:col-span-2 xl:col-span-1 gap-2 w-full">
              <TradeCalendar calendarDates={calendarDates} />
              <WinRate winRate={winRate} />
              <Milestones />
            </div>
          </div>
          <div className="w-full py-5 flex flex-col gap-2">
            <h3 className="px-4 font-semibold text-lg">Recent Transactions</h3>
            <RecentTransactions allTrades={allTrades} />
          </div>
        </>
      )}
    </main>
  );
}
