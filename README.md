# Rao Pics

![Build](https://github.com/rao-pics/core/actions/workflows/coverage.js.yml/badge.svg)
![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/meetqy/5c4881f21bab2cf4f09a8658354fb997/raw/1e45502a948e69132afe85a923f4f54fdc77fbee/rao-pics_core__coverage.json)
[![License](https://img.shields.io/github/license/rao-pics/core)](https://github.com/rao-pics/core/blob/turbo-electron-prisma/LICENSE)
[![release](https://img.shields.io/github/v/release/rao-pics/core?label=Release)](https://github.com/rao-pics/core/releases)

任何设备通过网页访问本地素材。

## Demo 演示

[![](https://res.cloudinary.com/marcomontalbano/image/upload/v1685437732/video_to_markdown/images/youtube--q8daCjxVjjc-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/q8daCjxVjjc)

## 其他版本

**Electron App** 是主要维护的版本。无论是 Docker 部署、Node 源码运行，都需要一定的技术能力，使用成本过高，**所以想做一个应用程序，只需要点点点，就完事了。**

NodeJs 代码运行，Docker 部署，可以转到 [main 分支](https://github.com/rao-pics/core/tree/main)。

## Todo 待办事项

开发进度、版本规划可以查看 [Rao Pics Todo](https://github.com/orgs/rao-pics/projects/1)。

[![Imgur](https://i.imgur.com/52ujyXZ.png)](https://github.com/orgs/rao-pics/projects/1)

## Cache/Log 路径

db.sqlite

```sh
mac ~/Library/Caches/Rao\ Pics
```

\*.log

```sh
mac ~/Library/Logs/Rao\ Pics
```

## 技术 & 页面资源

UI

- [HeroIcons](https://heroicons.com/) - Icon
- [DaysiUI](https://daisyui.com/) - 主题相关

❤️ 特别感谢`electron-trpc-prisma`和`create-t3-turbo`，让项目有了非常 Nice 的开发体验，恩~！让我心情愉悦的写代码。该项目也是基于他们改造出来的。

- [electron-trpc-prisma](https://github.com/NickyMeuleman/electron-trpc-prisma)
- [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)
