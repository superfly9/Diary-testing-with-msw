import Image from "next/image";
import React from "react";
import { Diary } from "../../types/home";
import styles from "./DetailContent.module.css";

const EMOTION_LIST = [
  { value: 1, emotionName: "기부니가 최고" },
  { value: 2, emotionName: "그레잇" },
  { value: 3, emotionName: "쏘-쏘" },
  { value: 4, emotionName: "살짝 꾸리꾸리" },
  { value: 5, emotionName: "기분이 안 좋아" },
];

function DetailContent({ content, title, createdAt, emotion }: Diary) {
  const { emotionName } = EMOTION_LIST.find((v) => v.value === emotion) || {
    emotionName: "감정을 알  수 없는 상태입니다.",
  };
  const IMAGE_URL = `/emotion_status/emotion${emotion}.png`;
  return (
    <>
      <div className={styles.emotion_wrapper}>
        <em className={styles.bold_txt}>오늘의 감정</em>
        <div className={styles.emotion_content}>
          <Image src={IMAGE_URL} alt={title} width={140} height={140} />
          <span className={styles.emotion_txt}>{emotionName}</span>
        </div>
      </div>

      <div className={styles.content_wrapper}>
        <em className={styles.bold_txt}>오늘의 일기</em>
        <div className={styles.content}>
          <em>{title}</em>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}

export default DetailContent;
