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
    <a href='https://rao.pics'>线上演示</a> ·
    <a href='https://github.com/meetqy/eagleuse/issues/61'>问题合集</a> 
</p>

# <img src='https://github.com/meetqy/eagleuse/raw/main/themes/default/public/static/favicon.ico?raw=true' height="24px" width="24px" /> EagleUse

把《素材管理类 APP》作为后台管理系统，快速构建 WEB 图片站、自建图床、私有图库。

![eagleuse](https://github.com/meetqy/eagleuse/blob/main/readme/preview.gif?raw=true)

## 👀 使用

```sh
git clone -b main https://github.com/meetqy/eagleuse.git
pnpm i
```

### 主题配置

把 `theme/default` .env.example 改为 .env，正确填写配置信息

```sh
# Eagle App library 地址
LIBRARY=/Users/qymeet/Pictures/test.library
# sqlite数据库文件地址
DATABASE_URL=file:/Users/qymeet/Pictures/test.library/eagleuse.db?connection_limit=1
# 是否开启nsfw
NSFW=false
# 服务器配置
PROTOCOL=http
HOSTNAME=localhost
PORT=3002
```

### 运行

```sh
# 初始化数据库
pnpm db:init
# 启动eagle生成sqlite、api服务等
pnpm start:server
# 启动 nextjs
pnpm dev
```

## 🎨 主题

**默认主题**

![](./readme/default-theme.jpg)

## 📏 支持 APP

- [Eagle App](https://eagle.cool/)

## 📄 开源协议

[MIT LICENSE](https://github.com/meetqy/eagleuse/blob/master/LICENSE) © [EAGLEUSE](https://github.com/eagleuse)
