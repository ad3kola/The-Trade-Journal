"use server";

import { dbStorage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function getImageString(file: File) {
  const uniqueFileName = `${file.name}_${crypto.randomUUID()}`;
  const storageRef = ref(dbStorage, `trades/${uniqueFileName}`);
  try {
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    console.error("Upload failed:", error);
    return "error";
  }
}
