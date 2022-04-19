<template>
    <div class="cardWrap" @click="WifiDetails">
        <div class="title">
            <span>
                <span class="wifi-name">{{ t("Wireless.name") }}: {{ wifiListData.name }}</span>
            </span>
            <svg-icon icon-class="ic_deletewifi" class="iconStyle" @click.stop="delWifi(wifiListData.name)"></svg-icon>
        </div>
        <p>
            <span class="wifi-remarks">{{ t("Wireless.remarks") }}: {{ wifiListData.remarks }}</span>
        </p>
        <p>
            <span class="wifi-remarks">{{ t("Wireless.wifiPwd") }}: {{ wifiListData.passwd }}</span>
            <span class="lineSpan">VLAN ID：{{ wifiListData.vlanId }}</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Toast, Dialog } from "vant"

const { t } = useI18n()
const router = useRouter()
const wifi = defineProps({ wifiData: Object })
console.log(wifi)
const wifiListData = wifi.wifiData
console.log(wifiListData)

const delWifi = (name) => {
    console.log(name)
    Dialog.confirm({
        title: t("Wireless.delWifiTitle"),
        confirmButtonText: t("Apply"),
        cancelButtonText: t("Cancel"),
        confirmButtonColor: "#617CF0",
        message: t("Wireless.delWifiMessage")
    })
        .then(() => {
            Toast.success(t("Wireless.delWifiSuccess"))
        })
        .catch(() => {
            Toast.success(t("Wireless.delWifiCancel"))
        })
}

const WifiDetails = () => {
    console.log("Wi-Fi详情页面")
    router.push("/WiFiDetails?vlanId=" + wifiListData.vlanId)
}
</script>

<style scoped>
.iconStyle {
    width: 15px;
    height: 15px;
}
.cardWrap {
    background: #ffffff;
    padding: 10px;
    flex: 1;
}
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

p {
    margin: 5px 0;
    padding: 0;
    color: #666666;
}

p span {
    margin: 0 5px;
}

p span:nth-child(1) {
    margin-left: 0;
}
.wifi-name {
    color: #333333;
    font-size: 14px;
}
.wifi-remarks {
    font-size: 13px;
    color: #666666;
    border-radius: 3px;
    display: inline-block;
}
.lineSpan {
    font-size: 13px;
    color: #666666;
}
.lineSpan::before {
    content: "|";
    position: relative;
    left: -5px;
    color: #999999;
}
</style>
