import React, { useCallback, useReducer } from "react";
import SignUp from "../../components/SignUp";
import useFireBase from '../../hooks/useFireBaseSignUp';

type State = {
  email: string;
  password: string;
  confirmPassword: string;
  isLoading : boolean;
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

export type RegisterInputTypes = Action['type']

function RegisterReducer(state: State, action: Action):State {
  switch (action.type) {
    case "userInputEmail":
      return {...state, email:action.payload}
    case "userInputPassword":
      return {...state, password:action.payload}
    case "userConfirmPassword":
      return {...state, confirmPassword:action.payload}
  }
}
const INITIAL_STATE = {email:'',password:'',confirmPassword:'',isLoading:false}

function Register() {
  const [state,dispatch] = useReducer(RegisterReducer, INITIAL_STATE)
  const { email,password,confirmPassword, error } = state
  const { signUpWithFireBase} = useFireBase()

  const inputChangeHandler = useCallback((e:React.ChangeEvent<HTMLInputElement>, name : RegisterInputTypes)=>{
    dispatch({type:name,payload:e.target.value});
  },[])
  const signUpSubmitHandler = useCallback(async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    await signUpWithFireBase(email.trim(), password.trim());
  },[]);
  return (
    <SignUp 
      email={email}
      password={password}
      confirmPassword={confirmPassword}
      inputChangeHandler={inputChangeHandler}
      signUpSubmitHandler={signUpSubmitHandler}
    />
  );
}

export default Register;
