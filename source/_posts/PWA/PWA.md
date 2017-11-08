---
title: PWAs 技术初探
date: 2017-10-9 21:45:36
tags:
    - PWAs
---
# PWAs 是什么

`PWAs` （Progressive Web Apps），PWAs是指2017年2月4日，谷歌推出的“小程序”增强型网页应用，它无需下载安装，却可以和本地APP一样，放置在桌面上。

## 优点

1. 你只需要基于开放的 W3C 标准的 web 开发技术来开发一个app。不需要多客户端开发。
1. 用户可以在安装前就体验你的 app。
1. 不需要通过 AppStore 下载 app。app 会自动升级不需要用户升级。
1. 用户会受到‘安装’的提示，点击安装会增加一个图标到用户首屏。
1. 被打开时，PWAs 会展示一个有吸引力的闪屏。
1. chrome 提供了可选选项，可以使 PWAs 得到全屏体验。
1. 必要的文件会被本地缓存，因此会比标准的web app 响应更快（也许也会比native app响应快）
1. 安装及其轻量 -- 或许会有几百 kb 的缓存数据。
1. 网站的数据传输必须是 https 连接。
1. PWAs 可以离线工作，并且在网络恢复时可以同步最新数据。

PWAs 技术目前被 Firefox，Chrome 和其他基于Blink内核的浏览器支持。微软正在努力在Edge浏览器上实现。Apple还没有动作。不过浏览器支持对 PWAs 不是很重要，app 任然可以运行在不支持 PWAs 技术的浏览器里，不能离线访问，和原来一样没有影响。

并不是只有单页应用可以 PWAs 化，大多数网站都可以 PWAs 化，包括 WordPress 站点或者静态站点。

## 示例

示例代码可以在 [https://github.com/sitepoint-editors/pwa-retrofit](https://github.com/sitepoint-editors/pwa-retrofit) 找到。

## 改造步骤

### 第一步：开启 HTTPS

因为，`Service Worker` 很复杂，你可以修改示例代码来达到自己的目的。这是一个标准的 `web worker`，浏览器用一个单独的线程来下载和执行它。它没有调用 `DOM` 和其他页面 `api` 的能力，但他**可以拦截网络请求，包括页面切换，静态资源下载，ajax请求所引起的网络请求**。如果让第三方代码可以拦截来自其他网站的 `service worker`，将是一个灾难。

所以 PWAs 需要 HTTPS 链接已保证网站的安全。

不过你可以在 HTTP 链接下测试你的 PWAs，不过只能在 `localhost` 或者任何 `127.x.x.x` 的地址上。

### 第二步：创建一个 Manifest 文件

`manifest` 文件提供了一些我们网站的信息，例如 `name`，`description` 和需要在主屏使用的图标的图片，启动屏的图片等。

`manifest` 文件是一个 `JSON` 格式的文件，位于你项目的根目录。它必须用`Content-Type: application/manifest+json` 或者 `Content-Type: application/json` 这样的 `HTTP` 头来请求。这个文件可以被命名为任何名字，在示例代码中他被命名为 `/manifest.json`

```json
{
  "name"              : "PWA Website",
  "short_name"        : "PWA",
  "description"       : "An example PWA website",
  "start_url"         : "/",
  "display"           : "standalone",
  "orientation"       : "any",
  "background_color"  : "#ACE",
  "theme_color"       : "#ACE",
  "icons": [
    {
      "src"           : "/images/logo/logo072.png",
      "sizes"         : "72x72",
      "type"          : "image/png"
    },
    {
      "src"           : "/images/logo/logo152.png",
      "sizes"         : "152x152",
      "type"          : "image/png"
    },
    {
      "src"           : "/images/logo/logo192.png",
      "sizes"         : "192x192",
      "type"          : "image/png"
    },
    {
      "src"           : "/images/logo/logo256.png",
      "sizes"         : "256x256",
      "type"          : "image/png"
    },
    {
      "src"           : "/images/logo/logo512.png",
      "sizes"         : "512x512",
      "type"          : "image/png"
    }
  ]
}
```

在页面的 `<head>` 中引入：

```html
<link rel="manifest" href="/manifest.json">
```

`manifest` 中主要属性有：

1. `name` —— 网页显示给用户的完整名称
1. `short_name` —— 当空间不足以显示全名时的网站缩写名称
1. `description` —— 关于网站的详细描述
1. `start_url` —— 网页的初始 相对 URL（比如 /）
1. `scope` —— 导航范围。比如，`/app/` 的 `scope` 就限制 `app` 在这个文件夹里。
1. `background-color` —— 启动屏和浏览器的背景颜色
1. `theme_color` —— 网站的主题颜色，一般都与背景颜色相同，它可以影响网站的显示
1. `orientation` —— 首选的显示方向：`any`, `natural`, `landscape`, `landscape-primary`, `landscape-secondary`, `portrait`, `portrait-primary`, 和 `portrait-secondary`。
1. `display` —— 首选的显示方式：`fullscreen`, `standalone`(看起来像是native app)，`minimal-ui`(有简化的浏览器控制选项) 和 `browser`(常规的浏览器 tab)
1. `icons` —— 定义了 `src URL`, `sizes` 和 `type` 的图片对象数组。

`MDN` 提供了完整的 `manifest` 属性列表: [Web App Manifest properties](https://developer.mozilla.org/en-US/docs/Web/Manifest)

### 第三步：创建一个 Service Worker

`Service Worker` 是拦截和响应你的网络请求的编程接口。这是一个位于你根目录的一个单独的 javascript 文件。

你的 js 文件（在示例代码中是 /js/main.js）可以检查是否支持 Service Worker，并且注册：

```javascript
if ('serviceWorker' in navigator) {
  // register service worker
  navigator.serviceWorker.register('/service-worker.js');
}
```

如果你不需要离线功能，可以简单的创建一个空的 `/service-worker.js` 文件 —— 用户会被提示安装你的 app。

service worker 主要有三个事件： `install`， `activate` 和 `fetch`。

#### Install 事件

这个事件在app被安装时触发。它经常用来缓存必要的文件。缓存通过 Cache API来实现。

首先，我们来构造几个变量：

1. 缓存名称（CACHE）和版本号（version）。你的应用可以有多个缓存但是只能引用一个。我们设置了版本号，这样当我们有重大更新时，我们可以更新缓存，而忽略旧的缓存。
1. 一个离线页面的URL（offlineURL）。当离线时用户试图访问之前未缓存的页面时，这个页面会呈现给用户。
1. 一个拥有离线功能的页面必要文件的数组（installFilesEssential）。这个数组应该包含静态资源，比如 CSS 和 JavaScript 文件，但我也把主页面（/）和图标文件写进去了。如果主页面可以多个URL访问，你应该把他们都写进去，比如/和/index.html。注意，offlineURL也要被写入这个数组。
1. 可选的，描述文件数组（installFilesDesirable）。这些文件都很会被下载，但如果下载失败不会中止安装。

```javascript
// configuration
const
  version = '1.0.0',
  CACHE = version + '::PWAsite',
  offlineURL = '/offline/',
  installFilesEssential = [
    '/',
    '/manifest.json',
    '/css/styles.css',
    '/js/main.js',
    '/js/offlinepage.js',
    '/images/logo/logo152.png'
  ].concat(offlineURL),
  installFilesDesirable = [
    '/favicon.ico',
    '/images/logo/logo016.png',
    '/images/hero/power-pv.jpg',
    '/images/hero/power-lo.jpg',
    '/images/hero/power-hi.jpg'
  ];
```

`installStaticFiles()` 方法添加文件到缓存，这个方法用到了基于 `promise` 的 `Cache API`。当必要的文件都被缓存后才会生成返回值。

```javascript
// install static assets
function installStaticFiles() {
  return caches.open(CACHE)
    .then(cache => {
      // cache desirable files
      cache.addAll(installFilesDesirable);
      // cache essential files
      return cache.addAll(installFilesEssential);
    });
}
```

最后，我们添加 `install` 的事件监听函数。 `waitUntil` 方法确保所有代码执行完毕后，`service worker` 才会执行 `install`。执行 `installStaticFiles()`方法，然后执行 `self.skipWaiting()`方法使service worker进入 `active` 状态。

```javascript
// application installation
self.addEventListener('install', event => {
  console.log('service worker: install');
  // cache core files
  event.waitUntil(
    installStaticFiles()
    .then(() => self.skipWaiting())
  );
});
```

#### Activate 事件

当 install完成后， service worker 进入active状态，这个事件立刻执行。你可能不需要实现这个事件监听，但是示例代码在这里删除老旧的无用缓存文件：

```javascript
// clear old caches
function clearOldCaches() {
  return caches.keys()
    .then(keylist => {
        return Promise.all(
            keylist
            .filter(key => key !== CACHE)
            .map(key => caches.delete(key))
        );
    });
}

// application activated
self.addEventListener('activate', event => {
    console.log('service worker: activate');
    // delete old caches
    event.waitUntil(
        clearOldCaches()
        .then(() => self.clients.claim())
    );
});
```

注意，最后的 `self.clients.claim()` 方法设置本身为 `active` 的 `service worker`。

#### Fetch 事件

当有网络请求时这个事件被触发。它调用respondWith()方法来劫持 GET 请求并返回：

1. 缓存中的一个静态资源。
1. 如果 #1 失败了，就用 Fetch API（这与 service worker 的fetch 事件没关系）去网络请求这个资源。然后将这个资源加入缓存。
1. 如果 #1 和 #2 都失败了，那就返回一个适当的值。

```javascript
// application fetch network data
self.addEventListener('fetch', event => {
  // abandon non-GET requests
  if (event.request.method !== 'GET') return;
  let url = event.request.url;
  event.respondWith(
    caches.open(CACHE)
      .then(cache => {
        return cache.match(event.request)
          .then(response => {
            if (response) {
              // return cached file
              console.log('cache fetch: ' + url);
              return response;
            }
            // make network request
            return fetch(event.request)
              .then(newreq => {
                console.log('network fetch: ' + url);
                if (newreq.ok) cache.put(event.request, newreq.clone());
                return newreq;
              })
              // app is offline
              .catch(() => offlineAsset(url));
          });
      })
  );
});
```

最后这个 `offlineAsset(url)` 方法通过几个辅助函数返回一个适当的值：

```javascript
// is image URL?
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f);
function isImage(url) {

  return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);

}


// return offline asset
function offlineAsset(url) {
  if (isImage(url)) {
    // return image
    return new Response(
      '<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">offline</text></svg>',
      { headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store'
      }}
    );
  }
  else {
    // return page
    return caches.match(offlineURL);
  }
}
```

`offlineAsset()` 方法检查是否是一个图片请求，如果是，那么返回一个带有 “offline” 字样的 SVG。如果不是，返回 `offlineURL` 页面。

#### 第四步：创建一个可用的离线页面

离线页面可以是一个静态页面，来说明当前用户请求不可用。然而，我们也可以在这个页面上列出可以访问的页面链接。

在 `main.js` 中我们可以使用 Cache API 。然而API 使用 `promises`，在不支持的浏览器中会引起所有 `javascript` 运行阻塞。为了避免这种情况，我们在加载另一个 `/js/offlinepage.js` 文件之前必须检查离线文件列表和是否支持 `Cache API` 。

```javascript
// load script to populate offline page list
if (document.getElementById('cachedpagelist') && 'caches' in window) {
  var scr = document.createElement('script');
  scr.src = '/js/offlinepage.js';
  scr.async = 1;
  document.head.appendChild(scr);
}
```

`/js/offlinepage.js` locates the most recent cache by version name, 取到所有 URL的key的列表，移除所有无用 URL，排序所有的列表并且把他们加到 ID 为 `cachedpagelist` 的 DOM 节点中：

```javascript
// cache name
const
  CACHE = '::PWAsite',
  offlineURL = '/offline/',
  list = document.getElementById('cachedpagelist');
// fetch all caches
window.caches.keys()
  .then(cacheList => {
    // find caches by and order by most recent
    cacheList = cacheList
      .filter(cName => cName.includes(CACHE))
      .sort((a, b) => a - b);
    // open first cache
    caches.open(cacheList[0])
      .then(cache => {
        // fetch cached pages
        cache.keys()
          .then(reqList => {
            let frag = document.createDocumentFragment();
            reqList
              .map(req => req.url)
              .filter(req => (req.endsWith('/') || req.endsWith('.html')) && !req.endsWith(offlineURL))
              .sort()
              .forEach(req => {
                let
                  li = document.createElement('li'),
                  a = li.appendChild(document.createElement('a'));
                  a.setAttribute('href', req);
                  a.textContent = a.pathname;
                  frag.appendChild(li);
              });
            if (list) list.appendChild(frag);
          });
      })
  });
```

## PWA 陷阱

### URL 隐藏

我们的示例代码隐藏了 URL 栏，我不推荐这种做法，除非你有一个单 url 应用，比如一个游戏。对于多数网站，`manifest` 选项 `display: minimal-ui` 或者 `display: browser` 是最好的选择。

### 缓存太多

你可以缓存你网站的所有页面和所有静态文件。这对于一个小网站是可行的，但这对于上千个页面的大型网站实际吗？没有人会对你网站的所有内容都感兴趣，而设备的内存容量将是一个限制。即使你像示例代码一样只缓存访问过的页面和文件，缓存大小也会增长的很快。

也许你需要注意：

* 只缓存重要的页面，类似主页，和最近的文章。
* 不要缓存图片，视频和其他大型文件
* 经常删除旧的缓存文件
* 提供一个缓存按钮给用户，让用户决定是否缓存

### 缓存刷新

在示例代码中，用户在请求网络前先检查该文件是否缓存。如果缓存，就使用缓存文件。这在离线情况下很棒，但也意味着在联网情况下，用户得到的可能不是最新数据。

静态文件，类似于图片和视频等，不会经常改变的资源，做长时间缓存没有很大的问题。你可以在HTTP 头里设置 Cache-Control 来缓存文件使其缓存时间为一年（31,536,000 seconds）：

```
Cache-Control: max-age=31536000
```

页面，CSS和 script 文件会经常变化，所以你应该改设置一个很短的缓存时间比如 24 小时，并在联网时与服务端文件进行验证：

```
Cache-Control: must-revalidate, max-age=86400
```