const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const files = glob.sync('./src/views/*/*.html')
let entry = {}
let plugins = []

files.forEach((file) => {
  let viewName = file.slice(file.lastIndexOf('/') + 1)
  const name = viewName.split('.')[0]

  entry[name] = `./src/views/${name}/index.js`
  plugins.push(
    new HtmlWebpackPlugin({
      filename: viewName, // 生成 html 文件的文件名。默认为 index.html.
      template: file, // 使用特定的模板生成html
      inject: 'body',
      chunks: ['common', name] // 要引用的chunk
    })
  )
})

module.exports = {
  entry: entry,
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [

      // 加载图片
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },

      // 加载字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },

      // 加载csv tsv xml文件
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
    ]
  },
  plugins: [].concat(plugins)
}
