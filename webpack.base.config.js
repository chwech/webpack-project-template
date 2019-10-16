"use strict";
const path = require("path");
const glob = require("glob");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 约定src/pages/页面目录/main.js为该页面的入口文件
let globmaths = glob.sync("./src/pages/**/main.js", {
  nodir: true
});

let htmlTemplate = glob.sync("./src/pages/**/index.ejs", {
  nodir: true
})

function pathsToMap(paths) {
  let map = paths.reduce((obj, file) => {
    let dir = path.dirname(file);
    let key = dir.split("/");
    key = key[key.length - 1];
    obj[key] = file;
    return obj;
  }, {});
  return map
}

function generateHtml(entry) {
  let html = [];
  let htmlTpls = pathsToMap(htmlTemplate)
  Object.keys(entry).forEach(chunk => {
    html.push(
      new HtmlWebpackPlugin({
        filename: `${chunk}.html`, // 生成的html文件名
        chunks: ['runtime', 'styles', 'vendors', chunk], // 一个html对应一个入口chunk, 因为runtime单独打包出来了，所以需要注入到html
        template: path.resolve(htmlTpls[chunk]), // 模板文件
        path: chunk,
        title: 'kingskuma澳玛儿'
      })
    );
  });
  return html;
}
let entry = pathsToMap(globmaths)
let plugins = [
  // 使用插件自动生成html文件，并且自动把打包的js,css注入
  ...generateHtml(entry),
  // 使用vue-loader必须使用这个插件
  new VueLoaderPlugin()
];
module.exports = {
  entry: entry,
  output: {
    path: path.resolve(`./milk-powder-website`),
    filename: "js/[name].[contenthash].js"
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
    extensions: [".vue", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.ejs$/,
        use: {
          loader: 'ejs-loader'
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        exclude: file => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: ["babel-loader"]
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      // 处理图片资源路径
      {
        test: /\.(gif|jpe?g|png|svg|ico)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              fallback: 'file-loader',
              name: path.posix.join('img/[name].[hash:7].[ext]'),
              publicPath:'../' // 图片打包出来，背景图路径不正确。本来图片路径是img/example.png，出来的却是css/img/example.png。
            }
          },
          // 图片压缩优化
          {
            loader: 'image-webpack-loader',
            options: {
              disable: process.argv.includes('webpack.dev.config.js')
            }
          }
        ]
      },
      // 处理文字资源
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          fallback: 'file-loader',
          name: path.posix.join('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: plugins
};
