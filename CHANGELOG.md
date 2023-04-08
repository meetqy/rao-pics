# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.4](https://github.com/rao-pics/core/compare/v0.4.3...v0.4.4) (2023-04-08)

### Features

- 🎸 docker compose ([b8f89ae](https://github.com/rao-pics/core/commit/b8f89ae6ea82e10eb77c45c8cf902cafe58697f2))
- 🎸 docker nginx 一键部署 ([e24f031](https://github.com/rao-pics/core/commit/e24f031aa8e5cfa0ea739d89c748189b810f74b4))
- 🎸 PLUGIN_NSFW 独立引入 ([e10daaf](https://github.com/rao-pics/core/commit/e10daaf085c7c0443cdc8a1174c94e83e8a5b37a))

### [0.4.3](https://github.com/rao-pics/core/compare/v0.4.2...v0.4.3) (2023-04-06)

### Features

- 🎸 docker compose ([ff3e186](https://github.com/rao-pics/core/commit/ff3e186b5e07a78aba19fe7496869f75a063ce7f))
- 🎸 docker nginx 一键部署 ([2b78e08](https://github.com/rao-pics/core/commit/2b78e08a4a4d2ac0eea2835b9b4d96dbae362ca0))

### [0.4.2](https://github.com/rao-pics/core/compare/v0.4.1...v0.4.2) (2023-04-04)

### Features

- 🎸 API docker 部署 ([3a7a88a](https://github.com/rao-pics/core/commit/3a7a88a971aa8951fe293758b59bde5d2a2e3164))

### [0.4.1](https://github.com/rao-pics/core/compare/v0.4.0...v0.4.1) (2023-04-02)

### Bug Fixes

- 🐛 [prisma-cilent-generate] files ([986a90d](https://github.com/rao-pics/core/commit/986a90df674213cfe574bbb4a56651026f4397d5))
- 🐛 @raopics/use build ([121cf4a](https://github.com/rao-pics/core/commit/121cf4a2e63a6f4bb1df6abe82182ba3d669454a))
- 🐛 有其他 package 无法 install ([ac8d7a5](https://github.com/rao-pics/core/commit/ac8d7a584b7e7dde79670fc7bed54f7ac393ecb2))

## [0.4.0](https://github.com/rao-pics/core/compare/v0.3.2...v0.4.0) (2023-03-24)

### Features

- 🎸 简化零配置,只需 2 步,启动服务 ([47d7a65](https://github.com/rao-pics/core/commit/47d7a65b0af5f3ce3d27aa372437dbfdb24df101))

### Bug Fixes

- 🐛 【Core】EagleApp 中导入图片，并勾选使用已存在的图片，NSFW 检测结果会被覆盖 ([d46010f](https://github.com/rao-pics/core/commit/d46010f3ff20101c108166dabf263bd89fe8933c)), closes [#90](https://github.com/rao-pics/core/issues/90)
- 🐛 example env error ([8dcfa5b](https://github.com/rao-pics/core/commit/8dcfa5b3899b3e98120109ad484673157b974442))
- 🐛 无法监听 BUG ([aad8d1e](https://github.com/rao-pics/core/commit/aad8d1ead4c99ea781c2cccc8f057b994d243cd8))

### [0.3.2](https://github.com/rao-pics/core/compare/v1.0.4...v0.3.2) (2023-03-20)

### Features

- 🎸 add @eagleuse/eagleuse ([5fd37c1](https://github.com/rao-pics/core/commit/5fd37c11d2ba4a515444fad3ceea73b05abf5e90))
- 🎸 add folder/tag/tagsgroups ([d08d324](https://github.com/rao-pics/core/commit/d08d3243130039039beeb566818ac9fbf25778b7))
- 🎸 eagleuse 新增 API transform 参数控制 ([160c5b9](https://github.com/rao-pics/core/commit/160c5b902c36449887c450592277afcc1e09440a))
- 🎸 plugin-nsfw ([251c083](https://github.com/rao-pics/core/commit/251c0831cf1e4faf62ff929a10b100614e51019d))
- 🎸 support mp4 gif ([aa65076](https://github.com/rao-pics/core/commit/aa65076d66eb46c605b5d95a0ab729b790793f32))
- 🎸 支持 @eagleuse/plugin-nsfw ([40c8b0f](https://github.com/rao-pics/core/commit/40c8b0fba49c5a79b28b4da2a22265bdef3514cb))

### Bug Fixes

- 🐛 【Default Theme】增加 NSFW 开关 ([d1cdf98](https://github.com/rao-pics/core/commit/d1cdf988694590f85ef2022a6b26d5dda2b181cf)), closes [#101](https://github.com/rao-pics/core/issues/101)
- 🐛 Compatibility sqlite DB ([0ddee2c](https://github.com/rao-pics/core/commit/0ddee2c67feda522d7d13b4b1c68c354f8a9515e))
- 🐛 customImage tags 可能为 kong ([43071d6](https://github.com/rao-pics/core/commit/43071d63277ef7c5c54d325fdf5e829aa5b4d7e1))
- 🐛 folder 删除无效 ([95133d3](https://github.com/rao-pics/core/commit/95133d3d2d5a283d4966c926abcc5e32a170ff1d))
- 🐛 ip move to dependencies ([9f5efbf](https://github.com/rao-pics/core/commit/9f5efbf47c74e15449cf4614413ca82f37cac5b4))
- 🐛 nsfw 支持格式 ([47eeeba](https://github.com/rao-pics/core/commit/47eeeba5f6fc16474cb055d8139787d249863a30))
- 🐛 nsfw 检测和时间判断更新冲突 ([5ccc2a3](https://github.com/rao-pics/core/commit/5ccc2a3b161a3e81475c1818c3ed3758d4c2f760))
- 🐛 prisma-client prisma-client 监听 DATABASE_URL，改变重新实例化 ([7a4810a](https://github.com/rao-pics/core/commit/7a4810a8356f1f3b8e519e8d189a551e3d816752)), closes [#102](https://github.com/rao-pics/core/issues/102)
- 🐛 remove mjs ([a86770a](https://github.com/rao-pics/core/commit/a86770a9403645710b89c770e6211978fccae351))
- 🐛 starredTags ([ad9dc83](https://github.com/rao-pics/core/commit/ad9dc83a1ab0d7608606bdcc8bc3cbb117e0d855))
- 🐛 Support embed other fastify ([ad41662](https://github.com/rao-pics/core/commit/ad416620669d9039eda309b103dc0eb8ff1b9bff))
- 🐛 tagsGroups ([6e74e09](https://github.com/rao-pics/core/commit/6e74e0974d324155007bfa851c05a40957802763))
- 🐛 参数兼容 ([00e1810](https://github.com/rao-pics/core/commit/00e18100335ee48c7215d836a336fc7df0b4c9d4))
- 🐛 导入显示 bug ([538459c](https://github.com/rao-pics/core/commit/538459c96b2eebca19c54c37723b47e94bf5d853))
