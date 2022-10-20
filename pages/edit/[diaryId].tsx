import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import DiaryEditor from "../../components/DiaryEditor";
import Layout from "../../components/Layout";
import { Diary } from "../../types/home";

function EditDiary({createdAt, content, emotion} : Diary ) {
  const router = useRouter();
  
  return (
    <Layout
      text="일기 수정하기"
      LeftChild={<Button text="< 뒤로가기" onClick={() => router.back()} />}
    >
      <DiaryEditor isEdit createdAt={createdAt} content={content} emotion={emotion} />
    </Layout>
  );
}

export default EditDiary;

export const getStaticPaths :GetStaticPaths = async (context)=>{
    const lists = await fetch('http://localhost:3000/diary/lists');
    const data : Diary [] = await lists.json();
    const paths = data.map(v=>({params: {diaryId  : (v.id)?.toString() }}))
    console.log('[path]:',paths)
    return {
        paths,
        fallback:'blocking'
    }
}

export const getStaticProps:GetStaticProps = async (context)=>{
    const diaryId = context?.params?.diaryId;
    const lists = await fetch('http://localhost:3000/diary/lists');
    const data : Diary [] = await lists.json();
    const detailData = data.filter(v=>v.id?.toString() === diaryId)[0];
    console.log('[detailData]:',detailData)
    return {
        props : detailData
    }
}