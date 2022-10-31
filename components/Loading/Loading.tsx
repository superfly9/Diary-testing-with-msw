import Image from 'next/image';
import React from 'react';
import styles from './Loading.module.css';

function Loading() {
  return (
    <div className={styles.container}>
        <Image src='/loading.gif' alt='Loading' width={480} height={270} />
    </div>
  )
}

export default Loading