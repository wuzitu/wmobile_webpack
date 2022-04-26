<template>
    <box-title :titleName="rrmTitle">
        <span class="line"></span>
        <span class="drop1">
            <span @click="ondropControl">{{ ajustDrop }}</span>
            <svg-icon :icon-class="icDropDown" class="icondown" @click="ondropControl"></svg-icon>
            <div :class="dropControl">
                <div @click="selectDrop(0)" class="dropline">{{ ajustDataMsg }}</div>
                <!-- <div @click="selectDrop(1)">{{ ajustEffectaMsg }}</div> -->
            </div>
        </span>
    </box-title>

    <div class="ajustContent_wrap2">
        <van-search v-model="value" :placeholder="searchPlaceholder" />
        <div v-for="(item, index) in oAllAPs" class="wrap2_bg">
            <div class="ajustContent2_line1">
                <span class="ajustContent2_apname" @click="jumpAPDetail(item.APName)">{{ item.APName }}：</span>
                <!-- <select-radio :selectOptions="item.radios" :index_AP="index" @changeSelect="selectedRadio"></select-radio> -->
                <select-radio :selectOptions="radios" :index_AP="index" @changeSelect="selectedRadio"></select-radio>
                <span class="changebutton">
                    <span :class="item.show1" @click="onChangeShowType($event, item, 0)">{{ t("RRM.showTypechange") }}</span>
                    <span class="space"></span>
                    <span :class="item.show2" @click="onChangeShowType($event, item, 1)">{{ t("RRM.showType") }}</span>
                </span>
            </div>

            <div v-show="item.showEchartByRadio" class="echart_wrap">
                <div class="ajustpoint">
                    <div class="circle"></div>
                    <span>优化调整点</span>
                </div>
                <div v-if="item.t1"><r-r-m-echart :echartData="item" :radioindex="0"></r-r-m-echart></div>
                <div v-if="item.t2"><r-r-m-echart :echartData="item" :radioindex="1"></r-r-m-echart></div>
                <div v-if="item.t3"><r-r-m-echart :echartData="item" :radioindex="2"></r-r-m-echart></div>
            </div>
            <div v-show="item.showTableByRadio">
                <!--按radio显示列表-->
                <div v-if="item.t1">
                    <ajust-effect-list :ajustEffectListData="item.listData[0]" :activeName="index + '0'"></ajust-effect-list>
                </div>
                <div v-if="item.t2">
                    <ajust-effect-list :ajustEffectListData="item.listData[1]" :activeName="index + '1'"></ajust-effect-list>
                </div>
                <div v-if="item.t3">
                    <ajust-effect-list :ajustEffectListData="item.listData[2]" :activeName="index + '2'"></ajust-effect-list>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, reactive, toRef, provide } from "vue"
import RRMEchart from "@/pages/RRM/RRMEchart.vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle.vue"
import AjustByAP from "@/pages/RRM/AjustByAP.vue"
import AjustByTime from "@/pages/RRM/AjustByTime.vue"
import SelectRadio from "@/pages/RRM/SelectRadio.vue"
import AjustEffectList from "@/pages/RRM/AjustEffectList.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const { t } = useI18n()
const searchPlaceholder = t("RRM.searchPlaceholder")
const rrmTitle = t("RRM.rrmtitle")
const ajustDataMsg = t("RRM.ajustmsgchange")
const ajustEffectaMsg = t("RRM.ajustmsg")
let ajustactive = ref(0)
let ajustDrop = ref(ajustEffectaMsg)
let dropControl = ref("hide")
let icDropDown = ref("ic_list_down")
let radioindex = ref(0)
const radios = ["Radio1", "Radio2", "Radio3"]
const ondropControl = () => {
    if (icDropDown.value == "ic_list_down") {
        dropControl.value = "show"
        icDropDown.value = "ic_list_up"
    } else {
        dropControl.value = "hide"
        icDropDown.value = "ic_list_down"
    }
}
const selectDrop = (clickIndex) => {
    if (clickIndex == 0) {
        router.push({
            path: "/RRM"
        })
    } else {
    }
}

let onChangeShowType = (event, item, arr3) => {
    if (arr3 == 0) {
        if (event.target.className == "show1") {
            return false
        } else {
            item.showEchartByRadio = true
            item.showTableByRadio = false
            item.show1 = "show1"
            item.show2 = "show2"
        }
    } else {
        if (event.target.className == "show1") {
            return false
        } else {
            item.showEchartByRadio = false
            item.showTableByRadio = true
            item.show1 = "show2"
            item.show2 = "show1"
        }
    }
}
const selectedRadio = (e) => {
    //切换radio
    onClickTabRadio(e[1], oAllAPs[e[0]]) //radio下标 AP调整信息
}

const onClickTabRadio = (arr1, arr2) => {
    //切换radio
    if (arr1 == 1) {
        //radio2
        arr2.t1 = false
        arr2.t2 = true
        arr2.t3 = false
    } else if (arr1 == 2) {
        //radio3
        arr2.t1 = false
        arr2.t2 = false
        arr2.t3 = true
    } else {
        //radio1
        arr2.t1 = true
        arr2.t2 = false
        arr2.t3 = false
    }
}
let jumpAPDetail = (apname) => {
    router.push({
        path: "/DevInfo/AP/AP"
    })
}
let testData = [
    {
        APName: "AP1",
        // radios: ["Radio1", "Radio2", "Radio3"],
        t1: true, //radio1
        t2: false, //radio2
        t3: false, //radio3
        show1: "show1", //趋势图按钮样式
        show2: "show2", //列表按钮样式
        showEchartByRadio: true, //控制趋势图显示隐藏
        showTableByRadio: false, //控制列表显示隐藏
        listData: [
            [
                { time: "2022-03-16 10:00", loadRateBefore: "25", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 11:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ],
            [
                { time: "2022-03-16 12:00", loadRateBefore: "35", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 13:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ],
            [
                { time: "2022-03-16 14:00", loadRateBefore: "45", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 15:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ]
        ],
        ajustDataRadio: [
            [
                [20, 30, 10, 50, 70, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 20, 50, 30],
                [20, 20, 20, 20, 20, 25, 30, 15, 20, 10],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 20],
                [20, 20, 20, 20, 20, 20, 30, 15, 40, 10]
            ],
            [
                [50, 30, 10, 50, 70, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 15, 60, 40],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 20, 50, 20],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70]
            ],
            [
                [10, 30, 10, 50, 70, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 40, 30, 50, 30, 70],
                [20, 20, 20, 20, 20, 70, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 90, 30, 60, 40, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70]
            ]
        ],
        aTimesX: [
            ["17:00:00", "17:05:00", "17:10:00", "17:15:00", "17:20:00", "17:25:00", "17:30:00", "17:35:00", "17:40:00", "17:45:00"],
            ["18:00:00", "18:05:00", "18:10:00", "18:15:00", "18:20:00", "18:25:00", "18:30:00", "18:35:00", "18:40:00", "18:45:00"],
            ["19:00:00", "19:05:00", "19:10:00", "19:15:00", "19:20:00", "19:25:00", "19:30:00", "19:35:00", "19:40:00", "19:45:00"]
        ]
    },
    {
        APName: "AP2",
        // radios: ["Radio1", "Radio2", "Radio3"],
        t1: true,
        t2: false,
        t3: false,
        show1: "show1",
        show2: "show2",
        showEchartByRadio: true,
        showTableByRadio: false,
        listData: [
            [
                { time: "2022-03-17 10:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 11:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ],
            [
                { time: "2022-03-17 12:00", loadRateBefore: "30", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 13:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ],
            [
                { time: "2022-03-16 14:00", loadRateBefore: "40", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 15:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ]
        ],
        ajustDataRadio: [
            [
                [60, 30, 10, 50, 70],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20]
            ],
            [
                [70, 30, 10, 50, 70],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20]
            ],
            [
                [80, 30, 10, 50, 70],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20]
            ]
        ],
        aTimesX: [
            ["5:00:00", "5:05:00", "5:10:00", "5:15:00", "5:20:00"],
            ["6:00:00", "6:05:00", "6:10:00", "6:15:00", "6:20:00"],
            ["7:00:00", "7:05:00", "7:10:00", "7:15:00", "7:20:00"]
        ]
    }
]

/*for (let i = 0; i < 100; i++) {
    let aa = {
        APName: i,
        t1: true,
        t2: false,
        t3: false,
        listData: [
            [
                { time: "2022-03-16 10:00", loadRateBefore: "25", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 11:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ],
            [
                { time: "2022-03-16 12:00", loadRateBefore: "35", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 13:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ],
            [
                { time: "2022-03-16 14:00", loadRateBefore: "45", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" },
                { time: "2022-03-16 15:00", loadRateBefore: "20", loadRateAfter: "30", interferenceRateBefore: "30", interferenceRateAfter: "35", retransmissionRateBefore: "30", retransmissionRateAfter: "40", biterrorRateBefore: "45", biterrorRateAfter: "50", channekUtilizationRateBefore: "25", channekUtilizationRateAfter: "55" }
            ]
        ],
        radios: ["Radio1", "Radio2", "Radio3"],
        show1: "show1",
        show2: "show2",
        showEchartByRadio: true,
        showTableByRadio: false,
        ajustDataRadio: [
            [
                [20, 30, 10, 50, 70, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70]
            ],
            [
                [50, 30, 10, 50, 70, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70]
            ],
            [
                [10, 30, 10, 50, 70, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30, 20, 30, 10, 50, 70],
                [20, 20, 20, 20, 20, 20, 30, 10, 50, 70]
            ]
        ],
        aTimesX: [
            ["17:00:00", "17:05:00", "17:10:00", "17:15:00", "17:20:00", "17:25:00", "17:30:00", "17:35:00", "17:40:00", "17:45:00"],
            ["18:00:00", "18:05:00", "18:10:00", "18:15:00", "18:20:00", "18:25:00", "18:30:00", "18:35:00", "18:40:00", "18:45:00"],
            ["19:00:00", "19:05:00", "19:10:00", "19:15:00", "19:20:00", "19:25:00", "19:30:00", "19:35:00", "19:40:00", "19:45:00"]
        ]
    }
    oAllAPs.push(aa)
}*/
const oAllAPs = reactive([])
oAllAPs.push(...testData)
</script>
<style scoped>
.ajustbutton {
    position: absolute;
    top: 55px;
    right: 10px;
}
.search_input {
    width: 80%;
}
.show1 {
    display: inline-block;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border: 1px solid #617cf0;
    background-color: #617cf0;
    border-radius: 9px;
    font-size: 11px;
    font-family: PingFang SC;
    color: #ffffff;
    /* margin-left: 10px; */
}
.show2 {
    display: inline-block;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    border: 1px solid #617cf0;
    border-radius: 9px;
    font-size: 11px;
    font-family: PingFang SC;
    color: #617cf0;
}
.drop1 {
    width: 100px;
    position: relative;
    height: 44px;
    margin-left: 10px;
}
.icondown {
    width: 14px;
    height: 14px;
}
.hide {
    display: none;
}
.show {
    display: block;
    position: absolute;
    z-index: 10;
    background: #ffffff;
    left: 0px;
    border: 1px solid #f7f7f7;
}
.changebutton {
    margin-right: 10px;
    display: inline-block;
    margin-right: 10px;
    position: absolute;
    right: 10px;
}
.ajustContent2_line1 {
    height: 44px;
    line-height: 44px;
    position: relative;
    background: #ffffff;
    border-bottom: 1px solid #d8d8d8;
    padding-left: 20px;
}
.ajustContent2_apname {
    display: inline-block;
    color: #617cf0;
}
.space {
    margin-right: 10px;
}
.dropline {
    border: 1px solid #f7f7f7;
}
:deep(.van-collapse-item__content) {
    padding: 0;
}
.echart_wrap {
    background: #ffffff;
}
.page-content {
    padding-bottom: 200px;
}
.ajustContent_wrap2 {
    padding-bottom: 150px;
}
.line {
    width: 1px;
    height: 14px;
    background: #333333;
    display: inline-block;
    margin-left: 10px;
    line-height: 44px;
}
.wrap2_bg {
    margin-bottom: 10px;
}
.circle {
    display: inline-block;
    border: 3px solid #666666;
    background-color: transparent;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    margin-right: 10px;
}
.ajustpoint {
    text-align: right;
    padding-right: 20px;
    color: #666666;
    padding-top: 10px;
}
</style>
