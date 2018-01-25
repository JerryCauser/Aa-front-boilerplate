const sass = require('node-sass')
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')

const isDev = process.argv[2] === '--dev'

const postcssConfig = require('../postcss.config')({options: { isDev, isWebpack: false }})
const plugins = Object.keys(postcssConfig.plugins).map(key => {
  const plugin = postcssConfig.plugins[key]
  if (plugin === false) { return null }
  return require(key)(postcssConfig.plugins[key])
}).filter(Boolean)

buildCss()

if (isDev) {
  let debounceTimeout
  function debouncedBuildCss() {
    clearTimeout(debounceTimeout)
    debounceTimeout = setTimeout(() => buildCss(), 300)
  }
  fs.watch(path.resolve(__dirname, '../styles'), {recursive: true}, debouncedBuildCss)
}

function buildCss () {
  console.log('> Building base.css')
  const startTime = +new Date()
  sass.render({
    file: 'styles/base.scss',
    includePaths: [ './' ]
  }, function(error, result) {
    if (error) {
      console.error(error)
    } else {
      const css = result.css.toString()
      const fromPath = path.resolve(__dirname, '../styles/base.scss')
      const destination = path.resolve(__dirname, '../static/base.css')
      postcss(plugins)
        .process(result.css.toString(), { from: fromPath })
        .then(result => {
          fs.writeFileSync(destination, result.css)
          console.log(`> Completed base.css in ${(new Date() - startTime)/1000}s.`)
        })
    }
  })
}
