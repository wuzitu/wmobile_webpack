<template>
    <box-title :titleName="rrmTitle">
        <span class="drop1">
            <span @click="ondropControl">{{ ajustDrop }}</span>
            <svg-icon :icon-class="icDropDown" class="icondown" @click="ondropControl"></svg-icon>
            <div :class="dropControl">
                <div @click="selectDrop(0)" class="dropline">{{ ajustDataMsg }}</div>
                <div @click="selectDrop(1)">{{ ajustEffectaMsg }}</div>
            </div>
        </span>
    </box-title>

    <div v-if="ajustContent1" id="" class="ajustContent_wrap1">
        <van-tabs v-model:active="ajustactive" type="card" color="#617CF0">
            <van-tab :title="$t('RRM.searchByTime')">
                <!--按时间显示-->
                <ajust-by-time :ajustDataByTime="oAjustDataBytime"></ajust-by-time>
            </van-tab>
            <van-tab :title="$t('RRM.searchByAP')">
                <!--按AP显示-->
                <div class="wrap_byAP">
                    <van-search v-model="value" placeholder="请输入搜索关键词" />
                    <ajust-by-a-p :ajustDataByAP="oAjustDataByAP"></ajust-by-a-p>
                </div>
            </van-tab>
        </van-tabs>
    </div>

    <div v-if="ajustContent2" id="" class="ajustContent_wrap2">
        <!-- <input placeholder="请输入Ap名称、IP地址、序列号或者MAC地址" class="search_input" /> -->
        <van-search v-model="value" placeholder="请输入搜索关键词" />
        <div v-for="(item, index) in oAllAPs" class="wrap2_bg">
            <div class="ajustContent2_line1">
                <span class="ajustContent2_apname">{{ item.APName }}</span>
                <!-- <span class="drop1">
                    <span @click="ondropControl">{{ ajustDrop }}</span>
                    <svg-icon :icon-class="icDropDown" class="icondown" @click="ondropControlRadio"></svg-icon>
                    <div :class="dropControl">
                        <div @click="selectDrop(0)" class="dropline">Radio1</div>
                        <div @click="selectDrop(1)">Radio2</div>
                        <div @click="selectDrop(2)">Radio3</div>
                    </div>
                </span> -->
                <span class="changebutton">
                    <span :class="item.show1" @click="onChangeShowType($event, item, 0)">趋势图</span>
                    <span class="space"></span>
                    <span :class="item.show2" @click="onChangeShowType($event, item, 1)">列表</span>
                </span>
            </div>
            <!-- <button @click="onChangeShowType($event, item)">{{ $t("RRM.showType") }}</button> -->
            <div v-show="item.showEchartByRadio">
                <!--按radio显示echart图-->
                <van-tabs v-model:active="item.tabactivename" @click-tab="onClickTabRadio(item.APName, item.tabactivename, item)" type="card" color="#617CF0">
                    <van-tab v-for="(radio, index) in radios" :title="radio">
                        <div>------调整前 _______调整后</div>
                        <label class="cb1">
                            <input type="checkbox" class="checkboxchart" name="checkboxchart" checked="" :value="lengend1" @change="onChangeLengend(item)" v-model="item.checs[0]" />
                            {{ $t("RRM.legend1") }}
                        </label>
                        <label class="cb2">
                            <input type="checkbox" class="checkboxchart" name="checkboxchart" :value="lengend2" @change="onChangeLengend(item)" v-model="item.checs[1]" />
                            {{ $t("RRM.legend2") }}
                        </label>
                        <label class="cb3">
                            <input type="checkbox" class="checkboxchart" name="checkboxchart" :value="lengend3" @change="onChangeLengend(item)" v-model="item.checs[2]" />
                            {{ $t("RRM.legend3") }}
                        </label>
                        <label class="cb4">
                            <input type="checkbox" class="checkboxchart" name="checkboxchart" :value="lengend4" @change="onChangeLengend(item)" v-model="item.checs[3]" />
                            {{ $t("RRM.legend4") }}
                        </label>
                        <label class="cb5">
                            <input type="checkbox" class="checkboxchart" name="checkboxchart" :value="lengend5" @change="onChangeLengend(item)" v-model="item.checs[4]" />
                            {{ $t("RRM.legend5") }}
                        </label>
                        <r-r-m-echart :alegendData="alegends" :aTimesX="item.aTimesX" :rrmechartAjustData="item.ajustDataRadio" :selects="item.selects"></r-r-m-echart>
                    </van-tab>
                </van-tabs>
            </div>
            <div v-show="item.showTableByRadio">
                <!--按radio显示列表-->
                <van-tabs v-model:active="item.tabactivename2" @click-tab="onClickTabRadio(item.APName)" type="card" color="#617CF0">
                    <van-tab v-for="(radio, index) in radios" :title="radio">
                        <ajust-by-radio></ajust-by-radio>
                    </van-tab>
                </van-tabs>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import RRMEchart from "@/pages/RRM/RRMEchart.vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle.vue"
import AjustByAP from "@/pages/RRM/AjustByAP.vue"
import AjustByTime from "@/pages/RRM/AjustByTime.vue"
import AjustByRadio from "@/pages/RRM/AjustByRadio.vue"

const { t } = useI18n()
const rrmTitle = t("RRM.rrmtitle")
const ajustDataMsg = t("RRM.ajustmsgchange")
const ajustEffectaMsg = t("RRM.ajustmsg")
let ajustContent1 = ref(true)
let ajustContent2 = ref(false)
let ajustactive = ref(0)
const radios = ["Radio1", "Radio2", "Radio3"]
let ajustDrop = ref(ajustDataMsg)
const value1 = ref(0)
let dropControl = ref("hide")
let icDropDown = ref("ic_list_down")

const ondropControl = () => {
    console.log(icDropDown.value)
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
        ajustDrop.value = ajustDataMsg
        dropControl.value = "hide"
        icDropDown.value = "ic_list_down"
        ajustContent1.value = true
        ajustContent2.value = false
    } else {
        ajustDrop.value = ajustEffectaMsg
        dropControl.value = "hide"
        icDropDown.value = "ic_list_down"
        ajustContent1.value = false
        ajustContent2.value = true
    }
}

let oAjustDataBytime = [
    {
        ajustTime: "2022-03-16 16：00：00",
        ajustdatas: [
            { APName: "AP1", radio: "1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP1", radio: "2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP2", radio: "1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP2", radio: "2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" }
        ]
    },
    {
        ajustTime: "2022-03-16 15：00：00",
        ajustdatas: [
            { APName: "AP1", radio: "1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP1", radio: "2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP2", radio: "1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP2", radio: "2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" }
        ]
    },
    {
        ajustTime: "2022-03-16 17：00：00",
        ajustdatas: [
            { APName: "AP1", radio: "1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP1", radio: "2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP2", radio: "1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { APName: "AP2", radio: "2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" }
        ]
    }
]
let oAjustDataByAP = [
    {
        APname: "AP1",
        ajustdatas: [
            { time: "2022-03-16 16：00：00", radio: "radio1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { time: "2022-03-16 16：00：00", radio: "radio2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" }
        ]
    },
    {
        APname: "AP2",
        ajustdatas: [
            { time: "2022-03-16 16：10：00", radio: "radio1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { time: "2022-03-16 16：00：00", radio: "radio2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" }
        ]
    }
]
let onChangeShowType = (event, item, arr3) => {
    if (arr3 == 0) {
        if (event.target.className == "show1") {
            return false
        } else {
            event.target.className = "show1"
            event.target.nextElementSibling.nextElementSibling.className = "show2"
            item.showEchartByRadio = true
            item.showTableByRadio = false
        }
    } else {
        if (event.target.className == "show1") {
            return false
        } else {
            item.showEchartByRadio = false
            item.showTableByRadio = true
        }
    }

    if (item.showEchartByRadio == true) {
        item.show1 = "show1"
        item.show2 = "show2"
    } else {
        item.show1 = "show2"
        item.show2 = "show1"
    }
}
let lengend1 = t("RRM.legend1")
let lengend2 = t("RRM.legend2")
let lengend3 = t("RRM.legend3")
let lengend4 = t("RRM.legend4")
let lengend5 = t("RRM.legend5")
let rrmechartAjustData1 = ref([])
let rrmechartAjustData1_AP1Radio1 = [
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
]
let rrmechartAjustData1_AP1Radio2 = [
    [40, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
]
let rrmechartAjustData1_AP1Radio3 = [
    [50, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
    [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
    [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
]
let aTimesX1 = ["17:00:00", "17:05:00", "17:10:00", "17:15:00", "17:20:00", "17:25:00", "17:30:00", "17:35:00", "17:40:00", "17:45:00", "17:50:00", "17:55:00", "18:00:00", "18:05:00", "18:10:00", "18:15:00", "18:20:00", "18:25:00", "18:30:00", "18:35:00"]
let aTimesX2 = ["18:00:00", "18:05:00", "18:10:00", "18:15:00", "18:20:00", "18:25:00", "18:30:00", "18:35:00", "18:40:00", "18:45:00", "18:50:00", "18:55:00", "19:00:00", "19:05:00", "19:10:00", "19:15:00", "19:20:00", "19:25:00", "19:30:00", "19:35:00"]
let aTimesX3 = ["19:00:00", "19:05:00", "19:10:00", "19:15:00", "19:20:00", "19:25:00", "19:30:00", "19:35:00", "19:40:00", "19:45:00", "19:50:00", "19:55:00", "20:00:00", "20:05:00", "20:10:00", "20:15:00", "20:20:00", "20:25:00", "20:30:00", "20:35:00"]

const alegends = [lengend1, lengend2, lengend3, lengend4, lengend5]

let oAllAPs = ref([
    { APName: "AP1", show1: "show1", show2: "show2", tabactivename: "activeAP1", tabactivename2: "active2AP1", showEchartByRadio: true, showTableByRadio: false, ajustDataRadio: rrmechartAjustData1_AP1Radio1, ajustDataRadio1: rrmechartAjustData1_AP1Radio1, ajustDataRadio2: rrmechartAjustData1_AP1Radio2, ajustDataRadio3: rrmechartAjustData1_AP1Radio3, aTimesX: aTimesX1, aTimesX1: aTimesX1, aTimesX2: aTimesX2, aTimesX3: aTimesX3, selects: { [lengend1]: true, [lengend2]: false, [lengend3]: false, [lengend4]: false, [lengend5]: false }, checs: [true, false, false, false, false] },
    { APName: "AP2", show1: "show1", show2: "show2", tabactivename: "activeAP2", tabactivename2: "active2AP2", showEchartByRadio: true, showTableByRadio: false, ajustDataRadio: rrmechartAjustData1_AP1Radio1, ajustDataRadio1: rrmechartAjustData1_AP1Radio1, ajustDataRadio2: rrmechartAjustData1_AP1Radio2, ajustDataRadio3: rrmechartAjustData1_AP1Radio3, aTimesX: aTimesX1, aTimesX1: aTimesX1, aTimesX2: aTimesX2, aTimesX3: aTimesX3, selects: { [lengend1]: true, [lengend2]: false, [lengend3]: false, [lengend4]: false, [lengend5]: false }, checs: [true, false, false, false, false] }
    // { APName: "AP3", tabactivename: "activeAP3", tabactivename2: "active2AP3", showEchartByRadio: true, showTableByRadio: false }
])

const onClickTabRadio = (arr1, arr2, arr3) => {
    //切换radio
    for (let i in arr3.selects) {
        if (i == lengend1) {
            arr3.selects[i] = true
        } else {
            arr3.selects[i] = false
        }
    }
    arr3.checs = [true, false, false, false, false]
    if (arr2 == 1) {
        //radio2
        arr3.ajustDataRadio = rrmechartAjustData1_AP1Radio2
        arr3.aTimesX = arr3.aTimesX2
    } else if (arr2 == 2) {
        //radio3
        arr3.ajustDataRadio = rrmechartAjustData1_AP1Radio3
        arr3.aTimesX = arr3.aTimesX3
    } else {
        //radio1
        arr3.ajustDataRadio = rrmechartAjustData1_AP1Radio1
        arr3.aTimesX = arr3.aTimesX1
    }
}
let onChangeLengend = (arr1) => {
    //切换lengend
    if (event.target.checked) {
        arr1.selects[event.target.value] = true
    } else {
        arr1.selects[event.target.value] = false
    }
}
</script>
<style scoped>
.wrap_byAP {
    margin-top: 20px;
}
.ajustContent_wrap1 {
    padding-top: 20px;
    background: #ffffff;
}
ajustContent_wrap2 {
    background: #ffffff;
}
.ajustbutton {
    position: absolute;
    top: 55px;
    right: 10px;
}
.search_input {
    width: 80%;
}

.cb1 {
    color: #4472c5;
}
.cb2 {
    color: #ed7c30;
}
.cb3 {
    color: #80ff80;
}
.cb4 {
    color: #ff8096;
}
.cb5 {
    color: #800080;
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
    margin-left: 20px;
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
.wrap2_bg {
    background: #ffffff;
}
.ajustContent2_line1 {
    height: 44px;
    line-height: 44px;
    position: relative;
}
.ajustContent2_apname {
    display: inline-block;
}
.space {
    margin-right: 10px;
}
.dropline {
    border: 1px solid #f7f7f7;
}
</style>
