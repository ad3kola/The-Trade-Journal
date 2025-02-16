// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "adekola-trade-journal-07.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "adekola-trade-journal-07.firebasestorage.app",
  messagingSenderId: "149611085858",
  appId: "1:149611085858:web:2befa26e106925d85d8a7b",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dbStorage = getStorage(app);
