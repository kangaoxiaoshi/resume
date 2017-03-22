let path = require('path')
let express = require('express')
let webpack = require('webpack')
let webpackMiddleware = require("webpack-dev-middleware")
let HtmlWebpackPlugin = require('html-webpack-plugin')
// 转到项目更目录下
function resolve (dir) {  
  return path.join(__dirname, '../../', dir);
}

let compiler = webpack({
  context: path.resolve(__dirname, "./"),
  entry: {
    app: resolve('asset/src/index.js')
  },
  output: {
    path: path.resolve(__dirname, '../../dist'), // 文件输出的文件夹目录
    filename: 'js/[name].[chunkhash].js', // name 是此时entry的key
    publicPath: './'  // 资源文件加载时地址
  },
  //
  resolve: {
    extensions: [".js", ".html", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('./asset/src')]       
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        options: {minimize: true}     
      },
      {
        test: /\.css$/,
        loader: 'css-loader'       
      }
    ]
  }, 
  plugins: [
    //生成html
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

compiler.run((err, stats) => {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')
})

