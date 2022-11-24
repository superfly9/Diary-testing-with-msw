import React from 'react';
import styles from './Skeleton.module.css';

function Layout() {
  return (
    <div className={styles.container}>
        <div className={styles.btn_left} />
        <div className={styles.center_txt} />
        <div className={styles.btn_right} />
    </div>
  )
}

export default Layout