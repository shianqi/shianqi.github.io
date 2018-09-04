---
title: Docker
date: 2018-09-03 14:15:36
tags:
    - Docker
---
# Docker

传统虚拟机是虚拟出一套硬件后，在其上运行一套完整的操作系统，再之上运行所需的应用进程。而容器内的应用进程直接运行于宿主机的内核，容器没有自己的内核，也没有进行硬件虚拟。因此容器比传统虚拟机更方便。

传统虚拟机：

![传统虚拟机](http://cdn.shianqi.com/20180903144605_O4W8uZ_Screenshot.png)

容器：

![容器](http://cdn.shianqi.com/20180903144626_tpANiO_Screenshot.png)

|特性|容器|虚拟机|
|---|---|---|
|启动|秒级|分钟级|
|硬盘使用|一般为MB|一般为GB|
|性能|接近原生|弱于|
|系统支持量|单机支持上千个容器|一般几十个|

## 镜像

Docker 采用`分层存储`的架构，构建时会一层一层构建，前一层是后一层的的基础。每一层构建完就不会发生改变，后一层上的任何改变只发生在自己这一层。**在构建镜像的时候要额外小心，每一层尽量只包含需要的东西，任何额外的东西应该在该层构建结束前清理掉**

## 容器

`镜像`和`容器`的关系，就像`类`和`对象`，镜像是静态的定义，容器是镜像运行时的实体。

容器不应该向其存储层内写入任何数据，容器存储层要保持无状态化。所有的文件写入操作，都应该使用`数据卷（Volume）`、或者绑定宿主目录，在这些 位置的读写会跳过容器存储层，直接对宿主（或网络存储）发生读写，其性能和稳定性更高。

数据卷的生存周期独立于容器，容器消亡，数据卷不会消亡。因此，使用数据卷后，容器删除或者重新运行之后，数据却不会丢失。