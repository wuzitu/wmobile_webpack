import {
    createApp
} from "vue"
import {
    Button,
    Col,
    Row,
    Cell,
    CellGroup,
    Popup,
    Icon,
    NavBar,
    Sticky,
    Collapse,
    CollapseItem,
    List,
    Tab,
    Tabs,
    Popover,
    Search,
    ConfigProvider,
    DatetimePicker
} from "vant"
import App from "./App.vue"
import axios from "axios" // ajax
import {
    createPinia
} from "pinia" // 全局引入pinia管理数据状态
import {
    registerStore
} from "@/store/index.js"
import "vant/lib/index.css" // 全局引入样式
import "@/frame/assets/css/common.css" // 全局引入样式
import router from "./router" //
import i18n from "@/i18n/i18n"
// 封装全局大web-request
import $req from "@/frame/utils/request"
//封装icon
import registerSvgIcon from "@/frame/assets/icon/index.js" // icon

const app = createApp(App).use(router).use(i18n) // 创建实例
app.use(createPinia())
registerStore()
app.use(Button)
app.use(Col)
app.use(Row)
app.use(Cell)
app.use(CellGroup)
app.use(Popup)
app.use(Icon)
app.use(NavBar)
app.use(Sticky)
app.use(Collapse)
app.use(CollapseItem)
app.use(List)
app.use(Tab)
app.use(Tabs)
app.use(Popover)
app.use(Search)
app.use(ConfigProvider)
app.use(DatetimePicker)
/* 定义全局变量 */
app.config.globalProperties.$axios = axios
app.config.globalProperties.$req = $req
// window.$req = $req //方便调用ajax
/* 定义全局变量结束 */

// 注册icon组件
registerSvgIcon(app)
app.mount("#app")