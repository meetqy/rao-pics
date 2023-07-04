![Rao Pics - 任何设备可通过网页访问素材。](https://rao.ujump.cn/readme/page1.png?imageMogr2/format/webp/interlace/1/thumbnail/1024x)

# Rao Pics

中文 | [English](./README.en.md)

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/meetqy/5c4881f21bab2cf4f09a8658354fb997/raw/rao-pics_core__coverage.json)
[![License](https://img.shields.io/github/license/rao-pics/core)](https://github.com/rao-pics/core/blob/turbo-electron-prisma/LICENSE)
[![release](https://img.shields.io/github/v/release/rao-pics/core)](https://github.com/rao-pics/core/releases)
![download](https://img.shields.io/github/downloads/rao-pics/core/total)

任何设备可通过局域网访问素材/媒体/音乐。

![Rao Pics - 任何设备可通过本地网络访问素材。desktop/ipad/phone](https://rao.ujump.cn/readme/device/any-device.png?imageMogr2/format/webp/interlace/1/thumbnail/1024x)

## 已支持

App

<p><a href="https://eagle.sjv.io/rao" target="_blank"><img width="64" src="https://i.imgur.com/jxirugb.jpg"/></a></p>

文件类型

```ts
const VIDEO_EXT = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"] as const;
const IMG_EXT = ["jpg", "png", "jpeg", "gif", "webp"] as const;
```

## 🌀 Todo 待办清单

<details>
<summary>➕显示 / ➖隐藏</summary>
<br/>

开发进度、版本规划可以查看 [Todo](https://github.com/orgs/rao-pics/projects/1)

[![Imgur](https://i.imgur.com/52ujyXZ.png)](https://github.com/orgs/rao-pics/projects/1)

</details>

## 🌀 缓存 / 日志

<details>
<summary>➕显示 / ➖隐藏</summary>
<br/>

db.sqlite

```sh
mac ~/Library/Caches/Rao\ Pics
win '~\AppData\Local\Rao Pics'
```

main.log

```sh
mac ~/Library/Logs/Rao\ Pics
win '~\AppData\Roaming\Rao Pics\logs'
```

</details>

## 🌀 其他版本

<details>
<summary>➕显示 / ➖隐藏</summary>
<br/>

**Electron App** 是主要维护的版本。无论是 Docker 部署、Node 源码运行，都需要一定的技术能力，使用成本过高，**所以想做一个应用程序，只需要点点点，就完事了。**

NodeJs 代码运行，Docker 部署，可以转到 [main 分支](https://github.com/rao-pics/docker)。

</details>

## 感谢

UI

- [HeroIcons](https://heroicons.com/) - Icon
- [DaysiUI](https://daisyui.com/) - 主题相关

特别感谢`electron-trpc-prisma`和`create-t3-turbo`，让项目有了非常 Nice 的开发体验，恩~！让我心情愉悦的写代码。该项目也是基于他们改造出来的。

- [electron-trpc-prisma](https://github.com/NickyMeuleman/electron-trpc-prisma)
- [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)

特别感谢 [Eagle App](https://eagle.sjv.io/rao)，在我投稿 DEMO 的时候，给我的肯定，一个 3 折券。没有这个正向反馈，可能项目就夭折了！

感谢一路上给我鼓励、反馈、提出建议的朋友 **RESPECT** 🎉🎉🎉

## 芜湖 ~

本项目已加入 [Eagle 联盟营销计划](https://eagle.cool/affiliate) - 如果你正好想要购买 [Eagle App - 图片收集及管理必备工具](https://eagle.sjv.io/rao)，可以点击 [购买](https://eagle.sjv.io/rao)，支持作者哦 😘😘😘

---

<div align="center">
  
༼ つ ◕_◕ ༽つ  Please share  
  
[![][tweet]][tweet-url]

</div>

[tweet]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithu
[tweet-url]: https://twitter.com/intent/tweet?text=任何设备可通过局域网访问媒体https://github.com/rao-pics/core
