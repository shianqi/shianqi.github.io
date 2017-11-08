---
title: NodeJs fs 模块基本使用方法
date: 2017-04-24 13:30:44
tags: 
    - NodeJs
---
## fs(文件系统)

通过 require('fs') 使用该模块。 所有的方法都有异步和同步的形式。
 
 异步版本：
```NodeJs
const fs = require('fs');

fs.unlink('/tmp/hello', (err) => {
    if (err) throw err;
    console.log('successfully deleted /tmp/hello');
});
```

同步版本：
```NodeJs
const fs = require('fs');

fs.unlinkSync('/tmp/hello');
console.log('successfully deleted /tmp/hello');
```

## 基本方法
readFile
```
fs.readFile(file[, options], callback)

file <String> | <Buffer> | <Integer> 文件名或文件描述符
options <Object> | <String>
encoding <String> | <Null> 默认 = null
flag <String> 默认 = 'r'
callback <Function>
```

```NodeJs
fs.readFile('/etc/passwd', (err, data) => {
    if (err) throw err;
    console.log(data);
});
```
writeFile
```
fs.writeFile(file, data\[, options], callback)
file <String> | <Buffer> | <Integer> 文件名或文件描述符
data <String> | <Buffer>
options <Object> | <String>
encoding <String> | <Null> 默认 = 'utf8'
mode <Integer> 默认 = 0o666
flag <String> 默认 = 'w'
callback <Function>
```
```NodeJs
fs.writeFile('message.txt', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
});
```

## 注意点
不建议在调用 fs.open() 、 fs.readFile() 或 fs.writeFile()
 之前使用 fs.access() 检查一个文件的可访问性。 如此处理会造成紊乱情况，
 因为其他进程可能在两个调用之间改变该文件的状态。 作为替代，
 用户代码应该直接打开/读取/写入文件，当文件无法访问时再处理错误。
 
