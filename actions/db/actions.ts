"use server";

import { usersCollection } from "@/config/firebase";
import { formSchema } from "@/config/zod";
import { FormSchemaWithRefID } from "@/lib/typings";
import { format } from "date-fns";

import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { z } from "zod";

export const uploadTrade = async ({ docID, data }: FormSchemaWithRefID) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  console.log(docID);

  const docRef = await addDoc(tradesCollectionRef, data);

  console.log("Trade successfully created", docRef.id);
};

export const getAllTrades = async (docID: string) => {
  try {
    const tradesCollectionRef = collection(usersCollection, docID, "trades");

    const querySnapshot = await getDocs(tradesCollectionRef);
    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as z.infer<typeof formSchema>),
        date: new Date(doc.data().date.seconds * 1000).toISOString(),
      }))
      .sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (err) {
    console.log(err);
    return [];
  }
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

export const fetchPnLData = async (docID: string) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const realizedPnLArray = querySnapshot.docs.map(
    (doc) => doc.data().realizedPnL
  );

  const totalTrades = realizedPnLArray.length;
  const totalPnL = realizedPnLArray.reduce((acc, pnl) => acc + pnl, 0);

  const highestPositivePnL =
    realizedPnLArray.length > 0 ? Math.max(...realizedPnLArray) : 0;

  const highestNegativePnL = realizedPnLArray.some((pnl) => pnl < 0)
    ? Math.min(...realizedPnLArray)
    : 0;

  // ✅ Calculate Win Rate from PnL
  const positiveTrades = realizedPnLArray.filter((pnl) => pnl > 0).length;
  const winRate = totalTrades > 0 ? (positiveTrades / totalTrades) * 100 : 0;

  // Debugging: Log key values
  console.log("Positive Trades:", positiveTrades);
  console.log("Total Trades:", totalTrades);
  console.log("Win Rate:", winRate);

  return {
    totalPnL,
    highestPositivePnL,
    highestNegativePnL,
    winRate,
    totalTrades,
  };
};

export const fetchRRData = async (docID: string) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const realizedRRArray = querySnapshot.docs.map(
    (doc) => doc.data().risk_Reward
  );

  const totalTrades = realizedRRArray.length;
  const totalRR = realizedRRArray.reduce((acc, rr) => acc + rr, 0);
  const highestPositiveRR =
    realizedRRArray.length > 0 ? Math.max(...realizedRRArray) : 0;

  return { totalRR, highestPositiveRR, totalTrades };
};

export const totalTrades = async (docID: string) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);
  return { tradeCount: querySnapshot.docs.length };
};

export const tradeCalendar = async (docID: string) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const querySnapshot = await getDocs(tradesCollectionRef);

  const formattedDates: Date[] = querySnapshot.docs
    .map((doc) => {
      const timestamp = doc.data().date;
      return timestamp?.toDate?.() || null;
    })
    .filter((date): date is Date => date !== null); // Remove null values

  return formattedDates;
};

export async function fetchTradeDataForLast7Trades(docID: string) {
  const trades = await getAllTrades(docID);

  // Sort trades by date (oldest first)
  trades.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Separate wins and losses
  const winTrades = trades.filter((trade) => trade.tradeStatus.toLowerCase() === "win");
  const lossTrades = trades.filter((trade) => trade.tradeStatus.toLowerCase() === "loss");

  // Aggregate last 7 winning trades
  const profits = winTrades
    .slice(-10) // Get last 7 winning trades
    .reduce((acc, trade) => {
      const formattedDate = format(new Date(trade.date), "MM/dd");
      if (!acc[formattedDate]) acc[formattedDate] = 0;
      acc[formattedDate] += trade.realizedPnL || 0;
      return acc;
    }, {} as Record<string, number>);

  // Aggregate last 7 losing trades
  const losses = lossTrades
    .slice(-10) // Get last 7 losing trades
    .reduce((acc, trade) => {
      const formattedDate = format(new Date(trade.date), "MM/dd");
      if (!acc[formattedDate]) acc[formattedDate] = 0;
      acc[formattedDate] += Math.abs(trade.realizedPnL || 0); // Convert to positive
      return acc;
    }, {} as Record<string, number>);

  // Convert to array format for charts
  const profitsArray = Object.entries(profits).map(([date, Profit]) => ({ date, Profit }));
  const lossesArray = Object.entries(losses).map(([date, Loss]) => ({ date, Loss }));

  console.log({ profits: profitsArray, losses: lossesArray });
  return { profits: profitsArray, losses: lossesArray };
}
