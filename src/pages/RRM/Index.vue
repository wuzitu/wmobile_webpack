<template>
    <box-title :titleName="rrmTitle">
        <span class="line"></span>
        <span class="drop1">
            <span @click="ondropControl">{{ ajustDrop }}</span>
            <svg-icon :icon-class="icDropDown" class="icondown" @click="ondropControl"></svg-icon>
            <div :class="dropControl">
                <!-- <div @click="selectDrop(0)" class="dropline">{{ ajustDataMsg }}</div> -->
                <div @click="selectDrop(1)">{{ ajustEffectaMsg }}</div>
            </div>
        </span>
    </box-title>

    <div class="ajustContent_wrap1">
        <van-tabs v-model:active="ajustactive" type="card" color="#617CF0" title-inactive-color="#333333">
            <van-tab :title="$t('RRM.searchByTime')">
                <!--按时间显示-->
                <ajust-by-time :ajustDataByTime="oAjustDataBytime"></ajust-by-time>
            </van-tab>
            <van-tab :title="$t('RRM.searchByAP')">
                <!--按AP显示-->
                <div class="wrap_byAP">
                    <van-search v-model="value" :placeholder="searchPlaceholder" />
                    <ajust-by-a-p :ajustDataByAP="oAjustDataByAP"></ajust-by-a-p>
                </div>
            </van-tab>
        </van-tabs>
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
import { useRouter } from "vue-router"
const router = useRouter()
const { t } = useI18n()
const searchPlaceholder = t("RRM.searchPlaceholder")
const rrmTitle = t("RRM.rrmtitle")
const ajustDataMsg = t("RRM.ajustmsgchange")
const ajustEffectaMsg = t("RRM.ajustmsg")
let ajustactive = ref(0)
let ajustDrop = ref(ajustDataMsg)
let dropControl = ref("hide")
let icDropDown = ref("ic_list_down")
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
    } else {
        router.push({
            path: "/RRM/Index2"
        })
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
/*for (let i = 0; i < 300; i++) {
    let aa = {
        APname: i,
        ajustdatas: [
            { time: "2022-03-16 16：00：00", radio: "radio1", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" },
            { time: "2022-03-16 16：00：00", radio: "radio2", reason: "覆盖", chalbefore: "10", chalafter: "11", powerbefore: "12", powerafter: "13", bwbefore: "14", bwafter: "15" }
        ]
    }
    oAjustDataByAP.push(aa)
}*/

let jumpAPDetail = (apname) => {
    router.push({
        path: "/DevInfo/AP/AP"
    })
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
.ajustbutton {
    position: absolute;
    top: 55px;
    right: 10px;
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
</style>
