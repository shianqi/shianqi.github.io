---
title: 设计原则：依赖倒置原则（DIP）
date: 2017-06-26 09:16:36
tags:
    - Design-Patterns
---

# 依赖倒置原则

依赖倒置原则（Dependence Inversion Principle）简称DIP

##　解释
程序要依赖于抽象接口，不要依赖于具体实现。简单的说就是要求对抽象进行编程，不要对实现进行编程，这样就降低了客户与实现模块间的耦合。

* 高层次的模块不应该依赖于低层次的模块，他们都应该依赖于抽象。
* 抽象不应该依赖于具体实现，具体实现应该依赖于抽象。

例如：
母亲给孩子讲故事，只要给她一本书，她就可以照着书给孩子讲故事了。
```java
class Book{  
    public String getContent(){  
        return "很久很久以前有一个阿拉伯的故事……";  
    }  
}  

class Mother{  
    public void narrate(Book book){  
        System.out.println("妈妈开始讲故事");  
        System.out.println(book.getContent());  
    }  
}  

public class Client{  
    public static void main(String[] args){  
        Mother mother = new Mother();  
        mother.narrate(new Book());  
    }  
}  
```

假如有一天，需求变成这样：不是给书而是给一份报纸，让这位母亲讲一下报纸上的故事，报纸的代码如下：
```java
class Newspaper{  
    public String getContent(){  
        return "林书豪38+7领导尼克斯击败湖人……";  
    }  
}  
```

这位母亲却办不到，因为她居然不会读报纸上的故事，这太荒唐了，只是将书换成报纸，居然必须要修改Mother才能读。假如以后需求换成杂志呢？换成网页呢？还要不断地修改Mother，这显然不是好的设计。原因就是Mother与Book之间的耦合性太高了，必须降低他们之间的耦合度才行。
我们引入一个抽象的接口IReader。读物，只要是带字的都属于读物：

```java
interface IReader{  
    public String getContent();  
}  
```

Mother类与接口IReader发生依赖关系，而Book和Newspaper都属于读物的范畴，他们各自都去实现IReader接口，这样就符合依赖倒置原则了，代码修改为：

```java
class Newspaper implements IReader {  
    public String getContent(){  
        return "林书豪17+9助尼克斯击败老鹰……";  
    }  
}  
class Book implements IReader{  
    public String getContent(){  
        return "很久很久以前有一个阿拉伯的故事……";  
    }  
}  

class Mother{  
    public void narrate(IReader reader){  
        System.out.println("妈妈开始讲故事");  
        System.out.println(reader.getContent());  
    }  
}  

public class Client {
    public static void main(String[] args) {
        Mother mother = new Mother();
        mother.narrate(new Book());
        mother.narrate(new Newspaper());
    }
}
```


## 总结
依赖倒置原则的核心思想是*面向接口编程*
