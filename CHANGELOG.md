# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.7](https://github.com/meetqy/eagleuse/compare/v0.1.6...v0.1.7) (2023-02-08)

### Performance Improvements | 性能优化

- ⚡️ ipad 兼容性 ([eb1f608](https://github.com/meetqy/eagleuse/commit/eb1f60824df9170bf046abda808c7b7b7db2952e)), closes [#69](https://github.com/meetqy/eagleuse/issues/69)

### Bug Fixes | Bug 修复

- 🐛 移动端先给出提示不支持移动端展示 ([c1831f3](https://github.com/meetqy/eagleuse/commit/c1831f34aafd5c4ff3bc4eeb1016794425d7b06b)), closes [#55](https://github.com/meetqy/eagleuse/issues/55)
- 🐛 重命名 tag 会新增一个 tag ([0ac76b1](https://github.com/meetqy/eagleuse/commit/0ac76b1f8318b75e8b220b052cab549e3d99d403)), closes [#73](https://github.com/meetqy/eagleuse/issues/73)

### Styles | 风格

- 💄 移动端提示样式微调 ([17c9f85](https://github.com/meetqy/eagleuse/commit/17c9f8542bed3398e991fad980964000ff924a1b))

### [0.1.6](https://github.com/meetqy/eagleuse/compare/v0.1.5...v0.1.6) (2023-02-06)

### Features | 新功能

- 🎸 菜单/回收站可通过参数控制 ([8aff673](https://github.com/meetqy/eagleuse/commit/8aff673e0e3af35720be3bd02b3e5924ab1c0f6e))

### Bug Fixes | Bug 修复

- 🐛 eagle 导入了非图片格式数据报错 ([e6c6c05](https://github.com/meetqy/eagleuse/commit/e6c6c055c88f73acec78262b881adba54ff19ce8)), closes [#71](https://github.com/meetqy/eagleuse/issues/71)
- 🐛 监听导入多张读取 metadata.json 失败 ([8f038a4](https://github.com/meetqy/eagleuse/commit/8f038a4279db79e086eff1247195ec953f266b45)), closes [#70](https://github.com/meetqy/eagleuse/issues/70)
- 🐛 翻页选中的图片会丢失 ([ecb6037](https://github.com/meetqy/eagleuse/commit/ecb6037e6cd17b336decde70cd7d0da00182ffe4)), closes [#72](https://github.com/meetqy/eagleuse/issues/72)

### [0.1.5](https://github.com/meetqy/eagleuse/compare/v0.1.4...v0.1.5) (2023-02-03)

### Performance Improvements | 性能优化

- ⚡️ 静态资源改变,取消生成软连接 ([5eaeee9](https://github.com/meetqy/eagleuse/commit/5eaeee9895de300de3b404098c0f8456564f0af6))
- ⚡️ LOGO 跳转体验问题 ([a335900](https://github.com/meetqy/eagleuse/commit/a335900264779101463f8d82ccbe6e17de7fc08c)), closes [#63](https://github.com/meetqy/eagleuse/issues/63)

### Bug Fixes | Bug 修复

- 🐛 /api/image/random 跳转 BUG ([bf76c05](https://github.com/meetqy/eagleuse/commit/bf76c058d33aeeecfb3a16e726cf4dfd3d7645ef)), closes [#65](https://github.com/meetqy/eagleuse/issues/65)
- 🐛 大量操作 image 监听报错 ([7e1ecc2](https://github.com/meetqy/eagleuse/commit/7e1ecc200a89faf932859ae56752f18766ef0903)), closes [#62](https://github.com/meetqy/eagleuse/issues/62)
- 🐛 坚果云同步 eagleuse.db 未触发 new PrismaClient ([276a19d](https://github.com/meetqy/eagleuse/commit/276a19d2b332707d9e1a29029ca95839b4ad13bd))
- 🐛 图片颜色处理中,页面显示错误 ([430e17c](https://github.com/meetqy/eagleuse/commit/430e17c10b9e54a8a9b1f3c75f01dae1054fc160))

### [0.1.4](https://github.com/meetqy/eagleuse/compare/v0.1.3...v0.1.4) (2023-01-31)

### Performance Improvements | 性能优化

- ⚡️ 简化.env 配置 ([4824fca](https://github.com/meetqy/eagleuse/commit/4824fca520342c4ac24fc2b76aa4e0d47cd293e6))

### Features | 新功能

- 🎸 服务器中替换 eagleuse.db 无需重启服务 ([33c2a5f](https://github.com/meetqy/eagleuse/commit/33c2a5fbf6061bf11de309d0cb34bed694390555))

### Bug Fixes | Bug 修复

- 🐛 静态资源生成模式无法更新问题 ([f99a11f](https://github.com/meetqy/eagleuse/commit/f99a11fa4896b0cfdc2a8514c8ed96f0c31d7a3c))
- 🐛 切换 library 之后，软链接无法重新生成 ([0724f72](https://github.com/meetqy/eagleuse/commit/0724f72c00caa8de38dde2b9caeae6bbc4294ae6)), closes [#56](https://github.com/meetqy/eagleuse/issues/56)
- 🐛 修改出来的 监听 image bug ([6d5232f](https://github.com/meetqy/eagleuse/commit/6d5232fd6cc54df5c02ae892634173972afc4564))
- 🐛 prisma 监听 library，短时间内连续多次给图片添加标签报错 ([0c071a1](https://github.com/meetqy/eagleuse/commit/0c071a190bc802c08c9cb1e9d53631830d29bc62)), closes [#44](https://github.com/meetqy/eagleuse/issues/44)

### [0.1.3](https://github.com/meetqy/eagleuse/compare/v0.1.2...v0.1.3) (2023-01-27)

### Bug Fixes | Bug 修复

- 🐛 centos ensureSymlinkSync 报错 ([029f0af](https://github.com/meetqy/eagleuse/commit/029f0affec875ee56c6be50da6bec5e9a820ea6e))

### [0.1.2](https://github.com/meetqy/eagleuse/compare/v0.1.1...v0.1.2) (2023-01-27)

### Performance Improvements | 性能优化

- ⚡️ 图片添加 alt 显示格式 ([0443956](https://github.com/meetqy/eagleuse/commit/0443956f978abb75353efaad83c20dfa8953884b)), closes [#48](https://github.com/meetqy/eagleuse/issues/48)
- ⚡️ 主题模式切换显示 ([793bdbb](https://github.com/meetqy/eagleuse/commit/793bdbb440782e4b6eeac314cb02d302c7d6eba3))
- ⚡️ localstorage 记录主题 ([498c0a8](https://github.com/meetqy/eagleuse/commit/498c0a8e41ee47cc103b5a9944edc8d59bd529c1))

### Bug Fixes | Bug 修复

- 🐛 <Head> 报错 ([b300d9c](https://github.com/meetqy/eagleuse/commit/b300d9cc82c6c9752f182f1d5d55b0f1df43a47b)), closes [#52](https://github.com/meetqy/eagleuse/issues/52)
- 🐛 首页带参数跳转问题 ([593e6dc](https://github.com/meetqy/eagleuse/commit/593e6dca8c2afbf1f68612222356dfb248eba718))
- 🐛 star 查询条件错误 ([308edae](https://github.com/meetqy/eagleuse/commit/308edaea1e13d76dd5ca5fbcc7586520a2f11188))

### Features | 新功能

- 🎸 页面增加名称&版本号 ([bd040ba](https://github.com/meetqy/eagleuse/commit/bd040ba0ea62ef6df846f3166f7b6797a9be1c0d))

### [0.1.1](https://github.com/meetqy/eagleuse/compare/v0.1.0...v0.1.1) (2023-01-14)

### Features | 新功能

- 🎸 add /api/image/random 随机返回一张图片 ([a719607](https://github.com/meetqy/eagleuse/commit/a7196070e940a96a8f082e071ce91803868dfc9e))
- 🎸 add dark mode ([c8a0506](https://github.com/meetqy/eagleuse/commit/c8a0506c1f840a94af38ac6eeafa08e85f45226d))

### Styles | 风格

- 💄 删除搜索左侧文本 ([8d69260](https://github.com/meetqy/eagleuse/commit/8d69260d5463ba3e373f892128aded075a5f5548))
- 💄 搜索栏样式调整 ([e7aab48](https://github.com/meetqy/eagleuse/commit/e7aab48af332a67410b4651288616bfdf1c3e22f))
- 💄 样式调整 ([2514bc3](https://github.com/meetqy/eagleuse/commit/2514bc3fd5d0d0886434846296a8769983556894))
- 💄 样式调整 ([6fca107](https://github.com/meetqy/eagleuse/commit/6fca10716482f2eb2078d203886d9f933e5876c2))

### Bug Fixes | Bug 修复

- 🐛 文件夹选中图片基础信息中无法显示标签信息 ([2874859](https://github.com/meetqy/eagleuse/commit/28748599f0e2f6119d8f27ab39f544ca99e959d6)), closes [#46](https://github.com/meetqy/eagleuse/issues/46)
- 🐛 image/list 查询 star bug ([4f40565](https://github.com/meetqy/eagleuse/commit/4f405653e44e655a93fa30ea0eaa700446b1018d))

## [0.1.0](https://github.com/meetqy/eagleuse/compare/v0.0.5...v0.1.0) (2023-01-12)

### ⚠ BREAKING CHANGES

- 🧨 list.ts env.d.ts

### Documentation | 文档

- ✏️ 调整注释 ([7db39bb](https://github.com/meetqy/eagleuse/commit/7db39bb3c8fb29bf99659afe4e65d083647bb89c))

### Code Refactoring | 代码重构

- 💡 搜索文字展示 ([b7fe0d2](https://github.com/meetqy/eagleuse/commit/b7fe0d2608112df69bf279ef39c7c434b4be8f1b))

### Features | 新功能

- 🎸 按格式搜索 ([413d3fd](https://github.com/meetqy/eagleuse/commit/413d3fdb959140b8ebedb4a01c538e20b0aa88c5)), closes [#12](https://github.com/meetqy/eagleuse/issues/12)
- 🎸 增加排序 升序/降序 ([352491c](https://github.com/meetqy/eagleuse/commit/352491cd4cb0ebabf4c903f01f4956cc2d939f24)), closes [#42](https://github.com/meetqy/eagleuse/issues/42)

### Styles | 风格

- 💄 basic 间距 ([234aa1d](https://github.com/meetqy/eagleuse/commit/234aa1d95fffef3ca661fd8050958719bd5f30af))

### Bug Fixes | Bug 修复

- 🐛 按评分搜索 ([30df89b](https://github.com/meetqy/eagleuse/commit/30df89be8b09790b69b6155d728193dfb5617ace)), closes [#8](https://github.com/meetqy/eagleuse/issues/8)
- 🐛 按注释搜索 ([93a42d0](https://github.com/meetqy/eagleuse/commit/93a42d02f7ef8705704f40151b43c89599dd28e1)), closes [#9](https://github.com/meetqy/eagleuse/issues/9)
- 🐛 打包报错 ([cfd1f5b](https://github.com/meetqy/eagleuse/commit/cfd1f5b53ca7cfa656e72a8ebfb8e486ef396f06))

### [0.0.5](https://github.com/meetqy/eagleuse/compare/v0.0.4...v0.0.5) (2023-01-10)

### Bug Fixes | Bug 修复

- 菜单-全部图片数量不应该包含回收站图片数量 close [#32](https://github.com/meetqy/eagleuse/issues/32) ([4127fb0](https://github.com/meetqy/eagleuse/commit/4127fb085a215c536bed69866514a7170034886e))

### Chore | 构建/工程依赖/工具

- 🤖 add git cz ([c57a49a](https://github.com/meetqy/eagleuse/commit/c57a49a96e23be8ed51d3710e47bacd0eb0c65e8))
- 🤖 standard-version config ([9fe52cf](https://github.com/meetqy/eagleuse/commit/9fe52cf7f3abd57c2d96a832ca3fba9ad1370c72))
- 初步测试 useInfiniteScroll ([1eeb83e](https://github.com/meetqy/eagleuse/commit/1eeb83e7906fc8126b86b5ec5ae78062fc78bec1))
- 基础菜单 ([7ac17d1](https://github.com/meetqy/eagleuse/commit/7ac17d182572a252f7b51805e811706214e02c14))
- 首页上拉加载 done ([9787262](https://github.com/meetqy/eagleuse/commit/978726210782c7f0c72d0387d01255dfb7825ef9))
- add commitlint ([6891f31](https://github.com/meetqy/eagleuse/commit/6891f31abe0b4a0e761b581325a52953a63451ba))
- add husky lint-staged ([1326df7](https://github.com/meetqy/eagleuse/commit/1326df7344f90e25717546b4c41086deb936d979))
- add prettier ([2648a55](https://github.com/meetqy/eagleuse/commit/2648a55ae833f76ea79fcf78ade16d05e0b3df1a))
