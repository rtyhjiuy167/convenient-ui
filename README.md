## convenient-ui

Vue2 组件库

### 使用说明

##### 安装

```bash
# npm
npm i convenient-ui
```

##### 完整引入

```javascript
// main.js
import Vue from 'vue'
import App from './App.vue'

import 'convenient-ui/lib/index.css' // 所有组件样式
import convenientUI from 'convenient-ui' // 所有组件

Vue.config.productionTip = false
Vue.use(convenientUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

##### 按需引入

```javascript
// main.js 
import Vue from 'vue'
import App from './App.vue'

import 'convenient-ui/lib/Button/index.css' // 仅按钮组件样式
import CButton from 'convenient-ui/lib/Button/index.js' // 仅按钮组件

Vue.config.productionTip = false
Vue.use(CButton)

new Vue({
  render: h => h(App),
}).$mount('#app')
```

### 开发说明

#### 图标

icon从 https://www.iconfont.cn/ 官网中获取。

创建项目，将待使用的icon加入到购物车，再从购物车中加入到项目，最后在项目中下载到本地。

引入`iconfont.js`时，由于存在变量赋值给变量本身的语句，`h=h`，`eslint`会报错。

* 需要修改`iconfont.js`文件，`Ctrl+F`搜索`,h=h,`，修改为`,temp=h,h=temp,`，之后在其前面声明变量，即搜索`var c,h=document.createElement("div");`，修改为`var c,h=document.createElement("div");var temp;`
* 或添加`.eslintignore`文件，忽略`iconfont.js`代码检查。

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
}
```

`package.json`配置：

```json
"name": "convenient-ui",
"version": "0.1.0", // 每次发布时，version 必须比上一次的高
"private": false, // 不能为 true
"main": "lib/index.js", // 指定调用的入口
// 关键词
"keywords": [
    "convenient-ui",
    "vue",
    "ui"
],
"author": {
    "name": "rui" // 作者
},
"scripts": {
    "build": "webpack --config ./webpack.config.js"
},
```

#### 发布

检查npm源是否为官方源，不能使用镜像源。

使用`npm login`登录账号。

执行`npm publish`发布。