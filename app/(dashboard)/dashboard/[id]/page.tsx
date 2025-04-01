"use client";

import { useEffect, useState } from "react";
import {
  fetchPnLData,
  fetchRRData,
  getAllTrades,
  tradeCalendar,
} from "@/actions/db/actions";
import { formSchema } from "@/config/zod";
import { z } from "zod";
import Milestones from "@/components/Dashboard/Milestones";
import TradeCalendar from "@/components/Dashboard/TradeCalendar";
import WeekSummary from "@/components/Dashboard/WeekSummary";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import DashbaordSkeleton from "@/components/DashbaordSkeleton";
import AccountPerformanceOverTime from "@/components/Dashboard/AccountPerformanceOverTime";
import WinRate from "@/components/Dashboard/WinRate";
import { useParams } from "next/navigation";
import { validateUser } from "@/actions/user/user.actions";

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
  const [allTrades, setAllTrades] = useState<z.infer<typeof formSchema>[]>([]);
  const [pnLStats, setPnLStats] = useState<PNLs | null>(null);
  const [RRStats, setRRStats] = useState<RR | null>(null);
  const [winRate, setWinRate] = useState<number | null>(null);
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      validateUser(id);
    }
  }, [id]);
  useEffect(() => {
    if (!id) return;
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
        const [trades, pnL, RR, dates] = await Promise.all([
          getAllTrades(id, startOfMonth, endOfMonth),
          fetchPnLData(id, startOfMonth, endOfMonth),
          fetchRRData(id, startOfMonth, endOfMonth),
          tradeCalendar(id),
        ]);
        setAllTrades(trades);
        setWinRate(pnL.winRate);
        setPnLStats(pnL);
        setRRStats(RR);
        setCalendarDates(dates);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  console.log(winRate);

  return (
    <main suppressHydrationWarning className="w-full px-2 pt-4">
      {isLoading ? (
        <DashbaordSkeleton />
      ) : (
        <>
          {" "}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full py-2 gap-1">
            <div className="flex flex-col w-full gap-3">
              <WeekSummary
                pnLStats={pnLStats}
                RRStats={RRStats}
              />
              <div className="grid grid-cols-1 xl:grid-cols-3  gap-4 w-full">
                <AccountPerformanceOverTime
                  docID={id}
                  className="col-span-1 xl:col-span-2"
                />
                <div className="flex lg:flex-col flex-col-reverse gap-4">
                  <TradeCalendar calendarDates={calendarDates} />
                  <WinRate value={winRate} />
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
          </div>
        </>
      )}
    </main>
  );
}
