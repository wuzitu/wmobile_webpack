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
                    <Switch v-model="intelligentOptChecked" @change="intelligentOptimization" size="24" />
                </template>
            </van-cell>
        </div>
        <!-- Wi-Fi列表 -->
        <div class="wifi-list">
            <box-title :titleName="t('Wireless.wifiList')"></box-title>
            <p class="wifi-describe">{{ wifiDescribe }}</p>
            <div class="wifiCardWrap" v-for="(wifiInfoListItem, index) in wifiInfoList" :key="'wifi' + index">
                <wifi-list :wifiData="wifiInfoListItem"  @updateData="updateWifiData"/>
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
import { ref, getCurrentInstance, reactive} from "vue"
import { useI18n } from "vue-i18n"
import { useRouter, useRoute} from "vue-router"
import BoxTitle from "@/components/BoxTitle"
import WifiList from "./WiFiList"
import { Switch, Toast, Dialog } from "vant"

const { t } = useI18n()
let intelligentOptChecked = ref(true)
const optimizeRecords = t("Wireless.optimizeRecords")
const wifiDescribe = t("Wireless.wifiDescribe")
// const wifiInfoList = ref([
//     {
//         name: "public",
//         remarks: "员工Wi-Fi",
//         passwd: "无",
//         vlanId: "10"
//     },
//     {
//         name: "! guest",
//         remarks: "访客Wi-Fi",
//         passwd: "有",
//         vlanId: "1"
//     }
// ])

//智能优化开关
const intelligentOptimization = async(value) => {
    console.log(value)
    // const status = value ? t("Wireless.open") : t("Wireless.close")
    // Toast.success(status)
    let bChlClbModeValue = value === true ? "3" : "0"
    let oGlobalCfg = $req.getTableInstance("GlobalCfg")

    oGlobalCfg.addRows({"ChlClbMode": bChlClbModeValue,"PwrClbMode": bChlClbModeValue, "BandwidthClbMode": bChlClbModeValue})
    let response = await $req.set("merge", [oGlobalCfg])
    const status = value ? t("Wireless.open") : t("Wireless.close")
    Toast.success(status)
}

// 接收新增wifi配置数据
const route = useRoute()
const routeParams = route.params
console.log(routeParams)

//获取netconf数据
let wifiInfoList = reactive([])
const { proxy } = getCurrentInstance()
const $req = proxy.$req
const getConf = async () => {
    let oGlobalCfg = $req.getTableInstance("GlobalCfg")
    let oGlobalServiceTemplates = $req.getTableInstance("GlobalServiceTemplates")
    let response = await $req.getAll([oGlobalCfg, oGlobalServiceTemplates])
    let aGlobalCfg = $req.getTableRows("GlobalCfg", response)
    let aServiceTemplatesData = $req.getTableRows("GlobalServiceTemplates", response)
    aGlobalCfg = [{ ChlClbMode: "0", PwrClbMode: "0", BandwidthClbMode: "1" }]
    let bChlClbMode = aGlobalCfg[0].ChlClbMode == "0" ? false : true
    let bPwrClbMode = aGlobalCfg[0].PwrClbMode == "0" ? false : true
    let bBandwidthClbMode = aGlobalCfg[0].BandwidthClbMode == "0" ? false : true
    intelligentOptChecked.value = (bChlClbMode == false && bPwrClbMode == false && bBandwidthClbMode == false) ? false : true
    aServiceTemplatesData = [
        {
            name: "public",
            remarks: "员工Wi-Fi",
            passwd: "无",
            vlanId: "10"
        },
        {
            name: "! guest1",
            remarks: "访客Wi-Fi",
            passwd: "有",
            vlanId: "1"
        },
        {
            name: "! guest2",
            remarks: "访客Wi-Fi",
            passwd: "有",
            vlanId: "2"
        }
    ]
    wifiInfoList.push(...aServiceTemplatesData)
    if(routeParams.componentName == "AddWiFi"){
        addWifi()
    }
}
getConf()

//更新wifi List数据
const updateWifiData = (e) => {
    let wifiName = e
    wifiInfoList.map((item, i) => {
        if (item.name === wifiName) {
            wifiInfoList.splice(i, 1)
        }
    })
}

const addWifi = () => {
    let aAddWifiData = [{
        name : routeParams.name,
        remarks : routeParams.remarks,
        passwd : routeParams.encryption,
        vlanId : routeParams.vlanId
    }]
    wifiInfoList.push(...aAddWifiData)
    console.log(wifiInfoList)
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
    margin-bottom: 30px;
}
.add-wifi-title {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #f43e3b;
    padding-left: 9px;
}
</style>
