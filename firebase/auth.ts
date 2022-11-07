import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from './config';

export const signUpWithFireBase = async (email : string,password : string)=>{
    try {
        const userCredential = await createUserWithEmailAndPassword(authService, email, password)
        const user = userCredential.user;
        console.log('[userCredential]:',userCredential)
        console.log('[user]:',user)
    } catch (e) {
        console.log('[Sign Up Error]:',e)
    }
}

  export const signInWithFireBase = async (email : string, password: string)=>{
    try {
        const userCredential = await signInWithEmailAndPassword(authService, email, password)
        const user = userCredential.user;
    } catch (e) {
        console.log('[Sign In Error]:',e)
    }
  }