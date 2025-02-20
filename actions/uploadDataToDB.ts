"use server";

import { db } from "@/lib/config/firebase";
import { formSchema } from "@/lib/config/zod";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

const uploadDataToDB = async (tradeData: z.infer<typeof formSchema>) => {
  const docRef = await addDoc(collection(db, "trades"), tradeData);
  return docRef
};

export default uploadDataToDB;
