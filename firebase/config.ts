import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { Diary } from "../types/home";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);


export const createDiaryList = async ({ content ,emotion ,createdAt}: Diary)=>{
  console.log('[createdAt]:',createdAt)
  //[createdAt]: Wed Nov 02 2022 09:00:00 GMT+0900 (한국 표준시)
  try {
    const diaryColRef = collection(database, 'diaryLists');
    const docRef = await addDoc(diaryColRef , {
      createdAt,
      content,
      emotion,
    })
    console.log('[Doc Ref Id]:',docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}