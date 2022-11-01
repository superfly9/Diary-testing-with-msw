import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { createDiaryList } from "../../firebase/config";
import Button from "../Button";
import EmotionItem from "../EmotionItem";
import styles from "./DiaryEditor.module.css";

const ORIGIN_DATA = {
  emotion: 3,
  createdAt: new Date(),
  content: "",
  title:""
};

interface Props {
  isEdit :boolean;
  originData? : {
    emotion : number;
    createdAt : Date;
    content : string;
  }
}
function DiaryEditor({ isEdit, originData = ORIGIN_DATA }: Props) {
  const router = useRouter();
  const { emotion , createdAt , content } = originData;
  const [todayEmotion, setTodayEmotion] = useState(emotion);
  const [publishingDate, setPublishingDate] = useState(new Date(createdAt).toISOString());
  const [description, setDescription] = useState(content);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const diaryCompleteConfirmHandler = () => {
    if (textAreaRef.current?.value.length === 0) {
      textAreaRef.current.focus();
      return;
    }
    if (isEdit) {
      if (window.confirm("일기를 수정하시겠습니까?")) {
        router.back();
      } 
    } else {
      if (window.confirm("일기를 발행하시겠습니까?")) {
        createDiaryList({
          emotion : todayEmotion,
          content : description,
          createdAt : new Date(publishingDate),
          id : Math.floor(Math.random()* 50)
        })
        router.back();
      }
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
      <textarea
        ref={textAreaRef}
        className={styles.textarea}
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />
      <div className={styles.btn_wrapper}>
        <Button text="취소하기" onClick={() => router.back()} />
        <Button
          text="작성완료"
          onClick={diaryCompleteConfirmHandler}
          type="positive"
        />
      </div>
    </div>
  );
}

export default DiaryEditor;
