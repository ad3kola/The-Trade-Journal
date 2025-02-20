import { z } from "zod";
import { AccountType, TradeSession, TradeStatus, TradeTimeframe, TradeType } from "../constants/ind4x";

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
  date: z.coerce.date(),
  // coinLogo: z.string().min(1, "Coin logo is required."),
  // coinName: z.string().min(1, "Coin name is required."),
  // coinDesc: z.string().min(1, "Coin description is required."),
  timeframe: z.nativeEnum(TradeTimeframe),
  status: z.nativeEnum(TradeStatus),
  tradeType: z.nativeEnum(TradeType),
  tradeSession: z.nativeEnum(TradeSession),
  tradeScreenshot: z.string().optional(),
  realizedPnL: z.coerce.number().optional(),
  accountType: z.nativeEnum(AccountType),
  // confidenceLevel: z.coerce.number().min(0).max(5),
  tradeReview: z.string(),
  // strategy: z.object({
  // divergence: z.boolean(),
  // H_S: z.boolean(),
  // trendLineRetest: z.boolean(),
  // proTrendBias: z.boolean(),
  // fibKeyLevels: z.boolean(),
  // }),
});
