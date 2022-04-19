|-- undefined
    |-- .env.development
    |-- .eslintignore
    |-- .eslintrc.json
    |-- .gitignore
    |-- .prettierrc
    |-- babel.config.js
    |-- directoryList.md
    |-- package.json
    |-- README.md
    |-- vue.config.js
    |-- yarn.lock
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |   |-- nc.js
    |-- src
        |-- App.vue ——vue入口
        |-- main.js ——vue入口
        |-- components ——vue组件目录
        |   |-- AppTop.vue
        |   |-- DevList.vue
        |   |-- SideMenu.vue
        |   |-- SvgIcon.vue
        |-- frame ——公用文件，资源等
        |   |-- assets ——静态资源，如图片
        |   |   |-- css ——懂得都懂
        |   |   |   |-- common.css
        |   |   |-- fonts
        |   |   |-- icon
        |   |   |   |-- index.js
        |   |   |-- img
        |   |   |-- less
        |   |-- constants ——常量定义
        |   |-- directive ——自定义指令
        |   |-- libs ——CDN开源库，暂时没啥用
        |   |-- plugins ——插件，暂时没啥用
        |   |-- utils ——公共函数等
        |       |-- Base.js
        |       |-- Frame.js
        |       |-- http.js
        |       |-- MyConfig.js
        |       |-- request.js
        |       |-- tmpJSON.js
        |-- i18n ——多语言
        |   |-- i18n.js
        |   |-- locales ——目前：所有的文字，都放在这一个里面！方便维护翻译
        |       |-- cn.json
        |       |-- en.json
        |-- pages ——页面主战场
        |   |-- AP
        |   |   |-- ApChart.vue
        |   |   |-- Index.vue
        |   |-- Dashboard ——首页
        |   |   |-- Index.vue
        |   |   |-- TopoChart.vue
        |   |-- DevInfo 
        |   |   |-- Index.vue
        |   |-- LAN
        |       |-- Index.vue
        |-- router ——前端路由，定义了所有页面的访问路径。后续页面多了再考虑拆分。
        |   |-- index.js
        |-- store ——pinia使用。新概念：共享存储，相当于全局变量。
            |-- deviceStore.js
            |-- index.js
            |-- storeDemo.js
