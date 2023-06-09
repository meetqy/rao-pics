# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [0.5.0-beta.8](https://github.com/rao-pics/core/compare/v0.5.0-beta.7...v0.5.0-beta.8) (2023-06-09)


### Improves

* ⚡️ dmg 体积减少40M [#205](https://github.com/rao-pics/core/issues/205) ([91e5da6](https://github.com/rao-pics/core/commit/91e5da6ed4bb263ab75dbaeda6a69d7e8ea5df6f))

## [0.5.0-beta.7](https://github.com/rao-pics/core/compare/v0.5.0-beta.5...v0.5.0-beta.7) (2023-06-09)


### Features

* 🎸 支持 MP4 展示 ([8d53b23](https://github.com/rao-pics/core/commit/8d53b23b487e901df21b51ba3308c4856909e6b4)), closes [#192](https://github.com/rao-pics/core/issues/192)
* 🎸 新增视频格式:mp4,avi,mov,wmv,flv,webm,mkv ([266fc36](https://github.com/rao-pics/core/commit/266fc363feabe9ce02dfaaa8e4a06db54b2ba9ec)), closes [#193](https://github.com/rao-pics/core/issues/193)


### Bug Fixes

* 🐛 @acme/eagle 异常处理 ([92eec37](https://github.com/rao-pics/core/commit/92eec37ce92bd6c8f37fa7c1d82b71d3144a097d)), closes [#190](https://github.com/rao-pics/core/issues/190)
* 🐛 NODE_ENV 问题 ([b2034d5](https://github.com/rao-pics/core/commit/b2034d5889c5742289810eb46c39da26e50c57ec)), closes [#191](https://github.com/rao-pics/core/issues/191)
* 🐛 类型错误 ([aa1b915](https://github.com/rao-pics/core/commit/aa1b915bf42031c01b46f0fbc5c5b0d8d8b32255)), closes [#189](https://github.com/rao-pics/core/issues/189)


### Refactors

* 💡 all ext replace CONSTANT.EXT ([f2d994c](https://github.com/rao-pics/core/commit/f2d994c66decab289d37e862ee12d2eb58014e02))

## [0.5.0-beta.5](https://github.com/rao-pics/core/compare/v0.5.0-beta.4...v0.5.0-beta.5) (2023-06-07)


### Improves

* ⚡️ Test coverage badge ([3bb2f85](https://github.com/rao-pics/core/commit/3bb2f85d7daf8453dd663164c84eb83738775500))
* ⚡️ turbo update ([e96fbd4](https://github.com/rao-pics/core/commit/e96fbd44cee8e7e5bf0ae3ed7d514d0c555b83ae)), closes [#179](https://github.com/rao-pics/core/issues/179)
* ⚡️ 移除 TagsGroup 标签分组 ([80290c2](https://github.com/rao-pics/core/commit/80290c26157d2ab2349b57d49786f812b7228d91)), closes [#180](https://github.com/rao-pics/core/issues/180)


### Refactors

* 💡 db schema image colors 字段重构 ([96276fd](https://github.com/rao-pics/core/commit/96276fd26903c10e9a7e86bc31366239d2f6c0e2)), closes [#184](https://github.com/rao-pics/core/issues/184) [#185](https://github.com/rao-pics/core/issues/185) [#187](https://github.com/rao-pics/core/issues/187)
* 💡 prisma schema ([3acbb44](https://github.com/rao-pics/core/commit/3acbb4483a3672121943177ae2bf500b877e602a))

## [0.5.0-beta.4](https://github.com/rao-pics/core/compare/v0.5.0-beta.3...v0.5.0-beta.4) (2023-06-06)


### Features

* 🎸 搜索功能，按关键词搜索 ([b5b7f68](https://github.com/rao-pics/core/commit/b5b7f685f9297b7b8a3fd23ef30ee8c727b486dc)), closes [#167](https://github.com/rao-pics/core/issues/167)


### Tests

* 💍 Add unit test with image isDeleted ([c162601](https://github.com/rao-pics/core/commit/c162601243c9c0bc4149630fe709ca7158936462))
* 💍 config unit use faker ([52fe06c](https://github.com/rao-pics/core/commit/52fe06c1e217e30194c2339d8f4ca93394f92bbb))
* 💍 使用 Fakerjs 动态生成 Image Mock 数据，代替 image.json ([c081bb3](https://github.com/rao-pics/core/commit/c081bb3a6c5a903b44b9ad80c5e005f3f38d994e)), closes [#174](https://github.com/rao-pics/core/issues/174)
* 💍 使用 Fakerjs 动态生成 Library Mock 数据 ([4c3f840](https://github.com/rao-pics/core/commit/4c3f840c03e442c5c3c98167ce09db324293dd7c)), closes [#175](https://github.com/rao-pics/core/issues/175)
* 💍 单元测试公用方法，清空数据库 ([003bf05](https://github.com/rao-pics/core/commit/003bf05440442471e9602d5a4909315508bd5288)), closes [#169](https://github.com/rao-pics/core/issues/169)
* 💍 简化 Eagle Folder 类型文件，便于 Mock 数据 ([3212d4f](https://github.com/rao-pics/core/commit/3212d4f1effe93d9967b4b3c2eeff5fb52693c25)), closes [#177](https://github.com/rao-pics/core/issues/177)

## [0.5.0-beta.3](https://github.com/rao-pics/core/compare/v0.5.0-beta.2...v0.5.0-beta.3) (2023-06-04)


### Features

* 🎸 db存放位置移动到 Library/Caches/{App Name}中 ([b88281b](https://github.com/rao-pics/core/commit/b88281ba19f40bc7050a53be16f776dbff1b6fd4)), closes [#157](https://github.com/rao-pics/core/issues/157)
* 🎸 新增文件夹展示页面 & 根据文件夹搜索 ([322d929](https://github.com/rao-pics/core/commit/322d9296001078e80aac633dda0d3954797095b1)), closes [#160](https://github.com/rao-pics/core/issues/160)


### Improves

* ⚡️ version 版本自动化 ([8d1f959](https://github.com/rao-pics/core/commit/8d1f95974c27f6a1c5cef5bc68c00c23ec66dd30)), closes [#156](https://github.com/rao-pics/core/issues/156)
* ⚡️ 打包时，根据平台添加额外的prisma可执行文件 ([c857a22](https://github.com/rao-pics/core/commit/c857a22bffe88b02ad4ec25d901d00c40cd7d4e1)), closes [#158](https://github.com/rao-pics/core/issues/158)


### Tests

* 💍 packages/api unit test ([ce7ac0a](https://github.com/rao-pics/core/commit/ce7ac0a174c5947f59fcea6b7a2f8759a57cfd51)), closes [#165](https://github.com/rao-pics/core/issues/165)

## [0.5.0-beta.2](https://github.com/rao-pics/core/compare/v0.5.0-beta.1...v0.5.0-beta.2) (2023-06-01)


### Features

* 🎸 add tags page ([3514cb7](https://github.com/rao-pics/core/commit/3514cb70f1ee42a1eb6ce9c14eeaaf3f3fefed0e))
* 🎸 Show tag on list card ([b382a81](https://github.com/rao-pics/core/commit/b382a811526a82b45516b1b09efd808a0823a9e6))


### Bug Fixes

* 🐛 parse metadata.json 失败 ([b0fa907](https://github.com/rao-pics/core/commit/b0fa907427234a06842a6d0d07bd255a269ee02a)), closes [#155](https://github.com/rao-pics/core/issues/155)

## [0.5.0-beta.2](https://github.com/rao-pics/core/compare/v0.5.0-beta.1...v0.5.0-beta.2) (2023-06-01)


### Features

* 🎸 add tags page ([3514cb7](https://github.com/rao-pics/core/commit/3514cb70f1ee42a1eb6ce9c14eeaaf3f3fefed0e))
* 🎸 Show tag on list card ([b382a81](https://github.com/rao-pics/core/commit/b382a811526a82b45516b1b09efd808a0823a9e6))


### Bug Fixes

* 🐛 parse metadata.json 失败 ([b0fa907](https://github.com/rao-pics/core/commit/b0fa907427234a06842a6d0d07bd255a269ee02a)), closes [#155](https://github.com/rao-pics/core/issues/155)
