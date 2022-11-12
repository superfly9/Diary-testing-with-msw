import React, { memo } from "react";
import { RegisterInputTypes } from "../../pages/signup";
import styles from "./SignUp.module.css";

interface Props {
  email: string;
  password: string;
  confirmPassword: string;
  error : {
    email?:string;
    password?:string;
    confirmPassword?:string;
  };
  inputChangeHandler: (
    e: React.ChangeEvent<HTMLInputElement>,
    name: RegisterInputTypes
  ) => void;
  inputBlurHanlder : (e :React.FocusEvent<HTMLInputElement>)=>void;
  signUpSubmitHandler : (e:React.FormEvent<HTMLFormElement>)=>void;
}

function SignUp({
  email,
  password,
  confirmPassword,
  error,
  inputChangeHandler,
  inputBlurHanlder,
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
          onBlur={inputBlurHanlder}
          onChange={(e) => inputChangeHandler(e, "userInputEmail")}
        />
        {error?.email ? <p className={styles.error}>{error.email}</p> : null}
        <label htmlFor="password" className={styles.label}>비밀번호</label>
        <input
          type="password"
          id="password"
          className={styles.input}
          value={password}
          onBlur={inputBlurHanlder}
          onChange={(e) => inputChangeHandler(e, "userInputPassword")}
        />
        {error?.password ? <p className={styles.error}>{error.password}</p> : null}
        <label htmlFor="confirmPassword" className={styles.label}>비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          className={styles.input}
          value={confirmPassword}
          onBlur={inputBlurHanlder}
          onChange={(e) => inputChangeHandler(e, "userConfirmPassword")}
        />
        {error?.confirmPassword ? <p className={styles.error}>{error.confirmPassword}</p> : null}
        <button type="submit" className={styles.button}>가입하기</button>
      </form>
    </div>
  );
}

export default memo(SignUp);
