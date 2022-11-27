import React from "react";
import styles from "./Skeleton.module.css";

interface Props {
  type:
    | "text"
    | "img"
    | "title"
    | "thumbnail"
    | "flex"
    | "grid"
    | "btn"
    | "btn_w25"
    | "btn_w50"
    | "btn_w100";
}

function SkeletonElement({ type }: Props) {
  // styles => css모듈의 파일 이름을 따라감
  const classes = `${styles.skeleton} ${styles[type]}`;
  return <div className={classes} />;
}

export default SkeletonElement;
