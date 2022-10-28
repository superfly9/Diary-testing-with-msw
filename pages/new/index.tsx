import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import DiaryEditor from "../../components/DiaryEditor";
import Layout from "../../components/Layout";

function NewDiary() {
  const router = useRouter();
  return (
    <Layout
      text="새 일기쓰기"
      LeftChild={<Button text="< 뒤로가기" onClick={() => router.back()} />}
    >
      <DiaryEditor isEdit={false} />
    </Layout>
  );
}

export default NewDiary;
