<template>
    <div class="wifi-content">
        <!-- 智能优化射频 -->
        <div class="intelligent-optimized">
            <router-link to="/RRM">
                <box-title :titleName="t('Wireless.intelligentOptimizedRF')">
                    <div class="header-title">
                        <span>{{ optimizeRecords }}</span>
                        <svg-icon icon-class="ic_arrow" class="rightIcon"></svg-icon>
                    </div>
                </box-title>
            </router-link>

            <van-cell center :title="t('Wireless.intelligentOptimization')">
                <template #right-icon>
                    <Switch v-model="checked" @change="intelligentOptimization" size="24" />
                </template>
            </van-cell>
        </div>
        <!-- Wi-Fi列表 -->
        <div class="wifi-list">
            <box-title :titleName="t('Wireless.wifiList')"></box-title>
            <p class="wifi-describe">{{ wifiDescribe }}</p>
            <div class="wifiCardWrap" v-for="(wifiInfoListItem, index) in wifiInfoList" :key="'wifi' + index">
                <wifi-list :wifiData="wifiInfoListItem" />
            </div>

            <router-link to="/AddWifi">
                <div class="add-wifi">
                    <svg-icon icon-class="ic_addwifi" class="add-wifi-icon"></svg-icon>
                    <span class="add-wifi-title">{{ t("Wireless.addWifi") }}</span>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import WifiList from "./WiFiList"
import { Switch, Toast, Dialog } from "vant"

const { t } = useI18n()
const checked = ref(true)
const optimizeRecords = t("Wireless.optimizeRecords")
const wifiDescribe = t("Wireless.wifiDescribe")
const wifiInfoList = ref([
    {
        name: "public",
        remarks: "员工Wi-Fi",
        passwd: "无",
        vlanId: "10"
    },
    {
        name: "! guest",
        remarks: "访客Wi-Fi",
        passwd: "有",
        vlanId: "1"
    }
])

const intelligentOptimization = (value) => {
    console.log(value)
    const status = value ? t("Wireless.open") : t("Wireless.close")
    Toast.success(status)
}
</script>

<style scoped>
.van-switch--on {
    background: #617cf0;
}

.rightIcon {
    width: 12px;
    height: 12px;
    vertical-align: middle;
}

.add-wifi-icon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.wifi-list {
    margin-top: 10px;
}

.wifiCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}

.wifi-describe {
    width: 344px;
    height: 33px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 19px;
    padding-left: 15px;
    padding-right: 15px;
}

.header-title {
    float: right;
    padding-right: 10px;
    color: #666666;
}
.add-wifi {
    width: 100px;
    height: 30px;
    margin: 0 auto;
    margin-top: 22px;
    text-align: center;
    line-height: 30px;
}
.add-wifi-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f43e3b;
    padding-left: 9px;
}
</style>
