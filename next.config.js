/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env : {
    apiKey: "AIzaSyA43EOpyCDIRkABfHNPMxrCIB605BMFwOw",
    authDomain: "seoul-lite-test.firebaseapp.com",
    databaseURL: "https://seoul-lite-test.firebaseio.com",
    projectId: "seoul-lite-test",
    storageBucket: "seoul-lite-test.appspot.com",
    messagingSenderId: "936044517273",
    appId: "1:936044517273:web:cc0f0362ea51978afde508"
  }
}

module.exports = nextConfig
