<template>
    <!-- 顶部蓝色状态条 -->
    <app-top v-if="headerShow"></app-top>
    <!-- 弹出层，存放菜单路由，多语言等内容 -->
    <side-menu v-if="leftMenuShow"></side-menu>
    <!-- 业务页面content -->
    <div class="page-content">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "app",
    data() {
        return {
            headerShow: false,
            leftMenuShow: false
        }
    },
    watch: {
        $route() {
            if (this.$route.path === "/Welcome"
            || this.$route.path === "/InitWlan"
            || this.$route.path === "/Login"
            || this.$route.path === "/GuideDownload") {

                this.headerShow = false
                this.leftMenuShow = false
            } else {
                this.headerShow = true
                this.leftMenuShow = true
            }
        }
    }
}
</script>

<script setup>
import { ref, provide, onMounted } from "vue"
import AppTop from "@/components/AppTop.vue"
import SideMenu from "@/components/SideMenu.vue"
import Frame from "@/frame/utils/Frame"

// 定义数据
const menuShow = ref(false)
// 向子组件传值
provide("menuShow", menuShow)

onMounted(async () => {
    Frame.FrameInit()
})
</script>
