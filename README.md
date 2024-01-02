中文简体 | [English](./README-EN.md)

<div align="center">
    <a href="https://rao.pics" target="_blank">
        <img width="196" src="./icons/logo.svg" alt="rao.pics logo"/>
    </a>
    <h1 align="center">
        <span style="color:#ef4444">R</span>
        <span style="color:#f97316">a</span>
        <span style="color:#eab308">o</span>.
        <span style="color:#22c55e">P</span>
        <span style="color:#06b6d4">i</span>
        <span style="color:#3b82f6">c</span>
        <span style="color:#8b5cf6">s</span>
    </h1>
    <p align="center">帮助你远程访问 Eagle App 的素材库</p>
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

| <img alt="移动端 pwa 瀑布流演示" src="https://i.imgur.com/vzHAKA6.png"/> 瀑布流 | <img alt="移动端 pwa 菜单展示" src="https://i.imgur.com/WrX7Rnn.png"/> 菜单 | <img alt="移动端 pwa 自适应展示" src="https://i.imgur.com/VOOOvR7.png"/> 自适应 |
| :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |

PC

| <img alt="PC 端 菜单展示 light 模式" src="https://i.imgur.com/CMB0JRg.png"/>   | <img src="https://i.imgur.com/aVACzP3.png" alt="PC 端 瀑布流演示 dark 模式" /> |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| <img alt="PC 端 自适应展示 light 模式" src="https://i.imgur.com/jkTaBlI.png"/> | <img alt="PC 端 菜单展示 dark 模式" src="https://i.imgur.com/GnfKRM5.png"/>    |

## 特色亮点

- 🎨 30+ 种精心挑选的配色方案供您随心切换，还可自定义主题，让您个性定制
- 🔌 增量更新与实时同步，速度飞快，无需漫长等待
- 🔐 严防误操作，无需担心文件修改，通过读取生成索引，确保元数据安全无损
- 🔸 简单易用，使用简单几步即可在任何设备上高效查看素材
- 📱 完美支持手机、平板和 PC，随时随地畅享
- 📌 默认主题支持 PWA，一键保存为应用，无需每次打开浏览器都重新输入地址
- 🎊 无需任何额外管理软件，轻松访问素材，可轻松部署于 Windows/MacOS 服务器上

## 自定义域名

以 `Nginx` 作为示例，假设需要自定义的域名为：`desktop.rao.pics`

1. 在 App/设置 中，填写 `https://desktop.rao.pics`。
2. Nginx 中配置

```nginx
server {
  listen 80;
  server_name desktop.rao.pics;

  location / {
    proxy_pass http://localhost:61121; # App/设置 中的网页端口
    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-Ip $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }

  location /trpc {
    proxy_pass http://localhost:61122; # App/设置 中的服务端口
    proxy_set_header Host $proxy_host;
    proxy_set_header X-Real-Ip $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## 参与贡献

[贡献指南](./CONTRIBUTING.md)

## 支持作者

- 本项目已加入 [Eagle 联盟营销计划](https://eagle.cool/affiliate)，如果你正好想要购买 [Eagle App - 图片收集及管理必备工具](https://eagle.sjv.io/rao)，可以点击 [购买](https://eagle.sjv.io/rao) 支持作者 😘😘😘
- 如果你喜欢 Rao.Pics，可以在 Github Star，更欢迎 [推荐](https://twitter.com/intent/tweet?text=View%20Images%20on%20Any%20device.https://github.com/rao-pics/core) 给你志同道合的朋友使用
- 可以关注我的 [Twitter](https://twitter.com/meetqy) 获取到最新的消息，或添加微信 `-meetqy-` 拉你入群 **（记得备注以下 GITHUB 哟）**

---

<a href="https://eagle.sjv.io/rao">
    <img src="https://i.imgur.com/MxlzTIt.png" width="96" alt="eagle app" />
</a>

## 许可证

Rao.Pics 是一个免费的开源项目，采用 AGPL-3.0 许可证。如果您计划以与 GNU GPL v3 兼容的许可证创建开源应用程序，则可以根据 GPLv3 许可证的条款使用该项目。

### 附加协议（商业许可证）

如果您计划将该项目用于商业用途，请联系我购买商业许可证，确保您对源代码的所有权。联系方式：meetqy@icloud.com

## 感谢

<img src="https://repobeats.axiom.co/api/embed/e9735009c7d58372e055f2875a36283f25a60540.svg" width="100%"  alt="repobeats"/>

---

| <a href="https://www.jetbrains.com/zh-cn/community/opensource/#support"><img width="100" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" /></a> | <a href="https://developer.mend.io/github/meetqy/rao-pics"><img src="https://developer.mend.io/assets/mend-logo.svg" width="100"/></a> | <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics/refs/branch/main/3bad02d7e6c4f87c4170d847e106573e12f811dd/preview"><img src="https://avatars.githubusercontent.com/u/9543448" width="100"/></a> | <a href="https://app.codecov.io/gh/meetqy/rao-pics"><img width="100" src="https://files.readme.io/5affb88-codecov.svg"/></a> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
