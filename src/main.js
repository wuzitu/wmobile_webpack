import { createApp } from "vue"
import {
  Button,
  Col,
  Row,
  Cell,
  CellGroup,
  Popup,
  Icon,
  NavBar,
  Sticky
} from "vant"

import App from "./App.vue"
import axios from "axios" // ajax
import "vant/lib/index.css" // 全局引入样式
import "./frame/css/common.css" // 全局引入样式
import router from "./router" //
import i18n from "./frame/i18n/i18n"
// 封装全局大web-request
import $req from "./frame/utils/request"

const app = createApp(App).use(router).use(i18n) // 创建实例
app.use(Button)
app.use(Col)
app.use(Row)
app.use(Cell)
app.use(CellGroup)
app.use(Popup)
app.use(Icon)
app.use(NavBar)
app.use(Sticky)
/* 定义全局变量 */
app.config.globalProperties.$axios = axios
app.config.globalProperties.$req = $req
window.$req = $req //方便调用ajax
/* 定义全局变量结束 */

app.mount("#app")
