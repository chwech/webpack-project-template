# api cloud app项目模板

## 使用
```git
git clone https://github.com/chwech/api-cloud-template.git projectName
```

## 目录结构
```
|-- root
    |-- css
    |-- feature
    |-- icon
    |-- image
    |-- launch
    |-- dist                     // webpack输出目录
    |-- public                  
    |   |-- index.html          // htmlWebpackPlugin生成html的模板
    |-- res
    |-- script
    |   |-- api.js
    |-- src
    |   |-- pages                // 页面文件夹
    |       |-- index            // 首页
    |       |   |-- main.js      // 约定入口
    |       |   |-- test.vue
    |       |-- test             // 其它页面
    |           |-- main.js
    |           |-- test.vue
    |-- wgt
    |-- .babelrc
    |-- .editorconfig
    |-- .gitignore
    |-- .syncignore
    |-- config.xml
    |-- env.development.js
    |-- env.production.js
    |-- gulpfile.js
    |-- package-lock.json
    |-- package.json
    |-- postcss.config.js
    |-- README.md
    |-- webpack.base.config.js
    |-- webpack.config.js
    |-- webpack.dev.config.js
```
## 特性
* 支持es6以上新特性
* 支持less、stylus预处理器
* 支持.vue单文件编写页面
* autoprefixer自动添加css浏览器前缀
* 环境变量定义
* webpack-dev-server 热模块重载
* 小图片(小于8192字节)base64内联

## License
[MIT](http://opensource.org/licenses/MIT)