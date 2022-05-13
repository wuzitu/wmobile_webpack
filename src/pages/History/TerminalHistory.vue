<template>
    <div class="terminal-box">
        <div>
            <part-title :titleName="RC('terquantityTrend')"></part-title>
            <trend-chart :xaxisData="xaxisData" :yaxisData="yaxisData"></trend-chart>
        </div>
        <div class="bottom-part-box">
            <part-title :titleName="RC('teminalHistoryData')"></part-title>
            <history-search :placeholder="RC('terinputBoxPrompt')" @search="onSearch"></history-search>
            <div class="terminal-detail-box">
                <div class="terminal-detail" v-for="item in TerminalList" :key="item">
                    <div class="avatar">
                        <Terminal-Avatar :brand="item.phoneModel" />
                    </div>
                    <div class="right-line">
                        <span class="terminal-number">{{ RC('terminal') }}{{ '：' + item.terminalNum }}</span>
                        <span
                            :class="{ green: item.event == 'online' && item.frequency == '2.4G', blue: item.event == 'online' && item.frequency == '5G' }"
                            class="online-status">{{ item.frequency }}</span>
                        <span class="terminal-ip">{{ RC('IPAddress') }}{{ '：' + item.Ip }}</span>
                        <span class="terminal-time">{{ RC('time') }}{{ '：' + item.time }}</span>
                        <span class="terminal-event">{{ RC('event') }}{{ '：' + item.event }}</span>
                        <div>
                            <span class="access-ap">{{ RC('accessAP') }}{{ '：' + item.accessAP }}</span>
                            <span class="access-wifi">{{ RC('accessWiFi') }}{{ '：' + item.acessWiFi }}</span>
                        </div>
                        <div class="right-line-jump">
                            <svg-icon icon-class="ic_arrow" class="goTeminalView" @click="goTerminal(item)"></svg-icon>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import TrendChart from "@/components/TrendChart.vue"
import partTitle from "./PartTitle.vue"
import HistorySearch from "./HistorySearch.vue"
import TerminalAvatar from "@/components/TerminalAvatar.vue"
import { defineProps, ref } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("History." + str)
}
const props = defineProps({
    aTimes: Array,
    ChartData: Array
})

let xaxisData = ref([{ value:"00:00",textStyle:{ padding:[0,0,0,22], color: "#666666" } },{ value:"06:00",textStyle:{ color: "#666666" } },{ value:"12:00", textStyle:{ color: "#666666" } },{ value:"18:00", textStyle:{ color: "#666666" } },{ value:"24:00",textStyle:{ padding:[0,0,0,-25], color: "#666666" } } ])
let yaxisData = [0,40,50,100,75,70,65]

const goTerminal = (item) => {
    router.push({ name:"terminalDetail" })
}

const TerminalList = ref([
    {
        phoneModel: "iphone",
        terminalNum: "0001-0001-0001",
        frequency: "2.4G",
        Ip: "1.1.1.1",
        time: "2022-03-18 16:00:00",
        event: "online",
        accessAP: "AP1",
        acessWiFi: "Guest"
    },
    {
        phoneModel: "xiaomi",
        terminalNum: "0001-0001-0002",
        frequency: "5G",
        Ip: "1.1.1.2",
        time: "2022-04-18 16:00:00",
        event: "online",
        accessAP: "AP2",
        acessWiFi: "public"
    },
    {
        phoneModel: "iphone",
        terminalNum: "0001-0001-0003",
        frequency: "2.4G",
        Ip: "1.1.1.2",
        time: "2022-04-18 18:00:00",
        event: "offline",
        accessAP: "AP3",
        acessWiFi: "public"
    },
    {
        phoneModel: "",
        terminalNum: "0001-0001-0004",
        frequency: "5G",
        Ip: "1.1.1.2",
        time: "2022-04-18 18:00:00",
        event: "offline",
        accessAP: "AP3",
        acessWiFi: "public"
    }
])
const onSearch = (val) => {
    console.log(val)
}
</script>
<style scoped>
.bottom-part-box {
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 10px;
}

.terminal-detail {
    width: 345px;
    height: 75px;
    border-bottom: 1px solid #D8D8D8;
    margin-left: 15px;
}

.right-line {
    position: relative;
    left: 50px;
    top: -60px;
}

.terminal-number {
    color: #333333;
}

.online-status {
    display: inline-block;
    width: 44px;
    height: 19px;
    background-color: #999999;
    border-radius: 9px;
    text-align: center;
    margin-left: 10px;
    color: #FFFFFF;
    font-size: 11px;
    line-height: 19px;
}

.green {
    background-color: #00AF6D;
}

.blue {
    background-color: #617CF0;
}

.terminal-ip {
    display: block;
}

.terminal-time,
.terminal-event,
.access-ap,
.access-wifi,
.terminal-ip {
    color: #666666;
    font-size: 13px;
}

.terminal-event,
.access-wifi {
    display: inline-block;
    margin-left: 20px;
}

.terminal-event::before,
.access-wifi::before {
    content: '|';
    position: relative;
    left: -10px;
    color: #999999;
}
.avatar {
    margin-top: 30px;
}

.right-line-jump {
    position: relative;
    left: 285px;
    top: -45px;
}

.goTeminalView {
    width: 12px;
    height: 12px;
}
</style>