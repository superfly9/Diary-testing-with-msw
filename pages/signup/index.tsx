import React, { useCallback, useReducer } from "react";
import Loading from "../../components/Loading";
import SignUp from "../../components/SignUp";
import useFireBase from "../../hooks/useFireBaseSignUp";
import { emailRegex, passwordRegex } from "../../util/regex";

type State = {
  email: string;
  password: string;
  confirmPassword: string;
  isLoading: boolean;
  error: {
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
};

type Action = {
  payload: string;
  type:
    | "userInputEmail"
    | "userInputPassword"
    | "userConfirmPassword"
    | "emailCheck"
    | "pwCheck"
    | "confirmPwCheck";
};

export type RegisterInputTypes = Action["type"];

//리팩토링 해보기, 이 안에서 로직을 처리해도 될까? 리듀서는 받은 상태값을 저장하기만 해야하나, 로직은 밖에서 처리하고?
function RegisterReducer(state: State, action: Action): State {
  switch (action.type) {
    case "userInputEmail":
      return { ...state, email: action.payload };
    case "userInputPassword":
      return { ...state, password: action.payload };
    case "userConfirmPassword":
      return { ...state, confirmPassword: action.payload };
    case "emailCheck":
      return { ...state, error: { ...state.error, email: action.payload } };
    case "pwCheck":
      return { ...state, error: { ...state.error, password: action.payload } };
    case "confirmPwCheck":
      return {
        ...state, error: { ...state.error, confirmPassword: action.payload },
      };
  }
}

const INITIAL_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  isLoading: false,
  error: {},
};

function Register() {
  const [state, dispatch] = useReducer(RegisterReducer, INITIAL_STATE);
  const { email, password, confirmPassword, error } = state;
  const { signUpWithFireBase, loading } = useFireBase();

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, name: RegisterInputTypes) => {
      dispatch({ type: name, payload: e.target.value });
    },
    []
  );
  const inputBlurHanlder = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const target = e.target.id;
      let type = "" as RegisterInputTypes;
      let msg = "";
      switch (target) {
        case "email":
          type = "emailCheck";
          msg = emailRegex.test(email) ? "" : "이메일 형식이 올바르지 않아요!";
          break;
        case "password":
          type = "pwCheck";
          msg = passwordRegex.test(password)? "" : "비밀번호 형식이 올바르지 않아요!";
          break;
        case "confirmPassword":
          type = "confirmPwCheck";
          msg = confirmPassword === password ? "":  "비밀번호와 값이 일치하지 않네요?";
          break;
      }
      dispatch({ type, payload: msg });
    },
    [email, password, confirmPassword]);

  const signUpSubmitHandler = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await signUpWithFireBase(email.trim(), password.trim());
    },
    []
  );
  if (loading) return <Loading />;
  return (
    <SignUp
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      inputChangeHandler={inputChangeHandler}
      inputBlurHanlder={inputBlurHanlder}
      signUpSubmitHandler={signUpSubmitHandler}
      error={error}
    />
  );
}

export default Register;
