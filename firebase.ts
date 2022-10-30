import { initializeApp } from "firebase/app";
import { addDoc, collection, getFirestore, serverTimestamp } from "firebase/firestore";
import { Diary } from "./types/home";

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


export const createDiaryList = async ({ id  ,title, content ,emotion ,createdAt}: Diary)=>{
  try {
    const diaryColRef = collection(database, 'diaryLists');
    const docRef = await addDoc(diaryColRef , {
      // created : serverTimestamp(),
      createdAt,
      id,
      title,
      content,
      emotion,
    })
    console.log('[Doc Ref Id]:',docRef.id)
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}