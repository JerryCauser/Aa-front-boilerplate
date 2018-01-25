module.exports = ({options}) => {
  return ({
    plugins: {
      'postcss-discard-comments': options.isDev ? false : {},
      'postcss-modules': options.isWebpack ? { generateScopedName: '[local]-[hash:base64:5]' } : false,
      'autoprefixer': {},
      'cssnano': options.isDev ? false : {
        reduceIdents: false,
        mergeIdents: false,
        discardUnused: false,
        zindex: false,
        autoprefixer: false
      }
    }
  })
}