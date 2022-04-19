<template>
    <div class="store-chart">
        <box-title class="title" :titleName="sTitle"></box-title>
        <van-sticky :offset-top="38">
            <area-chart :chartName="chartName" :aTimes="aTimes" :ChartData="aData" />
        </van-sticky>
    </div>

</template>

<script setup>
import { defineProps,ref } from "vue"
import { useI18n } from "vue-i18n"
import { Sticky } from "vant"
import AreaChart from "./AreaChart"
import BoxTitle from "@/components/BoxTitle.vue"

const { t } = useI18n()

const props = defineProps({
    chartName: String,
    aTimes: Array,
    ChartData: Array
})

const sTitle = t("DevInfo.storemonitor")

let chartName = ref(props.chartName)
let aTimes = [...props.aTimes]
let aData = [...props.ChartData]
</script>

<style scoped>
.store-chart {
  height: 179px;
  background-color: #FFFFFF;
  width: 375px;
  margin-top: 8px;
}


</style>