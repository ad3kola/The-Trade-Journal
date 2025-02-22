import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "social-media-app-9b39a.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: "social-media-app-9b39a.appspot.com",
  messagingSenderId: "243103921444",
  appId: "1:243103921444:web:233bf837c23bbd294f2fb1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const dbStorage = getStorage(app);

export const usersCollection = collection(db, "users")
