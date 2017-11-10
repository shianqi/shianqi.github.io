---
title: CSS3 Flex 布局
date: 2017-3-11 11:48:41
tags: 
    - CSS
    - CSS3
---

# CSS3 flex 布局

* container 属性
    * [flex-direction](#1.1) ---------/* 主轴方向 */
    * [flex-wrap](#1.2) --------------/* 主轴不能容纳如何换行 */
    * [flex-flow](#1.3) --------------/* 缩写 <flex-direction>||<flex-wrap> */
    * [justify-content](#1.4)---------/* Item 在主轴上的排列方式 */
    * [align-items](#1.5)-------------/* 项目在主轴上如何对齐 */
    * [align-content](#1.6)-----------/* 多根交叉轴线的对齐方式*/
* item 属性
    * [order](#2.1)-------------------/* 项目排列顺序，值小靠前 */
    * [flex-grow](#2.2)---------------/* item 有剩余空间缩放比例，默认为0，不缩放 */
    * [flex-shrink](#2.3)-------------/* item 空间不足时缩小比例，默认为1，该项目将缩小。 */
    * [flex-basis](#2.4)--------------/* 在分配多余空间之前，项目占据的主轴空间 */
    * [flex](#2.5)--------------------/* 前三项的缩写，默认为 0 1 auto */
    * [align-self](#2.6)--------------/* 允许单个项目有与其他项目不一样的对齐方式 覆盖align-items */
    


Flex 是Flexible Box的缩写，意为"<font color="ffc300">弹性布局</font>"，
用来为盒状模型提供最大的灵活性。<br/> 
任何一个容器都可以指定为Flex布局。<br/>
```css
.box{
  display: flex;
}
```
行内元素:
```css
.box{
  display: inline-flex;
}
```

Webkit内核的浏览器，必须加上-webkit前缀。

```css
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```
<font color="#ff6767">注意</font>:设为Flex布局以后，子元素的
<font color="#ffc300">float</font>、
<font color="#ffc300">clear</font> 和
<font color="#ffc300">vertical-align</font> 
属性将失效。

## 概念

![概念](http://cdn.shianqi.com/20171110002511_INOZXI_flex.png)

## container 属性
<h3 id="1.1">flex-direction</h3>
决定主轴的方向 ( 项目的排列方向 )
```
    row（默认值）：       //主轴为水平方向，起点在左端。
    row-reverse：        //主轴为水平方向，起点在右端。
    column：             //主轴为垂直方向，起点在上沿。
    column-reverse：     //主轴为垂直方向，起点在下沿。
```

<h3 id="1.2">flex-wrap</h3>
主轴不能容纳如何换行
```
    nowrap（默认值）：    //不换行。
    wrap:                //换行，第一行在上方。
    wrap-reverse：       //换行，第一行在下方。
```

<h3 id="1.3">flex-flow</h3>
[flex-direction](#1.1) 属性和 [flex-wrap](#1.2) 属性 的简写形式


<h3 id="1.4">justify-content</h3>
项目在主轴上的对齐方式
```
    flex-start（默认值）：    //左对齐
    flex-end：               //右对齐
    center：                 //居中
    space-between：          //两端对齐，项目之间的间隔都相等。
    space-around：           //每个项目两侧的间隔相等
```

<h3 id="1.5">align-items</h3>
项目在交叉轴上如何对齐
```
    flex-start：         //交叉轴的起点对齐。
    flex-end：           //交叉轴的终点对齐。
    center：             //交叉轴的中点对齐。
    baseline:            //项目的第一行文字的基线对齐。
    stretch（默认值）：   //如果项目未设置高度或设为auto，将占满整个容器的高度。
```

<h3 id="1.6">align-content</h3>
多根轴线的对齐方式，只有一根轴不起作用
```
    flex-start：         //与交叉轴的起点对齐。
    flex-end：           //与交叉轴的终点对齐。
    center：             //与交叉轴的中点对齐。
    space-between：      //与交叉轴两端对齐，轴线之间的间隔平均分布。
    space-around：       //每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
    stretch（默认值）：   //轴线占满整个交叉轴。
```

## item 属性
<h3 id="2.1">order</h3>
项目的排列顺序。数值越小，排列越靠前，默认为0。


<h3 id="2.2">flex-grow</h3>
项目的放大比例，默认为0，即如果存在剩余空间，也不放大。


<h3 id="2.3">flex-shrink</h3>
项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

<h3 id="2.4">flex-basis</h3>
在分配多余空间之前，项目占据的主轴空间

<h3 id="2.5">flex</h3>
[flex-grow](#2.2), [flex-shrink](#2.3) 和 [flex-basis](#2.4)
的简写，默认值为0 1 auto。后两个属性可选。

<h3 id="2.6">align-self</h3>
属性允许单个项目有与其他项目不一样的对齐方式<br/>
可覆盖[align-items](#1.5)属性。默认值为auto，表示继承父元素的[align-items](#1.5)属性，
如果没有父元素，则等同于stretch。
```
    flex-start：         //交叉轴的起点对齐。
    flex-end：           //交叉轴的终点对齐。
    center：             //交叉轴的中点对齐。
    baseline:            //项目的第一行文字的基线对齐。
    stretch（默认值）：   //如果项目未设置高度或设为auto，将占满整个容器的高度。
```

文章参考：[原文链接](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
