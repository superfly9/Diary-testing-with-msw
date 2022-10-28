import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import DetailContent from "../../components/DetailContent";
import Layout from "../../components/Layout";
import { Diary } from "../../types/home";

function DetailDiary({ content, title, createdAt, emotion }: Diary) {
  const router = useRouter();
  const diaryId = router?.query.diaryId;
  const goToPrev = () => router.back();
  const goToEdit = () => router.push(`/edit/${diaryId}`);
  const headerTxt = `${new Date(createdAt).getFullYear()}년 
  ${new Date(createdAt).getMonth() + 1}월 ${new Date(createdAt).getDate()}일`;

  return (
    <Layout
      text={headerTxt}
      LeftChild={<Button text="< 뒤로가기" onClick={goToPrev} />}
      RightChild={<Button text="수정하기" onClick={goToEdit} />}
    >
      <DetailContent
        content={content}
        title={title}
        emotion={emotion}
      />
    </Layout>
  );
}

export default DetailDiary;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const diaryId = context?.params?.diaryId;
  // error - TypeError: Only absolute URLs are supported
  let diary = {};
  try {
    const response = await fetch(
      `http://localhost:3000/diary/detail/${diaryId}`
    );
    diary = await response.json();
  } catch (e) {
    console.log("[e]:", e);
  }
  return {
    props: diary,
  };
};
