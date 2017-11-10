---
title: Canvas 线条长拖尾效果
date: 2017-06-30 16:20:36
tags:
    - Canvas
---

## 效果图

![效果图](http://cdn.shianqi.com/20171110002414_MQAGeo_line.png)

## 分析

其实这个效果不是线条本身就是这个形状的，而是下面这样的

![point](http://cdn.shianqi.com/20171110002437_DJw4p0_point.png)

之所以会出现这个效果，是因为 `Canvas` 在画下一帧的时候并没有将上一帧的画面全部擦除，而是用一个和背景一样的透明度非常低的颜色填充了绘图区域，导致上一帧的点比下一帧明度低，所以多次叠加就变成了上面的效果。

## 关键代码

```javascript
ctx.fillStyle = 'rgba(0,0,0,.1)';
ctx.fillRect(0,0,cw,ch);
```
