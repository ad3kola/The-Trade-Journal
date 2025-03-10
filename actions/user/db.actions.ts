"use server";

import { usersCollection } from "@/config/firebase";
import { UserProps } from "@/lib/typings";
import { addDoc, getDocs, query, where } from "firebase/firestore";

export const validateUser = async (data: UserProps) => {
    try {

    const q = query(usersCollection, where("email", "==", data.email));
    const querySnap = await getDocs(q)

    if (!querySnap.empty) {        
        return;
    }

    const docRef = await addDoc(usersCollection, data);
    return { success: `User created successfully! ID: ${docRef.id}` };
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
};
