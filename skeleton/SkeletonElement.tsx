import React from 'react';
import styles from './Skeleton.module.css';

interface Props {
    type : 'text' | 'img' | 'title' | 'thumbnail'
}

function SkeletonElement({ type }: Props) {
const classes = `skeleton ${type}`
  return (
    <div className={styles[classes]} />
  )
}

export default SkeletonElement