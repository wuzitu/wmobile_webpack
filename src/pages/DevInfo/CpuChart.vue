<template>
    <div class="cpu-chart">
        <box-title class="title" :titleName="sTitle"></box-title>
        <div class="chart">
            <area-chart :chartName="chartName" :aTimes="aTimes" :ChartData="aData" />
        </div>
    </div>

</template>

<script setup>
import { defineProps,ref } from "vue"
import { useI18n } from "vue-i18n"
import AreaChart from "./AreaChart"
import BoxTitle from "@/components/BoxTitle.vue"

const { t } = useI18n()

const props = defineProps({
    chartName: String,
    aTimes: Array,
    ChartData: Array
})

const sTitle = t("DevInfo.cpumonitor")

let chartName = ref(props.chartName)
let aTimes = [...props.aTimes]
let aData = [...props.ChartData]
</script>

<style scoped>
.cpu-chart {
  height: 179px;
  background-color: #FFFFFF;
  width: 375px;
  margin-top: 8px;
}

</style>