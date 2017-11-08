---
title: CSS-Modules
date: 2017-05-11 20:10:16
tags:
    - CSS
    - React
    - webpack
---
## css-loader & style-loader 的区别

css-loader以一个字符串的形式读入一个css文件。并返回带导入的CSS，并通过webpack的require功能解决url（...）：

style-loader会使用这些样式，并在包含这些样式的页面的<head>元素中创建一个<style>标签。

## Options

|Name	|Type	|Default	|Description|
|-------|-------|-----------|-----------|
|root	|{String}	|/	|解析URL的路径，以 `/` 开头的URL不会被翻译
|url	|{Boolean}	|true	|Enable/Disable url() handling
|alias	|{Object}	|{}	|Create aliases to import certain modules more easily
|import	|{Boolean}	|true	|Enable/Disable @import handling
|modules	|{Boolean}	|false	|Enable/Disable CSS Modules
|minimize	|{Boolean Object}	|false	|Enable/Disable minification
|sourceMap	|{Boolean}	|false	|Enable/Disable Sourcemaps
|camelCase	|{Boolean String}	|false	|Export Classnames in CamelCase
|importLoaders	|{Number}	|0	|Number of loaders applied before CSS loader

### alias
用别名重写你的URL，当你在另一个包中使用一些css / sass文件（bootstrap，ratchet，font-awesome等）时
