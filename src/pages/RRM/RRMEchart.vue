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
        radioindex: Number,
        echartData: Object
    },
    setup: (props) => {
        const { t } = useI18n()
        const before = t("RRM.before")
        const after = t("RRM.after")
        const lengend1 = t("RRM.legend1")
        const lengend2 = t("RRM.legend2")
        const lengend3 = t("RRM.legend3")
        const lengend4 = t("RRM.legend4")
        const lengend5 = t("RRM.legend5")
        let option = ref({
            width: "90%",
            // height: 200,
            backgroundColor: "#fff",
            tooltip: {
                trigger: "axis",
                formatter: function (oData) {
                    var sTempt = ""
                    for (let ii = 0; ii < oData.length; ii++) {
                        if (ii == 0) {
                            sTempt += oData[ii].name + "<br/>"
                        }
                        sTempt += oData[ii].seriesName + ":" + oData[ii].value + "%" + "<br/>"
                        // if (ii % 2 == 0) {
                        // sTempt += oData[ii].seriesName + "(" + before + "):" + oData[ii].value + "%" + "<br/>"
                        // } else {
                        //     sTempt += oData[ii].seriesName + "(" + after + "):" + oData[ii].value + "%" + "<br/>"
                        // }
                    }
                    return sTempt
                }
            },
            color: ["#AB61F0", "#FF6A38", "#F43E3B", "#617CF0", "#00AF6D"],
            legend: {
                top: 5,
                icon: "rect",
                // show: false,
                left: 10,
                data: [lengend1, lengend2, lengend3, lengend4, lengend5],
                selected: { [lengend1]: true, [lengend2]: false, [lengend3]: false, [lengend4]: false, [lengend5]: false }
            },
            grid: {
                left: "3%",
                right: "4%",
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
                data: props.echartData.aTimesX[props.radioindex]
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} %"
                }
            },

            series: [
                {
                    name: lengend1,
                    type: "line",
                    data: props.echartData.ajustDataRadio[props.radioindex][0]
                },
                {
                    name: lengend2,
                    type: "line",
                    data: props.echartData.ajustDataRadio[props.radioindex][1]
                },
                {
                    name: lengend3,
                    type: "line",
                    data: props.echartData.ajustDataRadio[props.radioindex][2]
                },
                {
                    name: lengend4,
                    type: "line",
                    data: props.echartData.ajustDataRadio[props.radioindex][3]
                },
                {
                    name: lengend5,
                    type: "line",
                    data: props.echartData.ajustDataRadio[props.radioindex][4]
                }
            ]
        })

        return { option }
    }
})
</script>

<style scoped>
.echarts-box {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0.5rem 0.425rem 0.4rem 0.425rem;
    display: inline-block;
}

.chart {
    width: 100%;
    height: 250px;
}
</style>
