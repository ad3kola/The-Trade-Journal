import { usersCollection } from "@/config/firebase";
import { addDoc, collection, doc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET request not implemented." });
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

    const userRef = doc(usersCollection, userID)

    const tradesCollectionRef = collection(userRef, "trades")

    const docRef = await addDoc(tradesCollectionRef, data);


    return NextResponse.json({
      message: `Document written with ID: ${docRef.id}`,
    });

  } catch (err) {
    console.log("Error adding document:", err);

    return NextResponse.json(
      { message: `Error adding document: ${err}`},
      { status: 500 }
    );
  }
}
