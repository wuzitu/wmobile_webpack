<template>
    <div>
        <div>
            <part-title :titleName="RC('gateway')">
                <span class="equipment-model">
                    {{ '：' + devmodel }}
                </span>
            </part-title>
            <div class="flow-chart-box">
           <FlowChart :aLegend="aLegend" :aUpLink="aUpLink" :aDownLink="aDownLink" :aTimes="aTimes"></FlowChart>
           </div>
        </div>
        <div class="flow-detail-box">
            <part-title :titleName="RC('upDownTrafficData')"></part-title>
            <div class="flow-detail" v-for="item in flowtimeData" :key="item">
                  <Cards>
                <template #title>
                    <svg-icon icon-class="ic_time" class="icon-left"></svg-icon>
                <div class="flow-time-box">
                    <span class="flow-time">{{ RC('time') }}{{ '：' + item.time }}</span>
                </div>
                </template>
                <CardLine>
                    <cardItemVue :label="RC('uplinkTraffic')">{{ '：' + item.uplinkTraffic }}</cardItemVue>
                    <cardItemVue :label="RC('downlinkTraffic')">{{ '：' + item.downlinkTraffic }}</cardItemVue>
                </CardLine>
            </Cards>
            </div>
        </div>
    </div>
</template>
<script setup>
import FlowChart from "@/components/FlowChart.vue"
import partTitle from "./PartTitle.vue"
import Cards from "@/components/Card/ShowCard.vue"
import cardItemVue from "@/components/Card/CardItem.vue"
import CardLine from "@/components/Card/CardLine.vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("History." + str)
}
let aLegend = ref([RC("downlinkTraffic"),RC("uplinkTraffic")])
let aUpLink = ref([])
let aDownLink = ref([])
let aTimes = ref([])
aDownLink.value = ["0","50","60", "48","35","52","65","73","69","64","72","100","85"]
aUpLink.value = ["0","50","60", "48","35","52","65","73","69","64","72","100","85"]
aTimes.value = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
const devmodel = " MSG360 "
const flowtimeData = ref([
    {
        time: "2022-04-23",
        uplinkTraffic: "100M",
        downlinkTraffic: "200M"
    },
    {
        time: "2022-04-24",
        uplinkTraffic: "300M",
        downlinkTraffic: "200M"
    },
    {
        time: "2022-04-25",
        uplinkTraffic: "200M",
        downlinkTraffic: "200M"
    }
])
</script>
<style scoped>
.equipment-model {
    color: #333333;
}
.flow-detail-box {
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 11px;
}
.flow-chart-box{
    background-color: #FFFFFF;
}

.flow-detail {
    width: 345px;
    border-bottom: 1px solid #D8D8D8;
    margin-left: 15px;
    margin-top: 11px;
}

.icon-left {
    width: 16px;
    height: 16px;
}
.flow-time-box{
   margin-left: 24px;
   margin-top: -22px;
}
.flow-time {
    display: inline-block;
    color: #333333;
    font-size: 14px;
    font-weight: Medium;
}

.traffic span {
    font-size: 13px;
    color: #666666;
}

.downlink-traffic {
    margin-left: 20px;
}

.downlink-traffic::before {
    content: '|';
    position: relative;
    left: -10px;
    color: #999999;
}
</style>