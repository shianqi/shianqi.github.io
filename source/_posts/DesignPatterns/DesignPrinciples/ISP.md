---
title: 设计原则：接口隔离原则（ISP）
date: 2017-06-26 09:16:36
tags:
    - Design-Patterns
---

# 接口隔离原则
接口隔离原则（Interface Segregation Principle）简称ISP

## 解释
客户端不应该依赖它不需要的接口；一个类对另一个类的依赖应该建立在最小的接口上。

例如：

```java
interface I {  
    public void method1();  
    public void method2();  
    public void method3();  
    public void method4();  
    public void method5();  
}  

class A{  
    public void depend1(I i){  
        i.method1();  
    }  
    public void depend2(I i){  
        i.method2();  
    }  
    public void depend3(I i){  
        i.method3();  
    }  
}  

class B implements I{  
    public void method1() {  
        System.out.println("类B实现接口I的方法1");  
    }  
    public void method2() {  
        System.out.println("类B实现接口I的方法2");  
    }  
    public void method3() {  
        System.out.println("类B实现接口I的方法3");  
    }  
    //对于类B来说，method4和method5不是必需的，但是由于接口A中有这两个方法，  
    //所以在实现过程中即使这两个方法的方法体为空，也要将这两个没有作用的方法进行实现。  
    public void method4() {}  
    public void method5() {}  
}  

class C{  
    public void depend1(I i){  
        i.method1();  
    }  
    public void depend2(I i){  
        i.method4();  
    }  
    public void depend3(I i){  
        i.method5();  
    }  
}  

class D implements I{  
    public void method1() {  
        System.out.println("类D实现接口I的方法1");  
    }  
    //对于类D来说，method2和method3不是必需的，但是由于接口A中有这两个方法，  
    //所以在实现过程中即使这两个方法的方法体为空，也要将这两个没有作用的方法进行实现。  
    public void method2() {}  
    public void method3() {}  

    public void method4() {  
        System.out.println("类D实现接口I的方法4");  
    }  
    public void method5() {  
        System.out.println("类D实现接口I的方法5");  
    }  
}  

public class Client{  
    public static void main(String[] args){  
        A a = new A();  
        a.depend1(new B());  
        a.depend2(new B());  
        a.depend3(new B());  

        C c = new C();  
        c.depend1(new D());  
        c.depend2(new D());  
        c.depend3(new D());  
    }  
}  
```
 可以看到，如果接口过于臃肿，只要接口中出现的方法，不管对依赖于它的类有没有用处，实现类中都必须去实现这些方法，这显然不是好的设计。如果将这个设计修改为符合接口隔离原则，就必须对接口I进行拆分。在这里我们将原有的接口I拆分为三个接口，拆分后的代码如下：
```java
interface I1 {  
    public void method1();  
}  

interface I2 {  
    public void method2();  
    public void method3();  
}  

interface I3 {  
    public void method4();  
    public void method5();  
}  

class A{  
    public void depend1(I1 i){  
        i.method1();  
    }  
    public void depend2(I2 i){  
        i.method2();  
    }  
    public void depend3(I2 i){  
        i.method3();  
    }  
}  

class B implements I1, I2{  
    public void method1() {  
        System.out.println("类B实现接口I1的方法1");  
    }  
    public void method2() {  
        System.out.println("类B实现接口I2的方法2");  
    }  
    public void method3() {  
        System.out.println("类B实现接口I2的方法3");  
    }  
}  

class C{  
    public void depend1(I1 i){  
        i.method1();  
    }  
    public void depend2(I3 i){  
        i.method4();  
    }  
    public void depend3(I3 i){  
        i.method5();  
    }  
}  

class D implements I1, I3{  
    public void method1() {  
        System.out.println("类D实现接口I1的方法1");  
    }  
    public void method4() {  
        System.out.println("类D实现接口I3的方法4");  
    }  
    public void method5() {  
        System.out.println("类D实现接口I3的方法5");  
    }  
}  
```

## 总结
* 接口尽量小，但是要有限度。对接口进行细化可以提高程序设计灵活性是不争的事实，但是如果过小，则会造成接口数量过多，使设计复杂化。所以一定要适度。
* 为依赖接口的类定制服务，只暴露给调用的类它需要的方法，它不需要的方法则隐藏起来。只有专注地为一个模块提供定制服务，才能建立最小的依赖关系。
* 提高内聚，减少对外交互。使接口用最少的方法去完成最多的事情。
