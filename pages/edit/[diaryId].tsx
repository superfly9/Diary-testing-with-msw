import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import DiaryEditor from "../../components/DiaryEditor";
import Layout from "../../components/Layout";
import { database } from "../../firebase/config";
import { Diary } from "../../types/home";
import { collection, deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import Loading from "../../components/Loading";

function EditDiary() {
  const router = useRouter();
  const diaryId = router.query.diaryId as string;
  const deleteHandler = async ()=>{
    if (window.confirm('삭제하시겠습니까?')) {
      await deleteDoc(doc(database, "diaryLists", diaryId));
      router.replace('/')
    }
  }
  const [diary, loading ,error] = useCollection(collection(database,'diaryLists'));
  const [originData, setOriginData] = useState<Omit<Diary , 'id'> | null>(null)

  const getDocs = async ()=>{
    const docRef = doc(database , 'diaryLists', diaryId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const diary = {
          ...docSnap.data(),
          createdAt : new Date(docSnap.data().createdAt.seconds * 1000)
        }
        setOriginData(diary as Diary)
      } else {
        throw Error();
      }
    } catch (e) {
      new Promise<string>(resolve=>{
        window.alert('해당되는 일기가 없습니다');
        resolve('/')
      }).then((route)=>{
        router.replace(route)
      })
    }
  }

  useEffect(()=>{
    if(!loading && diary) {
      getDocs()
    }
  },[loading, diaryId])

  if (!originData || loading) return <Loading />
  if (error) router.back();

  return (
    <Layout
      text="일기 수정하기"
      LeftChild={<Button text="< 뒤로가기" onClick={() => router.back()} />}
      RightChild={<Button text="삭제하기" onClick={deleteHandler} />}
    >
      <DiaryEditor isEdit originData={originData} />
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