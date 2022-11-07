import React, { createContext, FC, useContext } from 'react'

interface Props {
    children: React.ReactNode;
}

const AuthContext = createContext<{} | null >(null);
export const useAuth = ()=>{
    const auth = useContext(AuthContext);
    if (auth) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return auth
}

const AuthProvider:FC<Props> = ({children}) =>{
const {Provider} = AuthContext;
const value = {};
  return (
    <Provider value={value}>
        {children}
    </Provider>
  )
}

export default AuthProvider