"use client";
import { z } from "zod";

export const formSchema = z.object({
  coinLogo: z.string().min(1, "Coin logo is required."),
  coinName: z.string().min(1, "Coin name is required."),
  coinDesc: z.string().min(1, "Coin description is required."),
  date: z.coerce.date(),
  status: z.enum(["win", "loss", "missed_entry"]),
  riskAmount: z.number().positive("Must be a number"),
  tradeType: z.enum(["long", "short"]),
  PnL: z.number().optional(),
  accountType: z.enum(["personal", "prop_firm"]),
  session: z.enum(["London", "New York", "Asian"]),
  timeframe: z.enum(["1min", "3min", "5min", "15min", "30min", "1hr", "2hr", "4hr"]),
  entryPrice: z.number().positive("Must be a number"),
  stopLoss: z.number().positive("Must be a number"),
  screenshot: z.string().optional(),
  takeProfit: z.number().positive("Must be a number"),
  positionSize: z.number().positive("Must be a number"),
  confidenceLevel: z.number().min(0).max(100, "Must be a number between 0 and 100"),
  tradeRemarks: z.string().optional(),
  strategy: z.object({
    divergence: z.boolean(),
    H_S: z.boolean(),
    trendLineRetest: z.boolean(),
    proTrendBias: z.boolean(),
    fibKeyLevels: z.boolean(),
  }),
});

export function onSubmit(data: z.infer<typeof formSchema>) {
  console.log("clicked");
  console.log(data);
}
