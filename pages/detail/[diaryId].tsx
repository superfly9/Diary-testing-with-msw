import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import DetailContent from "../../components/DetailContent";
import Layout from "../../components/Layout";
import { Diary } from "../../types/home";
import { useCollection } from 'react-firebase-hooks/firestore';
import { database } from "../../firebase";
import { collection } from 'firebase/firestore';
import Loading from "../../components/Loading";

function DetailDiary() {
  const router = useRouter();
  const diaryId = router?.query.diaryId as string;

  const [diary, loading ,error] = useCollection(collection(database,'diaryLists'),{});
  const [detailContent,setDetailContent] = useState<Diary>({createdAt:new Date(),content:'',emotion:3, id:Number(diaryId)})
  const { createdAt, content, emotion } = detailContent;

  useEffect(()=>{
    if (!loading && diary) {
      const detailDiary = diary.docs.find(doc=>{
        const data = {...doc.data()}
        return Number(data.id) === Number(diaryId)
      })
      if (detailDiary) {
        const result = {...detailDiary.data(), createdAt : new Date(detailDiary.data().createdAt.seconds * 1000)}
        setDetailContent(result as Diary)
      } else {
        new Promise<string>(resolve=>{
          window.alert('해당되는 일기가 없습니다');
          resolve('/')
        }).then((route)=>{
          router.replace(route)
        })
      }
    }
  },[diaryId, loading])
  const goToPrev = () => router.back();
  const goToEdit = () => router.push(`/edit/${diaryId}`);
  const headerTxt = `${new Date(createdAt).getFullYear()}년 
  ${new Date(createdAt).getMonth() + 1}월 ${new Date(createdAt).getDate()}일`;

  if (loading) return <Loading />
  if (error) return <p>잠시 후 다시 시도해주세요!</p>

  return (
    <Layout
      text={headerTxt}
      LeftChild={<Button text="< 뒤로가기" onClick={goToPrev} />}
      RightChild={<Button text="수정하기" onClick={goToEdit} />}
    >
      <DetailContent
        content={content}
        emotion={emotion}
      />
    </Layout>
  );
}

export default DetailDiary;
