"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formSchema } from "@/config/zod";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";

export default function RecentTransactions({ id }: { id: string }) {
  const [allTrades, setAllTrades] = useState<z.infer<typeof formSchema>[]>([]);

  // useEffect(() => {
  //   const fetchAllTrades = async () => {
  //     const res = await fetch(`/api/trade?id=${id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     const data = await res.json();
  //     setAllTrades(data.trades);
  //   };
  //   fetchAllTrades();
  // }, [id]);

  console.log(allTrades);
  if (allTrades === null) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="border-b bg-input">
            <TableHead className="w-[230px] text-left whitespace-nowrap">
              Coin Symbol
            </TableHead>
            <TableHead className="text-center whitespace-nowrap">
              Trade Type
            </TableHead>
            <TableHead className="text-center whitespace-nowrap">
              Status
            </TableHead>
            <TableHead className="w-[250px] text-right whitespace-nowrap">
              Amount
            </TableHead>
            <TableHead className="w-[150px] text-center whitespace-nowrap">
              Method
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTrades.slice(-5).map((trade, indx) => (
            <TableRow key={indx} className="hover:bg-input">
              {/* Coin Symbol */}
              <TableCell className="w-[230px] flex items-center gap-3 whitespace-nowrap">
                <Image
                  src={trade.coinSymbol.logo}
                  alt="logo"
                  width={30}
                  height={30}
                />
                <div className="flex flex-col -space-y-1">
                  <span className="uppercase font-bold tracking-wider">
                    {trade.coinSymbol.value}
                    USDT
                  </span>
                  <span className="text-[11px] px-1 font-medium text-muted-foreground">
                    {format(trade.date, "PP")}
                  </span>
                </div>
              </TableCell>

              {/* Trade Type */}
              <TableCell className="text-center capitalize font-medium text-[13px] tracking-wide whitespace-nowrap">
                {trade.tradeType}
              </TableCell>

              {/* Trade Status */}
              <TableCell className="text-center whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-md text-[11px] font-medium w-fit tracking-wide text-foreground ${
                    trade.tradeStatus.toLowerCase() === "win"
                      ? "bg-green-500"
                      : trade.tradeStatus.toLowerCase() === "loss"
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {trade.tradeStatus}
                </span>
              </TableCell>

              {/* Amount */}
              <TableCell className="text-right whitespace-nowrap">
                <div className="flex flex-col items-end -space-y-1">
                  <span className="font-bold text-base tracking-wide">
                    ${trade.realizedPnL}
                  </span>
                  <span className="text-[11px] font-medium text-muted-foreground">
                    $ {trade.realizedPnL} CAD
                  </span>
                </div>
              </TableCell>

              {/* Account Type */}
              <TableCell className="text-center whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-md text-[12px] font-semibold tracking-wide ${
                    trade.accountType.toLowerCase() === "personal"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-violet-200 text-violet-800"
                  }`}
                >
                  {trade.accountType}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
