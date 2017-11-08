---
title: Webpack 学习笔记
date: 2016-11-14 22:07:44
tags: 
    - Webpack
    - 前端自动化
---

# webpack学习笔记

* ### 基础打包命令：
    ```
    webpack {entry file/入口文件} {destination for bundled file/存放bundle.js的地方}
    ```

* ### 通过配置文件使用：
    ```
    module.exports = {
        devtool: 'eval-source-map',             //配置生成Source Maps，选择合适的选项
        entry:  __dirname + "/app/main.js",     //已多次提及的唯一入口文件
        output: {
            path: __dirname + "/public",        //打包后的文件存放的地方
            filename: "bundle.js"               //打包后输出文件的文件名
        },
        module: {                               //在配置文件里添加JSON loader
            loaders: [
                {
                    test: /\.json$/,
                    loader: "json"
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel',            //在webpack的module部分的loaders里进行配置即可
                    query: {
                        presets: ['es2015','react']
                    }
                }
            ]
        },
        devServer: {
            contentBase: "./public",        //本地服务器所加载的页面所在的目录
            colors: true,                   //终端中输出结果为彩色
            historyApiFallback: true,       //不跳转
            inline: true                    //实时刷新
        }
    }
    ```
    打包命令：
    ```
    webpack
    ```
    也可以将此命令封装到npm中
    <p style="color:#ff5656">注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。</p>
    
* ### 生成Source Maps（使调试更容易）

    | devtool选项 | 配置结果 |
    |------------|---|
    |source-map | 在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包文件的构建速度；|
    |cheap-module-source-map|在一个单独的文件中生成一个不带列映射的map，不带列映射提高项目构建速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号），会对调试造成不便；|
    |eval-source-map|使用eval打包源文件模块，在同一个文件中生成干净的完整的source map。这个选项可以在不影响构建速度的前提下生成完整的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。不过在开发阶段这是一个非常好的选项，但是在生产阶段一定不要用这个选项；|
    |cheap-module-eval-source-map|这是在打包文件时最快的生成source map的方法，生成的Source Map 会和打包后的JavaScript文件同行显示，没有列映射，和eval-source-map选项具有相似的缺点；|

* ### 使用webpack构建本地服务器

    安装：
    ```
    npm install --save-dev webpack-dev-server
    ```
    
    配置：
    
    |devserver配置选项|功能描述|
    |-----|-----|
    |contentBase|默认webpack-dev-server会为根文件夹提供本地服务器，如果想为另外一个目录下的文件提供本地服务器，应该在这里设置其所在目录（本例设置到“public"目录）|
    |port|设置默认监听端口，如果省略，默认为”8080“|
    |inline|设置为true，当源文件改变时会自动刷新页面|
    |colors|设置为true，使终端输出的文件为彩色的|
    |historyApiFallback|在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html|
    
    运行服务器：
    ```
    webpack-dev-server
    ```
    
* ### Loaders
    Loaders需要单独安装并且需要在webpack.config.js下的modules关键字下进行配置，Loaders的配置选项包括以下几方面：
    
    * test：一个匹配loaders所处理的文件的拓展名的正则表达式（必须）
    * loader：loader的名称（必须）
    * include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
    * query：为loaders提供额外的设置选项（可选）

* ### Babel
    Babel其实是一个编译JavaScript的平台，它的强大之处表现在可以通过编译帮你达到以下目的：
    
    * 下一代的JavaScript标准（ES6，ES7），这些标准目前并未被当前的浏览器完全的支持；
    * 使用基于JavaScript进行了拓展的语言，比如React的JSX

    Babel包的安装
    ```
    // npm一次性安装多个依赖模块，模块之间用空格隔开
    npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
    ```
    <p style="color:#ff5656">babel-core --- 核心功能</p>
    <p style="color:#ff5656">babel-preset-es2015 --- 解析Es6</p>
    <p style="color:#ff5656">babel-preset-react --- 解析JSX</p>
    
    为了测试Babel安装是否成功需要安装React和React-DOM
    ```
    npm install --save react react-dom
    ```
    
    #### Babel的配置选项
    <p>
    Babel其实可以完全在webpack.config.js中进行配置，但是考虑到babel具有非常多的配置选项，
    在单一的webpack.config.js文件中进行配置往往使得这个文件显得太复杂，
    因此一些开发者支持把babel的配置选项放在一个单独的名为 ".babelrc" 的配置文件中。
    我们现在的babel的配置并不算复杂，不过之后我们会再加一些东西，因此现在我们就提取出相关部分，
    分两个配置文件进行配置（webpack会自动调用.babelrc里的babel配置选项），如下：
    </p>
    ```
    //.babelrc
    {
      "presets": ["react", "es2015"]
    }
    ```
    
* ### CSS
    <p>
    webpack提供两个工具处理样式表，css-loader 和 style-loader，二者处理的任务不同，
    css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能,
    style-loader将所有的计算后的样式加入页面中，二者组合在一起使你能够把样式表嵌入webpack打包后的JS文件中。
    </p>
    
    * #### 安装
    ```
    npm install --save-dev style-loader css-loader
    ```
    
    <p style="color:#ff5656">注：感叹号的作用在于使同一文件能够使用不同类型的loader</p>
    
    
* ### CSS module
    把JS的模块化思想带入CSS中来，通过CSS模块，所有的类名，动画名默认都只作用于当前模块。相同的类名也不会造成不同组件之间的污染。
    CSS modules 也是一个很大的主题，有兴趣的话可以去[官方文档](https://github.com/css-modules/css-modules)查看更多消息
    
* ### CSS预处理器
    这里使用postcss来示范
    ```
    npm install --save-dev postcss-loader autoprefixer
    //autoprefixer 自动添加前缀的插件
    ```
    
* ### 插件（Plugins）
    <p>Loaders和Plugins常常被弄混，但是他们其实是完全不同的东西，可以这么来说，
    loaders是在打包构建过程中用来处理源文件的（JSX，Scss，Less..），一次处理一个，
    插件并不直接操作单个文件，它直接对整个构建过程其作用。</p>
    
    * BannerPlugin：(编译后的文件前添加信息)
    ```
    plugins: [
        new webpack.BannerPlugin("Copyright Flying Unicorns inc.")  //在这个数组中new一个就可以了
    ],
    ```
    
    * HtmlWebpackPlugin (依据一个简单的模板，帮你生成最终的Html5文件)
    
    ```
    npm install --save-dev html-webpack-plugin
    ```
    ```
    //webpack
    var HtmlWebpackPlugin = require('html-webpack-plugin');
    
    plugins: [
        new HtmlWebpackPlugin({
          template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        })
      ],

    ```
    
    * HtmlWebpackPlugin (热更新插件)
    ```
    npm install --save-dev babel-plugin-react-transform react-transform-hmr
    
    //webpack.config.js -> plugins
    new webpack.HotModuleReplacementPlugin()//热加载插件
    
    //.babelrc ->
    {
      "presets": ["react", "es2015"],
      "env": {
        "development": {
        "plugins": [["react-transform", {
           "transforms": [{
             "transform": "react-transform-hmr",
    
             "imports": ["react"],
    
             "locals": ["module"]
           }]
         }]]
        }
      }
    }
    ```
    
* ### 产品阶段的构建
    创建一个“webpack.production.config.js”的文件，在里面加上基本的配置,它和原始的webpack.config.js很像
    ```
    //package.json -> scripts
    webpack --config ./webpack.production.config.js --progress
    ```
    
* ### 优化插件
    
    * OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID
    * UglifyJsPlugin：压缩JS代码；
    * ExtractTextPlugin：分离CSS和JS文件
    
    OccurenceOrderPlugin 和 UglifyJsPlugin 是内置插件
    ```
    npm install --save-dev extract-text-webpack-plugin
    ```
    ```
    //webpack.production.config.js -> plugins
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    ```
    
* ### 出处

    本文参考[入门Webpack，看这篇就够了](http://www.jianshu.com/p/42e11515c10f#)