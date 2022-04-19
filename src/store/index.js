// 引入所有的全局store状态，编译时只打包一份，各组件传值直接调用。
import { deviceStore } from "./deviceStore"
import { storeDemo } from "./storeDemo"

const appStore = {}

/**
 * 注册app状态库
 */
export const registerStore = () => {
    appStore.deviceStore = deviceStore()
    appStore.storeDemo = storeDemo()
}

export default appStore
