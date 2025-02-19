import { z } from "zod";

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
  // timeframe: z.enum(["1min", "3min", "5min", "15min", "30min", "1hr", "2hr", "4hr"]),
  // coinDesc: z.string().min(1, "Coin description is required."),
  // status: z.enum(["win", "loss", "missed_entry"]),
  // tradeType: z.enum(["buy", "sell"]),
  // screenshot: z.string().optional(),
  // PnL: z.coerce.number().optional(),
  // accountType: z.enum(["personal", "prop_firm"]),
  // session: z.enum(["london", "newYork", "asian"]),
  // confidenceLevel: z.coerce.number().min(0).max(5),
  // tradeRemarks: z.string(),
  // strategy: z.object({
  // divergence: z.boolean(),
  // H_S: z.boolean(),
  // trendLineRetest: z.boolean(),
  // proTrendBias: z.boolean(),
  // fibKeyLevels: z.boolean(),
  // }),
});
