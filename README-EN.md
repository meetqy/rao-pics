[中文简体](./README.md) | English

<div align="center">
    <a href="https://rao.pics" target="_blank">
        <img width="196" src="./icons/logo.svg" alt="rao.pics logo"/>
    </a>
    <h1 align="center">Rao.Pics</h1>
    <p align="center">Helps you remotely access Eagle's material library</p>
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
    ✅ Download now: 
    <a href="https://github.com/meetqy/rao-pics/releases/latest">MAC M1</a>
    <span> </span>·🚶·<span> </span>
    <a href="https://github.com/meetqy/rao-pics/releases/latest">MAC INTER</a>
    <span> </span>·🚶·<span> </span>
    <a href="https://github.com/meetqy/rao-pics/releases/latest">WINDOWS</a>
</p>

> If you are unable to open it after installing on macOS, getting an error of untrusted or moved to the trash, execute the following command and then start it again:
>
> ```sh
> sudo xattr -d com.apple.quarantine /Applications/Rao\ Pics.app
> ```

---

## Default Theme Gallery

Currently supports WEB PWA, which allows you to save the webpage as an app.

| <img alt="Mobile PWA waterfall demo" src="https://i.imgur.com/vzHAKA6.png"/> Waterfall | <img alt="Mobile PWA menu display" src="https://i.imgur.com/WrX7Rnn.png"/> Menu | <img alt="Mobile PWA adaptive display" src="https://i.imgur.com/VOOOvR7.png"/> Adaptive |
| :------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------: |

PC

| <img alt="PC menu display light mode" src="https://i.imgur.com/CMB0JRg.png"/>     | <img src="https://i.imgur.com/aVACzP3.png" alt="PC waterfall demo dark mode" /> |
| --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| <img alt="PC adaptive display light mode" src="https://i.imgur.com/jkTaBlI.png"/> | <img alt="PC menu display dark mode" src="https://i.imgur.com/GnfKRM5.png"/>    |

## Features

- 🎨 Over 30 color schemes to choose from, you can also customize your own theme, there is always one that suits you
- 🔌 Incremental updates and real-time synchronization, fast and no waiting required
- 🔐 Does not modify any of your files, generates indexes by reading, even if there is a mistake, it will not cause any harm to the metadata
- 🔸 Very simple, you just need to click, and you can view the materials on other devices
- 📱 Supports mobile phones, tablets, and PCs at the same time
- 📌 The default theme supports PWA, you can save it as an app without opening the browser every time
- 🎊 Can access materials without relying on management software, and can even be deployed on Windows/MacOS servers

## Custom Domain

Using `Nginx` as an example, let's say you want to customize the domain to `desktop.rao.pics`.

1. In the App/Settings, enter `https://desktop.rao.pics`.
2. Configure Nginx as follows:

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

## Contribute

[贡献指南](./CONTRIBUTING.md)

## Support the Author

- This project has joined the [Eagle Affiliate Program](https://eagle.cool/affiliate). If you happen to want to purchase [Eagle App - Essential Tool for Image Collection and Management](https://eagle.sjv.io/rao), you can click [here](https://eagle.sjv.io/rao) to support the author 😘😘😘
- If you like Rao.Pics, you can star it on GitHub and even [share](https://twitter.com/intent/tweet?text=View%20Images%20on%20Any%20device.https://github.com/rao-pics/core) it with like-minded friends
- You can follow me on [Twitter](https://twitter.com/meetqy) to get the latest updates or add me on WeChat `-meetqy-` to join the group **(Remember to mention GITHUB in the note)**

---

<a href="https://eagle.sjv.io/rao">
    <img src="https://i.imgur.com/MxlzTIt.png" width="96" alt="eagle app" />
</a>

## License

Rao.Pics is a free and open-source project licensed under the [AGPL-3.0](./LICENSE) license. If you want to create open-source applications under a license compatible with the GNU GPL v3, you can use this project under the terms of GPLv3.

### Additional License (Commercial License)

If you use this project for any commercial purposes, please contact me to purchase a commercial license to ensure that your source code belongs to you. Contact: meetqy@icloud.com

## Acknowledgements

<img src="https://repobeats.axiom.co/api/embed/e9735009c7d58372e055f2875a36283f25a60540.svg" width="100%"  alt="repobeats"/>

---

| <a href="https://www.jetbrains.com/zh-cn/community/opensource/#support"><img width="100" src="https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png" /></a> | <a href="https://developer.mend.io/github/meetqy/rao-pics"><img src="https://developer.mend.io/assets/mend-logo.svg" width="100"/></a> | <a href="https://app.fossa.com/projects/git%2Bgithub.com%2Fmeetqy%2Frao-pics/refs/branch/main/3bad02d7e6c4f87c4170d847e106573e12f811dd/preview"><img src="https://avatars.githubusercontent.com/u/9543448" width="100"/></a> | <a href="https://app.codecov.io/gh/meetqy/rao-pics"><img width="100" src="https://files.readme.io/5affb88-codecov.svg"/></a> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------: |
