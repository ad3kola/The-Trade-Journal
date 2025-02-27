"use client";

import { auth } from "@/config/firebase";
import { UserProps } from "@/lib/typings";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export const signInUser = async (data: UserProps) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    return { uid: userCredential.user.uid }; // Return user ID as an object
  } catch (error) {
    return { error: getAuthErrorMessage(error) }; // Return a user-friendly error message
  }
};

export const signUpUser = async (data: UserProps) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: data.name });
    return { uid: user.uid }; // Return user ID as an object
  } catch (error) {
    return { error: getAuthErrorMessage(error) }; // Return a user-friendly error message
  }
};

// Function to map Firebase Auth errors to user-friendly messages

const getAuthErrorMessage = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already registered. Please sign in.";
      case "auth/invalid-credential":
        return "User does not exist, create one";
    case "auth/invalid-email":
      return "Invalid email address. Please check and try again.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/weak-password":
      return "Password is too weak. Choose a stronger password.";
    default:
      return "Something went wrong. Please try again.";
  }
};
