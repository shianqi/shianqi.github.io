---
title: 设计模式：装饰模式（Decorator Pattern）
date: 2017-06-28 17:35:36
tags:
    - Design-Patterns
---

## 定义
动态地给一个对象添加一些额外的职责。就增加功能来说，它相比生成子类更为灵活

## 类型
结构类模式

## 类图

![Decorator Pattern](http://cdn.shianqi.com/20171110094716_DOiB8o_DecoratorPattern.png)

## 代码实现
```java
public abstract class Component {
    public abstract void operate();
}

public class ConcreteComponent extends Component {
    @Override
    public void operate() {
        System.out.println("do Something");
    }
}

public abstract class Decorator extends Component {
    private Component component = null;

    public Decorator(Component _component){
        this.component = _component;
    }

    @Override
    public void operate() {
        this.component.operate();
    }
}

public class ConcreteDecorator1 extends Decorator {
    public ConcreteDecorator1(Component _component){
        super(_component);
    }
    //定义自己的修饰方法
    private void operate(){
        System.out.println("method1 修饰");
    }

    public void operate() {
        this.method1();
        super.operate();
    }
}

public class Client{
    public static void main(String[] args){
        Component component = new ConcreteComponent();
        component = new ConcreteDecorator1(component);
        component = new ConcreteDecorator2(component);
        component.operate();
    }
}
```

## 优点
* 装饰类和被装饰类可以独立发展
* 装饰模式是继承关系的代替方案
* 装饰模式可以动态地扩展一个实现类的功能

##　缺点
多层的装饰是比较复杂的，尽量减少装饰类的数量，以便降低系统的复杂度。
