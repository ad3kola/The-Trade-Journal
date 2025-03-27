import { HomeIcon } from "@heroicons/react/24/solid";
import { NavLinks } from "@/lib/typings";
import { BadgeIcon, ChartBarIcon, Clock, PlusIcon, Table } from "lucide-react";

export const navLinks: NavLinks[] = [
  { Icon: HomeIcon, title: "Dashboard", url: "/overview" },

  { Icon: Table, title: "Orders List", url: "/orders-list" },
  // { Icon: Currency, title: "Payouts", url: "/payouts" },
  // { Icon: AcademicCapIcon, title: "Certificates", url: "/certificates" },
  { Icon: ChartBarIcon, title: "Analytics", url: "/analytics" },
  // { Icon: Cog6ToothIcon, title: "Settings", url: "/settings" },
  { Icon: PlusIcon, title: "Log a Trade", url: "/upload" },
  // { Icon: DownloadIcon, title: "Log a Trade", url: "/log-trade" },
];

export const topRowData = [
  { title: "Realized PnL($)", Icon: BadgeIcon, value: "798.48USDT" },
  { title: "Total Risk Factors", Icon: BadgeIcon, value: "+12.8R" },
  { title: "Trade of the Week", Icon: BadgeIcon, value: "+12.8R" },
  {
    title: "Average Holding Time",
    Icon: Clock,
    value: "2hrs, 15min",
  },
];

export const pnlOverTimeChartData = [
  { month: "January", gains: 186, losses: 80 },
  { month: "February", gains: 305, losses: 200 },
  { month: "March", gains: 237, losses: 120 },
  { month: "April", gains: 73, losses: 190 },
  { month: "May", gains: 209, losses: 130 },
  { month: "June", gains: 214, losses: 140 },
];

export enum TradeStatus {
  WIN = "Win",
  LOSS = "Loss",
}

export enum TradeSession {
  ASIAN = "Asian",
  LONDON = "London",
  NEW_YORK = "New York",
}

export enum TradeType {
  BUY = "Buy",
  SELL = "Sell",
}

export enum AccountType {
  PERSONAL = "Personal",
  PROP_FIRM = "Prop Firm",
}

export enum TradeTimeframe {
  M1 = "1min",
  M3 = "3min",
  M5 = "5min",
  M15 = "15min",
  M30 = "30min",
  H1 = "1hr",
  H2 = "2hr",
  H4 = "4hr",
  D1 = "1D",
  W1 = "1W",
  M1M = "1M",
}

export enum MilestoneType {
  financial = "Financial",
  time = "Time",
  achievement = "Acheivement",
}

export const calculateTradeMetrics = (
  entry: number,
  tp: number,
  sl: number,
  riskAmount: number,
  tradeStatus: "Win" | "Loss",
  tradeType: "Buy" | "Sell"
) => {
  const isLong = tradeType === "Buy"; // ✅ Determines if it's a long (buy) or short (sell)

  // ✅ Calculate position size (risk per trade)
  const positionSize = riskAmount / Math.abs(entry - sl);

  // ✅ Determine reward & realized PnL based on trade type and result
  let reward = Math.abs(tp - entry) * positionSize;
  let realizedPnl = tradeStatus === "Win" ? reward : -riskAmount; // ✅ If win, PnL = reward; else, PnL = -risk

  // ✅ Ensure proper handling of buy/sell trades
  if (!isLong) {
    // For Sell Trades, Reward & PnL should be negative if TP is above entry
    reward = -reward;
    realizedPnl = tradeStatus === "Win" ? -reward : -riskAmount;
  }

  // ✅ Calculate Risk-Reward Ratio (RRR)
  const rrr = Math.abs(reward / riskAmount);

  return {
    positionSize,
    risk: riskAmount,
    reward,
    rrr,
    realizedPnl,
  };
};
