import { columns } from "@/components/OrderHistory/Columns"
import { DataTable } from "@/components/OrderHistory/DataTable"
import { orderBook } from "@/lib/constants/ind4x"
import { OrderBook } from "@/lib/typings"

async function getData(): Promise<OrderBook[]> {
    return orderBook
        
}

async function page() {
    const data = await getData()
  return (
    <main className="p-4 flex flex-col w-full gap-3">
        <h3 className="px-4 font-semibold text-lg">A List of All Trades & Transactions</h3>
      <DataTable columns={columns} data = {data} />
    </main>
  )
}

export default page
