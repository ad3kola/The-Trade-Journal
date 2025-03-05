import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formSchema } from "@/config/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import { z } from "zod";

export default function RecentTransactions({
  allTrades,
}: {
  allTrades: z.infer<typeof formSchema>[];
}) {
  console.log(allTrades);

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
              Realized PnL
            </TableHead>
            <TableHead className="w-[150px] text-center whitespace-nowrap">
              Method
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allTrades &&
            allTrades.length > 0 &&
            allTrades.slice(0, 5).map((trade, indx) => (
              <TableRow key={indx} className="hover:bg-input">
                {/* Coin Symbol */}
                <TableCell className="w-[230px] flex items-center gap-3 whitespace-nowrap">
                  <Image
                    src={trade.coinSymbol.image as string}
                    alt="logo"
                    width={35}
                    className="rounded-full"
                    height={35}
                  />
                  <div className="flex flex-col">
                    <span className="uppercase font-bold tracking-wider">
                      {trade.coinSymbol.symbol}
                      USDT
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
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
                        : "bg-red-500"
                    }`}
                  >
                    {trade.tradeStatus}
                  </span>
                </TableCell>

                {/* Realized PnL */}
                <TableCell className="text-right whitespace-nowrap">
                  <div
                    className={cn(
                      "flex flex-col items-end -space-y-1",
                      trade.realizedPnL > 0 ? "text-green-500" : "text-red-500"
                    )}
                  >
                    <span className="font-bold text-base tracking-wide">
                      {trade.realizedPnL.toFixed()} USD
                    </span>
                    <span className="text-[11px] font-medium text-muted-foreground">
                      {trade.realizedPnL.toFixed(2)} CAD
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
