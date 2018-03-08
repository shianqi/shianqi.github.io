---
title: WebGL 变量
date: 2018-03-08 13:38:18
tags: 
    - WebGL
---
# 向 shader 中传值

* attribute: 属性，存放与顶点相关的数据，只能在顶点着色器中使用。
* uniform: 一致变量，每次绘制像素点时都会调用且一直保持一致。传递与顶点无关的数据，在顶点着色器和片元着色器中都可以使用。
* varying: 多变变量，从顶点着色器往片段着色器中传递的值，需要在顶点着色器和片段着色器中均设置匹配的多变变量。当 WebGL 绘制像素时，它会 `栅格化` 该值，然后传递到片段着色器中相对应的片段着色器。

## 向 attribute 中传值

```javascript
var a_PointSize = gl.getAttribLocation(shaderProgram, "a_PointSize");
gl.vertexAttrib1f(a_PointSize, 10.0);
```

## 向 uniform 中传值

```javascript
var u_Width = gl.getUniformLocation(gl.program, "u_Width");
// uniform[1234][fi][v]
gl.uniform1f(u_Width, gl.drawingBufferWidth);
// uniformMatrix[234]fv()
gl.uniformMatrix2fv(u_Width, false, [2,1, 2,2]);
```

## 使用 varying 变量再着色器间传值

```javascript
var vertexShaderSrc = `
attribute vec4 a_Position;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = a_Position;
    v_Color = a_Color;
}`;

var fragmentShaderSrc = `
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}`;
```
