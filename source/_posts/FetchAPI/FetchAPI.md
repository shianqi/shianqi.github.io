---
title: Fetch API
date: 2017-06-18 19:44:03
tags:
    - FetchAPI
---

## 概况
`JavaScript` 通过 `XMLHttpRequest(XHR)` 来执行异步请求，这个方式已经存在了很长一段时间。但它不是最佳API。它在设计上不符合职责分离原则，将输入、输出和用事件来跟踪的状态混杂在一个对象里。而且，基于事件的模型与最近 `JavaScript` 流行的 `Promise` 以及基于生成器的异步编程模型不太搭。新的 `Fetch API` 打算修正上面提到的那些缺陷。

而与jQuery相比， fetch 方法与 jQuery.ajax() 的主要区别在于：
* `fetch()` 方法返回的 `Promise` 对象并不会在HTTP状态码为404或者500的时候自动抛出异常，而需要用户进行手动处理
* 默认情况下，`fetch` 并不会发送任何的本地的 `cookie` 到服务端，注意，如果服务端依靠 `Session` 进行用户控制的话要默认开启 `Cookie`

## Installation & Polyfill
`window.fetch` 是基于 `XMLHttpRequest` 的浏览器的统一的封装，针对老的浏览器可以使用 `Github` 的这个[polypill](https://github.com/github/fetch)。 `fetch` 基于 `ES6` 的 `Promise` ，在旧的浏览器中首先需要引入 `Promise`的 `polypill` ，可以用 [es6-promise](https://github.com/stefanpenner/es6-promise):
```
npm install es6-promise
```
使用 [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch)：
```
npm install --save isomorphic-fetch es6-promise
```
使用的时候也非常方便：

```
require('es6-promise').polyfill();
require('isomorphic-fetch');
fetch('//offline-news-api.herokuapp.com/stories')
    .then(function(response) {
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json();
    })
    .then(function(stories) {
        console.log(stories);
    });
```
## Usage

### HTML
```
fetch('/users.html')
  .then(function(response) {
    return response.text()
  }).then(function(body) {
    document.body.innerHTML = body
  })
```

### JSON

```
fetch('/users.json')
  .then(function(response) {
    return response.json()
  }).then(function(json) {
    console.log('parsed json', json)
  }).catch(function(ex) {
    console.log('parsing failed', ex)
  })
```

### Response metadata
```
fetch('/users.json').then(function(response) {
  console.log(response.headers.get('Content-Type'))
  console.log(response.headers.get('Date'))
  console.log(response.status)
  console.log(response.statusText)
})
```
### Post form
```
var form = document.querySelector('form')

fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```

### Post JSON
```
fetch('/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Hubot',
    login: 'hubot',
  })
})
```

### File upload
```
var input = document.querySelector('input[type="file"]')

var data = new FormData()
data.append('file', input.files[0])
data.append('user', 'hubot')

fetch('/avatars', {
  method: 'POST',
  body: data
})
```

## Request:请求构造
Request对象代表了一次fetch请求中的请求体部分，你可以自定义Request对象:

* `method` - 使用的HTTP动词，`GET`, `POST`, `PUT`, `DELETE`, `HEAD`
* `url` - 请求地址，`URL of the request`
* `headers` - 关联的Header对象
* `referrer` - `referrer`
* `mode` - 请求的模式，主要用于跨域设置，`cors`, `no-cors`, `same-origin`
* `credentials` - 是否发送Cookie `omit`, `same-origin`
* `redirect` - 收到重定向请求之后的操作，`follow`, `error`, `manual`
* `integrity` - 完整性校验
* `cache` - 缓存模式(`default`, `reload`, `no-cache`)
```
var request = new Request('/users.json', {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
});

//use it
fetch(request).then(function() { /* handle response */ });
```

```
fetch('/users.json', {
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    headers: new Headers({
        'Content-Type': 'text/plain'
    })
}).then(function() { /* handle response */ });
```

### Cookies
如果需要设置fetch自动地发送本地的Cookie，需要将credentials设置为same-origin:
```
fetch('/users', {
  credentials: 'same-origin'
})
```
该选项会以类似于XMLHttpRequest的方式来处理Cookie，否则，可能因为没有发送Cookie而导致基于Session的认证出错。可以将credentials的值设置为include来在CORS情况下发送请求。
```
fetch('https://example.com:1234/users', {
  credentials: 'include'
})
```

### Headers:自定义请求头
```
// Create an empty Headers instance
var headers = new Headers();

// Add a few headers
headers.append('Content-Type', 'text/plain');
headers.append('X-My-Custom-Header', 'CustomValue');

// Check, get, and set header values
headers.has('Content-Type'); // true
headers.get('Content-Type'); // "text/plain"
headers.set('Content-Type', 'application/json');

// Delete a header
headers.delete('X-My-Custom-Header');

// Add initial values
var headers = new Headers({
    'Content-Type': 'text/plain',
    'X-My-Custom-Header': 'CustomValue'
});
```

### 使用webpack前后端跨域发送cookie的问题
最简单的方法是服务端将响就头设置成 `Access-Control-Allow-Origin：域名`，如果客户端发送请求时，不需要携带 `cookie` 等信息，可以设置成 `Access-Control-Allow-Origin：*` ，表示任何域都可以向服务端发送请求，客户端不需要任何配置，就可以进行跨域调试了。

但一般网站，都需要向后端发送 `cookie`来进行身份验证，此时，服务器还需向响应头设置 `Access-Control-Allow-Credentials:true`，表示跨域时，允许cookie添加到请求中。设置 `Access-Control-Allow-Credentials:true` 后，要将 `Access-Control-Allow-Origin` 指定到具体的域，否则cookie不会带到客户端，例如设置成`Access-Control-Allow-Origin：http://192.168.0.1:8088`,http://192.168.0.1:8088 是前端服务器的域名，这就要求用webpack的时候，要指定具体的域来启动，不要直接用localhost。
```
    ...
    devServer: {
        host: '192.168.0.1:8088',
    },
    ...
```
要向后端发送cookie，前端也需要有相应的配置。需要将`credentials`设置成`include`，表示允许跨越传递`cookie`，不要将`credentials`设置成`same-origin`,如果设置成`same-origin`，只会在同源的时候发送cookie。另外还要将 `withCredentials` 设为` true`。

## Response:响应处理
在fetch的then函数中提供了一个Response对象，即代表着对于服务端返回值的封装，你也可以在Mock的时候自定义Response对象，譬如在你需要使用Service Workers的情况下，在Response中，你可以作如下配置:

* `type` - basic, cors
* `url`
* `useFinalURL` - 是否为最终地址
* `status` - 状态码 (ex: 200, 404, etc.)
* `ok` - 是否成功响应 (status in the range 200-299)
* `statusText` - status code (ex: OK)
* `headers` - 响应头

The `Response` also provides the following methods:

* `clone()`- Creates a clone of a Response object.
* `error()` - Returns a new Response object associated with a network error.
* `redirect()` - Creates a new response with a different URL.
* `arrayBuffer()` - Returns a promise that resolves with an ArrayBuffer.
* `blob()` - Returns a promise that resolves with a Blob.
* `formData()` - Returns a promise that resolves with a FormData object.
* `json()` - Returns a promise that resolves with a JSON object.
* `text()` - Returns a promise that resolves with a USVString (text).

### 处理HTTP错误状态
```
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

fetch('/users')
  .then(checkStatus)
  .then(parseJSON)
  .then(function(data) {
    console.log('request succeeded with JSON response', data)
  }).catch(function(error) {
    console.log('request failed', error)
  })
```
### 处理JSON响应
```
fetch('https://davidwalsh.name/demo/arsenal.json').then(function(response) {

// Convert to JSON

return response.json();

}).then(function(j) {

// Yay, `j` is a JavaScript object

console.log(j);

});
```
### 处理文本响应
```
fetch('/next/page')

  .then(function(response) {

    return response.text();

  }).then(function(text) {

  // <!DOCTYPE ....

  console.log(text);

  });
```
### Blob Responses
如果你希望通过fetch方法来载入一些类似于图片等资源：

```
fetch('flowers.jpg')

    .then(function(response) {

       return response.blob();

    })

    .then(function(imageBlob) {

       document.querySelector('img').src = URL.createObjectURL(imageBlob);

});
blob()方法会接入一个响应流并且一直读入到结束。
```
