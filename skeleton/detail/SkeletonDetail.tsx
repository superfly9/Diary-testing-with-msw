import React from "react";
import SkeletonElement from "../SkeletonElement";
import styles from "./SkeletonDetail.module.css";
import SkeletonHeader from "../header/SkeletonHeader";

function SkeletonDetail() {
  return (
    <div className='full_screen'>
        <SkeletonHeader />
        <div className={styles.content_wrapper}>
          <SkeletonElement type="img" />
          <SkeletonElement type="title" />
          <SkeletonElement type="text" />
          <SkeletonElement type="text" />
        </div>
    </div>
  );
}

export default SkeletonDetail;
