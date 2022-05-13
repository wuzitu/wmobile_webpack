<template>
    <history-title :titleName="echartTitle" :detailRouter="detailRouter"></history-title>
    <ap-chart :xaxisData="xData" :yaxisData="yData"></ap-chart>
    <!-- <terminal-echart chartName="terminal-Chart!"></terminal-echart> -->

    <!-- -------AP页面---- -->
    <div class="apPage">
        <div class="wifiHeader">
            <span>AP列表</span>
            <van-Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入AP名称、IP地址序列号或MAC地址" />
            <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
        </div>

        <van-sticky :offset-top="38">
            <div>
                <Tabs v-model:active="active" swipeable color="#617CF0">
                    <Tab v-for="(item, index) in cardMenu" :title="item.title" :key="'menu' + index">
                        <div class="deviceCardWrap" v-for="(card, index) in cardList" :key="'haha' + index" @click="goDetail(card)">
                            <ap-list :cardData="card" v-on:clickEdit="getApName" />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </van-sticky>

        <van-dialog title="重命名" v-model:show="dialogShow" show-cancel-button>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field v-model="oldName" name="原名称" label="原名称" readonly="true" />
                    <van-field v-model="newName" name="新名称" label="新名称" placeholder="请输入新名称" :rules="[{ required: true, message: '请输入新名称' }]" />
                </van-cell-group>
                <!-- <div style="margin: 16px">
                    <van-button round block type="primary" native-type="submit">提交</van-button>
                </div> -->
            </van-form>
        </van-dialog>
    </div>

    <!-- <ap-list v-model:loading="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="item in list" :key="item" :title="item" @click="goDetail(item)" />
    </ap-list> -->
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from "vue"
import ApChart from "@/components/TrendChart.vue"
// import { List as ApList2 } from "vant"
import { ConfigProvider, Tab, Tabs, Sticky, Popover } from "vant"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import HistoryTitle from "../../pages/Terminal/toHistoryTitle"
import TerminalEchart from "../../pages/Terminal/terminalEchart.vue"
import ApList from "./ApList.vue"

const router = useRouter()

const { t } = useI18n()
const { proxy } = getCurrentInstance()
const $req = proxy.$req

let allNum = ref(0)
let onlineNum = ref(0)
let offlineNum = ref(0)
let active = ref(0)
let xData = ref([])
let yData = ref([])
const detailRouter = "/History"
const echartTitle = ref(t("AP.echartTitle"))
let value = ref("")
let dialogShow = ref(false)
let oldName = ref("")
let newName = ref("")
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

let clickData = {}
let cardList = ref([])

function getApName(name) {
    clickData = name
    dialogShow.value = true
    oldName.value = name.HostName
}

function onFailed() {
    console.log("修改失败")
}
function onSubmit() {
    // 一些校验
    // let oDeviceList = $req.getTableInstance("DeviceList")

    //修改交换机名
    let oBase = $req.getTableInstance("Base")
    oBase.addRows({ HostName: newName })
    let sXml = $req.makeEditChannelXml("edit-config", [oBase], "merge")
    let oEditChannel = $req.getTableInstance("EditChannel")
    oEditChannel.addRows({ TargetType: "single", TCId: clickData.Id, Save: true, XmlRequest: sXml })
    $req.action([oEditChannel], { onSuccess: onMounted, onFailed: onFailed })
}

const goDetail = (item) => {
    pushWithQuery(item)
}
function pushWithQuery(query) {
    router.push({
        name: "DevInfo",
        params: {
            ...query
        }
    })
}
const list = ref([])
list.value.push(1, 2, 3, 4, 5)

onMounted(async () => {
    let oOnlineAP = $req.getTableInstance("OnlineAPHistory", { count: "1000" })
    let oDeviceList = $req.getTableInstance("DeviceList")
    oDeviceList.addFilter({ type: "AP" })

    await $req.getBulk(oOnlineAP).then((data) => {
        let aOnlineAP = $req.getTableRows("OnlineAPHistory", data)

        for (let i = 0; i < aOnlineAP.length; i++) {
            xData.value.push(aOnlineAP[i].Time)
            yData.value.push(aOnlineAP[i].APCount)
        }
    })

    await $req.getAll(oDeviceList).then((data) => {
        let aDeviceList = $req.getTableRows("DeviceList", data)
        for (let i = 0; i < aDeviceList.length; i++) {
            cardList.value.push(aDeviceList[i])
        }
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
.deviceCardWrap {
    margin-top: 10px;
    display: flex;
    padding: 0 15px;
}
</style>
<style>
.apPage .van-tabs__line {
    width: 115px !important;
    height: 2px !important;
    background: #617cf0 !important;
}
.apPage .van-cell {
    font-size: 11px !important;
}
</style>
