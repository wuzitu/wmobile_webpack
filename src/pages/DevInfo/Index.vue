<template>
    <div class="devIndex">
        <box-title :titleName="sTitle">
            <div class="popover">
                <Popover placement="bottom-end" icon="ic_more" v-model:show="showButtonView" :actions="actions" @select="onSelect" theme="dark" show-arrow="true" icon-prefix="svn-icon" class="pop-over">
                    <template #reference>
                        <van-button class="more-button" hairline="false" plain type="default"></van-button>
                        <svg-icon icon-class="ic_more" class="more"></svg-icon>
                    </template>
                </Popover>
            </div>
        </box-title>
        <details-info></details-info>

        <!-- <van-sticky :offset-top="38"> -->
        <div class="tabStyle">
            <Tabs sticky v-model:active="activeName" color="#617CF0">
                <Tab v-for="(item, index) in aCardList" :title="item.menuName" :key="'menu' + index" v-show="item.bSupport">
                    <tab-card :tabData="item"></tab-card>
                </Tab>
            </Tabs>
        </div>
    </div>
    <upgrade-pop-up v-model:upgradeShow="showUpgrade"  isNeedBack="true"  :confirm="confirmUpgrade" >
        <template #chooseTips v-if="bTip"></template>
    </upgrade-pop-up>
    <Popup v-model:show="showLedMode" position="bottom" :style="{ height: '30%' }">
        <!-- columns-field-names="name"  -->
        <Picker v-model="LedMode" :columns="LedModeColumn" @confirm="onConfirmLedMode" @cancel="onCancelLedMode" columns-field-names="ledMode" @change="onChangeLedMode"  :confirm-button-text="t('Apply')" :cancel-button-text="t('Cancel')" show-toolbar="true"></Picker>
    </Popup>
</template>

<script setup>
import { ref,reactive,onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { Toast, Tab, Tabs, Popover,Popup,Dialog ,Picker} from "vant"
import BoxTitle from "../../components/BoxTitle.vue"
import UpgradePopUp from "../../components/UpgradePopUp.vue"
import DetailsInfo from "./DetailsInfo"
import TabCard from "./TabCard"

const router = useRoute()
const userData = ref()
console.log(JSON.parse(router.query.content))
// console.log(JSON.parse(router.params.content))
const { t } = useI18n()
const activeName = ref("0")
let showUpgrade = ref(false)
let bTip = ref(false)
let LedMode = ref("Normal")
/**
    HostName: "AP1"
    Id: "1"
    IpAddress: "1.1.1.1"
    JoinTime: "2022-04-25 08:20"
    Model: "FATAP"
    OutTime: "2022-04-25 08:20"
    Role: "TC"
    SerialNumber: "4354657686868"
    Status: "1"
    SysVersion: "RS-4506"
    company: "H3C"
    linkTime: "20h:30min:15s"
    Type: "AP"
 */
const routerData = JSON.parse(router.query.content)
// const routerData = JSON.parse(router.params.content)
const devData = Object.assign({}, routerData)
const sDevType = devData.decice || devData.type || devData.Type
const sDevName = devData.HostName
const sTitle1 = sDevType + ":" + sDevName
const sTitle = ref(sTitle1)
const bIfSupportPoe = devData.isSupportPoe || false
const bIfSuppotWan = devData.isSupportWan || false
let showLedMode = ref(false)

const RCStr = (str) => {
    return t(`DevInfo.${str}`)
}
const LedModeColumn = reactive([
    "Normal",
    "Quiet",
    "Awake",
    "Always-on"
    // { "name":RCStr("NormalMode"),"values":"0" ,"className":"Normal" },
    // { "name":RCStr("QuietMode"),"values":"1" ,"className":"Quiet" },
    // { "name":RCStr("AwakeMode"),"values":"2","className":"Awake" },
    // { "name":RCStr("AlwaysOn"),"values":"3","className":"Always-on" },
    // { "values":"0" ,"className":"Normal" },
    // { "values":"1" ,"className":"Quiet" },
    // { "values":"2","className":"Awake" },
    // { "values":"3","className":"Always-on" },
])

onMounted(async () => {
    // let
})

const oCardList = {
    AP: [
        {
            index: "ap_dashboard",
            menuName: t("MENU.dashboard-side"),
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "APDashboardCard"
        },
        {
            index: "ap_radio",
            menuName: "Radio",
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "RadioCard"
        },
        {
            index: "ap_client",
            menuName: t("MENU.terminal"),
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "ClientCard"
        },
        {
            index: "ap_port",
            menuName: t("DevInfo.interface"),
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "PortCard"
        },
        {
            index: "poe",
            menuName: "PoE",
            bSupport: bIfSupportPoe,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "PoeCard"
        }
    ],
    Other: [
        {
            index: "dev_dashboard",
            menuName: t("MENU.dashboard-side"),
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "DevDashCard"
        },
        {
            index: "dev_wan",
            menuName: "WAN",
            bSupport: bIfSuppotWan,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "WanCard"
        },
        {
            index: "dev_vlan",
            menuName: "VLAN",
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "VlanCard"
        },
        {
            index: "dev_lan",
            menuName: "LAN",
            bSupport: true,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "LanCard"
        },
        {
            index: "poe",
            menuName: "PoE",
            bSupport: bIfSupportPoe,
            devType: devData.Type || devData.type,
            devName: devData.HostName,
            devSN: devData.devSN,
            ipaddress: devData.ipaddress,
            devStatus: devData.Status,
            macaddress: devData.macaddress,
            onlinetime: devData.onlinetime,
            isSupportPoe: devData.isSupportPoe,
            isSupportWan: devData.isSupportWan,
            linkName: "PoeCard"
        }
    ]
}

let devType = devData.Type ? devData.Type : devData.type || devData.decice

const onConfirmLedMode = (newval,oldValue) => {
    if(newval != oldValue) {
        //set
    }
     Toast(t("SET_SUCCESS"))
    showLedMode.value = !showLedMode.value

}

const onCancelLedMode = (val) => {
    showLedMode.value = false
}

const onChangeLedMode = (val) => {

}

const confirmUpgrade = (val) => {

}

const RebootDev = () => {

}

const operLedMode = () => {

}

let aCardList = ref([])
let actions = reactive([
    { text: RCStr("reboot"), className: "reboot",operation:RebootDev },
    { text: RCStr("upgrade"), className: "upgrade", confirm:function(){} },
    { text: RCStr("ledMode"), className: "ledMode",operation:operLedMode },
])


switch (devType) {
    case "AP":
        aCardList = oCardList["AP"].concat()
        break
    default:
        aCardList = oCardList["Other"].concat()
        actions = reactive([
            { text: t("DevInfo.reboot"), className: "reboot" ,operation:RebootDev },
            { text: t("DevInfo.upgrade"), className: "upgrade" ,operation:function(){} }
        ])
        break
}

const showButtonView = ref(false)
const onSelect = (action) => {
    // Toast(action.text)
    if(action.className == "upgrade")
    {
        showUpgrade.value = true
    }

    if(action.className == "ledMode")
    {
        showLedMode.value = true
    }

    if(action.className == "reboot")
    {
        Dialog.confirm({
            title: t("CONFIRM_WINDOW"),
            message: `${ devType == "AP" ? RCStr("IfRebootAP") : RCStr("IfRebootDev")}`
        }).then(() => {
            Toast(t("SET_SUCCESS"))
        })
    }
}


// const tabHandler = (item,e) => {
//     const sName = item.linkName
//     Toast(sName)
//     router.push({ name:sName ,params:item })

// }
</script>
<style scoped>
.devIndex {
    /* background: #f7f7f7; */
    width: 100%;
    height: auto;
}

.devIndex .tabStyle {
    margin-top: 10px;
}

.devIndex .popover {
    width: 30px;
    height: 30px;
    /* border:rebeccapurple 1px solid; */
    float: right;
    text-align: center;
    line-height: 30px;
    vertical-align: center;
    margin-right: 18px;
}

.devIndex .more-button {
    border: 1px solid #fff;
    margin: 2px 0 0px 5px;
    padding: 0 0 0 0;
    width: 40px;
    height: 40px;
}

.devIndex .more-button + .more {
    width: 18px;
    height: 18px;
    position: absolute;
    right: 18px;
    top: 20px;
    /* border: 1px royalblue solid; */
}

.deviceCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}

.devIndex .popover .pop-over {
    /* margin-right: 14px; */
    margin-right: 0;
}
</style>
