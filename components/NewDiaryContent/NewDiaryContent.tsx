import React from "react";
import styles from "./NewDiaryContent.module.css";

function NewDiaryContent() {
  return (
    <div className={styles.wrapper}>
      <div>
        <em className={styles.tit}>오늘은 언제인가요?</em>
        <input type="date" />
      </div>
      <em>오늘의 감정</em>
    </div>
  );
}

export default NewDiaryContent;
