---
title: Mocha 基本用法
date: 2017-05-29 10:39:44
tags: 
    - Mocha
---

## 安装
```
$ npm install --global mocha
```

## 例子
```
var add = require('./add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```

`describe` 块称为"测试套件"，表示一组相关的测试。可以嵌套多层。

`it` 块称为"测试用例"，表示一个单独的测试，是测试的最小单位

通常，测试脚本与所要测试的源码脚本同名，但是后缀名为 `.test.js` （表示测试）或者 `.spec.js` （表示规格）

## 断言库
`Mocha` 本身不带断言库，所以必须先引入断言库。上面代码引入的断言库是 `chai`，并且指定使用它的 `expect` 断言风格。

```
// 相等或不相等
expect(4 + 5).to.be.equal(9);
expect(4 + 5).to.be.not.equal(10);
expect(foo).to.be.deep.equal({ bar: 'baz' });

// 布尔值为true
expect('everthing').to.be.ok;
expect(false).to.not.be.ok;

// typeof
expect('test').to.be.a('string');
expect({ foo: 'bar' }).to.be.an('object');
expect(foo).to.be.an.instanceof(Foo);

// include
expect([1,2,3]).to.include(2);
expect('foobar').to.contain('foo');
expect({ foo: 'bar', hello: 'universe' }).to.include.keys('foo');

// empty
expect([]).to.be.empty;
expect('').to.be.empty;
expect({}).to.be.empty;

// match
expect('foobar').to.match(/^foo/);
```

## 参数

#### `--recursive`

`Mocha` 默认只执行 `test` 子目录下面第一层的测试用例，不会执行更下层的用例。

为了改变这种行为，就必须加上 `--recursive` 参数
```
mocha --recursive
```
#### `--watch，-w`
视指定的测试脚本。只要测试脚本有变化，就会自动运行Mocha

## 配置文件 `mocha.opts`
`Mocha` 允许在test目录下面，放置配置文件 `mocha.opts`，把命令行参数写在里面。

然后，把这参数写入test目录下的mocha.opts文件。
```
--reporter tap
--recursive
--growl
```
然后，执行 `mocha` 就能取得一样的效果。

## ES6 测试
如果测试脚本是用ES6写的，那么运行测试之前，需要先用Babel转码。
```
import add from '../src/add.js';
import chai from 'chai';

let expect = chai.expect;

describe('加法函数的测试', function() {
  it('1 加 1 应该等于 2', function() {
    expect(add(1, 1)).to.be.equal(2);
  });
});
```
ES6转码，需要安装Babel。
```
$ npm install babel-core babel-preset-es2015 --save-dev
```

然后，在项目目录下面，新建一个 `.babelrc` 配置文件。

```

{
  "presets": [ "es2015" ]
}
```
最后，使用 `--compilers` 参数指定测试脚本的转码器。

```
mocha --compilers js:babel-core/register
```

Babel默认不会对Iterator、Generator、Promise、Map、Set等全局对象，以及一些全局对象的方法（比如Object.assign）转码。如果你想要对这些对象转码，就要安装babel-polyfill。

```
$ npm install babel-polyfill --save
```

然后，在你的脚本头部加上一行。
```
import 'babel-polyfill'
```

## 异步测试
`Mocha` 默认每个测试用例最多执行 `2000` 毫秒，如果到时没有得到结果，就报错。对于涉及异步操作的测试用例，这个时间往往是不够的，需要用 `-t` 或 `--timeout` 参数指定超时门槛。

```
it('测试应该5000毫秒后结束', function(done) {
  var x = true;
  var f = function() {
    x = false;
    expect(x).to.be.not.ok;
    done(); // 通知Mocha测试结束
  };
  setTimeout(f, 4000);
});
```

```
$ mocha -t 5000 timeout.test.js
```

## 测试用例的钩子
`Mocha` 在 `describe` 块之中，提供测试用例的四个钩子：  `before()` 、 `after()` 、 `beforeEach()` 和 `afterEach()`。它们会在指定时间执行。

* `before()` 在本区块的所有测试用例之前执行
* `after()` 在本区块的所有测试用例之后执行
* `beforeEach()` 在本区块的每个测试用例之前执行
* `afterEach()` 在本区块的每个测试用例之后执行