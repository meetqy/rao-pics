# 贡献指南

我们欢迎对 Rao.Pics 感兴趣的任何人士做出贡献。如果您有兴趣参与贡献，有几种方式可以参与：

- Bug 修复：如果您发现了任何 bug，请创建一个拉取请求，清晰描述问题并提供解决方案。快速通道 => [🐞 提交 Bug](https://github.com/meetqy/rao-pics/issues/new?assignees=&labels=Bug&projects=&template=bug_report.yml&title=bug%3A+)

- 改进：如果您对 Rao.Pics 有改进的建议，请先创建一个问题讨论为什么需要这个改进。快速通道 => [🛠 提需求](https://github.com/meetqy/rao-pics/issues/new?assignees=&labels=%E2%9C%A8+enhancement&projects=&template=feature_request.yml&title=feat%3A+)

## 构建

这些命令仅供维护人员使用。

**环境信息**

- nodejs >= `v18.17.1`
- pnpm >= `8.7.6`

**拉取代码**

```
git clone https://github.com/meetqy/rao-pics.git
```

**安装依赖**

使用 pnpm 安装 依赖

```
pnpm i
```

**运行**

`pnpm dev` 会同时运行三个项目分别为：`packages/db`、`themes/gallery`、`apps/electron`

```
pnpm dev
```
