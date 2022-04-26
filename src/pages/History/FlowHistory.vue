<template>
    <div>
        <div>
            <part-title :titleName="RC('gateway')">
                <span class="equipment-model">
                    MSG360
                </span>
            </part-title>
            <History-Chart></History-Chart>
        </div>
        <div class="flow-detail-box">
            <part-title :titleName="RC('upDownTrafficData')"></part-title>
            <div class="flow-detail" v-for="item in flowtimeData" :key="item">
            <div>
                    <svg-icon icon-class="ic_time" class="iconleft"></svg-icon>
                    <span class="flow-time">{{ RC('time') }}{{ '：' + item.time }}</span>
                    </div>
                    <div class="traffic">
                    <span class="uplink-traffic">{{ RC('uplinkTraffic') }}{{ '：' + item.uplinkTraffic }}</span>
                    <span class="downlink-traffic">{{ RC('downlinkTraffic') }}{{ '：' + item.downlinkTraffic }}</span>
                    </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HistoryChart from "./HistoryChart.vue"
import partTitle from "./PartTitle.vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("History." + str)
}
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
.flow-detail-box{
    width: 100%;
    background-color: #FFFFFF;
    margin-top: 11px;
}
.flow-detail{
    width: 345px;
    border-bottom: 1px solid #D8D8D8;
    margin-left: 15px;
    margin-top: 11px;
    height: 54px;
}
.iconleft{
    width: 16px;
    height: 16px;
}
.flow-time{
    display: inline-block;
    color:#333333;
    margin-left: 7px;
}
.traffic span{
    font-size: 13px;
    color: #666666;
}
.downlink-traffic{
    margin-left: 20px;
}
.downlink-traffic::before {
    content: '|';
    position: relative;
    left: -10px;
    color: #999999;
}
</style>