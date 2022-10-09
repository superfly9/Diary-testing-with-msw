import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ReactElement } from 'react';
import { Diary } from '../../types/home';
import Button from '../Button';
import styles from './ListItem.module.css';


function ListItem({createdAt,image,name,title,id}: Diary):ReactElement {
    const router = useRouter();
    const goToEditDiary = ()=>router.push(`/edit/${id}`)
    return (
        <>
    <li className={styles.container}>
        <div className={styles.img_wrapper}>
            <Image src={image} alt={name} width={60} height={60} />
        </div>
        <div className={styles.info_wrapper}>
            <span className={styles.createdAt}>{createdAt}</span>
            <span className={styles.title}>{title}</span>
        </div>
        <div className={styles.btn_wrapper}>
            <Button text='수정하기' onClick={goToEditDiary} />
        </div>
    </li>
        </>
  )
}

export default ListItem