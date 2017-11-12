---
title: Koa2 基本使用
date: 2017-09-20 17:15:44
tags:
    - Node
    - Koa
---
# Koa2 基本使用

## hello world

```javascript
const Koa = require('koa');
const app = new Koa();

app.listen(3000);
```

## Context 对象

```javascript
const Koa = require('koa');
const app = new Koa();

app.use(ctx => {
  ctx.response.body = 'Hello World';
});
app.listen(3000);
```

其中 `ctx` 就是 `Context` 对象

### request

最基本的一个 `request` 对象如下

```json
{
    "method": "GET",
    "url": "/index.json",
    "header": {
        "host": "localhost:3000",
        "connection": "keep-alive",
        "cache-control": "max-age=0",
        "upgrade-insecure-requests": "1",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.113 Safari/537.36",
        "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "zh-CN,zh;q=0.8"
    }
}
```

#### request.accepts('xml')

这个函数用来判断客户端想要接受的数据类型，例如

```javascript
const main = ctx => {
  if (ctx.request.accepts('json')) {
    ctx.response.type = 'json';
    ctx.response.body = { data: 'Hello World' };
  } else (ctx.request.accepts('html')) {
    ctx.response.type = 'html';
    ctx.response.body = '<p>Hello World</p>';
  }
};
```

### response

#### ctx.response.body

直接给 `response.body` 赋值即可返回给数据给客户端

```javascript
const main = ctx => {
  ctx.response.type = 'json';
  ctx.response.body = JSON.stringify(ctx.request)
};
```

### 网页模版

先读取 `html` 页面，然后返回给客户端

```javascript
const fs = require('fs');

const main = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./demos/template.html');
};
```

## 路由

### 原生路由

可以通过 `ctx.request.path` 获取到用户的请求

### koa-route

```javascript
const route = require('koa-route');

const about = ctx => {
  ctx.response.type = 'html';
  ctx.response.body = '<a href="/">Index Page</a>';
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

app.use(route.get('/', main));
app.use(route.get('/about', about));
```

### 静态资源

如果网站提供静态资源（图片、字体、样式表、脚本......），为它们一个个写路由就很麻烦，也没必要。`koa-static` 模块封装了这部分的请求

```javascript
const path = require('path');
const serve = require('koa-static');

const main = serve(path.join(__dirname));
app.use(main);
```

### 重定向

`ctx.response.redirect('/');`

## 中间件

```javascript
const logger = (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`);
  next();
}
app.use(logger);
```

像上面代码中的 `logger` 函数就叫做"中间件" `（middleware）`，因为它处在 `HTTP Request` 和 `HTTP Response` 中间，用来实现某种中间功能。`app.use()` 用来加载中间件。

**基本上，`Koa` 所有的功能都是通过中间件实现的，前面例子里面的 `main` 也是中间件。每个中间件默认接受两个参数，第一个参数是 `Context` 对象，第二个参数是 `next` 函数。只要调用 `next` 函数，就可以把执行权转交给下一个中间件。**

### 中间件栈

多个中间件会形成一个栈结构（`middle stack`），以"先进后出"（`first-in-last-out`）的顺序执行。

```javascript
const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

app.use(one);
app.use(two);
app.use(three);
```

运行结果：

```text
>> one
>> two
>> three
<< three
<< two
<< one
```

**如果中间件内部没有调用 `next` 函数，那么执行权就不会传递下去**
去掉上面 `two` 函数中的 `next()` ，结果如下：

```text
>> one
>> two
<< two
<< one
```

### 异步中间件

如果有异步操作（比如读取数据库），中间件就必须写成 async 函数

```javascript
const fs = require('fs.promised');
const Koa = require('koa');
const app = new Koa();

const main = async (ctx, next)=> {
  ctx.response.type = 'html';
  ctx.response.body = await fs.readFile('./demos/template.html', 'utf8');
};

app.use(main);
app.listen(3000);
```

上面代码中，`fs.readFile` 是一个异步操作，必须写成 `await fs.readFile()` ，然后中间件必须写成 `async` 函数。

### 中间件的合成

`koa-compose` 模块可以将多个中间件合成为一个。请看下面的例子

```javascript
const compose = require('koa-compose');

const one = (ctx, next) => {
  console.log('>> one');
  next();
  console.log('<< one');
}

const two = (ctx, next) => {
  console.log('>> two');
  next();
  console.log('<< two');
}

const three = (ctx, next) => {
  console.log('>> three');
  next();
  console.log('<< three');
}

const middlewares = compose([one, two, three]);
app.use(middlewares);
```

## 错误处理

### 500 错误

`Koa` 提供了 `ctx.throw()` 方法，用来抛出错误，ctx.throw(500)就是抛出500错误

```javascript
const main = ctx => {
  ctx.throw(500);
};
```

### 处理错误中间件

为了方便处理错误，最好使用 `try...catch` 将其捕获。但是，为每个中间件都写 `try...catch` 太麻烦，我们可以让最外层的中间件

```javascript
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);
```

### error 事件的监听

运行过程中一旦出错，`Koa` 会触发一个 `error` 事件。监听这个事件，也可以处理错误

```javascript
const main = ctx => {
  ctx.throw(500);
};

app.on('error', (err, ctx) =>
  console.error('server error', err);
);
```

### 释放 error 事件

如果错误被 `try...catch` 捕获，就不会触发 `error` 事件。这时，必须调用 `ctx.app.emit()`，手动释放`error`事件，才能让监听函数生效。

# Cookies
ctx.cookies用来读写 Cookie
```javascript
const main = function(ctx) {
  const n = Number(ctx.cookies.get('view') || 0) + 1;
  ctx.cookies.set('view', n);
  ctx.response.body = n + ' views';
}
```

# 表单
`koa-body` 模块可以用来从 POST 请求的数据体里面提取键值对
```javascript
const koaBody = require('koa-body');

const main = async function(ctx) {
  const { name='' } = ctx.request.body;
  ctx.body = { name };
};

app.use(koaBody());
```

## get 请求
```javascript
const main = async function(ctx) {
  const { name='' } = ctx.query;
  ctx.body = { name };
};
```

**`get` 请求不需要 `koa-body` 依赖，`post` 则需要**

## 文件上传
```javascript
const os = require('os');
const path = require('path');
const koaBody = require('koa-body');

const main = async function(ctx) {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};

app.use(koaBody({ multipart: true }));
```
