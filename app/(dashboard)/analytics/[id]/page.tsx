"use client";

import { getCurrentUserDoc } from "@/actions/db/actions";
import MostTradedCoins from "@/components/Analytics/MostTradedCoins";
import PnL from "@/components/Analytics/PnL";
import SessionLosses from "@/components/Analytics/SessionLosses";
import SessionWins from "@/components/Analytics/SessionWins";
import StrategyLosses from "@/components/Analytics/StrategyLosses";
import StrategyWins from "@/components/Analytics/StrategyWins";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Page() {
  const [docID, setDocID] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        if (doc) setDocID(doc.docRefID);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="w-full px-2 py-4 flex flex-col gap-4">
      <div className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4">
        <PnL />
        <PnL />
        <MostTradedCoins docID= {docID}/>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 w-full gap-4">
        <StrategyWins docID={docID} />
        <StrategyLosses docID={docID} />
        <SessionWins docID={docID} />
        <SessionLosses docID={docID} />
      </div>
    </main>
  );
}
