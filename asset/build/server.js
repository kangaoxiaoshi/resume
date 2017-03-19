let opn = require('opn')
let path = require('path')
let express = require('express')
let webpack = require('webpack')
let webpackMiddleware = require("webpack-dev-middleware")
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 转到项目更目录下
function resolve (dir) {
  return path.join(__dirname, '../../', dir);
}

let app = express()
let uri = 'http://localhost:8081'
let compiler = webpack({
  context: path.resolve(__dirname, "./"),
  entry: {
    app: resolve('asset/src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js', // name 是此时entry的key
    publicPath: '/'  // 资源文件加载时地址
  },
  //
  resolve: {
    extensions: [".js"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('../src')]       
      },
      {
        test: /\.html$/,        
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',  // 生成的文件
      template: resolve ('d.html'), // 模板位置
      inject: true,
      title: 'Ant Zhou',
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
// compiler.plugin('compilation', (compilation) => {
//   compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

let webpackMiddlewareInstance = webpackMiddleware(compiler, {
  quiet: false,
  publicPath: '/'  //网站发布后的地址
})
webpackMiddlewareInstance.waitUntilValid(() => {
  console.log(`Package is in a valid state at ${uri}`)
})
app.use(webpackMiddlewareInstance)

module.exports = app.listen('8081',  (err) => {
  if (err) {
    console.log('error' + err)
    return
  }

  // when env is testing, don't need open it
  opn(uri)
})