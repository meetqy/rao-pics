中文简体 | [English](./README-EN.md)

<div align="center">
    <a href="https://rao.pics" target="_blank">
        <img width="196" src="./icons/logo.svg" alt="rao.pics logo"/>
    </a>
    <h1 align="center">Rao Pics</h1>
    <p align="center">帮助你远程访问 Eagle 的素材库</p>
    <p align="center">
        <a href="https://codecov.io/gh/meetqy/rao-pics" target="_blank"><img alt="codecov" src="https://codecov.io/gh/meetqy/rao-pics/graph/badge.svg?token=G9UG6SEOZK"/></a>
        <a href="https://github.com/rao-pics/core/blob/main/LICENSE" target="_blank"><img alt="License" src="https://img.shields.io/github/license/rao-pics/core"/></a>
        <a href="https://github.com/rao-pics/core/releases" target="_blank"><img alt="Release" src="https://img.shields.io/github/v/release/rao-pics/core"/></a>
        <a href="https://github.com/rao-pics/rao-pics/releases" target="_blank"><img alt="Release" src="https://img.shields.io/github/downloads/rao-pics/core/total"/></a>
        <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics?ref=badge_small" title="FOSSA Status"><img alt="FOSSA Status" src="https://app.fossa.com/api/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics.svg?type=small"/></a>
    </p>
</div>

<div align="center">
    <img width='49.5%' src="https://github.com/meetqy/rao-pics/assets/18411315/5c106f28-1122-4f81-a7be-3ac5d1f3d446" alt="rao.pics screenshot1"/>
    <img width='49.5%' src="https://github.com/meetqy/rao-pics/assets/18411315/13a82543-50b5-43b5-9d02-2dc50a03aaa3" alt="rao.pics screenshot2"/>
</div>

<div align="center">
    <img width='49.5%' src="https://github.com/meetqy/rao-pics/assets/18411315/de85b011-f8be-45fd-8841-e9cffcb5a7e5" alt="rao.pics screenshot3"/>
    <img width='49.5%' src="https://github.com/meetqy/rao-pics/assets/18411315/644f81bb-b444-42c3-ae53-e2a2399a1e03" alt="rao.pics screenshot4"/>
</div>

---

<p align="center">
    ✅ 立即下载: 
    <a href="https://github.com/meetqy/rao-pics/releases/latest">MAC M1</a>
    <span> </span>·🚶·<span> </span>
    <a href="https://github.com/meetqy/rao-pics/releases/latest">MAC INTER</a>
    <span> </span>·🚶·<span> </span>
    <a href="https://github.com/meetqy/rao-pics/releases/latest">WINDOWS</a>
</p>

> 如果在macOS上安装后无法打开，报错不受信任或者移到垃圾箱，执行下面命令后再启动即可：
>
> ```sh
> sudo xattr -d com.apple.quarantine /Applications/Rao\ Pics.app
> ```

---

## 默认主题 Gallery

目前已支持 WEB PWA 可直接将网页保存为 App

| <img alt="移动端 pwa 瀑布流演示" src="screenshot/mobile-1.png"/> 瀑布流 | <img alt="移动端 pwa 菜单展示" src="screenshot/mobile-2.png"/> 菜单 | <img alt="移动端 pwa 自适应展示" src="screenshot/mobile-3.png"/> 自适应 |
| :---------------------------------------------------------------------: | :-----------------------------------------------------------------: | :---------------------------------------------------------------------: |

PC

| <img alt="PC 端 菜单展示 light 模式" src="screenshot/pc-1.png"/>   | <img src="screenshot/pc-2.png" alt="PC 端 瀑布流演示 dark 模式" /> |
| ------------------------------------------------------------------ | ------------------------------------------------------------------ |
| <img alt="PC 端 自适应展示 light 模式" src="screenshot/pc-3.png"/> | <img alt="PC 端 菜单展示 dark 模式" src="screenshot/pc-4.png"/>    |

## 特点

- 🎨 30 多种配色随意切换，还可以自定义主题，总有一款适合你
- 🔌 增量更新和实时同步，速度很快，无需等待
- 🔐 不会修改你的任何文件，通过读取生成索引，即使误操作，也不会对元数据造成任何伤害
- 🔸 很简单，你只需要点点点，就可以在其他设备上查看素材
- 📱 同时支持手机、平板、PC
- 📌 默认主题支持 PWA，你可以保存为应用，无需每次打开浏览器
- 🎊 无需依赖管理软件，也能访问素材，甚至可以部署在 Windows/MacOS 服务器上

## 贡献

我们欢迎任何有兴趣帮助改进 RaoPics 的人士贡献。如果你想贡献，有几种方式可以参与：

- Bug 修复： 如果发现 bug，请创建一个带有清晰描述问题及解决方法的拉取请求。快速入口 => [🐞 提交 Bug](https://github.com/meetqy/rao-pics/issues/new?assignees=&labels=Bug&projects=&template=bug_report.yml&title=bug%3A+)

- 改进： 有改进 RaoPics 的想法吗？请先创建一个问题来讨论为什么需要这个改进。快速入口 => [🛠 提需求](https://github.com/meetqy/rao-pics/issues/new?assignees=&labels=%E2%9C%A8+enhancement&projects=&template=feature_request.yml&title=feat%3A+)

## 构建

这些命令仅供维护人员使用。

### 环境信息

- nodejs >= `v18.17.1`
- pnpm >= `8.7.6`

### 拉取代码

```
git clone https://github.com/meetqy/rao-pics.git
```

### 安装依赖

使用 pnpm 安装 依赖

```
pnpm i
```

### 运行

`pnpm dev` 会同时运行三个项目分别为：`packages/db`、`themes/gallery`、`apps/electron`

```
pnpm dev
```

## 赞助

- 本项目已加入 [Eagle 联盟营销计划](https://eagle.cool/affiliate)，如果你正好想要购买 [Eagle App - 图片收集及管理必备工具](https://eagle.sjv.io/rao)，可以点击 [购买](https://eagle.sjv.io/rao) 支持作者 😘😘😘
- 如果你喜欢 Rao.Pics，可以在 Github Star，更欢迎 [推荐](https://twitter.com/intent/tweet?text=View%20Images%20on%20Any%20device.https://github.com/rao-pics/core) 给你志同道合的朋友使用
- 可以关注我的 [Twitter](https://twitter.com/meetqy) 获取到最新的消息，或添加微信 `-meetqy-` 拉你入群 **（记得备注以下 GITHUB 哟）**

---

<a href="https://eagle.sjv.io/rao">
    <img src="./screenshot/eagle.svg" width="96" alt="eagle app" />
</a>

## 许可证

RAO-PICS 是一个免费的开源项目，使用 [AGPL-3.0](./LICENSE) 协议。如果您要在与 GNU GPL 许可证 v3 兼容的许可证下创建开源应用程序，则可以根据 GPLv3 的条款使用该项目。

### 附加协议（商业许可证）

如果您将该项目用于任何商业行为，请联系我购买商业许可证，以确保您的源代码属于您自己。联系方式：meetqy@icloud.com

## 感谢

<img src="https://repobeats.axiom.co/api/embed/e9735009c7d58372e055f2875a36283f25a60540.svg" width="100%"  alt="repobeats"/>

---

| <a href="https://www.jetbrains.com/zh-cn/community/opensource/#support"><img width="100" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" /></a> | <a href="https://developer.mend.io/github/meetqy/rao-pics"><img src="https://developer.mend.io/assets/mend-logo.svg" width="100"/></a> | <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics/refs/branch/main/3bad02d7e6c4f87c4170d847e106573e12f811dd/preview"><img src="https://avatars.githubusercontent.com/u/9543448" width="100"/></a> | <a href="https://app.codecov.io/gh/meetqy/rao-pics"><img width="100" src="https://files.readme.io/5affb88-codecov.svg"/></a> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
