---
title: Docker Compose 模板文件
date: 2018-09-04 18:14:36
tags:
    - Docker
---
# Docker Compose 模板文件

## 简介

默认的配置文件名为 `docker-compose.yml`，格式为 YAML 格式。

```yml
version: "3"

services:
  webapp:
    image: examples/web
    posts: "80:80"
    volumes: "/data"
```

每个服务都必须通过 `image` 指定镜像或者 `build` 指令（需要 Dockerfile）等来自动构建生成镜像，如果使用 `build` 指令，在 `Dockerfile` 中的选项会自动获取，无需再次设置。

## 参数

### build

指定 `Dockerfile` 的路径（绝对路径或相对路径）

可以使用 `context` 指令指定位置，`dockerfile` 指令指定 `Dockerfile` 文件名， `arg` 指令指定构建时的变量。

eg:

```yml
version: "3"
services:
  webapp:
    bulid:
      context: ./div
      dockerfile: Dockerfile-alternate
      args:
        buildno: 1
```

### cap_add, cap_drop

指定容器的内核能力

eg: 拥有所有能力：

```yml
cap_add:
  - ALL
```

eg: 去掉 NET_ADMIN 能力

```yml
cap_drop:
  - NET_ADMIN
```

### command

覆盖容器启动的命令

```yml
command: echo "hello world"
```

### configs

### cgroup_parent

指定父 `cgroup` 组，继承该组的资源限制。

### container_name

指定容器名称，默认使用 `项目名称_服务名称_序号`格式。

### deploy

### devices

指定设备映射关系

```yml
devices:
  - "/dev/ttyUSB1:/dev/ttyUSB0"
```

### depends_on

解决容器依赖，启动先后问题。

```yml
version: '3'

services:
  web:
    build:
    depends_on:
      - db
      - redis

  redis:
    image: redis

  db:
    image: mongo
```

### dns

自定义 `DNS` 服务器，可以是一个值，也可以是一个列表。

```yml
dns: 8.8.8.8

dns:
  - 8.8.8.8
  - 114.114.114.114
```

### dns_search

配置 `DNS` 搜索域。

```yml
dns_search: example.com

dns_search:
  - domain1.example.com
  - domain2.example.com
```

### tmpfs

挂载一个 tmpfs 文件系统到容器。

### env_file

从文件中获取环境变量

环境变量格式如下：

```text
PROG_ENV=development
```

### environment

设置环境变量，可以使用数据或者字典两种格式，只给定变量名会自动获取主机上的变量值，避免数据泄漏。

```yml
environment:
  RACK_ENV: development
  SESSION_SECRET:

environment:
  - RACK_ENV=development
  - SESSION_SECRET
```

如果变量名称用到 `true` | `false`, `yes` | `no` 等表达布尔含义的值，最好放到引号里。

### expose

暴露端口，但不映射到宿主机，仅可以指定内部端口为参数

### external_links

**不建议使用**： 链接 `docker-compose` 外部容器，甚至非 `Compose` 管理的外部容器

### extra_hosts

指定额外的 host 映射

```yml
extra_hosts:
  - "googledns:8.8.8.8"
  - "dockerhub:52.1.157.61"
```

### healthcheck

检查容器是否正常

```yml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]
  interval: 1m30s
  timeout: 10s
  retries: 3
```

### image

指定镜像名称或ID，如果本地不存在会尝试拉取这个镜像

### labels

为容器添加元数据

### logging

配置日志选项

```yml
logging:
  driver: syslog
  options:
    syslog-address: "tcp://192.168.0.42:123"
```

### network_mode

设置网络模式

### networks

配置容器链接的网络

```yml
version: "3"
services:

  some-service:
    networks:
      - some-network
      - other-network
network:
  some-network:
  other-network:
```

### pid

和主机进程共享命名空间

### ports

暴露端口信息，`宿主机端口:容器端口`，或仅指定容器端口（宿主机随机分配）

### secrets

储存敏感数据，例如 `mysql` 密码

```yml
version: "3"
services:

  mysql:
    image: mysql
    secrets:
      - db_root_password
      - my_other_secret

secrets:
  my_secret:
    file: ./my_secret.txt
  my_other_secret:
    external: true
```

### sysctls

配置容器内核参数

### ulimits

指定容器大小限制

nproc: 进程数
nofile：文件句柄数（软限制和硬限制）

```yml
ulimits:
  nproc: 65535
  nofile:
    soft: 20000
    hard: 40000
```

### volumes

数据卷所挂载路径设置

## 读取变量

```yml
version: "3"
services:

  db:
    image: "mongo:${MONGO_VERSION}"
```

`MONGO_VERSION=3.2 docker-compose up`, 会启动一个 `mongo:3.2` 镜像容器
`MONGO_VERSION=2.8 docker-compose up`, 会启动一个 `mongo:2.8` 镜像容器
