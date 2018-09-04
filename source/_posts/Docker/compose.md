---
title: Docker Compose 使用
date: 2018-09-04 11:14:36
tags:
    - Docker
---
# Docker Compose 使用

定义和运行多个 Docker 容器的应用，它允许用户通过一个单独的 `docker-compose.yml` 模板文件（`YAML`格式）来定义一组相关联的应用容器为一个项目（project）。

## 命令

```bash
docker-compose [-f <arg>...] [options] [COMMAND] [ARGS...]
```

### 构建

```bash
docker-compose build [options] [--build-arg key=val...] [SERVICE...]
```

### 验证配置文件

验证 Compose 文件格式是否正确，正确则显示配置文件，错误显示原因

```bash
docker-compose config [options]
```

### 自动构建并启动服务

```bash
docker-compose up [options] [--scale SERVICE=NUM...] [SERVICE...]
```

自动尝试完成构建镜像，创建服务，启动服务，并关联服务相关容器。

链接的服务都将会被自动启动，除非已经处于运行状态。

默认 `docker-compose up` 启动容器在前台，`Ctrl-c` 会导致所有容器停止。

如果服务已经存在，`docker-compose up` 将会尝试停止容器，然后重新创建（保持使用 `volumes-from` 挂载的卷）。

`docker-compose up -d` 后台启动并运行所有容器。

`docker-compose up --no-recreate` 启动处于停止状态的容器，忽略已经运行的。

`docker-compose up --no-deps -d SERVICE` 只重启部署服务

### 停止

停止 `up` 命令所启动的容器，并移除网络

```bash
docker-compose down [options]
```

### 进入

进入指定容器

```bash
docker-compose exec [options] [-e KEY=VAL...] SERVICE COMMAND [ARGS...]
```

### 列出 Compose 包含的镜像

```bash
docker-compose images [options] [SERVICE...]
```

### 强制停止服务容器

```bash
docker-compose kill [options] [SERVICE...]
```

### 查看服务器的输出

```bash
docker-compose logs [options] [SERVICE...]
```

### 暂停一个服务

```bash
docker-compose pause [SERVICE...]
```

### 恢复一个暂停的服务

```bash
docker-compose unpause [SERVICE...]
```

### 查看某个容器的端口

```bash
docker-compose port [options] SERVICE PRIVATE_PORT
```

### 列出项目中的所有容器

```bash
docker-compose ps [options] [SERVICE...]
```

### 拉取项目所需镜像

```bash
docker-compose pull [options] [SERVICE...]
```

### 推送服务依赖的镜像到 Docker 镜像仓库

```bash
docker-compose push [options] [SERVICE...]
```

### 重启项目中的服务

```bash
docker-compose restart [options] [SERVICE...]
```

### 删除所有停止状态的服务容器

```bash
docker-compose rm [options] [SERVICE...]
```

### 在指定服务上执行一个命令

```bash
docker-compose run [options] [-v VOLUME...] [-p PORT...] [-e KEY=VAL...] [-l KEY=VALUE...] SERVICE [COMMAND] [ARGS...]
```

### 设置指定服务器运行的容器个数

```bash
docker-compose scale [options] [SERVICE=NUM...]
```

eg: 启动三个容器运行 web 服务，启动 2 个容器运行 db 服务

```bash
docker-compose scale web=3 db=2
```

当指定数目多于该服务实际运行容器，将创建新容器；反之将停止容器。

### 启动已经存在的服务容器

```bash
docker-compose start [SERVICE...]
```

### 停止已经运行的容器

```bash
docker-compose stop [options] [SERVICE...]
```

### 查看各个服务容器内运行的进程

```bash
docker-compose top [SERVICE...]
```
