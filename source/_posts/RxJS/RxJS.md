---
title: RxJS 基础概念
date: 2017-11-27 12:54:16
tags: 
    - RxJS
---
# RxJS 基础概念

## 简介

* Reactive
* Lodash for events
* Observable
* Stream-based

### Reactive

abc三个变量之间存在加法关系：

```
a = b + c
```

在传统方式下，这是一种一次性的赋值过程，调用一次就结束了，后面b和c再改变，a也不会变了。

而在Reactive的理念中，我们定义的不是一次性赋值过程，而是可重复的赋值过程，或者说是变量之间的关系：

```
a: = b + c
```

定义出这种关系之后，每次b或者c产生改变，这个表达式都会被重新计算。不同的库或者语言的实现机制可能不同，写法也不完全一样，但理念是相通的，都是描述出数据之间的联动关系。

RxJS提供了各种API来创建数据流：

* 单值：`of`, `empty`, `never`
* 多值：`from`
* 定时：`interval`, `timer`
* 从事件创建：`fromEvent`
* 从Promise创建：`fromPromise`
* 自定义创建：`create`

创建出来的数据流是一种可观察的序列，可以被订阅，也可以被用来做一些转换操作，比如：

* 改变数据形态：`map`, `mapTo`, `pluck`
* 过滤一些值：`filter`, `skip`, `first`, `last`, `take`
* 时间轴上的操作：`delay`, `timeout`, `throttle`, `debounce`, `audit`, `bufferTime`
* 累加：`reduce`, `scan`
* 异常处理：`throw`, `catch`, `retry`, `finally`
* 条件执行：`takeUntil`, `delayWhen`, `retryWhen`, `subscribeOn`, `ObserveOn`
* 转接：`switch`

也可以对若干个数据流进行组合：

* `concat`，保持原来的序列顺序连接两个数据流
* `merge`，合并序列
* `race`，预设条件为其中一个数据流完成
* `forkJoin`，预设条件为所有数据流都完成
* `zip`，取各来源数据流最后一个值合并为对象
* `combineLatest`，取各来源数据流最后一个值合并为数组

## 在RxJS中，存在这么几种东西：

* `Observable` 可观察序列，只出不进
* `Observer` 观察者，只进不出
* `Subject` 可出可进的可观察序列，可作为观察者
* `ReplaySubject` 带回放
* `Subscription` 订阅关系

## 例子：赚钱是为了买房，买房是为了赚钱。

```javascript
const Rx = require('rxjs/Rx')
const { Observable, Subject } = Rx

// 挣钱是为了买房，买房是为了赚钱
const house$ = new Subject()
const houseCount$ = house$.scan((acc, num) => acc + num, 0).startWith(0)

// 工资始终不涨
const salary$ = Observable.interval(100).mapTo(2)
const rent$ = Observable.interval(3000)
  .withLatestFrom(houseCount$)
  .map(arr => arr[1] * 5)

// 一买了房，就没现金了……
const income$ = Observable.merge(salary$, rent$)
const cash$ = income$
  .scan((acc, num) => {
    const newSum = acc + num

    const newHouse = Math.floor(newSum / 100)
    if (newHouse > 0) {
      house$.next(newHouse)
    }

    return newSum % 100
  }, 0)

houseCount$.subscribe(num => console.log(`houseCount: ${num}`))
cash$.subscribe(num => console.log(`cash: ${num}`))
```

RxJS 函数可视化：[http://rxmarbles.com/](http://rxmarbles.com/)