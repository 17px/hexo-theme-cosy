# 2.0 的设计目标

- hexo7.0版本适配
- 工程化程度提高，进一步使用 pnpm monorepo 组织代码
- 优化项目体积，改用rollup打包分离部分页面复用代码
- UI `Linear design` 风格进步提高，使用 `web-components` 设计主题ui组件库，为了极致的体积

# Cosy

文档向、追求极致加载速度的hexo主题，js 大小为 `107.73 KB`,  `gzip` 压缩之后，仅 `33.41 KB`

[English](README.md)

## 预览

![黑暗模式](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-dark.png)

![日间模式](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-light.png)

![搜图](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-search.gif)

## 配置

关于主题使用或安装，有关更多配置信息，请参阅 "[Cosy 入门](https://mozzie.cn/2023/10/21/Cosy%20%E5%85%A5%E9%97%A8/)"。

## 特性

| 功能           | 可关闭 |
| -------------- | ------ |
| 主题切换       |        |
| prism语法高亮  |        |
| algolia搜索    |        |
| 和风天气widget | ✅      |
| katex公式      | ✅      |
| mermaid流程图  | ✅      |
| valine评论     | ✅      |


# DIY

使用 pnpm workspace 的进行项目管理，webpack5 打包构建，使用 typescript、less、ejs进行开发的一款Hexo

基本流程：

1. `webpack` 监听 `/dockyard/src` 目录下的指定文件改动
2. 每次文件变动会触发 `webpack` 重新构建
3. 构建资源会被拷贝到 `hexo-test/themes` 目录
4. `nodemon` 监听 `hexo-test`，重启 `nodemon`，使得 hexo 视图更新

## 安装开发依赖

1. 安装依赖

```bash
pnpm install
```

2. 配置主题名称

`ornn.json` 设置主题名称

3. 启动开发

```bash
# webpack multi-page build
pnpm dev
# hexo server
pnpm dev:hexo
```


## 创建一个新模块

在 `apps/dockyard/src/modules` 下创建模块名称的文件夹，以`yourModule`为例

```
├── ...
├── ...
├── yourModule
│   ├── index.ejs
│   ├── index.ts
└── └── index.less
```

1. index.ejs

`<!-- inject:css -->`:  webpack分离出的css注入标记点  

`<!-- inject:js -->`:  webpack分离出的js注入标记点

```ejs
<!-- inject:css -->

<div>your module content here</div>

<!-- inject:js -->
```

2. index.ts

```ts
import './index.less'

// your script here
```

3. index.less

```less
// your stylesheet here
```

当添加gi新的模块时，请重新运行下面的命令

```bash
# 重启启动webpack
pnpm dev
```

## 使用新模块

```ejs
<%- partial('yourModule') %>
<!-- or -->
<%- include('yourModule') %>
```

## 构建hexo主题

构建命令

```bash
pnpm build
```

构建完成后，完整的hexo主题资源被输出到 `dockyard/build` 目录下