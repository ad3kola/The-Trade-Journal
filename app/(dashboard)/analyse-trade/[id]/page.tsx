"use client";

import { getCurrentUserDoc } from "@/actions/db/actions";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const id = useParams<{ id: string }>();
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
    // useEffect(() => {
    //     const getTradeData = async () => {
    //         const res = await getSelectedTrade(docID, )
    //     }
    // }, [])
    console.log(docID, id)
  return <div>

  </div>;
}

export default Page;
