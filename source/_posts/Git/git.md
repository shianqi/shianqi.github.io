---
title: Git 常用命令
date: 2017-05-22 15:17:24
tags: 
    - git
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=32717985&auto=0&height=66"></iframe>

## 安装
#### 源码安装：
先安装依赖库
```
$ sudo yum install curl-devel expat-devel gettext-devel \
   openssl-devel zlib-devel
$ sudo apt-get install libcurl4-gnutls-dev libexpat1-dev gettext \
   libz-dev libssl-dev
```
为了能够添加更多格式的文档（如 doc, html, info），安装依赖包：
```
$ sudo yum install asciidoc xmlto docbook2x
$ sudo apt-get install asciidoc xmlto docbook2x
```
编译安装：
```
$ tar -zxf git-2.0.0.tar.gz
$ cd git-2.0.0
$ make configure
$ ./configure --prefix=/usr
$ make all doc info
$ sudo make install install-doc install-html install-info
```
更新 git
```
$ git clone git://git.kernel.org/pub/scm/git/git.git
```
## 常用命令
| 命令 | 描述 |
|------|------|
|`git init`|创建版本库|
|`git add <file>`| 把文件添加到仓库 |
|`git add -A`| 全部添加到仓库 |
|`git commit -m "message"`|提交到仓库，并添加描述|
|`git status`|查看当前仓库状态|
|`git diff`|工作区(work dict)和暂存区(stage)的比较|
|`git diff --cached`|暂存区(stage)和分支(master)的比较|
|`git diff HEAD -- <file>`|查看工作区和版本库里面最新版本的区别|
|`git log`|查看提交历史|
|`git reflog`|记录操作命令|
|`git reset --hard HEAD~n`|回退n个版本|
|`git reset --hard $id`|回到 $id 版本|
|`git checkout -- <file>`|丢弃工作区的修改|
|`git reset HEAD <file>`|把暂存区的修改撤销掉|

## 远程命令

| 命令 | 描述 |
|------|------|
|`git remote add origin <git@address>`|关联远程库|
|`git push -u origin master`|把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来|
|`git push origin master`|推送到远程|
|`git clone <git@address>`|克隆远程库到本地|
|`git fetch`|将远程分支信息获取到本地|

## 分支管理
| 命令 | 描述 |
|------|------|
|`git branch`|查看分支信息，带*为当前|
|`git checkout -b <branch-name>`|创建并切换到新分支|
|`git checkout -b dev origin/dev`|创建远程 `origin` 的 `dev` 分支到本地|
|`git branch --set-upstream dev origin/dev`|设置dev和origin/dev的链接|
|`git branch <branch-name>`|创建分支|
|`git checkout <branch-name>`|切换分支|
|`git merge <branch-name>`|合并某分支到当前分支|
|`git merge --no-ff -m "<message>" <branch-name>`|禁用`Fast forward`合并，可以看到合并历史|
|`git branch -d <branch-name>`|删除分支|
|`git branch -D <branch-name>`|丢弃一个没有合并的分支|
|`git log --graph`| 查看分支合并图 |

## 分支策略
| 分支 | 描述 |
|------|------|
|`master`|稳定，仅用来发布新版本，不能在上面干活|
|`dev`|不稳定，到达新版本合并到`master`上|

![分支](http://cdn.shianqi.com/20171110002609_OvluW5_git.png)

每人都有自己的分支，时不时地往dev分支上合并就可以了。

`master` 分支是主分支，因此要时刻与远程同步；

`dev` 分支是开发分支，团队所有成员都需要在上面工作，所以也需要与远程同步；

`bug` 分支只用于在本地修复bug，就没必要推到远程了，除非老板要看看你每周到底修复了几个bug；

`feature` 分支是否推到远程，取决于你是否和你的小伙伴合作在上面开发。

## fork的项目与原作者同步

```
git remote add ecmadao git@github.com:ecmadao/react-times.git

git fetch ecmadao

git merge ecmadao/master

git push origin master

```

## bug分支

commit 时关闭 `issues`
```
git commit -m "fix #<issues-id>"
```

| 命令 | 描述 |
|------|------|
|`git stash`|保存当前工作现场|
|`git stash list`|查看所有工作现场|
|`git stash apply`|恢复工作现场，但不删除|
|`git stash drop`|删除工作现场|
|`git stash pop`|恢复工作现场并删除|

1. 在 `dev` 下正常开发中，说有1个bug要解决，首先我需要把 `dev` 分支封存 `stash`
2. 在 `master` 下新建一个`issue-101`分支，解决bug，成功后
3. 在 `master` 下合并 `issue-101`，并 `fix #1`
4. 在 `dev` 下合并 `master`，这样才同步了里面的bug解决方案
5. 恢复`dev`封存 `stash pop`，系统自动合并 & 提示有冲突，因为封存前 `dev` 写了东西，此时去文件里手动改冲突
6. 继续开发`dev`，最后 `add` ，`commit`
7. 在 `master` 下合并最后完成的`dev`

## Feature分支

开发一个新feature，最好新建一个分支；

## 多人协作
从远程库 `clone` 时，默认情况下，只能看到本地的 `master` 分支

| 命令 | 描述 |
|------|------|
|`git remote`|查看远程库信息|
|`git remote -v`|查看远程库详细信息，如果没有推送权限，看不到 `push` 地址|

多人协作的工作模式通常是这样：

1. 首先，可以试图用 `git push origin branch-name`推送自己的修改
2. 如果推送失败，则因为远程分支比你的本地更新，需要先用 `git pull` 试图合并
3. 如果合并有冲突，则解决冲突，并在本地提交
4. 没有冲突或者解决掉冲突后，再用 `git push origin branch-name` 推送就能成功！
5. 如果 `git pull` 提示 `“no tracking information”`，则说明本地分支和远程分支的链接关系没有创建，用命令 `git branch --set-upstream branch-name origin/branch-name`。

## tag
| 命令 | 描述 |
|------|------|
|`git tag v1.0`|打一个标签|
|`git tag -a v0.1 -m "version 0.1 released" 3628164`| 带有说明的标签，用-a指定标签名，-m指定说明文字 |
|`git tag`|查看所有标签|
|`git log --pretty=oneline --abbrev-commit`|查看历史提交|
|`git tag v0.9 6224937`|给历史 `commit` 添加 `tag` |
|`git show <tagname>`|查看标签信息|
|`git tag -d v0.1`|删除标签|
|`git push origin <tagname>`|推送某个标签到远程|
|`git push origin --tags`|推送全部尚未推送到远程的本地标签|

## gitignore
查找 `gitignore` 哪条规则 ignore 了该文件
```
git check-ignore -v <file>
```