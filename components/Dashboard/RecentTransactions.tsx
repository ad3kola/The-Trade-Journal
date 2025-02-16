import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

const invoices = [
  {
    status: "open",
    type: "buy",
    realizedPnL: "250.00",
    coinName: "btc",
    coinLogo: "/btc.png",
    accountType: "Personal Card",
  },
  {
    status: "closed",
    type: "sell",
    realizedPnL: "150.00",
    coinName: "btc",
    coinLogo: "/btc.png",
    accountType: "Personal",
  },
  {
    status: "closed",
    type: "buy",
    realizedPnL: "350.00",
    coinName: "1000pepe",
    coinLogo: "/btc.png",
    accountType: "Personal Transfer",
  },
  {
    status: "closed",
    type: "buy",
    realizedPnL: "450.00",
    coinName: "btc",
    coinLogo: "/btc.png",
    accountType: "PropFirm",
  },
  {
    status: "closed",
    type: "sell",
    realizedPnL: "550.00",
    coinName: "btc",
    coinLogo: "/btc.png",
    accountType: "Personal",
  },
];

export default function RecentTransactions() {
  return (
    <Table>
      {/* <TableCaption>Recent Transaction</TableCaption> */}
      <TableHeader className="">
        <TableRow>
          <TableHead className="w-[230px]">Coin Symbol</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="w-[250px]">Amount</TableHead>
          <TableHead className="w-[130px]">Method</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="px-10">
        {invoices.map((invoice, indx) => (
          <TableRow key={indx} className="hover:bg-transparent">
            <TableCell className="w-[230px] flex items-center gap-4 tracking-wide">
              <Image src={invoice.coinLogo} alt="logo" width={30} height={30} />
              <div className="flex flex-col">
                <span className="uppercase font-bold">{invoice.coinName} / USDT</span>
                <span className="text-[12px] font-medium text-muted-foreground">
                  {"Aug 24, 2024"}
                </span>
              </div>
            </TableCell>
            <TableCell className="capitalize font-medium tracking-wide">
              <span>{invoice.type}</span>
            </TableCell>
            <TableCell className="uppercase font-medium tracking-wide">
              <span
                className={`px-2 py-1 rounded-md text-[10px] ${
                  invoice.status == "open"
                    ? "bg-white text-primary"
                    : "bg-primary text-foreground"
                }`}
              >
                {invoice.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="w-[120px] flex flex-col -space-y-1">
                <span className="font-medium text-base tracking-wide">
                  {" "}
                  ${invoice.realizedPnL}
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">
                  $ {invoice.realizedPnL} CAD
                </span>
              </div>
            </TableCell>
            <TableCell><div className="w-[130px]">{invoice.accountType}</div></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
)}
