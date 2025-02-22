import { db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ message: "GET request not implemented." });
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json(); // Corrected from res.json()
    const docRef = await addDoc(collection(db, "trades"), data);
    console.log("Document ID:", docRef.id);

    return NextResponse.json({
      message: `Document written with ID: ${docRef.id}`,
    });
  } catch (err) {
    console.error("Error adding document:", err);

    return NextResponse.json(
      { message: `Error adding document: ${err}` },
      { status: 500 }
    );
  }
}
