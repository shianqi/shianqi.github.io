---
title: 浏览器JavaScript时间线
date: 2017-07-04 16:51:36
tags:
    - JavaScript
---

# 客户端JavaScript时间线
1. 浏览器创建 `Document` 对象，并开始解析Web页面，解析 `HTML` 元素和它们的文本内容后添加 `Element` 对象和 `Text` 节点套文档中。这个阶段 `document.readyState` 属性的值是 `"loading"`。
2. 当 `HTML` 解释器遇到了没有 `async` 和 `defer` 属性的 `<script>` 元素时，他把这些元素添加到文档中，并且同步执行。在脚本下载（如果需要）和执行时解释器会暂停。这样脚本就可以用 `document.write()` 来把文本插入到输入流中。
3. 当遇到 `async` 属性（**如果 `<script>` 标签同时有 `async` 和 `defer` 属性，会遵从 `async` 并忽略 `defer`**）的 `<script>` 元素时，它开始下载脚本文本，并继续解析文档。脚本会在它下载完成后尽快执行。禁止使用 `document.write()` 方法。
4. 当文档完成解析，`document.readyState` 属性变成 `"interactive"`。
5. 所有带有 `defer` 属性的脚本，会按它们在文档里出现的顺序执行。异步脚本可能也会在这个时间执行。延迟脚本能访问完整的文档树，禁止使用 `document.write()` 方法。
6. 浏览器在 `Document` 对象上触发 `DOMContentLoaded` 事件。这标志着 **程序执行从同步脚本执行阶段转换到了异步事件驱动阶段** 但是，这时可能还有异步脚本没有执行完成。
7. 这时，文档已经完成解析完成，但是浏览器可能还在等待其他内容载入，如图片。当所有这些内容完全载入时，并且所有异步脚本完全载入和执行，`document.readyState` 属性改变为 `complete` ，Web浏览器触发 `window` 对象上的 `load` 事件。
8. 从此刻起，会调用异步事件，以异步响应用户输入事件，网络事件，计时器过期等。


## 文档加载事件
|事件名称|描述|
|---|---|
|`readystatechange`|文档还在加载：`loading`， 文档解析完成：`interactive`， 文档完全加载完成：`complete`|
|`DOMContentLoaded`|程序执行从同步脚本执行阶段转换到了异步事件驱动阶段|
|`load`|所有内容完全载入，所有异步脚本完全载入和执行|

```javascript
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOMContentLoaded')
}, false)

window.addEventListener('load', function(){
    console.log('load')
}, false)

document.onreadystatechange = function(){
    console.log(document.readyState)
}
```
运行结果：
```
interactive
DOMContentLoaded
complete
load
```
