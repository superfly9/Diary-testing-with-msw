import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, DocumentData, DocumentReference, getFirestore, serverTimestamp, updateDoc } from "firebase/firestore";
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

type FireStoreDiary = Omit<Diary ,'id'>

export const getDocumentRef = (documentName : string, id: string )=>{
  const docRef:DocumentReference<DocumentData> = doc(database ,documentName, id);
  return docRef;
}

export const createDiaryList = async ({ content ,emotion ,createdAt}: FireStoreDiary)=>{
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

export const updateDiaryDetail = async (docRef:DocumentReference<DocumentData> , updateBody : FireStoreDiary)=>{
  try {
    await updateDoc(docRef, updateBody)
  } catch (e) {
    console.log('[update Error]:',e)
    alert('수정에 실패했습니다.\n잠시후 다시 시도해주세요')
  }
}