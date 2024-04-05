# v2.0 版本更新内容

- 基于 `hexo7.0` 开发，hexo的配置文件和 `6.3` 配置文件不同
- 提高工程化程度，改用 `pnpm workspace` 的 `monorepo` 结构对项目进行更好的分层
- 优化开发阶段体验，`webpack-dev-server`监听 hexo 的 public 目录，开发阶段实现`热更新`
- 使用 `web-component` 分离项目 ui 组件 ，linear-design 设计风格
- 增加 `偏好` 自定义页面
- 增加 `标签` 自定义页面
- `快捷键` 体系引入
- 全局主题色在主题配置文件`color`属性控制

# Cosy

文档向、追求极致加载速度的hexo主题，js 大小为 `gzip` 压缩之后，仅 `52.2 KB`

[English](README.md)

关于主题使用或安装，有关更多配置信息，请参阅 "[Cosy 入门](https://maxshader.com/posts/59577/)"。

## 预览

![黑暗模式](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-dark.png)

![日间模式](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-light.png)

## 特性

| 功能           | 可关闭 |
| -------------- | ------ |
| 主题切换       |        |
| prism语法高亮  |        |
| algolia搜索    |        |
| 全局主题色配置 |        |
| 和风天气widget | ✅      |
| katex公式      | ✅      |
| mermaid流程图  | ✅      |
| valine评论     | ✅      |
| Twikoo评论     | ✅      |

# DIY 主题

安装依赖

```bash
pnpm install
```

新建终端，执行

```bash
# 如果更新了@cosy/util模块，记得执行打包
pnpm build:util
# webpack
pnpm dev
# 热更新hexo-test，如果ui样式错误，杀掉命令，再次执行+刷新浏览器
pnpm dev:hexo
# 热更新web-component
pnpm dev:ui
```

浏览器访问 `localhost:12004`

## litElement & web-component

所有 Cosy 的 Web Component 继承了了 `CosyElement` 基类

```ts
import { LitElement } from "lit";
import { globalEventBus, EventBus } from "@cosy/util";

export class CosyElement extends LitElement {
  eventBus: EventBus;
  constructor() {
    super();
    this.eventBus = globalEventBus;
  }
}
```

因此，在任何继承了 `CosyElement` 的 web-component 中，都可以使用发布自定义事件

```ts
this.eventBus.emit(eventType, payload);
```

以及监听自定义事件

```ts
this.eventBus.on(eventType,callback);
```

而对于外部需要通信

```ts
import { globalEventBus } from "@cosy/util";

globalEventBus.on("eventType", (event) => {
  console.log("Received：", event.detail);
  globalEventBus.emit("response", "payload");
});
```

由于底层基于 `CustomEvent`，因此在 CosyElment 基类中，注入了 `uid` 的属性，来解决 web-component 复用导致的唯一性问题，以 `cosy-drag-box`为例，主需要添加一个 `uid` 属性

```html
<cosy-drag-box uid="left-aside"><cosy-drag-box/>
```

## 创建一个新模块

在 `apps/theme-cosy/src/modules` 下创建模块名称的文件夹，以`yourModule`为例

```bash
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

当添加新的模块时，请重新运行下面的命令

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

构建完成后，完整的hexo主题资源被输出到 `theme-cosy/build` 目录下
