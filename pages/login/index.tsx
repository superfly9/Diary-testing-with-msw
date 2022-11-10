import React, { useReducer } from "react";


type State = {
  email?: string;
  password?: string;
  confirmPassword?: string;
  error?: {
    email: string;
    password: string;
    confirmPassword: string;
  };
};

type Action = {
  payload:string,
  type: "userInputEmail" | "userInputPassword" | "userConfirmPassword";
};

type InputTypes = Action['type']

function LoginReducer(state: State, action: Action):State {
  switch (action.type) {
    case "userInputEmail":
      return {...state, email:action.payload}
    case "userInputPassword":
      return {...state, password:action.payload}
    case "userConfirmPassword":
      return {...state, confirmPassword:action.payload}
  }
}
const INITIAL_STATE = {email:'',password:'',confirmPassword:''}

function Login() {
  const [state,dispatch] = useReducer(LoginReducer, INITIAL_STATE)
  const { email,password,confirmPassword, error } = state

  const emailInputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>, name : InputTypes)=>{
    dispatch({type:name,payload:e.target.value});
  }
  return (
    <>
      <h1>당신의 오늘 하루를 위해, 감정일기</h1>
      <em>나의 기분, 마음 모두 편하게 털어놓으세요</em>
      <label htmlFor="email">Email</label>
      <input type="text" id='email' value={email} onChange={(e)=>emailInputChangeHandler(e,'userInputEmail')} />
      <label htmlFor="password">비밀번호</label>
      <input type="password" id='password' value={password} onChange={(e)=>emailInputChangeHandler(e,'userInputPassword')} />
      <label htmlFor="confirmPassword">비밀번호</label>
      <input type="password" id='confirmPassword' value={confirmPassword} onChange={(e)=>emailInputChangeHandler(e,'userConfirmPassword')} />
    </>
  );
}

export default Login;
