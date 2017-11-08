---
title: Redux 笔记
date: 2017-05-31 15:13:16
tags: 
    - Redux
    - React
---

# 介绍

## 动机
`JavaScript` 需要更多的 `state`，`Redux` 试图让 `state` 的变化变得可预测。

## 三大原则

### 单一数据源

整个应用的 `state` 被储存在一棵 `object tree` 中，并且这个 `object tree` 只存在于唯一一个 `store` 中

### State 是只读的

惟一改变 `state` 的方法就是触发 `action`，`action`(表达想要修改的意图) 是一个用于描述已发生事件的普通对象。

### 使用纯函数来执行修改

为了描述 `action` 如何改变 `state tree` ，你需要编写 `reducers`。

Reducer 只是一些纯函数，它接收先前的 state 和 action，并返回新的 state。

# 基础
## Action

Action 是把数据从应用传到 store 的有效载荷。它是 store 数据的唯一来源。一般来说你会通过 store.dispatch() 将 action 传到 store。

Action 本质上是 JavaScript 普通对象。我们约定，action 内必须使用一个字符串类型的 type 字段来表示将要执行的动作。

例如：
```
{
  type: ADD_TODO,
  text: 'Build my first Redux app'
}
```
action 对象的结构完全由自己决定，但是为了多人合作方便，最好遵循一定的标准 [Flux 标准 Action](https://github.com/acdlite/flux-standard-action)

`store` 里能直接通过 `store.dispatch()` 调用 `dispatch()`

但是多数情况下你会使用 [`react-redux`](http://github.com/gaearon/react-redux) 提供的 `connect()` 帮助器来调用。[`bindActionCreators()`](http://www.redux.org.cn/docs/api/bindActionCreators.html) 可以自动把多个 `action` 创建函数 绑定到 `dispatch()` 方法上。

## Reducer

### 处理 action

`reducer` 就是一个纯函数，接收旧的 `state` 和 `action`，返回新的 `state`。持 reducer 纯净非常重要。永远不要在 reducer 里做这些操作：

* 修改传入参数
* 执行有副作用的操作，如 API 请求和路由跳转
* 调用非纯函数，如 Date.now() 或 Math.random()

建议你尽可能地把 `state` 范式化，不存在嵌套。把应用的 `state` 想像成数据库。只要传入参数相同，返回计算得到的下一个 `state` 就一定相同。没有特殊情况、没有副作用，没有 `API` 请求、没有变量修改，单纯执行计算。

**注意:**
* 不要修改 `state`，使用 `Object.assign()` 新建了一个副本。不能这样使用 `Object.assign(state, { visibilityFilter: action.filter })`，因为它会改变第一个参数的值。你必须把第一个参数设置为空对象。你也可以开启对ES7提案对象展开运算符的支持, 从而使用 `{ ...state, ...newState }` 达到相同的目的。
* 在 `default` 情况下返回旧的 `state`

### 拆分 Reducer

`Redux` 提供了 `combineReducers()` 工具类来合并拆分的 `Reducer`

## Store
**Redux 应用只有一个单一的 store**

Store 就是把 `Action`，`Reducer` 联系到一起的对象。Store 有以下职责：
* 维持应用的 state；
* 提供 getState() 方法获取 state；
* 提供 dispatch(action) 方法更新 state；
* 通过 subscribe(listener) 注册监听器;
* 通过 subscribe(listener) 返回的函数注销监听器。

`createStore()` 的第二个参数是可选的, 用于设置 `state` 初始状态。

## 数据流

**严格的单向数据流**是 Redux 架构的设计核心。

Redux 应用中数据的生命周期遵循下面 4 个步骤：

1. 调用 `store.dispatch(action)`
2. `Redux store` 调用传入的 `reducer` 函数。

	Store 会把两个参数传入 reducer： 当前的 state 树和 action。
3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
4. Redux store 保存了根 reducer 返回的完整 state 树。 

## 搭配 React

### 安装 React Redux

Redux 默认并不包含 React 绑定库，需要单独安装。
```
npm install --save react-redux
```

###  connect() 
我们想要通过 `react-redux` 提供的 `connect()` 方法将包装好的组件连接到 `Redux`。尽量只做一个顶层的组件，或者 `route` 处理。从技术上来说你可以将应用中的任何一个组件 `connect()` 到 `Redux store` 中，但尽量避免这么做，因为这个数据流很难追踪。

**任何一个从 `connect()` 包装好的组件都可以得到一个 `dispatch` 方法作为组件的 `props`，以及得到全局 `state` 中所需的任何内容。**`connect()` 的唯一参数是 **`selector`**。此方法可以从 `Redux store` 接收到全局的 `state`，然后返回组件中需要的 `props`。最简单的情况下，可以返回一个初始的 `state` （例如，返回认证方法），但最好先将其进行转化。

`selector`  的作用就是为 `React Components` 构造适合自己需要的状态视图。是一个自定义函数，selector 的实现完全是自定义函数

```
import { connect } from 'react-redux';
...

class App extends Component {
  render() {
    // 通过调用 connect() 注入:
    const { dispatch, visibleTodos, visibilityFilter } = this.props
    return (
      ...
    )
  }
}

App.propTypes = {
	...
}

// 基于全局 state ，哪些是我们想注入的 props ?
// 注意：使用 https://github.com/reactjs/reselect 效果更佳。
function select(state) {
  return {
    visibilityFilter: state.visibilityFilter
  };
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(select)(App);
```

`reselect` 这个项目提供了带 `cache` 功能的 `selector`。如果  `Store/State` 和构造 `view` 的参数没有变化，那么每次 `Component` 获取的数据都将来自于上次调用/计算的结果。得益于 `Store/State Immutable` 的本质，状态变化的检测是非常高效的。

# 高级

## 异步Action

当调用异步 API 时，有两个非常关键的时刻：发起请求的时刻，和接收到响应的时刻 （也可能是超时）。

这两个时刻都可能会更改应用的 state；为此，你需要 dispatch 普通的同步 action。一般情况下，每个 API 请求都需要 dispatch 至少三种 action：

1. 一种通知 reducer 请求开始的 action。

	对于这种 action，reducer 可能会切换一下 state 中的 isFetching 标记。以此来告诉 UI 来显示进度条。

2. 一种通知 reducer 请求成功结束的 action。

	对于这种 action，reducer 可能会把接收到的新数据合并到 state 中，并重置 isFetching。UI 则会隐藏进度条，并显示接收到的数据。

3. 一种通知 reducer 请求失败的 action。

	对于这种 action，reducer 可能会重置 isFetching。或者，有些 reducer 会保存这些失败信息，并在 UI 里显示出来。

为了区分这三种 action，可能在 action 里添加一个专门的 status 字段作为标记位：

```
{ type: 'FETCH_POSTS' }
{ type: 'FETCH_POSTS', status: 'error', error: 'Oops' }
{ type: 'FETCH_POSTS', status: 'success', response: { ... } }
```
又或者为它们定义不同的 type：
```
{ type: 'FETCH_POSTS_REQUEST' }
{ type: 'FETCH_POSTS_FAILURE', error: 'Oops' }
{ type: 'FETCH_POSTS_SUCCESS', response: { ... } }
```

## 异步 Action Creator
如何把之前定义的同步 `action creator` 和 网络请求结合起来呢？标准的做法是使用 `Redux Thunk middleware`。要引入 `redux-thunk` 这个专门的库才能使用。

```
import fetch from 'isomorphic-fetch'

export const REQUEST_POSTS = 'REQUEST_POSTS'
function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'
function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

// 来看一下我们写的第一个 thunk action creator！
// 虽然内部操作不同，你可以像其它 action creator 一样使用它：
// store.dispatch(fetchPosts('reactjs'))

export function fetchPosts(subreddit) {

  // Thunk middleware 知道如何处理函数。
  // 这里把 dispatch 方法通过参数的形式传给函数，
  // 以此来让它自己也能 dispatch action。

  return function (dispatch) {

    // 首次 dispatch：更新应用的 state 来通知
    // API 请求发起了。

    dispatch(requestPosts(subreddit))

    // thunk middleware 调用的函数可以有返回值，
    // 它会被当作 dispatch 方法的返回值传递。

    // 这个案例中，我们返回一个等待处理的 promise。
    // 这并不是 redux middleware 所必须的，但这对于我们而言很方便。

    return fetch(`http://www.subreddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json =>

        // 可以多次 dispatch！
        // 这里，使用 API 请求结果来更新应用的 state。

        dispatch(receivePosts(subreddit, json))
      )

      // 在实际应用中，还需要
      // 捕获网络请求的异常。
  }
}
```

本示例使用了 `fetch API`。它是替代 `XMLHttpRequest` 用来发送网络请求的非常新的 API。由于目前大多数浏览器原生还不支持它，建议你使用 `isomorphic-fetch` 库：

在底层，它在浏览器端使用 `whatwg-fetch` `polyfill`，在服务器端使用 `node-fetch`，所以如果当你把应用改成同构时，并不需要改变 API 请求。