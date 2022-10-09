import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { initMocks } from '../mocks'

console.log('[env]:',process.env.NODE_ENV)
console.log('[API ENV]:',process.env.NEXT_PUBLIC_API_MOCKING)

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  initMocks()
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
