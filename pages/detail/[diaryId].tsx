import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import DetailContent from "../../components/DetailContent";
import Layout from "../../components/Layout";

function DetailDiary() {
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
      <DetailContent />
    </Layout>
  );
}

export default DetailDiary;

export const getServerSideProps : GetServerSideProps = async (context)=> {
  const diaryId= context?.params?.diaryId;
  // error - TypeError: Only absolute URLs are supported
  let result = {}
  try {
    const response =await fetch(`http://localhost:3000/diary/detail/${diaryId}`);
    result = await response.json();
  } catch (e) {
    console.log('[e]:',e)
  }
  return {
    props : result
  }
}