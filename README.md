# v2.0 版本更新内容

- 基于 `hexo7.0` 开发，hexo的配置文件和 `6.3` 配置文件不同
- 提高工程化程度，优化开发阶段体验，`webpack-dev-server`监听 hexo 的 public 目录，开发阶段实现`热更新`
- 使用 `web-component` 分离项目 ui 组件 ，linear-design 设计风格
- 增加 `偏好` 自定义页面
- 增加 `标签` 自定义页面
- `快捷键` 引入

# 启动开发环境

使用 `webpack-dev-server` 监听、转发 hexo 的 public 目录，实现开发阶段热更新

![Dark Mode](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-dark.png)

![Light Mode](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-light.png)

![Search](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-search.gif)

## Configuration

For more configuration information on theme usage or installation, please refer to the "[Cosy Starter Guide](https://mozzie.cn/2023/11/17/clpaes9390003zdvadsjub0k3/)"

## Features

| Feature                   | Disable Option |
| ------------------------- | -------------- |
| Theme Switching           |                |
| Prism Syntax Highlighting |                |
| Algolia Search            |                |
| HeFeng Weather Widget     | ✅              |
| Katex Formulae            | ✅              |
| Mermaid Flowcharts        | ✅              |
| Valine Comments           | ✅              |


# DIY

A Hexo theme managed by pnpm workspace, built with webpack5, and developed using typescript, less, and ejs.

Basic Workflow:

1. `webpack` listens for changes to specified files in the `/dockyard/src` directory.
2. Each file modification triggers `webpack` to rebuild.
3. Built assets are copied to the `hexo-test/themes` directory.
4. `nodemon` monitors `hexo-test`, restarting `nodemon` to update the Hexo view.

## Install Development Dependencies

1. Install dependencies:
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

浏览器访问 `localhost:12004`

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

# 自定义页面

全部添加了主题名称前缀，一定程度上防止了和其他主题自定义页面产生冲突

## 偏好设置页面

```bash
hexo new page cosy-preference
```

配置

```markdown
---
title: cosy-preference
layout: cosy-preference
---
```


## 简历页面

```bash
hexo new page cosy-resume
```

配置

```markdown
---
title: resume
layout: cosy-resume

name: Hi, I'm Mozzie
avatar: /img/avatar.png
email: himozzie@gmail.com
phone: +86 180-xxxx-xxx
birth: Jan 21, 1994
location: Nanjing, China

social:
  - name: github
    link: https://github.com/17px
    icon: <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>

about:
  - 我的工作是为您建立网站，使其功能完善、用户友好，同时又具有吸引力。
  - 此外，我还会为您的产品添加个人风格，确保其醒目易用。我的目标是以最具创意的方式传达您的信息和身份。

skill:
  - 熟悉 Node，具备后端开发能力，拥有 SpringBoot、Egg、Koa2 和 Midway 等单个应用程序项目的经验，以及 Nestjs 微服务应用程序项目的经验
  - 拥有 Monorepo 工程方面的经验，具备将单一单元的前端和后端分离并应用 DevOps 的能力
  - 熟悉 three.js，熟悉 Vtk.js，具有医疗 3D 前端和图形相关领域的开发经验
  - 掌握基本的 Linux 命令，了解 Nginx 和 Docker 的基本用法

education:
  - school: University School of the Arts
    time: 2012-2016

workExp:
  - inc: Creative Director
    time: 2021.09 ~ 至今
  - inc: Web Designer
    time: 2021.01 ~ 2021.09

projectExp:
  - name: PC/React • Annotation, Algorithm Data Center
    desc: This is a xxx system. It mainly includes a b c function. I am mainly responsible for the development and maintenance of the x, y, and z modules.
    list:
      - Using pnpm workspace to manage multiple code repositories in Monorepo, supporting the coexistence of multiple frameworks, and sharing common component libraries and capabilities
      - Use Rollup to package some functional capabilities (such as a b) on your own, which can be used for both browsers and node.js to achieve code isomorphism
      - Develop the system server using Nest.js and use it for the microservice system of the project

  - name: PC/React • Tavigator Aortic Root/Peripheral
    desc: This is a xxx system. It mainly includes a b c function. I am mainly responsible for the development and maintenance of the x, y, and z modules.
    list:
      - Using pnpm workspace to manage multiple code repositories in Monorepo, supporting the coexistence of multiple frameworks, and sharing common component libraries and capabilities
      - Use Rollup to package some functional capabilities (such as a b) on your own, which can be used for both browsers and node.js to achieve code isomorphism
      - Develop the system server using Nest.js and use it for the microservice system of the project

portfolio:
  - name: Web Page
    desc: A responsive modern website built using React
    iconSVG: <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M29.976 15.783l-2-9a1 1 0 0 0-.421-.615l-6-4A1 1 0 0 0 21 2H11a1 1 0 0 0-.555.168l-6 4a1 1 0 0 0-.421.615l-2 9a1.002 1.002 0 0 0 .018.504l3 10a1 1 0 0 0 .67.671l10 3h.006a.979.979 0 0 0 .564 0h.005l10-3a1 1 0 0 0 .671-.67l3-10a1.002 1.002 0 0 0 .018-.505zm-19.05.833l-3.91-7.819l7.282 2.648zM16 12.497L19.589 18H12.41zM19.382 20L16 26.764L12.618 20zm-1.68-8.555l7.281-2.648l-3.91 7.82zm.488-2.305l3.096-4.747l3.515 2.343zM16 8.836L12.846 4h6.308zm-2.19.304L7.2 6.736l3.514-2.343zm-4.844 8.03l-4.802-1.801l1.201-5.402zm5.104 10.207l-6.502-1.95l3.128-4.798zm7.233-6.748l3.129 4.797l-6.502 1.951zm5.332-10.662l1.2 5.402l-4.802 1.8zM4.537 17.645l4.595 1.722l-2.793 4.283zm21.124 6.005l-2.793-4.283l4.595-1.722z" fill="currentColor"></path></svg>
    link: https://www.google.com
  - name: Web Page
    desc: A responsive modern website built using React
    iconSVG: <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M30.415 16.513l-7.927-7.927a2.001 2.001 0 0 0-2.83 0L5.622 22.624a2.002 2.002 0 0 0 0 2.83L10.166 30h9.591l10.658-10.659a2.001 2.001 0 0 0 0-2.828zM18.929 28h-7.934l-3.96-3.962l6.312-6.312l7.928 7.928zm3.76-3.76l-7.928-7.928L21.074 10l7.927 7.927z" fill="currentColor"></path><path d="M11 12H8V2h3a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3zm-1-2h1a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-1z" fill="currentColor"></path><path d="M4 2H0v2h4v2H1v2h3v2H0v2h4a2.003 2.003 0 0 0 2-2V4a2.002 2.002 0 0 0-2-2z" fill="currentColor"></path></svg>
    link: https://www.google.com
  - name: Web Page
    desc: A responsive modern website built using React
    iconSVG: <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M16 30a14 14 0 1 1 14-14a14.016 14.016 0 0 1-14 14zm0-26a12 12 0 1 0 12 12A12.014 12.014 0 0 0 16 4z" fill="currentColor"></path><path d="M15 7h2v7h-2z" fill="currentColor"></path><path d="M7 15h7v2H7z" fill="currentColor"></path><path d="M15 18h2v7h-2z" fill="currentColor"></path><path d="M18 15h7v2h-7z" fill="currentColor"></path></svg>
    link: https://www.google.com
  - name: Web Page
    desc: A responsive modern website built using React
    iconSVG: <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32"><path d="M9.5 8h10.6a5 5 0 1 0 0-2H9.5a5.5 5.5 0 0 0 0 11h11a3.5 3.5 0 0 1 0 7h-8.6a5 5 0 1 0 0 2h8.6a5.5 5.5 0 0 0 0-11h-11a3.5 3.5 0 0 1 0-7zM25 4a3 3 0 1 1-3 3a3 3 0 0 1 3-3zM7 28a3 3 0 1 1 3-3a3 3 0 0 1-3 3z" fill="currentColor"></path></svg>
    link: https://www.google.com
    
---
```

## roadmap 页面

```bash
hexo new page cosy-roadmap
```

配置

```markdown
---
title: roadmap 地图
layout: cosy-roadmap
initYear: 2023
years:
  2022:
    - title: 读书
      start: 01-01
      end: 1-5
    - title: 还是读书
      start: 02-01
      end: 05-30
  2023:
    - title: 为什么第一次点击不生效，当我在第一个dom的对象上添加一个click监听，new Popover时，似乎和这行代码有关系
      start: 01-01
      end: 1-2
    - title: 还是读书222
      start: 02-01
      end: 06-30
    - title: 大江之水滚滚不断向东流去
      start: 10-26
      end: 10-31
    - title: 慨当以慷忧思难忘何以解忧唯有杜康
      start: 11-01
      end: 11-31
      content: 淘尽了那些千古风流的人物。千古英雄人物。那旧营垒的西边，人们说是，三国周瑜破曹军的赤壁。陡峭的石壁直耸云天，如雷的惊涛拍击着江岸，激起的浪花好似卷起千万堆白雪。雄壮的江山奇丽如图画，一时间涌现出多少英雄豪杰。遥想当年的周瑜春风得意，绝代佳人小乔刚嫁给他，他英姿奋发豪气满怀。手摇羽扇头戴纶巾，从容潇洒地在说笑闲谈之间，就把强敌的战船烧得灰飞烟灭。我今日神游当年的战地，可笑我多情善感，过早地生出满头白发。人生犹如一场梦，举起酒杯奠祭这万古的明月。
    - title: hexo-theme-cosy v2版本
      start: 12-01
      end: 12-31
    - title: v2.1.0 版本
      start: 12-11
      end: 12-31
---
```