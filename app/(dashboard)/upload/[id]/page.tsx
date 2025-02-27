"use client";

import { getCurrentUserDoc } from "@/actions/db/actions";
import FormComponent from "@/components/Form";
import { auth } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

const Page = () => {
  const [docID, setDocID] = useState<string>("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async  (user) => {
      if (user) {
        const doc = await getCurrentUserDoc(user.uid);
        setDocID(doc!.docRefID );
      }

    });
    return () => unsubscribe();
  }, []);

  return (
    <main className="p-2 md:p-4 lg:p-6 flex flex-col w-full">
      <FormComponent docID={docID} />
    </main>
  );
};

export default Page;
