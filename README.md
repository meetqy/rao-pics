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
    <a href="https://github.com/meetqy/eagleuse/blob/dev/api/image.md">查询API</a> ·
    <a href='https://github.com/meetqy/eagleuse/issues/61'>问题合集</a> 
</p>

# <img src='./public/static/favicon.ico' height="24px" width="24px" /> EagleUse

使用《Eagle App》作为后台管理系统，快速构建 WEB 图片站、自建图床。

![eagleuse](https://github.com/meetqy/eagleuse/blob/dev/readme/preview.gif?raw=true)

# 👀 介绍

### 定位

通过监听`eagle app library`构建图片站，同时只会具备 `展示/搜索` 2 个功能。

![](https://github.com/meetqy/eagleuse/blob/dev/readme/flow.webp?raw=true)

### 本地安装

```sh
git clone https://github.com/meetqy/eagleuse.git
pnpm install
```

把 .env.example 改为 .env，正确填写配置信息

```sh
# 初始化 数据库
pnpm run db:init

# 启动项目
pnpm run dev
```

### Package Script 说明

| 名称             | 说明                             |
| ---------------- | -------------------------------- |
| `db:preview`     | 数据库可视化预览                 |
| `db:init`        | 初始化 prisma 数据库             |
| `db:watch`       | 监听 `eagle library` 更新 sqlite |
| `db:generate`    | `schema.prisma` 改变需要执行     |
| `create:symlink` | 创建软链接                       |

# 🔦 其他

下面两个项目是该项目的起点，提供了很好的思路，有着特殊的意义，尽管用起来很麻烦！！！

- json-server 实现 eagle 查询 api 👉🏻 [eagle-api](https://github.com/meetqy/eagle-api)
- eagle-web 版本 👉🏻 [eagle-web](https://github.com/meetqy/eagle-web)

> 想要完整跑起来，你需要同时启动两个项目。

# 📄 开源协议

[MIT license](https://github.com/meetqy/eagleuse/blob/master/LICENSE) © [EagleUse](https://github.com/eagleuse)
