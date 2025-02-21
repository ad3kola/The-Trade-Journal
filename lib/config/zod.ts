import { z } from "zod";
import {
  AccountType,
  TradeSession,
  TradeStatus,
  TradeTimeframe,
  TradeType,
} from "../constants/ind4x";

export const userSchema = z.object({
  fullName: z.string().min(2, "Must be more than 2 characters"),
  email: z.string().email(),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

export const formSchema = z.object({
  entryPrice: z.coerce.number().positive().int(),
  stopLoss: z.coerce.number().positive().int(),
  takeProfit: z.coerce.number().positive().int(),
  leverage: z.coerce.number().positive().int(),
  riskAmount: z.coerce.number().int().positive(),
  positionSize: z.coerce.number().positive().int(),
  date: z.date(),

  coinSymbol: z.object({
    logo: z.string(),
    name: z.string(),
    value: z.string(),
  }),

  timeframe: z.nativeEnum(TradeTimeframe),
  status: z.nativeEnum(TradeStatus),
  tradeSession: z.nativeEnum(TradeSession),
  tradeType: z.nativeEnum(TradeType),
  tradeScreenshot: z.string(),

  realizedPnL: z.coerce.number(),
  accountType: z.nativeEnum(AccountType),
  tradeReview: z.string(),

  // confidenceLevel: 1,
  strategy: z.object({
    divergence: z.boolean(),
    head_Shoulders: z.boolean(),
    proTrendBias: z.boolean(),
    trendlineRetest: z.boolean(),
    fibKeyLevels: z.boolean(),
    indicatorHighlight: z.boolean(),
  }),
});
