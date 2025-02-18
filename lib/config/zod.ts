"use client";
import { z } from "zod";

export const formSchema = z.object({
  coinLogo: z.string().min(1, "Coin logo is required."),
  coinName: z.string().min(1, "Coin name is required."),
  coinDesc: z.string().min(1, "Coin description is required."),
  date: z.coerce.date(),
  status: z.enum(["open", "closed"]),
  riskAmount: z.number().positive("Must be a positive number"),
  tradeType: z.enum(["long", "short"]),
  PnL: z.number().optional(),
  accountType: z.enum(["personal", "prop_firm"]),
  session: z.enum(["London", "New York", "Asian"]),
  entryPrice: z.number().positive("Must be a positive number"),
  stopLoss: z.number().positive("Must be a positive number"),
  screenshot: z.string().optional(),
  takeProfit: z.number().positive("Must be a positive number"),
  positionSize: z.number().positive("Must be a positive number"),
  confidenceLevel: z.number().min(0).max(100),

  // Boolean values for trading strategies
  divergence: z.boolean(),
  headShoulders: z.boolean(),
  trendLineRetest: z.boolean(),
  proTrendBias: z.boolean(),
  fibKeyLevels: z.boolean(),
});
