<template>
    <div class="content">
        <box-title :titleName="t('Wireless.wifiCfg')"></box-title>
        <div class="wifi-info">
            <van-cell :title="t('Wireless.name')" :value="routeParams.name" />
            <van-cell :title="t('Wireless.remarks')" :value="routeParams.remarks" />
            <van-cell :title="t('Wireless.encryption')" :value="routeParams.encryption" />
            <van-cell :title="t('Wireless.showStatus')" :value="routeParams.hideStatus" />
            <van-cell title="VLAN ID" :value="routeParams.vlanId" />
            <van-button type="primary" block @click="WifiEdit">编辑</van-button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter, useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"

const router = useRouter()
const route = useRoute()
console.log(route.params)
const routeParams = route.params
const { t } = useI18n()
// const wifiInfo = reactive({
//     name: "public",
//     remarks: "员工Wi-Fi",
//     encryption: "是",
//     status: "隐藏",
//     vlanId: "1"
// })

const WifiEdit = () => {
    console.log("Wi-Fi编辑页面")
    // router.push("/EditWiFi")
    router.push({
        name:"EditWiFi",
        params:routeParams
    })
}
</script>
<style scoped>
.wifi-info .van-cell {
    color: #333333;
}
.wifi-info .van-button--primary {
    height: 50px;
    background: #ffffff;
    color: #617cf0;
    border-radius: 0px;
    border: none;
}
</style>
