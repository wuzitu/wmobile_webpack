<template>
    <history-title :titleName="echartTitle" :detailRouter="detailRouter"></history-title>
    <!-- <ap-chart chartName="Ap-Chart!"></ap-chart> -->
    <terminal-echart chartName="terminal-Chart!"></terminal-echart>

    <!-- -------AP页面---- -->
    <div class="wifiHeader">
        <span>AP列表</span>
        <van-Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入AP名称、IP地址序列号或MAC地址" />
        <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
    </div>

    <van-sticky :offset-top="38">
        <div>
            <Tabs v-model:active="active" swipeable color="#617CF0">
                <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index">
                    <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'haha' + index">
                        <ap-list :cardData="card" />
                    </div>
                </Tab>
            </Tabs>
        </div>
    </van-sticky>

    <!-- <ap-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" @click="goDetail(item)" />
    </ap-list> -->
</template>

<script setup>
import { ref } from "vue"
import ApChart from "./ApChart.vue"
// import { List as ApList2 } from "vant"
import { ConfigProvider, Tab, Tabs, Sticky, Popover } from "vant"
import { useRouter, useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import HistoryTitle from "../../pages/Terminal/toHistoryTitle"
import TerminalEchart from "../../pages/Terminal/terminalEchart.vue"
import ApList from "./ApList.vue"

const { t } = useI18n()
const router = useRouter()
const route = useRoute()

let allNum = ref(0)
let onlineNum = ref(0)
let offlineNum = ref(0)
let active = ref(0)

const detailRouter = "/AP"
const echartTitle = ref(t("AP.echartTitle"))
let value = ref("")
let cardMenu = [
    {
        title: t("AP.all") + allNum.value
    },
    {
        title: t("AP.online") + onlineNum.value
    },
    {
        title: t("AP.offline") + offlineNum.value
    }
]

let cardList = ref([
    {
        //isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        IPAddress: "1.1.1.1",
        linkTimes: "20d:5h:10m"
    },
    {
        // isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "false",
        IPAddress: "1.1.1.2",
        linkTimes: "20d:5h:10m"
    },
    {
        //isCheak: false,
        company: "H3C",
        decice: "AP",
        isOnline: "true",
        IPAddress: "1.1.1.3",
        linkTimes: "20d:5h:10m"
    }
])

const goDetail = (item) => {
    pushWithQuery(item)
}
function pushWithQuery(query) {
    router.push({
        path: `/DevInfo/AP/${query}`,
        query: {
            ...route.query
        }
    })
}
const list = ref([])
list.value.push(1, 2, 3, 4, 5)
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
.deviceCardWrap {
    margin-top: 10px;
    display: flex;
    padding: 0 15px;
}
.van-tabs__line {
    width: 115px !important;
    height: 2px !important;
    background: #617cf0 !important;
}
.van-cell {
    font-size: 11px !important;
}
</style>
