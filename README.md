# Rao Pics - 在任何设备上访问你的素材

中文 | [English](./README.en.md)

![Coverage Badge](https://img.shields.io/endpoint?url=https://gist.githubusercontent.com/meetqy/5c4881f21bab2cf4f09a8658354fb997/raw/rao-pics_core__coverage.json)
[![License](https://img.shields.io/github/license/rao-pics/core)](https://github.com/rao-pics/core/blob/turbo-electron-prisma/LICENSE)
[![Release](https://img.shields.io/github/v/release/rao-pics/core)](https://github.com/rao-pics/core/releases)
[![Download](https://img.shields.io/github/downloads/rao-pics/core/total)](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)
[![Twitter URL](https://img.shields.io/twitter/url?url=https%3A%2F%2Fgithub.com%2Frao-pics%2Frao-pics)](https://twitter.com/intent/tweet?text=Visit%20Material%20on%20Any%20device.https://github.com/rao-pics/core)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics?ref=badge_shield)

基于 Eagle/Billfish/Pixcall 等素材管理工具，让你的素材可以在任何设备上访问。

> 它们负责管理素材，而我负责“传播”。😄

https://github.com/rao-pics/rao-pics/assets/18411315/e534b1a1-709b-4af7-9c40-f256d6ca3ceb

## 已支持

**App**

<p><a href="https://eagle.sjv.io/rao" target="_blank"><img width="64" src="https://i.imgur.com/jxirugb.jpg"/></a></p>

**媒体**

![supported MP4 AVI MOV WMV FLV WEBM MKV](https://img.shields.io/badge/VIDEO-MP4%20%7C%20AVI%20%7C%20MOV%20%7C%20WMV%20%7C%20FLV%20%7C%20WEBM%20%7C%20MKV-brightgreen.svg)

![supported JPG PNG JPEG GIF WEBP](https://img.shields.io/badge/IMAGE-JPG%20%7C%20PNG%20%7C%20JPEG%20%7C%20GIF%20%7C%20WEBP-brightgreen.svg)

## 下载对应版本

| 平台                  | 对应版本                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------- |
| Mac M1                | [Rao.Pics-${version}-arm64.dmg](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)                      |
| Mac Intel             | [Rao.Pics-${version}.dmg](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)                            |
| Windows               | [Rao.Pics.Setup.${version}.exe](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)                      |
| Ubuntu 18/19/20/21    | [Rao.Pics-${version}-linux-amd64-openssl-1.1.x.deb ](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16) |
| Debian 9/10/11        | [Rao.Pics-${version}-linux-amd64-openssl-1.1.x.deb ](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16) |
| Linux Mint 19/20      | [Rao.Pics-${version}-linux-amd64-openssl-1.1.x.deb ](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16) |
| Arch Linux 2019.09.01 | [Rao.Pics-${version}-linux-amd64-openssl-1.1.x.deb ](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16) |
| Ubuntu 22/23          | [Rao.Pics-${version}-linux-amd64-openssl-3.0.x.deb](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)  |
| Debian 12             | [Rao.Pics-${version}-linux-amd64-openssl-3.0.x.deb](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)  |
| Linux Mint 21         | [Rao.Pics-${version}-linux-amd64-openssl-3.0.x.deb](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)  |
| Arch Linux 2023.04.23 | [Rao.Pics-${version}-linux-amd64-openssl-3.0.x.deb](https://github.com/meetqy/rao-pics/releases/tag/v0.7.16)  |

> 参考 https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference#binarytargets-options

## Mac "文件已损坏"

打开终端执行以下命令

```sh
sudo xattr -r -d com.apple.quarantine  /Applications/Rao\ Pics.app
```

## 🌀 Todo 待办清单

https://github.com/users/meetqy/projects/7/views/1

## 🌀 本地数据

db.sqlite

```sh
mac '~/Library/Caches/Rao\ Pics'
win '~\AppData\Local\Rao Pics'
```

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
