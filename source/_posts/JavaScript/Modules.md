---
title: JavaScript 模块化
date: 2017-04-21 20:10:16
tags: 
    - JavaScript
---

## CommonJS
首先，最先出现的是 `CommonJS`，  `CommonJS API` 定义很多普通应用程序（主要指非浏览器的应用）使用的API。它的终极目标是提供一个类似 `Python`， `Ruby` 和 `Java` 标准库。这样的话，开发者可以使用 `CommonJS API` 编写应用程序，然后这些应用可以运行在不同的 `JavaScript` 解释器和不同的主机环境中。


2009年，美国程序员 `Ryan Dahl` 创造了 `node.js` 项目，将 `javascript` 语言用于服务器端编程。这标志 `Javascript` 模块化编程"正式诞生。

`NodeJS` 是 `CommonJS` 规范的实现， `webpack`  也是以 `CommonJS` 的形式来书写。`NPM` 作为 `Node` 的包管理器，帮助`Node` 解决依赖包的安装问题，也要遵循 `CommonJS`。

#### Browserify
[browserify](http://browserify.org/) 是最常用的 `CommonJS` 转换工具。

然后看个例子
```
// foo.js
module.exports = function(x) {
  console.log(x);
};

// main.js
var foo = require("./foo");
foo("Hi");
```
```
$ browserify main.js > compiled.js
```
即可打包，`Browserify` 具体做了什么继续向下看即可：
```
$ npm install browser-unpack -g
```
然后我们将上面生成的 `compiled.js` 解包。

```
$ browser-unpack < compiled.js

[
  {
    "id":1,
    "source":"module.exports = function(x) {\n  console.log(x);\n};",
    "deps":{}
  },
  {
    "id":2,
    "source":"var foo = require(\"./foo\");\nfoo(\"Hi\");",
    "deps":{"./foo":1},
    "entry":true
  }
]
```
`Browserify` 在这里将所有模块放到一个数组里，`id` 是模块的编号，`source` 是源码，`deps` 为依赖，`entry` 为指定入口。

`Browserify` 先找到 `entry: true` 的地方，然后执行 `source` 中的代码，遇到 `require` 就去`deps` 中寻找依赖，并执行所依赖的代码，将结果赋值给 `require` 前的变量。

## AMD
`AMD` ( Asynchronous Module Definition )，是为了解决 `CommonJS` 不能异步加载的问题。`AMD` 采用异步的方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等加载完成后，这个回调函数才会执行。

`AMD` 也采用 `require()` 语句加载模块，但是不同于 `CommonJS`，它要求两个参数：
```
require([module], callback);
```
第一个参数 `[module]` ，是一个数组，里面的成员就是要加载的模块；第二个参数 `callback` ，则是加载成功之后的回调函数。如果将前面的代码改写成 `AMD` 形式，就是下面这样：

```
require(['math'], function (math) {
　　math.add(2, 3);
});
```
`math.add()` 与 `math` 模块加载不是同步的，浏览器不会发生假死。所以很显然，`AMD` 比较适合浏览器环境。目前，主要有两个 `Javascript` 库实现了 `AMD` 规范： [`require.js`](http://requirejs.org/) 和 [`curl.js`](https://github.com/cujojs/curl)。

#### require.js

先去官方网站[下载](http://requirejs.org/docs/download.html)最新版本。

```
然后将它放到项目中即可
```

如果加载这个文件，也可能造成网页失去响应。解决办法有两个，一个是把它放在网页底部加载，另一个是写成下面这样：
```
<script src="js/require.js" defer async="true" ></script>
```

`async` 属性表明这个文件需要异步加载，避免网页失去响应。IE不支持这个属性，只支持 `defer`，所以把 `defer` 也写上。

加载 `require.js` 以后，下一步就要加载我们自己的代码了。假定我们自己的代码文件是 `main.js` ，也放在 `js` 目录下面。那么，只需要写成下面这样就行了：

```
<script src="js/require.js" data-main="js/main"></script>
```

`data-main` 属性的作用是，指定网页程序的主模块。在上例中，就是js目录下面的 `main.js` ，这个文件会第一个被 `require.js`加载。由于 `require.js` 默认的文件后缀名是js，所以可以把 `main.js` 简写成 `main`。

主模块的写法：
```
// main.js
require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　// some code here
});
```

默认情况下，`require.js` 假定这三个模块与 `main.js` 在同一个目录，文件名分别为 `moduleA.js`，`moduleB.js` 和 `moduleA.js`，然后自动加载。

使用 `require.config()` 方法，我们可以对模块的加载行为进行自定义。`require.config()` 就写在主模块（`main.js`）的头部。参数就是一个对象，这个对象的 `paths` 属性指定各个模块的加载路径。

```
require.config({
　　paths: {
　　　　"jquery": "jquery.min",
　　　　"underscore": "underscore.min",
　　　　"backbone": "backbone.min"
　　}
});
```
#### 模块的写法
模块必须采用特定的 `define()` 函数来定义。如果一个模块不依赖其他模块，那么可以直接定义在 `define()` 函数之中。

```
// math.js
define(function (){
 　var add = function (x,y){
　　　　return x+y;
　　};
　　return {
　　　　add: add
　　};
});
```

## ES6 module
ES6发布的 `module` 并没有直接采用 `CommonJS` ，甚至连 `require` 都没有采用，也就是说 `require` 仍然只是 `node` 的一个私有的全局方法，`module.exports` 也只是 `node` 私有的一个全局变量属性，跟标准半毛钱关系都没有。

[export 详细用法](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/export)
[import 详细用法](https://developer.mozilla.org/en/docs/web/javascript/reference/statements/import)

## 区别

`require` 的使用非常简单，它相当于 `module.exports` 的传送门，`module.exports` 后面的内容是什么，`require` 的结果就是什么，对象、数字、字符串、函数……再把 `require` 的结果赋值给某个变量，相当于把 `require` 和 `module.exports` 进行平行空间的位置重叠，而且 `require` 理论上可以运用在代码的任何地方，甚至不需要赋值给某个变量之后再使用。在使用时，完全可以忽略模块化这个概念来使用 `require`，仅仅把它当做一个 `node` 内置的全局函数，它的参数甚至可以是表达式：

但是 `import` 则不同，它是编译时的（`require`是运行时的），它必须放在文件开头，而且使用格式也是确定的，不容置疑。它不会将整个模块运行后赋值给某个变量，而是只选择 `import` 的接口进行编译，这样在性能上比 `require` 好很多。

从理解上，`require` 是赋值过程，`import` 是解构过程，当然，`require` 也可以将结果解构赋值给一组变量，但是 `import` 在遇到 `default` 时，和 `require` 则完全不同： `var $ = require('jquery');`  和 `import $ from 'jquery'` 是完全不同的两种概念。