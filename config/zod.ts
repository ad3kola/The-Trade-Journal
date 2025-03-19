import { z } from "zod";
import {
  AccountType,
  TradeSession,
  TradeStatus,
  TradeTimeframe,
  TradeType,
} from "../lib/constants/ind4x";

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Must be more than 2 characters")
    .optional()
    .or(z.literal("")),
  email: z.string().email(),
  // phone: z
  //   .string()
  //   .refine((phone) => /^\+?\d{10,15}$/.test(phone.replace(/\D/g, "")), "Invalid phone number"),
  password: z.string().min(2, "Must be more than 2 characters"),
});

export const formSchema = z.object({
  id: z.string().optional(),
  coinSymbol: z
    .object({
      id: z.string().optional(),
      symbol: z.string().optional(),
      name: z.string().optional(),
      image: z.string().optional(),
      current_price: z.number().default(0),
    })
    .strict(),
  accountType: z.nativeEnum(AccountType),
  tradeSession: z.nativeEnum(TradeSession),
  timeframe: z.nativeEnum(TradeTimeframe),
  tradeType: z.nativeEnum(TradeType),
  tradeStatus: z.nativeEnum(TradeStatus),
  entryPrice: z.coerce.number().nonnegative(),
  takeProfit: z.coerce.number().nonnegative(),
  stopLoss: z.coerce.number().nonnegative(),
  riskAmount: z.coerce.number().positive(),
  leverage: z.coerce.number().positive(),
  positionSize: z.coerce.number().positive(),
  realizedPnL: z.coerce.number(),
  risk_Reward: z.coerce.number().positive(),
  date: z.coerce.date(),
  strategy: z.object({
    divergence: z.boolean(),
    head_and_Shoulders: z.boolean(),
    pro_Trend_Bias: z.boolean(),
    trendline_Retest: z.boolean(),
    fib_Key_Levels: z.boolean(),
    indicator_Highlight: z.boolean(),
  }),
  confidence: z.array(z.number()).default([0]),
  tradeScreenshot: z.string().optional(),
  tradeReview: z.string().min(5, "Review must be at least 5 characters"),
});

export const strategySchema = z.object({
  name: z.string(),
  overview: z.string(),
  winRate: z.coerce.number().nonnegative().max(100),
  metrics: z.array(z.string()),
});
