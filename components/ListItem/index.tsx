import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";
import { Diary } from "../../types/home";
import Button from "../Button";
import styles from "./ListItem.module.css";

//imageURL: public폴더 안에서의 경로만 작성, next에서 public폴더 기본으로 참조함
function ListItem({ createdAt ,emotion,  content, title, id }: Diary): ReactElement {
  const router = useRouter();
  const goToEditDiary = () => router.push(`/edit/${id}`);
  const imageURL = `/emotion_status/emotion${emotion}.png`
  const additionalClass =`${styles.emotion}${emotion}`;

  return (
    <>
      <Link href={`/detail/${id}`}>
        <div className={styles.container}>
          <div className={`${styles.img_wrapper} ${additionalClass}`}>
            <Image src={imageURL} alt={content} width={60} height={60} />
          </div>
          <div className={styles.info_wrapper}>
            <span className={styles.createdAt}>{createdAt}</span>
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.btn_wrapper}>
            <Button text="수정하기" onClick={goToEditDiary} />
          </div>
        </div>
      </Link>
    </>
  );
}

export default ListItem;
