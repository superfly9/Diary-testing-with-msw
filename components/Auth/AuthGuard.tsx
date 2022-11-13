import React, { FC } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "./AuthProvider";
import Loading from "../Loading";

interface Props {
  children: React.ReactNode;
}

const AuthGuard: FC<Props> = ({ children }) => {
  const { user, initializing, setRedirect } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!initializing) {
      if (!user) {
        setRedirect(router.route);
        router.push("/signup")
      }
    }
  },[initializing, router.route, user, setRedirect]);

  if (initializing) return <Loading />
  if (!initializing && user) return <>{children}</>;
  return null; // useEffect의 router.push를 실행시킬 떄의 상태
};

export default AuthGuard;
