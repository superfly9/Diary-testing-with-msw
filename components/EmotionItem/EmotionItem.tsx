import Image from 'next/image'
import React from 'react'
import styles from './EmotionItem.module.css';
import { EMOTION_LIST } from '../../constants/emotion_list';

interface Props {
  todayEmotion : number;
  emotionClickHandler : (todayEmotion:number) => void;
}

function EmotionItem({todayEmotion, emotionClickHandler} : Props) {
  return (
    <ul className={styles.wrapper}>
      {EMOTION_LIST.map(({value ,emotionName})=>{
        const isSelected = todayEmotion === value;
        const emotion_class = isSelected ? `emotion_on_${value}` : `emotion_off`;
        const imageURL = `/emotion_status/emotion${value}.png`;
        return (<li key={value} className={[styles.emotion ,styles[emotion_class]].join(' ')}
          onClick={()=>emotionClickHandler(value)}
        >
          <Image src={imageURL} width={60} height={60} alt={emotionName} />
          <span>{emotionName}</span>
        </li>)
      }
      )}
    </ul>
  )
}

export default EmotionItem