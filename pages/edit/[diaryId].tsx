import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import Button from "../../components/Button";
import DiaryEditor from "../../components/DiaryEditor";
import Layout from "../../components/Layout";
import { Diary } from "../../types/home";

function EditDiary({createdAt, content, emotion} : Diary ) {
  const router = useRouter();
  const deleteHandler = ()=>{
    if (window.confirm('삭제하시겠습니까?')) {
      //  로직 추가 예정
      console.log('삭제');
      router.replace('/')
    }
  }
  const originData = {createdAt, content, emotion}
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

export const getStaticPaths :GetStaticPaths = async ()=>{
    const lists = await fetch('http://localhost:3000/diary/lists');
    const data : Diary [] = await lists.json();
    const paths = data.map(v=>({params: {diaryId  : (v.id)?.toString() }}))
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
    return {
        props : detailData
    }
}