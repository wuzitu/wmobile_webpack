<template>
    <div class="ClientListWrap">
        <history-title :titleName="echartTitle" :detailRouter="detailRouter"></history-title>
        <terminal-echart chartName="terminal-Chart!"></terminal-echart>
        <search-title></search-title>
        <!-- <terminal-Collapse :wifiData="wifiData"></terminal-Collapse> -->
        <terminal-collapse :wifiData="wifiData"></terminal-collapse>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

import HistoryTitle from "../Terminal/toHistoryTitle"
import TerminalEchart from "../Terminal/terminalEchart.vue"
import SearchTitle from "../Terminal/searchTitle.vue"
import TerminalCollapse from "../Terminal/collapse.vue"

const { t } = useI18n()
const echartTitle = ref(t("Terminal.echartTitle"))
// const listTitle = ref(t("Terminal.listTitle"))

const router = useRouter()
console.log(router.params)
// const propsData = defineProps({ Name: String })
const cardData = defineProps({ cardData: Object })
const cards = cardData.cardData
console.log(cards)
const detailRouter = "/AP"

// let wifiDataAp = {}
let wifiData = [
    {
        SSID: "wifi1",
        modeAll: "10",
        mode24: "5",
        mode5: "5",
        MAC: "0000-0000-0000",
        WireLessMode: "1",
        IP: "192.168.0.1",
        ApName: "AP1",
        CurrentUpTime: "10d:5h:10m"
    },
    {
        SSID: "wifi2",
        modeAll: "10",
        mode24: "5",
        nmode5: "5",
        MAC: "0000-0000-0001",
        WireLessMode: "2",
        IP: "192.168.0.2",
        ApName: "AP2",
        CurrentUpTime: "10d:5h:10m"
    },
    {
        SSID: "wifi3",
        modeAll: "10",
        mode24: "5",
        mode5: "5",
        MAC: "0000-0000-0000",
        WireLessMode: "2",
        IP: "192.168.0.2",
        ApName: "AP1",
        CurrentUpTime: "10d:5h:10m"
    }
]
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
