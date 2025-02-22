"use client";

import GradientChart from "@/components/Dashboard/GradientChart";
import Milestones from "@/components/Dashboard/Milestones";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import TradeCalendar from "@/components/Dashboard/TradeCalendar";
import WeekSummary from "@/components/Dashboard/WeekSummary";
import WinRate from "@/components/Dashboard/WinRate";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { setUser } from "@/config/redux/features/userSlice";
import { UserProps } from "@/lib/typings";
import { useAppDispatch } from "@/config/redux/hooks";

export default function Page() {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/user?id=${id}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const data: UserProps = await res.json();
          const userData: UserProps = {
            ...data,
            id
          }
          dispatch(setUser(userData));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserData();
  }, [id, dispatch]);

  
  return (
    <main className="w-full px-2 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start w-full">
        <div className="flex flex-col w-full col-span-2 gap-3">
          <WeekSummary />
          <GradientChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 md:col-span-2 xl:col-span-1 gap-2 w-full">
          <TradeCalendar />
          <WinRate />
          <Milestones />
        </div>
      </div>
      <div className="w-full py-5 flex flex-col gap-2">
        <h3 className="px-4 font-semibold text-lg">Recent Transactions</h3>
        <RecentTransactions />
      </div>
    </main>
  );
}
