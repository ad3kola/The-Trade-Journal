"use server";

import { usersCollection } from "@/config/firebase";
import { formSchema } from "@/config/zod";
import { FormSchemaWithRefID } from "@/lib/typings";
import { format } from "date-fns";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  Timestamp,
  where,
} from "firebase/firestore";
import numbro from "numbro";
import { z } from "zod";

export const uploadTrade = async ({ docID, data }: FormSchemaWithRefID) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  await addDoc(tradesCollectionRef, data);
};

export const getSelectedTrade = async (
  docID: string | null,
  tradeID: string
) => {
  if (docID) {
    const tradesCollectionRef = collection(usersCollection, docID, "trades");
    const tradeDocRef = doc(tradesCollectionRef, tradeID);
    const tradeDoc = await getDoc(tradeDocRef);
    console.log(tradeDoc.data()?.coinSymbol.name);
    const res = {
      ...(tradeDoc.data() as z.infer<typeof formSchema>),
      date: new Date(tradeDoc.data()?.date.seconds * 1000),
    };
    return res as z.infer<typeof formSchema>;
  }
};

export const getAllTrades = async (
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) => {
  try {
    const tradesCollectionRef = collection(usersCollection, docID, "trades");
    let queryRef = query(tradesCollectionRef);

    if (startDate) {
      queryRef = query(queryRef, where("date", ">=", startDate));
    }
    if (endDate) {
      queryRef = query(queryRef, where("date", "<=", endDate));
    }

    const querySnapshot = await getDocs(queryRef);
    return querySnapshot.docs
      .map((doc) => ({
        docID,
        id: doc.id,
        ...(doc.data() as z.infer<typeof formSchema>),
        date: new Date(doc.data().date.seconds * 1000),
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

export const fetchPnLData = async (
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  // Apply date filtering if dates are provided
  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);
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

  // Calculate Win Rate from PnL
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

export const fetchRRData = async (
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  // Apply date filtering if dates are provided
  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);
  const realizedRRArray = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return data.tradeStatus === "Loss" ? -1 : data.risk_Reward;
  });

  const totalTrades = realizedRRArray.length;
  const totalRR = realizedRRArray.reduce((acc, rr) => acc + rr, 0);

  const highestPositiveRR =
    realizedRRArray.length > 0 ? Math.max(...realizedRRArray) : 0;

  return { totalRR, highestPositiveRR, totalTrades };
};

export const totalTrades = async (
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  // Apply date filtering if dates are provided
  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);
  return { tradeCount: querySnapshot.docs.length };
};

export const tradeCalendar = async (
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) => {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  // Apply date filtering if dates are provided
  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);
  const formattedDates: Date[] = querySnapshot.docs
    .map((doc) => {
      const timestamp = doc.data().date;
      return timestamp?.toDate?.() || null;
    })
    .filter((date): date is Date => date !== null); // Remove null values

  return formattedDates;
};

export async function fetchTradeDataForLastTrades(
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) {
  const trades = await getAllTrades(docID, startDate, endDate);
  
  // Sort trades by date (earliest to latest)
  trades.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const formatNumber = (num: number) => {
      if (num >= 1000) {
        return numbro(num).format({ average: true, mantissa: 2 }); // 9.99k
      }
      return numbro(num).format({ mantissa: 2 }); 
    };

  const wonTrades = trades.filter(
    (trade) => trade.tradeStatus.toLowerCase() === "win"
  );
  const lostTrades = trades.filter(
    (trade) => trade.tradeStatus.toLowerCase() === "loss"
  );

  // Format the date and map it to the profitsArray
  const profitsArray = wonTrades.slice(-20).map((trade) => ({
    date: format(new Date(trade.date), "M/d"),  // Format date to "MM/DD"
    profit: trade.realizedPnL,
  }));
  console.log(profitsArray); // Debug log to check the profits array

  // Sum the total profit from the last 20 winning trades
  const summedProfit = wonTrades
    .slice(-20)
    .reduce((acc, trade) => acc + (trade.realizedPnL || 0), 0);

  // Sum the total loss from the last 10 losing trades
  const summedLoss = lostTrades
    .slice(-10) // Get last 10 losing trades (or modify to 7 if needed)
    .reduce((acc, trade) => acc + (trade.realizedPnL || 0), 0);

  // Calculate net PnL
  const netPnL = summedProfit - summedLoss;

  return {
    Total_Profit: formatNumber(summedProfit),
    Total_Loss: formatNumber(summedLoss),
    Realized_PnL: formatNumber(netPnL),
    Profits_Array: profitsArray,
  };
}

export async function fetchUserMetrics() {
  const querySnapshot = await getDocs(usersCollection);
  const metrics = querySnapshot.docs
    .flatMap((doc) => doc.data().strategy)
    .filter(Boolean);
  console.log();
  const uniqueMetrics = [...new Set(metrics)];
  console.log(uniqueMetrics);
  return uniqueMetrics;
}

export async function fetchStrategyWins(
  docID: string,
  metric: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);

  const wins = querySnapshot.docs.filter((doc) => {
    const tradeData = doc.data();
    return (
      tradeData.strategy[metric] === true &&
      tradeData.tradeStatus.toLowerCase() === "win"
    );
  }).length;

  return wins;
}

export async function fetchStrategyLosses(
  docID: string,
  metric: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);

  const losses = querySnapshot.docs.filter((doc) => {
    const tradeData = doc.data();
    return (
      tradeData.strategy[metric] === true &&
      tradeData.tradeStatus.toLowerCase() === "loss"
    );
  }).length;

  return losses;
}

export async function fetchMostTradedCoins(
  docID: string,
  startDate?: Date,
  endDate?: Date
) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  let queryRef = query(tradesCollectionRef);

  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);
  const tradedCoins: Record<string, number> = {};

  querySnapshot.docs.forEach((doc) => {
    const coinId = doc.data().coinSymbol?.name;
    if (coinId) {
      tradedCoins[coinId] = (tradedCoins[coinId] || 0) + 1;
    }
  });

  const sortedCoins = Object.entries(tradedCoins).sort((a, b) => b[1] - a[1]);

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

export async function fetchTradingSessionData(
  docID: string,
  startDate?: Date,
  endDate?: Date
) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");
  let queryRef = query(tradesCollectionRef);

  if (startDate) {
    queryRef = query(queryRef, where("date", ">=", startDate));
  }
  if (endDate) {
    queryRef = query(queryRef, where("date", "<=", endDate));
  }

  const querySnapshot = await getDocs(queryRef);

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

  return [mostTraded, secondMostTraded, lastSession].filter(Boolean);
}

export async function fetchAnalyticsPnL(
  docID: string,
  startDate: Date | null = null,
  endDate: Date | null = null
) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const queries = {
    propFirm: query(
      tradesCollectionRef,
      where("accountType", "==", "Prop Firm")
    ),
    personal: query(
      tradesCollectionRef,
      where("accountType", "==", "Personal")
    ),
  };

  if (startDate) {
    queries.propFirm = query(queries.propFirm, where("date", ">=", startDate));
    queries.personal = query(queries.personal, where("date", ">=", startDate));
  }
  if (endDate) {
    queries.propFirm = query(queries.propFirm, where("date", "<=", endDate));
    queries.personal = query(queries.personal, where("date", "<=", endDate));
  }

  const [propFirmSnapshot, personalSnapshot] = await Promise.all([
    getDocs(queries.propFirm),
    getDocs(queries.personal),
  ]);

  const processData = (snapshot: QuerySnapshot<DocumentData>, name: string) => {
    let totalPnL = 0;
    const wins: { date: string; value: number }[] = [];
    const losses: { date: string; value: number }[] = [];

    snapshot.docs.forEach((doc) => {
      const data = doc.data();
      const formattedDate = formatDate(data.date.toDate());
      totalPnL += data.realizedPnL;

      if (data.tradeStatus.toLowerCase() == "win") {
        wins.push({
          date: formattedDate,
          value: Math.abs(data.realizedPnL.toFixed(2)),
        });
      } else if (data.tradeStatus.toLowerCase() == "loss") {
        losses.push({
          date: formattedDate,
          value: Math.abs(data.realizedPnL.toFixed(2)),
        });
      }
    });

    return { name, totalPnL, wins, losses };
  };

  return {
    propfirmPnL: processData(propFirmSnapshot, "Prop Firm"),
    personalPnL: processData(personalSnapshot, "Personal"),
  };
}

// Helper function to format the date as 'MM/DD'
const formatDate = (date: Date) => format(date, "MM/dd");
const formatDateWithYear = (date: Date) => format(date, "MM/dd/yyyy");

interface TradeData {
  date: Timestamp; // Assuming Firestore Timestamp for date
  realizedPnL: number;
  accountType: string; // You can modify this type according to your actual data fields
}

// Type for the aggregated trade data by date
interface AggregatedTrade {
  total: number;
  tradesCount: number;
}

// Function to fetch and aggregate trades for the calendar PnL
export async function fetchAnalyticsCalendarPnL(docID: string) {
  const tradesCollectionRef = collection(usersCollection, docID, "trades");

  const querySnap = await getDocs(tradesCollectionRef);

  // Aggregate trades by date
  const aggregatedTrades = querySnap.docs.reduce(
    (acc: { [key: string]: AggregatedTrade }, doc: QueryDocumentSnapshot) => {
      const tradeData = doc.data() as TradeData;
      const dateKey = formatDateWithYear(tradeData.date.toDate()); // Format date for consistent key

      // If no trades exist for this date yet, create a new entry
      if (!acc[dateKey]) {
        acc[dateKey] = {
          total: 0,
          tradesCount: 0,
        };
      }

      // Increment total PnL for the day
      acc[dateKey].total += tradeData.realizedPnL;
      // Increment the count of trades for the day
      acc[dateKey].tradesCount += 1;

      return acc;
    },
    {}
  ); // Start with an empty object as the accumulator

  // Convert aggregated data to an array and return it
  const result = Object.keys(aggregatedTrades).map((date) => ({
    date,
    total: Number(aggregatedTrades[date].total.toFixed(0)),
    tradesCount: aggregatedTrades[date].tradesCount,
  }));

  console.log(result);

  return result;
}
