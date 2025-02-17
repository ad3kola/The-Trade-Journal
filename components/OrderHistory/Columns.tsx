"use client";

import { OrderBook } from "@/lib/typings";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
export const columns: ColumnDef<OrderBook>[] = [
  {
    accessorKey: "coinName",
    enableHiding: false,
    header: () => <div className="px-2">Coin Symbol</div>,
    cell: ({ row }) => (
      <div className="w-[215px] flex items-center gap-3 tracking-wide">
        <Image src={row.original.coinLogo} alt="logo" width={35} height={35} />
        <div className="flex flex-col -space-y-1">
          <span className="uppercase text-left font-bold text-base">
            {row.original.coinName.toUpperCase()} / USDT
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">
            {row.original.coinDesc}
          </span>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "date",
    enableHiding: false,
    header: "Date",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "screenshot",
    enableHiding: false,
    header: "Sccreenshot (png)",
    cell: ({ row }) => (
      <div className="relative h-12 w-full rounded-sm overflow-hidden">
        <Image
          src={row.getValue("screenshot")}
          alt="screenshot"
          fill={true}
          className="object-cover animate-pulse"
        />
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`px-2 py-0.5 text-center rounded-md text-[12px] font-semibold w-fit mx-auto text-foreground tracking-wider ${
          row.getValue("status") == "win" ? "bg-green-500" : "bg-red-600"
        }`}
      >
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "PnL",
    enableHiding: false,
    header: () => <div className="">Realized PnL</div>,
    cell: ({ row }) => {
      const formatted = Number(row.getValue("PnL")).toFixed(1);
      return (
        <div className="tracking-wider font-semibold">${formatted}USD</div>
      );
    },
  },
  {
    accessorKey: "accountType",
    header: "Account",
    cell: ({ row }) => (
      <div
        className={`px-2 py-0.5 text-center rounded-md text-[12px] font-semibold mx-auto w-fit tracking-wider ${
          row.getValue("accountType") == "Personal"
            ? "bg-blue-200 text-blue-800"
            : "bg-violet-200 text-violet-800"
        }`}
      >
        {row.getValue("accountType")}
      </div>
    ),
  },
  {
    accessorKey: "entryPrice",
    header: "Entry Price",
    cell: ({ row }) => {
      return (
        <div
          className="tracking-wider
         font-medium"
        >
          {row.getValue("entryPrice")}
        </div>
      );
    },
  },
  {
    accessorKey: "takeProfit",
    header: "Take Profit",
    cell: ({ row }) => {
      return (
        <div
          className="tracking-wider
           font-medium"
        >
          {row.getValue("takeProfit")}
        </div>
      );
    },
  },
  {
    accessorKey: "stopLoss",
    header: "Stop Loss",
    cell: ({ row }) => {
      return (
        <div
          className="tracking-wider
           font-medium"
        >
          {row.getValue("stopLoss")}
        </div>
      );
    },
  },
  {
    accessorKey: "positionSize",
    header: "Position Size",
    cell: ({ row }) => {
      return (
        <div
          className="tracking-wider
           font-medium"
        >
          {row.getValue("positionSize")}
        </div>
      );
    },
  },
  {
    accessorKey: "session",
    header: "Session",
    cell: ({ row }) => {
      return (
        <div
          className="tracking-wider
           font-medium"
        >
          {row.getValue("session")}
        </div>
      );
    },
  },
  {
    accessorKey: "confidenceLevel",
    header: "Confidence",
    cell: ({ row }) => (
      <Button className=" bg-white hover:bg-white cursor-default mx-auto text-background font-bold h-8 w-8 text-sm">
        {row.getValue("confidenceLevel")}
      </Button>
    ),
  },
  {
    accessorKey: "H_S",
    header: "Head & Shoulders",
    cell: ({ row }) => {
      const strategy = row.original.strategy; // Get the strategy object
      if (!strategy) return null; // Handle cases where strategy is undefined

      return (
        <div
          className={`py-0.5 px-3 w-fit text-center rounded-md text-[12px] font-semibold tracking-wider mx-auto ${
            strategy.H_S
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {strategy.H_S ? "true" : "false"}
        </div>
      );
    },
  },
  {
    accessorKey: "divergence",
    header: "Divergence",
    cell: ({ row }) => {
      const strategy = row.original.strategy; // Get the strategy object
      if (!strategy) return null; // Handle cases where strategy is undefined

      return (
        <div
          className={`py-0.5 text-center rounded-md text-[12px] w-fit font-semibold tracking-wider mx-auto ${
            strategy.divergence
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } px-3 rounded-md`}
        >
          {strategy.divergence ? "true" : "false"}
        </div>
      );
    },
  },
  {
    accessorKey: "fibKeyLevels",
    header: "Fib key Levels",
    cell: ({ row }) => {
      const strategy = row.original.strategy; // Get the strategy object
      if (!strategy) return null; // Handle cases where strategy is undefined

      return (
        <div
          className={`py-0.5 px-3 w-fit text-center rounded-md text-[12px] font-semibold tracking-wider mx-auto ${
            strategy.fibKeyLevels
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {strategy.fibKeyLevels ? "true" : "false"}
        </div>
      );
    },
  },

  {
    accessorKey: "proTrendBias",
    header: "Pro Trend Bias",
    cell: ({ row }) => {
      const strategy = row.original.strategy; // Get the strategy object
      if (!strategy) return null; // Handle cases where strategy is undefined

      return (
        <div
          className={`py-0.5 px-3 w-fit text-center rounded-md text-[12px] font-semibold tracking-wider mx-auto ${
            strategy.proTrendBias
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {strategy.proTrendBias ? "true" : "false"}
        </div>
      );
    },
  },
  {
    accessorKey: "trendLineRetest",
    header: "TrendLine Retest",
    cell: ({ row }) => {
      const strategy = row.original.strategy; // Get the strategy object
      if (!strategy) return null; // Handle cases where strategy is undefined

      return (
        <div
          className={`px-2 py-0.5 text-center rounded-md text-[12px] w-fit mx-auto font-semibold tracking-wider ${
            strategy.trendLineRetest
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          } px-3 rounded-md`}
        >
          {strategy.trendLineRetest ? "true" : "false"}
        </div>
      );
    },
  },
];
