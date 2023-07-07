# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.7.2](https://github.com/rao-pics/core/compare/v0.7.1...v0.7.2) (2023-07-07)


### Bug Fixes

* 🐛 关闭软件之后,再次开启无法同步 ([42bf4b4](https://github.com/rao-pics/core/commit/42bf4b4b9d0ec3de4db677c6d9fa427f76d5b02a)), closes [#299](https://github.com/rao-pics/core/issues/299)
* 🐛 回收站图片,不应该显示 ([4af5191](https://github.com/rao-pics/core/commit/4af5191e9bb3dd398d4f0e8a6f6490b205f90bed))


### Improves

* ⚡️ 优化同步速度,3秒内未修改的直接跳过 ([916508d](https://github.com/rao-pics/core/commit/916508d31ef82f16a6aa648c9831a8239f949a74))
* ⚡️ 优化控制台文案 ([93e5a67](https://github.com/rao-pics/core/commit/93e5a671986df2b02270e14f713e02e36403545e))

### [0.7.1](https://github.com/rao-pics/core/compare/v0.7.0...v0.7.1) (2023-07-06)

## [0.7.0](https://github.com/rao-pics/core/compare/v0.7.0-beta.1...v0.7.0) (2023-07-06)

### Bug Fixes

- 🐛 移除 library 失败 ([9c08252](https://github.com/rao-pics/core/commit/9c082524dfc3dad340748f1a677e509b7807b5af))
- 🐛 退出后重启 web 服务未启动 ([d581be1](https://github.com/rao-pics/core/commit/d581be19bbd02cfcb1898b1260da70dcc10c7f26)), closes [#294](https://github.com/rao-pics/core/issues/294)

### Improves

- ⚡️ 优化移除 library 逻辑 ([51669df](https://github.com/rao-pics/core/commit/51669dfcfa03582ab01f832b98970bc2a3ec641f))
- ⚡️ 添加时文件过多，等待时间过长添加 loading ([7413d1a](https://github.com/rao-pics/core/commit/7413d1a57b5c430cc827b3aee175a899210bd369)), closes [#289](https://github.com/rao-pics/core/issues/289)

## [0.7.0-beta.1](https://github.com/rao-pics/core/compare/v0.7.0-beta.0...v0.7.0-beta.1) (2023-07-05)

### Bug Fixes

- 🐛 @acme/image/get 类型问题 ([a713130](https://github.com/rao-pics/core/commit/a7131303c4c2e5c7ddec4b1c58828000296ddea1))
- 🐛 createSqlite error ([aac6983](https://github.com/rao-pics/core/commit/aac698346887c1d055fa8969d03b34b9971d5454))
- 🐛 同步中隐藏后台报错/进度显示不准确 ([d40781b](https://github.com/rao-pics/core/commit/d40781b324a526176aa67bac6bbf9ba147d35a6e)), closes [#290](https://github.com/rao-pics/core/issues/290)

### Refactors

- 💡 @acme/assets-server move to electron ([5da8bf9](https://github.com/rao-pics/core/commit/5da8bf95614435e64aeb1d354fca9348bc1e1303))

## [0.7.0-beta.0](https://github.com/rao-pics/core/compare/v0.6.5...v0.7.0-beta.0) (2023-07-05)

### Features

- 🎸 @acme/curd image create ([b0b2564](https://github.com/rao-pics/core/commit/b0b25649541bb93241bf4f68ac96f214844bea85))
- 🎸 同步方案改为 chokidar,二次同步速度提升非常大 ([0ac6a46](https://github.com/rao-pics/core/commit/0ac6a469609ed29a9db3a2d1f62328bf58afdc32))

### Bug Fixes

- 🐛 cmd+q-覆盖掉了其他的菜单事件 ([b033cb7](https://github.com/rao-pics/core/commit/b033cb75c04d3e0048e2dbecc2894775b2503f2d))

### Refactors

- 💡 db remove failCount fileCount ([8490c85](https://github.com/rao-pics/core/commit/8490c855a833d5afae239c1006e4f37f4203594b))
- 💡 schema.prisma ([b07c34f](https://github.com/rao-pics/core/commit/b07c34f0f350e1f7f99cd3033371f44688549eaa))

### Improves

- ⚡️ 操作台增加版本显示 ([22eb69a](https://github.com/rao-pics/core/commit/22eb69a62297834b56cb8efc54117eee148c9750)), closes [#285](https://github.com/rao-pics/core/issues/285)

### [0.6.5](https://github.com/rao-pics/core/compare/v0.6.4...v0.6.5) (2023-06-29)

### [0.6.4](https://github.com/rao-pics/core/compare/v0.6.3...v0.6.4) (2023-06-29)

### Refactors

- 💡 BrowerWindow 改为单例模式 ([f0c9714](https://github.com/rao-pics/core/commit/f0c9714f574efc557a314f5dc308efa9b6c167d7))
- 💡 eagle move to support/eagle ([a3e6a7b](https://github.com/rao-pics/core/commit/a3e6a7b1a6c1ae6ec322e541f2b3db604b2bab97))
- 💡 electron-trpc replacte ipc.on ([6ab83b6](https://github.com/rao-pics/core/commit/6ab83b63692db5f06d1ffbd618a6c00460d2facd))
- 💡 electron-trpc 替换完成 ([5bbef50](https://github.com/rao-pics/core/commit/5bbef50f46bce744f1d4ea0be374a5f485214dc7))

### [0.6.4](https://github.com/rao-pics/core/compare/v0.6.3...v0.6.4) (2023-06-29)

### Refactors

- 💡 BrowerWindow 改为单例模式 ([f0c9714](https://github.com/rao-pics/core/commit/f0c9714f574efc557a314f5dc308efa9b6c167d7))
- 💡 eagle move to support/eagle ([a3e6a7b](https://github.com/rao-pics/core/commit/a3e6a7b1a6c1ae6ec322e541f2b3db604b2bab97))
- 💡 electron-trpc replacte ipc.on ([6ab83b6](https://github.com/rao-pics/core/commit/6ab83b63692db5f06d1ffbd618a6c00460d2facd))
- 💡 electron-trpc 替换完成 ([5bbef50](https://github.com/rao-pics/core/commit/5bbef50f46bce744f1d4ea0be374a5f485214dc7))

### [0.6.3](https://github.com/rao-pics/core/compare/v0.6.2...v0.6.3) (2023-06-22)

### Features

- 🎸 文件夹 iPad Mobile 展示 ([9a6d1f3](https://github.com/rao-pics/core/commit/9a6d1f3a8dd055cf6eb3b5168e5b149df935fa48)), closes [#270](https://github.com/rao-pics/core/issues/270)
- 🎸 标签 mobile ipad 支持 ([19d8d20](https://github.com/rao-pics/core/commit/19d8d20bd187c263c6207877b38a046fcbc674d2)), closes [#269](https://github.com/rao-pics/core/issues/269)

### Bug Fixes

- 🐛 IP 无法更新问题 ([a4e72da](https://github.com/rao-pics/core/commit/a4e72da0b73fbb1430b3c12ed43771ca0538a604))
- 🐛 取消关联已经删除的 Tag 和已经删除的 Image 报错问题 ([3354b8d](https://github.com/rao-pics/core/commit/3354b8d06b9385f07137dbf89004ac3a5eb36242))

### Improves

- ⚡️ tag/folder 查询返回增加 image 排序 ([5b190c1](https://github.com/rao-pics/core/commit/5b190c166b6ef0aae172099fdb4c3c04ab0b1ca7))
- ⚡️ 二次同步速度优化 closes [#212](https://github.com/rao-pics/core/issues/212) ([f9234ec](https://github.com/rao-pics/core/commit/f9234ecb4c3fd72098bb87f139e83568eb50976e))

### [0.6.2](https://github.com/rao-pics/core/compare/v0.6.1...v0.6.2) (2023-06-21)

### Bug Fixes

- 🐛 Web 375px 一下屏幕显示异常 ([a13dcf4](https://github.com/rao-pics/core/commit/a13dcf40353d301b063c3c9d2ed042e28b8c4bc3)), closes [#271](https://github.com/rao-pics/core/issues/271)
- 🐛 紧急修复 0.6.1 无法同步 Bug ([c209116](https://github.com/rao-pics/core/commit/c209116786b289e11db1d0d272499fde998784b5))

### [0.6.1](https://github.com/rao-pics/core/compare/v0.6.0...v0.6.1) (2023-06-21)

### Features

- 🎸 托盘添加下载页面跳转 ([c9d0827](https://github.com/rao-pics/core/commit/c9d0827b3686a2fab6342ab04dc59f01866a6c44)), closes [#249](https://github.com/rao-pics/core/issues/249)

### Bug Fixes

- 🐛 图片删除标签删除之后未同步 ([0138493](https://github.com/rao-pics/core/commit/01384934ba5faeaad3ad406101402f7d20815542)), closes [#266](https://github.com/rao-pics/core/issues/266)

## [0.6.0](https://github.com/rao-pics/core/compare/v0.5.3...v0.6.0) (2023-06-19)

### Features

- 🎸 系统托盘 ([6bcbf1e](https://github.com/rao-pics/core/commit/6bcbf1e1f241016b4b8d7d54083d536e73adb11c)), closes [#224](https://github.com/rao-pics/core/issues/224)

### Bug Fixes

- 🐛 一直点击同步按钮问题 ([c608f4f](https://github.com/rao-pics/core/commit/c608f4fec70a41dad93c1752caa098fae9c66667)), closes [#257](https://github.com/rao-pics/core/issues/257)

### [0.5.3](https://github.com/rao-pics/core/compare/v0.5.2...v0.5.3) (2023-06-17)

### Features

- 🎸 web 兼容 ipad 移动端 ([9433d58](https://github.com/rao-pics/core/commit/9433d58fad18d857e3685d653f9f7742baa17b8d))

### Refactors

- 💡 folder db 操作移动到 @acme/curd ([0235b3f](https://github.com/rao-pics/core/commit/0235b3f324d2b37fbbe77070268ecc2d676fb6fa))

### Tests

- 💍 @acme/curd folder ([d2281ae](https://github.com/rao-pics/core/commit/d2281ae08c0c719c1b7c8ce73053c14f735713dd))

### Improves

- ⚡️ hide windows menu bar ([75d657d](https://github.com/rao-pics/core/commit/75d657d27fa1978b1d75a48d5fa0319479c74024)), closes [#234](https://github.com/rao-pics/core/issues/234)
- ⚡️ 预览播放视频改为重复播放 ([4527644](https://github.com/rao-pics/core/commit/4527644fdfbaa92260a3490153a83d692796fa57)), closes [#254](https://github.com/rao-pics/core/issues/254)

### [0.5.2](https://github.com/rao-pics/core/compare/v0.5.1...v0.5.2) (2023-06-14)

### Features

- 🎸 web 支持调整一行显示数量 ([23ffb63](https://github.com/rao-pics/core/commit/23ffb63743030c07afdac5bbcab08eb095eccc08)), closes [#242](https://github.com/rao-pics/core/issues/242)

### Improves

- ⚡️ 添加不支持的文件夹，给出提示 ([6d4ed22](https://github.com/rao-pics/core/commit/6d4ed2242f93a29403d8cedc0e888971dd6b8487)), closes [#218](https://github.com/rao-pics/core/issues/218)

### [0.5.1](https://github.com/rao-pics/core/compare/v0.5.0...v0.5.1) (2023-06-13)

### Features

- 🎸 ip 改变 web 预览地址，未同步 ([70c0308](https://github.com/rao-pics/core/commit/70c0308d367b55db68f7107a86b328f67714bac9)), closes [#207](https://github.com/rao-pics/core/issues/207)

### Bug Fixes

- 🐛 刷新同步进度显示错误 ([dda405c](https://github.com/rao-pics/core/commit/dda405c4c6f259cfa23aee55494b5240d3852ddd)), closes [#228](https://github.com/rao-pics/core/issues/228)

## [0.5.0](https://github.com/rao-pics/core/compare/v0.5.0-beta.9...v0.5.0) (2023-06-12)

### Features

- 🎸 windows release ([c3839c6](https://github.com/rao-pics/core/commit/c3839c697bb56555aa07f07291fca59dbc582a67)), closes [#210](https://github.com/rao-pics/core/issues/210)

## [0.5.0-beta.9](https://github.com/rao-pics/core/compare/v0.5.0-beta.8...v0.5.0-beta.9) (2023-06-10)

### Bug Fixes

- 🐛 dropdown 无法取消 ([f2a70a8](https://github.com/rao-pics/core/commit/f2a70a8787c1b4ca9388ad3ad96de04705dd1776)), closes [#202](https://github.com/rao-pics/core/issues/202) [#201](https://github.com/rao-pics/core/issues/201)
- 🐛 Library 名字过长，显示不完整 ([01931c7](https://github.com/rao-pics/core/commit/01931c7ce7df63cb8eed6524e79eb21480295a1f)), closes [#204](https://github.com/rao-pics/core/issues/204)

### Refactors

- 🎨 移除 DotEnv，scripts 中的 with-env ([f289aa4](https://github.com/rao-pics/core/commit/f289aa43a218fd5e8de5f3434fcf4812d98cc71a)), closes [#203](https://github.com/rao-pics/core/issues/203)

## [0.5.0-beta.8](https://github.com/rao-pics/core/compare/v0.5.0-beta.7...v0.5.0-beta.8) (2023-06-09)

### Improves

- ⚡️ dmg 体积减少 40M [#205](https://github.com/rao-pics/core/issues/205) ([91e5da6](https://github.com/rao-pics/core/commit/91e5da6ed4bb263ab75dbaeda6a69d7e8ea5df6f))

## [0.5.0-beta.7](https://github.com/rao-pics/core/compare/v0.5.0-beta.5...v0.5.0-beta.7) (2023-06-09)

### Features

- 🎸 支持 MP4 展示 ([8d53b23](https://github.com/rao-pics/core/commit/8d53b23b487e901df21b51ba3308c4856909e6b4)), closes [#192](https://github.com/rao-pics/core/issues/192)
- 🎸 新增视频格式:mp4,avi,mov,wmv,flv,webm,mkv ([266fc36](https://github.com/rao-pics/core/commit/266fc363feabe9ce02dfaaa8e4a06db54b2ba9ec)), closes [#193](https://github.com/rao-pics/core/issues/193)

### Bug Fixes

- 🐛 @acme/eagle 异常处理 ([92eec37](https://github.com/rao-pics/core/commit/92eec37ce92bd6c8f37fa7c1d82b71d3144a097d)), closes [#190](https://github.com/rao-pics/core/issues/190)
- 🐛 NODE_ENV 问题 ([b2034d5](https://github.com/rao-pics/core/commit/b2034d5889c5742289810eb46c39da26e50c57ec)), closes [#191](https://github.com/rao-pics/core/issues/191)
- 🐛 类型错误 ([aa1b915](https://github.com/rao-pics/core/commit/aa1b915bf42031c01b46f0fbc5c5b0d8d8b32255)), closes [#189](https://github.com/rao-pics/core/issues/189)

### Refactors

- 💡 all ext replace CONSTANT.EXT ([f2d994c](https://github.com/rao-pics/core/commit/f2d994c66decab289d37e862ee12d2eb58014e02))

## [0.5.0-beta.5](https://github.com/rao-pics/core/compare/v0.5.0-beta.4...v0.5.0-beta.5) (2023-06-07)

### Improves

- ⚡️ Test coverage badge ([3bb2f85](https://github.com/rao-pics/core/commit/3bb2f85d7daf8453dd663164c84eb83738775500))
- ⚡️ turbo update ([e96fbd4](https://github.com/rao-pics/core/commit/e96fbd44cee8e7e5bf0ae3ed7d514d0c555b83ae)), closes [#179](https://github.com/rao-pics/core/issues/179)
- ⚡️ 移除 TagsGroup 标签分组 ([80290c2](https://github.com/rao-pics/core/commit/80290c26157d2ab2349b57d49786f812b7228d91)), closes [#180](https://github.com/rao-pics/core/issues/180)

### Refactors

- 💡 db schema image colors 字段重构 ([96276fd](https://github.com/rao-pics/core/commit/96276fd26903c10e9a7e86bc31366239d2f6c0e2)), closes [#184](https://github.com/rao-pics/core/issues/184) [#185](https://github.com/rao-pics/core/issues/185) [#187](https://github.com/rao-pics/core/issues/187)
- 💡 prisma schema ([3acbb44](https://github.com/rao-pics/core/commit/3acbb4483a3672121943177ae2bf500b877e602a))

## [0.5.0-beta.4](https://github.com/rao-pics/core/compare/v0.5.0-beta.3...v0.5.0-beta.4) (2023-06-06)

### Features

- 🎸 搜索功能，按关键词搜索 ([b5b7f68](https://github.com/rao-pics/core/commit/b5b7f685f9297b7b8a3fd23ef30ee8c727b486dc)), closes [#167](https://github.com/rao-pics/core/issues/167)

### Tests

- 💍 Add unit test with image isDeleted ([c162601](https://github.com/rao-pics/core/commit/c162601243c9c0bc4149630fe709ca7158936462))
- 💍 config unit use faker ([52fe06c](https://github.com/rao-pics/core/commit/52fe06c1e217e30194c2339d8f4ca93394f92bbb))
- 💍 使用 Fakerjs 动态生成 Image Mock 数据，代替 image.json ([c081bb3](https://github.com/rao-pics/core/commit/c081bb3a6c5a903b44b9ad80c5e005f3f38d994e)), closes [#174](https://github.com/rao-pics/core/issues/174)
- 💍 使用 Fakerjs 动态生成 Library Mock 数据 ([4c3f840](https://github.com/rao-pics/core/commit/4c3f840c03e442c5c3c98167ce09db324293dd7c)), closes [#175](https://github.com/rao-pics/core/issues/175)
- 💍 单元测试公用方法，清空数据库 ([003bf05](https://github.com/rao-pics/core/commit/003bf05440442471e9602d5a4909315508bd5288)), closes [#169](https://github.com/rao-pics/core/issues/169)
- 💍 简化 Eagle Folder 类型文件，便于 Mock 数据 ([3212d4f](https://github.com/rao-pics/core/commit/3212d4f1effe93d9967b4b3c2eeff5fb52693c25)), closes [#177](https://github.com/rao-pics/core/issues/177)

## [0.5.0-beta.3](https://github.com/rao-pics/core/compare/v0.5.0-beta.2...v0.5.0-beta.3) (2023-06-04)

### Features

- 🎸 db 存放位置移动到 Library/Caches/{App Name}中 ([b88281b](https://github.com/rao-pics/core/commit/b88281ba19f40bc7050a53be16f776dbff1b6fd4)), closes [#157](https://github.com/rao-pics/core/issues/157)
- 🎸 新增文件夹展示页面 & 根据文件夹搜索 ([322d929](https://github.com/rao-pics/core/commit/322d9296001078e80aac633dda0d3954797095b1)), closes [#160](https://github.com/rao-pics/core/issues/160)

### Improves

- ⚡️ version 版本自动化 ([8d1f959](https://github.com/rao-pics/core/commit/8d1f95974c27f6a1c5cef5bc68c00c23ec66dd30)), closes [#156](https://github.com/rao-pics/core/issues/156)
- ⚡️ 打包时，根据平台添加额外的 prisma 可执行文件 ([c857a22](https://github.com/rao-pics/core/commit/c857a22bffe88b02ad4ec25d901d00c40cd7d4e1)), closes [#158](https://github.com/rao-pics/core/issues/158)

### Tests

- 💍 packages/api unit test ([ce7ac0a](https://github.com/rao-pics/core/commit/ce7ac0a174c5947f59fcea6b7a2f8759a57cfd51)), closes [#165](https://github.com/rao-pics/core/issues/165)

## [0.5.0-beta.2](https://github.com/rao-pics/core/compare/v0.5.0-beta.1...v0.5.0-beta.2) (2023-06-01)

### Features

- 🎸 add tags page ([3514cb7](https://github.com/rao-pics/core/commit/3514cb70f1ee42a1eb6ce9c14eeaaf3f3fefed0e))
- 🎸 Show tag on list card ([b382a81](https://github.com/rao-pics/core/commit/b382a811526a82b45516b1b09efd808a0823a9e6))

### Bug Fixes

- 🐛 parse metadata.json 失败 ([b0fa907](https://github.com/rao-pics/core/commit/b0fa907427234a06842a6d0d07bd255a269ee02a)), closes [#155](https://github.com/rao-pics/core/issues/155)

## [0.5.0-beta.2](https://github.com/rao-pics/core/compare/v0.5.0-beta.1...v0.5.0-beta.2) (2023-06-01)

### Features

- 🎸 add tags page ([3514cb7](https://github.com/rao-pics/core/commit/3514cb70f1ee42a1eb6ce9c14eeaaf3f3fefed0e))
- 🎸 Show tag on list card ([b382a81](https://github.com/rao-pics/core/commit/b382a811526a82b45516b1b09efd808a0823a9e6))

### Bug Fixes

- 🐛 parse metadata.json 失败 ([b0fa907](https://github.com/rao-pics/core/commit/b0fa907427234a06842a6d0d07bd255a269ee02a)), closes [#155](https://github.com/rao-pics/core/issues/155)
