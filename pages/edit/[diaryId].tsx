import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Button from "../../components/Button";
import DiaryEditor from "../../components/DiaryEditor";
import Layout from "../../components/Layout";
import { getDocumentRef } from "../../firebase/config";
import { Diary } from "../../types/home";
import { deleteDoc, getDoc } from 'firebase/firestore';
import Loading from "../../components/Loading";

function EditDiary() {
  const router = useRouter();
  const diaryId = useMemo(()=>router?.query?.diaryId as string, [router]);
  const [loading,setLoading] = useState(true);  
  const [originData, setOriginData] = useState<Omit<Diary , 'id'> | null>(null)

  const getDocs = useCallback(async ()=>{
    try {
      const documentRef = getDocumentRef('diaryLists', diaryId)
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        const diary = {
          ...docSnap.data(),
          createdAt : new Date(docSnap.data().createdAt.seconds * 1000)
        }
        setOriginData(diary as Diary)
      } 
    } catch (e) {
      console.log('[e]:',e)
      if (e instanceof Error) {
        new Promise<string>(resolve=>{
          window.alert('해당되는 일기가 없습니다');
          resolve('/')
        }).then((route)=>{
          router.replace(route)
        })
      }
    } finally {
      setLoading(false)
    }
  } , [diaryId]);
  
  useEffect(()=>{
    if (router.isReady) {
      getDocs()
    }
  },[diaryId])
  const deleteHandler = useCallback(async ()=> {
      if (window.confirm('삭제하시겠습니까?')) {
        const documentRef = getDocumentRef('diaryLists', diaryId)
        await deleteDoc(documentRef);
        router.replace('/')
      }},[]);
  
  if (!originData || loading) return <Loading />


  return (
    <Layout
      text="일기 수정하기"
      LeftChild={<Button text="< 뒤로가기" onClick={() => router.back()} />}
      RightChild={<Button text="삭제하기" onClick={deleteHandler} />}
    >
      <DiaryEditor isEdit originData={originData} diaryId={diaryId} />
    </Layout>
  );
}

export default EditDiary;

// export const getStaticPaths :GetStaticPaths = async ()=>{
//     const lists = await fetch('http://localhost:3000/diary/lists');
//     const data : Diary [] = await lists.json();
//     const paths = data.map(v=>({params: {diaryId  : (v.id)?.toString() }}))
//     return {
//         paths,
//         fallback:'blocking'
//     }
// }

// export const getStaticProps:GetStaticProps = async (context)=>{
//     const diaryId = context?.params?.diaryId;
//     const lists = await fetch('http://localhost:3000/diary/lists');
//     const data : Diary [] = await lists.json();
//     const detailData = data.filter(v=>v.id?.toString() === diaryId)[0];
//     return {
//         props : detailData
//     }
// }