---
title: 设计原则：开闭原则（OCP）
date: 2017-06-26 11:07:36
tags:
    - Design-Patterns
---

# 开闭原则
开闭原则（Open Closed Principle）简称OCP

## 解释
*一个软件实体如类、模块和函数应该对扩展开放，对修改关闭。*

开闭原则无非就是想表达这样一层意思：*用抽象构建框架，用实现扩展细节*。因为抽象灵活性好，适应性广，只要抽象的合理，可以基本保持软件架构的稳定。而软件中易变的细节，我们用从抽象派生的实现类来进行扩展，当软件需要发生变化时，我们只需要根据需求重新派生一个实现类来扩展就可以了。当然前提是我们的抽象要合理，要对需求的变更有前瞻性和预见性才行。

## 总结
当软件需要变化时，尽量通过扩展软件实体的行为来实现变化，而不是通过修改已有的代码来实现变化。