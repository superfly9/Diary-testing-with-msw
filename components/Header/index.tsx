import React from "react";
import styles from "./Header.module.css";

interface Props {
  LeftChild: React.ReactElement;
  text: string;
  RightChild: React.ReactElement;
}

function Header({ LeftChild, text, RightChild }: Props): React.ReactElement {
  return (
    <div className={styles.container}>
      <div className={styles.head_btn_left}>{LeftChild}</div>
      <div className={styles.head_txt}>{text}</div>
      <div className={styles.head_btn_right}>{RightChild}</div>
    </div>
  );
}

export default Header;
