<template>
    <!-- this is a echart Name:
    {{ chartName }} -->
    <div class="echarts-box">
        <v-chart class="chart" :option="option" :autoresize="true" :notMerge="true" />
    </div>
</template>

<script>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { PieChart } from "echarts/charts"
import { LineChart } from "echarts/charts"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"
import { ref, defineComponent, defineProps, reactive, watch, inject } from "vue"
import { useI18n } from "vue-i18n"
use([CanvasRenderer, PieChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent])

export default defineComponent({
    name: "HelloWorld",
    components: {
        VChart
    },
    provide: {
        // [THEME_KEY]: "dark"
    },
    props: {
        chartType: String,
        radioindex: Number,
        aTimesXData: Array,
        seriesData: Array
    },
    setup: (props) => {
        const { t } = useI18n()
        const before = t("RRM.before")
        const after = t("RRM.after")
        const lengend1 = t("RRM.legend1")
        const lengend2 = t("RRM.legend2")
        let chartType = reactive(props.chartType)
        let xAxisVal = reactive()
        let seriesDatas = reactive()
        if (chartType == "globle") {
            xAxisVal = props.aTimesXData
            seriesDatas = props.seriesData
        } else {
            xAxisVal = props.aTimesXData[props.radioindex]
            seriesDatas = props.seriesData[props.radioindex]
        }

        let option = ref({
            // width: "90%",
            // height: 200,
            backgroundColor: "#fff",
            tooltip: {
                trigger: "axis"
            },
            color: ["#AB61F0", "#FF6A38"],
            legend: {
                // top: 15,
                icon: "rect",
                // show: false,
                right: "5%",
                data: [lengend1, lengend2]
            },
            grid: {
                left: "5%",
                // right: "50",
                bottom: 10,
                containLabel: true
            },
            toolbox: {
                feature: {
                    saveAsImage: {}
                }
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: xAxisVal,
                axisLabel: {
                    showMaxLabel: true, // 展示最大值
                    showMinLabel: true, // 展示最小值
                    formatter: function (value, index) {
                        if (index === 0) {
                            return "                " + value
                        }
                        if (index === xAxisVal.length - 1) {
                            return value + "                       "
                        }
                        return value
                    }
                }
            },
            yAxis: {
                type: "value"
            },
            series: [
                {
                    name: lengend1,
                    type: "line",
                    smooth: true,
                    data: seriesDatas[0]
                },
                {
                    name: lengend2,
                    type: "line",
                    smooth: true,
                    data: seriesDatas[1]
                }
            ]
        })

        return { option, xAxisVal, seriesDatas, chartType }
    }
})
</script>

<style scoped>
.echarts-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: inline-block;
}

.chart {
    width: 100%;
    height: 250px;
}
</style>
