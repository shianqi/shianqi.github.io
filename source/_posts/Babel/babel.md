---
title: 深入了解 Babel
date: 2017-9-23 11:31:44
tags:
    - webpack
    - babel
---
# 深入了解 Babel

本文所研究的是 `babel 6` 版本。
`babel 6` 是 `2015年10月30号` 发布，主要做了以下更新：

* 拆分成几个核心包，babel-core,babel-node,babel-cli...
* 没有了默认的转换，现在你需要手动的添加 plugin。也就是插件化
* 添加了 preset，也就是预置条件。
* 增加了 .babelrc 文件，方便自定义的配置。

## 包

`babel` 中有很多包，必须弄明白这些是干嘛的，才能让我们更好的使用这个工具。

* `babel-core`
* `babel-cli`
* `babel-external-helpers`
* `babel-node`
* `babel-register`
* `babel-runtime`
* `babel-polyfill`

### babel-core

`babel` 的核心包，包括核心 `api`，比如 `transform`，主要是处理转码的。 它会把我们的 `js` 代码，抽象成 `ast`，即 `abstract syntax tree` 的缩写，是源代码的抽象语法结构的树状表现形式。

主要 `API`：

```javascript
var babel = require('babel-core');
var transform = babel.transform;
```

```javascript
// babel.transform(code: string, options?: Object)
transform("code", options) // => { code, map, ast }
```

```javascript
// babel.transformFile(filename: string, options?: Object, callback: Function)
var path = require('path');
var result = babel.transformFileSync(
    path.resolve(__dirname, './test.js'),
    {
        presets: ['env'],
        plugins: ['transform-runtime'],
    },
    function(err, result) {// { code, map, ast }
        console.log(result);
    });
```

```javascript
// babel.transformFileSync(filename: string, options?: Object)
var result = babel.transformFileSync(
    path.resolve(__dirname, './test.js'),
    {
        presets: ['env'],
        plugins: ['transform-runtime'],
    }
);
```

```javascript
// babel.transformFromAst(ast: Object, code?: string, options?: Object)
// 把 ast 传入，解析为 code 代码
```

### babel-cli

提供命令行运行 `babel`

### babel-external-helpers

`babel-cli` 中的一个 `command`，用来生成 `helper` 函数。

`babel` 有很多辅助函数，例如 `toArray` 函数， `jsx` 转化函数。这些函数是 `babel transform` 的时候用的，都放在 `babel-helpers` 这个包中。如果 `babel` 编译的时候检测到某个文件需要这些 `helpers`，在编译成模块的时候，会放到模块的顶部。

但是如果多个文件都需要提供，会重复引用这些 `helpers`，会导致每一个模块都定义一份，代码冗余。所以 `babel` 提供了这个命令，用于生成一个包含了所有 `helpers` 的 js 文件，用于直接引用。然后再通过一个 `plugin`，去检测全局下是否存在这个模块，存在就不需要重新定义了。

使用:

1. 执行 `babel-external-helpers` 生成 `helpers.js` 文件

    ```bash
    node_modules/.bin/babel-external-helpers > helpers.js
    ```

1. 安装 plugin

    ```bash
    npm install --save-dev babel-plugin-external-helpers
    ```

1. 然后在 babel 的配置文件加入

    ```json
    {
        "plugins": ["external-helpers"]
    }
    ```

1. 入口文件引入 helpers.js

    ```javascript
    require('./helpers.js');
    ```

如果使用了 `transform-runtime`，就不需要生成 `helpers.js` 文件了，这个在后面的 `babel-runtime` 再说。

### babel-node

也是 `babel-cli` 下面的一个 `command`，主要是实现了 `node` 执行脚本和命令行写代码的能力。

### babel-register

通过改写 `node` 本身的 `require`，添加钩子，然后在 `require` 其他模块的时候，就会触发 `babel` 编译。也就是你引入 `require('babel-register')` 的文件代码，是不会被编译的。只有通过 `require` 引入的其他代码才会。

```bash
npm install babel-register --save-dev
```

```javascript
require('babel-register')({ presets: ['react'] });
require('./test')
```

它的特点就是实时编译，不需要输出文件，执行的时候再去编译。所以它很适用于开发。总结一下就是，多用在 `node` 跑程序，做实时编译用的，通常会结合其他插件作编译器使用，比如 `mocha` 做测试的时候。

### babel-runtime

```bash
npm install babel-runtime --save
```

`Babel` 转译后的代码要实现源代码同样的功能需要借助一些帮助函数。可能会重复出现在一些模块里，导致编译后的代码体积变大。`Babel` 为了解决这个问题，提供了单独的包 `babel-runtime` 供编译模块复用工具函数。（`core-js` 和 `regenerator`）

启用插件 `babel-plugin-transform-runtime` 后，`Babel` 就会使用 `babel-runtime` 下的工具函数，转译代码如下：

```javascript
'use strict';
// 之前的 _defineProperty 函数已经作为公共模块 `babel-runtime/helpers/defineProperty` 使用
var _defineProperty2 = require('babel-runtime/helpers/defineProperty');
var _defineProperty3 = _interopRequireDefault(_defineProperty2);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = (0, _defineProperty3.default)({}, 'name', 'JavaScript');
```

除此之外，`babel` 还为源代码的非实例方法（Object.assign，实例方法是类似这样的 "foobar".includes("foo")）和 `babel-runtime/helps` 下的工具函数自动引用了 `polyfill`。这样可以避免污染全局命名空间，非常适合于 `JavaScript` 库和工具包的实现。例如 `const obj = {}, Object.assign(obj, { age: 30 });` 转译后的代码如下所示：

```javascript
'use strict';
// 使用了 core-js 提供的 assign
var _assign = require('babel-runtime/core-js/object/assign');
var _assign2 = _interopRequireDefault(_assign);
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var obj = {};
(0, _assign2.default)(obj, {
  age: 30
});
```

**babel-runtime 适合 `JavaScript` 库和工具包实现**

* 避免 babel 编译的工具函数在每个模块里重复出现，减小库和工具包的体积；
* 在没有使用 babel-runtime 之前，库和工具包一般不会直接引入 polyfill。否则像 Promise 这样的全局对象会污染全局命名空间，这就要求库的使用者自己提供 polyfill。这些 polyfill 一般在库和工具的使用说明中会提到，比如很多库都会有要求提供 es5 的 polyfill。在使用 babel-runtime 后，库和工具只要在 package.json 中增加依赖 babel-runtime，交给 babel-runtime 去引入 polyfill 就行了；

#### core-js

`core-js` 是用于 `JavaScript` 的组合式标准化库，它包含 `ES5` （e.g: object.freeze）, `ES6` 的 `Promise`，`Symbols`, `Collections`, `Iterators`, `Typed arrays`， `es7+`提案等等的 `polyfills` 实现。

#### regenerator

它是来自于 facebook 的一个库，链接。主要就是实现了 generator/yeild， async/await。

所以 babel-runtime 是单纯的实现了 core-js 和 regenerator 引入和导出，比如这里是 filter 函数的定义，做了一个中转并处理了 esModule 的兼容。

### babel-polyfill

`Babel` 默认只转换新的 `JavaScript` 语法，而不转换新的 `API`。例如，`Iterator`、`Generator`、`Set`、`Maps`、`Proxy`、`Reflect`、`Symbol`、`Promise` 等全局对象，以及一些定义在全局对象上的方法（比如 `Object.assign`）都不会转译。如果想使用这些新的对象和方法，必须使用 `babel-polyfill`，为当前环境提供一个垫片。

不同于 `babel-runtime` 的是，`babel-polyfill` 是一次性引入你的项目中的，就像是 `React` 包一样，同项目代码一起编译到生产环境。

**注意**: `babel`

#### transform-runtime 和 babel-polyfile 对比

* `babel-polyfill` 是当前环境注入这些 `es6+` 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 `polyfill` 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。

* `transform-runtime` 是利用 `plugin` 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 `babel-runtime` 和 配好 `plugin` 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 `polyfill`，如果只用了一部分，打包完的文件体积对比 `babel-polyfill` 会小很多。而且 `transform-runtime` 不会污染原生的对象，方法，也不会对其他 `polyfill` 产生影响。所以 `transform-runtime` 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 `polyfill` 每个模块都要做重复的工作（检测，替换），虽然 `polyfill` 只是引用，编译效率不够高效。

## plugin

### babel-plugin-transform-runtime

`transform-runtime` 是为了方便使用 `babel-runtime` 的，它会分析我们的 `ast` 中，是否有引用 `babel-rumtime` 中的垫片（通过映射关系），如果有，就会在当前模块顶部插入我们需要的垫片。

另外，它还有几个配置

```json
// 默认值
{
  "plugins": [
    ["transform-runtime", {
      "helpers": true,
      "polyfill": true,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

如果你只需要用 `regenerator`，不需要 `core-js` 里面的 `polyfill` 那你就可以在 `options` 中把 `polyfill` 设为 `false`。`helpers` 设为 `false`，就相当于没有启用 `babel-plugin-external-helpers` 的效果，比如翻译 `async` 的时候，用到了 `asyncToGenerator` 函数，每个文件还会重新定义一下。`moduleName` 的话，就是用到的库，你可以把 `babel-runtime` 换成其他类似的。

## presets

presets 就是 plugins 的组合，你也可以理解为是套餐

* [env](https://babeljs.io/docs/plugins/preset-env/)
* [es2015](https://babeljs.io/docs/plugins/preset-es2015/)
* [react](https://babeljs.io/docs/plugins/preset-react/)
* [lastet](https://babeljs.io/docs/plugins/preset-latest/)
* [stage-x](https://babeljs.io/docs/plugins/#presets-stage-x-experimental-presets-)

`babel-preset-lastet`（包括 es2105，es2016，es2017）跟默认情况下的 `env` 是一样的，也就是说包括 `lastest` 在内，这四个 `presets` 都要被 `babel-preset-env` 代替。即：

### babel-preset-env

它能根据当前的运行环境，自动确定你需要的 `plugins` 和 `polyfills`。通过各个 `es` 标准 `feature` 在不同浏览器以及 `node` 版本的支持情况，再去维护一个 `feature` 跟 `plugins` 之间的映射关系，最终确定需要的 `plugins`。

**注意**: `babel-preset-env` 并不是包括所有的 `babel-preset-es` 和 `babel-preset-stag`，而是所有的 `babel-preset-es` 和 `babel-preset-stag-4`
详情请看[这里](http://2ality.com/2017/02/babel-preset-env.html)

```json
//.babelrc

{
  "presets": [
    [
      "env",
      {
        "targets": { // 配支持的环境
          "browsers": [ // 浏览器
            "last 2 versions",
            "safari >= 7"
          ],
          "node": "current"
        },
        "modules": true,  //设置ES6 模块转译的模块格式 默认是 commonjs
        "debug": true, // debug，编译的时候 console
        "useBuiltIns": false, // 是否开启自动支持 polyfill
        "include": [], // 总是启用哪些 plugins
        "exclude": []  // 强制不启用哪些 plugins，用来防止某些插件被启用
      }
    ]
  ],
  plugins: [
    "transform-react-jsx" //如果是需要支持 jsx 这个东西要单独装一下。
  ]
}
```

#### useBuiltIns

`env` 会自动根据我们的运行环境，去判断需要什么样的 `polyfill`，而且，打包后的代码体积也会大大减小，但是这一切都在使用 `useBuiltIns`，而且需要你安装 `babel-polyfill`，并 `import`。它会启用一个插件，替换你的`import 'babel-polyfill'`，不是整个引入了，而是根据你配置的环境和个人需要单独的引入 `polyfill`。

## 总结

* 具体项目还是需要使用 `babel-polyfill` 配合 `useBuiltIns`，只使用 `babel-runtime` 的话，实例方法不能正常工作（例如 `"foobar".includes("foo")）；`
* `JavaScript` 库和工具可以使用 `babel-runtime` 配合 `babel-plugin-transform-runtime`，在实际项目中使用这些库和工具，需要该项目本身提供 `polyfill`；

参考文献

* [transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/)
* [babel-preset-env: a preset that configures Babel for you](http://2ality.com/2017/02/babel-preset-env.html)
* [你真的会用 Babel 吗？](https://juejin.im/post/59b9ffa8f265da06710d8e89?utm_source=gold_browser_extension)
* [babel的polyfill和runtime的区别](https://segmentfault.com/q/1010000005596587/a-1020000005596816)
