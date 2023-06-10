# Rao Pics

[中文](./README.md) | English

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/meetqy/5c4881f21bab2cf4f09a8658354fb997/raw/1e45502a948e69132afe85a923f4f54fdc77fbee/rao-pics_core__coverage.json)
[![License](https://img.shields.io/github/license/rao-pics/core)](https://github.com/rao-pics/core/blob/turbo-electron-prisma/LICENSE)
[![release](https://img.shields.io/github/v/release/rao-pics/core)](https://github.com/rao-pics/core/releases)
![download](https://img.shields.io/github/downloads/rao-pics/core/total)

Any device can access local footage/media via a web page.

## Demo

[![Rao Pics - 任何设备可通过网页访问本地素材/媒体。](https://res.cloudinary.com/marcomontalbano/image/upload/v1686385245/video_to_markdown/images/youtube--12u12tR03p8-c05b58ac6eb4c4700831b2b3070cd403.jpg)](https://youtu.be/12u12tR03p8 "Rao Pics - 任何设备可通过网页访问本地素材/媒体。")

## Supported

App

<p><img width="64" src="https://i.imgur.com/jxirugb.jpg"/></p>

File type

```ts
const VIDEO_EXT = ["mp4", "avi", "mov", "wmv", "flv", "webm", "mkv"] as const;
const IMG_EXT = ["jpg", "png", "jpeg", "gif", "webp"] as const;
```

## Todo to-do list

Development progress and version planning can be viewed [ Rao Pics Todo ](https://github.com/orgs/rao-pics/projects/1).

[![Imgur](https://i.imgur.com/52ujyXZ.png)](https://github.com/orgs/rao-pics/projects/1)

## Cache & & Log

db.sqlite

```sh
mac ~/Library/Caches/Rao\ Pics
```

\*.log

```sh
mac ~/Library/Logs/Rao\ Pics
```

## Other versions

** Electron App ** Is the major maintenance release. Whether it is Docker deployment or Node source code operation, it requires certain technical capabilities, and the use cost is too high. ** So if you want to make an application, you just need to click and click, and that's it. **

NodeJs code running, Docker deployment, can go to [main 分支](https://github.com/rao-pics/core/tree/main).

## Thanks

Translation use [GT4T](https://gt4t.net/)

UI

- [HeroIcons](https://heroicons.com/) — Icon
- [DaysiUI](https://daisyui.com/)-Subject related

Special thanks to `electron-trpc-prisma` and `create-t3-turbo`, let the project have a very Nice development experience, En ~! Let me feel happy to write code. The project is also based on their transformation.

- [electron-trpc-prisma](https://github.com/NickyMeuleman/electron-trpc-prisma)
- [create-t3-turbo](https://github.com/t3-oss/create-t3-turbo)

Special thanks for [Eagle App](https://eagle.cool/) giving me a 70% discount coupon when I submitted DEMO. Without this positive feedback, the project may be aborted!

Thanks to my friends ** RESPECT ** who gave me encouragement, feedback and suggestions along the way.
