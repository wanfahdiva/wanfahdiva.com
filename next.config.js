/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: []
  },
  env: {
    SITE_NAME: 'wanfahdiva.com',
    APP_URL: process.env.APP_URL
  }
}

module.exports = nextConfig
