# github 地址：
https://github.com/wuzitu/wmobile_webpack.git
# vant-demo
调用插件：
vue-router
vue-i18n
axios
js-cookie
postcss-to-viewport
qs
pinia
# 特性完成情况：

## Hard难度：

- [x] 跑通编译+打包方案
- [x] 适配NC，多语言编译目录
- [x] 封装Utils.request
- [ ] index跳转逻辑
- [x] 多语言切换逻辑
- [ ] sessionID判断会话有效性
- [ ] keepAlive
- [x] 引入pinia，研究多组件传值

## Normal难度：

- [x] UI选型：vant
- [ ] 适配移动端table组件( 建议改为卡片 )
- [x] 适配Utils函数，request请求
- [x] 适配移动端viewport，可能需要引入postCSS (已兼容vant)
- [x] vue3 setup语法

## easy难度：

- [x] 制定开发规范——暂时遵循默认lint规范，以及vant推荐规范。

[https://v3.cn.vuejs.org/style-guide/#%E8%A7%84%E5%88%99%E7%B1%BB%E5%88%AB](https://v3.cn.vuejs.org/style-guide/#%E8%A7%84%E5%88%99%E7%B1%BB%E5%88%AB)
[https://youzan.github.io/vant/#/zh-CN/style-guide](https://youzan.github.io/vant/#/zh-CN/style-guide)

- [x] 输出首页demo
## 后续规划

- [ ] 消除原版存在的jQuery语句（utils.base，utils.request）

# 文档，工具推荐
Volar：vscode代码高亮，替代vetur
[https://www.imooc.com/article/317810](https://www.imooc.com/article/317810)
prettier：vscode自动格式化（好用）
[https://blog.csdn.net/solidays_/article/details/116208462](https://blog.csdn.net/solidays_/article/details/116208462)
```javascript
{
    "semi": false,
    "singleQuote": false,
    "endOfLine": "auto",
    "htmlWhitespaceSensitivity": "ignore",
    "trailingComma": "none",
    "disableLanguages": ["vue"]
}
```
有赞UI：
[https://youzan.github.io/vant/#/zh-CN/col](https://youzan.github.io/vant/#/zh-CN/col)
vue-i18n:
[https://vue-i18n.intlify.dev/guide/](https://vue-i18n.intlify.dev/guide/)

重点学习内容：

1. 组件传值（props，事件广播，依赖注入）
1. setup语法，ref、reactive 熟练使用
# 常用命令

```javascript
git config --global http.proxy proxy.h3c.com:8080 
git config --global https.proxy proxy.h3c.com:8080
```

NPM设置代理：
```javascript
registry=https://registry.npm.taobao.org/
https-proxy=http://用户名:密码@proxy.h3c.com:8080/
strict-ssl=false
proxy=http://用户名:密码@proxy.h3c.com:8080/

```
密码配置“@和：”需要使用URL 转义工具：https://tool.chinaz.com/tools/urlencode.aspx
vscode设置代理：
![image.png](https://cdn.nlark.com/yuque/0/2022/png/655279/1648176992235-4f581b51-d2ff-4a35-87f6-d9464695afbd.png#clientId=u7811ec29-78aa-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=192&id=ue98893e3&margin=%5Bobject%20Object%5D&name=image.png&originHeight=192&originWidth=504&originalType=binary&ratio=1&rotation=0&showTitle=false&size=13432&status=done&style=none&taskId=u9afde274-e335-4159-a4dc-0269484384c&title=&width=504)
推荐安装yarn替代npm，更稳定
npm install -g yarn --registry=https://registry.npm.taobao.org

## 初始化安装node modules

```
yarn install
```

### 启动开发调试环境

```
yarn serve
```

### 编译现网版本，压缩代码

```
yarn build
```

### Lints and fixes files

```
yarn lint
```
