---
title: BrowserSync 使用手册
date: 2016-9-4 13:30:44
tags: 
    - BrowserSync
    - 前端自动化
---

<h2 id="1">全局安装</h2>
```
    npm install -g browser-sync
```

<h2 id="2">项目中安装</h2>
```
    npm install --save-dev browser-sync
```

<h2 id="3">启动 BrowserSync</h2>
```
    //监听一个文件
    browser-sync start --server --files "css/*.css"
    
    //监听多个文件
    // 如果你的文件层级比较深，您可以考虑使用 **（表示任意目录）匹配，任意目录下任意.css 或 .html文件。 
    browser-sync start --server --files "**/*.css, **/*.html"
    
    //指定端口
    browser-sync start --server --port "3031" --files "**/*.css, **/*.html"
    
```

<h2 id="4">中文官网文档</h2>
<a href="http://www.browsersync.cn/docs/" target="_blank">www.browsersync.cn<a/>


