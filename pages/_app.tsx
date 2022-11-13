import "../styles/globals.css";
import type { AppProps } from "next/app";
import AuthProvider from "../components/Auth/AuthProvider";
import AuthGuard from "../components/Auth/AuthGuard";
import { NextPage } from "next";
import Head from "next/head";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  // initMocks()
}

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  isPrivate?: boolean;
};

interface MyApp {
    Component: NextApplicationPage;
    pageProps: AppProps;
}

function MyApp({ Component, pageProps }: MyApp) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
          key="viewport"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="감정일기"
          key="description"
        />
      </Head>
      <AuthProvider>
        {Component.isPrivate ? (
          <AuthGuard>
            <Component {...pageProps} />
          </AuthGuard>
        ) : (
          // public page
          <Component {...pageProps} />
        )}
      </AuthProvider>
    </>
  );
}

export default MyApp;
