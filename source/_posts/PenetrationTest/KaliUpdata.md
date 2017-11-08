---
title: Kali-Linux 更新、环境配置
date: 2016-12-22 14:39:12
tags: 
    - Kali
---

# kali linux的更新源:
```
vi /etc/apt/sources.list
```

```
#kali官方源
deb http://http.kali.org/kali kali-rolling main non-free contrib
#阿里云源
deb http://mirrors.aliyun.com/kali sana main non-free contrib
deb http://mirrors.aliyun.com/kali-security/ sana/updates main contrib non-free
deb-src http://mirrors.aliyun.com/kali-security/ sana/updates main contrib non-free
```

# 对Kali进行清洁、更新、升级和发行版升级等处理
```
apt-get clean && apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y 
```

# 汉化火狐浏览器
```
apt-get install iceweasel-l10n-zh-cn
```

# 安装中文输入法(搜狗)
```
apt-get install fcitx
dpkg -i sougoupinyinXXX.deb
apt-get -f install
```


> http://os.51cto.com/art/201405/439494.htm
> http://blog.csdn.net/q_l_s/article/details/53185601
