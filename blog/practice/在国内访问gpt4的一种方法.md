---
title: 国内使用GPT-4的一种方法(已失效)
description: 使用coze+slack
slug: coze-gpt4
authors: fish
tags: [GPT,工具]
date: 2024-04-02
hide_table_of_contents: false
---

写代码的时候常常会遇到不懂的代码，查百度又需要时间筛选正确答案，并且遇到一大段不懂的代码时百度也无法对这段代码做出解释，这时候就需要GPT帮助阅读解释代码了，但是国内使用GPT-4有一点难度，有一个国内也能使用GPT-4的方法就很重要了

<!-- truncate -->

## coze

### 注册coze

打开[coze国际版](https://www.coze.com/)，注册登录，coze支持Google账户一键注册登录

![coze主界面_a1](https://pic.imgdb.cn/item/660bf6e79f345e8d035edcc2.png)

coze是字节公司推出的大语言模型，不得不说字节公司是真的有钱，GPT-4免费用，coze国内版使用的是云雀语言模型

### Get started后点击创建新的bot

![a2](https://pic.imgdb.cn/item/660bf82b9f345e8d036a5b7d.png)

### 创建新的bot

![a3](https://pic.imgdb.cn/item/660bf8bc9f345e8d036fa622.png)

- `workspace` bot分类
- `Bot name` bot名字 *必须得是唯一的*
- `Bot description` bot描述，可以在这里写下bot的描述
- `Profile picture` bot头像

### 进入到bot界面

![bot主界面_a4](https://pic.imgdb.cn/item/660bfdcd9f345e8d03a03cde.png)

可以看到的确是GPT-4，还可以切换128k模型

![GPT-4 128k_a5](https://pic.imgdb.cn/item/660bfe599f345e8d03a50429.png)

- `Temperature` 控制生成结果的多样性和随机性
- `Response max length` 响应长度
- `Dialog round` 对话轮次，你想让模型记住多少轮的对话

### 生成提示词

在左侧输入对模型简短的描述，然后点击Optimize自动生成提示词

![a7](https://pic.imgdb.cn/item/660c02929f345e8d03cf1028.png)

如果生成的提示词不满意还可以点击右上角的retry重新生成，我这里生成了一个会输出正确信息的全知全能的人工智能

### 添加插件

![a8](https://pic.imgdb.cn/item/660c03639f345e8d03d8b0ef.png)

在skills里的plugins添加插件，里面有很多插件可以选择，我这里添加了谷歌搜索和几个图片搜索

### 调试bot

在右侧可以调试bot直到你满意

### 推送bot

点击右上角publish，填写对bot的描述并确定，进入到发布页面

![a9](https://pic.imgdb.cn/item/6613de8668eb9357134bfd9d.png)

点击配置进入到slack配置界面，可以看到coze官方的配置文档，依照步骤操作即可

## slack

### 步骤一：创建一个 Slack 应用

首先，需要创建一个 Slack 应用并获取应用的配置信息。

1. 打开 [YourApps](https://api.slack.com/apps) 页面，并使用 Slack 账号登录。

2. 单击 **Create New App**。如果你是首次创建，单击 **Create an App**。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/46b0b27b8bf7417fb8cf90fcbc2371fc~tplv-10qhjjqwgv-image.image)

3. 在 **Create an app** 页面, 选择 **From scratch**。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/78dea91916b74415bc197d1aadd403c9~tplv-10qhjjqwgv-image.image)

4. 在 **Name app & choose workspace** 页面，输入应用名，并为这个应用选择一个关联的空间。

5. 查看并同意 Slack API 服务条款，然后单击 **Create App**。

   创建应用程序后，你将进入 **Basic Information** 页面。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/2bfededd95b64b6a93378d56b7d02437~tplv-10qhjjqwgv-image.image)

6. 转到基本信息页面的 **App Credentials** 部分，然后复制并保存 **Client ID** 和 **Client Secret** 以及 **Signing Secret**。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/82401abb8a964a73ab7998acf7b2e318~tplv-10qhjjqwgv-image.image)

### 步骤二：添加权限

创建好 Slack 应用后，你需要为创建的应用添加相关权限。

1. 在左侧面板，选择 **OAuth & Permissions。**

2. 在 **Scopes** 区域，单击 **Bot Token Scopes** 选项下的 **Add an OAuth Scope** 按钮，添加以下权限：

   - app_mentions:read
   - channels:history
   - chat:write
   - commands
   - groups:history
   - im:history
   - mpim:history
   - users:read

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/595192ca83604475bed4c3e54eb675a0~tplv-10qhjjqwgv-image.image)

3. 向上滑动到 **OAuth Tokens for Your Workspace** 区域，然后单击 **Install Workspace**。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/c255be2c5ab94720b70153859a30eaf8~tplv-10qhjjqwgv-image.image)

4. 在弹出的页面中审核创建的应用要申请的 Slack workspace 权限，然后单击 **Allow**。

5. 复制并保存 **Bot User OAuth Token**。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/e05e7282fa204b0a83fb370b09fa2da3~tplv-10qhjjqwgv-image.image)

### 步骤三：配置 Bot

完成权限配置后，你需要返回 Coze 平台为 Bot 配置 Slack 发布渠道。

1. 登录 [Coze](https://www.coze.com/home)。

2. 从左侧 **My Workspace** 区域，选择一个团队空间。

3. 在选定的团队空间中，单击目标 Bot 或创建 Bot。

4. 在 Bot 编排页面，单击 **Publish**。

5. 找到 Slack 渠道，然后单击 **Configure**。

   ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/19899c78518449819fe593a8da69809a~tplv-10qhjjqwgv-image.image)

6. 复制并保存 **OAuth2 Redirect URL**、**Event Request URL** 和 **Slash Request URL**。

7. 输入以下 Slack 配置信息：

   | **配置项**         | **说明**                                                     |
   | :----------------- | :----------------------------------------------------------- |
   | **Token**          | Slack 应用的 Bot User OAuth Token。 在已创建 Slack 应用的 **OAuth & Permissions** 页面中获取 **Bot User OAuth Token** 的值。 |
   | **Client ID**      | Slack 应用的 Client ID。 可以在已创建 Slack 应用的 **Basic Information** 页面获取。 |
   | **Client Secret**  | Slack 应用的 Client Secret。 可以在已创建 Slack 应用的 **Basic Information** 页面获取。 |
   | **Signing Secret** | Slack 应用的 Signing Secret。 可以在已创建 Slack 应用的 **Basic Information** 页面获取。 |

8. 单击 **Save** 保存配置。

### 步骤四：配置 Slack 应用

在获取到 **OAuth2 Redirect URL**、**Event Request URL** 和 **Slash Request URL** 后，你需要配置 Slack 应用。

1. 打开 [YourApps](https://api.slack.com/apps) 页面，找到已创建的应用。

2. 添加重定向 URL：

   1. 单击 **OAuth & Permissions**。

   2. 在 **Redirect URLs** 区域，单击 **Add New Redirect URL**，然后输入之前复制的重定向URL，再单击 **Add**。

   3. 单击 **Save URLs**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/d4d5ce8e9b6d4be7be876cfff46bcc9a~tplv-10qhjjqwgv-image.image)

3. 为 Slack 应用配置要订阅的 Bot 事件。Slack 会通过指定的请求 URL 向 Bot 发送订阅的事件活动。

   1. 单击 **Event Subscriptions**，并开启 **Enable Events** 功能。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/bfefd50a0e2a4330b7ae87c028751f27~tplv-10qhjjqwgv-image.image)

   2. 在 **Request URL** 输入框内输入之前复制的 Event Request URL。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/e8cff0014d9048b0995cb299844b935d~tplv-10qhjjqwgv-image.image)

   3. 展开 **Subscribe to bot events** 配置面板，然后单击 **Add Bot User Event**，添加要订阅的时间，例如：`app_mentions` 和 `message.im`。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/7500599a524148c187e7cb245f10bb80~tplv-10qhjjqwgv-image.image)

   4. 单击 **Save Changes**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/a057892ead0a402e8e2d17097e096d6b~tplv-10qhjjqwgv-image.image)

4. 配置 Slash Commands，允许用户使用 Slash 命令给 Bot 发送消息：

   1. 单击 **Slash Commands**，然后单击 **Create New Command**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/305892d909b940d7816a41417a263c3a~tplv-10qhjjqwgv-image.image)

   2. 完成配置，并单击 **Save**。

      Request URL 是从 Coze 的 Slack 发布配置中复制的 **Slash Request URL**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/8ce081d8cf6c4cdf86ee02ec1e807e6f~tplv-10qhjjqwgv-image.image)

5. 允许用户向你的 Bot 发送消息。

   1. 单击 **App Home**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/c184c3106cf04f429e35a5065a581d32~tplv-10qhjjqwgv-image.image)

   2. 在 **Show Tabs** 部分，选择 **Messages Tab** 下的 **Allow users to send Slash commands and messages from the messages tab** 复选框。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/be538ac578cf43328fb9ca137294ce77~tplv-10qhjjqwgv-image.image)

6. （可选）如果你想将这个机器人分发给其他 workspace 使用，需要完成以下操作：

   1. 单击 **Manage Distribution**，展开 **Remove Hard Coded Information** 配置面板**。**

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/ac07a2d2e031497095952b93b9c96105~tplv-10qhjjqwgv-image.image)

   2. 阅读信息后，勾选 **I’ve reviewed and removed any hard-coded information** 复选框。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/5ae76ef4af5e4b82805b0ef07d3b5dbb~tplv-10qhjjqwgv-image.image)

   3. 单击 **Activate Public Distribution**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/5d66586d136f4ca1bc38e81526e26f1c~tplv-10qhjjqwgv-image.image)

   4. 复制生成的 **Sharable URL**。

      ![图片](https://p16-arcosite-va.ibyteimg.com/tos-maliva-i-10qhjjqwgv-us/2eb26eab0b1f4540b46a05f757d317aa~tplv-10qhjjqwgv-image.image)

   5. 在生成的 Sharable URL 最后添加 *`&state={app_id}`* 。

      *`{app_id}`* 是 Slack 应用的 ID。

      `https://slack.com/oauth/v2/authorize?client_id=4878914704467.6568343811620&scope=app_mentions:read,channels:history,chat:write,commands,groups:history,im:history,mpim:history,users:read&user_scope=&`***`state={app_id}`***

### 步骤五：发布并测试 Bot

1. 返回 [Coze](https://www.coze.com/home)。
2. 进入待发布的 Bot，然后单击 **Publish**。
3. 输入 Change log，并找到 Slack 渠道，然后单击 **Publish**。
4. 单击 **Open in Slack** 跳转到 Bot 开始聊天。



现在你可以在slack上使用GPT啦！
