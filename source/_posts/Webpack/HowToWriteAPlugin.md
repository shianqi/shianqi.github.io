---
title: 编写一个 Webpack 插件
date: 2017-09-11 14:35:44
tags:
    - Webpack
---

# 组成

* 先写一个 JavaScript 构造函数
* 在构造函数的原型上添加 `apply` 方法，传入 `compiler`
* 在传入的 `compiler` 上挂载钩子事件。
* 钩子函数中传入 `compilation` 和一个回调函数。
* 功能完成后调用 webpack 提供的回调函数。

```javascript
// 命名函数
function MyExampleWebpackPlugin() {

};

// 在它的 prototype 上定义一个 `apply` 方法。
MyExampleWebpackPlugin.prototype.apply = function(compiler) {
  // 指定挂载的webpack事件钩子。
  compiler.plugin('webpacksEventHook', function(compilation /* 处理webpack内部实例的特定数据。*/, callback) {
    console.log("This is an example plugin!!!");

    // 功能完成后调用webpack提供的回调。
    callback();
  });
};
```

## compiler

`compiler` 对象代表了完整的 `webpack` 环境配置。这个对象在启动 `webpack` 时被一次性建立，并在所有可操作的设置中被配置，包括原始配置，`loader` 和插件。当在 `webpack` 环境中应用一个插件时，插件将收到一个编译器对象的引用。可以使用它来访问 `webpack` 的主环境。

## compilation

Compilation 实例继承于 compiler, `compilation` 对象代表了一次单一的版本构建和生成资源。当运行 `webpack` 开发环境中间件时，每当检测到一个文件变化，一次新的编译将被创建，从而生成一组新的编译资源。一个编译对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。编译对象也提供了很多关键点回调供插件做自定义处理时选择使用。

```javascript
{
    "errors":[], //错误字符串的数组
    "warnings":[],  //警告字符串的数组
    "version":"1.3.7", // 用来编译的 webpack 的版本
    "hash":"b4806b1be53e47fbab31", // 编译使用的 hash
    "time":3080, // 编译耗时 (ms)
    "assetsByChunkName":{
        // 用作映射的 chunk 的名称
        "main":"b4806b1be53e47fbab31.js"
    },
    "assets":[
        // asset 对象 (asset objects) 的数组
        {
            "name":"59e68da5e8cbc0ba28bd706801d425ba.jpg",
            "size":672,
            "chunks":[],
            "chunkNames":[],
            "emitted":true
        },
        {
            "name":"b4806b1be53e47fbab31.js",
            "size":571644,
            "chunks":[0],
            "chunkNames":["main"],
            "emitted":true
        }
    ],
    "chunks":[
        // chunk 对象 (chunk objects) 的数组
        {
            "id":0,
            "rendered":true,
            "initial":true,
            "entry":true,
            "size":539740,
            "names":["main"],
            "files":["b4806b1be53e47fbab31.js"],
            "parents":[],
            "origins":[
                {
                    "moduleId":0,
                    "module":"...",
                    "moduleIdentifier":"...",
                    "moduleName":"./app/entry.js",
                    "loc":"",
                    "name":"main",
                    "reasons":[

                    ]
                }
            ]
        }
    ],
    "modules":[
        // 模块对象 (module objects) 的数组
    ],
    "children":[]
}
```

### Asset对象
每一个 `assets` 对象都表示一个编译出的 `output` 文件。 `assets` 都会有一个共同的结构:
```javascript
{
  "entry": true, // 表示这个 chunk 是否包含 webpack 的运行时
  "files": [
    // 一个包含这个 chunk 的文件名的数组
  ],
  "filteredModules": 0, // 当 `exclude`传入`toJson` 函数时，统计被无视的模块的数量
  "id": 0, // 这个 chunk 的id
  "initial": true, // 表示这个 chunk 是开始就要加载还是 懒加载(lazy-loading)
  "modules": [
    // 模块对象 (module objects)的数组
    "web.js?h=11593e3b3ac85436984a"
  ],
  "names": [
    // 包含在这个 chunk 内的 chunk 的名字的数组
  ],
  "origins": [
    // 下文详述
  ],
  "parents": [], // 父 chunk 的 ids
  "rendered": true, // 表示这个 chunk 是否会参与进编译
  "size": 188057 // chunk 的大小(byte)
}
```

### Chunk对象
每一个 chunks 表示一组称为 chunk 的模块。每一个对象都满足以下的结构。
```javascript
{
  "entry": true, // 表示这个 chunk 是否包含 webpack 的运行时
  "files": [
    // 一个包含这个 chunk 的文件名的数组
  ],
  "filteredModules": 0, // 见上文的 结构
  "id": 0, // 这个 chunk 的id
  "initial": true, // 表示这个 chunk 是开始就要加载还是 懒加载(lazy-loading)
  "modules": [
    // 模块对象 (module objects)的数组
    "web.js?h=11593e3b3ac85436984a"
  ],
  "names": [
    // 包含在这个 chunk 内的 chunk 的名字的数组
  ],
  "origins": [
    // 下文详述
  ],
  "parents": [], // 父 chunk 的 ids
  "rendered": true, // 表示这个 chunk 是否会参与进编译
  "size": 188057 // chunk 的大小(byte)
}
```

### 模块对象
缺少了对实际参与进编译的模块的描述，这些数据又有什么意义呢。每一个在依赖图表中的模块都可以表示成以下的形式。
```javascript
{
  "assets": [
    // asset对象 (asset objects)的数组
  ],
  "built": true, // 表示这个模块会参与 Loaders , 解析, 并被编译
  "cacheable": true, // 表示这个模块是否会被缓存
  "chunks": [
    // 包含这个模块的 chunks 的 id
  ],
  "errors": 0, // 处理这个模块发现的错误的数量
  "failed": false, // 编译是否失败
  "id": 0, // 这个模块的ID (类似于 `module.id`)
  "identifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // webpack内部使用的唯一的标识
  "name": "./lib/index.web.js", // 实际文件的地址
  "optional": false, // 每一个对这个模块的请求都会包裹在 `try... catch` 内 (与ESM无关)
  "prefetched": false, // 表示这个模块是否会被 prefetched
  "profile": {
    // 有关 `--profile` flag 的这个模块特有的编译数据 (ms)
    "building": 73, // 载入和解析
    "dependencies": 242, // 编译依赖
    "factory": 11 // 解决依赖
  },
  "reasons": [
    // 见下文描述
  ],
  "size": 3593, // 预估模块的大小 (byte)
  "source": "// Should not break it...\r\nif(typeof...", // 字符串化的输入
  "warnings": 0 // 处理模块时警告的数量
}
```
每一个模块都包含一个 理由 (reasons) 对象，这个对象描述了这个模块被加入依赖图表的理由。每一个 理由 (reasons) 都类似于上文 chunk objects中的 来源 (origins):
```javascript
{
  "loc": "33:24-93", // 导致这个被加入依赖图标的代码行数
  "module": "./lib/index.web.js", // 所基于模块的相对地址 context
  "moduleId": 0, // 模块的 ID
  "moduleIdentifier": "(webpack)\\test\\browsertest\\lib\\index.web.js", // 模块的地址
  "moduleName": "./lib/index.web.js", // 可读性更好的模块名称 (用于 "更好的打印 (pretty-printing)")
  "type": "require.context", // 使用的请求的种类 (type of request)
  "userRequest": "../../cases" // 用来 `import` 或者 `require` 的源字符串
}
```

### 错误与警告
错误 (errors) 和 警告 (warnings) 会包含一个字符串数组。每个字符串包含了信息和栈的追溯:
