---
title: 彻底理解 JavaScript 六种继承方式
date: 2017-05-01 15:45:21
tags: 
    - JavaScript
---

首先本文书写遵守以下约定：
```
function A(){
    // 私有属性
    var val = 1;        // 私有基本属性
    var arr = [1];      // 私有引用属性
    function fun(){}    // 私有函数（引用属性）
 
    // 实例属性
    this.val = 1;               // 实例基本属性
    this.arr = [1];             // 实例引用属性
    this.fun = function(){};    // 实例函数（引用属性）
}
 
// 原型属性
A.prototype.val = 1;              // 原型基本属性
A.prototype.arr = [1];            // 原型引用属性
A.prototype.fun = function(){};   // 原型函数（引用属性）

A.f = function(){
    //....                        // 类方法
}
```
其中：A 为被继承的父类， B 为继承 A 的子类。

## 六种继承简单介绍

### 简单原型继承

![简单原型继承](http://cdn.shianqi.com/20171110002954_nmIU7s_1.png)

这是最简单的继承方式，就一行代码可以完成

* 代码实现：
```
function A(){
    this.arr = [1];
}
function B(){
    // ...
}
B.prototype = new A();    // 核心
 
var b1 = new B();
var b2 = new B();

sub1.arr.push(2);
alert(sub1.arr);    // 1, 2
alert(sub2.arr);    // 1, 2
```

* 优点

    * 非常简单

* 缺点
    * 来自原型对象的引用属性是所有实例共享的。
    * 创建子类实例时，无法向父类构造函数传参。


### 借用构造函数

![借用构造函数](http://cdn.shianqi.com/20171110003033_yAUJ8v_2.png)

* 代码实现
```
function A(val){
    this.arr = [1];
 
    this.fun = function(){
        // ...
    }
}
function B(val){
    Super.call(this, val);   // 核心
    // ...
}
 
var b1 = new B(1);
var b2 = new B(2);
b1.arr.push(2);

alert(sub1.arr);    // 1, 2
alert(sub2.arr);    // 1

alert(sub1.fun === sub2.fun);   // false
```
* 优点
    * 解决了子类实例共享父类引用属性的问题
    * 创建子类实例时，可以向父类构造函数传参
    * （解决了简单原型继承的问题）
* 缺点
    * 无法实现函数复用，每个子类实例都持有一个新的函数实例，影响性能

### 组合继承（最常用）

![组合继承](http://cdn.shianqi.com/20171110003055_KaVrop_3.png)

* 代码实现
```
function A(val){
    // 只在此处声明基本属性和引用属性
    this.val = val;
}
//  在此处声明函数
A.prototype.fun1 = function(){};
A.prototype.fun2 = function(){};

function B(val){
    A.call(this, val);   // 核心
    // ...
}
B.prototype = new A(1);    // 核心，此处的 1 被覆盖
 
var b1 = new B(2);
var b2 = new B(3);
alert(b1.fun === b2.fun);   // true
b1.val                      //2
b2.val                      //3
```
* 优点
    * 不存在引用属性共享问题
    * 可传参
    * 函数可复用
* 缺点
    * 父类构造函数被调用了两次，子类原型上的属性被覆盖，形成浪费。（图中 O 处）

### 寄生组合继承 （最佳方式）

![寄生组合继承](http://cdn.shianqi.com/20171110003152_fg8zRi_4.png)

* 代码实现
```
/**
 * 返回一个继承自原型对象p的属性的新对象。
 * 本函数出自 《JavaScript权威指南 第6版》 P122，例6-1
 */
function inherit(p){
    if(p==null) throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== 'object' && t!== 'function') throw TypeError();
    var f = function(){};
    f.prototype = p;
    return new f();
}

function A(){
    // 只在此处声明基本属性和引用属性
    this.val = 1;
}
//  在此处声明函数
A.prototype.fun1 = function(){};
A.prototype.fun2 = function(){};

function B(){
    A.call(this);                       // 核心
    // ...
}
var proto = inherit(Super.prototype);   // 核心
proto.constructor = Sub;                // 核心
Sub.prototype = proto;                  // 核心，完善原型链
 
var b = new B();
alert(b.val);
```
* 优点
    * 解决了上面的所有问题
    
* 缺点
    * 写法较麻烦

### 原型式

![原型式](http://cdn.shianqi.com/20171110003210_cZK86B_5.png)

* 代码实现
```
/**
 * 返回一个继承自原型对象p的属性的新对象。
 * 本函数出自 《JavaScript权威指南 第6版》 P122，例6-1
 */
function inherit(p){
    if(p==null) throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== 'object' && t!== 'function') throw TypeError();
    var f = function(){};
    f.prototype = p;
    return new f();
}

function A(){
    this.val = 1;
}
 
// 拿到父类对象
var a = new A();
var b = inherit(a);   // 核心
// 增强
b.attr1 = 1;
b.attr2 = 2;

 
alert(b.val);     // 1
```

* 优点
    * 从已有对象衍生新对象，不需要创建自定义类型（复制）
* 缺点
    * 原型引用属性会被所有实例共享
    * 无法实现代码复用（新对象是现取的，属性是现添的，都没用函数封装，怎么复用）

### 寄生式

* 代码实现

```
/**
 * 返回一个继承自原型对象p的属性的新对象。
 * 本函数出自 《JavaScript权威指南 第6版》 P122，例6-1
 */
function inherit(p){
    if(p==null) throw TypeError();
    if(Object.create)
        return Object.create(p);
    var t = typeof p;
    if(t !== 'object' && t!== 'function') throw TypeError();
    var f = function(){};
    f.prototype = p;
    return new f();
}

function A(){
    this.val = 1;
}

function getSubObject(obj){
    // 创建新对象
    var clone = inherit(obj); // 核心
    // 增强
    clone.attr1 = 1;
    clone.attr2 = 2;
 
    return clone;
}
var b = getSubObject(new A());
alert(b.val);     // 1
alert(sub.attr1);   // 1
```
给原型式继承穿了个马甲而已
优缺点同上


## 六种继承之间的关系

![关系](http://cdn.shianqi.com/20171110003322_EszpgV_6.png)

## 参考文章
[重新理解JS的6种继承方式](http://www.cnblogs.com/ayqy/p/4471638.html)