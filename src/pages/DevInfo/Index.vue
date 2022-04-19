<template>
    <div class="devIndex">
        <box-title :titleName="sTitle">
            <div class="popover">
                <Popover  placement="bottom-end" icon="ic_more" v-model:show="showButtonView"
                        :actions="actions" @select="onSelect" theme="dark" show-arrow=true
                        icon-prefix="svn-icon"  class="pop-over"
                        >
                        <template #reference>
                            <van-button  class="more-button" hairline="false" plain type="default"></van-button>
                            <svg-icon icon-class="ic_more" class="more"></svg-icon>
                        </template>
                </Popover>
            </div>
        </box-title>
        <details-info></details-info>

        <!-- <van-sticky :offset-top="38"> -->
        <div class="tabStyle">
            <Tabs sticky v-model:active="activeName"  color="#617CF0" >
                <Tab v-for="(item,index) in aCardList"
                        :title="item.menuName" :key="'menu' + index"
                        v-show="item.bSupport" :to="item.linkName"
                >
                    <tab-card :tabData ="item"></tab-card>
                </Tab>
            </Tabs>
        </div>
        <!-- </van-sticky> -->
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import { Toast,Tab,Tabs,Popover } from "vant"
import BoxTitle from "../../components/BoxTitle.vue"
import DetailsInfo from "./DetailsInfo"
import TabCard from "./TabCard"

const router = useRoute()
const userData = ref()
console.log(router.params)
const { t } = useI18n()
const activeName = ref("0")

const detailData = ref({
    "devName":"device",
    "devType": "Other",
    "devVersion":"R2401",
    "devSN":"123456789201215",
    "ipaddress":"192.168.0.1",
    "macaddress":"0000-0000-0001",
    "devStatus": 1,
    "onlinetime": 365830069,
    "isSupportPoe":true,
    "isSupportWan":true
})
const devData = Object.assign({},router.params)
const sDevType = devData.devType
const sDevName = devData.devName
const sTitle1 = sDevType + ":" + sDevName
const sTitle = ref(sTitle1)
const bIfSupportPoe = devData.isSupportPoe || false
const bIfSuppotWan = devData.isSupportWan || false

const oCardList = {
    "AP":[
        {
            "index":"ap_dashboard",
            "menuName":t("MENU.dashboard-side"),
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"APDashboardCard"

        },
        {
            "index":"ap_radio",
            "menuName":"Radio",
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"RadioCard"
        },
        {
            "index":"ap_client",
            "menuName":t("MENU.terminal"),
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"ClientCard"
        },
        {
            "index":"ap_port",
            "menuName": t("DevInfo.interface"),
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"PortCard"
        },
        {
            "index":"poe",
            "menuName":"PoE",
            "bSupport":bIfSupportPoe,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"PoeCard"
        }
    ],
    "Other":[
        {
            "index":"dev_dashboard",
            "menuName":t("MENU.dashboard-side"),
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"DevDashCard"
        },
        {
            "index":"dev_wan",
            "menuName":"WAN",
            "bSupport":bIfSuppotWan,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"WanCard"
        },
        {
            "index":"dev_vlan",
            "menuName":"VLAN",
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"VlanCard"
        },
        {
            "index":"dev_lan",
            "menuName":"LAN",
            "bSupport":true,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"LanCard"
        },
        {
            "index":"poe",
            "menuName":"PoE",
            "bSupport":bIfSupportPoe,
            "devType": devData.devType,
            "devName": devData.devName,
            "devSN": devData.devSN,
            "ipaddress": devData.ipaddress,
            "devStatus": devData.devStatus,
            "macaddress": devData.macaddress,
            "onlinetime": devData.onlinetime,
            "isSupportPoe": devData.isSupportPoe,
            "isSupportWan": devData.isSupportWan,
            "linkName":"PoeCard"
        }
    ]
}

let devType = devData.devType ? devData.devType : ""
let aCardList = ref([])
let actions = ref([
    { text: t("DevInfo.reboot") ,className:"reboot" },
    { text: t("DevInfo.upgrade") ,className:"upgrade" },
    { text: t("DevInfo.beaconlight"),className:"beaconlight" },
    { text: t("DevInfo.indicatorlight") ,className:"indicatorlight" },
])

switch(devType){
    case "AP":
        aCardList = oCardList["AP"].concat()
        break
    default:
        aCardList = oCardList["Other"].concat()
        actions = ref([
            { text: t("DevInfo.reboot") ,className:"reboot" },
            { text: t("DevInfo.upgrade") ,className:"upgrade" }
        ])
        break

}


const showButtonView = ref(false)
const onSelect = (action) => {
    Toast(action.text)
}

// const tabHandler = (item,e) => {
//     const sName = item.linkName
//     Toast(sName)
//     router.push({ name:sName ,params:item })

// }
</script>
<style  scoped>
.devIndex {
  /* background: #f7f7f7; */
  width: 100%;
  height: auto;
}

.devIndex .tabStyle
{
   margin-top: 10px;
}


.devIndex  .popover{
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
    right:18px;
    top:20px;
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
