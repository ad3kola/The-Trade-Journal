"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { z } from "zod";
import { format } from "date-fns";
import { formSchema } from "@/config/zod";

const StatusCell = ({ value }: { value: boolean }) => (
  <div
    className={`py-0.5 px-3 w-fit text-center rounded-md text-[12px] font-semibold tracking-wider mx-auto ${
      value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
    }`}
  >
    {value ? "true" : "false"}
  </div>
);

export const columns: ColumnDef<z.infer<typeof formSchema>>[] = [
  {
    accessorKey: "coinSymbol",
    enableHiding: false,
    header: () => <div className="px-2">Coin Symbol</div>,
    cell: ({ row }) => (
      <div className="w-[215px] flex items-center gap-3 tracking-wide">
        <Image
          src={row.original.coinSymbol.logo}
          alt="logo"
          width={35}
          height={35}
        />
        <div className="flex flex-col -space-y-1">
          <span className="uppercase text-left font-bold text-base">
            {row.original.coinSymbol.value.toUpperCase()} / USDT
          </span>
          <span className="text-[10px] font-medium text-muted-foreground">
            {row.original.coinSymbol.name} TetherUS Perpetual
          </span>
        </div>
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return row.original.coinSymbol.value
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "date",
    enableHiding: false,
    header: "Date",
    cell: ({ row }) => {
      const formattedDate = format(row.getValue("date"), "PP");
      return formattedDate;
    },
  },
  {
    accessorKey: "tradeType",
    header: "Type",
  },
  {
    accessorKey: "tradeSession",
    header: "Session",
    cell: ({ row }) => {
      return (
        <div className="tracking-wider font-medium">
          {row.getValue("tradeSession")}
        </div>
      );
    },
  },
  {
    accessorKey: "timeframe",
    header: "Timeframe",
  },
  {
    accessorKey: "tradeScreenshot",
    enableHiding: false,
    header: "Screenshot (png)",
    cell: ({ row }) => (
      <div className="relative h-12 w-full rounded-sm overflow-hidden">
        <Image
          src={row.getValue("tradeScreenshot")}
          alt="screenshot"
          fill={true}
          className="object-cover animate-pulse"
        />
      </div>
    ),
  },
  {
    accessorKey: "tradeStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("tradeStatus") as string;

      return (
        <div
          className={`px-2 py-0.5 text-center rounded-md text-[12px] font-semibold w-fit mx-auto text-foreground tracking-wider ${
            status.toLowerCase() == "win"
              ? "bg-green-500"
              : status.toLowerCase() == "loss"
              ? "bg-red-600"
              : "bg-accent"
          }`}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "riskAmount",
    enableHiding: false,
    header: () => <div className="">Risk Amount</div>,
    cell: ({ row }) => {
      const formatted = Number(row.getValue("riskAmount")).toFixed(1);
      return (
        <div className="tracking-wider font-semibold">${formatted}USD</div>
      );
    },
  },
  {
    accessorKey: "realizedPnL",
    enableHiding: false,
    header: () => <div className="">Realized PnL</div>,
    cell: ({ row }) => {
      const formatted = Number(row.getValue("realizedPnL")).toFixed(1);
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
        <div className="tracking-wider font-medium">
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
        <div className="tracking-wider font-medium">
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
        <div className="tracking-wider font-medium">
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
        <div className="tracking-wider font-medium">
          {row.getValue("positionSize")}
        </div>
      );
    },
  },

  {
    accessorKey: "confidence",
    header: "Confidence",
    cell: ({ row }) => (
      <Button className="bg-white hover:bg-white cursor-default mx-auto text-background font-bold h-6 w-5 text-[13px]">
        {row.getValue("confidence")}
      </Button>
    ),
  },
  {
    accessorKey: "head_Shoulders",
    header: "Head & Shoulders",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.head_Shoulders} />;
    },
  },
  {
    accessorKey: "divergence",
    header: "Divergence",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.divergence} />;
    },
  },
  {
    accessorKey: "fibKeyLevels",
    header: "Fib key Levels",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.fibKeyLevels} />;
    },
  },
  {
    accessorKey: "proTrendBias",
    header: "Pro Trend Bias",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.proTrendBias} />;
    },
  },
  {
    accessorKey: "trendLineRetest",
    header: "TrendLine Retest",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.trendlineRetest} />;
    },
  },
];
