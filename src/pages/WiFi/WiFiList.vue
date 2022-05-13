<template>
    <div class="cardWrap" @click="WifiDetails">
        <div class="title">
            <span>
                <span class="wifi-name">{{ t("Wireless.name") }}: {{ wifi.wifiData.name }}</span>
            </span>
            <svg-icon icon-class="ic_deletewifi" class="iconStyle" @click.stop="delWifi(wifi.wifiData.name)"></svg-icon>
        </div>
        <p>
            <span class="wifi-remarks">{{ t("Wireless.remarks") }}: {{ wifi.wifiData.remarks }}</span>
        </p>
        <p>
            <span class="wifi-remarks">{{ t("Wireless.wifiPwd") }}: {{ wifi.wifiData.passwd }}</span>
            <span class="lineSpan">VLAN ID：{{ wifi.wifiData.vlanId }}</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps, getCurrentInstance, defineEmits} from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Toast, Dialog } from "vant"

const { proxy } = getCurrentInstance()
const $req = proxy.$req

const { t } = useI18n()
const router = useRouter()
const wifi = defineProps({ wifiData: Object })
// let wifiListData = wifi.wifiData //使用中间变量数据不更新
const emit = defineEmits(["updateData"])
const delWifi = (name) => {
    const beforeClose = (action) =>
        new Promise((resolve) => {
            setTimeout(async () => {
                if (action === "confirm") {
                    let oTemplate = $req.getTableInstance("GlobalServiceTemplates")
                    oTemplate.addRows({Name:name})
                    let response = await $req.set("remove", [oTemplate])
                    emit("updateData", name)
                    resolve(true)
                } else {
                    resolve(true)
                }
            }, 1000)
        })
    Dialog.confirm({
        title: t("Wireless.delWifiTitle"),
        confirmButtonText: t("Apply"),
        cancelButtonText: t("Cancel"),
        confirmButtonColor: "#617CF0",
        message: t("Wireless.delWifiMessage"),
        beforeClose: beforeClose
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
    // router.push("/WiFiDetails?name=" + wifi.wifiData.name)
    router.push({
        name:"WiFiDetails",
        params:{
            name:wifi.wifiData.name,
            remarks:wifi.wifiData.remarks,
            encryption:wifi.wifiData.passwd,
            hideStatus:"隐藏",
            vlanId:wifi.wifiData.vlanId
        }
    })
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
