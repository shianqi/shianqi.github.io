---
title: 函数式编程--蹦床
date: 2018-03-04 08:55:18
tags: 
    - Functional
---
# Trampoline 解决 Blowing the stack

用过 JavaScript 的人都知道，JavaScript 引擎没有对递归调用优化。因此，当运行下面的代码时：

```javascript
const evenSteven = (n) => {
  if (n>0) {
    n = n - 1
    return evenSteven(n)
  }
  return 'over';
}

console.log(evenSteven(1000000))
```

会出现如下错误（blowing the stack）：

```text
RangeError: Maximum call stack size exceeded
```

要解决这个问题我们可以返回一个函数，它包装调用，而不是直接调用。

```javascript
const evenSteven = (n) => {
  if (n > 0) {
    n = n - 1
    return () => {
      return evenSteven(n)
    }
  }
  return 'over';
}

console.log(evenSteven(0))
// over
console.log(evenSteven(1))
// [Function]
console.log(evenSteven(2))
// [Function]
```

这样，我们通过不断调用返回的函数就可以解决栈溢出的问题。

并且我们可以通过一个函数自动来进行 `扁平化处理`。

```JavaScript
const _ = require('lodash')

const trampoline = (func) => {
  let res = func()
  while (_.isFunction(res)) {
    res = res()
  }
  return res
}

console.log(trampoline(evenSteven(1000000)))
// over
```

由于调用链的间歇性，使用蹦床增加了递归开销。然而，慢总比栈溢出好。

我们还可以进行一次包装，将蹦床隐藏在内。

```javascript
const func = (n) => {
  return trampoline(evenSteven(n))
}
```