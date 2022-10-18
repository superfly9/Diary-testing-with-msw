import Image from 'next/image'
import React from 'react'
import { EMOTION_LIST } from '../../constants/emotion'
import styles from './EmotionItem.module.css';

function EmotionItem() {
  const emotionValue =(val : number)=>`emotion_${val}`
  return (
    <ul className={styles.wrapper}>
      {EMOTION_LIST.map(({value ,emotionName , url})=>
        <li key={value} className={[styles.emotion ,styles[emotionValue(value)]].join(' ')}>
          <Image src={url} width={60} height={60} alt={emotionName} />
          <span>{emotionName}</span>
        </li>
      )}
    </ul>
  )
}

export default EmotionItem