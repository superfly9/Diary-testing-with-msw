import React from 'react';
import SkeletonElement from '../SkeletonElement';
import styles from './SkeletonHeader.module.css';

function SkeletonHeader() {
  return (
    <div className={styles.wrapper}>
        <SkeletonElement type='btn_w100' />
        <SkeletonElement type='title' />
        <SkeletonElement type='btn_w100' />
    </div>
  )
}

export default SkeletonHeader