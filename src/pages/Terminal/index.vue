<template>
    <van-config-provider :theme-vars="themeVars">
        <div>
            <div class="apCount">
                <div v-for="item in apStatistics" :key="item.class" class="count">
                    <div :class="item.bindClass" class="titleImg"></div>
                    <span class="titleContent">{{ $t(item.bindClass) }} {{ item.value }}</span>
                </div>
            </div>
        </div>

        <history-title :titleName="echartTitle" :detailRouter="detailRouter"></history-title>
        <terminal-echart chartName="terminal-Chart!"></terminal-echart>

        <div class="wifiHeader">
            <span>终端列表</span>
            <van-Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入终端名称、IP地址或MAC地址" />
            <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
        </div>

        <div style="background-color: #ffffff;">
            <van-tabs v-model:active="activeTab" style="padding-top: 24px;" type="card" color="#617CF0" title-inactive-color="#333333" line-width="10px">
                <van-tab title="按接入Wi-Fi查看">
                    <!-- 终端列表折叠面板 -->
                    <van-collapse v-model="activeNames" class="terminalList">
                        <van-collapse-item title="" v-for="item in allWifiDataValue" :key="item.name">
                            <template #title>
                                <div class="wifiTitle">
                                    <svg-icon icon-class="ic_wifi" class="ic_wifi"></svg-icon>
                                    <span>Wi-Fi: {{ item.link }}</span>
                                </div>
                                <span>终端总数： {{ item.numAll }} |</span>
                                <span>2.4G终端： {{ item.num24 }} |</span>
                                <span>5G终端： {{ item.num }}</span>
                            </template>

                            <div class="alineItemsCenter">
                                <!-- <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>  -->

                                <div class="linkToAp">
                                    <div class="paddingBottom5">
                                        <span>{{ item.Mac }}</span>
                                        <div v-if="item.RadioID == 1" class="radioStyle24">2.4G</div>
                                        <div v-else class="radioStyle5">5G</div>
                                    </div>
                                    <div class="ipStyle paddingBottom5">
                                        <span>IP地址：{{ item.address }}</span>
                                    </div>
                                    <div>
                                        <span>接入AP：</span>
                                        <router-link :to="{ path: '/AP', query: { devName: item.link, devType: 'ap' } }" class="toAPdetail">
                                            {{ item.name }}
                                        </router-link>
                                        |
                                        <span>连接时长：{{ item.time }}</span>
                                    </div>
                                </div>
                                <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </van-tab>

                <van-tab title="按接入AP查看">
                    <van-collapse v-model="activeNamesAp" class="apList">
                        <van-collapse-item title="" v-for="aps in allData" :key="aps.name">
                            <template #title>
                                <div class="wifiTitle">
                                    <span>AP: {{ aps.ap.name }}</span>
                                </div>
                                <span>终端总数： {{ aps.ap.numAll }} |</span>
                                <span>2.4G终端： {{ aps.ap.num24 }} |</span>
                                <span>5G终端： {{ aps.ap.num }}</span>
                            </template>

                            <div class="alineItemsCenter" v-for="item in aps.wifiData">
                                <!-- <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>  -->

                                <div class="linkToAp linksStyle">
                                    <div class="paddingBottom5">
                                        <span>{{ item.Mac }}</span>
                                        <div v-if="item.RadioID == 1" class="radioStyle24">2.4G</div>
                                        <div v-else class="radioStyle5">5G</div>
                                    </div>
                                    <div class="ipStyle paddingBottom5">
                                        <span>IP地址：{{ item.address }}</span>
                                    </div>
                                    <div>
                                        <span>接入WIFI：</span>
                                        <router-link :to="{ path: '/Terminal/terminalDetail', query: { devName: item.link, devType: 'ap' } }" class="toAPdetail">
                                            {{ item.link }}
                                        </router-link>
                                        |
                                        <span>连接时长：{{ item.time }}</span>
                                    </div>
                                </div>
                                <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>
                            </div>
                        </van-collapse-item>
                    </van-collapse>
                </van-tab>
            </van-tabs>
        </div>
    </van-config-provider>
</template>

<script setup>
import { defineStore } from "pinia"
import { ref, getCurrentInstance, provide } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import HistoryTitle from "../Terminal/toHistoryTitle"
import TerminalEchart from "./terminalEchart.vue"

const { t } = useI18n()
const detailRouter = "/AP"
const echartTitle = ref(t("Terminal.echartTitle"))
const listTitle = ref(t("Terminal.listTitle"))

let apStatistics = [
    { bindClass: "allAP", value: 20 },
    { bindClass: "online", value: 15 },
    { bindClass: "offline", value: 5 }
]
let activeTab = ref(["1"])
let activeNamesAp = ref(["1"])
let value = ref("")
let allWifiDataValue = []
let allWifiDataTag = []

let allData = [
    {
        ap: { name: "AP1", numAll: "10", num24: "5", num: "5" },
        wifiData: [
            { Mac: "0000-0000-0000", RadioID: 1, address: "192.168.0.1", link: "wifi1", time: "10d:5h:10m" },
            { Mac: "0000-0000-0001", RadioID: 2, address: "192.168.0.2", link: "wifi2", time: "10d:5h:10m" },
            { Mac: "0000-0000-0002", RadioID: 1, address: "192.168.0.3", link: "wifi3", time: "10d:5h:10m" }
        ]
    },
    {
        ap: { name: "AP2", numAll: "10", num24: "5", num: "5" },
        wifiData: [
            { Mac: "0000-0000-0000", RadioID: 1, address: "192.168.0.1", link: "wifi1", time: "10d:5h:10m" },
            { Mac: "0000-0000-0001", RadioID: 2, address: "192.168.0.2", link: "wifi2", time: "10d:5h:10m" },
            { Mac: "0000-0000-0002", RadioID: 1, address: "192.168.0.3", link: "wifi3", time: "10d:5h:10m" }
        ]
    }
]

// 所有AP
for (let i = 0; i < allData.length; i++) {
    // 所有AP下的WIFI
    for (let j = 0; j < allData[i].wifiData.length; j++) {
        let wifiName = allData[i].wifiData[j].link

        if (!allWifiDataTag[wifiName]) {
            allWifiDataTag[wifiName] = true
            allWifiDataValue.push({ ...allData[i].ap, ...allData[i].wifiData[j] })
        }
    }
}
console.log("allWifiDataValue:" + allWifiDataValue)

let wifiData = []
let wifiDataAp = []

for (let i = 0; i < 80; i++) {
    wifiData.push({
        id: i + 1,
        name: "wifi" + i,
        numAll: i,
        num24: i,
        num: i,
        RadioID: 2,
        Mac: "0000-0000-000" + i,
        address: "192.168.0." + i,
        link: "AP" + i,
        time: "10d:5h:10m"
    })
}
for (let i = 0; i < 80; i++) {
    wifiDataAp.push({
        id: i + 1,
        name: "AP" + i,
        numAll: i,
        num24: i,
        num: i,
        RadioID: 1,
        Mac: "0000-0000-000" + i,
        address: "192.168.0." + i,
        link: "AP" + i,
        time: "10d:5h:10m"
    })
}

let activeNames = ref([wifiData[0].name])
const themeVars = {}
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
.allAP {
    background-color: #ff6a38;
}
.online {
    background-color: #00af6d;
    margin-left: 24px;
}
.offline {
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
.radioStyle24 {
    display: inline-block;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #00af6d;
    border-radius: 9px;
    font-size: 11px;
    font-family: PingFang SC;
    color: #ffffff;
    margin-left: 10px;
}
.radioStyle5 {
    display: inline-block;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #617cf0;
    border-radius: 9px;
    font-size: 11px;
    font-family: PingFang SC;
    color: #ffffff;
    margin-left: 10px;
}
.linkToAp {
    flex-grow: 1;
}
.linksStyle {
    padding-bottom: 14px;
    padding-top: 14px;
    border-bottom: 1px solid #d8d8d8;
}
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
.ipStyle {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.goApView {
    width: 12px;
    height: 12px;
    margin-right: 12px;
    margin-top: 2px;
}
.terminalList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}
.apList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}
.aaaaa div {
    background-color: red;
}
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
.terminalList .van-collapse-item__content {
    padding-top: 14px !important;
    padding-bottom: 14px !important;
}
.van-collapse-item__content {
    background-color: #f7f7f7 !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
.toAPdetail {
    color: #617cf0;
}
</style>
