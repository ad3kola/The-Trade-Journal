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
import { PnLOverviewCharts } from "@/lib/typings";
import GradientChart from "@/components/Dashboard/Chart";
import MostWonCoins from "@/components/Dashboard/MostWonCoins";
import DashbaordSkeleton from "@/components/DashbaordSkeleton";

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

  // Set Win Rate when `pnLStats` is available
  useEffect(() => {
    if (pnLStats) setWinRate(pnLStats.winRate);
  }, [pnLStats]);

  return (
    <main suppressHydrationWarning className="w-full px-2 py-4">
      {isLoading ? (
        <DashbaordSkeleton />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-center w-full">
            <div className="flex flex-col w-full col-span-2 gap-3">
              <WeekSummary pnLStats={pnLStats} RRStats={RRStats} />
              {chartData && <GradientChart chartData={chartData} />}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
                {["avax.png", "btc.png", "doge.png", "sol.png"].map((coin, indx) => (
                  <MostWonCoins key={indx} coin={coin} />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 md:col-span-2 xl:col-span-1 gap-4 w-full">
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
