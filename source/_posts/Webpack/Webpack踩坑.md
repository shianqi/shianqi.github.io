---
title: webpack 踩坑
date: 2017-9-13 10:58:44
tags:
    - webpack
---

## 不同平台设置node环境变量的差异

在Mac上，可以在package.json中配置：
```
"scripts": {
     "build"："NODE_ENV=production && ..."
}
```
但在Windows中是不行的。要解决这个问题，需要用到cross-env模块。

先安装它：
```
npm i cross-env --save-dev
```
然后把上面的配置可以改成：
```
"scripts": {
     "build"："node ./node_modules/.bin/cross-env NODE_ENV=production && ..."
}
```

## 处理未模块化的库，如 Zepto

对于未模块化的库，如果直接import，在webpack打包的时候会报错的。详见：[如何在 webpack 中引入未模块化的库，如 Zepto](https://juejin.im/entry/588ca3018d6d81006c237c85)

解决的办法就是在module的rules下增加如下配置项：
```
{
    test: require.resolve('zepto'),
    loader: 'exports-loader?window.Zepto!script-loader'
}
```
其中，`require.resolve()` 是 `nodejs` 用来查找模块位置的方法，返回模块的入口文件，如 zepto 为 `./node_modules/zepto/dist/zepto.js`。

此外，这里还用到了两个loader，我们需要先安装他们：
```
$ npm i --save-dev script-loader exports-loader
```
