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
    <a href="https://docs.rao.pics">在线文档</a> ·
    <a href='https://rao.pics'>线上演示</a> ·
    <a href='https://github.com/rao-pics/core/issues/61'>问题合集</a> 
</p>

# <img src='https://raw.githubusercontent.com/rao-pics/rua/main/public/favicon.ico?raw=true' height="24px" width="24px" /> Rao.Pics

基于 Eagle/Pixcall/Billfish 等素材管理工具，用于局域网内**展示**已有的图库。

> 当前项目还处于个人玩耍阶段，各个版本之间可能会有非常大的差异！！！📢📢📢

## ✈️ 超级简单

```
pnpm i @raopics/use
```

```js
// index.mjs

import EagleUse from "@raopics/use";

EagleUse({
  library: "xxx",
});
```

## Docker 部署

```
git clone https://github.com/rao-pics/core.git
```

修改 api volumes

```
  api:
    image: meetqy/raopics-api
    environment:
      LIBRARY: /library # volumes中的地址
      PORT: 9600
    volumes:
      # 本地挂载library地址
      - /Users/qymeet/Pictures/rao.library/images:/library/images:ro
      - /Users/qymeet/Pictures/rao.library/metadata.json:/library/metadata.json:ro
      - /Users/qymeet/Pictures/rao.library/tags.json:/library/tags.json:ro
      # 运行完成后在容器的 library/raopics.db 中会新增一个db文件。你可以将它导出到本地，
      # 放在 `/Users/qymeet/Pictures/rao.library/` 的目录中，然后取消注释。下次执行时就不会再从零开始索引数据。
      # - /Users/qymeet/Pictures/rao.library/raopics.db:/library/raopics.db
```

volumes 中的 **/Users/qymeet/MEGAsync/rao.library** 替换为你的 library

```
docker compose up -d
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
