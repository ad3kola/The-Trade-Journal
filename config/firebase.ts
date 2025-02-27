import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {collection, getFirestore} from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "social-media-app-9b39a.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "social-media-app-9b39a.appspot.com",
  messagingSenderId: "243103921444",
  appId: "1:243103921444:web:233bf837c23bbd294f2fb1"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const dbStorage = getStorage(app);
export const auth = getAuth(app)
export const usersCollection = collection(db, "users")
