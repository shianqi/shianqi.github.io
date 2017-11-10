---
title: 设计模式：备忘录模式（Memento Pattern）
date: 2017-06-27 17:34:23
tags:
    - Design-Patterns
---

## 定义
将一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志，可以提供命令的撤销和恢复功能。

## 类型
行为类模式

## 类图

![Memento Pattern](http://cdn.shianqi.com/20171110095300_TstQIw_MementoPattern.png)

## 备忘录模式的结构
* 发起人：记录当前时刻的内部状态，负责定义哪些属于备份范围的状态，负责创建和恢复备忘录数据。
* 备忘录：负责存储发起人对象的内部状态，在需要的时候提供发起人需要的内部状态。
* 管理角色：对备忘录进行管理，保存和提供备忘录。

## 代码实现
```java
class Originator {  
    private String state = "";  

    public String getState() {  
        return state;  
    }  
    public void setState(String state) {  
        this.state = state;  
    }  
    public Memento createMemento(){  
        return new Memento(this.state);  
    }  
    public void restoreMemento(Memento memento){  
        this.setState(memento.getState());  
    }  
}  

class Memento {  
    private String state = "";  
    public Memento(String state){  
        this.state = state;  
    }  
    public String getState() {  
        return state;  
    }  
    public void setState(String state) {  
        this.state = state;  
    }  
}  
class Caretaker {  
    private Memento memento;  
    public Memento getMemento(){  
        return memento;  
    }  
    public void setMemento(Memento memento){  
        this.memento = memento;  
    }  
}  
public class Client {  
    public static void main(String[] args){  
        Originator originator = new Originator();  
        originator.setState("状态1");  
        System.out.println("初始状态:"+originator.getState());  
        Caretaker caretaker = new Caretaker();  
        caretaker.setMemento(originator.createMemento());  
        originator.setState("状态2");  
        System.out.println("改变后状态:"+originator.getState());  
        originator.restoreMemento(caretaker.getMemento());  
        System.out.println("恢复后状态:"+originator.getState());  
    }  
}
```

## 备忘录模式的优点
当发起人角色中的状态改变时，有可能这是个错误的改变，我们使用备忘录模式就可以把这个错误的改变还原。

备份的状态是保存在发起人角色之外的，这样，发起人角色就不需要对各个备份的状态进行管理。
## 备忘录模式的缺点
在实际应用中，备忘录模式都是多状态和多备份的，发起人角色的状态需要存储到备忘录对象中，对资源的消耗是比较严重的。

## 感受
和命令模式可以完成相同的事情，备份和还原，但是两者又有所不同，命令模式更加偏向于记录变化的部分，而备忘录模式是备份整个状态
