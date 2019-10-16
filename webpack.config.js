"use strict";
const merge = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base.config");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require('webpack')
const env = require('./env.production')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");

let e = {}
Object.keys(env).forEach(k => {
  e['process.env.' + k] = JSON.stringify(env[k])
})
let plugins = [
  // 抽取css文件
  new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: "css/[name].[contenthash].css"
  }),
  // 定义环境变量
  new webpack.DefinePlugin(e),
  // 打包前先清理
  new CleanWebpackPlugin(),
  // 如果代码中新添加依赖或者删除依赖，打出来的vendors bundle的contenthash会变了导出缓存失败。
  // 这是因为新添加依赖或者删除依赖时，webpack是使用module.id管理依赖，module.id会默认地基于解析顺序(resolve order)进行增量。说人话就是id不同了
  // 导致内容改变contenthash改变
  // 这里使用这个插件修复这个问题
  new webpack.HashedModuleIdsPlugin()
]
// 分析打包出来的包依赖
if (process.argv.includes('--analyze')) {
  plugins.push(new BundleAnalyzerPlugin())
}
module.exports = merge(baseWebpackConfig, {
  mode: "production",
  optimization: {
    minimizer: [
      new TerserJSPlugin({}), // js压缩
      new OptimizeCSSAssetsPlugin({}) // css压缩
    ],
    // 可使用 optimization.runtimeChunk 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 single 来为所有 chunk 创建一个 runtime bundle。
    // 因为runtime代码和引导模板代码有可能导出contenthash改变导致缓存失效。所以这里把runtime代码提取出来打一个bundle
    runtimeChunk: 'single',
    // 代码分离
    // webpack默认配置
    // splitChunks: {
    //   chunks: 'async',
    //   minSize: 30000,
    //   maxSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 5,
    //   maxInitialRequests: 3,
    //   automaticNameDelimiter: '~',
    //   name: true,
    //   cacheGroups: {
    //     vendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       priority: -10
    //     },
    //     default: {
    //       minChunks: 2,
    //       priority: -20,
    //       reuseExistingChunk: true
    //     }
    //   }
    // }
    splitChunks: {
      chunks: 'all', // async, initial, all. 顾名思义，async针对异步加载的chunk做切割，initial针对初始chunk，all针对所有chunk。
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
          chunks: 'all'
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"]
      },
      {
        test: /\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "stylus-loader"]
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader"
        ]
      },
    ]
  },
  plugins: plugins
});
