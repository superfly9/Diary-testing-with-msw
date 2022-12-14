import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import DetailContent from "../../components/DetailContent";
import Layout from "../../components/Layout";
import { Diary } from "../../types/home";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, doc, getDoc } from "firebase/firestore";
import { database } from "../../firebase/config";

const ERROR_REMAINING_TIME = 3000;
const CONTENT_DEFAULT = { createdAt : new Date(), content:'', emotion:3,likeCount:0}

function DetailDiary() {
  const router = useRouter();
  const diaryId = router?.query.diaryId as string;

  const [diary, loading, error] = useCollection(
    collection(database, "diaryLists"),
    {}
  );
  const [detailContent, setDetailContent] = useState<Omit<Diary, "id"> | null>(null);

  const getDocs = async () => {
    const docRef = doc(database, "diaryLists", diaryId);
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const diary = {
          ...docSnap.data(),
          createdAt: new Date(docSnap.data().createdAt.seconds * 1000),
        };
        setDetailContent(diary as Diary);
      } else {
        throw Error();
      }
    } catch (e) {
      new Promise<string>((resolve) => {
        window.alert("해당되는 일기가 없습니다");
        resolve("/");
      }).then((route) => {
        router.replace(route);
      });
    }
  };

  useEffect(() => {
    if (!loading) {
      getDocs();
    }
  }, [loading, diaryId]);
  const goToPrev = () => router.back();
  const goToEdit = () => router.push(`/edit/${diaryId}`);

  if (error) {
  setTimeout(()=>{
    goToPrev()
  },ERROR_REMAINING_TIME)
  return (
    <>
      <p>잠시 후 다시 시도해주세요!</p>
      <span>3초 뒤 홈으로 이동합니다</span>
    </>
  )
}

  const { createdAt, content, emotion, likeCount } = detailContent || CONTENT_DEFAULT
  const headerTxt = `${new Date(createdAt).getFullYear()}년 
  ${new Date(createdAt).getMonth() + 1}월 ${new Date(createdAt).getDate()}일`;

  return (
    <Layout
      text={headerTxt}
      LeftChild={<Button text="< 뒤로가기" onClick={goToPrev} />}
      RightChild={<Button text="수정하기" onClick={goToEdit} />}
    >
      <DetailContent
        loading
        content={content}
        emotion={emotion}
        likeCount={likeCount}
      />
    </Layout>
  );
}

export default DetailDiary;
