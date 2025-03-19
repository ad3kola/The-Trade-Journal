"use client";

import { getAllTrades, getCurrentUserDoc } from "@/actions/db/actions";
import { columns } from "@/components/OrderHistory/Columns";
import { DataTable } from "@/components/OrderHistory/DataTable";
import { formSchema } from "@/config/zod";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

function Page() {
  const { id } = useParams<{ id: string }>();
  const [allTrades, setAllTrades] = useState<z.infer<typeof formSchema>[]>([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const docID = await getCurrentUserDoc(id);
      if (docID) {
        const res = await getAllTrades(docID.docRefID);
        setAllTrades(res);
      }
    };
    fetchTrades();
  }, [id]);
  console.log(allTrades);
  return (
    <main className="p-4 flex flex-col w-full gap-3">
      <div className="px-4 mt-5 font-semibold">
        <h3 className="text-lg">A List of All Trades & Transactions</h3>
        <h5 className="text-sm font-normal">
          View and analyze all your past trades with key metrics, filters, and
          insights to refine your strategy.F
        </h5>
      </div>
      <DataTable columns={columns} data={allTrades}/>
    </main>
  );
}

export default Page;
