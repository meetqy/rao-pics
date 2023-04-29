# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# 1.7.0 (2023-04-29)

### Bug Fixes

- 🐛 【Core】EagleApp 中导入图片，并勾选使用已存在的图片，NSFW 检测结果会被覆盖 ([d46010f](https://github.com/rao-pics/core/commit/d46010f3ff20101c108166dabf263bd89fe8933c)), closes [#90](https://github.com/rao-pics/core/issues/90)
- 🐛 Compatibility sqlite DB ([0ddee2c](https://github.com/rao-pics/core/commit/0ddee2c67feda522d7d13b4b1c68c354f8a9515e))
- 🐛 eagle 删除标签，sqlite 未更新 ([e8acaf7](https://github.com/rao-pics/core/commit/e8acaf709c3360aab738298cac715b614c16b679)), closes [#138](https://github.com/rao-pics/core/issues/138)
- 🐛 folder 删除无效 ([95133d3](https://github.com/rao-pics/core/commit/95133d3d2d5a283d4966c926abcc5e32a170ff1d))
- 🐛 nsfw 支持格式 ([47eeeba](https://github.com/rao-pics/core/commit/47eeeba5f6fc16474cb055d8139787d249863a30))
- 🐛 nsfw 检测和时间判断更新冲突 ([5ccc2a3](https://github.com/rao-pics/core/commit/5ccc2a3b161a3e81475c1818c3ed3758d4c2f760))
- 🐛 remove mjs ([a86770a](https://github.com/rao-pics/core/commit/a86770a9403645710b89c770e6211978fccae351))
- 🐛 starredTags ([ad9dc83](https://github.com/rao-pics/core/commit/ad9dc83a1ab0d7608606bdcc8bc3cbb117e0d855))
- 🐛 tagsGroups ([6e74e09](https://github.com/rao-pics/core/commit/6e74e0974d324155007bfa851c05a40957802763))
- 🐛 导入显示 bug ([538459c](https://github.com/rao-pics/core/commit/538459c96b2eebca19c54c37723b47e94bf5d853))
- 🐛 艹,支持 docker 之后的每一次更新都没加上 ([d0ac538](https://github.com/rao-pics/core/commit/d0ac538e609a17597e216749ee1fa725c3257ec5))

### Features

- 🎸 support mp4 gif ([aa65076](https://github.com/rao-pics/core/commit/aa65076d66eb46c605b5d95a0ab729b790793f32))
- 🎸 支持 @eagleuse/plugin-nsfw ([40c8b0f](https://github.com/rao-pics/core/commit/40c8b0fba49c5a79b28b4da2a22265bdef3514cb))

### Performance Improvements

- ⚡️ docker 中永久删除素材 CPU,内存飙升 ([16b0d77](https://github.com/rao-pics/core/commit/16b0d77e4c573eaa74142256a841fcd9c1fc09b0)), closes [#131](https://github.com/rao-pics/core/issues/131)
- ⚡️ image 更新直接通过到 sqlite 中,不再通过对比时间校验 ([9e80750](https://github.com/rao-pics/core/commit/9e80750268e7efa10f5d7646931baa8a3fff9175))
- ⚡️ library prisma ([53dcc54](https://github.com/rao-pics/core/commit/53dcc54bd1490010f543de034a2e9528ecffe471))
- ⚡️ transform 优化图片加载时机 ([ec26dfe](https://github.com/rao-pics/core/commit/ec26dfe0ee18aea333a6c894c0b742ac3f829cad))
- ⚡️ 更新一定次数为了触发 db 文件能被监听到的一些逻辑代码 ([bd7d598](https://github.com/rao-pics/core/commit/bd7d598c85adf9422e686ce637f4132d3e802536)), closes [#144](https://github.com/rao-pics/core/issues/144)
- ⚡️ 添加素材速度优化 ([1f1af59](https://github.com/rao-pics/core/commit/1f1af597834e4eb2156827b314feec5066bc9f5e))

## 0.0.1 (2023-02-20)

# 1.6.0 (2023-04-28)

### Bug Fixes

- 🐛 【Core】EagleApp 中导入图片，并勾选使用已存在的图片，NSFW 检测结果会被覆盖 ([d46010f](https://github.com/rao-pics/core/commit/d46010f3ff20101c108166dabf263bd89fe8933c)), closes [#90](https://github.com/rao-pics/core/issues/90)
- 🐛 Compatibility sqlite DB ([0ddee2c](https://github.com/rao-pics/core/commit/0ddee2c67feda522d7d13b4b1c68c354f8a9515e))
- 🐛 eagle 删除标签，sqlite 未更新 ([e8acaf7](https://github.com/rao-pics/core/commit/e8acaf709c3360aab738298cac715b614c16b679)), closes [#138](https://github.com/rao-pics/core/issues/138)
- 🐛 folder 删除无效 ([95133d3](https://github.com/rao-pics/core/commit/95133d3d2d5a283d4966c926abcc5e32a170ff1d))
- 🐛 nsfw 支持格式 ([47eeeba](https://github.com/rao-pics/core/commit/47eeeba5f6fc16474cb055d8139787d249863a30))
- 🐛 nsfw 检测和时间判断更新冲突 ([5ccc2a3](https://github.com/rao-pics/core/commit/5ccc2a3b161a3e81475c1818c3ed3758d4c2f760))
- 🐛 remove mjs ([a86770a](https://github.com/rao-pics/core/commit/a86770a9403645710b89c770e6211978fccae351))
- 🐛 starredTags ([ad9dc83](https://github.com/rao-pics/core/commit/ad9dc83a1ab0d7608606bdcc8bc3cbb117e0d855))
- 🐛 tagsGroups ([6e74e09](https://github.com/rao-pics/core/commit/6e74e0974d324155007bfa851c05a40957802763))
- 🐛 导入显示 bug ([538459c](https://github.com/rao-pics/core/commit/538459c96b2eebca19c54c37723b47e94bf5d853))

### Features

- 🎸 support mp4 gif ([aa65076](https://github.com/rao-pics/core/commit/aa65076d66eb46c605b5d95a0ab729b790793f32))
- 🎸 支持 @eagleuse/plugin-nsfw ([40c8b0f](https://github.com/rao-pics/core/commit/40c8b0fba49c5a79b28b4da2a22265bdef3514cb))

### Performance Improvements

- ⚡️ docker 中永久删除素材 CPU,内存飙升 ([16b0d77](https://github.com/rao-pics/core/commit/16b0d77e4c573eaa74142256a841fcd9c1fc09b0)), closes [#131](https://github.com/rao-pics/core/issues/131)
- ⚡️ image 更新直接通过到 sqlite 中,不再通过对比时间校验 ([9e80750](https://github.com/rao-pics/core/commit/9e80750268e7efa10f5d7646931baa8a3fff9175))
- ⚡️ library prisma ([53dcc54](https://github.com/rao-pics/core/commit/53dcc54bd1490010f543de034a2e9528ecffe471))
- ⚡️ transform 优化图片加载时机 ([ec26dfe](https://github.com/rao-pics/core/commit/ec26dfe0ee18aea333a6c894c0b742ac3f829cad))
- ⚡️ 更新一定次数为了触发 db 文件能被监听到的一些逻辑代码 ([bd7d598](https://github.com/rao-pics/core/commit/bd7d598c85adf9422e686ce637f4132d3e802536)), closes [#144](https://github.com/rao-pics/core/issues/144)
- ⚡️ 添加素材速度优化 ([1f1af59](https://github.com/rao-pics/core/commit/1f1af597834e4eb2156827b314feec5066bc9f5e))

## 0.0.1 (2023-02-20)

# 1.5.0 (2023-04-27)

### Bug Fixes

- 🐛 【Core】EagleApp 中导入图片，并勾选使用已存在的图片，NSFW 检测结果会被覆盖 ([d46010f](https://github.com/rao-pics/core/commit/d46010f3ff20101c108166dabf263bd89fe8933c)), closes [#90](https://github.com/rao-pics/core/issues/90)
- 🐛 Compatibility sqlite DB ([0ddee2c](https://github.com/rao-pics/core/commit/0ddee2c67feda522d7d13b4b1c68c354f8a9515e))
- 🐛 eagle 删除标签，sqlite 未更新 ([e8acaf7](https://github.com/rao-pics/core/commit/e8acaf709c3360aab738298cac715b614c16b679)), closes [#138](https://github.com/rao-pics/core/issues/138)
- 🐛 folder 删除无效 ([95133d3](https://github.com/rao-pics/core/commit/95133d3d2d5a283d4966c926abcc5e32a170ff1d))
- 🐛 nsfw 支持格式 ([47eeeba](https://github.com/rao-pics/core/commit/47eeeba5f6fc16474cb055d8139787d249863a30))
- 🐛 nsfw 检测和时间判断更新冲突 ([5ccc2a3](https://github.com/rao-pics/core/commit/5ccc2a3b161a3e81475c1818c3ed3758d4c2f760))
- 🐛 remove mjs ([a86770a](https://github.com/rao-pics/core/commit/a86770a9403645710b89c770e6211978fccae351))
- 🐛 starredTags ([ad9dc83](https://github.com/rao-pics/core/commit/ad9dc83a1ab0d7608606bdcc8bc3cbb117e0d855))
- 🐛 tagsGroups ([6e74e09](https://github.com/rao-pics/core/commit/6e74e0974d324155007bfa851c05a40957802763))
- 🐛 导入显示 bug ([538459c](https://github.com/rao-pics/core/commit/538459c96b2eebca19c54c37723b47e94bf5d853))

### Features

- 🎸 support mp4 gif ([aa65076](https://github.com/rao-pics/core/commit/aa65076d66eb46c605b5d95a0ab729b790793f32))
- 🎸 支持 @eagleuse/plugin-nsfw ([40c8b0f](https://github.com/rao-pics/core/commit/40c8b0fba49c5a79b28b4da2a22265bdef3514cb))

### Performance Improvements

- ⚡️ docker 中永久删除素材 CPU,内存飙升 ([16b0d77](https://github.com/rao-pics/core/commit/16b0d77e4c573eaa74142256a841fcd9c1fc09b0)), closes [#131](https://github.com/rao-pics/core/issues/131)
- ⚡️ image 更新直接通过到 sqlite 中,不再通过对比时间校验 ([9e80750](https://github.com/rao-pics/core/commit/9e80750268e7efa10f5d7646931baa8a3fff9175))
- ⚡️ library prisma ([53dcc54](https://github.com/rao-pics/core/commit/53dcc54bd1490010f543de034a2e9528ecffe471))
- ⚡️ transform 优化图片加载时机 ([ec26dfe](https://github.com/rao-pics/core/commit/ec26dfe0ee18aea333a6c894c0b742ac3f829cad))
- ⚡️ 添加素材速度优化 ([1f1af59](https://github.com/rao-pics/core/commit/1f1af597834e4eb2156827b314feec5066bc9f5e))

## 0.0.1 (2023-02-20)

# [1.4.0](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.11...@raopics/transform-eagle@1.4.0) (2023-04-11)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.12](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.11...@raopics/transform-eagle@1.3.12) (2023-04-08)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.11](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.10...@raopics/transform-eagle@1.3.11) (2023-04-04)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.10](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.9...@raopics/transform-eagle@1.3.10) (2023-04-04)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.9](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.7...@raopics/transform-eagle@1.3.9) (2023-04-02)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.8](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.7...@raopics/transform-eagle@1.3.8) (2023-04-02)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.7](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.6...@raopics/transform-eagle@1.3.7) (2023-03-29)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.6](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.5...@raopics/transform-eagle@1.3.6) (2023-03-27)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.5](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.4...@raopics/transform-eagle@1.3.5) (2023-03-24)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.4](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.3...@raopics/transform-eagle@1.3.4) (2023-03-24)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.3](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.2...@raopics/transform-eagle@1.3.3) (2023-03-24)

### Bug Fixes

- 🐛 【Core】EagleApp 中导入图片，并勾选使用已存在的图片，NSFW 检测结果会被覆盖 ([d46010f](https://github.com/rao-pics/core/commit/d46010f3ff20101c108166dabf263bd89fe8933c)), closes [#90](https://github.com/rao-pics/core/issues/90)

## [1.3.2](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.1...@raopics/transform-eagle@1.3.2) (2023-03-20)

**Note:** Version bump only for package @raopics/transform-eagle

## [1.3.1](https://github.com/rao-pics/core/compare/@raopics/transform-eagle@1.3.0...@raopics/transform-eagle@1.3.1) (2023-03-20)

**Note:** Version bump only for package @raopics/transform-eagle

# 1.3.0 (2023-03-19)

### Bug Fixes

- 🐛 Compatibility sqlite DB ([0ddee2c](https://github.com/rao-pics/core/commit/0ddee2c67feda522d7d13b4b1c68c354f8a9515e))
- 🐛 folder 删除无效 ([95133d3](https://github.com/rao-pics/core/commit/95133d3d2d5a283d4966c926abcc5e32a170ff1d))
- 🐛 nsfw 支持格式 ([47eeeba](https://github.com/rao-pics/core/commit/47eeeba5f6fc16474cb055d8139787d249863a30))
- 🐛 nsfw 检测和时间判断更新冲突 ([5ccc2a3](https://github.com/rao-pics/core/commit/5ccc2a3b161a3e81475c1818c3ed3758d4c2f760))
- 🐛 remove mjs ([a86770a](https://github.com/rao-pics/core/commit/a86770a9403645710b89c770e6211978fccae351))
- 🐛 starredTags ([ad9dc83](https://github.com/rao-pics/core/commit/ad9dc83a1ab0d7608606bdcc8bc3cbb117e0d855))
- 🐛 tagsGroups ([6e74e09](https://github.com/rao-pics/core/commit/6e74e0974d324155007bfa851c05a40957802763))
- 🐛 导入显示 bug ([538459c](https://github.com/rao-pics/core/commit/538459c96b2eebca19c54c37723b47e94bf5d853))

### Features

- 🎸 support mp4 gif ([aa65076](https://github.com/rao-pics/core/commit/aa65076d66eb46c605b5d95a0ab729b790793f32))
- 🎸 支持 @eagleuse/plugin-nsfw ([40c8b0f](https://github.com/rao-pics/core/commit/40c8b0fba49c5a79b28b4da2a22265bdef3514cb))

### Performance Improvements

- ⚡️ library prisma ([53dcc54](https://github.com/rao-pics/core/commit/53dcc54bd1490010f543de034a2e9528ecffe471))

## 1.0.4 (2023-02-22)

## 1.0.3 (2023-02-22)

## 1.0.2 (2023-02-22)

## 1.0.1 (2023-02-21)

## 0.0.1 (2023-02-20)
