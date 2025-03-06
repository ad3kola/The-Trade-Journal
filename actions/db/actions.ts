"use server";

import { usersCollection } from "@/config/firebase";
import { formSchema } from "@/config/zod";
import { FormSchemaWithRefID } from "@/lib/typings";
import { format } from "date-fns";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { z } from "zod";

export const uploadTrade = async ({ docID, data }: FormSchemaWithRefID) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  await addDoc(tradesCollectionRef, data);

};

export const getAllTrades = async (docID: string) => {
  try {
    const tradesCollectionRef = collection(usersCollection, docID, "trades");

    const querySnapshot = await getDocs(tradesCollectionRef);
    return querySnapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...(doc.data() as z.infer<typeof formSchema>),
        date: new Date(doc.data().date.seconds * 1000),
      }))
      .sort((b, a) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (err) {
    console.log(err)
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

  const realizedRRArray = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return data.tradeStatus == "Loss" ? -1 : data.risk_Reward;
  });

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
  trades.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Separate wins and losses
  const winTrades = trades.filter(
    (trade) => trade.tradeStatus.toLowerCase() === "win"
  );
  const lossTrades = trades.filter(
    (trade) => trade.tradeStatus.toLowerCase() === "loss"
  );

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
  const profitsArray = Object.entries(profits).map(([date, Profit]) => ({
    date,
    Profit,
  }));
  const lossesArray = Object.entries(losses).map(([date, Loss]) => ({
    date,
    Loss,
  }));

  return { profits: profitsArray, losses: lossesArray };
}

export async function fetchUserMetrics() {
  const querySnapshot = await getDocs(usersCollection); 

  const metrics = querySnapshot.docs
    .flatMap((doc) => doc.data().strategy) 
    .filter(Boolean); 

  const uniqueMetrics = [...new Set(metrics)]; 
  return uniqueMetrics;
}

export async function fetchStrategyWins(docID: string, metric: string) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const wins = querySnapshot.docs.filter((doc) => {
    const tradeData = doc.data();
    return (
      tradeData.strategy[metric] === true &&
      tradeData.tradeStatus.toLowerCase() == "win"
    );
  }).length;

  return wins;
}

export async function fetchStrategyLosses(docID: string, metric: string) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const losses = querySnapshot.docs.filter((doc) => {
    const tradeData = doc.data();
    return (
      tradeData.strategy[metric] === true &&
      tradeData.tradeStatus.toLowerCase() == "loss"
    );
  }).length;

  return losses;
}

export async function fetchMostTradedCoins(docID: string) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const tradedCoins: Record<string, number> = {};

  // Count occurrences of each coinSymbol.id
  querySnapshot.docs.forEach((doc) => {
    const coinId = doc.data().coinSymbol?.name;
    if (coinId) {
      tradedCoins[coinId] = (tradedCoins[coinId] || 0) + 1;
    }
  });

  // Convert to an array and sort by frequency
  const sortedCoins = Object.entries(tradedCoins).sort((a, b) => b[1] - a[1]);

  console.log("SortedCoins: ", sortedCoins)

  const mostTraded = sortedCoins[0]
    ? {
        title: "mostTraded",
        id: 1,
        name: sortedCoins[0][0],
        count: sortedCoins[0][1],
        fill: "var(--color-february)",
      }
    : {
        title: "",
        id: 0,
        name: "N/A",
        count: 0,
        fill: "var(--color-february)",
      };

  // If there is only one trade, don't return secondMostTraded and others
  if (sortedCoins.length === 1) {
    return [mostTraded];
  }

  const secondMostTraded = sortedCoins[1]
    ? {
        title: "secondMostTraded",
        id: 2,
        name: sortedCoins[1][0],
        count: sortedCoins[1][1],
        fill: "var(--color-february)",
      }
    : {
        title: "",
        id: 0,
        name: "N/A",
        count: 0,
        fill: "var(--color-february)",
      };

  const othersCount = sortedCoins
    .slice(2)
    .reduce((acc, [, count]) => acc + count, 0);
  const others = {
    title: "others",
    name: "others",
    count: othersCount,
    id: 3,
    fill: "var(--color-february)",
  };

  return [mostTraded, secondMostTraded, others].filter(Boolean);
}


export async function fetchTradingSessionData(docID: string) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  const querySnapshot = await getDocs(tradesCollectionRef);

  const tradedSessions: Record<string, { wins: number; losses: number }> = {};

  // Count occurrences of each tradeSession where the tradeStatus is "win" or "loss"
  querySnapshot.docs.forEach((doc) => {
    const data = doc.data();
    const session = data.tradeSession;
    const tradeStatus = data.tradeStatus.toLowerCase();

    if (session) {
      if (tradeStatus === "win") {
        tradedSessions[session] = {
          ...tradedSessions[session],
          wins: (tradedSessions[session]?.wins || 0) + 1,
        };
      } else if (tradeStatus === "loss") {
        tradedSessions[session] = {
          ...tradedSessions[session],
          losses: (tradedSessions[session]?.losses || 0) + 1,
        };
      }
    }
  });

  // Convert to an array and sort by wins first, then losses
  const sortedTradeSessions = Object.entries(tradedSessions).sort((a, b) => {
    const winsDifference = b[1].wins - a[1].wins;
    if (winsDifference !== 0) {
      return winsDifference;
    }
    return b[1].losses - a[1].losses; // Sort by losses if wins are the same
  });

  const mostTraded = sortedTradeSessions[0]
    ? {
        sessionName: sortedTradeSessions[0][0],
        wins: sortedTradeSessions[0][1].wins,
        losses: sortedTradeSessions[0][1].losses,
      }
    : {
        sessionName: "N/A",
        wins: 0,
        losses: 0,
      };

  const secondMostTraded = sortedTradeSessions[1]
    ? {
        sessionName: sortedTradeSessions[1][0],
        wins: sortedTradeSessions[1][1].wins,
        losses: sortedTradeSessions[1][1].losses,
      }
    : {
        sessionName: "N/A",
        wins: 0,
        losses: 0,
      };

  const lastSession = sortedTradeSessions[2]
    ? {
        sessionName: sortedTradeSessions[2][0],
        wins: sortedTradeSessions[2][1].wins,
        losses: sortedTradeSessions[2][1].losses,
      }
    : {
        sessionName: "N/A",
        wins: 0,
        losses: 0,
      };

  console.log([mostTraded, secondMostTraded, lastSession].filter(Boolean));
  return [mostTraded, secondMostTraded, lastSession].filter(Boolean);
}


// export async function fetchPnLByDateRange(docID, dateRange) {
//   const tradesCollectionRef = collection(usersCollection, docID, "trades");
//   const querySnapshot = await getDocs(tradesCollectionRef);
// }