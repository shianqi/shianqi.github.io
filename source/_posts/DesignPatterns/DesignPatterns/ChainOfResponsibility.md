---
title: 设计模式：责任链模式（Chain of Responsibility Pattern）
date: 2017-06-27 20:14:23
tags:
    - Design-Patterns
---

## 定义
使多个对象都有机会处理请求，从而避免了请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有对象处理它为止。

## 类型
行为类模式

## 类图

![Chain Of Responsibility](http://cdn.shianqi.com/20171110094543_6mgH7B_ChainOfResponsibility.png)

##　责任连模式的结构
* 抽象处理类：抽象处理类中主要包含一个指向下一处理类的成员变量nextHandler和一个处理请求的方法handRequest，handRequest方法的主要主要思想是，如果满足处理的条件，则有本处理类来进行处理，否则由nextHandler来处理。
* 具体处理类：具体处理类主要是对具体的处理逻辑和处理的适用条件进行实现。

## 代码实现
```java
class Level {  
    private int level = 0;  
    public Level(int level){  
        this.level = level;  
    };  

    public boolean above(Level level){  
        if(this.level >= level.level){  
            return true;  
        }  
        return false;  
    }  
}  

class Request {  
    Level level;  
    public Request(Level level){  
        this.level = level;  
    }  

    public Level getLevel(){  
        return level;  
    }  
}  

class Response {  

}  

abstract class Handler {  
    private Handler nextHandler;      
    public final Response handleRequest(Request request){  
        Response response = null;  

        if(this.getHandlerLevel().above(request.getLevel())){  
            response = this.response(request);  
        }else{  
            if(this.nextHandler != null){  
                this.nextHandler.handleRequest(request);  
            }else{  
                System.out.println("-----没有合适的处理器-----");  
            }  
        }  
        return response;  
    }  
    public void setNextHandler(Handler handler){  
        this.nextHandler = handler;  
    }  
    protected abstract Level getHandlerLevel();  
    public abstract Response response(Request request);  
}  

class ConcreteHandler1 extends Handler {  
    protected Level getHandlerLevel() {  
        return new Level(1);  
    }  
    public Response response(Request request) {  
        System.out.println("-----请求由处理器1进行处理-----");  
        return null;  
    }  
}  

class ConcreteHandler2 extends Handler {  
    protected Level getHandlerLevel() {  
        return new Level(3);  
    }  
    public Response response(Request request) {  
        System.out.println("-----请求由处理器2进行处理-----");  
        return null;  
    }  
}  

class ConcreteHandler3 extends Handler {  
    protected Level getHandlerLevel() {  
        return new Level(5);  
    }  
    public Response response(Request request) {  
        System.out.println("-----请求由处理器3进行处理-----");  
        return null;  
    }  
}  

public class Client {  
    public static void main(String[] args){  
        Handler handler1 = new ConcreteHandler1();  
        Handler handler2 = new ConcreteHandler2();  
        Handler handler3 = new ConcreteHandler3();  

        handler1.setNextHandler(handler2);  
        handler2.setNextHandler(handler3);  

        Response response = handler1.handleRequest(new Request(new Level(4)));  
    }  
}  
```

## 优点
责任链模式与if…else…相比，他的耦合性要低一些，因为它把条件判定都分散到了各个处理类中，并且这些处理类的优先处理顺序可以随意设定

## 缺点
在找到正确的处理类之前，所有的判定条件都要被执行一遍，当责任链比较长时，性能问题比较严重。


## 责任链模式的适用场景
就像开始的例子那样，假如使用if…else…语句来组织一个责任链时感到力不从心，代码看上去很糟糕时，就可以使用责任链模式来进行重构。

## 总结
责任链模式其实就是一个灵活版的if…else…语句，它就是将这些判定条件的语句放到了各个处理类中，这样做的优点是比较灵活了，但同样也带来了风险，比如设置处理类前后关系时，一定要特别仔细，搞对处理类前后逻辑的条件判断关系，并且注意不要在链中出现循环引用的问题。

责任连模式常常会和模板方法一起使用
