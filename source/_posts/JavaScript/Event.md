---
title: JavaScript 事件捕获和冒泡
date: 2016-09-04 13:30:44
tags:
    - JavaScript
---

## 规范
在最新的 DOM 规范中，事件的捕获与冒泡是通过 `addEventListener(...arg)` 的第三个参数的 `capture`来指定的。默认为 `false`,也就是默认冒泡。
```
addEventListener(type, listener, {
    capture: false,
    passive: false,
    once: false
})
```

[addEventListener 第三个参数](https://shianqi.github.io/2017/05/24/JavaScript/Touch_Passive/)

## 触发规则
![event](./Event/Event.png)

在多个嵌套情况下，捕获的触发是从外到内的，冒泡则相反。先进行捕获，然后是冒泡。

**这里要注意一点，在最后的一层中，先触发冒泡或捕获决定于代码中出现的先后，先出现的先执行。**

**不是所有的事件都能冒泡，例如：`blur`、`focus`、`load`、`unload`**

## DOM事件流
同时支持两种事件模型：捕获型事件和冒泡型事件，但是，捕获型事件先发生。两种事件流会触及DOM中的所有对象，从document对象开始，也在document对象结束。

DOM事件模型最独特的性质是，文本节点也触发事件

## 绑定事件方式
在一个支持W3C DOM的浏览器中，像这样一般的绑定事件方式，是采用的**事件冒泡**方式。

```javascript
ele.onclick = ()=>{
    //doSomething
}
```

## IE浏览器
IE只支持事件冒泡，不支持事件捕获，它也不支持 `addEventListener` 函数，不会用第三个参数来表示是冒泡还是捕获，它提供了另一个函数 `attachEvent`。
```javascript
ele.attachEvent("onclick", ()=>{
    //doSomething
});
```

## 阻止事件传播：
* 在W3c中，使用 `stopPropagation()` 方法
* 在IE下设置 `cancelBubble = true`
在捕获的过程中 `stopPropagation();` 后，后面的冒泡过程也不会发生了

## 阻止事件的默认行为
* 在W3c中，使用 `preventDefault();` 方法；
* 在IE下设置 `window.event.returnValue = false;`
