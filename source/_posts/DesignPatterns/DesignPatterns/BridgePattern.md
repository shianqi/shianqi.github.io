---
title: 设计模式：桥梁模式（Bridge Pattern）
date: 2017-06-28 15:53:36
tags:
    - Design-Patterns
---

## 定义
将抽象和实现解耦，使得两者可以独立的变化

## 类型
结构类模式

## 类图

![Bridge Pattern](http://cdn.shianqi.com/20171110094424_0uXiCI_BridgePattern.png)

## 角色
* *Abstraction*——抽象化角色
* *Implementor*——实现化角色
* *RefinedAbstraction*——修正抽象化角色
* *ConcreteImplementor*——具体实现化角色

## 代码实现
```java
public interface Implementor {
    public void doSomething();
    public void doAnything();
}

public class ConcreteImplementor1 implements Implementor {
    public void doSomething(){
        //业务逻辑处理
    }
    public void doAnything() {
        //业务逻辑处理
    }
}
//ConcreteImplementor2 省略

public abstract class Abstraction {
    private Implementor imp;
    public Abstraction(Implementor _imp){
        this.imp = _imp;
    }
    public void request() {
        this.imp.doSomething();
    }
    public Implementor getImp(){
        return imp;
    }
}

public class RefinedAbstraction extends Abstraction {
    public RefinedAbstraction(Implementor _imp){
        super(_imp);
    }
    @Override
    public void request(){
        super.request();
        super.getImp().doAnything();
    }
}

public class Client {
    public static void main(String[] args) {
        Implementor imp = new ConcreteImplementor1();
        Abstraction abs = new RefinedAbstraction(imp);
        abs.request();
    }
}

```

## 优点
* 抽象和实现分离
* 优秀的拓展能力
* 实现细节对客户透明

## 使用场景
* 不希望或不适用使用继承的场景
* 接口或抽象类不稳定的场景
* 重用性要求较高的场景
