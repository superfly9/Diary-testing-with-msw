import React from "react";
import styles from "./button.module.css";

interface Props {
  text: string;
  type: 'default'|'positive' | 'negative';
  onClick: () => void;
}
const defaultProps = {
  type : 'default'
}

function Button({ text, type, onClick }: Props): React.ReactElement {
  const btnType = ['positive','negative'].includes(type) ? type : 'default';
  return (
    <button
      className={[styles.myButton, styles[`myButton_${btnType}`]].join(' ')}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;


Button.defaultProps = defaultProps;