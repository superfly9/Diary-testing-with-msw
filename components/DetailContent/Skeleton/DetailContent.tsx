import React from "react";
import styles from "./Skeleton.module.css";

function DetailContent() {
  return (
    <div className={styles.wrapper}>

      <div className={`${styles.item} ${styles.info}`}>
        <span className={`${styles.skeleton_common} ${styles.bold_txt}`}></span>
        <div>
          <div />
          <span className={`${styles.skeleton_common} ${styles.info}`}></span>
        </div>
      </div>

      <div className={styles.item}>
        <span className={`${styles.skeleton_common} ${styles.bold_txt}`} />
        <p className={`${styles.skeleton_common} ${styles.content}`} />
      </div>

      <div className={styles.item}>
        <button className={[styles.btn, styles.skeleton_common].join(" ")}>
          <span />
          <span />
        </button>
      </div>
    </div>
  );
}

export default DetailContent;
