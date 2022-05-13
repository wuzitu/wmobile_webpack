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
    <div class="ajustContent_wrap1">
        <van-tabs v-model:active="ajustactive" type="card" color="#617CF0" title-inactive-color="#333333">
            <van-tab :title="$t('RRM.InterferenceByGloble')">
                <!--按全局显示-->
                <div class="byGloble_wrap">
                    <div class="changebutton_g">
                        <span class="changebutton">
                            <span :class="show1" @click="onChangeGloble($event, 0)">{{ t("RRM.Internet") }}</span>
                            <span class="space"></span>
                            <span :class="show2" @click="onChangeGloble($event, 1)">{{ t("RRM.Externet") }}</span>
                        </span>
                    </div>
                    <div v-if="globleExtranetShow" class="globleIntranet"><r-r-m-echart :aTimesXData="allData.XData" :seriesData="allData.YData" chartType="globle"></r-r-m-echart></div>
                    <div v-if="globleIntranetShow" class="globleExtranet"><r-r-m-echart :aTimesXData="allData1.XData" :seriesData="allData1.YData" chartType="globle"></r-r-m-echart></div>
                </div>
            </van-tab>
            <van-tab :title="$t('RRM.InterferenceByAP')">
                <!--按AP显示-->
                <van-search v-model="searchVal" :placeholder="searchPlaceholder" @search="onSearch" @cancel="onCancel" @clear="onCancel" action-text="" />
                <van-collapse v-model="activeNames_AP">
                    <van-collapse-item v-for="(a1, indexa1) in testData" :name="a1.APName">
                        <template #title>
                            <span class="ajustContent2_apname" @click="jumpAPDetail(a1.APName)">{{ a1.APName }}</span>
                            <!-- <select-radio :selectOptions="radios" :index_AP="indexa1" @changeSelect="selectedRadio"></select-radio> -->
                        </template>
                        <div class="contents">
                            <div class="checkradio">
                                <select-radio :selectOptions="a1.radios" :index_AP="indexa1" @changeSelect="selectedRadio"></select-radio>
                            </div>
                            <div class="changebutton_ap">
                                <span class="changebutton">
                                    <span :class="a1.show1" @click="onChangeShowType($event, a1, 0)">{{ t("RRM.Internet") }}</span>
                                    <span class="space"></span>
                                    <span :class="a1.show2" @click="onChangeShowType($event, a1, 1)">{{ t("RRM.Externet") }}</span>
                                </span>
                            </div>
                            <div v-if="a1.showGloble">
                                <div v-if="a1.t1">
                                    <r-r-m-echart :radioindex="0" :aTimesXData="a1.aTimesX" :seriesData="a1.ajustData"></r-r-m-echart>
                                </div>
                                <div v-if="a1.t2">
                                    <r-r-m-echart :radioindex="1" :aTimesXData="a1.aTimesX" :seriesData="a1.ajustData"></r-r-m-echart>
                                </div>
                                <div v-if="a1.t3">
                                    <r-r-m-echart :radioindex="2" :aTimesXData="a1.aTimesX" :seriesData="a1.ajustData"></r-r-m-echart>
                                </div>
                            </div>
                            <div v-if="a1.showAP">
                                <div v-if="a1.t1">
                                    <r-r-m-echart :radioindex="0" :aTimesXData="a1.aTimesX1" :seriesData="a1.ajustData1"></r-r-m-echart>
                                </div>
                                <div v-if="a1.t2">
                                    <r-r-m-echart :radioindex="1" :aTimesXData="a1.aTimesX1" :seriesData="a1.ajustData1"></r-r-m-echart>
                                </div>
                                <div v-if="a1.t3">
                                    <r-r-m-echart :radioindex="2" :aTimesXData="a1.aTimesX1" :seriesData="a1.ajustData1"></r-r-m-echart>
                                </div>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
import { ref, reactive, toRef, provide, getCurrentInstance, onMounted } from "vue"
import RRMEchart from "@/pages/RRM/RRMEchart.vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle.vue"
import SelectRadio from "@/pages/RRM/SelectRadio.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const { t } = useI18n()
const searchPlaceholder = t("RRM.searchPlaceholder")
const rrmTitle = t("RRM.rrmtitle")
const ajustDataMsg = t("RRM.ajustmsgData")
const ajustEffectaMsg = t("RRM.interference")
let ajustactive = ref(0)
let ajustDrop = ref(ajustEffectaMsg)
let dropControl = ref("hide")
let icDropDown = ref("ic_list_down")
let radioindex = ref(0)
let activeNames_AP = ref(["aaaa"])
let show1 = ref("show1")
let show2 = ref("show2")
let globleExtranetShow = ref(true)
let globleIntranetShow = ref(false)
let searchVal = ref("")
//全网切换网内和周边
let onChangeGloble = (event, arr2) => {
    if (arr2 == 0) {
        if (event.target.className == "show1") {
            return false
        } else {
            globleExtranetShow.value = true
            globleIntranetShow.value = false
            show1.value = "show1"
            show2.value = "show2"
        }
    } else {
        if (event.target.className == "show1") {
            return false
        } else {
            globleExtranetShow.value = false
            globleIntranetShow.value = true
            show1.value = "show2"
            show2.value = "show1"
        }
    }
}
//AP 切换网内和周边
let onChangeShowType = (event, item, arr3) => {
    if (arr3 == 0) {
        if (event.target.className == "show1") {
            return false
        } else {
            item.showGloble = true
            item.showAP = false
            item.show1 = "show1"
            item.show2 = "show2"
        }
    } else {
        if (event.target.className == "show1") {
            return false
        } else {
            item.showGloble = false
            item.showAP = true
            item.show1 = "show2"
            item.show2 = "show1"
        }
    }
}
//切换 调整数据和射频干扰
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
//切换radio
const selectedRadio = (e) => {
    onClickTabRadio(e[1], testData[e[0]]) //radio下标 AP调整信息
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
//跳转至Ap详情
let jumpAPDetail = (apname) => {
    router.push({
        path: "/DevInfo/AP/AP"
    })
}
/*const { proxy } = getCurrentInstance()
const $req = proxy.$req
const rrmData = reactive()
const getConf = async () => {
    let o = $req.getTableInstance("HistoryList2")
    let response = await $req.getAll([o])
    rrmData = $req.getTableRows("HistoryList2", response)

}*/
//全局
let allData = reactive({}) //全局内网
let allData1 = reactive({}) //全局外网
allData["XData"] = ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:22", "15:33", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
allData["YData"] = [
    ["2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5"],
    ["7", "8", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5"]
]
allData1["XData"] = ["00:05", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:22", "15:33", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
allData1["YData"] = [
    ["12", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5"],
    ["17", "8", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5", "2", "5"]
]
// //测试300条数据
// allData["XData"] = []
// allData["YData"] = []
// let a1 = []
// let a2 = []
// for (let i = 0; i < 300; i++) {
//     allData["XData"].push(i)

//     a1.push(1)
//     a2.push(2)
// }
// allData["YData"].push(a1, a2)

//AP列表
let testData = reactive([])
let testData1 = [
    {
        APName: "AP111",
        t1: true,
        t2: false,
        t3: false,
        show1: "show1",
        show2: "show2",
        showGloble: true,
        showAP: false,
        radios: ["Radio1", "Radio2", "Radio3"],
        aTimesX: [
            ["2022-04-27T11:54:06", "2022-04-27T11:55:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"]
        ],
        aTimesX1: [
            ["2022-04-27T11:54:06", "2022-04-27T11:55:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"]
        ],
        ajustData: [
            [
                ["1", "9"],
                ["3", "5"]
            ],
            [
                ["4", "9"],
                ["8", "5"]
            ],
            [
                ["14", "9"],
                ["13", "5"]
            ]
        ],
        ajustData1: [
            [
                ["3", "9"],
                ["3", "5"]
            ],
            [
                ["6", "9"],
                ["8", "5"]
            ],
            [
                ["10", "9"],
                ["13", "5"]
            ]
        ]
    },
    {
        APName: "AP222",
        t1: true,
        t2: false,
        t3: false,
        show1: "show1",
        show2: "show2",
        showGloble: true,
        showAP: false,
        radios: ["Radio1", "Radio2", "Radio3"],
        aTimesX: [
            ["2022-04-27T11:54:06", "2022-04-27T11:56:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"]
        ],
        aTimesX1: [
            ["2022-04-27T11:54:06", "2022-04-27T11:56:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"],
            ["2022-04-27T11:54:06", "2022-04-27T11:54:06"]
        ],
        ajustData: [
            [
                ["6", "9"],
                ["2", "5"]
            ],
            [
                ["2", "9"],
                ["8", "5"]
            ],
            [
                ["4", "9"],
                ["3", "5"]
            ]
        ],
        ajustData1: [
            [
                ["6", "9"],
                ["2", "5"]
            ],
            [
                ["2", "9"],
                ["8", "5"]
            ],
            [
                ["4", "9"],
                ["3", "5"]
            ]
        ]
    }
]
testData.push(...testData1)
const onSearch = (val) => {
    let flag = false
    for (let i = 0; i < testData1.length; i++) {
        if (testData1[i].APName == val) {
            console.log("yes")
            flag = true
            testData.length = 0
            testData.push(testData1[i])
        }
    }
    if (!flag) {
        console.log("no")
        testData.length = 0
    }
}
const onCancel = () => {
    testData.length = 0
    testData.push(...testData1)
}
</script>
<style scoped>
.ajustContent_wrap1 {
    padding-top: 20px;
    background: #ffffff;
}
.search_input {
    width: 80%;
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
.ajustContent2_apname {
    display: inline-block;
    color: #617cf0;
}
.dropline {
    border: 1px solid #f7f7f7;
}
:deep(.van-collapse-item__content) {
    padding: 0;
}
.line {
    width: 1px;
    height: 14px;
    background: #333333;
    display: inline-block;
    margin-left: 10px;
    line-height: 44px;
}
.checkradio {
    margin: 10px 0 10px 15px;
}
.changebutton {
    display: inline-block;
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
.space {
    margin-right: 10px;
}
.byGloble_wrap {
    margin-top: 20px;
}
.changebutton_g {
    position: absolute;
    z-index: 1000;
    left: 15px;
}
.changebutton_ap {
    position: absolute;
    z-index: 1;
    left: 15px;
}
</style>
