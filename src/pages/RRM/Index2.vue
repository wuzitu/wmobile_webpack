<template>
    <box-title :titleName="rrmTitle">
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
                <select-radio :selectOptions="item.radios" :index_AP="index" @changeSelect="selectedRadio"></select-radio>
                <span class="changebutton">
                    <span :class="item.show1" @click="onChangeShowType($event, item, 0)">{{ t("RRM.showTypechange") }}</span>
                    <span class="space"></span>
                    <span :class="item.show2" @click="onChangeShowType($event, item, 1)">{{ t("RRM.showType") }}</span>
                </span>
            </div>

            <div v-show="item.showEchartByRadio" class="echart_wrap">
                <!--按radio显示echart图-->
                <!-- <div>------调整前 _______调整后</div> -->
                <!-- <label class="cb1">
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
                </label> -->
                <!-- <r-r-m-echart :alegendData="alegends" :aTimesX="item.aTimesX" :rrmechartAjustData="item.ajustDataRadio" :selects="item.selects"></r-r-m-echart> -->
                <div v-if="item.t1"><r-r-m-echart :echartData="item" :radioindex="0"></r-r-m-echart></div>
                <div v-if="item.t2"><r-r-m-echart :echartData="item" :radioindex="1"></r-r-m-echart></div>
                <div v-if="item.t3"><r-r-m-echart :echartData="item" :radioindex="2"></r-r-m-echart></div>
            </div>
            <div v-show="item.showTableByRadio">
                <!--按radio显示列表-->
                <div v-if="item.t1">
                    <ajust-effect-list :ajustEffectListData="item.listData[0]" :activeName="index + '0'"></ajust-effect-list>
                    <!-- <van-collapse v-model="activeNames">
                        <van-collapse-item v-for="(a1, indexa1) in item.listData[0]" :name="item + '0' + index + indexa1">
                            <template #title>
                                <div>{{ t("RRM.ajusttime") }}{{ a1.time }}</div>
                            </template>
                            <div class="contents">
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.loadBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.loadRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.loadRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.InterferenceBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.interferenceRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.interferenceRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.retransmissionBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.retransmissionRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.retransmissionRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.bitErrorBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.biterrorRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.biterrorRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.channelUtilizationBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.channekUtilizationRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.channekUtilizationRateAfter }}</span>
                                    </span>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse> -->
                </div>
                <div v-if="item.t2">
                    <ajust-effect-list :ajustEffectListData="item.listData[1]" :activeName="index + '1'"></ajust-effect-list>
                    <!-- <van-collapse v-model="activeNames">
                        <van-collapse-item v-for="(a1, indexa1) in item.listData[1]" :name="item + '1' + index + indexa1">
                            <template #title>
                                <div>{{ t("RRM.ajusttime") }}{{ a1.time }}</div>
                            </template>
                            <div class="contents">
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.loadBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.loadRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.loadRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.InterferenceBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.interferenceRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.interferenceRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.retransmissionBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.retransmissionRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.retransmissionRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.bitErrorBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.biterrorRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.biterrorRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.channelUtilizationBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.channekUtilizationRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.channekUtilizationRateAfter }}</span>
                                    </span>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse> -->
                </div>
                <div v-if="item.t3">
                    <ajust-effect-list :ajustEffectListData="item.listData[2]" :activeName="index + '2'"></ajust-effect-list>
                    <!-- <van-collapse v-model="activeNames">
                        <van-collapse-item v-for="(a1, indexa1) in item.listData[2]" :name="item + '2' + index + indexa1">
                            <template #title>
                                <div>{{ t("RRM.ajusttime") }}{{ a1.time }}</div>
                            </template>
                            <div class="contents">
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.loadBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.loadRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.loadRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.InterferenceBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.interferenceRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.interferenceRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.retransmissionBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.retransmissionRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.retransmissionRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.bitErrorBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.biterrorRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.biterrorRateAfter }}</span>
                                    </span>
                                </div>
                                <div class="toggle">
                                    <span class="toggleleft">{{ t("RRM.channelUtilizationBA") }}(%)</span>
                                    <span class="toggleright">
                                        <span class="before">{{ a1.channekUtilizationRateBefore }}</span>
                                        /
                                        <span class="after">{{ a1.channekUtilizationRateAfter }}</span>
                                    </span>
                                </div>
                            </div>
                        </van-collapse-item>
                    </van-collapse> -->
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
const activeNames = ref(["cc"])
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
let oAllAPs = reactive([
    {
        APName: "AP1",
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
                [20, 30, 10, 50, 70],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20]
            ],
            [
                [50, 30, 10, 50, 70],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20]
            ],
            [
                [10, 30, 10, 50, 70],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20],
                [30, 30, 30, 30, 30],
                [20, 20, 20, 20, 20]
            ]
        ],
        aTimesX: [
            ["17:00:00", "17:05:00", "17:10:00", "17:15:00", "17:20:00"],
            ["18:00:00", "18:05:00", "18:10:00", "18:15:00", "18:20:00"],
            ["19:00:00", "19:05:00", "19:10:00", "19:15:00", "19:20:00"]
        ]
    },
    {
        APName: "AP2",
        t1: true,
        t2: false,
        t3: false,
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
        radios: ["Radio1", "Radio2", "Radio3"],
        show1: "show1",
        show2: "show2",
        showEchartByRadio: true,
        showTableByRadio: false,
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
])
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
console.log(oAllAPs)

// let keyValue = ref(0)
let radioindex = ref(0)
const selectedRadio = (e) => {
    onClickTabRadio(e[1], oAllAPs[e[0]], e[0])
}

const onClickTabRadio = (arr1, arr2, arr3) => {
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
    /* padding-top: 0;
    padding-bottom: 0; */
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
</style>
