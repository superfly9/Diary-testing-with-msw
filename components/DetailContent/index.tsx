import Image from "next/image";
import React from "react";
import { EMOTION_LIST } from "../../constants/emotion";
import styles from "./DetailContent.module.css";

interface Props {
  content:string;
  title:string;
  emotion:number;
}

function DetailContent({ content, title, emotion }: Props) {
  const { emotionName } = EMOTION_LIST.find((v) => v.value === emotion) || {
    emotionName: "감정을 알  수 없는 상태입니다.",
  };
  const IMAGE_URL = `/emotion_status/emotion${emotion}.png`;

  return (
    <>
      <div className={styles.emotion_wrapper}>
        <em className={styles.bold_txt}>오늘의 감정</em>
        <div className={[styles.emotion_content, styles[`status_${emotion}`]].join(' ')}>
          <Image src={IMAGE_URL} alt={title} width={140} height={140} />
          <span className={styles.emotion_txt}>{emotionName}</span>
        </div>
      </div>

      <div className={styles.content_wrapper}>
        <em className={styles.bold_txt}>오늘의 일기</em>
        <div className={styles.content}>
          <em>제목 : {title}</em>
          <p>{content}</p>
        </div>
      </div>
    </>
  );
}

export default DetailContent;
