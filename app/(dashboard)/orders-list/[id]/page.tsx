"use client";

import { getAllTrades, getCurrentUserDoc } from "@/actions/db/actions";
import { getColumns } from "@/components/OrderHistory/Columns";
import { DataTable } from "@/components/OrderHistory/DataTable";
import { auth, usersCollection } from "@/config/firebase";
import { formSchema } from "@/config/zod";
import { onAuthStateChanged } from "firebase/auth";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const deleteTradeLog = async (docID: string, tradeID: string) => {
  console.log("DocID: ", docID, "TradeID: ", tradeID);
  await deleteDoc(doc(collection(usersCollection, docID, "trades"), tradeID));
  console.log("deleted");
};

function Page() {
  const [DOCID, setDOCID] = useState<string>("");
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        if (doc) setDOCID(doc.docRefID);
      }
    });
    return () => unsubscribe();
  }, []);
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

  const handleDeleteTrade = async (tradeID: string | undefined) => {
    if (!id || !tradeID) return;

    try {
      await deleteTradeLog(DOCID, tradeID);
      setAllTrades((prevTrades) => prevTrades.filter((trade) => trade.id !== tradeID));
    } catch (error) {
      console.error("Error deleting trade:", error);
    }
  };

  return (
    <main className="p-4 flex flex-col w-full gap-3">
      <div className="px-4 mt-5 font-semibold">
        <h3 className="text-lg">A List of All Trades & Transactions</h3>
        <h5 className="text-sm font-normal">
          View and analyze all your past trades with key metrics, filters, and
          insights to refine your strategy.
        </h5>
      </div>
      <DataTable columns={getColumns(handleDeleteTrade)} data={allTrades} />
    </main>
  );
}

export default Page;
