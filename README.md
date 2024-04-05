# V2.0 version update content

- Developed based on `hexo7.0`, the configuration file for hexo is different from the `6.3` configuration file
- Improve the level of engineering and use the `monorepo` structure of the `pnpm workspace` to better layer the project
- Optimize the development phase experience, `webpack dev server` listens to the public directory of hexo, and implements `hot updates` during the development phase`
- Use `Web Component` to separate project UI components, with a `Linear Design` style
- Add `Preferences` to custom pages
- Add `Tags` to customize the page
- add `shortcut key` system
- Global theme colors are controlled by the `color` attribute in the theme configuration file

# Cosy

The hexo theme of document oriented and pursuing ultimate loading speed, with a JS size of `gzip` compressed, only `52.2 KB`

[中文文档](README_zh.md)

For more configuration information on theme usage or installation, please refer to the "[Cosy Starter Guide](https://maxshader.com/posts/59577/)"

# Preview

![Dark Mode](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-dark.png)

![Light Mode](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-light.png)

## Features

| Feature                          | Disable Option |
| -------------------------------- | -------------- |
| Theme Switching                  |                |
| Prism Syntax Highlighting        |                |
| Algolia Search                   |                |
| Global Theme Color Configuration |                |
| HeFeng Weather Widget            | ✅              |
| Katex Formulae                   | ✅              |
| Mermaid Flowcharts               | ✅              |
| Valine Comments                  | ✅              |
| Twikoo Comments                  | ✅              |

# DIY 主题

Installation dependencies

```bash
pnpm install
```

Create a new terminal and execute

```bash
# If the @ cosy/util module is updated, remember to perform packaging
pnpm build:util
# webpack
pnpm dev
# Hot update hexo test. If the UI style is incorrect, execute the command again and refresh the browser
pnpm dev:hexo
# ui package
pnpm dev:ui
```

Browser open `localhost:12004`

## litElement & web-component

All Cosy Web Components inherit the `CosyElement` base class

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

Therefore, in any web component that inherits from `CosyElement`, publishing custom events can be used

```ts
this.eventBus.emit(eventType, payload);
```

And listening to custom events

```ts
this.eventBus.on(eventType,callback);
```

And for external communication needs

```ts
import { globalEventBus } from "@cosy/util";

globalEventBus.on("eventType", (event) => {
  console.log("Received：", event.detail);
  globalEventBus.emit("response", "payload");
});
```

Due to the underlying foundation being based on `CustomEvent`, a `uid` attribute has been injected into the CosyElement base class to address the uniqueness issue caused by web component reuse. Taking `cosy-drag-box` as an example, it is necessary to add a 'uid' attribute

```html
<cosy-drag-box uid="left-aside"><cosy-drag-box/>
```

## Create a new module

Create a folder with module names under `apps/theme cost/src/modules`, using `your Module` as an example

```bash
├── ...
├── ...
├── yourModule
│   ├── index.ejs
│   ├── index.ts
└── └── index.less
```

1. index.ejs

`<!-- inject:css -->`:  CSS injection marker points separated from webpack

`<!-- inject:js -->`:  JS injection marker points separated from webpack

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

When adding a new module, please rerun the following command

```bash
# 重启启动webpack
pnpm dev
```

## Using new modules

```ejs
<%- partial('yourModule') %>
<!-- or -->
<%- include('yourModule') %>
```

## Building hexo themes

Build Command

```bash
pnpm build
```

After the construction is completed, the complete hexo theme resources are output to the `theme-cosy/build` directory
