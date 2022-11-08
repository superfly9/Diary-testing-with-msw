import React, { createContext, FC, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from 'firebase/auth';
import { authService } from '../../firebase/config';
import { User } from 'firebase/auth';

interface Props {
  children: React.ReactNode;
}

export type AuthContext = {
  initializing: boolean
  user: User | null
  error: { message: string } | null
  setRedirect: (redirect: string) => void
  getRedirect: () => string | null
  clearRedirect: () => void
}
const AuthContext = createContext<AuthContext | null>(null);
AuthContext.displayName = "AuthContext"

const REDIRECT_KEY = "sign_in_redirect"

function setRedirect(redirect: string) {
  window.sessionStorage.setItem(REDIRECT_KEY, redirect)
}

function getRedirect(): string | null {
  return window.sessionStorage.getItem(REDIRECT_KEY)
}

function clearRedirect() {
  return window.sessionStorage.removeItem(REDIRECT_KEY)
}

export const useAuth = () => {
  const auth = useContext(AuthContext)
  if (!auth) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return auth;
};

const AuthProvider: FC<Props> = ({ children }) => {

  const [user , setUser] = useState<User | null>(null)
  const [error, setError] = useState<{ message: string } | null>(null)
  const [initializing, setInitializing] = useState(true)
  const { Provider } = AuthContext;

  useEffect(()=>{
    const unsubcribe = onAuthStateChanged(authService , user=>{
      if (user) {
        setUser(user)
      } else {
        setUser(null);
        if (error) setError(error);
      }
    })
    setInitializing(false)
    return unsubcribe
  }, [])
  const value = {
    user,
    error,
    initializing,
    setRedirect,
    getRedirect,
    clearRedirect
  };
  return <Provider value={value}>{children}</Provider>;
};

export default AuthProvider;