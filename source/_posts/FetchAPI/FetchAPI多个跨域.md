---
title: Fetch API 多个跨域
date: 2017-06-20 18:36:13
tags:
    - FetchAPI
---

这种写法并不能解决问题
```
Access-Control-Allow-Origin: https://www.google.com,https://www.baidu.com
```

应该写成下面这种

```
app.all('*', function(req, res, next) {
    if( req.headers.origin == 'https://www.google.com' || req.headers.origin == 'https://www.baidu.com' ){
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'POST, GET');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
});
```

如果想不限制域名

```
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'POST, GET');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
```
