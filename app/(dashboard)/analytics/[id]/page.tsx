"use client";

import MostTradedCoins from "@/components/Analytics/MostTradedCoins";
import PnL from "@/components/Analytics/PnL";
import SessionStatistics from "@/components/Analytics/SessionStats";
import StrategyLosses from "@/components/Analytics/StrategyLosses";
import StrategyWins from "@/components/Analytics/StrategyWins";

export default function Page() {
  return (
    <main className="w-full px-2 py-4 flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PnL />
        <PnL />
        <MostTradedCoins />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
        <StrategyWins />
        <StrategyLosses />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-4">
      <SessionStatistics />
      <SessionStatistics />
      <SessionStatistics />
      </div>
    </main>
  );
}
