import { columns } from "@/components/OrderHistory/Columns";
import { DataTable } from "@/components/OrderHistory/DataTable";
import { orderBook } from "@/lib/constants/ind4x";
import { OrderBook } from "@/lib/typings";

async function getData(): Promise<OrderBook[]> {
  return orderBook;
}

async function page() {
  const data = await getData();
  return (
    <main className="p-4 flex flex-col w-full gap-3">
      <div className="px-4 mt-5 font-semibold">
      <h3 className="text-lg">A List of All Trades & Transactions</h3>
    <h5 className="text-sm font-normal">
          View and analyze all your past trades with key metrics, filters, and
          insights to refine your strategy.
        </h5>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  );
}

export default page;
