import React from "react";
import styles from "./Skeleton.module.css";

function DetailContentSkeleton() {
  return (
    <div className={styles.skeletonWrapper}>

      <div className={`${styles.common} ${styles.info}`}>
        <span className={`${styles.common} ${styles.bold_txt}`}></span>
        <div>
          <div className={styles.img}></div>
          <span className={`${styles.common} ${styles.info}`}></span>
        </div>
      </div>

      <div>
        <span className={`${styles.common} ${styles.bold_txt}`} />
        <div>
          <p className={`${styles.common} ${styles.content}`} />
        </div>
      </div>

      <div className={[styles.common, styles.btn_wrapper].join(" ")}>
        <button className={styles.btn}>
          <span />
          <span />
        </button>
      </div>
    </div>
  );
}

export default DetailContentSkeleton;
