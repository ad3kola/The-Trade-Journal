"use server";

import { usersCollection } from "@/config/firebase";
import { formSchema } from "@/config/zod";
import { FormSchemaWithRefID } from "@/lib/typings";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { z } from "zod";

export const uploadTrade = async ({ docID, data }: FormSchemaWithRefID) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  console.log(docID)

  const docRef = await addDoc(tradesCollectionRef, data);

  console.log("Trade successfully created", docRef.id);
};

export const getAllTrades = async ({ docID }: { docID: string }) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const querySnapshot = await getDocs(tradesCollectionRef);
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as z.infer<typeof formSchema>),
    date: new Date(doc.data().date),
  }));
};

export const getCurrentUserDoc = async (userID: string) => {
  const q = query(usersCollection, where("id", "==", userID));

  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) {
    console.warn("No user found in Firestore for ID:", userID);
    return null;
  }

  const doc = querySnapshot.docs[0]; // Get the first document
  return {
    docRefID: doc.id as string,
    userID: doc.data().id as string,
    ...doc.data(),
  };
};

export const fetchPnLData = async ({ docID }: { docID: string }) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const querySnapshot = await getDocs(tradesCollectionRef);

  const realizedPnLArray = querySnapshot.docs.map(
    (doc) => doc.data().realizedPnL
  );

  const totalPnL = realizedPnLArray.reduce((acc, pnl) => acc + pnl, 0);

  const highestPositivePnL =
    realizedPnLArray.length > 0 ? Math.max(...realizedPnLArray) : 0;

  const highestNegativePnL = realizedPnLArray.some((pnl) => pnl < 0)
    ? Math.min(...realizedPnLArray)
    : 0;

  return { totalPnL, highestPositivePnL, highestNegativePnL };
};

export const fetchRRData = async ({ docID }: { docID: string }) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const realizedRRArray = querySnapshot.docs.map(
    (doc) => doc.data().risk_Reward
  );

  const totalTrades = realizedRRArray.length;
  const totalRR = realizedRRArray.reduce((acc, rr) => acc + rr, 0);

  const positiveTrades = realizedRRArray.filter((rr) => rr > 0).length;
  const winRate = totalTrades > 0 ? (positiveTrades / totalTrades) * 100 : 0;

  const highestPositiveRR = Math.max(...realizedRRArray);

  return { totalRR, highestPositiveRR, winRate, totalTrades };
};

export const totalTrades = async ({ docID }: { docID: string }) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);
  return { tradeCount: querySnapshot.docs.length };
};

export const tradeCalendar = async ({ docID }: { docID: string }) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const querySnapshot = await getDocs(tradesCollectionRef);

  const allDates = querySnapshot.docs.map((doc) => doc.data().date);

  const formattedDates = allDates.forEach((date) => new Date(date));

  return formattedDates;
};

export const PnLOnAreaChart = async ({ docID }: { docID: string }) => {
    
}