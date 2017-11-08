---
title: json-server 30s 搭建 REST API
date: 2017-04-29 12:06:16
tags: 
    - 开发工具
---

## 安装

```bash
$ npm install -g json-server
```

## 数据库文件

新建一个 json 文件，默认文件名为 `db.json`

```bash
{
  "user": [
    {
      "id": 10000,
      "name": "一韬",
      "age": 25,
      "gender": "male"
    },
    {
      "id": 10001,
      "name": "张三",
      "age": 30,
      "gender": "female"
    }
  ],
  "book": [
    {
      "id": 10000,
      "name": "JavaScript从入门到精通",
      "price": 9990,
      "owner_id": 10000
    },
    {
      "id": 10001,
      "name": "Java从入门到放弃",
      "price": 1990,
      "owner_id": 10001
    }
  ]
}
```

Start JSON Server

```bash
$ json-server --watch db.json -p 3000
```


## get
查
```
//按照id查
http://localhost:3001/user/10000
//按照属性查
http://localhost:3001/user?age=30
```

## post
增
```
http://localhost:3001/user?name=killer&age=23
```

## delete
删
```
http://localhost:3001/user/10000
```
## patch
改
```
http://localhost:3001/user?name=killer&age=24
```
## 注意

* POST，PUT，PATCH或DELETE请求，则使用lowdb将更改自动安全地保存到db.json。

* 请求体JSON应该是对象，就像GET输出一样。 （例如{“name”：“Foobar”}）

* Id值不可变。 PUT或PATCH请求的正文中的任何id值将被忽略。 只有在POST请求中设置的值才能被遵守，但只有在尚未占用的情况下才能被遵守。

* POST，PUT或PATCH请求应包含Content-Type：application / json标头，以在请求正文中使用JSON。 否则将导致200 OK，但不改变数据。

* 可以用 `.` 来请求更深层的数据

* 使用 `_page` 和 `_limit` 来分页请求，默认返回10条数据

* 使用 `_sort` 和 `_order` 来对结果排序

## 更多

[查看官方文档](https://github.com/typicode/json-server)