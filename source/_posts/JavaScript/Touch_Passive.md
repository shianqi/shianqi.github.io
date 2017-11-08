---
title: addEventListener passive 属性
date: 2017-05-24 21:56:14
tags: 
    - JavaScript
---
**如果不阻止默认行为，使用 `{passive: true}` 能够有效的增加流畅度**


## passive 的事件监听器
很久以前，`addEventListener()` 的参数约定是这样的：
```
addEventListener(type, listener, useCapture)
```
后来，最后一个参数，也就是控制监听器是在捕获阶段执行还是在冒泡阶段执行的 `useCapture` 参数，变成了可选参数（传 true 的情况太少了）：

```
addEventListener(type, listener[, useCapture ])
```
2015 年底，DOM 规范做了修订：`addEventListener()` 的第三个参数可以是个对象值了，也就是说第三个参数现在可以是两种类型的值了：

```
addEventListener(type, listener[, useCapture ])
addEventListener(type, listener[, options ])
```
这个修订是为了扩展新的选项，从而自定义更多的行为，目前规范中 `options` 对象可用的属性有三个：
```
addEventListener(type, listener, {
    capture: false,
    passive: false,
    once: false
})
```
三个属性都是布尔类型，默认值都为 `false`。

1. `capture` 属性等价于以前的 `useCapture` 参数
2. `once` 属性就是表明该监听器是一次性的，执行一次后就被自动 `removeEventListener` 掉，还没有浏览器实现它；
3. `passive` 属性 Firefox 和 Chrome 已经实现

浏览器无法预先知道一个监听器会不会调用 `preventDefault()`，它能做的只有等监听器执行完后再去执行默认行为，而监听器执行是要耗时的，有些甚至耗时很明显，这样就会导致页面卡顿。视频里也说了，即便监听器是个空函数，也会产生一定的卡顿，毕竟空函数的执行也会耗时。

有 80% 的滚动事件监听器是不会阻止默认行为的，也就是说大部分情况下，浏览器是白等了。所以，`passive` 监听器诞生了，`passive` 的意思是“顺从的”，表示它不会对事件的默认行为说 no，浏览器知道了一个监听器是 `passive` 的，它就可以在两个线程里同时执行监听器中的 `JavaScript` 代码和浏览器的默认行为了。

**如果不阻止默认行为，使用 `{passive: true}` 能够有效的增加流畅度**

假如不小心在 `passive` 的监听器里调用了 `preventDefault()`，也无妨，因为 `preventDefault()` 不会产生任何效果，但开发者工具会发出警告。

Chrome 发现耗时超过 100 毫秒的非 `passive` 的监听器，警告你加上 `{passive: true}`


## 何时调用 removeEventListener
第三个参数是布尔值的时候，`addEventListener("foo", listener, true)` 添加的监听器，必须用 `removeEventListener("foo", listener, true)` 才能删除掉。因为这个监听器也有可能还注册在了冒泡阶段，那样的话，同一个监听器实际上对应着两个监听器对象

* 如果要移除事件句柄，addEventListener() 的执行函数必须使用外部函数
* 类似 `document.removeEventListener("event", function(){ myScript });` 该事件是无法移除的。

```
var div1 = document.getElementById("div1");

function listener(e){
	console.log("div listener")
}

div1.addEventListener('mousedown', listener, true);

div1.removeEventListener("mousedown", listener, true);
```
那现在 `addEventListener("foo", listener, {passive: true})` 添加的监听器只要 `removeEventListener("foo", listener)` 就可以了

所以说在 removeEventListener 的时候永远不需写 passive 和 once，但 capture 可能要

