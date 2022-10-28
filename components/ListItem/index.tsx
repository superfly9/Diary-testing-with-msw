import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Diary } from "../../types/home";
import Button from "../Button";
import styles from "./ListItem.module.css";

//imageURL: public폴더 안에서의 경로만 작성, next에서 public폴더 기본으로 참조함
function ListItem({
  createdAt,
  emotion: todayEmotion,
  content,
  title,
  id,
}: Diary): ReactElement {
  const router = useRouter();
  const goToEditDiary = () => router.push(`/edit/${id}`);
  const goToDetailDiary = () => router.push(`/detail/${id}`);
  const imageURL = `/emotion_status/emotion${todayEmotion}.png`;
  return (
    <div className={styles.container}>
      <div 
        className={[styles.img_wrapper, styles[`emotion${todayEmotion}`]].join(" ")}
        onClick={goToDetailDiary}
      >
        <Image src={imageURL} alt={content} width={60} height={80} />
      </div>
      <div className={styles.info} onClick={goToDetailDiary}>
        <span className={styles.createdAt}>{new Date(createdAt).toLocaleDateString()}</span>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.btn_wrapper}>
        <Button text="수정하기" onClick={goToEditDiary} />
      </div>
    </div>
  );
}

export default ListItem;
