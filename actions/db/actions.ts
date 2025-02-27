"use server";

import { usersCollection } from "@/config/firebase";
import { FormSchemaWithRefID } from "@/lib/typings";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

export const uploadTrade = async ({ docID, data }: FormSchemaWithRefID) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const docRef = await addDoc(tradesCollectionRef, data);

  console.log("Trade successfully created", docRef.id);
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
    docRefID: doc.id,
    userID: doc.data().id,
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

  const totalRR = realizedRRArray.reduce((acc, rr) => acc + rr, 0);

  const highestPositiveRR =
    realizedRRArray.length > 0 ? Math.max(...realizedRRArray) : 0;

  return { totalRR, highestPositiveRR };
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

export const winRate = async ({ docID }: { docID: string }) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);
};
