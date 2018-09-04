---
title: 使用 Dockerfile 定制镜像
date: 2018-09-03 22:25:36
tags:
    - Docker
---
# 使用 Dockerfile 定制镜像

`Dockerfile` 是一个文本文件，其内包含了一条条的指令(Instruction)，每一条指令构建一层， 因此每一条指令的内容，就是描述该层应当如何构建。

## 指令

### FROM

指定基础镜像，必须是第一条

### RUN

用于执行命令行命令的，有两种格式：

* `shell` 格式：`RUN <COMMAND>`

* `exec` 格式：`RUN ["<COMMAND>", "<args1>", "<args2>", ...]`

每一个 `RUN` 命令都会创建一层镜像，如果每一个命令都使用一个 `RUN` 命令，那么整个项目变得臃肿，易出错。正确写法应该如下：

```dockerfile
FROM debian:jessie
RUN buildDeps='gcc libc6-dev make' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    ...
    # 清理为了编译构建需要的软件
    && rm -rf /var/lib/apt/lists/* \
    # 清理下载文件
    && rm redis.tar.gz \
    # 清理展开文件
    && rm -r /usr/src/redis \
    # 清理 apt 缓存
    && apt-get purge -y --auto-remove $buildDeps
```

每一层构建后要清理无关文件。