import { usersCollection } from "@/config/firebase";
import { UserProps } from "@/lib/typings";
import { addDoc, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // Extract the user ID from the query string
    const { searchParams } = new URL(req.url); 
    const userId = searchParams.get("id");
  
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
  
    try {
      const docRef = doc(usersCollection, userId);
      const docSnapshot = await getDoc(docRef);
  
      if (!docSnapshot.exists()) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
  
      return NextResponse.json(docSnapshot.data());
    } catch (err) {
      // Provide more context in the error response
      return NextResponse.json({ error: `Failed to fetch user: ${err}` }, { status: 500 });
    }
  }
  
export async function POST( req: NextRequest ) {
  const data = await req.json();

  const q = query(usersCollection, where("email", "==", data.email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const existingUser = querySnapshot.docs[0].data();
    const userID = querySnapshot.docs[0].id;
    return NextResponse.json({ ...existingUser, id: userID });
  }

  const userData: UserProps = {
    email: data.email,
    fullName: data.fullName,
    phone: data.phone,
  };

  try {
    const docRef = await addDoc(usersCollection, userData);
    return NextResponse.json({ ...userData, id: docRef.id });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
}
