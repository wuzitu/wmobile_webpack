// http.js
// 封装axios
import axios from "axios"

// 用于存储目前状态为pending的请求标识信息
let pendingRequest = []

/**
 * 请求的拦截处理
 * @param config - 请求的配置项
 */
const handleRequestIntercept = (config) => {
    // 区别请求的唯一标识，这里用方法名+请求路径
    // 如果一个项目里有多个不同baseURL的请求
    // 可以改成`${config.method} ${config.baseURL}${config.url}`
    const requestMark = `${config.method} ${config.url}`
    // 找当前请求的标识是否存在pendingRequest中，即是否重复请求了
    const markIndex = pendingRequest.findIndex((item) => {
        return item.name === requestMark
    })
    // 存在，即重复了
    if (markIndex > -1) {
    // 取消上个重复的请求
        pendingRequest[markIndex].cancel()
        // 删掉在pendingRequest中的请求标识
        pendingRequest.splice(markIndex, 1)
    }
    // （重新）新建针对这次请求的axios的cancelToken标识
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()
    config.cancelToken = source.token
    // 设置自定义配置requestMark项，主要用于响应拦截中
    config.requestMark = requestMark
    // 记录本次请求的标识
    pendingRequest.push({
        name: requestMark,
        cancel: source.cancel,
        routeChangeCancel: config.routeChangeCancel // 可能会有优先级高于默认设置的routeChangeCancel项值
    })

    return config
}

/**
 * 响应的拦截处理
 * @param config - 请求的配置项
 */
const handleResponseIntercept = (config) => {
    // 根据请求拦截里设置的requestMark配置来寻找对应pendingRequest里对应的请求标识
    const markIndex = pendingRequest.findIndex((item) => {
        return item.name === config.requestMark
    })
    // 找到了就删除该标识
    markIndex > -1 && pendingRequest.splice(markIndex, 1)
}

/**
 * 创建axios实例
 * @param {String} url - 访问后台的主url
 */
// eslint-disable-next-line no-unused-vars
const createAxiosInstance = (baseUrl) => {
    let instance = axios.create({
        baseURL: "/"
    })
    // 默认把请求视为切换路由就会把pending状态的请求取消，false为不取消
    instance.defaults.routeChangeCancel = true
    instance.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded"
    // 请求拦截
    instance.interceptors.request.use(handleRequestIntercept, (error) =>
        Promise.reject(error)
    )

    // 响应拦截
    instance.interceptors.response.use(
        (res) => {
            handleResponseIntercept(res.config)
            // 其实更多情况下你执行获取res.data
            // 可以return res.data;
            return res
        },
        (error) => {
            let errorFormat = {}
            const response = error.response
            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
            if (response) {
                handleResponseIntercept(response.config)
                // 设置返回的错误对象格式（按照自己项目实际需求）
                errorFormat = {
                    status: response.status,
                    data: response.data
                }
            }
            // 如果是主动取消了请求，做个标识
            if (axios.isCancel(error)) {
                errorFormat.selfCancel = true
            }
            // 其实还有一个情况
            // 在设置引发错误的请求时，error.message才是错误信息
            // 但我觉得这个一般是脚本错误，我们项目提示也不应该提示脚本错误给用户看，一般都是我们自定义一些默认错误提示，如“创建成功！”
            // 所以这里不针对此情况做处理。

            return Promise.reject(errorFormat)
        }
    )

    // 还有一些其他你想要的axios实例设置
    // ...

    return instance
}

// 其他配置
// ...

export { pendingRequest }
