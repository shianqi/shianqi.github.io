---
title: 设计模式：命令模式（Command Pattern）
date: 2017-06-27 17:34:23
tags:
    - Design-Patterns
---

## 定义
将一个请求封装成一个对象，从而让你使用不同的请求把客户端参数化，对请求排队或者记录请求日志，可以提供命令的撤销和恢复功能。

## 类型
行为类模式

## 类图
![Command Pattern](./CommandPattern/CommandPattern.png)

## 命令模式的结构
* *Command类*：是一个抽象类，类中对需要执行的命令进行声明，一般来说要对外公布一个execute方法用来执行命令。
* *ConcreteCommand类*：Command类的实现类，对抽象类中声明的方法进行实现。
* *Client类*：最终的客户端调用类。
* *Invoker类*：调用者，负责调用命令。
* *Receiver类*：接收者，负责接收命令并且执行命令。

## 代码实现
```java
class Invoker {  
    private Command command;  
    public void setCommand(Command command) {  
        this.command = command;  
    }  
    public void action(){  
        this.command.execute();  
    }  
}  

abstract class Command {  
    public abstract void execute();  
}  

class ConcreteCommand extends Command {  
    private Receiver receiver;  
    public ConcreteCommand(Receiver receiver){  
        this.receiver = receiver;  
    }  
    public void execute() {  
        this.receiver.doSomething();  
    }  
}  

class Receiver {  
    public void doSomething(){  
        System.out.println("接受者-业务逻辑处理");  
    }  
}  

public class Client {  
    public static void main(String[] args){  
        Receiver receiver = new Receiver();  
        Command command = new ConcreteCommand(receiver);  
        //客户端直接执行具体命令方式（此方式与类图相符）  
        command.execute();  

        //客户端通过调用者来执行命令  
        Invoker invoker = new Invoker();  
        invoker.setCommand(command);  
        invoker.action();  
    }  
}  
```

## 命令模式的优缺点
首先，命令模式的封装性很好：每个命令都被封装起来，对于客户端来说，需要什么功能就去调用相应的命令，而无需知道命令具体是怎么执行的。比如有一组文件操作的命令：新建文件、复制文件、删除文件。如果把这三个操作都封装成一个命令类，客户端只需要知道有这三个命令类即可，至于命令类中封装好的逻辑，客户端则无需知道。

其次，命令模式的扩展性很好，在命令模式中，在接收者类中一般会对操作进行最基本的封装，命令类则通过对这些基本的操作进行二次封装，当增加新命令的时候，对命令类的编写一般不是从零开始的，有大量的接收者类可供调用，也有大量的命令类可供调用，代码的复用性很好。比如，文件的操作中，我们需要增加一个剪切文件的命令，则只需要把复制文件和删除文件这两个命令组合一下就行了，非常方便。

最后说一下命令模式的缺点，那就是命令如果很多，开发起来就要头疼了。特别是很多简单的命令，实现起来就几行代码的事，而使用命令模式的话，不用管命令多简单，都需要写一个命令类来封装。

## 命令模式的适用场景
对于大多数请求-响应模式的功能，比较适合使用命令模式，正如命令模式定义说的那样，命令模式对实现记录日志、撤销操作等功能比较方便。

## 总结
对于一个场合到底用不用模式，这对所有的开发人员来说都是一个很纠结的问题。有时候，因为预见到需求上会发生的某些变化，为了系统的灵活性和可扩展性而使用了某种设计模式，但这个预见的需求偏偏没有，相反，没预见到的需求倒是来了不少，导致在修改代码的时候，使用的设计模式反而起了相反的作用，以至于整个项目组怨声载道。这样的例子，我相信每个程序设计者都遇到过。所以，基于敏捷开发的原则，我们在设计程序的时候，如果按照目前的需求，不使用某种模式也能很好地解决，那么我们就不要引入它，因为要引入一种设计模式并不困难，我们大可以在真正需要用到的时候再对系统进行一下，引入这个设计模式。

拿命令模式来说吧，我们开发中，请求-响应模式的功能非常常见，一般来说，我们会把对请求的响应操作封装到一个方法中，这个封装的方法可以称之为命令，但不是命令模式。到底要不要把这种设计上升到模式的高度就要另行考虑了，因为，如果使用命令模式，就要引入调用者、接收者两个角色，原本放在一处的逻辑分散到了三个类中，设计时，必须考虑这样的代价是否值得。

感觉 `Redux` 有借鉴命令模式的思想
