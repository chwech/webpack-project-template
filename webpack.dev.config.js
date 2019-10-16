"use strict";
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const webpack = require('webpack')
const env = require('./env.development')

let e = {}
Object.keys(env).forEach(k => {
  e['process.env.' + k] = JSON.stringify(env[k])
})

let plugins = [
  // 定义环境变量
  new webpack.DefinePlugin(e)
]

const config = merge(baseWebpackConfig, {
  mode: "development",
  devtool: "inline-source-map",
  output: {
    filename: "js/[name].[hash].js" // 热模块替换不能和contenthash使用，所以开发环境使用hash代替
  },
  devServer: {
    compress: true, // gzip
    port: 9000,
    host: "0.0.0.0", // 让局域网里的网络可以通过ip访问此服务
    hot: true // 模块热替换
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: ["vue-style-loader", "css-loader", "postcss-loader", "stylus-loader"]
      },
      {
        test: /\.css$/,
        use: [
          "vue-style-loader",
          "css-loader",
          "postcss-loader"
        ]
      },
    ]
  },
  plugins: plugins
});

module.exports = config
