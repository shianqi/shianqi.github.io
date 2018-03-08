---
title: WebGL 初探
date: 2018-03-04 08:55:18
tags: 
    - WebGL
---
# WebGL 初探

## 基本原理

WebGL 是基于光栅化的 API ,而不是基于 3D 的 API。WebGL 程序的任务就是实现具有投影矩阵坐标和颜色的 WebGL 对象即可。

无论要实现的图形尺寸有多大，其投影矩阵的坐标的范围始终是从 -1 到 1。

GPU 有两个基础任务，第一个就是将点处理为投影矩阵。第二部分就是基于第一部分将相应的像素点描绘出来。

![顶点着色器](http://cdn.shianqi.com/20180305091210_usgNuq_vertex-shader-anim.gif)

上图左侧的是用户自己提供的数据。定点着色器就是用户在 GLSL 中写的函数。处理每个定点时，均会被调用一次。用户可以将投影矩阵的值存储在特定的变量 `gl_Position` 中。GPU 会处理这些值，并将他们存储在其内部。

假设用户希望绘制三角形 TRIANGLES, 那么每次绘制时，上述的第一部分就会产生三个顶点，然后 GPU 会使用他们来绘制三角形。首先 GPU 会将三个顶点对应的像素绘制出来，然后将三角形光栅化，或者说是使用像素点绘制出来。对每一个像素点，GPU 都会调用用户定义的片段着色器来确定该像素点该涂成什么颜色。当然，用户定义的片段着色器必须在 `gl_FragColor` 变量中设置对应的值。

WebGL 将会连接顶点着色器中的变量和片段着色器中的相同名字和类型的变量。

我们仅仅计算三个顶点。我们的顶点着色器被调用了三次，因此，仅仅计算了三个颜色。而我们的三角形可以有好多颜色，这就是为何被称为 `varying`。

## 例子

```javascript
const canvas = document.getElementById("canvas")
const gl = canvas.getContext("webgl")
if (!gl) {
  console.log('浏览器不支持 WebGL')
}

// 顶点着色器
const VSHADER_SOURCE = `
attribute vec2 a_position;

void main() {
  gl_Position = vec4(a_position, 0, 1);
}
`
// 片元着色器
const FSHADER_SOURCE = `
void main() {
  gl_FragColor = vec4(0, 1, 0, 1);  // green
}
`

// 编译着色器
const vertShader = gl.createShader(gl.VERTEX_SHADER)
gl.shaderSource(vertShader, VSHADER_SOURCE)
gl.compileShader(vertShader)

const fragShader = gl.createShader(gl.FRAGMENT_SHADER)
gl.shaderSource(fragShader, FSHADER_SOURCE)
gl.compileShader(fragShader)

// 合并程序
const shaderProgram = gl.createProgram()
this.shaderProgram = shaderProgram
gl.attachShader(shaderProgram, vertShader)
gl.attachShader(shaderProgram, fragShader)
gl.linkProgram(shaderProgram)
gl.useProgram(shaderProgram)

const positionLocation = gl.getAttribLocation(shaderProgram, "a_position")
const buffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
gl.bufferData(
  gl.ARRAY_BUFFER,
  new Float32Array([
    -1.0, -1.0,
    1.0, -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
    1.0, -1.0,
    1.0,  1.0
  ]),
  gl.STATIC_DRAW
)
gl.enableVertexAttribArray(positionLocation)
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

// draw
gl.drawArrays(gl.TRIANGLES, 0, 6)
```