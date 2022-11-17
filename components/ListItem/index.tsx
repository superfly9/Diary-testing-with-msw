import Image from "next/image";
import { useRouter } from "next/router";
import React, { ReactElement, useCallback, useState } from "react";
import { Diary } from "../../types/home";
import Button from "../Button";
import styles from "./ListItem.module.css";

//imageURL: public폴더 안에서의 경로만 작성, next에서 public폴더 기본으로 참조함

type bookMarkIds = string [];

function ListItem({
  createdAt,
  emotion: todayEmotion,
  content,
  id,
}: Diary): ReactElement {
  const router = useRouter();
  const [activeBookMark,setActiveBookMark] = useState(false);
  const goToEditDiary = () => router.push(`/edit/${id}`);
  const goToDetailDiary = () => router.push(`/detail/${id}`);
  const imageURL = `/emotion_status/emotion${todayEmotion}.png`;
  const toggleBookMark = useCallback((id:string)=>{
    const bookMarkIds:bookMarkIds = JSON.parse(localStorage.getItem('bookMarkIds') || '[]');
    if (bookMarkIds.indexOf(id) !== -1) {
      bookMarkIds.splice(bookMarkIds.indexOf(id),1);
    } else {
      bookMarkIds.push(id);
    }
    setActiveBookMark(bool=>!bool);
    localStorage.setItem('bookMarkIds',JSON.stringify(bookMarkIds))
  },[])
  return (
    <div className={styles.container}>
      <div 
        className={[styles.img_wrapper, styles[`emotion${todayEmotion}`]].join(" ")}
        onClick={goToDetailDiary}
      >
        <Image src={imageURL} alt={content.slice(0,10)} width={60} height={80} />
      </div>
      <div className={styles.info} onClick={goToDetailDiary}>
        <span className={styles.createdAt}>{new Date(createdAt).toLocaleDateString()}</span>
        <span className={styles.content}>{content}</span>
      </div>
      <div className={styles.btn_wrapper}>
        <Button text="수정하기" onClick={goToEditDiary} />
        <button className={`${styles.bookMark} ${activeBookMark&&styles.active}`} onClick={()=>toggleBookMark(id)}>북마크 토글</button>
      </div>
    </div>
  );
}

export default ListItem;
