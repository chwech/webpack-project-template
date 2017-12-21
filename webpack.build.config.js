const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const baseWebpackConfig = require('./webpack.base.config.js')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              minimize: true
            }
          }
        })
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']), // 构建前清理dist文件夹
    new UglifyJSPlugin(),

    // 抽取css
    new ExtractTextPlugin({

      // 当配置了多个入口chunk, 必须配置[name]为每个chunk生成一个css文件
      filename: "[name].styles.css",

      // 当使用 CommonsChunkPlugin 并且在公共 chunk 中有提取的 chunk. 此项必须配置为true
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common' // 指定公共 bundle 的名称。
    }),
  ]
})
