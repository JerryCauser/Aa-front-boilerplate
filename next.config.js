const webpack = require('webpack')
const compose = require('next-compose')
const withSass = require('./utils/next-sass')

const styleLoaderOptions = {
  cssLoaderOptions: ({dev}) => ({
    modules: true,
    localIdentName: dev ? '[local]-[hash:base64:5]' : '[hash:base64:5]',
    sourceMap: false
  }),
  sassLoaderOptions: {
    sourceMap: false,
    includePaths: ["./", "./styles/base"]
  }
}

module.exports = compose([
  [withSass, styleLoaderOptions],
  {
    webpack(config) {
      const providePlugin = new webpack.ProvidePlugin({
        'fetch': 'isomorphic-unfetch',
        'React': 'react'
      })
      config.plugins.push(providePlugin)
      return config
    }
  }
])
