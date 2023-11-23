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
