<template>
    <div class="ClientListWrap">
        <history-title :titleName="echartTitle" :detailRouter="detailRouter"></history-title>
        <!-- <terminal-echart chartName="terminal-Chart!"></terminal-echart> -->
        <terminal-echart :xaxisData="xaxisData" :yaxisData="yaxisData"></terminal-echart>
        <div class="wifiHeader">
            <span>终端列表</span>
            <van-Search class="searchStyle" v-model="searchValue" left-icon="none" placeholder="请输入终端名称、IP地址或MAC地址" />
            <svg-icon icon-class="ic_search" class="iconRight" @click="searchSsid"></svg-icon>
        </div>
        <div style="background-color: #ffffff;">
            <terminal-collapse :wifiData="wifiDataBack" :wifiCount="wifiCountBack"></terminal-collapse>
        </div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"

import HistoryTitle from "../Terminal/toHistoryTitle"
import TerminalEchart from "@/components/TrendChart.vue"
import TerminalCollapse from "../Terminal/collapse.vue"

const { t } = useI18n()
const { proxy } = getCurrentInstance()
const $req = proxy.$req

const echartTitle = ref(t("Terminal.echartTitle"))

const router = useRoute()
console.log(router.params)
// const propsData = defineProps({ Name: String })
// const cardData = defineProps({ cardData: Object })
// const cards = cardData.cardData
// console.log(cards)
const detailRouter = "/AP"

// let wifiDataAp = {}
// let wifiData = [
//     {
//         SSID: "wifi1",
//         modeAll: "10",
//         mode24: "5",
//         mode5: "5",
//         MAC: "0000-0000-0000",
//         WireLessMode: "1",
//         IP: "192.168.0.1",
//         ApName: "AP1",
//         CurrentUpTime: "10d:5h:10m"
//     },
//     {
//         SSID: "wifi2",
//         modeAll: "10",
//         mode24: "5",
//         nmode5: "5",
//         MAC: "0000-0000-0001",
//         WireLessMode: "2",
//         IP: "192.168.0.2",
//         ApName: "AP2",
//         CurrentUpTime: "10d:5h:10m"
//     },
//     {
//         SSID: "wifi3",
//         modeAll: "10",
//         mode24: "5",
//         mode5: "5",
//         MAC: "0000-0000-0000",
//         WireLessMode: "2",
//         IP: "192.168.0.2",
//         ApName: "AP1",
//         CurrentUpTime: "10d:5h:10m"
//     }
// ]

let getDatas = []
let searchValue = ref("")
let wifiDataBack = ref({})
let wifiCountBack = ref({})
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

function searchSsid() {
    let onlineStations = []
    for (let i = 0; i < getDatas.length; i++) {
        let mac = getDatas[i].MacAddress.search(searchValue.value)
        let ssid = getDatas[i].Ssid.search(searchValue.value)
        let ipv4 = getDatas[i].Ipv4Address.search(searchValue.value)
        if (mac != -1 || ssid != -1 || ipv4 != -1) {
            onlineStations.push(getDatas[i])
        }
    }
    getData(onlineStations)
}

// 判断wirelessmode是2.4G还是5G
function modeCheck(mode) {
    if (mode == "2" || mode == "16" || mode == "64" || mode == "256") {
        return 1
    } else {
        return 2
    }
}

function datatime(argument) {
    let day = parseInt(argument / 86400)
    let temp = argument % 86400
    let hour = parseInt(temp / 3600)
    temp = argument % 3600
    let mini = parseInt(temp / 60)
    let sec = argument % 60
    let sDatatime = ""
    if (hour < 10) {
        sDatatime = day + "-0" + hour
    } else {
        sDatatime = day + "-" + hour
    }
    if (mini < 10) {
        sDatatime = sDatatime + ":0" + mini
    } else {
        sDatatime = sDatatime + ":" + mini
    }
    if (sec < 10) {
        sDatatime = sDatatime + ":0" + sec
    } else {
        sDatatime = sDatatime + ":" + sec
    }
    return sDatatime
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
        let wifiName = allDatas[i].Ssid
        let mode = allDatas[i].WirelessMode
        let currentUpTime = datatime(allDatas[i].UpTime)
        allDatas[i].CurrentUpTime = currentUpTime

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
    // apDataBack.value = apData
    wifiCountBack.value = wifiCount
    // apCountBack.value = apCount
}

onMounted(async () => {
    // let OnlineStations = $req.getTableInstance("OnlineStations")
    let oStations = $req.getTableInstance("Stations")
    // let oServiceStatus = $req.getTableInstance("ServiceStatus")

    let aReqTable = []
    aReqTable.push(oStations)
    await $req.getAll(aReqTable).then((data) => {
        let aOnlineStations = $req.getTableRows("Stations", data)
        getDatas = aOnlineStations
        getData(aOnlineStations, "1")
    })
})
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
</style>
