import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from 'react';
import { authService } from '../firebase/config';
import { useState } from 'react';

console.log('[env]:',process.env.NODE_ENV)
console.log('[API ENV]:',process.env.NEXT_PUBLIC_API_MOCKING)

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  // initMocks()
}

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(authService, (user) => {
      if (user) {
        setUser(user);
      } else {
      alert('로그인 되지 않은 상태입니다.')
      }
    });
    return unsubcribe
  },[])
  
  return <Component {...pageProps} />
}

export default MyApp
