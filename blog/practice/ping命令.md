---
title: 2024.08.23笔记
description: ping命令与用户管理
slug: ping-user-group
authors: fish
tags: [笔记, 总结]
date: 2024-08-23
hide_table_of_contents: false
---

ping命令详解，用户与组管理相关知识

<!-- truncate -->

## Ping命令

ping命令通过发送ICMP（Internet控制消息协议）回声请求消息到目标主机，并等待回声应答。通过这种方式，它可以测算往返时间和丢包情况

```
ping [选项] 目标主机名或ip地址

常用选项:
	-t: 持续ping目标主机直到用户停止
	-n count: 发送指定的数据包数
	-l: 指定发送的数据包的大小
	-r count: 记录传出和返回数据包的路由，在-r后输入需要显示的路由数量
	-f: 将数据包不分段
	-w deadline：设置等待响应的时间
	-W timeout：设置等待响应的超时时间
```

### TTL值

TTL的原理是每当一个数据包经过一个路由器时，TTL的值会减1。当TTL的值减到0时，路由器会丢弃该数据包并发送一个“TTL超时”（Time Exceeded）的ICMP消息给数据包的源地址。这样可以确保数据包不会无限循环在网络中，同时也可以帮助诊断网络故障。

Windows默认值为128

Linux默认值为64

## IP协议(Protocol)字段释义

| 数值 | 描述     |
| ---- | -------- |
| 1    | ICMP协议 |
| 6    | TCP协议  |
| 17   | UDP协议  |

## ICMP协议报文

ICMP报文可分为两大类：一、有关信息采集和配置的ICMP报文(称为查询（query）或者信息类报文（information message）。二、有关IP数据报传递的ICMP报文（称为差错报文（error message））

| 类型Type | 代码code | 描述                                             |
| -------- | -------- | ------------------------------------------------ |
| 0        | 0        | Echo Reply——回显应答（Ping应答）                 |
| 3        | 1        | Host Unreachable——主机不可达                     |
| 3        | 3        | Port Unreachable——端口不可达                     |
| 5        | 1        | Redirect for host——对主机重定向                  |
| 8        | 0        | Echo request——回显请求（Ping请求）               |
| 11       | 0        | TTL equals 0 during transit——传输期间生存时间为0 |

## Tracert命令

用于追踪分析数据包在网络中传输时经过的路径，并输出到达目标地址的延迟情况和节点信息。

```
tracert [选项] 目标主机或ip

常用选项:
	-d: 不将地址解析成主机名
	-h maximum_hops: 搜索目标的最大跃点数
	-w timeout: 等待每个回复的超时时间(以毫秒为单位)
```

## 用户与组管理

在Windows系统中，每个用户都有一个独一无二的SID（安全标识符Security Identifiers），是标识用户、组和计算机帐户的唯一的号码

### 通过命令行窗口查看SID

```
whoami /user   --查看当前用户的SID

wmic useraccount where name='用户名' get sid    --查看某个用户的SID
```

### SID组成

> S-1-5-21-310440588-250036847-580389505-1001

- S：SID的前缀，表示这是一个安全标识符
- 1：SID的版本号。目前，Windows SID的版本号始终为1
- 5：标志符的颁发机构。对于2000内的帐户，颁发机构就是NT，值是5
- 21-310440588-250036847-580389505："21" 表示域，后面的数字串表示域内的具体账户或组
- 1001：相对标识符

### 用户管理

```
net user   --列出所有用户账户

net user 账户名  --查看用户具体信息

net user 账户名 用户名 /add --添加新用户

net user 账户名 新密码 /mod --修改密码

net user 账户名 /delete  --删除用户
```

### 组账户

在Windows中，主要有两种类型的组账户：本地组和域组

```
net localgroup   ---列出所有本地组账户

net localgroup 组名 账户名 /add  ---添加用户到本地组
```

