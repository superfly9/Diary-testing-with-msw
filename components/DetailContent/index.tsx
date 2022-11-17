import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import styles from "./DetailContent.module.css";
import { EMOTION_LIST } from '../../constants/emotion_list';

interface Props {
  content:string;
  emotion:number;
  likeCount: number;
}

function DetailContent({ content, emotion,likeCount }: Props) {
  const { emotionName } = EMOTION_LIST.find((v) => v.value === emotion) || {
    emotionName: "감정을 알  수 없는 상태입니다.",
  };
  const IMAGE_URL = `/emotion_status/emotion${emotion}.png`;

  const [like,setLike] = useState(false);
  const [dislike,setDisLike] = useState(false);

  const likeOrDisLikeClickHandler = (e:MouseEvent<HTMLButtonElement>)=>{
    if (!(e.target instanceof HTMLButtonElement)) {
      return;
    }
    const type = e.currentTarget.dataset.type;
    if (type === 'like') setLike(v=>!v)
    if (type === 'dislike') setDisLike(v=>!v)
  }

  return (
    <>
      <div className={styles.emotion_wrapper}>
        <em className={styles.bold_txt}>오늘의 감정</em>
        <div className={[styles.emotion_content, styles[`status_${emotion}`]].join(' ')}>
          <Image src={IMAGE_URL} alt={`감정_${emotion}`} width={140} height={140} />
          <span className={styles.emotion_txt}>{emotionName}</span>
        </div>
      </div>

      <div className={styles.content_wrapper}>
        <em className={styles.bold_txt}>오늘의 일기</em>
        <div className={styles.content}>
          <p>{content}</p>
        </div>
      </div>
      <div className={styles.btn_wrapper}>
          <button data-type='like' onClick={likeOrDisLikeClickHandler} className={`${styles.btn} ${styles.like} ${like?styles.active:''}`}>좋아요 {like}</button>
          <button data-type='dislike' onClick={likeOrDisLikeClickHandler} className={`${styles.btn} ${styles.dislike} ${dislike? styles.active:''}`}>싫어요</button>
      </div>
    </>
  );
}

export default DetailContent;
