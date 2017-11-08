---
title: React v16.0 新特性
date: 2017-10-07 15:48:16
tags:
    - React
---

# React v16.0

## 新的渲染返回类型：碎片和字符串

现在可以从组件的渲染方法中返回一个包含元素的数组

```javascript
render() {
  // No need to wrap list items in an extra element!
  return [
    // Don't forget the keys :)
    <li key="A">First item</li>,
    <li key="B">Second item</li>,
    <li key="C">Third item</li>,
  ];
}
```

添加了对返回字符串的支持

```javascript
render() {
  return 'Look ma, no spans!';
}
```

## 更好的服务端渲染

`React 16` 完全重写服务器渲染，支持流。同时编译不再进行 `process.env` 检查（Node 读取 `process.env` 非常慢）。并且比 `React 15` 快大概三倍

## 支持自定义 DOM 属性

`React` 现在会将自定义属性传递给 `DOM`，而不是忽略不认识的 `HTML` 和 `SVG` 属性。这使得我们能够不必在维护的 `React` 特性的白名单，并能够减少文件体积

```javascript
// Your code:
<div mycustomattribute="something" />
```

```javascript
// React 15 output:
<div />
```

```javascript
// React 16 output:
<div mycustomattribute="something" />
```

## 减少文件体积

`React` 现在使用 `Rollup` 来进行扁平化的打包以处理不同目标格式，而这使得体积和性能都有了提高。**相较于之前的版本体积减少了32%**

## MIT 协议

## 新核心架构

异步渲染 - 一种周期性地对浏览器执行调度渲染工作的策略。结果如下，通过异步渲染，应用能够更好的响应，因为 React 避免阻塞了主线程。

## 新的弃用

保留（Hydrating）服务端渲染的容器现在有了更清晰的 `API` 定义。若你想重用服务端渲染的 `HTML`，使用 `ReactDOM.hydrate` 而不是 `ReactDOM.render`。若你只是想做客户端渲染则继续使用 `ReactDOM.render` 即可。

## 更新

* React 15 已对使用 `unstable_handleError` 进行了限制，不再为错误边界提供文档支持。该方法已重命名为 `componentDidCatch`。你可以使用 `codemod` 来自动地迁移代码到新的 `API`。

* 通过 `null` 调用 `setState` 不再触发更新。这允许你确定在更新函数里你是否想要重新渲染。

* `setState` 回调函数（第二个参数）现在会在 `componentDidMount / componentDidUpdate` 之后立刻触发，而非等到所有组件都已渲染。

* 当使用 `<B />` 来替换 `<A />`，`B.componentWillMount` 现在会在 `A.componentWillUnmount` 之前触发。之前，在某些情况下，`A.componentWillUnmount` 会立刻触发。

## JavaScript环境要求

`React 16` 依赖于集合类型 `Map` 和 `Set`。若你要支持老式的可能未提供原生支持的浏览器和设备（例如 IE < 11），考虑在你的应用库中包含一个全局的 `polyfill`，例如 `core-js` 或 `babel-polyfill`。

一个使用 core-js 支持老版浏览器的 React 16 polyfill 环境大致如下：

```javascript
import 'core-js/es6/map';
import 'core-js/es6/set';

import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```