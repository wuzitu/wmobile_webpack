<template>
    <div>
        <div>
            <part-title :titleName="RC('quantityTrend')"></part-title>
            <trend-chart :xaxisData="xaxisData" :yaxisData="yaxisData"></trend-chart>
        </div>
        <div class="bottom-part">
            <part-title :titleName="RC('APHistoryDta')"></part-title>
            <history-search :placeholder="RC('inputBoxPrompt')" @search="onSearch"></history-search>
            <div class="ap-detail-box">
                <div class="ap-detail" v-for="item in APList" :key="item">
                    <Cards :title="item.APName" :online="true" :type="item.onlineStatus == 'true' ? 'online' : ''"
                        :device="item.decice" @click="goToAPdetail(item)" rightIcon="ic_arrow"
                        rightIconPosition="middle">
                        <CardLine>
                            <cardItemVue :label="RC('model')">{{ '：' + item.model }}</cardItemVue>
                        </CardLine>
                        <CardLine>
                            <cardItemVue :label="RC('time')">{{ '：' + item.time }}</cardItemVue>
                            <cardItemVue :label="RC('event')">{{ '：' + item.event }}</cardItemVue>
                        </CardLine>
                    </Cards>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import TrendChart from "@/components/TrendChart.vue"
import partTitle from "./PartTitle.vue"
import HistorySearch from "./HistorySearch.vue"
import Cards from "@/components/Card/ShowCard.vue"
import cardItemVue from "@/components/Card/CardItem.vue"
import CardLine from "@/components/Card/CardLine.vue"
import { defineProps, ref, toRef, defineEmits } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("History." + str)
}
const router = useRouter()
const props = defineProps({
    aTimes: Array,
    ChartData: Array
})
const goToAPdetail = (item) => {
    const devData = {
        decice: "AP",
        "devName": item.APName,
        "devType": "AP",
        "onlinetime": "123456789201215",
        "ipaddress": "1.1.1.1",
        "devStatus": 2,
        "macaddress": "0000-0000-00001",
        "devSN": "123456789201215",
        "devVersion": "R2401",
        "isSupportPoe": true,
        "isSupportWan": true
    }
    router.push({ name: "DevInfo", params: devData })
}
let xaxisData = ref([{ value: "00:00", textStyle: { padding: [0, 0, 0, 22], color: "#666666" } }, { value: "06:00", textStyle: { color: "#666666" } }, { value: "12:00", textStyle: { color: "#666666" } }, { value: "18:00", textStyle: { color: "#666666" } }, { value: "24:00", textStyle: { padding: [0, 0, 0, -25], color: "#666666" } }])
let yaxisData = [5, 38, 47, 75, 59, 45]
const APList = ref([
    {
        onlineStatus: "true",
        APName: "AP1",
        model: "WA5300",
        time: "2022-03-15 16:00:00",
        event: "online",
        decice: "AP"
    },
    {
        onlineStatus: "false",
        APName: "AP2",
        model: "WA5300",
        time: "2022-03-15 16:00:00",
        event: "offline",
        decice: "AP"
    },
    {
        onlineStatus: "false",
        APName: "AP3",
        model: "WA5300",
        time: "2022-03-15 16:00:00",
        event: "offline",
        decice: "AP"
    }
])
const onSearch = (val) => {
    console.log(val)
}

</script>
<style scoped>
.bottom-part {
    width: 100%;
    margin-top: 11px;
    background-color: #FFFFFF;
}

.ap-detail {
    width: 345px;
    border-bottom: 1px solid #D8D8D8;
    margin-left: 15px;
    margin-top: 11px;
}

.ap-name {
    font-size: 14px;
    color: #333333;

}

.online-status {
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 18px;
    color: #FFFFFF;
    font-size: 11px;
    border-radius: 3px;
    text-align: center;
    margin-left: 5px;
}

.online {
    background-color: #21B480;
}

.offline {
    background-color: #999999;
}

.ap-model,
.third-line span {
    font-size: 13px;
    color: #666666;
    line-height: 20px;
}

.event {
    margin-left: 20px;
}

.event::before {
    content: '|';
    position: relative;
    left: -10px;
    color: #999999;
}

.right {
    position: relative;
    left: 337px;
    top: -40px;
}

.goApView {
    width: 12px;
    height: 12px;
}
</style>