![](./readme/preview.webp)

<p align='center'>
    <a href="https://github.com/meetqy/eagleuse/blob/master/LICENSE" target="_blank">
        <img src="https://img.shields.io/github/license/meetqy/eagleuse"/>
    </a>
    <a href="https://www.typescriptlang.org" target="_black">
        <img src="https://img.shields.io/badge/language-TypeScript-blue.svg" alt="language">
    </a>
</p>

<p align='center'>
    <a href='https://rao.pics'>Online</a>
</p>

# <img src='./static/favicon.ico' height="24px" width="24px" /> EagleUse

把 eagle 变成我的图片（后台）管理系统。

> 如果你也有这样的想法：eagle 修改/管理图片 => 网站上能实时查看。那这个项目非常合适，欢迎体验！

# 👀 介绍

### 定位

eagle 管理图片，本项目通过监听`eagle library`生成网站，同时只会具备 `展示/搜索` 2 个功能。

![](./readme/flow.webp)

### 本地安装

```sh
git clone https://github.com/meetqy/eagleuse/tree/main
pnpm install
```

把 .env.example 改为 .env，正确填写配置信息

```sh
# 初始化 数据库
pnpm run db:init

# 创建静态资源软连接
pnpm run create:symlink

# 启动项目
pnpm run dev
```

### Package Script 说明

| 名称             | 说明                                                     |
| ---------------- | -------------------------------------------------------- |
| `db:preview`     | 数据库可视化预览                                         |
| `db:init`        | 初始化 prisma 数据库                                     |
| `db:watch`       | 监听 eagle 变换，自动关联 sqlite，更新数据               |
| `db:generate`    | eagleuse.db 发生改变，可执行，会更新 prisma type         |
| `create:symlink` | 为 `eagle library images 文件夹` 创建软连接 到 public 中 |

### 部署到服务器

- 将`eagle library`上传到服务器
- 在服务器上拉取本项目
- 执行 `pnpm run db:init`
- (可选) `eagle library`中未包含 sqlite db 文件，需要执行 `pnpm run db:watch`生成 db 文件。
- `pnpm run build`
- `pnpm run start`

# 📷 截图

|                      Left                       |                                 Right                                  |
| :---------------------------------------------: | :--------------------------------------------------------------------: |
|     ![](./readme/1.webp?raw=true)<br/>首页      |           ![](./readme/2.webp?raw=true)<br/>可视化数据&结构            |
|   ![](./readme/4.webp?raw=true) <br/>标签管理   | ![](./readme/3.webp?raw=true)<br/>只有一个 DB 文件，方便数据管理及迁移 |
| ![](./readme/6.webp?raw=true) <br/>选中父文件夹 |       ![](./readme/5.webp?raw=true)<br/>文件夹展开,选中子文件夹        |

# 📚 功能列表

### 基础功能

- 监听 library 生成对应的 sqlite 数据
- sqlite 数据文件可视化展示
- 基于 prisma，更加简单的使用
- library 静态资源托管
- 启动项目，随时更新 db 数据

### 页面

- 左侧菜单
- 等高展示图片
- 标签展示并显示图片数量
- 图片基础信息
- 查看原图
- 标签按颜色分类
- 文件夹展示

### 搜索

- 按标签搜索
- 按尺寸搜索
- 排序方式

# 🔦 其他

下面两个项目是该项目的起点，提供了很好的思路，有着特殊的意义，尽管用起来很麻烦！！！

- json-server 实现 eagle 查询 api 👉🏻 [eagle-api](https://github.com/meetqy/eagle-api)
- eagle-web 版本 👉🏻 [eagle-web](https://github.com/meetqy/eagle-web)

> 想要完整跑起来，你需要同时启动两个项目。

# 📄 开源协议

[MIT license](https://github.com/meetqy/eagleuse/blob/master/LICENSE) © [EagleUse](https://github.com/eagleuse)
