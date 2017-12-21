const baseWebpackConfig = require('./webpack.base.config.js')
const merge = require('webpack-merge')

module.exports = merge(baseWebpackConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000
  },
  module: {
    rules: [
      // eslint
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
        options: {
          // eslint options (if necessary)
          formatter: require('eslint-friendly-formatter')
        }
      },
    ]
  }
})

