---
title: 设计原则：里氏替换原则（SRP）
date: 2017-06-26 09:16:36
tags:
    - Design-Patterns
---

# 里氏替换原则

里氏替换原则（Liskov Substitution Principle）简称 SRP

## 解释
*所有引用基类的地方必须能透明地使用其子类的对象。*

* 子类可以实现父类的抽象方法，但不能覆盖父类的非抽象方法。
* 子类中可以增加自己特有的方法。
* 当子类的方法重载父类的方法时，方法的前置条件（即方法的形参）要比父类方法的输入参数更宽松。
* 当子类的方法实现父类的抽象方法时，方法的后置条件（即方法的返回值）要比父类更严格。

## 总结
*子类可以扩展父类的功能，但不能改变父类原有的功能。*