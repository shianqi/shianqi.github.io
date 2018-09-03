---
title: Docker 基本命令
date: 2018-09-03 14:20:36
tags:
    - Docker
---
# Docker 基本命令

## 镜像

### 获取

```bash
docker pull [OPTIONS] NAME[:TAG|@DIGEST]
```

### 运行

```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

### 列出已下载镜像

```bash
docker image ls [OPTIONS] [REPOSITORY[:TAG]]
```

常用OPTIONS：
|option|描述|
|---|---|
|`-i -t`|两个参数，`-i` 交互式操作，`-t`终端|
|`-p`|指定端口|
|`-d`|在后台运行容器并打印容器ID|
|`--name`|为容器指定名称|
|`--rm`|退出容器后将其删除|

### 删除本地镜像

```bash
docker image rm [OPTIONS] IMAGE [IMAGE...]
```

### 列出虚悬镜像

由于同名镜像更新产生

```bash
docker image ls -f dangling=true
```

删除虚悬镜像

```bash
docker image prune
```

### 占用磁盘空间

```bash
docker system df [OPTIONS]
```

### 查看历史

```bash
docker history [OPTIONS] IMAGE
```

## 容器

### 查看存储层变化

```bash
docker diff CONTAINER
```

### 提交

```bash
docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]
```

eg:

```bash
docker commit --author "mail@shianqi.com" --message "Change index.html" webserver nginx:v2
```

常用于学习，还可以在被入侵后保存现场。不要使用 `docker commit` 定制镜像，应该用 `Dockerfile`

### 容器和本机文件传输

docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-
