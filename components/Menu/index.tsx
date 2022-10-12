import React, { ReactElement } from "react";
import styles from "./Menu.module.css";

interface Props {
  LeftChild: ReactElement;
  RightChild: ReactElement;
}

function Menu({ LeftChild, RightChild }: Props): ReactElement {
  return (
    <div className={styles.wrapper}>
      <div className={styles.left_col}>{LeftChild}</div>
      <div className={styles.right_col}>{RightChild}</div>
    </div>
  );
}

export default Menu;
