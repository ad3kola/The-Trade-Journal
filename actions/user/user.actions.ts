"use server";

import { usersCollection } from "@/config/firebase";
import { UserProps } from "@/lib/typings";
import { addDoc, getDocs, query, where } from "firebase/firestore";

export const createUser = async (data: UserProps) => {
  try {
    // Check if user exists in Firebase
    const q = query(usersCollection, where("email", "==", data.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const existingUser = querySnapshot.docs[0];
      console.log("User exists: ", existingUser.id);
      return existingUser.id;
    }


    const docRef = await addDoc(usersCollection, {
      ...data,
      // firebaseDocId: user.id
    });

    return docRef.id;
  } catch (err) {
    console.error("Error creating user:", err);
    throw new Error("Failed to create user.");
  }
};
