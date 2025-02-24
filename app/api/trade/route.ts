import { usersCollection } from "@/config/firebase";
import { addDoc, collection, doc, getDocs, query } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

// Function to fetch total PnL
export const fetchTotalPnL = async (userID: string) => {
  const docRef = doc(usersCollection, userID);
  const q = query(collection(docRef, "trades"));

  const querySnapshot = await getDocs(q);

  // Calculate the totalPnL by summing up the realizedPnLs directly
  const totalPnL = querySnapshot.docs.reduce((acc, doc) => {
    const realizedPnL = doc.data().realizedPnL || 0; // Default to 0 if realizedPnL is missing
    return acc + realizedPnL;
  }, 0);

  // Return only the totalPnL
  return totalPnL;
};

export const fetchTotalRR = async (userID: string) => {
  const docRef = doc(usersCollection, userID);
  const q = query(collection(docRef, "trades"));

  const querySnapshot = await getDocs(q);

  // Calculate the totalPnL by summing up the realizedPnLs directly
  const totalRR = querySnapshot.docs.reduce((acc, doc) => {
    const RR = doc.data().risk_Reward || 0; // Default to 0 if realizedPnL is missing
    return acc + RR;
  }, 0);

  // Return only the totalPnL
  return totalRR;
};

// API handler for GET requests
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("id");

  if (!userID) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    // Get totalPnL for the user
    const totalPnL = await fetchTotalPnL(userID);
    const totalRR = await fetchTotalRR(userID);

    // Fetch all trade documents for the user
    const userRef = doc(usersCollection, userID);
    const tradesCollectionRef = collection(userRef, "trades");
    const querySnapshot = await getDocs(tradesCollectionRef);

    // Format the result to include document ID and data
    const formattedData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Include totalPnL in the response
    return NextResponse.json({ totalPnL, totalRR, trades: formattedData });
  } catch (err) {
    // Provide more context in the error response
    return NextResponse.json(
      { error: `Failed to fetch user: ${err || err}` },
      { status: 500 }
    );
  }
  }

export async function POST(req: NextRequest) {
  const res = await req.json();  
  const { userID, data } = res;
     if (!userID || !data) {
      return NextResponse.json(
        { message: "Missing 'userID' or 'data' in request body." },
        { status: 400 }
      );
    }
     try {

    // Validate input

    console.log(userID);
    // const docRef = await addDoc(tradesCollectionRef, data);

    // console.log(docRef.id)
    const userRef = doc(usersCollection, userID);

    const tradesCollectionRef = collection(userRef, "trades");



    return NextResponse.json({
      message: `Document written with ID:`,
    });
  } catch (err) {
    console.log("Error adding document:", err);

    return NextResponse.json(
      { message: `Error adding document: ${err}` },
      { status: 500 }
    );
  }
}
