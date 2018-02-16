const webpack = require('webpack')
const withSass = require('./utils/next-sass')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const commonsChunkConfig = require('./utils/next-sass/commons-chunk-config')
const compose = require('./utils/next-compose')
const {join} = require('path')

const styleLoaderOptions = {
  cssLoaderOptions({dev}) {
    return {
      modules: true,
      localIdentName: dev ? '[local]-[hash:base64:5]' : '[hash:base64:5]',
      sourceMap: false
    }
  },
  sassLoaderOptions: {
    sourceMap: false,
    includePaths: ["./", "./styles/base"]
  }
}
const extractVendorCSSPlugin = new ExtractTextPlugin('static/vendor.css')
const extractAppCSSPlugin = new ExtractTextPlugin('static/app.css')

module.exports = compose([
  [withSass, {
    cssLoaderOptions: { modules: false, sourceMap: false },
    sassLoaderOptions: styleLoaderOptions.sassLoaderOptions,
    extractCSSPlugin: extractVendorCSSPlugin,
    rules: {
      include: [join(__dirname, "styles")]
    }
  }],
  [withSass, {
    ...styleLoaderOptions,
    extractCSSPlugin: extractAppCSSPlugin,
    rules: {
      exclude: [join(__dirname, "styles")]
    }
  }],
  {
    webpack(config, options) {
      const providePlugin = new webpack.ProvidePlugin({
        'fetch': 'isomorphic-unfetch',
        'React': 'react'
      })
      config.plugins.push(providePlugin)
      config.plugins.push(extractVendorCSSPlugin)
      config.plugins.push(extractAppCSSPlugin)
      if (!options.isServer) {
        config = commonsChunkConfig(config, /\.(scss|sass)$/)
      }
      
      return config
    }
  }
])
