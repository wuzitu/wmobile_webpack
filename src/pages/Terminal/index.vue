<template>
    <div id="terminalPage">
        <div>
            <div class="apCount">
                <div v-for="item in terminalNum" :key="item.class" class="count">
                    <div :class="item.bindClass" class="titleImg"></div>
                    <span class="titleContent">{{ $t(item.bindClass) }} {{ item.num }}</span>
                </div>
            </div>
        </div>

        <history-title :titleName="echartTitle" :detailRouter="detailRouter"></history-title>
        <terminal-echart :xaxisData="xaxisData" :yaxisData="yaxisData"></terminal-echart>

        <div class="wifiHeader">
            <span>终端列表</span>
            <van-Search class="searchStyle" v-model="searchValue" left-icon="none" placeholder="请输入终端名称、IP地址或MAC地址" />
            <svg-icon icon-class="ic_search" class="iconRight" @click="searchSsid"></svg-icon>
        </div>

        <div style="background-color: #ffffff">
            <van-tabs v-model:active="activeTab" style="padding-top: 24px" type="card" color="#617CF0" title-inactive-color="#333333" line-width="10px">
                <van-tab title="按接入Wi-Fi查看">
                    <!-- 终端列表折叠面板 -->
                    <terminal-collapse :wifiData="wifiDataBack" :wifiCount="wifiCountBack"></terminal-collapse>
                </van-tab>

                <van-tab title="按接入AP查看">
                    <ap-collapse :apData="apDataBack" :apCount="apCountBack"></ap-collapse>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"

import HistoryTitle from "../Terminal/toHistoryTitle"
// import TerminalEchart from "./terminalEchart.vue"
import TerminalEchart from "@/components/TrendChart.vue"
import TerminalCollapse from "./collapse.vue"
import ApCollapse from "./apCollapse.vue"

const { t } = useI18n()
const detailRouter = "/AP"
const { proxy } = getCurrentInstance()
const $req = proxy.$req
const echartTitle = ref(t("Terminal.echartTitle"))
const listTitle = ref(t("Terminal.listTitle"))

let terminalNum = ref([
    { bindClass: "TerminalAll", num: 0 },
    { bindClass: "Terminal24", num: 0 },
    { bindClass: "Terminal5", num: 0 }
])

let xaxisData = ref([
    { value: "00:00", textStyle: { padding: [0, 0, 0, 22], color: "#666666" } },
    { value: "06:00", textStyle: { color: "#666666" } },
    { value: "12:00", textStyle: { color: "#666666" } },
    { value: "18:00", textStyle: { color: "#666666" } },
    { value: "24:00", textStyle: { padding: [0, 0, 0, -25], color: "#666666" } }
])
let yaxisData = [5, 38, 47, 75, 59, 45]

let getDatas = []
let activeTab = ref(["1"])
let searchValue = ref("")

let wifiDataBack = ref({})
let apDataBack = ref({})

let wifiCountBack = ref({})
let apCountBack = ref({
    all: 0,
    Num5G: 0,
    Num2G: 0
})
function searchSsid() {
    let onlineStations = []
    for (let i = 0; i < getDatas.length; i++) {
        let mac = getDatas[i].MAC.search(searchValue.value)
        let ssid = getDatas[i].SSID.search(searchValue.value)
        let ipv4 = getDatas[i].IP.search(searchValue.value)
        if (mac != -1 || ssid != -1 || ipv4 != -1) {
            onlineStations.push(getDatas[i])
        }
    }
    getData(onlineStations)
}

function modeCheck(mode) {
    if (mode == "2" || mode == "16" || mode == "64" || mode == "256") {
        return 1
    } else {
        return 2
    }
}

function getData(allDatas, form) {
    let wifiData = {}
    let apData = {}
    let wifiCount = {}
    let apCount = {
        all: 0,
        Num5G: 0,
        Num2G: 0
    }

    for (let i = 0; i < allDatas.length; i++) {
        let apName = allDatas[i].ApName
        let wifiName = allDatas[i].SSID
        let mode = allDatas[i].WireLessMode

        if (!apData[apName]) {
            apCount[apName] = {
                all: 0,
                Num5G: 0,
                Num2G: 0
            }

            apData[apName] = []
        }

        if (!wifiData[wifiName]) {
            wifiData[wifiName] = []
            wifiCount[wifiName] = {
                all: 0,
                Num5G: 0,
                Num2G: 0
            }
        }

        if (modeCheck(mode) == 1) {
            apCount[apName].Num5G++
            wifiCount[wifiName].Num5G++
            allDatas[i].mode = 1
        } else {
            apCount[apName].Num2G++
            wifiCount[wifiName].Num2G++
            allDatas[i].mode = 2
        }
        apCount[apName].all++
        wifiCount[wifiName].all++
        apData[apName].push(allDatas[i])
        wifiData[wifiName].push(allDatas[i])

        if (form == 1) {
            modeCheck(mode) == 1 ? terminalNum.value[2].num++ : terminalNum.value[1].num++
            terminalNum.value[0].num++
        }
    }

    wifiDataBack.value = wifiData
    apDataBack.value = apData
    wifiCountBack.value = wifiCount
    apCountBack.value = apCount
}

onMounted(async () => {
    let OnlineStations = $req.getTableInstance("OnlineStations")
    await $req.getAll(OnlineStations).then((data) => {
        let aOnlineStations = $req.getTableRows("OnlineStations", data)
        getDatas = aOnlineStations
        getData(aOnlineStations, "1")
    })
})

// 所有AP
// for (let i = 0; i < allData.length; i++) {
//     // 所有AP下的WIFI
//     for (let j = 0; j < allData[i].wifiData.length; j++) {
//         let wifiName = allData[i].wifiData[j].link

//         if (!allWifiDataTag[wifiName]) {
//             allWifiDataTag[wifiName] = true
//             allWifiDataValue.push({ ...allData[i].ap, ...allData[i].wifiData[j] })
//         }
//     }
// }
// console.log("allWifiDataValue:" + allWifiDataValue)

// for (let i = 0; i < 80; i++) {
//     wifiData.push({
//         id: i + 1,
//         name: "wifi" + i,
//         numAll: i,
//         num24: i,
//         num: i,
//         RadioID: 2,
//         Mac: "0000-0000-000" + i,
//         address: "192.168.0." + i,
//         link: "AP" + i,
//         time: "10d:5h:10m"
//     })
// }
// for (let i = 0; i < 80; i++) {
//     wifiDataAp.push({
//         id: i + 1,
//         name: "AP" + i,
//         numAll: i,
//         num24: i,
//         num: i,
//         RadioID: 1,
//         Mac: "0000-0000-000" + i,
//         address: "192.168.0." + i,
//         link: "AP" + i,
//         time: "10d:5h:10m"
//     })
// }
</script>

<style scoped>
.wifiHeader {
    padding-right: 10px;
    background: #ffffff;
    border-bottom: 1px solid #f2f3f5;
    position: relative;
    display: flex;
    align-items: center;
}

.wifiHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}

.wifiHeader::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background: #617cf0;
}
.searchStyle {
    flex: 1;
}
.iconRight {
    width: 14px;
    height: 14px;
}
.apCount {
    display: flex;
    margin-left: 28px;
    padding-top: 10px;
    padding-bottom: 10px;
}
.apCount .spanValue {
    color: #333333;
}
.count {
    display: flex;
    align-items: center;
}
.titleImg {
    display: inline-block;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin-right: 5px;
}
.titleContent {
    font-size: 13px;
}
.TerminalAll {
    background-color: #ff6a38;
}
.Terminal24 {
    background-color: #00af6d;
    margin-left: 24px;
}
.Terminal5 {
    background-color: #617cf0;
    margin-left: 24px;
}
.viewButton {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    display: flex;
    align-items: center;
}
.goHistory {
    width: 12px;
    height: 12px;
    margin-top: 2px !important;
}

/* .linkToAp {
    flex-grow: 1;
} */
/* .linksStyle {
    padding-bottom: 14px;
    padding-top: 14px;
    border-bottom: 1px solid #d8d8d8;
} */
.boxTitle {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    line-height: 44px;
    color: #333;
    background: #fff;
    border-bottom: 1px solid #d8d8d8;
}
.boxTitle .titleColor {
    display: inline-block;
    width: 4px;
    height: 12px;
    background-color: #617cf0;
    margin-right: 15px;
}
.ic_wifi {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
.wifiTitle {
    display: flex;
    align-items: center;
}
.wifiTitle span {
    font-size: 14px !important;
    color: #333333 !important;
}
/* .ipStyle {
    display: flex;
    align-items: center;
    justify-content: space-between;
} */
.goApView {
    width: 12px;
    height: 12px;
    margin-right: 12px;
    margin-top: 2px;
}
/* .terminalList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
} */

/* .aaaaa div {
    background-color: red;
} */
.alineItemsCenter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.paddingBottom5 {
    padding-bottom: 5px;
}
.paddingTop5 {
    padding-top: 5px;
}

.toAPdetail {
    color: #617cf0;
}
</style>

<style>
/* #terminalPage .terminalList .van-collapse-item__content {
    padding-top: 14px !important;
    padding-bottom: 14px !important;
}
#terminalPage .van-collapse-item__content {
    background-color: #f7f7f7 !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
} */
</style>
