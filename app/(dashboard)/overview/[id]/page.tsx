"use client";

import GradientChart from "@/components/Dashboard/GradientChart";
import Milestones from "@/components/Dashboard/Milestones";
import RecentTransactions from "@/components/Dashboard/RecentTransactions";
import TradeCalendar from "@/components/Dashboard/TradeCalendar";
import WeekSummary from "@/components/Dashboard/WeekSummary";
import WinRate from "@/components/Dashboard/WinRate";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { getCurrentUserDoc } from "@/actions/db/actions";
import { useParams } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";

export default function Page() {
  const { id: userID } = useParams();
  const [currentID, setCurrentID] = useState<string>("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async  (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        setCurrentID(doc?.userID);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="w-full px-2 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 items-start w-full">
        <div className="flex flex-col w-full col-span-2 gap-3">
          <WeekSummary currentID={userID} />
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
        <RecentTransactions currentID={userID} />
      </div>
    </main>
  );
}
