## convenient-ui

Vue2 组件库

### 使用说明

安装：

```bash
# npm
npm i convenient-ui
```

`main.js`：

```javascript
import convenientUI from 'convenient-ui';
import 'convenient-ui/dist/convenient-ui.css';
Vue.use(convenientUI);
```

使用：

```vue
<template>
  <div id="app">
    <c-button>按钮</c-button>
  </div>
</template>
```

### 开发说明

#### 图标

icon从 https://www.iconfont.cn/ 官网中获取。

创建项目，将待使用的icon加入到购物车，再从购物车中加入到项目，最后在项目中下载到本地。

#### 配置

`vue.config.js`配置：

```javascript
const path = require('path')
module.exports = {
  pages: {
    index: {
      entry: 'examples/main.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  // 扩展 webpack 配置，是 packages 加入编译
  chainWebpack: config => {
    config.module
      .rule('js')
      .include.add(path.resolve(__dirname, 'packages')).end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}
```

`package.json`配置：

```json
"name": "convenient-ui",
"version": "0.1.0", // 每次发布时，version 必须比上一次的高
"private": false, // 不能为 true
"main": "dist/convenient-ui.umd.min.js", // 指定调用的入口
"author": {
    "name": "rui" // 作者
},
"scripts": {
    "lib": "vue-cli-service build --target lib packages/index.js" // 入口
  },
```

在执行`npm run lib`后在生成`dist`文件夹中添加`.npmignore`文件，其内容为：

```
examples/
packages/
public/

vue.config.js
babel.config.js
*.map
```

修改`convenient-ui.css`文件，将其中的路径为`/img...`与`/fonts...`修改为``/img...``与`/fonts...`。

#### 发布

检查npm源是否为官方源，不能使用镜像源。

使用`npm login`登录账号。

执行`npm publish`发布。