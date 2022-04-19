<template>
    <van-sticky class="app-header">
        <van-row justify="space-between" align="center" id="app-header">
            <van-col span="8" align="left">
                <svg-icon icon-class="ic_menu" class="menu" @click="menuClick"></svg-icon>
            </van-col>
            <van-col span="8" align="center">
                <svg-icon icon-class="img_logo" class="logo"></svg-icon>
            </van-col>
            <van-col span="8" align="right">
                <van-popover v-model:show="showPopover" :actions="actions" @select="onSelect" theme="dark" placement="bottom-end">
                    <template #reference>
                        <svg-icon icon-class="ic_add" class="add"></svg-icon>
                    </template>
                </van-popover>
            </van-col>
        </van-row>
        <!-- <van-nav-bar  left-arrow @click-left="onClickLeft" @click-right="onClickRight" /> -->
        <!-- <van-row justify="space-between" align="center" id="app-header">
      <van-col span="12">
        <van-icon name="bars" size="30" @click="menuClick" />
        <h1>H3C</h1>
        <svg-icon icon-class="ic_add"></svg-icon>
      </van-col>

      <van-col span="6">
        <span>
          <van-icon name="add" size="20px" />
          |
        </span>
        <span>
          <van-icon name="friends" size="20px" />
        </span>
      </van-col>
    </van-row> -->
    </van-sticky>
</template>

<script setup>
import { ref, inject } from "vue"
import { useRouter } from "vue-router"

const menuShow = inject("menuShow") // 接受父组件传值
const menuClick = () => {
    menuShow.value = !menuShow.value
}
const showPopover = ref(false)
const router = useRouter()

// 通过 actions 属性来定义菜单选项
const actions = [{ text: "新增无线" }, { text: "新增VLAN" }]
const onSelect = (action, index) => {
    if (index == 0) {
        router.push({
            path: "/AddWifi"
        })
    } else if (index == 1) {
        router.push({
            path: "/Vlan"
        })
    }
}
</script>

<style scoped>
#app-header {
    background-color: #ffffff;
    height: 44px;
    /* border-top: 1px solid #f7f7f7; */
    border-bottom: 1px solid #f7f7f7;
}
#app-header h1 {
    padding: 0;
    margin: 0;
    display: inline-block;
    font-size: 30px;
    font-weight: bold;
}
.menu {
    margin-left: 12px;
    width: 32px;
    height: 32px;
}
.logo {
    width: 67px;
    height: 28px;
}
.add {
    margin-right: 12px;
    width: 26px;
    height: 26px;
}
</style>
