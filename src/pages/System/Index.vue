<template>
    <div class="height100">
        <config-provider :theme-vars="themeVars">
            <van-cell-group
                v-for="(item, index) in menu"
                :title="item.title"
                :key="'menu' + index"
                class="cellWrap"
            >
                <van-cell
                    v-for="(menus, menuIndex) in item.menuList"
                    center
                    v-show="menus.isLink"
                    @click="handlingEvents(menus.type)"
                    :key="'menu' + menuIndex"
                    :value="menus.tips ? menus.tips : ''"
                >
                    <template #title>
                        <div class="vanPhotoWrap">
                            <svg-icon :icon-class="menus.svgIcon" class="imageSize"></svg-icon>
                            <span class="custom-title">{{ menus.name }}</span>
                        </div>
                    </template>
                    <template #right-icon>
                        <svg-icon icon-class="ic_arrow" class="rightIcon"></svg-icon>
                    </template>
                </van-cell>
                <van-cell
                    v-for="(menus, menuIndex) in item.menuList"
                    center
                    v-show="!menus.isLink"
                    :key="'menu' + menuIndex"
                    :value="menus.tips ? menus.tips : ''"
                >
                    <template #title>
                        <div class="vanPhotoWrap">
                            <svg-icon :icon-class="menus.svgIcon" class="imageSize"></svg-icon>  
                            <span class="custom-title">{{ menus.name }}</span>
                        </div>
                    </template>
                    <template #right-icon>
                        <Switch v-model="checked" @change="autoManageChange" size="24" />
                    </template>
                </van-cell>
            </van-cell-group>
        </config-provider>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref, nextTick, onMounted } from "vue"
import { Dialog, Toast, ConfigProvider,  Switch } from "vant";
const router = useRouter()
const isLink = require("@/frame/assets/icon/ic_arrow.svg")
const checked = ref(true)
const menu = ref([
    {
        title: "登录管理",
        menuList: [
            {
                name: "管理地址",
                svgIcon: "ic_sys_ad",
                tips: "autonet.h3c.com",
                type: "addressManage",
                isLink: true
            },
            {
                name: "管理员密码",
                svgIcon: "ic_sys_key",
                type: "rootPass",
                isLink: true
            }
        ]
    },
    {
        title: "网络管理",
        menuList: [
            {
                name: "重置网络",
                svgIcon: "ic_sys_reset",
                type: "networkRest",
                isLink: true
            },
            {
                name: "自动纳管新设备",
                svgIcon: "ic_sys_newdevice",
                type: "autoManage",
                isLink: false,
                isSwitch: true
            }
        ]
    },
    {
        title: "服务器管理",
        menuList: [
            {
                name: "版本服务器",
                svgIcon: "ic_sys_server",
                type: "tftpServce",
                tips: "192.168.1.1",
                isLink: true
            }
        ]
    },
    {
        title: "设备管理",
        menuList: [
            {
                name: "设备列表",
                svgIcon: "ic_sys_device",
                type: "equipmentList",
                isLink: true
            }
        ]
    }
])
// nextTick(()=>{
//     // 这里获取一些初始值，域名和版本服务器的值
// })
const themeVars = {
    cellGroupTitleColor: '#666666',
    cellValueColor: '#666666',

}
const handlingEvents = (value) => {
    console.log(value)
    switch (value) {
        case "networkRest":
            Dialog.confirm({
                title: "网络重置",
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                confirmButtonColor: "#617CF0",
                message: "本操作会将网络内所有设备恢复出厂并重启，重新进行自组网，需要再次进行开局配置，请确认"
            })
                .then(() => {
                    Toast.success("已确认");
                })
                .catch(() => {
                    Toast.success("已取消");
                })
            break
        case "equipmentList":
            router.push("/sysDevice")
            break
        case "autoManage":
            return
            break
        default:
            router.push("/sysSet?type=" + value)
    }
}

const autoManageChange = (value) => {
    const title = value ? '打开成功' : '关闭成功'
    Toast.success(title);
    console.log(value)
}




</script>

<style scoped>
.imageSize {
    width: 36px;
    height: 36px;
    margin-right: 10px;
}

.vanPhotoWrap {
    display: flex;
    align-items: center;
    color: #333333;
    font-size: 14px;
    font-weight: 500px;
    width: 166px;
}
.rightIcon {
    width: 12px;
    height: 12px;
}
.custom-title {
    font-size: 14px;
}
</style>

