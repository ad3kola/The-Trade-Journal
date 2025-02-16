import GradientChart from "@/components/Dashboard/GradientChart";
import TradeCalendar from "@/components/Dashboard/TradeCalendar";
import WinRate from "@/components/Dashboard/WinRate";

export default function Home() {
  return (
    <main className="w-full px-2 py-4">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
      <GradientChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-1 md:col-span-2 xl:col-span-1 gap-2">
      <TradeCalendar />
      <WinRate />
      </div>
      </div>
    </main>
  );
}
