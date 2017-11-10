---
title: 设计模式：组合模式（Composite Pattern）
date: 2017-06-28 16:54:36
tags:
    - Design-Patterns
---

## 定义
将对象组合成树型结构，以表示“部分-整体”的层次结构，使得用户对单个对象和组合对象的使用具有一致性。

## 类型
结构类模式

## 类图

![Composite Pattern](http://cdn.shianqi.com/20171110094658_FhCGBw_CompositePattern.png)

## 代码实现
```java
public abstract class Component {
    public void doSomething(){
        //业务逻辑
    }
}

public class Composite extends Component {
    private ArrayList<Component> componentArrayList = new ArrayList<Component>();

    public void add(Component component){
        this.componentArrayList.add(component);
    }

    public void remove(Component component){
        this.componentArrayList.remove(component);
    }

    public ArrayList<Component> getChildren() {
        return this.componentArrayList;
    }
}

public class Leaf extends Component {
    public void doSomething() {

    }
}

public class Client {
    public static void main(String[] args){
        Composite root = new Composite();
        root.doSomething();

        Composite branch = new Composite();
        Leaf leaf = new Leaf();
        root add(leaf);
    }
}
```

## 优点
* 高层模块调用简单
* 节点自由增加

## 缺点
树叶和树枝使用时直接使用了实现类，在面向接口编程上是很不恰当的，与依赖倒置原则冲突。

##　使用场景
* 维护和展示部分——整体关系的场景，比如树形菜单，文件和文件夹管理
* 从一个整体中能够独立出部分模块或功能的场景
