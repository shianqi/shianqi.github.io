---
title: 设计模式：状态模式（State Pattern）
date: 2017-06-28 09:24:23
tags:
    - Design-Patterns
---

## 定义
当一个对象内在状态改变时允许其改变行为，这个对象看起来像是改变了其类。

## 类型
创建类模式

## 类图

![State Pattern](http://cdn.shianqi.com/20171110095526_Q3BPLp_StatePattern.png)

## 要素
* *State*——抽象状态角色

    接口抽象类，负责对象状态定义，并且封装环境角色以实现状态转换。
* *ConcreteState*——具体状态角色

    每一个具体状态必须完成两个职责： 本状态的行为管理以及趋向状态处理，通俗地说，就是本状态下要做的事情，以及本状态如何过渡到其他状态

* *Context*——环境角色

    定义客户端需要的接口，并且负责具体状态的切换。

## 代码实现
```java
public abstract class State {
    protected Context context;

    public void setContext(Context _context){
        this.context = _context;
    }

    public abstract void handle1();

    public abstract void handle2();
}

public class ConcreteState1 extends State {
    @Override
    public void handle1(){
        super.context.setCurrectState(Context.STATE2);
        super.context.handle2();
    }
    @Override
    public void handle2(){

    }
}

public class Context{
    public final static State STATE1 = new ConcreteState1();
    public final static State STATE2 = new ConcreteState2();

    private State CurrentState();

    public State getCurrentState() {
        return CurrentState;
    }

    public void setCurrentState(State currentState) {
        this.CurrentState = currentState;
        this.CurrentState.setContext(this);
    }

    public void handle1(){
        this.CurrentState.handle1();
    }

    public void handle2(){
        this.CurrentState.handle2();
    }
}

public class Client {
    public static void main(String[] args){
        Context context = new Context();
        context.setCurrentState(new ConcreteState1);

        context.handle1();
        context.handle2();
    }
}
```
## 优点
* 结构清晰

    避免许多switch...case
* 遵循设计原则

    很好地体现了开闭原则和单一职责原则
* 封装性非常好

## 缺点
子类会太多，可以解决，比如在数据库中建立一个状态表，然后根据状态执行相应的操作。

## 使用场景

* 行为随状态改变而改变的场景
* 条件，分支判断语句的代替者
