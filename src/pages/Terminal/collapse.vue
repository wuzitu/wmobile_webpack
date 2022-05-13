<template>
    <div class="terminalPage">
        <div style="background-color: #ffffff">
            <!-- 终端列表折叠面板 -->
            <van-collapse v-model="activeNames" class="terminalList">
                <van-collapse-item title="" v-for="(val, key) in wifiData" :key="key">
                    <template #title>
                        <div class="wifiTitle">
                            <svg-icon icon-class="ic_wifi" class="ic_wifi"></svg-icon>
                            <span>Wi-Fi: {{ key }}</span>
                        </div>
                        <span>终端总数： {{ wifiCount[key].all }} |</span>
                        <span>2.4G终端： {{ wifiCount[key].Num2G }} |</span>
                        <span>5G终端： {{ wifiCount[key].Num5G }}</span>
                    </template>

                    <div v-for="item in val" :key="item.SSID">
                        <router-link :to="{ path: '/Terminal/terminalDetail', query: { TCID: item.TCID, MAC: item.MAC } }" class="alineItemsCenter">
                            <img src="../../../src/frame/assets/img/img_head_iphone@2x.png" class="logoImg" />
                            <div class="linkToAp linksStyle">
                                <div class="paddingBottom5">
                                    <span>{{ item.MAC || item.MacAddress }}</span>
                                    <div v-if="item.mode == 2" class="radioStyle24">2.4G</div>
                                    <div v-else class="radioStyle5">5G</div>
                                </div>
                                <div class="ipStyle paddingBottom5">
                                    <span>IP地址：{{ item.IP || item.Ipv4Address }}</span>
                                </div>
                                <div>
                                    <span>接入AP：</span>
                                    <router-link :to="{ path: '/AP', query: { devName: item.ApName, devType: 'ap' } }" class="toAPdetail">
                                        {{ item.ApName }}
                                    </router-link>
                                    |
                                    <span>连接时长：{{ item.CurrentUpTime }}</span>
                                </div>
                            </div>
                            <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>
                        </router-link>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue"

// import { useI18n } from "vue-i18n"

const Datas = defineProps({
    wifiData: Object,
    wifiCount: Object
})
let activeNames = ref([])
let toDetailRouter = "/Terminal/terminalDetail/"
// let wifiData = {}
// let wifiCount = {}

// let allDatas = [
//     {
//         SSID: "wifi1",
//         modeAll: "10",
//         mode24: "5",
//         mode5: "5",
//         MAC: "0000-0000-0000",
//         WireLessMode: "32",
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
//         SSID: "wifi1",
//         modeAll: "10",
//         mode24: "5",
//         mode5: "5",
//         MAC: "0000-0000-0003",
//         WireLessMode: "2",
//         IP: "192.168.0.2",
//         ApName: "AP3",
//         CurrentUpTime: "10d:5h:10m"
//     },
//     {
//         SSID: "wifi3",
//         modeAll: "10",
//         mode24: "5",
//         mode5: "5",
//         MAC: "0000-0000-0004",
//         WireLessMode: "2",
//         IP: "192.168.0.2",
//         ApName: "AP1",
//         CurrentUpTime: "10d:5h:10m"
//     }
// ]

// for (let i = 0; i < allDatas.length; i++) {
//     let wifiName = allDatas[i].SSID
//     let mode = allDatas[i].WireLessMode

//     if (!wifiData[wifiName]) {
//         wifiData[wifiName] = []
//         wifiData[wifiName].push(allDatas[i])

//         wifiCount[wifiName] = {
//             all: 0,
//             Num5G: 0,
//             Num2G: 0
//         }

//         if (mode == "2" || mode == "16" || mode == "64" || mode == "256") {
//             wifiCount[wifiName].Num5G++
//         } else {
//             wifiCount[wifiName].Num2G++
//         }
//         wifiCount[wifiName].all++
//     } else {
//         wifiData[wifiName].push(allDatas[i])
//         if (mode == "2" || mode == "16" || mode == "64" || mode == "256") {
//             wifiCount[wifiName].Num5G++
//         } else {
//             wifiCount[wifiName].Num2G++
//         }
//         wifiCount[wifiName].all++
//     }
// }
</script>

<style scoped>
.logoImg {
    width: 41px;
    height: 41px;
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
.detailIcon {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
}
.linksStyle {
    padding-bottom: 14px;
    padding-top: 14px;
    margin-left: 7px;
}
.borderBottom {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    margin-right: 20px;
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
    margin-top: 2px;
}
.terminalList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}

.alineItemsCenter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #d8d8d8;
    margin-right: 12px;
}

.paddingBottom5 {
    padding-bottom: 5px;
}

.toAPdetail {
    color: #617cf0;
}
.apList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}
</style>

<style>
.terminalPage .van-collapse-item__content {
    padding-top: 14px !important;
    padding-bottom: 14px !important;
}
.terminalPage .van-collapse-item__content {
    background-color: #f7f7f7 !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
</style>
