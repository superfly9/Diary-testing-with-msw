import React from "react";
import styles from "./button.module.css";

interface Props {
  text: string;
  className: string;
  onClick: () => void;
}

function Button({ text, className, onClick }: Props): React.ReactElement {
  return (
    <button
      className={`${styles.default} ${styles.mybutton}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
