import React from "react";
import SkeletonElement from "./SkeletonElement";
import styles from "./Skeleton.module.css";

function SkeletonArticle() {
  return (
    <div className={styles.skeleton_wrapper}>
      <div className={styles.skeleton_article}>
        <SkeletonElement type="thumbnail" />
        <SkeletonElement type="title" />
        <SkeletonElement type="text" />
      </div>
    </div>
  );
}

export default SkeletonArticle;
