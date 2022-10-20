import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import Button from "../Button";
import EmotionItem from "../EmotionItem";
import styles from "./DiaryEditor.module.css";

const defaultProps = {
  isEdit: false,
  emotion : 1,
  createdAt : new Date().toISOString(),
  content : ''
};

function DiaryEditor({ isEdit , emotion , createdAt, content }: typeof defaultProps) {
  const router = useRouter();
  const [todayEmotion, setTodayEmotion] = useState(emotion);
  const [publishingDate, setPublishingDate] = useState(createdAt);
  const [description,setDescription] = useState(content)
  const textAreaRef = useRef<HTMLTextAreaElement>(null); // 이 부분 주의 깊게

  const diaryCompleteConfirmHandler = () => {
    if (textAreaRef.current?.value.length === 0) {
      textAreaRef.current.focus();
      return;
    }
    if (window.confirm("일기를 발행하시겠습니까?")) {
      // 일기 저장 로직 추가 예정
      router.back();
    }
  };
  const emotionClickHandler = (emotion: number) => setTodayEmotion(emotion);
  return (
    <div className={styles.wrapper}>
      <div>
        <em className={styles.tit}>오늘은 언제인가요?</em>
        <input
          type="date"
          value={publishingDate.slice(0, 10)}
          onChange={(e) => setPublishingDate(e.target.value)}
          className={styles.date}
        />
      </div>
      <em className={styles.tit}>오늘의 감정</em>
      <EmotionItem
        todayEmotion={todayEmotion}
        emotionClickHandler={emotionClickHandler}
      />
      <em className={styles.tit}>오늘의 일기</em>
      <textarea ref={textAreaRef} className={styles.textarea} onChange={e=>setDescription(e.target.value)} value={description} />
      <div className={styles.btn_wrapper}>
        <Button text="취소하기" onClick={() => router.back()} />
        <Button
          text="발행하기"
          onClick={diaryCompleteConfirmHandler}
          type="positive"
        />
      </div>
    </div>
  );
}

export default DiaryEditor;
