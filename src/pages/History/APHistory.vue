<template>
    <div>
        <div>
             <part-title :titleName="RC('quantityTrend')"></part-title>
        <History-Chart></History-Chart>
        </div>
        <div class="bottom-part">
            <part-title :titleName="RC('APHistoryDta')"></part-title>
            <history-search :placeholder="RC('inputBoxPrompt') "></history-search>
            <div class="ap-detail-box">
                <div class="ap-detail" v-for="item in APList" :key="item">
                <div class="first-line">
                    <span class="ap-name">{{item.APName}}</span>
                    <span :class="item.onlineStatus == 'online' ? 'online' : 'offline'" class="online-status">AP</span>
                </div>
                <div class="second-line">
                    <span class="ap-model">{{ RC('model') }}{{ '：' + item.model }}</span>
                </div>
                <div class="third-line">
                    <span class="line-time">{{ RC('time') }}{{ '：' + item.time }}</span>
                    <span class="event">{{ RC('event') }}{{ '：' + item.event }}</span>
                </div>
                <div class="right">
                    <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import HistoryChart from "./HistoryChart.vue"
import partTitle from "./PartTitle.vue"
import HistorySearch from "./HistorySearch.vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
const { t } = useI18n()
let RC = (str) => {
    return t("History." + str)
}
const APList = ref([
    {
        onlineStatus: "online",
        APName: "AP1",
        model: "WA5300",
        time: "2022-03-15 16:00:00",
        event: "online"
    },
    {
        onlineStatus: "offline",
        APName: "AP2",
        model: "WA5300",
        time: "2022-03-15 16:00:00",
        event: "offline"
    },
    {
        onlineStatus: "offline",
        APName: "AP3",
        model: "WA5300",
        time: "2022-03-15 16:00:00",
        event: "offline"
    }
])

</script>
<style scoped>
.bottom-part{
    width: 100%;
    background-color: #FFFFFF;
}
.ap-detail{
    width: 345px;
    border-bottom: 1px solid #D8D8D8;
    margin-left: 15px;
    margin-top: 11px;
}
.ap-name{
    font-size: 14px;
    color: #333333;

}
.online-status{
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
.online{
    background-color: #21B480;
}
.offline{
    background-color: #999999;
}
.ap-model, .third-line span{
    font-size: 13px;
    color: #666666;
    line-height: 20px;
}
.event{
    margin-left: 20px;
}
.event::before {
    content: '|';
    position: relative;
    left: -10px;
    color: #999999;
}
.right{
    position: relative;
    left: 337px;
    top: -40px;
}
.goApView {
    width: 12px;
    height: 12px;
}
</style>