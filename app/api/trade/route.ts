import { usersCollection } from "@/config/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
} from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userID = searchParams.get("id");

  if (!userID) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const userRef = doc(usersCollection, userID);
    const tradesCollectionRef = collection(userRef, "trades");

    // Fetch all trade documents for the user
    const querySnapshot = await getDocs(tradesCollectionRef);
    
    // Format the result to include document ID and data
    const formattedData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(formattedData);
  } catch (err) {
    // Provide more context in the error response
    return NextResponse.json(
      { error: `Failed to fetch user: ${err}` },
      { status: 500 }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const res = await req.json();
    const { userID, data } = res;

    // Validate input
    if (!userID || !data) {
      return NextResponse.json(
        { message: "Missing 'userID' or 'data' in request body." },
        { status: 400 }
      );
    }

    const userRef = doc(usersCollection, userID);

    const tradesCollectionRef = collection(userRef, "trades");

    const docRef = await addDoc(tradesCollectionRef, data);

    return NextResponse.json({
      message: `Document written with ID: ${docRef.id}`,
    });
  } catch (err) {
    console.log("Error adding document:", err);

    return NextResponse.json(
      { message: `Error adding document: ${err}` },
      { status: 500 }
    );
  }
}
