const fs = require('fs')
const webpack = require('webpack')

module.exports = {
  webpack: (config, {dev}) => {
    const providePlugin = new webpack.ProvidePlugin({
      'fetch': 'isomorphic-unfetch',
      'React': 'react'
    })
    config.plugins.push(providePlugin)
    
    config.module.rules.push(
      {
        test: /\.s?css$/,
        use: [
          {
            loader: 'emit-file-loader',
            options: {
              name: 'dist/[path][name].[ext]'
            }
          },
          'babel-loader',
          {
            loader: 'skeleton-loader',
            options: {
              procedure: function (content) {
                const fileName = `${this._module.userRequest}.json`
                const classNames = fs.readFileSync(fileName, 'utf8')
                
                fs.unlink(fileName, err => {
                  if (err) console.error(err)
                  //TODO we need logger.
                })
                
                return `
                import Head from 'next/head'
                const styles = () => (<Head><style dangerouslySetInnerHTML={{__html: \`${content}\`}}></style></Head>)
                module.exports = Object.assign(styles, ${classNames})
                `
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                ctx: {
                  isDev: dev,
                  isWebpack: true
                }
              }
            }
          },
          {
            loader: "sass-loader",
            options: {
              includePaths: ["./"]
            }
          }
        ]
      }
    )
    
    return config
  }
}
