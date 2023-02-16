/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  image: {
    domains: [],
  },
  env: {
    GOOGLE_ID: process.env.GOOGLE_ID,
    GOOGLE_SECRET: process.env.GOOGLE_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    OPENAI_KEY: process.env.OPENAI_KEY,
    FIREBASE_SERVICE_ACCOUNT_KEY: process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
  },
  experimental: {
    appDir: true,
  },
};
