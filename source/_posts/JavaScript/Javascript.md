---
title: JavaScript 简介
date: 2016-09-04 13:30:44
tags: 
    - JavaScript
    - ECMAScript
---

* [1.JavaScript简介](#1)
    * [JavaScript简史](#1.1)
    * [JavaScript实现](#1.2)
* [2.在HTML中使用JavaScript](#2)
    * [\<script\>元素](#2.1)
    * [嵌入代码与外部文件](#2.2)
    * [\<noscript\>元素](#2.3)
    
<h2 id="1">JavaScript简介</h2>

<h3 id="1.1">JavaScript简史</h3>
* Netscape公司的布兰登·艾奇（Brendan Eich），1995年开发LiveScript为了搭上被媒体超热的Java的热潮，改名为JavaScript。
* 微软在Internet Explorer 3 中加入JScript
* 1997年，以 JavaScript 1.1 为蓝本的由欧洲计算机制造商协会（ECMA，European Computer Manufacturers Association）完成ECMA-262 定义名为ECMAScript
* 1998年，ISO/IEC（国标标准化组织和国际电工委员会）也采用了ECMAScript 作为标准（即ISO/IEC-16262）

<h3 id="1.2">JavaScript实现</h3>
* JavaScript包括 ECMAScript ，DOM ，BOM
* 核心（ECMAScript）
    * ECMA-262 第1版：本质上与Netscape的JavaScript 1.1 相同——只不过删除了所有针对浏览器的代码并作了一些较小的改动。
    * ECMA-262 第2版：这一版中内容的更新是为了与ISO/IEC-16262 保持严格一致，没有作任何新增、修改或删节处理。
    * ECMA-262 第3版：才是对该标准第一次真正的修改。修改的内容涉及字符串处理、错误定义和数值输出。这一版还新增了对正则表达式、新控制语句、try-catch 异常处理的支持，并围绕标准的国际化做出了一些小的修改。
    * ECMA-262 第4版：不仅包含了强类型变量、新语句和新数据结构、真正的类和经典继承，还定义了与数据交互的新方式。
            与此同时，TC39 下属的一个小组也提出了一个名为ECMAScript 3.1 的替代性建议，该建议只对这
            门语言进行了较少的改进。
    * ECMA-262 第5版：ECMAScript 3.1 成为ECMA-262 第5 版，并于2009 年12 月3 日正式发布。第五版澄清第三版中已知的歧义并添加了原生JSON解析，
            继承的方法和高级属性定义，严格模式。
* 文档对象模型（DOM）（提供访问和操作网页内容的方法和接口）
    * 文档对象模型（DOM，Document Object Model）是针对XML 但经过扩展用于HTML 的应用程序编
      程接口（API，Application Programming Interface）。
    * 其他DOM 标准
        * SVG（Scalable Vector Graphic，可伸缩矢量图）1.0；
        * MathML（Mathematical Markup Language，数学标记语言）1.0；
        * SMIL（Synchronized Multimedia Integration Language，同步多媒体集成语言）。

* 浏览器对象模型（BOM）（提供与浏览器交互的方法和接口）
    * 出新浏览器窗口的功能；
    * 移动、缩放和关闭浏览器窗口的功能；
    * 提供浏览器详细信息的navigator 对象；
    * 提供浏览器所加载页面的详细信息的location 对象；
    * 提供用户显示器分辨率详细信息的screen 对象；
    * 对cookies 的支持；
    * 像XMLHttpRequest 和IE 的ActiveXObject 这样的自定义对象。

<h2 id="2">在HTML 中使用JavaScript</h3>

<h3 id="2.1">script元素</h3>
* 6个属性
    * async：可选。表示应该立即下载脚本，但不应妨碍页面中的其他操作，比如下载其他资源或
      等待加载其他脚本。只对外部脚本文件有效。
    * charset：可选。表示通过src 属性指定的代码的字符集。由于大多数浏览器会忽略它的值，
      因此这个属性很少有人用。
    * defer：可选。表示脚本可以延迟到文档完全被解析和显示之后再执行。只对外部脚本文件有
      效。
    * language：已废弃。原来用于表示编写代码使用的脚本语言（如JavaScript、JavaScript1.2
      或VBScript）。大多数浏览器会忽略这个属性，因此也没有必要再用了。
    * src：可选。表示包含要执行代码的外部文件。
    * type：可选。可以看成是language 的替代属性(默认值为text/javascript)
 
* 注意转义
    ```HTML
    <script type="text/javascript">
        function sayScript(){
            alert("<\/script>");
            //此处要加转义符
        }
    </script>
    ```
* 注意不可省略
    ```HTML
    <script type="text/javascript" src="example.js"><script/>
    <!--注意：此处不能写成
      <script type="text/javascript" src="example.js"/>
    -->
    ```
* 带有src 属性的\<script\>元素不应该在其\<script\>和\</script\>标签之间再
      包含额外的JavaScript 代码。如果包含了嵌入的代码，则只会下载并执行外部
      脚本文件，嵌入的代码会被忽略。
      
* 无论如何包含代码，只要不存在defer 和async 属性，浏览器都会按照\<script\>元素在页面中
  出现的先后顺序对它们依次进行解析。（解析完第一个才会解析第二个）

* 由于浏览器会先解析完不使用defer 属性的\<script\>元素中的代码，然后再解析后面的内容，
  所以一般应该把\<script\>元素放在页面最后，即主要内容后面，\</body\>标签前面。

<h3 id="2.2">嵌入代码与外部文件</h3>

* 外部文件的优点：
    * 可维护性
    * 可缓存（如果有两个页面都使用同一个文件，那么这个文件只需下载一次。）
    * 适应未来（不存在上面提到的转义问题）

<h3 id="2.3">noscript元素</h3>

* 浏览器不支持脚本,或者浏览器支持脚本，但脚本被禁用时会显示标签中的文本。






