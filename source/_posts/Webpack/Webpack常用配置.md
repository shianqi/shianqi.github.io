---
title: Webpack 常用配置
date: 2017-5-14 10:19:44
tags:
    - Webpack
    - 前端自动化
---

### 本地开发服务器
安装 `webpack-dev-server`
```
npm install --save-dev webpack-dev-server
```

修改配置文件 `webpack.config.js`
```
module.exports = {
    ...
    devServer: {
        contentBase: "./",  //告诉服务器在哪里，从提供内容
        port: 9000,         //端口
        inline: true,       //
        compress: false,    //是否启用gzip压缩
        historyApiFallback: false,  //将404定向到固定位置
    }
    ...
};
```
修改 `package.json`
```
{
  ...
  "scripts": {
    "dev": "webpack-dev-server",
  },
  ...
}
```

### webpack HotModuleReplacement
```
npm install --save react-hot-loader@next
```
Create a `.babelrc`
```
{
  "presets": [
    ["es2015", {"modules": false}],
    "react"
  ],
  "plugins": [
    "react-hot-loader/babel"
  ]
}
```
`webpack.config.js`
```
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  context: resolve(__dirname, 'src'),

  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './index.js'
    // the entry point of our app
  ],
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  devtool: 'inline-source-map',

  devServer: {
    hot: true,
    // enable HMR on the server
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [ 'babel-loader', ],
        exclude: /node_modules/
        //注意，这里不能使用 options: {} 应该在项目根目录创建 .babelrc
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader?modules', ],
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ],
};
```
`src/index.js`
```
import React from 'react';
import ReactDOM from 'react-dom';

import { AppContainer } from 'react-hot-loader';
// AppContainer is a necessary wrapper component for HMR

import App from './components/App';

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App)
  });
}
```


### webpack 仪表盘
安装 `webpack-dashboard`
```
npm install webpack-dashboard --save-dev
```

修改配置文件 `webpack.config.js`
```
// Import the plugin:
var DashboardPlugin = require('webpack-dashboard/plugin');

// If you aren't using express, add it to your webpack configs plugins section:
plugins: [
    new DashboardPlugin({ port: 3001 })
]

// If you are using an express based dev server, add it with compiler.apply
compiler.apply(new DashboardPlugin());
```

### HTML代码热加载
`webpack-dev-server` 只能监控入口文件（JS/LESS/CSS/IMG）的变化，因此 `HTML` 文件的变化必须依赖插件来进行监控。
安装 `html-webpack-plugin`
```
npm install html-webpack-plugin --save-dev
```
修改配置文件 `webpack.config.js`， 把 `index.html` 加入监控
```
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new HtmlWebpackPlugin({   // html代码热加载
            template: './index.html'
        }),
    ],
    ...
};
```

### 自动打开浏览器
安装 `open-browser-webpack-plugin`
```
npm install open-browser-webpack-plugin --save-dev
```
修改配置文件 `webpack.config.js`
```
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    ...
    plugins: [
        new OpenBrowserPlugin({ //自动打开浏览器
            url: 'http://localhost:9000'
        })
    ],
    ...
};
```

###  配置 json 加载器
安装 `json-loader`
```
npm install json-loader --save-dev
```

修改配置文件 `webpack.config.js`

```
module.exports = {
    ...
    module: { 
        rules: [{
            test: /\.json$/,
            use: [
                { loader: "json-loader" },
            ]
        }]
    }
};
```

创建 `config.json` 文件，内容如下
```json
{
    "name": "demo",
    "type": "HTML5"
}
```

使用
```
var config = require('../config.json')

console.log(config.name);
```

### 配置 LESS 编译
安装 `less` `style-loader` `css-loader` `less-loader`
```
npm install less style-loader css-loader less-loader --save-dev
```
```
module.exports = {
    ...
    module: { 
        rules: [
        {
            test: /\.less$/,
            use: [
                { loader: "less-loader" },
                { loader: "style-loader" },
                {
                    loader: "css-loader",
                    options: {
                        modules: true,
                    }
                }
            ]
        },
    }
};
```

### 配置 Babel 编译
安装 `babel-core` `babel-loader` `babel-preset-es2015`
```
npm install babel-core babel-loader babel-preset-es2015 --save-dev
```
修改配置文件 `webpack.config.js`
```
module.exports = {
    ...
    module: { 
        rules: [{
            test: /\.js$/,   //babel解析器
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};
```

### 配置 React

安装 `babel-core` `babel-loader` `babel-preset-es2015` `babel-preset-react`
```
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev
```
修改配置文件 `webpack.config.js`
```
module.exports = {
    ...
    module: { 
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: [
                    path.resolve(__dirname, "/node_modules/")
                ],
                query: {
                    presets: ['es2015','react']
                }
            }
        ]
    }
};
```

### 配置 jQuery 解析器
安装 `jquery`
```
npm install jquery --save-dev
```
修改配置文件 `webpack.config.js`
```
module.exports = {
    ...
    plugins: [
        new webpack.ProvidePlugin({   //jquery解析器
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ]
};
```

### 配置 js 代码压缩
修改配置文件 `webpack.config.js`, 在 `plugin` 中添加 `webpack.optimize.UglifyJsPlugin` 模块

```
var webpack = require('webpack');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    ...
    plugins: [
         new uglifyJsPlugin({ //js代码压缩
            compress: {
                warnings: false
            }
        })
    ]
};
```

### 配置 eslint 语法解析
安装 `esline` 库
```
npm install eslint eslint-loader eslint-friendly-formatter eslint-plugin-html babel-eslint eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard --save-dev
```
在项目根目录下添加 `eslint` 配置文件 `.eslintrc.js`
```
// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    "indent": [2, 4],//缩进风格
    'no-undef': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
```
修改配置文件 webpack.config.js
安装 `url-loader`
```
npm install url-loader --save-dev
```
修改配置文件 `webpack.config.js`
```
module.exports = {
    ...
    module: { 
        loaders: [{
            test: /\.(png|jpg)$/,
            use: [
                {
                    loader: "url-loader"
                }
            ]
        }]
    }
};
```
### 配置图片
```
module.exports = {
    ...
    module: { 
        loaders: [
        ]
    }
};
```

### 配置 normalize.css
安装 normalize.css
```
npm install normalize.css --save
```

使用
```
import 'normalize.css';
```

### 配置 iconfont
* [http://www.iconfont.cn/](http://www.iconfont.cn/) 选图标，添加到购物车，下载代码。
* 有三种方式，推荐使用 `unicode` 方式，将字体文件和 `iconfont.css` 放到项目中
* `iconfont.css` 修改字体路径例如 `url('../font/iconfont.woff?t=1494653894295')` 形式
* 修改 `webpack.config.js` 配置 `url-loader` 
    ```
    module.exports = {
        ...
        module: { 
            loaders: [{
                test: /\.(woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: "url-loader"
                    }
                ]
            }]
        }
    };
    ```
* 使用 `iconfont`
    ```
    import React, { Component } from 'react';
    import Font from '../../style/iconfont.css';
    
    class Banner extends Component{
        render(){
            return (
                <div className={Style.historyButtonBack+" "+Font.iconfont+" "+Font["icon-houtui"]}></div>
            )
        }
    }
    ```



