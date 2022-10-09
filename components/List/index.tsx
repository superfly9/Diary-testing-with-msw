import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Diary } from '../../types/home';
import Button from '../Button';
import styles from './List.module.css';


function List({createdAt,image,name,title,id}: Diary):React.ReactElement {
    const router = useRouter();
    const goToDetailDiary = ()=>router.push(`/detail/${id}`)
    return (
    <li>
        <div className={styles.img_wrapper}>
            <Image src={image} alt={name} width={60} height={60} />
        </div>
        <div className={styles.info_wrapper}>
            <span className={styles.createdAt}>{createdAt}</span>
            <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.btn_wrapper}>
            <Button text='수정하기' onClick={goToDetailDiary} />
        </div>
    </li>
  )
}

export default List