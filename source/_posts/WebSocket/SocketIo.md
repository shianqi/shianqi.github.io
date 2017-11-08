---
title: 用 Express,Socket.io 搭建 WebSocket 服务器
date: 2016-09-04 13:30:32
tags: 
    - Express
    - WebSocket
    - NodeJs
---

<h2 id="1">首先搭建一个express的项目</h2>

<h2 id="2">添加一个index.html</h2>
```html
<!doctype html>
<html>
  <head>
    <title>Socket.IO chat</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { font: 13px Helvetica, Arial; }
      form { background: #000; padding: 3px; position: fixed; bottom: 0; width: 100%; }
      form input { border: 0; padding: 10px; width: 90%; margin-right: .5%; }
      form button { width: 9%; background: rgb(130, 224, 255); border: none; padding: 10px; }
      #messages { list-style-type: none; margin: 0; padding: 0; }
      #messages li { padding: 5px 10px; }
      #messages li:nth-child(odd) { background: #eee; }
    </style>
  </head>
  <body>
    <ul id="messages"></ul>
    <form action="">
      <input id="m" autocomplete="off" /><button>Send</button>
    </form>
  </body>
</html>
```
<h2 id="3">安装socket.io插件</h2>
```
npm install --save socket.io
```

<h2 id="4">在index.js 中添加代码</h2>
```javascript
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

<h2 id="5">在index.html中添加代码</h2>
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io();
</script>
```
<p>这样就能看到用户链接信息了</p>

<h2 id="6">将index.js改成</h2>
```javascript
io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
```
<p>这样就能看到用户退出信息了</p>

<h2 id="6">在index.html中添加代码</h2>
```html
<script src="/socket.io/socket.io.js"></script>
<script src="http://code.jquery.com/jquery-1.11.1.js"></script>
<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
</script>
```
```javascript
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
  //服务器打印消息
});
```
<p>完成发送给服务器数据</p>

<h2 id="7">在index.html中添加代码</h2>
```html
<script>
  var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
  });
</script>
```
```javascript
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
```
<p>完成服务器给前端返回数据</p>