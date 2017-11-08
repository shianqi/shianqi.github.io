---
title: Karma 基本用法
date: 2017-08-30 09:35:44
tags:
    - Karma
    - Test
---

## 安装
```
$ npm install karma --save-dev
$ npm install karma-jasmine karma-chrome-launcher jasmine-core --save-dev
```

## 生成配置文件
```
$ node ./node_modules/karma/bin/karma init karma.conf.js
```

## 运行
```
$ node ./node_modules/karma/bin/karma start karma.conf.js
```
