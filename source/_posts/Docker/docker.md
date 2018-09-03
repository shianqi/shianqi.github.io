---
title: Docker 基本命令
date: 2018-09-03 14:20:36
tags:
    - Docker
---
# Docker 基本命令

## 镜像

### 搜索

```bash
docker search [OPTIONS] TERM
```

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

### 推送镜像

```bash
docker push [OPTIONS] NAME[:TAG]
```

## 容器

### 启动已终止容器

```bash
docker container start [OPTIONS] CONTAINER [CONTAINER...]
```

### 查看日志

```bash
docker container logs [OPTIONS] CONTAINER
```

### 终止容器

```bash
docker container stop [OPTIONS] CONTAINER [CONTAINER...]
```

### 重启容器

```bash
docker container restart [OPTIONS] CONTAINER [CONTAINER...]
```

### 删除容器

```bash
docker container rm [OPTIONS] CONTAINER [CONTAINER...]
```

### 清理所有终止状态容器

```bash
docker container prune [OPTIONS]
```

### 进入容器

#### exec 命令 （推荐）

从这个 stdin 中 exit 不会导致容器停止

```bash
docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
```

常用OPTIONS：
|option|描述|
|---|---|
|`-i -t`|两个参数，`-i` 交互式操作，`-t`终端|
|`-w`|容器的工作目录|
|`-e`|设置 ENV|

#### attach 命令

注意: **如果从这个 stdin 中 exit，会导致容器停止**

```bash
docker attach [OPTIONS] CONTAINER
```

### 查看存储层变化

```bash
docker diff CONTAINER
```

### 提交变更

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

## 导入导出

### 导出容器快照

```bash
docker export [OPTIONS] CONTAINER
```

eg:

```bash
docker export 329a2e380 > ubuntu.tar
```

### 导入容器

#### docker import

导入容器快照

```bash
docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]
```

eg: 导入容器快照

```bash
cat ubuntu.tar | docker import - test/ubuntu:v1.0
```

eg: 指定url或目录导入

```bash
docker import http://shianqi.com/exampleimage.tgz shianqi/imagerepo
```

#### docker load

导入镜像存储文件

```bash
docker load [OPTIONS]
```

**区别**： 导入容器快照将丢弃所有的历史记录和元数据信息，导入镜像存储文件将保存完整记录，体积也要大。从容器快照文件中导入可以重新指定标签等信息。