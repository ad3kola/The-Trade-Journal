"use server";

import { db } from "@/config/firebase";
import { formSchema } from "@/config/zod";
import { addDoc, collection } from "firebase/firestore";
import { z } from "zod";

const uploadDataToDB = async (tradeData: z.infer<typeof formSchema>) => {
  const docRef = await addDoc(collection(db, "trades"), tradeData);
  return docRef;
};

export default uploadDataToDB;
