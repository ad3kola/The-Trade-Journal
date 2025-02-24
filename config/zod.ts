import { z } from "zod";
import {
  AccountType,
  TradeSession,
  TradeStatus,
  TradeTimeframe,
  TradeType,
} from "../lib/constants/ind4x";

export const userSchema = z.object({
  fullName: z.string().min(2, "Must be more than 2 characters"),
  email: z.string().email(),
  profile: z.string(),
  phone: z
    .string()
    .refine((phone) => /^\+?\d{10,15}$/.test(phone.replace(/\D/g, "")), "Invalid phone number"),
});

export const formSchema = z.object({
  coinSymbol: z
    .object({
      logo: z.string(),
      name: z.string(),
      value: z.string(),
    })
    .strict(),
  accountType: z.nativeEnum(AccountType),
  tradeSession: z.nativeEnum(TradeSession),
  timeframe: z.nativeEnum(TradeTimeframe),
  tradeType: z.nativeEnum(TradeType),
  entryPrice: z.coerce.number().positive(),
  takeProfit: z.coerce.number().positive(),
  stopLoss: z.coerce.number().positive(),
  riskAmount: z.coerce.number().positive(),
  leverage: z.coerce.number().positive(),
  positionSize: z.coerce.number().positive(),
  realizedPnL: z.coerce.number(),
  risk_Reward: z.coerce.number().positive(),
  date: z.coerce.date(),
  tradeStatus: z.nativeEnum(TradeStatus),
  strategy: z
    .object({
      divergence: z.boolean(),
      head_Shoulders: z.boolean(),
      proTrendBias: z.boolean(),
      trendlineRetest: z.boolean(),
      fibKeyLevels: z.boolean(),
      indicatorHighlight: z.boolean(),
    }),
  confidence: z.array(z.number()).default([0]),
  tradeScreenshot: z.string(),
  tradeReview: z.string().min(5, "Review must be at least 5 characters"),
});
