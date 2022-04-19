<template>
    <!-- 顶部蓝色状态条 -->
    <app-top></app-top>
    <!-- 弹出层，存放菜单路由，多语言等内容 -->
    <side-menu></side-menu>
    <!-- 业务页面content -->
    <div class="page-content">
        <router-view />
    </div>
</template>

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

<style scoped>
.page-content {
    /* margin: 10px; */
    /* background-color: #ccc; */
    /* border: 2px solid black; */
    /* background-color: #f7f7f7; */
    overflow: hidden;
}
</style>
