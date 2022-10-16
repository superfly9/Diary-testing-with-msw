import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import DetailContent from "../../components/DetailContent";
import Layout from "../../components/Layout";
import { Diary } from "../../types/home";

function DetailDiary({content, title, createdAt, emotion} : Diary) {
  const router = useRouter();
  const diaryId = router?.query.diaryId;
  const goToPrev = () => router.back();
  const goToEdit = () => router.push(`/diary/edit/${diaryId}`);
  return (
    <Layout
      text="10월"
      LeftChild={<Button text="< 뒤로가기" onClick={goToPrev} />}
      RightChild={<Button text="수정하기" onClick={goToEdit} />}
    >
      <DetailContent 
        content={content}
        title={title}
        createdAt={createdAt}
        emotion={emotion}
       />
    </Layout>
  );
}

export default DetailDiary;

export const getServerSideProps : GetServerSideProps = async (context)=> {
  const diaryId= context?.params?.diaryId;
  // error - TypeError: Only absolute URLs are supported
  let diary = {}
  try {
    const response =await fetch(`http://localhost:3000/diary/detail/${diaryId}`);
    diary = await response.json();
    console.log('[res]:',diary)
  } catch (e) {
    console.log('[e]:',e)
  }
  return {
    props : diary
  }
}