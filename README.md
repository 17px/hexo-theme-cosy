# v2.0版本目标

- hexo7.0版本适配
- 提高工程化程度，优化开发阶段体验
- 分离项目ui组件为web-component，ui组件库尽可能做出 linear-design的设计风格
- 进步减少构建体积


# 启动开发环境

安装依赖
```bash
pnpm i
```

新建一个终端，执行
```bash
pnpm dev
```

热更新hexo-test新建一个终端，执行
```bash
pnpm dev:hexo
```

热更新web-component，新建一个终端，执行
```bash
pnpm dev:ui
```

浏览器访问 `localhost:3000`

# 开发构建流程

## 更舒服的使用 litElement 开发 web-component

- 安装vscode插件


## web-component 发布订阅

使用 LitElement 作为开发的webComponent的库

所有 Cosy 的 web-component 继承了了 CosyElement 基类

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

因此，在任何 Cosy web component中，都可以使用发布自定义事件

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

globalEventBus.on("event", (event) => {
  console.log("Received：", event.detail);
  globalEventBus.emit("response", "payload");
});
```

由于底层基于 `CustomEvent`，因此在 CosyElment 基类中，注入了 `uid` 的属性，来解决 web-component 复用导致的唯一性问题，以 `cosy-drag-box`为例，主需要添加一个 `uid` 属性

```html
<cosy-drag-box uid="left-aside"><cosy-drag-box/>
```