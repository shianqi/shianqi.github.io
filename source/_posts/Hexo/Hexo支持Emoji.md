---
title: Hexo 支持 Emoji
date: 2017-06-20 21:02:22
tags:
    - Hexo
    - Markdown
---

`Hexo` 默认是采用 `hexo-renderer-marked` ,这个渲染器不支持插件扩展，当然就不行了，还有一个支持插件扩展的是 `hexo-renderer-markdown-it` ，所以我们可以使用这个渲染引擎来支持 `emoji`表情，具体实现过程如下：

更换渲染器进入blog跟目录，执行如下命令
```
npm un hexo-renderer-marked --save
npm i hexo-renderer-markdown-it --save
```
安装emoji插件，执行如下命令
```
npm install markdown-it-emoji --save
```
编辑 `_config.yml` 文件
```
markdown:
  render:
    html: true
    xhtmlOut: false
    breaks: true
    linkify: true
    typographer: true
    quotes: '“”‘’'
  plugins:
    - markdown-it-abbr
    - markdown-it-footnote
    - markdown-it-ins
    - markdown-it-sub
    - markdown-it-sup
    - markdown-it-emoji  # add emoji
  anchors:
    level: 2
    collisionSuffix: 'v'
    permalink: true
    permalinkClass: header-anchor
    permalinkSymbol: ¶
```

添加emoji表情
先安装emoji
```
npm install emoji --save
npm install twemoji --save
```

编辑node_modules/markdown-it-emoji/index.js文件，最终文件像:
```
'use strict';
var emojies_defs      = require('./lib/data/full.json');
var emojies_shortcuts = require('./lib/data/shortcuts');
var emoji_html        = require('./lib/render');
var emoji_replace     = require('./lib/replace');
var normalize_opts    = require('./lib/normalize_opts');
var twemoji           = require('twemoji')  //添加twemoji
module.exports = function emoji_plugin(md, options) {
  var defaults = {
    defs: emojies_defs,
    shortcuts: emojies_shortcuts,
    enabled: []
  };

  var opts = normalize_opts(md.utils.assign({}, defaults, options || {}));

  md.renderer.rules.emoji = emoji_html;
  //使用 twemoji 渲染
  md.renderer.rules.emoji = function(token, idx) {
    return twemoji.parse(token[idx].content);
  };
  md.core.ruler.push('emoji', emoji_replace(md, opts.defs, opts.shortcuts, opts.scanRE, opts.replaceRE));
};
```

在主题CSS中添加你的CSS代码就行了
```
.emoji{
   width: 20px;
}
```
