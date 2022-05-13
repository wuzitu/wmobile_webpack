<template>
    <div class="height100">
        <config-provider :theme-vars="themeVars">
            <van-cell-group v-for="(item, index) in menu" :title="RC(item.title)" :key="'menu' + index"
                class="cellWrap">
                <van-cell v-for="(menus, menuIndex) in item.menuList" center v-show="menus.isLink"
                    @click="handlingEvents(menus.type)" :key="'menu' + menuIndex" :value="menus.tips ? menus.tips : ''">
                    <template #title>
                        <div class="vanPhotoWrap">
                            <svg-icon :icon-class="menus.svgIcon" class="imageSize"></svg-icon>
                            <span class="custom-title">{{ RC(menus.name) }}</span>
                        </div>
                    </template>
                    <template #right-icon>
                        <svg-icon icon-class="ic_arrow" class="rightIcon"></svg-icon>
                    </template>
                </van-cell>
                <van-cell v-for="(menus, menuIndex) in item.menuList" center v-show="!menus.isLink"
                    :key="'menu' + menuIndex" :value="menus.tips ? menus.tips : ''">
                    <template #title>
                        <div class="vanPhotoWrap">
                            <svg-icon :icon-class="menus.svgIcon" class="imageSize"></svg-icon>
                            <span class="custom-title">{{ RC(menus.name) }}</span>
                        </div>
                    </template>
                    <template #right-icon>
                        <Switch v-model="checked" @change="autoManageChange" disabled size="24" />
                    </template>
                </van-cell>
            </van-cell-group>
        </config-provider>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import { ref } from "vue"
import { Dialog, Toast, ConfigProvider , Switch } from "vant"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("SystemMenu." + str)
}
const router = useRouter()
const checked = ref(true)
const menu = ref([
    {
        title: "loginTitle",
        menuList: [
            /*{
                name: "loginAddr",
                svgIcon: "ic_sys_ad",
                type: "addressManage",
                isLink: true
            },*/
            {
                name: "loginPwd",
                svgIcon: "ic_sys_key",
                type: "rootPass",
                isLink: true
            }
        ]
    },
    {
        title: "networkTitle",
        menuList: [
            {
                name: "networkRest",
                svgIcon: "ic_sys_reset",
                type: "networkRest",
                isLink: true
            },
            {
                name: "autoManageDevice",
                svgIcon: "ic_sys_newdevice",
                type: "autoManage",
                isLink: false,
                isSwitch: true
            }
        ]
    },
    {
        title: "serveTitle",
        menuList: [
            {
                name: "versionServe",
                svgIcon: "ic_sys_server",
                type: "tftpServce",
                tips: "192.168.1.1",
                isLink: true
            }
        ]
    },
    {
        title: "deviceTitle",
        menuList: [
            {
                name: "deviceList",
                svgIcon: "ic_sys_device",
                type: "equipmentList",
                isLink: true
            }
        ]
    }
])
const themeVars = {
    cellGroupTitleColor: "#666666",
    cellValueColor: "#666666",

}
const handlingEvents = (value) => {
    switch (value) {
        case "networkRest":
            Dialog.confirm({
                title: RC("networkRest"),
                confirmButtonText: t("Apply"),
                cancelButtonText: t("Cancel"),
                confirmButtonColor: "#617CF0",
                message: RC("restTipsContent")
            }).then(() => {
                // var oRestoreFactoryTable = Utils.Request.getTableInstance(NC.RestoreFactoryCfgTable);
                // var oData = { RestoreFactoryDefault:"" };

                // oRestoreFactoryTable.addRows(oData);
                // Utils.Request.action(oRestoreFactoryTable);
                            Toast.success("已确认")
            }).catch(() => {
                Toast.success("已取消")
            })
            break
        case "equipmentList":
            router.push("/System/SysDevice")
            break
        case "autoManage":
            return
        default:
            router.push("/System/SysSet?type=" + value)
    }
}

const autoManageChange = (value) => {
    const title = value ? "打开成功" : "关闭成功"
    Toast.success(title)
    console.log(value)
}

</script>
<style scoped>
.imageSize {
    width: 36px !important;
    height: 36px !important;
    margin-right: 9px;
    margin-left: -1px;
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
    width: 12px !important;
    height: 12px !important;
}

.custom-title {
    font-size: 14px;
}
</style>

