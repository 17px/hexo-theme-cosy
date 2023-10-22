# Cosy

Minimalist, pursuing the ultimate loading speed for a Hexo theme. JS size is `66.28 KB`, after `gzip` compression, it's only `20.78 KB`.

[中文文档](README_zh.md)

## Preview

![Dark Mode](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-dark.png)

![Light Mode](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-light.png)

![Search](https://raw.githubusercontent.com/17px/assets-storage/main/hexo-theme-linear-search.gif)

## Configuration

For more configuration details, please refer to the "[Cosy Starter Guide](https://mozzie.cn/2023/10/20/Cosy-Starter-Guide)"

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

```bash
pnpm install
```

2. Configure theme name:

Set theme name in `ornn.json`

3. Start development:

```bash
# webpack multi-page build
pnpm dev
# hexo server
pnpm dev:hexo
```


## Create a New Module

Create a folder with the module name under `apps/dockyard/src/modules`, take `yourModule` as an example:

```
├── ...
├── ...
├── yourModule
│   ├── index.ejs
│   ├── index.ts
└── └── index.less
```

1. index.ejs

`<!-- inject:css -->`:  Marker for injecting separated CSS by webpack.

`<!-- inject:js -->`:  Marker for injecting separated JS by webpack.

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

Don't forget to restart the following command:

```bash
# Restart webpack
pnpm dev
```

## Use the New Module

```ejs
<%- partial('yourModule') %>
<!-- or -->
<%- include('yourModule') %>
```

## Build Hexo Theme

Build command:

```bash
pnpm build
```

After building, the complete Hexo theme assets are output to the `dockyard/build` directory.