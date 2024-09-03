---
title: 部署网站小实验
description: 网站与https证书
slug: iis-https
authors: fish
tags: [笔记, 总结]
date: 2024-09-03
hide_table_of_contents: false
---

在Windows server 2019上部署网站并配置https证书，相较于传统的网站搭建和openssh签发证书，Windows server显然提供了一种更为简单即得的网站部署方案与证书签发，只需要通过点点点就可以完成，无需用户面对复杂的命令行

<!-- truncate -->

## 实验准备

VMware虚拟机、Windows server 2019、Windows 10

## 实验内容

### 配置服务器静态IP

作为网站和dns服务器，使用动态IP会导致客户端无法正常访问，因此需要将服务端配置为静态IP

打开网络连接，右击网卡，选择属性

![01](https://pic.imgdb.cn/item/66d6e31ed9c307b7e97b698c.png)

双击IPv4，打开IPv4设置

![](https://pic.imgdb.cn/item/66d6e33fd9c307b7e97b8196.png)

将IP设为手动提供，并设置dns服务器为本地

![](https://pic.imgdb.cn/item/66d6e353d9c307b7e97b8d8c.png)

一路确定回到网络连接界面，双击网卡-详细信息，查看配置结果

![](https://pic.imgdb.cn/item/66d6e365d9c307b7e97b9985.png)

这样，客户端可以通过固定IP访问服务器提供的网页与DNS服务

### 配置网站

#### 安装IIS

打开服务器管理器，在管理选项卡中找到添加角色和功能

![](https://pic.imgdb.cn/item/66d6e376d9c307b7e97ba594.png)

默认下一步直到服务器角色，在服务器角色中选择`web服务器(IIS)`，添加所有功能，下一步

![](https://pic.imgdb.cn/item/66d6e389d9c307b7e97bb217.png)

在Web服务器角色的下级角色服务中，勾选安全性一栏全部选项，下一步

![](https://pic.imgdb.cn/item/66d6e3a3d9c307b7e97bc21a.png)

安装完成，可以看到服务器管理器左侧出现IIS的选项

![](https://pic.imgdb.cn/item/66d6e3bad9c307b7e97bd041.png)

![](https://pic.imgdb.cn/item/66d6e3c9d9c307b7e97bda3e.png)

访问`http://localhost`可以看到IIS默认网页，表示IIS安装并启动成功

![](https://pic.imgdb.cn/item/66d6e3d8d9c307b7e97be4c8.png)

#### 安装网站

在工具中找到IIS管理器并启动

![](https://pic.imgdb.cn/item/66d6e3e8d9c307b7e97bef7b.png)

在本地服务器WIN2019处右击，添加网站

![](https://pic.imgdb.cn/item/66d6e3f3d9c307b7e97bf623.png)

输入网站信息，确定，提示重复绑定，确定

![](https://pic.imgdb.cn/item/66d6e3ffd9c307b7e97bfed8.png)

点击默认网站，停止，以同样方式启动我们自己新建的网站

![](https://pic.imgdb.cn/item/66d6e41bd9c307b7e97c1446.png)

![](https://pic.imgdb.cn/item/66d6e429d9c307b7e97c1fba.png)

现在我们访问`http://localhost`是我们自己的网页了

![](https://pic.imgdb.cn/item/66d6ee2dd9c307b7e9881af5.png)

### 配置DNS

#### 安装DNS

打开服务器管理器，在管理选项卡中找到添加角色和功能

![](https://pic.imgdb.cn/item/66d6e376d9c307b7e97ba594.png)

默认下一步直到服务器角色，勾选DNS服务器，添加功能

![](https://pic.imgdb.cn/item/66d6e8bcd9c307b7e97f5d2b.png)

安装

![](https://pic.imgdb.cn/item/66d6e8f6d9c307b7e97f8afa.png)

![](https://pic.imgdb.cn/item/66d6e92ad9c307b7e97fb065.png)

#### 配置DNS服务器

在工具中找到DNS，选中并打开

![](https://pic.imgdb.cn/item/66d6e957d9c307b7e97fd14f.png)

选中服务器-正向查找区域-右击-新建区域，一路下一步

![](https://pic.imgdb.cn/item/66d6e998d9c307b7e97ffcf4.png)

设置区域名称，下一步直到完成

![](https://pic.imgdb.cn/item/66d6eaa9d9c307b7e980b431.png)

![](https://pic.imgdb.cn/item/66d6eaccd9c307b7e980cbb8.png)

下面我们来配置域名对应IP

选中刚添加的区域`fish.com`-右击-新建主机-输入主机名称与IP-添加主机

![](https://pic.imgdb.cn/item/66d6eb00d9c307b7e980f0b0.png)

![](https://pic.imgdb.cn/item/66d6eb5dd9c307b7e98136a6.png)

打开nslookup可以查看服务器域名是否配置成功

```
名称：	www.fish.com
Address：192.168.1.123    #这表示域名www.fish.com已经成功解析到192.168.1.123
```



![](https://pic.imgdb.cn/item/66d6eed2d9c307b7e989ec7b.png)

#### 配置客户端DNS

由于是实验环境，所以我们需要指定dns解析，配置客户端dns解析与配置服务器静态IP的步骤是一样的，如果忘记可以跳转[配置服务器静态IP](#配置服务器静态IP)

在这里我们就不需要手动配置IP地址了，只需要确保客户端与服务端能相互连通

配置DNS服务器IP

![](https://pic.imgdb.cn/item/66d6f5b2d9c307b7e98fb3ba.png)



使用nslookup查看是否配置成功

```
DNS request timed out.
    timeout was 2 seconds.
默认服务器:  UnKnown
Address:  192.168.1.123

> www.fish.com
服务器:  UnKnown
Address:  192.168.1.123

名称:    www.fish.com
Address:  192.168.1.123

>
```

可以看到解析地址为Windows server 2019的地址这表明DNS服务器正常运行

#### 访问网站

访问`www.fish.com`

![](https://pic.imgdb.cn/item/66d6f690d9c307b7e9904b16.png)

成功访问

### 配置https

#### 安装证书服务

打开服务器管理器，在管理选项卡中找到添加角色和功能

![](https://pic.imgdb.cn/item/66d6e376d9c307b7e97ba594.png)

默认下一步直到服务器角色，选择AD证书服务

![](https://pic.imgdb.cn/item/66d6f853d9c307b7e991902e.png)

下一步直到角色服务，勾选全部选项，下一步

![](https://pic.imgdb.cn/item/66d6f87dd9c307b7e991af3d.png)

安装，配置证书服务，下一步

![](https://pic.imgdb.cn/item/66d6f974d9c307b7e992705b.png)

在角色服务中勾选，一路下一步到配置完成

![](https://pic.imgdb.cn/item/66d6fab3d9c307b7e9946c81.png)

#### 证书申请

打开IIS管理器-服务器证书-创建证书申请

![](https://pic.imgdb.cn/item/66d6fb41d9c307b7e995ed5b.png)

![](https://pic.imgdb.cn/item/66d6fb58d9c307b7e9963359.png)

![](https://pic.imgdb.cn/item/66d6fb9ed9c307b7e996c7b3.png)

下一步，保存证书到该文件内，确定

![](https://pic.imgdb.cn/item/66d6fbe1d9c307b7e9978f32.png)

启动默认站点

![](https://pic.imgdb.cn/item/66d6fc46d9c307b7e9989ae0.png)

访问`http://localhost/certsrv`，申请证书-高级证书申请-第二个选项

![](https://pic.imgdb.cn/item/66d6fc93d9c307b7e9997d78.png)

![](https://pic.imgdb.cn/item/66d6fca6d9c307b7e999c191.png)

![](https://pic.imgdb.cn/item/66d6fcd1d9c307b7e99a49ec.png)

将刚刚保存在文件内的证书复制到申请内，提交

![](https://pic.imgdb.cn/item/66d6fd15d9c307b7e99af9f6.png)

提交成功

![image-20240903201242978](C:/Users/wyt/AppData/Roaming/Typora/typora-user-images/image-20240903201242978.png)

打开工具-证书颁发机构

![](https://pic.imgdb.cn/item/66d6fd6bd9c307b7e99bc866.png)

WIN2019-挂起的申请-右击请求-所有任务-颁发

![](https://pic.imgdb.cn/item/66d6fdb3d9c307b7e99c8f30.png)

回到`http://localhost/certsrv`，查看挂起的证书的申请的状态

![](https://pic.imgdb.cn/item/66d6fe05d9c307b7e99dda72.png)

保存的申请证书，下载并保存

![](https://pic.imgdb.cn/item/66d6fe34d9c307b7e99e02e8.png)

打开IIS管理器-服务器证书-完成证书申请-选择上一步保存的证书-确定

![](https://pic.imgdb.cn/item/66d6fb41d9c307b7e995ed5b.png)

![](https://pic.imgdb.cn/item/66d6fefed9c307b7e99eb036.png)

现在，我们已经有了服务器证书了，可以配置https了

![](https://pic.imgdb.cn/item/66d6ff48d9c307b7e99eef15.png)

#### 证书启用

启用网站，添加绑定-切换类型-选定ssl证书-确定

![](https://pic.imgdb.cn/item/66d6ffd6d9c307b7e99f6658.png)

现在我们可以通过https访问我们的网站了，由于是自签证书，因此浏览器会提示不安全

![](https://pic.imgdb.cn/item/66d7002cd9c307b7e99fb1b6.png)
