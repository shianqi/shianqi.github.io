---
title: Redux 中使用 Object Spread Operator （...）
date: 2017-06-02 22:00:11
tags: 
    - Redux
    - ES7
---

# Redux 中使用 Object Spread Operator （...）

**ES7 Stage 3 阶段**

不直接修改 `state` 是 `Redux` 的核心理念之一, 所以你会发现自己总是在使用 `Object.assign()` 创建对象拷贝, 而拷贝中会包含新创建或更新过的属性值。在下面的 todoApp 示例中, `Object.assign()` 将会返回一个新的 `state` 对象, 而其中的 `visibilityFilter` 属性被更新了:

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      })
    default:
      return state
  }
}
```

尽管这样可行, 但 `Object.assign()` 冗长的写法会迅速降低 `reducer` 的可读性。

一个可行的替代方案是使用ES7的[对象展开语法](https://github.com/sebmarkbage/ecmascript-rest-spread)提案。该提案让你可以通过展开运算符 `(...)` , 以更加简洁的形式将一个对象的可枚举属性拷贝至另一个对象。对象展开运算符在概念上与`ES6`的[数组展开运算符](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator)相似

```
function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return { ...state, visibilityFilter: action.filter }
    default:
      return state
  }
}
```

目前对象展开运算符提案还处于 ES7 Stage 2 草案阶段, 若你想在产品中使用它得依靠转换编译器, 如 Babel。 你可以使用 es2015 预设值, 安装 `babel-plugin-transform-object-rest-spread` 并将其单独添加到位于 `.babelrc` 的 `plugins` 数组中。
```
{
  "presets": ["es2015"],
  "plugins": ["transform-object-rest-spread"]
}
```