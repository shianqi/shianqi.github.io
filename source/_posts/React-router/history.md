---
title: react-router history 
date: 2017-06-11 10:57:56
tags: 
    - React
    - React-router
---

# histroy 属性
Router组件的history属性，用来监听浏览器地址栏的变化，并将URL解析成一个地址对象，供 `React Router` 匹配。
history属性，一共可以设置三种值。
* `browserHistory`
* `hashHistory`
* `createMemoryHistory`
如果设为 `hashHistory`，路由将通过URL的hash部分（#）切换，URL的形式类似 `example.com/#/some/path`。
```
import { hashHistory } from 'react-router'

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
```
如果设为 `browserHistory`，浏览器的路由就不再通过Hash完成了，而显示正常的路径 `example.com/some/path`，背后调用的是浏览器的 `History API`。
```
import { browserHistory } from 'react-router'

render(
  <Router history={browserHistory} routes={routes} />,
  document.getElementById('app')
)
```
但是，这种情况需要对服务器改造。否则用户直接向服务器请求某个子路由，会显示网页找不到的404错误。
如果开发服务器使用的是 `webpack-dev-server`，加上 `--history-api-fallback`参数就可以了。

```
$ webpack-dev-server --inline --content-base . --history-api-fallback
```
或者在 `webpack.config.js` 配置
```
    devServer: {
        historyApiFallback: true,
    },
```
createMemoryHistory主要用于服务器渲染。它创建一个内存中的history对象，不与浏览器URL互动。

```
const history = createMemoryHistory(location)
```