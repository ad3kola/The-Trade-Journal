"use client";

import { getSelectedTrade } from "@/actions/db/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formSchema } from "@/config/zod";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { format } from "date-fns";

function Page() {
  const { id, tradeID } = useParams<{ id: string; tradeID: string }>();
  const [trade, setTradeData] = useState<z.infer<typeof formSchema>>();

  useEffect(() => {
    const getTradeData = async () => {
      const data = await getSelectedTrade(id, tradeID);
      setTradeData(data as z.infer<typeof formSchema>);
    };
    getTradeData();
  }, [id, tradeID]);

  console.log(trade);
  console.log(id);
  const date = new Date(trade?.date ?? new Date());
  const formattedDate = format(date, "PPP");
  return (
    <div className="p-4">
      {trade && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="col-span-1 order-2 lg:order-1">
            <Card>
              <CardHeader>
                <div className="flex items-start relative gap-4">
                  <span
                    className={cn(
                      "h-[52px] w-1",
                      trade.realizedPnL > 0 ? "bg-green-500" : "bg-red-500"
                    )}
                  />
                  <div className="w-full flex flex-col gap-1">
                    <CardTitle>Realized PnL</CardTitle>
                    <h1
                      className={cn(
                        "text-3xl font-semibold",
                        trade.realizedPnL > 0
                          ? "text-green-500"
                          : "text-red-500"
                      )}
                    >
                      ${Math.abs(trade.realizedPnL).toFixed(2)}
                    </h1>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Leverage Used</p>
                  <p className="text-sm font-normal tracking-wide">
                    {formattedDate}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Trade Type</p>
                  <p className="text-sm tracking-wide">{trade.tradeType}</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Trade Status</p>
                  <p
                    className={cn(
                      "font-semibold",
                      trade.realizedPnL > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    {trade.tradeStatus}
                  </p>
                </div>
                <div className="flex items-center justify-between font-semibold gap-3 w-full">
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p
                    className={cn(
                      trade.accountType.toLowerCase() == "personal"
                        ? "text-blue-200"
                        : "text-violet-200"
                    )}
                  >
                    {trade.accountType}
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">
                    Trade Timeframe
                  </p>
                  <p className="text-sm tracking-wide">{trade.timeframe}</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Trade Risk </p>
                  <p className="text-sm tracking-wide">${trade.riskAmount}</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Risk:Reward</p>
                  <p className="text-sm tracking-wide">{trade.risk_Reward}R</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Entry Price</p>
                  <p className="text-sm tracking-wide">${trade.entryPrice}</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Exit Price</p>
                  <p className="text-sm tracking-wide">${trade.takeProfit}</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Leverage Used</p>
                  <p className="text-sm tracking-wide">{trade.leverage}x</p>
                </div>
                <div className="flex items-center justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Trade Session</p>
                  <p className="text-sm tracking-wide">{trade.tradeSession}</p>
                </div>
                <div className="flex items-start justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Trade Review</p>
                  <p className="w-60 text-xs">{trade.tradeReview}</p>
                </div>
                <div className="flex items-start justify-between gap-3 w-full font-semibold">
                  <p className="text-sm text-muted-foreground">Trade Review</p>
                  <div className="flex flex-wrap items-center justify-end gap-3 w-full font-semibold">
                    {trade.strategy.divergence && (
                      <div
                        className={cn(
                          "cursor-pointer bg-primary text-foreground w-fit px-2 h-8 flex items-center justify-center font-medium rounded-full text-[12px] hover:bg-primary duration-200 whitespace-nowrap"
                        )}
                      >
                        Divergence
                      </div>
                    )}
                    {trade.strategy.fib_Key_Levels && (
                      <div
                        className={cn(
                          "cursor-pointer bg-primary text-foreground w-fit px-2 h-8 flex items-center justify-center font-medium rounded-full text-[12px] hover:bg-primary duration-200 whitespace-nowrap"
                        )}
                      >
                        Fib Key levels
                      </div>
                    )}
                    {trade.strategy.pro_Trend_Bias && (
                      <div
                        className={cn(
                          "cursor-pointer bg-primary text-foreground w-fit px-2 h-8 flex items-center justify-center font-medium rounded-full text-[12px] hover:bg-primary duration-200 whitespace-nowrap"
                        )}
                      >
                        Pro Trend Bias
                      </div>
                    )}
                    {trade.strategy.trendline_Retest && (
                      <div
                        className={cn(
                          "cursor-pointer bg-primary text-foreground w-fit px-2 h-8 flex items-center justify-center font-medium rounded-full text-[12px] hover:bg-primary duration-200 whitespace-nowrap"
                        )}
                      >
                        Trendline Retest
                      </div>
                    )}
                    {trade.strategy.indicator_Highlight && (
                      <div
                        className={cn(
                          "cursor-pointer bg-primary text-foreground w-fit px-2 h-8 flex items-center justify-center font-medium rounded-full text-[12px] hover:bg-primary duration-200 whitespace-nowrap"
                        )}
                      >
                        Indicaotr Highlight
                      </div>
                    )}
                    {trade.strategy.head_and_Shoulders && (
                      <div
                        className={cn(
                          "cursor-pointer bg-primary text-foreground w-fit px-2 h-8 flex items-center justify-center font-medium rounded-full text-[12px] hover:bg-primary duration-200 whitespace-nowrap"
                        )}
                      >
                        Head & Shoulders
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="relative w-full h-96 lg:h-[650px] lg:col-span-2 col-span-1 rounded-md overflow-hidden border-2 border-input">
            <Image
              alt=""
              fill
              src={trade.tradeScreenshot as string}
              className="w-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
