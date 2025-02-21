import { HomeIcon } from "@heroicons/react/24/solid";
import { CoinsList, DailySummaryData, NavLinks } from "@/lib/typings";
import { BadgeIcon, ChartBarIcon, Clock, PlusIcon, Table } from "lucide-react";
import { z } from "zod";
import { formSchema } from "../config/zod";

export const navLinks: NavLinks[] = [
  { Icon: HomeIcon, title: "Dashboard", url: "/" },

  { Icon: Table, title: "Orders List", url: "/orders-list" },
  // { Icon: Currency, title: "Payouts", url: "/payouts" },
  // { Icon: AcademicCapIcon, title: "Certificates", url: "/certificates" },
  { Icon: ChartBarIcon, title: "Analytics", url: "/analytics" },
  // { Icon: Cog6ToothIcon, title: "Settings", url: "/settings" },
  { Icon: PlusIcon, title: "Open a Trade", url: "/upload" },
  // { Icon: DownloadIcon, title: "Log a Trade", url: "/log-trade" },
];

export const topRowData = [
  { title: "Realized PnL($)", Icon: BadgeIcon, value: "798.48USDT" },
  {
    title: "Win Rate",
    Icon: BadgeIcon,
    value: "46.36%",
  },
  { title: "Risk Factors", Icon: BadgeIcon, value: "+12.8R" },
  {
    title: "Average Holding Time",
    Icon: Clock,
    value: "2hrs, 15min",
  },
];
export const dailySummaryData: DailySummaryData[] = [
  {
    date: "01/30",
    coinTicker: "SOLUSDT.P",
    risk: 50,
    direction: "long",
    image: "/assets/profile-pic.webp",
    entryPrice: 85958,
    exitPrice: 484985,
    riskFactors: 4,
    timeWindow: "Zone 4",
    divergence: true,
    headAndShoulders: true,
    proTrendBias: false,
    trades: 316,
    trendlineRetest: true,
    winRate: 72,
    realizedPnL: 357.86,
    roi: 2,
    equity: 55885,
    id: 1,
  },
  {
    date: "01/30",
    coinTicker: "SOLUSDT.P",
    risk: 50,
    direction: "long",
    image: "/assets/profile-pic.webp",
    entryPrice: 85958,
    exitPrice: 484985,
    riskFactors: 4,
    timeWindow: "Zone 4",
    divergence: true,
    headAndShoulders: true,
    proTrendBias: false,
    trades: 316,
    trendlineRetest: true,
    winRate: 72,
    realizedPnL: 357.86,
    roi: 2,
    equity: 55885,
    id: 1,
  },
  {
    date: "01/30",
    coinTicker: "SOLUSDT.P",
    risk: 50,
    direction: "long",
    image: "/assets/profile-pic.webp",
    entryPrice: 85958,
    exitPrice: 484985,
    riskFactors: 4,
    timeWindow: "Zone 4",
    divergence: true,
    headAndShoulders: true,
    proTrendBias: false,
    trades: 316,
    trendlineRetest: true,
    winRate: 72,
    realizedPnL: 357.86,
    roi: 2,
    equity: 55885,
    id: 1,
  },
  {
    date: "01/30",
    coinTicker: "SOLUSDT.P",
    risk: 50,
    direction: "long",
    image: "/assets/profile-pic.webp",
    entryPrice: 85958,
    exitPrice: 484985,
    riskFactors: 4,
    timeWindow: "Zone 4",
    divergence: true,
    headAndShoulders: true,
    proTrendBias: false,
    trades: 316,
    trendlineRetest: true,
    winRate: 72,
    realizedPnL: 357.86,
    roi: 2,
    equity: 55885,
    id: 1,
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

export const listOfCoins: CoinsList[] = [
  {
    name: "Bitcoin",
    logo: "/btc.png",
    value: "BTC",
  },
  {
    name: "1000PEPE",
    logo: "/btc.png",
    value: "1000PEPE",
  },
  {
    name: "Solana",
    logo: "/btc.png",
    value: "solusdt",
  },
];

export enum TradeStatus {
  WIN = "Win",
  LOSS = "Loss",
  MISSED_ENTRY = "Missed Entry",
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

export const orderBook: z.infer<typeof formSchema>[] = [
  {
    coinLogo: "/btc.png",
    coinName: "btc",

    screenshot: "/mockup.png",
    date: new Date(),
    timeframe: "3min",
    status: "win",
    tradeType: "buy",
    PnL: 250.0,
    riskAmount: 50,
    accountType: "prop_firm",
    session: "london",
    entryPrice: 10000,
    stopLoss: 10000,
    takeProfit: 10000,
    positionSize: 189498,
    strategy: {
      divergence: false,
      H_S: false,
      trendLineRetest: false,
      proTrendBias: false,
      fibKeyLevels: false,
    },
    confidenceLevel: 3,
    tradeRemarks: "",
  },
];
