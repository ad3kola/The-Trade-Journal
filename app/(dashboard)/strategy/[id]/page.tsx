"use client";

import { getCurrentUserDoc } from "@/actions/db/actions";
import CreateStrategy from "@/components/CreateStrategy";
import StrategyAccordion from "@/components/StrategyAccordion";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id } = useParams<{ id: string }>();
  const [docID, setDocID] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        if (doc) setDocID(doc.docRefID);
      }
    });
    return () => unsubscribe();
  }, [id, docID]);
  return (
    <main className="w-full flex flex-col gap-4 px-2 sm:px-4 py-12">
      <CreateStrategy docID={docID} />
      <StrategyAccordion docID={docID} />
    </main>
  );
}

export default Page;
