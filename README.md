# EagleUse

把 eagle 变成我的图片（后台）管理系统。

> 如果你也有这样的想法：eagle 修改/管理图片 => 网站上能实时查看。那这个项目非常合适，欢迎体验！

## 介绍

该项目还处于开发中，如果你想抢先体验一下，可以先试试:

- [eagle-web](https://github.com/meetqy/eagle-web) - eagle 图片管理工具的 web 版本
- [eagle-api](https://github.com/meetqy/eagle-api) - 让你的 eagle 拥有查询 api 能力,基于 json-server

在线体验: https://play.rao.pics

> 本项目会集成他们的优点，并且把 UI、API 查询、监听等功能集成到一起，选择更加合适的技术栈。

## 特点

- 数据可视化
- 文件改变，实时更新数据
- 完善的查询类 api

## 截图

**数据展示**
![](./readme/1.jpg)

## 安装

```sh
git clone https://github.com/meetqy/eagleuse
pnpm install
```

把 .env.example 改为 .env，正确填写配置信息

```sh
# 初始化 数据库
yarn db:init

# 监听 library，同步到数据库
yarn db:watch

# 打开网页版数据库
yarn db:preview
```
