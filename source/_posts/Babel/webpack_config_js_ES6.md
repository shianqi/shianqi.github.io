---
title: webpack配置文件ES6写法
date: 2017-9-13 10:08:44
tags:
    - webpack
    - babel
---
# 过程

1. 将 `webpack.config.js` 改成 `webpack.config.babel.js`
1. 在根目录添加 `.babelrc`
1. 安装 `babel-core` `babel-loader` `babel-preset-es2015`

## webpack.config.babel.js

```javascript
import path from 'path'

export default {
    entry: [
        path.resolve(__dirname, './src/index.js')
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
                exclude: [
                    resolve(__dirname, './node_modules/')
                ]
            }
        ]
    }
}
```

**注意：** 这里须要将 `exclude: [resolve(__dirname, './node_modules/')]` 加入，否则打包后的代码会包括 `node_modules` 下的文件，而且不能写成 `'/node_modules/'`

## package.json

```json
{
  "name": "webpacklearning",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack --config webpack.config.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-runtime": "^6.26.0"
  },
  "devDependencies": {
    "babel-core": "^6.26.0",
    "babel-loader": "^7.1.2",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.6.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-3": "^6.24.1",
    "webpack": "^3.5.6"
  }
}
```

## .babelrc

这里注意一点是 **不能使用 `modules: false`** `modules: false`配置项是告诉`es2015 preset`避免把`import statements`编译成`CommonJS`，这样`Webpack`才好做`tree shaking`。

```json
{
    "presets": [
        [
            "env",
            {
                "targets": {
                    "browsers": [
                        "last 2 versions",
                        "ie >= 9"
                    ],
                    "node": "current"
                }
            }
        ],
        "react",
        "stage-3"
    ],
    "plugins": [
        "react-hot-loader/babel",
        "transform-runtime"
    ]
}
```
