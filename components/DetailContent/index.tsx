import Image from "next/image";
import React from "react";
import styles from "./DetailContent.module.css";

function DetailContent() {
  return (
    <div className={styles.wrapper}>
      <em className={styles.title}>오늘의 감정</em>
      <div>
        <span>그럭저럭</span>
      </div>
      <em className={styles.title}>오늘의 일기</em>
      <div className="diary_content_wrapper">
        <p>kkkk</p>
      </div>
    </div>
  );
}

export default DetailContent;