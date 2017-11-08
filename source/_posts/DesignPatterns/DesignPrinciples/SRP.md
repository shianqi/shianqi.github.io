---
title: 设计原则：单一职责原则（SRP）
date: 2017-06-24 20:10:16
tags:
    - Design-Patterns
---

# 单一职责原则

单一职责原则（ Single Responsibility Principle ）简称 SRP

## 解释

*规定一个类应该只有一个发生变化的原因*

比如这个类：
```java
public interface IPhone {
    //拨通电话
    public void dial(String phoneNumber);
    //通话
    public void chat(Object o);
    //挂电话
    public void hangup();
}
```

上面这段代码（`IPhone`），拥有两个职责，`dial` 和 `hangup` 是负责协议管理，`chat` 负责数据传输。其中只要有一个需要改变就会导致实现类发生改变，所以不符合 *单一职责原则* 。

应该将这个接口分成两个，让实现类实现这两个接口。

## 总结
*单一职责原则提出了一个编写程序的标准，用“职责”或“变化原因”来衡量接口或类的设计是否优良，但是“职责”和“变化原因”确实不可度量的，因项目而异，因环境而异*

*在实际使用中应该灵活使用*
