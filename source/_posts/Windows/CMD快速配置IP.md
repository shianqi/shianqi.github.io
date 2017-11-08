---
title: CMD快速配置IP地址和DNS
date: 2016-09-04 13:30:44
tags: 
    - IP
    - DNS
---

将IP和DNS配置为静态
- `netsh interface ip set address 以太网 static 123.123.123.123 255.255.255.192  123.123.123.1`
- `netsh interface ip set dns "以太网" static 202.207.0.1`

将IP和DNS配置为动态
- `netsh interface ip set address "以太网" dhcp`
- `netsh interface ip set dns "以太网" dhcp`

也可以写入到 `.bat` 批处理脚本中