import React, { memo } from "react";
import { RegisterInputTypes } from "../../pages/signup";
import styles from "./SignUp.module.css";

interface Props {
  email: string;
  password: string;
  confirmPassword: string;
  inputChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: RegisterInputTypes
  ) => void;
  signUpSubmitHandler : (e:React.FormEvent<HTMLFormElement>)=>void;
}

function SignUp({
  email,
  password,
  confirmPassword,
  inputChangeHandler,
  signUpSubmitHandler
}: Props) {
  return (
    <div className={styles.container}>
      <h1>당신의 오늘 하루를 위해, 감정일기</h1>
      <em className={styles.subTitle}>나의 기분, 마음 모두 편하게 털어놓으세요</em>
      <form className={styles.form} onSubmit={signUpSubmitHandler}>
        <label htmlFor="email" className={styles.label}>Email</label>
        <input
          type="text"
          id="email"
          className={styles.input}
          value={email}
          onChange={(e) => inputChangeHandler(e, "userInputEmail")}
        />
        <label htmlFor="password" className={styles.label}>비밀번호</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onChange={(e) => inputChangeHandler(e, "userInputPassword")}
        />
        <label htmlFor="confirmPassword" className={styles.label}>비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => inputChangeHandler(e, "userConfirmPassword")}
        />
        <button type="submit" className={styles.button}>가입하기</button>
      </form>
    </div>
  );
}

export default memo(SignUp);
