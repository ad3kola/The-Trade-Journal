import { HomeIcon } from "@heroicons/react/24/solid";
import { CoinsList, DailySummaryData, NavLinks } from "@/lib/typings";
import { BadgeIcon, ChartBarIcon, Clock, PlusIcon, Table } from "lucide-react";
import { z } from "zod";
import { formSchema } from "../../config/zod";

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
    accountType: AccountType.PERSONAL,
    coinSymbol: {
      logo: "/assets/btc.png",
      name: "Bitcoin",
      value: "btc",
    },
    confidence: [2],
    date: new Date(),
    entryPrice: 10,
    leverage: 10,
    positionSize: 10,
    realizedPnL: 10,
    riskAmount: 10,
    risk_Reward: 10,
    tradeStatus: TradeStatus.WIN,
    stopLoss: 10,
    strategy: {
      divergence: true,
      fibKeyLevels: false,
      head_Shoulders: false,
      indicatorHighlight: false,
      proTrendBias: true,
      trendlineRetest: true,
    },
    takeProfit: 10,
    timeframe: TradeTimeframe.M30,
    tradeReview: "jhgfxfgthbnbhyujlouibjk",
    tradeScreenshot:
      "https://firebasestorage.googleapis.com/v0/b/social-media-app-9b39a.appspot.com/o/trades%2Fistockphoto-1403500817-612x612.jpg_94a8f475-9415-42ce-92da-79542c888a18?alt=media&token=38b7063a-8317-486e-b7e6-1d8e1746bc21",
    tradeSession: TradeSession.NEW_YORK,
    tradeType: TradeType.BUY,
  },
  {
    accountType: AccountType.PROP_FIRM,
    coinSymbol: {
      logo: "/assets/sol.png",
      name: "Solana",
      value: "sol",
    },
    confidence: [4],
    date: new Date(),
    entryPrice: 10,
    leverage: 10,
    positionSize: 10,
    realizedPnL: 10,
    riskAmount: 10,
    risk_Reward: 10,
    tradeStatus: TradeStatus.WIN,
    stopLoss: 10,
    strategy: {
      divergence: false,
      fibKeyLevels: true,
      head_Shoulders: false,
      indicatorHighlight: true,
      proTrendBias: false,
      trendlineRetest: false,
    },
    takeProfit: 10,
    timeframe: TradeTimeframe.M30,
    tradeReview: "jhgfxfgthbnbhyujlouibjk",
    tradeScreenshot:
      "https://firebasestorage.googleapis.com/v0/b/social-media-app-9b39a.appspot.com/o/trades%2Fistockphoto-1403500817-612x612.jpg_94a8f475-9415-42ce-92da-79542c888a18?alt=media&token=38b7063a-8317-486e-b7e6-1d8e1746bc21",
    tradeSession: TradeSession.NEW_YORK,
    tradeType: TradeType.SELL,
  },
  {
    accountType: AccountType.PROP_FIRM,
    coinSymbol: {
      logo: "/assets/doge.png",
      name: "Doge",
      value: "doge",
    },
    confidence: [4],
    date: new Date(),
    entryPrice: 10,
    leverage: 10,
    positionSize: 10,
    realizedPnL: 10,
    riskAmount: 10,
    risk_Reward: 10,
    tradeStatus: TradeStatus.WIN,
    stopLoss: 10,
    strategy: {
      divergence: false,
      fibKeyLevels: true,
      head_Shoulders: false,
      indicatorHighlight: true,
      proTrendBias: false,
      trendlineRetest: false,
    },
    takeProfit: 10,
    timeframe: TradeTimeframe.M30,
    tradeReview: "jhgfxfgthbnbhyujlouibjk",
    tradeScreenshot:
      "https://firebasestorage.googleapis.com/v0/b/social-media-app-9b39a.appspot.com/o/trades%2Fistockphoto-1403500817-612x612.jpg_94a8f475-9415-42ce-92da-79542c888a18?alt=media&token=38b7063a-8317-486e-b7e6-1d8e1746bc21",
    tradeSession: TradeSession.NEW_YORK,
    tradeType: TradeType.SELL,
  },
  {
    accountType: AccountType.PROP_FIRM,
    coinSymbol: {
      logo: "/assets/avax.png",
      name: "Solana",
      value: "sol",
    },
    confidence: [2],
    date: new Date(),
    entryPrice: 10,
    leverage: 10,
    positionSize: 10,
    realizedPnL: 10,
    riskAmount: 10,
    risk_Reward: 10,
    tradeStatus: TradeStatus.LOSS,
    stopLoss: 10,
    strategy: {
      divergence: true,
      fibKeyLevels: false,
      head_Shoulders: false,
      indicatorHighlight: false,
      proTrendBias: true,
      trendlineRetest: true,
    },
    takeProfit: 10,
    timeframe: TradeTimeframe.M30,
    tradeReview: "jhgfxfgthbnbhyujlouibjk",
    tradeScreenshot:
      "https://firebasestorage.googleapis.com/v0/b/social-media-app-9b39a.appspot.com/o/trades%2Fistockphoto-1403500817-612x612.jpg_94a8f475-9415-42ce-92da-79542c888a18?alt=media&token=38b7063a-8317-486e-b7e6-1d8e1746bc21",
    tradeSession: TradeSession.NEW_YORK,
    tradeType: TradeType.BUY,
  },
  {
    accountType: AccountType.PERSONAL,
    coinSymbol: {
      logo: "/assets/pepe.png",
      name: "1000PEPE",
      value: "1000pepe",
    },
    confidence: [4],
    date: new Date(),
    entryPrice: 10,
    leverage: 10,
    positionSize: 10,
    realizedPnL: 10,
    riskAmount: 10,
    risk_Reward: 10,
    tradeStatus: TradeStatus.WIN,
    stopLoss: 10,
    strategy: {
      divergence: true,
      fibKeyLevels: false,
      head_Shoulders: false,
      indicatorHighlight: false,
      proTrendBias: true,
      trendlineRetest: true,
    },
    takeProfit: 10,
    timeframe: TradeTimeframe.M15,
    tradeReview: "jhgfxfgthbnbhyujlouibjk",
    tradeScreenshot:
      "https://firebasestorage.googleapis.com/v0/b/social-media-app-9b39a.appspot.com/o/trades%2Fistockphoto-1403500817-612x612.jpg_94a8f475-9415-42ce-92da-79542c888a18?alt=media&token=38b7063a-8317-486e-b7e6-1d8e1746bc21",
    tradeSession: TradeSession.LONDON,
    tradeType: TradeType.SELL,
  },
];


export const calculateTradeMetrics = (entry: number, tp: number, sl: number, riskAmount: number, isLong: string) => {
  // Ensure isLong is properly interpreted as "Buy" or "Sell"
  const isBuy = isLong === "Buy";
  
  // Calculate position size to ensure risk matches the intended riskAmount
  const positionSize = riskAmount / Math.abs(entry - sl);
  
  // Adjusted risk remains exactly as intended
  const adjustedRisk = riskAmount;
  
  // Adjust reward calculation to align with the correct position size
  const reward = Math.abs(tp - entry) * positionSize;
  
  // Calculate Risk-Reward Ratio (RRR)
  const rrr = reward / adjustedRisk;
  
  // Determine realized PnL to ensure proper scaling
  const realizedPnl = isBuy 
      ? (tp > entry ? reward : -adjustedRisk) 
      : (tp < entry ? reward : -adjustedRisk);

  return {
      positionSize,
      risk: adjustedRisk,
      reward,
      rrr,
      realizedPnl
  };
};
