"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Button } from "../ui/button";
import { z } from "zod";
import { format } from "date-fns";
import { formSchema } from "@/config/zod";
import { cn } from "@/lib/utils";
import { NotebookPenIcon, TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

const StatusCell = ({ value }: { value: boolean }) => (
  <div
    className={`py-0.5 px-3 w-fit text-center rounded-md text-[12px] font-semibold tracking-wider mx-auto ${
      value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
    }`}
  >
    {value ? "true" : "false"}
  </div>
);

export const getColumns = (
  onDelete: (tradeID: string | undefined) => void
): ColumnDef<z.infer<typeof formSchema>>[] => [
  {
    id: "id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
console.log(row.original.id);
      return (
      <TooltipProvider>
        <div className="flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger>
              <TrashIcon
                className="h-4 w-4 cursor-pointer"
                onClick={() => onDelete(row.original.id)}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <Link href={`/analyse-trade/${row.original.docID}/${row.original.id}`}>
            <TooltipTrigger>
              <NotebookPenIcon className="h-4 w-4 cursor-pointer" />
            </TooltipTrigger>
            </Link>
            <TooltipContent>
              <p>Edit Trade</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    )
   },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "coinSymbol",
    enableHiding: false,
    header: () => <div className="px-2">Coin Symbol</div>,
    cell: ({ row }) => (
      <div className="w-[215px] flex items-center gap-3 tracking-wide">
        <Image
          src={row.original.coinSymbol.image as string}
          alt="logo"
          width={35}
          height={35}
          className="rounded-full"
        />
        <div className="flex flex-col -space-y-1">
          <span className="uppercase text-left font-bold text-base">
            {row.original.coinSymbol.symbol?.toUpperCase()} / USDT
          </span>
          <span className="max-w-52 text-[10px] font-medium text-muted-foreground truncate whitespace-nowrap">
            {row.original.coinSymbol.name} TetherUS Perpetual
          </span>
        </div>
      </div>
    ),
    filterFn: (row, columnId, filterValue) => {
      return row.original.coinSymbol
        .symbol!.toLowerCase()
        .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "date",
    enableHiding: false,
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return <div className="w-[120px]">{format(date, "PP")}</div>;
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
            status.toLowerCase() == "win" ? "bg-green-500" : "bg-red-600"
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
      const value = Number(row.getValue("realizedPnL"));
      const formatted = value.toFixed();
      return (
        <div
          className={cn(
            "tracking-wider font-semibold",
            value > 0 ? "text-green-500" : "text-red-500"
          )}
        >
          ${formatted}USD
        </div>
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
      <Button className="bg-primary mx-auto text-foreground font-bold h-6 w-5 text-[13px]">
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
      return <StatusCell value={strategy.head_and_Shoulders} />;
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
      return <StatusCell value={strategy.fib_Key_Levels} />;
    },
  },
  {
    accessorKey: "proTrendBias",
    header: "Pro Trend Bias",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.pro_Trend_Bias} />;
    },
  },
  {
    accessorKey: "trendLineRetest",
    header: "TrendLine Retest",
    cell: ({ row }) => {
      const strategy = row.original.strategy;
      if (!strategy) return null;
      return <StatusCell value={strategy.trendline_Retest} />;
    },
  },
];
