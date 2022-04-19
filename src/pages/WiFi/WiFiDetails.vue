<template>
    <div class="content">
        <box-title :titleName="t('Wireless.wifiCfg')"></box-title>
        <div class="wifi-info">
            <van-cell :title="t('Wireless.name')" :value="wifiInfo.name" />
            <van-cell :title="t('Wireless.remarks')" :value="wifiInfo.remarks" />
            <van-cell :title="t('Wireless.encryption')" :value="wifiInfo.encryption" />
            <van-cell :title="t('Wireless.showStatus')" :value="wifiInfo.status" />
            <van-cell title="VLAN ID" :value="wifiInfo.vlanId" />
            <van-button type="primary" block @click="WifiEdit">编辑</van-button>
        </div>
    </div>
</template>

<script setup>
import { reactive } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"

const router = useRouter()
const { t } = useI18n()
const wifiInfo = reactive({
    name: "public",
    remarks: "员工Wi-Fi",
    encryption: "是",
    status: "隐藏",
    vlanId: "1"
})

const WifiEdit = () => {
    console.log("Wi-Fi编辑页面")
    router.push("/EditWiFi")
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
