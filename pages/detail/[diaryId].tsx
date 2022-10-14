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
