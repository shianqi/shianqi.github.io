---
title: 使用 Dockerfile 定制镜像
date: 2018-09-03 22:25:36
tags:
    - Docker
---
# 使用 Dockerfile 定制镜像

`Dockerfile` 是一个文本文件，其内包含了一条条的指令(Instruction)，每一条指令构建一层， 因此每一条指令的内容，就是描述该层应当如何构建。

## 重要概念

### 构建上下文

`docker` 的构建命令：

```bash
docker build [OPTIONS] PATH | URL | -
```

最后的参数是指上下文路径，而不是 Dockerfile 所在路径，docker 在构建的时候，会将上下文路径下的所有内容打包，然后上传给 Docker 引擎，Docker 就有权限访问上下内的文件了。

如果需要访问的文件路径超出上下文的范围，Docker 引擎就无法获得这些文件的位置，应该将这些文件复制到上下文目录中。更不应该把 Dockerfile 放到硬盘根目录去构建。如果目录中有些不希望在构建中传递给 Docker 的文件，可以放在 `.dockerignore` 文件夹中。

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

每一层构建后要清理无关文件。可以使用 `docker diff` 命令查看文件变化。

### COPY

```text
COPY <源路径>...<目标路径>
COPY ["<源路径>",... "<目标路径>"]
```

源路径可以是多个，甚至通配符，通配符要满足 Go 的 filepath.Match 规则，例如：

```dockerfile
COPY hom* /mydir/
COPY hom?.txt /mydir/
```

`COPY` 命令会保留源文件的各种源数据属性

### ADD

在 `COPY` 命令的基础上添加了自动解压的功能，推荐优先使用 `COPY` 命令

### CMD

用于指定默认的容器主进程的启动命令，运行的时候可以指定新的命令来代替镜像设置中的这个默认命令

```dockerfile
# shell
COPY <COMMAND>
# exec
COPY ["<COMMAND>", "<args1>", "<args2>", ...]
```

推荐使用 `exec` 格式，`shell`格式实际的命令会被包装为 `sh -c` 的参数形式执行。

```dockerfile
CMD echo $HOME
```

解释为：

```dockerfile
CMD ["sh", "-c", "echo $HOME"]
```

### ENTRYPOINT

### ENV

配置环境变量：

```dockerfile
ENV VERSION=1.0 DEBUG=on \
    NAME="Happy Feet"

RUN rm "node-v$VERSION-linux-x64.tar.xz"
```

### ARG

和 ENV 一样，都是设置环境变量，不同的是 ARG 所设置的环境变量，在将来运行时是不会存在这些环境变量的。但不要使用 ARG 保存密码，因为 docker history 可以看到所有值。

### VOLUME 定义匿名卷

```dockerfile
VOLUME ["<路径1>", "<路径2>"...]
VOLUME <路径>
```

为了保持容器存储层不发生写操作，对于数据库类需要保存动态数据的应用，为了防止运行时用户忘记挂载卷，可以先用 `VOLUME` 命令指定某些目录为匿名卷，防止向容器存储层写大量数据。

```dockerfile
VOLUME /data
```

运行时：

```bash
docker run -d -v mydata:/data xxx
```

### EXPOSE

声明端口

```dockerfile
EXPOSE <端口1> [<端口2>]
```

`EXPOSE` 仅仅声明容器打算使用的端口，并不会自动在宿主进行端口映射。

`-p` 是将容器的对应端口服务公开给外界访问。

### WORKDIR

指定工作目录，以后各层的当前目录就被改为指定目录。

**错误**示例

```dockerfile
RUN cp /app
RUN echo "hello" > world.txt
```

新手容易的错误：因为构建分层存储，所以第一层 `RUN cd /app` 的执行仅仅是当前进程的工作目录变更，一个内存上的变化而已，其结果不会造成任何文件变更。而到第二层的时候，启动的是一个全新的容器，跟第一层的容器更完全没关系，自然不可能继承前一层构建过程中的内存变化。

### USER

指定当前用户，和 `WORKDIR` 类似。

### HEALTHCHECK

告诉 `Docker` 应该如何判断容器的状态是否正常，防止程序进入死循环，无法通过退出判断。

只可出现一次，多写只会生效最后一次。

### ONBUILD

`ONBUILD` 是一个特殊的指令，后面跟其他指令，这些指令在当前镜像构建时不会执行，只有以当前镜像为基础的镜像，去构建下一级镜像的时候才会被执行。
