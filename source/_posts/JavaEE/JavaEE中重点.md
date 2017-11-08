---
title: JavaEE 考点
date: 2017-01-04 14:03:14
tags: 
    - JavaEE
    - Java
---

解决乱码
```
response.setContentType("text/html;charset=UTF-8");
```

接收参数
```
req.getParameter("words");
```

接收多个参数 返回数组
```
req.getParameterValues("接收多个参数");
```

输出
```
PrintWriter out = response.getWriter();
```

跳转JSP
```
req.getRequestDispatcher("calculator.jsp").forward(req, resp);
```

重定向
```
response.sendRedirect("http://www.baidu.com");
```

传参
```
req.setAttribute("number","hello");
```

JSP设置编码
```
<%@ page contentType="text/html;charset=UTF-8" language="java" import="??,??" %>
```

注解方式
```
@WebServlet(name = "Annotate", urlPatterns = {"/Annotate"})
```

Cookie
```
//javax.servlet.http.cookie
Cookie[] cookies = req.getCookies();
cookie = new Cookie("name","killer");
cookie.setPath(req.getContextPath());
cookie.setMaxAge(30);
resp.addCookie(cookie);
```

Session
```
HttpSession session = req.getSession(true);
session.setAttribute("max","1");
```

Servlet Context 用来不同Servlet传递数据
```
String s = (String)getServletContext().getAttribute("temp");
```

Filter
```
@WebFilter(filterName = "LoginFilter", urlPatterns = {"/Login"})
public class LoginFilter implements Filter{
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {}
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        filterChain.doFilter(servletRequest,servletResponse);
    }
    @Override
    public void destroy() {}
}
```

操作数据库
```
public class DatabaseManager {
    private Connection connection;

    public void init(){
        try {
            Class.forName("com.mysql.jdbc.Driver");
            connection =   DriverManager.getConnection("jdbc:mysql://localhost:3306/table?useUnicode=true& characterEncoding=utf8","root","");
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void close(){
        try {
            connection.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public boolean addOrDeleteOrUpdate(String sql){
        boolean i = true;
        try {
            PreparedStatement ps  = connection.prepareStatement(sql);
            i = ps.execute();
        } catch (Exception e){
            e.printStackTrace();
        }
        return i;
    }
}

```

* ** JavaEE ** 是一个标准中间件体系结构，是企业分布式应用开发标准。
* ** JDK ** (Java Development Kit) JDK是 Java 语言的软件开发工具包，它包含了JAVA的运行环境，JAVA工具和JAVA基础的类库
* ** JRE ** (Java Runtime Environment，Java运行环境)，运行JAVA程序所必须的环境的集合，包含JVM标准实现及Java核心类库。
* ** Servlet ** 是一种独立于操作系统平台和网络传输协议的服务器端的 Java 应用程序，它用来拓展服务器的功能，可以生成动态的Web页面
* ** JSP ** (Java Server Pages)，中文名叫java服务器页面，其根本是一个简化的Servlet设计。它是在传统的网页HTML（标准通用标记语言的子集）文件(*.htm,*.html)中插入Java程序段(Scriptlet)和JSP标记(tag)，从而形成JSP文件，后缀名为(*.jsp)
* ** Cookie ** 有时也用其复数形式 Cookies，指某些网站为了辨别用户身份、进行 session 跟踪而储存在用户本地终端上的数据（通常经过加密）。
* ** Session ** 称为“会话控制”。Session 对象存储特定用户会话所需的属性及配置信息。
* ** Servlet 上下文 ** 提供了一个同一 Web 应用内的不同资源间共享信息的场所。
* ** Filter ** 拦截请求和响应，以便查看、提取或以某种方式操作正在客户机和服务器之间交换的数据。
* ** Listener ** 是Servlet 2.4 规范以后增加的新特性。用来主动监听 Web 容器事件。
* ** JavaBean ** 是一些可移植、可重用，并可以组装到应用程序中的 Java 类。
* ** JDBC ** （Java Data Base Connectivity,java数据库连接）是一种用于执行SQL语句的Java API，可以为多种关系数据库提供统一访问，它由一组用Java语言编写的类和接口组成。
* ** JPA ** JPA全称Java Persistence API.JPA通过JDK 5.0注解或XML描述对象－关系表的映射关系，并将运行期的实体对象持久化到数据库中。
* ** EJB ** EJB是sun的JavaEE服务器端组件模型，设计目标与核心应用是部署分布式应用程序。
* ** Web服务 ** Web service是一个平台独立的，低耦合的，自包含的、基于可编程的web的应用程序，可使用开放的XML（标准通用标记语言下的一个子集）标准来描述、发布、发现、协调和配置这些应用程序，用于开发分布式的互操作的应用程序。

### java线程实现方法：
* 继承Thread类，重写父类run()方法
* 实现runnable接口
* 使用ExecutorService、Callable、Future实现有返回结果的多线

### java多态性的机制
* 重载：有同样的方法名称不同的参数列表。a(){} a(String b){}...
* 重写（也称覆盖）：即可以重新编写与父类同名方法形象的称之为重写（覆盖）。

### JSP中动态include和静态include区别：
动态INCLUDE在使用的时候，会先解析所要包含的页面（你例子中的included.jsp），解析后在和主页面放到一起显示；
静态INCLUDE在使用的时候，不会解析所要包含的页面（你例子中的included.htm），也就是说，不管你的included.htm中有什么，我的任务就是把你包含并显示，其他的一概不管搜索

jsp:include是先编译一下included.jsp文件，然后再包含        先编译，后包含
@ include是先把文件包含就来，然后统一编译                   先包含，后编译