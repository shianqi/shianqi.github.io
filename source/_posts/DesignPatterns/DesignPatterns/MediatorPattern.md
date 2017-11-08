---
title: 设计模式：中介者模式（Mediator Pattern）
date: 2017-06-27 14:25:23
tags:
    - Design-Patterns
---

## 定义
用一个中介者对象封装一系列的对象交互，中介者使各对象不需要显示地相互作用，从而使耦合松散，而且可以独立地改变它们之间的交互。

## 类型
行为类模式

## 类图
![Mediator Pattern](./MediatorPattern/MediatorPattern.png)

## 为什么要使用中介者模式
不使用中介者，各个类的关系就像 `p2p` 网络，是一种星形的的，采用了中介者模式后，就像变成了 `CS` 架构。任何一个类的变动，只会影响的类本身，以及中介者，这样就减小了系统的耦合

## 例子
我们使用一个例子来说明一下什么是同事类：有两个类A和B，类中各有一个数字，并且要保证类B中的数字永远是类A中数字的100倍。也就是说，当修改类A的数时，将这个数字乘以100赋给类B，而修改类B时，要将数除以100赋给类A。类A类B互相影响，就称为同事类。代码如下：
```java
abstract class AbstractColleague {  
    protected int number;  

    public int getNumber() {  
        return number;  
    }  

    public void setNumber(int number){  
        this.number = number;  
    }  
    //抽象方法，修改数字时同时修改关联对象  
    public abstract void setNumber(int number, AbstractColleague coll);  
}  

class ColleagueA extends AbstractColleague{  
    public void setNumber(int number, AbstractColleague coll) {  
        this.number = number;  
        coll.setNumber(number*100);  
    }  
}  

class ColleagueB extends AbstractColleague{  

    public void setNumber(int number, AbstractColleague coll) {  
        this.number = number;  
        coll.setNumber(number/100);  
    }  
}  

public class Client {  
    public static void main(String[] args){  

        AbstractColleague collA = new ColleagueA();  
        AbstractColleague collB = new ColleagueB();  

        System.out.println("==========设置A影响B==========");  
        collA.setNumber(1288, collB);  
        System.out.println("collA的number值："+collA.getNumber());  
        System.out.println("collB的number值："+collB.getNumber());  

        System.out.println("==========设置B影响A==========");  
        collB.setNumber(87635, collA);  
        System.out.println("collB的number值："+collB.getNumber());  
        System.out.println("collA的number值："+collA.getNumber());  
    }  
}  
```
假如我们要使用中介者模式，类A类B之间则不可以直接关联，他们之间必须要通过一个中介者来达到关联的目的。

```java
abstract class AbstractColleague {  
    protected int number;  

    public int getNumber() {  
        return number;  
    }  

    public void setNumber(int number){  
        this.number = number;  
    }  
    //注意这里的参数不再是同事类，而是一个中介者  
    public abstract void setNumber(int number, AbstractMediator am);  
}  

class ColleagueA extends AbstractColleague{  

    public void setNumber(int number, AbstractMediator am) {  
        this.number = number;  
        am.AaffectB();  
    }  
}  

class ColleagueB extends AbstractColleague{  

    @Override  
    public void setNumber(int number, AbstractMediator am) {  
        this.number = number;  
        am.BaffectA();  
    }  
}  

abstract class AbstractMediator {  
    protected AbstractColleague A;  
    protected AbstractColleague B;  

    public AbstractMediator(AbstractColleague a, AbstractColleague b) {  
        A = a;  
        B = b;  
    }  

    public abstract void AaffectB();  

    public abstract void BaffectA();  

}  
class Mediator extends AbstractMediator {  

    public Mediator(AbstractColleague a, AbstractColleague b) {  
        super(a, b);  
    }  

    //处理A对B的影响  
    public void AaffectB() {  
        int number = A.getNumber();  
        B.setNumber(number*100);  
    }  

    //处理B对A的影响  
    public void BaffectA() {  
        int number = B.getNumber();  
        A.setNumber(number/100);  
    }  
}  

public class Client {  
    public static void main(String[] args){  
        AbstractColleague collA = new ColleagueA();  
        AbstractColleague collB = new ColleagueB();  

        AbstractMediator am = new Mediator(collA, collB);  

        System.out.println("==========通过设置A影响B==========");  
        collA.setNumber(1000, am);  
        System.out.println("collA的number值为："+collA.getNumber());  
        System.out.println("collB的number值为A的10倍："+collB.getNumber());  

        System.out.println("==========通过设置B影响A==========");  
        collB.setNumber(1000, am);  
        System.out.println("collB的number值为："+collB.getNumber());  
        System.out.println("collA的number值为B的0.1倍："+collA.getNumber());  

    }  
}  
```
虽然代码比较长，但是还是比较容易理解的，其实就是把原来处理对象关系的代码重新封装到一个中介类中，通过这个中介类来处理对象间的关系。
## 中介者模式的优点
* 适当地使用中介者模式可以避免同事类之间的过度耦合，使得各同事类之间可以相对独立地使用。
* 使用中介者模式可以将对象间一对多的关联转变为一对一的关联，使对象间的关系易于理解和维护。
* 使用中介者模式可以将对象的行为和协作进行抽象，能够比较灵活的处理对象间的相互作用。

## 适用场景
在面向对象编程中，一个类必然会与其他的类发生依赖关系，完全独立的类是没有意义的。一个类同时依赖多个类的情况也相当普遍，既然存在这样的情况，说明，一对多的依赖关系有它的合理性，适当的使用中介者模式可以使原本凌乱的对象关系清晰，但是如果滥用，则可能会带来反的效果。一般来说，只有对于那种同事类之间是网状结构的关系，才会考虑使用中介者模式。可以将网状结构变为星状结构，使同事类之间的关系变的清晰一些。

中介者模式是一种比较常用的模式，也是一种比较容易被滥用的模式。对于大多数的情况，同事类之间的关系不会复杂到混乱不堪的网状结构，因此，大多数情况下，将对象间的依赖关系封装的同事类内部就可以的，没有必要非引入中介者模式。滥用中介者模式，只会让事情变的更复杂。
