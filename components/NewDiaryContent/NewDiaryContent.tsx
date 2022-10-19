import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";
import EmotionItem from "../EmotionItem";
import styles from "./NewDiaryContent.module.css";

function NewDiaryContent() {
  const router = useRouter();
  const diaryCompleteConfirmHandler =()=>{
    if (window.confirm('일기를 발행하시겠습니까?')) {
      // 일기 저장 함수 추가 로직 추가 예정
      router.back()
    } 
  }
  return (
    <div className={styles.wrapper}>
      <div>
        <em className={styles.tit}>오늘은 언제인가요?</em>
        <input
          type="date"
          value={new Date().toISOString().slice(0, 10)}
          onChange={e=>console.log(e.target.value)}
          className={styles.date}
        />
      </div>
      <em className={styles.tit}>오늘의 감정</em>
      <EmotionItem />
      <em className={styles.tit}>오늘의 일기</em>
      <textarea 
        className={styles.textarea}
      /> 
      <div className={styles.btn_wrapper}>
        <Button text='취소하기' onClick={()=>router.back()} />
        <Button text='발행하기' onClick={diaryCompleteConfirmHandler} type='positive' />
      </div> 
    </div>
  );
}

export default NewDiaryContent;
