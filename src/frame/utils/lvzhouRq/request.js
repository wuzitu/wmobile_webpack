import axios from "axios"
import { Toast } from "vant"
// 绿洲在此处就固定设置为https://oasis.h3c.com，如需rd或者at修改此处即可
const BASE_URL = "https://oasis.h3c.com"
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL:BASE_URL,
    // 超时
    timeout: 20000
})
// 请求拦截器
service.interceptors.request.use(config => {
    // config.headers = { "Access-Control-Expose-Headers":'Authorization'}
    return config
},error => {
    console.log(error) // for debug
    Promise.reject(error)
})
// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = Number(res.status)
    if (code === 500){
        Toast({
            message: "服务器未知错误~",
            type: "error"
        })
        return
    }
    return res.data
},
error => {
    console.log(error)
    if (error && error.stack.indexOf("timeout") > -1) {
        Toast({
            message: "服务器请求超时，请重试！！",
            type: "error"
        })
    } else if (error.stack.indexOf("Network") > -1) {
        Toast({
            message: "网络连接错误，请重试！！",
            type: "error"
        })
    }
    // return Promise.reject(error)
    return error
})
export default service