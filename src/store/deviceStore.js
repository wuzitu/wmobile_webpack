import { ref } from "vue"
import { defineStore } from "pinia"

// 使用setup模式定义
export const deviceStore = defineStore("counterForSetup", () => {
    const count = ref(1)
    function increment() {
        count.value++
    }

    function doubleCount() {
        return count.value * 2
    }

    return { count, increment, doubleCount }
})
