import Image from "next/image";
import React, { MouseEvent, useState } from "react";
import styles from "./DetailContent.module.css";
import { EMOTION_LIST } from "../../constants/emotion_list";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'

interface Props {
  loading: boolean;
  content: string;
  emotion: number;
  likeCount: number;
}
const LIKE_UNIT = 10000;

function DetailContent({ loading, content, emotion, likeCount }: Props) {
  const { emotionName } = EMOTION_LIST.find((v) => v.value === emotion) || {
    emotionName: "감정을 알  수 없는 상태입니다.",
  };
  const IMAGE_URL = `/emotion_status/emotion${emotion}.png`;

  const [like, setLike] = useState(false);
  const [dislike, setDisLike] = useState(false);

  const dividedLikeByUnit =
    likeCount < 10000 ? likeCount : `${(likeCount / LIKE_UNIT).toFixed(1)}만`;

  const likeOrDisLikeClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.dataset.type;
    if (type === "like") {
      setLike((v) => !v);
      setDisLike(false);
    }
    if (type === "dislike") {
      setDisLike((v) => !v);
      setLike(false);
    }
  };
  const likeClassName = [
    styles.btn,
    styles.like,
    like ? styles.active : "",
  ].join(" ");
  const disLikeClassName = [
    styles.btn,
    styles.dislike,
    dislike ? styles.active : "",
  ].join(" ");

  return (
    <>
      <div className={styles.emotion_wrapper}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <em className={styles.bold_txt}>오늘의 감정</em>
            <div
              className={[
                styles.emotion_content,
                styles[`status_${emotion}`],
              ].join(" ")}
            >
              <Image
                src={IMAGE_URL}
                alt={`감정_${emotion}`}
                width={140}
                height={140}
              />
              <span className={styles.emotion_txt}>{emotionName}</span>
            </div>
          </>
        )}
      </div>

      <div className={styles.content_wrapper}>
        {loading ? (
          <Skeleton />
        ) : (
          <>
            <em className={styles.bold_txt}>오늘의 일기</em>
            <div className={styles.content}>
              <p>{content}</p>
            </div>
          </>
        )}
      </div>
      <div className={styles.btn_wrapper}>
          {loading ? <Skeleton /> :
          <>
            <button
              data-type="like"
              onClick={likeOrDisLikeClickHandler}
              className={likeClassName}
            >
              <span className={styles.count}>{dividedLikeByUnit}</span>
              <span className={styles.blind}>좋아요 {dividedLikeByUnit}</span>
            </button>
            <button
              data-type="dislike"
              onClick={likeOrDisLikeClickHandler}
              className={disLikeClassName}
            >
              <span className={styles.blind}>싫어요</span>
            </button>
          </>}
      </div>
    </>
  );
}

export default DetailContent;
