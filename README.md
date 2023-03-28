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

将《素材管理 App》升级为后台管理系统，实现局域网内即时预览、共享。

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

```ts
interface Options {
  // library 地址
  library: string;
  // 开启转换 eagle,默认 true
  transform_eagle?: boolean;
  // 开启sqlite api访问, 默认 true
  plugin_api?: boolean;
  // nsfw 检测
  plugin_nsfw?: boolean;
  // 端口号
  port?: number;
}
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
