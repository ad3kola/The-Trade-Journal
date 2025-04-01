'use server'

import { usersCollection } from "@/config/firebase";
import { currentUser } from "@clerk/nextjs/server";
import { doc, setDoc } from "firebase/firestore";

export const validateUser = async (id: string) => {
  const user = await currentUser();
  if (user) {
    try {
      await setDoc(
        doc(usersCollection, id),
        {
          username: user?.fullName,
          email: user?.emailAddresses[0].emailAddress,
          image: user?.imageUrl,
        },
        { merge: true }
      );
    } catch {
      console.log("Error creating user in Firebase");
    }
  }
};
