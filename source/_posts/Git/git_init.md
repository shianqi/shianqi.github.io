---
title: Git 连接 Github
date: 2017-04-04 13:30:44
tags: 
    - git
    - github
---

#### 初始化邮箱用户名

```bash
git config --global user.email "shianqi@imudges.com"
```

```bash
git config --global user.name "shianqi"
```

#### 生成SSH密钥

```bash
ssh-keygen -t rsa -C "shianqi@imudges.com"
```

windows 需要在 GitBush 中添加

将密钥添加到 Github [设置](https://github.com/settings/keys)中


#### 测试连接

```bash
ssh -T git@github.com
```
出现下面的文本，则链接成功
```
Hi shianqi! You've successfully authenticated, but GitHub does not provide shell access.
```
