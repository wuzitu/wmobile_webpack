import {
    createApp
} from 'vue'
import {
    Button,
    Col,
    Row
} from 'vant';
import App from './App.vue'

import 'vant/lib/index.css'; // 全局引入样式
import router from './router'
import i18n from './i18n'

const app = createApp(App).use(router).use(i18n).use(router) // 创建实例
app.use(Button)
app.use(Col);
app.use(Row);


app.mount('#app')