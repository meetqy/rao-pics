![](https://github.com/meetqy/eagleuse/blob/dev/readme/preview.webp?raw=true)

<p align='center'>
    <a href="https://github.com/meetqy/eagleuse/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/meetqy/eagleuse"/>
    </a>
    <a href="https://www.typescriptlang.org" target="_black">
        <img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="language">
    </a>
    <a href="https://github.com/prettier/prettier" target="_black"> 
        <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg"/> 
    </a>
</p>

<p align='center'>
    <a href='https://rao.pics'>稳定版</a> ·
    <a href="https://dev.rao.pics">开发版</a> · 
    <a href='https://github.com/meetqy/eagleuse/issues/61'>问题合集</a> 
</p>

# <img src='https://github.com/meetqy/eagleuse/raw/dev/public/static/favicon.ico?raw=true' height="24px" width="24px" /> EagleUse

使用《Eagle App》作为后台管理系统，快速构建 WEB 图片站、自建图床、私有图库。

![eagleuse](https://github.com/meetqy/eagleuse/blob/dev/readme/preview.gif?raw=true)

## 🎁 特色功能

### NSFW 图片检测，并自动标签

- 不会修改 eagle app 原始数据
- sqlite 标签群组中会新增 `NSFW`，颜色为`red`
- 子标签 5 个：`Neutral`、`Drawing`、`Hentai`、`Porn`、`Sexy`
- 新增添加的图片会自动执行 NSFW 检测
- 图片过多断点继续检测

> 功能实现参考：[infinitered/nsfwjs](https://github.com/infinitered/nsfwjs)

![nsfw-preview](https://github.com/meetqy/eagleuse/blob/dev/readme/nsfw-preview.webp?raw=true)

# 👀 介绍

### 定位

通过监听`eagle app library`构建图片站，同时只会具备 `展示/搜索` 2 个功能。

![](https://github.com/meetqy/eagleuse/blob/dev/readme/flow.webp?raw=true)

### 本地安装

```sh
git clone -b main https://github.com/meetqy/eagleuse.git
pnpm install
```

把 .env.example 改为 .env，正确填写配置信息

```sh
# 初始化 数据库
pnpm run db:init # 不存在eagleuse.db
# 启动项目
pnpm run dev
```

### 配置说明

[.env.example](https://github.com/meetqy/eagleuse/blob/main/.env.example)

### Package Script 说明

| 名称         | 说明                                       |
| ------------ | ------------------------------------------ |
| `db:preview` | 数据库可视化预览                           |
| `db:init`    | 初始化 prisma 数据库                       |
| `setup`      | 开启对 eagle app 监听，生成对应的 sqlite。 |

# 📄 开源协议

[MIT LICENSE](https://github.com/meetqy/eagleuse/blob/master/LICENSE) © [EAGLEUSE](https://github.com/eagleuse)
