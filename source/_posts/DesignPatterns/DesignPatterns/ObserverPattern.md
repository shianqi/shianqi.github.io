---
title: 设计模式：观察者模式（Observer Pattern）
date: 2017-06-27 15:09:23
tags:
    - Design-Patterns
---

## 定义
定义对象间一种一对多的依赖关系，使得当每一个对象改变状态，则所有依赖于它的对象都会得到通知并自动更新。

## 类型
行为类模式

## 类图

![Observer Pattern](http://cdn.shianqi.com/20171110095324_bQmPPE_ObserverPattern.png)

## 代码实现
```java
abstract class Subject {  
    private Vector<Observer> obs = new Vector<Observer>();  

    public void addObserver(Observer obs){  
        this.obs.add(obs);  
    }  
    public void delObserver(Observer obs){  
        this.obs.remove(obs);  
    }  
    protected void notifyObserver(){  
        for(Observer o: obs){  
            o.update();  
        }  
    }  
    public abstract void doSomething();  
}  
```
观察者模式的优点
* 观察者与被观察者之间是属于轻度的关联关系，并且是抽象耦合的，这样，对于两者来说都比较容易进行扩展。
* 观察者模式是一种常用的触发机制，它形成一条触发链，依次对各个观察者的方法进行处理。但同时，这也算是观察者模式一个缺点，由于是链式触发，当观察者比较多的时候，性能问题是比较令人担忧的。并且，在链式结构中，比较容易出现循环引用的错误，造成系统假死。
```java

class ConcreteSubject extends Subject {  
    public void doSomething(){  
        System.out.println("被观察者事件反生");  
        this.notifyObserver();  
    }  
}  
interface Observer {  
    public void update();  
}  
class ConcreteObserver1 implements Observer {  
    public void update() {  
        System.out.println("观察者1收到信息，并进行处理。");  
    }  
}  
class ConcreteObserver2 implements Observer {  
    public void update() {  
        System.out.println("观察者2收到信息，并进行处理。");  
    }  
}  

public class Client {  
    public static void main(String[] args){  
        Subject sub = new ConcreteSubject();  
        sub.addObserver(new ConcreteObserver1()); //添加观察者1  
        sub.addObserver(new ConcreteObserver2()); //添加观察者2  
        sub.doSomething();  
    }  
}  
```

##运行结果
```
被观察者事件反生
观察者1收到信息，并进行处理。
观察者2收到信息，并进行处理。
```

## 观察者模式的优点
观察者与被观察者之间是属于轻度的关联关系，并且是抽象耦合的，这样，对于两者来说都比较容易进行扩展。

观察者模式是一种常用的触发机制，它形成一条触发链，依次对各个观察者的方法进行处理。但同时，这也算是观察者模式一个缺点，由于是链式触发，当观察者比较多的时候，性能问题是比较令人担忧的。并且，在链式结构中，比较容易出现循环引用的错误，造成系统假死。
