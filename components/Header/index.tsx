import React, { ReactElement } from "react";
import styles from "./Header.module.css";

interface Props {
  LeftChild?: ReactElement;
  text: string;
  RightChild?: ReactElement;
}

function Header({ LeftChild, text, RightChild }: Props): ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.head_btn_left}>{LeftChild}</div>
      <div className={styles.head_txt}>{text}</div>
      <div className={styles.head_btn_right}>{RightChild}</div>
    </div>
  );
}

export default Header;
