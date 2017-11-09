const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: './src/index.js',
        test: './src/views/test/index.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            // 加载css
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
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
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']), // 构建前清理dist文件夹
        new HtmlWebpackPlugin({
            title: 'Output Management', // 设置生成html文件title
            inject: 'head', // 插入js的位置
            favicon: './src/favicon.ico', // 插入favicon
            minify: {
                removeAttributeQuotes: true // 移除属性的引号
            }, // 压缩html文件
            chunks: ['app']
        }),
        new HtmlWebpackPlugin({
            filename: 'test.html', // 生成 html 文件的文件名。默认为 index.html.
            template: './src/views/test/test.html', // 使用特定的模板生成html
            inject: 'body',
            chunks: ['test'] // 要引用的chunk
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common' // 指定公共 bundle 的名称。
        })
    ]
};