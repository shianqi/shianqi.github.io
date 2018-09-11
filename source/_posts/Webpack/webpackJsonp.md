---
title: Webpack v4 使用 Webpack低版本编译后的文件
date: 2018-09-11 13:23:00
tags:
    - Webpack
---

# Webpack v4 使用 Webpack低版本编译后的文件

## webpackJsonp

> The JSONP function used by webpack for async loading of chunks.

`Webpack` 使用JSONP按需加载 `chunks`，这个函数的名字默认为 `webpackJsonp`。

在之前版本的 `webpack` 中，`webpackJsonp` 是一个函数：

## 问题

在一个项目中如果同时需要同时运行 `Webpack v4` 和 `Webpack v1-3` 编译后的模块，会导致命名冲突。

`webpack v1`：

```javascript
/******/(function(modules) { // webpackBootstrap
/******/  // install a JSONP callback for chunk loading
/******/  var parentJsonpFunction = window["webpackJsonp"];
/******/  window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/    ...
/******/  };
/******/  ...
/******/ })
```

但在 `webpack v4` 中变成了一个数组

```javascript
(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{150:function(e,t,u){....
```

如果在同一网页上使用多个 webpack不同版本编译后的文件，就会产生冲突，导致异步 `chunks` 无法加载。

## 解决方案

正确的做法是使用 `output.jsonpFunction` 方法修改 JSONP 的默认名，解决冲突。

### `output.jsonpFunction` [](https://webpack.js.org/configuration/output/#output-jsonpfunction)

`string`

Only used when [`target`](https://webpack.js.org/configuration/target) is web, which uses JSONP for loading on-demand chunks.

A JSONP function name used to asynchronously load chunks or join multiple initial chunks (CommonsChunkPlugin, AggressiveSplittingPlugin).

This needs to be changed if multiple webpack runtimes (from different compilation) are used on the same webpage.

If using the [`output.library`](https://webpack.js.org/configuration/output/#output-library) option, the library name is automatically appended.
