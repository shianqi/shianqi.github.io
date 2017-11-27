---
title: JavaScript 运行机制
date: 2017-11-27 12:54:16
tags: 
    - JavaScript
---
# JavaScript 运行机制

## 事件循环

![事件循环](http://cdn.shianqi.com/20171126230612_rKQKQd_Screenshot.png)

* 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入 `Event Table` 并注册函数。
* 当指定的事情完成时，`Event Table` 会将这个函数移入 `Event Queue`。
* 主线程内的任务执行完毕为空，会去 `Event Queue` 读取对应的函数，进入主线程执行。
* 上述过程会不断重复，也就是常说的 `Event Loop` (事件循环)。

## 宏任务与微任务

* `macro-task` (宏任务)：包括整体代码 `script`，`setTimeout`，`setInterval`
* `micro-task`(微任务)：`Promise`，`process.nextTick`

不同类型的任务会进入对应的 `Event Queue`，比如 `setTimeout` 和 `setInterval` 会进入相同的 `Event Queue`。

![宏任务与微任务](http://cdn.shianqi.com/20171126231323_oeLxNy_Screenshot.png)