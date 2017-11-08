---
title: async/await 的基本用法
date: 2017-04-23 17:30:44
tags: 
    - JavaScript
    - ECMAScript
    - NodeJs
---

## 终极异步方案

JavaScript异步编程一直是一件很麻烦的事，从最早的回调函数，到 Promise 对象，
再到 Generator 函数，每次都有所改进。但总感觉缺点什么。

直到 async/await 出现，很多人认为它是异步操作的终极解决方案。

async 应该会在 ECMAScript 7 引入。在 NodeJs v7.4.0 正式加入 NodeJs 大家庭。

## async 是 Generator 函数的语法糖

```
var fs = require('fs');

var readFile = function (fileName){
    return new Promise(function (resolve, reject){
        fs.readFile(fileName, function(error, data){
            if (error) reject(error);
            resolve(data);
        });
    });
};
```
Generator 写法：
```
var co = require('co');
var gen = function* (){
    var f1 = yield readFile('/etc/fstab');
    var f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
co(gen);
```
写成 async 函数，就像下面这样：
```
var asyncReadFile = async function (){
    var f1 = await readFile('/etc/fstab');
    var f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
};
```

其实就是把 * 替换成 async ，把 yield 换成 await。而且自带执行器
（Generator 函数的执行必须依靠执行器，所以才有了 co 函数库）。

## async 函数用法
* 同 Generator 函数一样，async 函数返回一个 Promise 对象。
所以调用 async 函数的函数也要处理 Promise 对象。

* 用 try...catch 来处理 Promise 对象 rejected

* await 命令只能用在 async 函数之中，如果用在普通函数，就会报错。

* 将 forEach 方法的参数改成 async 函数不能够实现继发执行。应该采用 for 循环。

* 希望多个请求并发执行，可以使用 Promise.all 方法。