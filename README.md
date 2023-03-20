![rao-pics](https://github.com/rao-pics/core/blob/develop/readme/preview.gif?raw=true)

<p align='center'>
    <a href="https://github.com/rao-pics/core/blob/master/LICENSE" target="_blank">
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
    <a href='https://github.com/rao-pics/core/issues/61'>问题合集</a> 
</p>

# <img src='https://raw.githubusercontent.com/rao-pics/rua/main/public/favicon.ico?raw=true' height="24px" width="24px" /> EagleUse

把《素材管理类 APP》作为后台管理系统，快速构建 WEB 图片站、自建图床、私有图库。

## ✈️ 快速开始

```
git clone -b example https://github.com/rao-pics/core.git example
pnpm i
```

`.env.example` 改为 `.env` 正确填写 `DATABASE_URL`

```sh
node index.mjs
```

## 👀 自定义安装

1. 安装依赖

```
pnpm i @raopics/use @raopics/prisma-client prisma @prisma/client
```

2. 在 `package.json` 中新增

```json
{
  "prisma": {
    "schema": "@raopics/prisma-client/prisma/schema.prisma"
  }
}
```

3. 在 `package.json scripts`中新增

```json
{
  "scripts": {
    "db:init": "prisma migrate dev --name init --skip-seed",
    "db:preview": "prisma studio",
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  }
}
```

- `db:init` 初始化 sqlite 数据库，**本地不存在**
- `db:preview` 预览数据库
- `db:push` 初始化数据库，**本地存在，并且最新 schema 和数据库的不一致，不会损坏数据库中的数据**
- `db:generate` 根据 schema 生成类型文件

4. 新增`.env`文件，填写 `DATABASE_URL`

```sh
LIBRARY=/Users/qymeet/Pictures/test.library

# prisma cli 命令时才需要，也可以使用系统同环境变量
# 参考：https://www.prisma.io/docs/guides/development-environment/environment-variables/managing-env-files-and-setting-variables
# 不建议修改此参数
DATABASE_URL=file:$LIBRARY/raopics.db?connection_limit=1
```

5. 新建 `index.mjs`

```js
import EagleUse from "@raopics/use";

EagleUse({
  // 开启API访问
  plugin_api: true,
  // 开启创建Sqlite时，自动NSFW检测图片并打标签
  plugin_nsfw: true,
  // 开启转换
  transform_eagle: true,
  // api访问端口号
  port: 3002,
});
```

6. 启动

```sh
# 初始化数据库
pnpm db:init

# 启动服务
node index.mjs
```

## 🎨 主题

[默认主题 Rua](https://github.com/rao-pics/rua)

| Light                                                             | Dark                                                              |
| ----------------------------------------------------------------- | ----------------------------------------------------------------- |
| ![](https://github.com/rao-pics/rua/raw/main/readme/preview1.jpg) | ![](https://github.com/rao-pics/rua/raw/main/readme/preview2.jpg) |

## 📏 支持 APP

- [Eagle App](https://eagle.cool/)

## 📄 开源协议

[MIT License](https://github.com/rao-pics/core/blob/master/LICENSE) © [EagleUse](https://github.com/eagleuse)
