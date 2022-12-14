const { resolve } = require('path')
const UnoCSS = require('@unocss/webpack').default
/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    dirs: ['src']
  },
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: ['./src']
  },
  webpack: (config, { isServer, buildId }) => {
    config.cache = false
    config.plugins.push(UnoCSS())
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': resolve(__dirname, 'src'),
      '@root': resolve(__dirname)
    }
    return config
  }
}
