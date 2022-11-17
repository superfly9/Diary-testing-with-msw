import { useRouter } from 'next/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { authService } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

function useFireBase() {
    const router = useRouter();
    const [loading,setLoading] = useState<boolean>(false);
    const signUpWithFireBase = async (email : string,password : string)=>{
      try {
          setLoading(true)
          const userCredential = await createUserWithEmailAndPassword(authService, email, password)
          const user = userCredential.user;
          console.log('[SignUp userCredential]:',userCredential)
          console.log('[user]:',user)
          router.push('/') 
          // signUpFireBase의 성공 여부를 함수 바깥에서 잡을 수 없음 + 따러서 push를 여기에서 같이 쓸 수 밖에 없어서 이렇게 둠
      } catch (e) {
          console.log('[Sign Up Error]:',e)
          alert('회원 가입에 실패했습니다.잠시 후 다시 시도해주세요');
      } finally {
        setLoading(false);
      }
  }

  const signInWithFireBase = async (email : string, password: string)=>{
    try {
        const userCredential = await signInWithEmailAndPassword(authService, email, password)
        const user = userCredential.user;
        console.log('[login UserCredential]:',userCredential)
        console.log('[login User]:',user)
    } catch (e) {
        console.log('[Sign In Error]:',e)
        alert('로그인에 실패했습니다.잠시 후 다시 시도해주세요.')
    }
}
  return { signUpWithFireBase, signInWithFireBase,loading}
}

export default useFireBase