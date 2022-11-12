import React, { useEffect, useReducer, useRef } from "react";

type State = {
  email: string;
  password: string;
  emailErr: string;
  passwordErr: string;
};

type Action = {
  payload: string;
  type: "userEmail" | "userPassword" | "emailError" | "passwordError";
};

type InputTypes = Action["type"];

function LoginReducer(state: State, action: Action): State {
  switch (action.type) {
    case "userEmail":
      return { ...state, email: action.payload };
    case "userPassword":
      return { ...state, password: action.payload };
    case "emailError":
      return { ...state, emailErr:action.payload };
    case "passwordError":
      return { ...state, passwordErr: action.payload } };
  }
const INITIAL_STATE = {
  email: "",
  emailErr: "", 
  password: "",
  passwordErr: "" 
};

function Login() {
  const [state, dispatch] = useReducer(LoginReducer, INITIAL_STATE);
  const { email, password, emailErr, passwordErr } = state;
  const submitBtnRef = useRef<HTMLButtonElement>(null)

  const inputChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    name: InputTypes
  ) => {
    dispatch({ type: name, payload: e.target.value });
  };
  const validateHandler = () => {
    if (!email.includes("@")) dispatch({ type: "emailError", payload: "Email is not Valid!" });
    if (password.length < 6) dispatch({ type: "passwordError", payload: "password is not Valid!" });
  };
  useEffect(() => {
    validateHandler()
  }, [email, password]);

  const loginSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailErr || passwordErr) 
    console.log("[e]:", e);
    console.log("submit");
  };

  return (
    <>
      <h1>당신의 오늘 하루를 위해, 감정일기</h1>
      <em>나의 기분, 마음 모두 편하게 털어놓으세요</em>
      <form onSubmit={loginSubmitHandler}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => inputChangeHandler(e, "userEmail")}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => inputChangeHandler(e, "userPassword")}
        />
        <button ref={submitBtnRef} type="submit">로그인하기</button>
      </form>
    </>
  );
}

export default Login;
