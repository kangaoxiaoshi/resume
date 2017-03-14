let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let webpackMiddleware = require("webpack-dev-middleware")
let HtmlWebpackPlugin = require('html-webpack-plugin')


let app = express()
let uri = 'http://localhost:8081'
let compiler = webpack({
  context: path.resolve(__dirname, "./"),
  entry: {
    app: '../src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 生成的文件
      template: '../../index.html', // 模板位置
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }    
    })
  ]
})
let hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

let webpackMiddlewareInstance = webpackMiddleware(compiler, {
  quiet: false,
  publicPath: '/'
})
webpackMiddlewareInstance.waitUntilValid(() => {
  console.log(`Package is in a valid state at ${uri}`)
})
app.use(webpackMiddlewareInstance)

module.exports = app.listen('8081', function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  opn(uri)
})