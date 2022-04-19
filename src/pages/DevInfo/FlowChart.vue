<template>
    <v-chart class="chart" :option="option" />
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart } from "echarts/charts"
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent,
    TransformComponent,
    ToolboxComponent
} from "echarts/components"

import { ref,defineComponent } from "vue"

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent,
    GridComponent, DatasetComponent, TransformComponent, ToolboxComponent])

export default defineComponent({
    name: "CpuChart",
    components: {
        VChart
    },
    provide: {
        [THEME_KEY]: "light"
    },
    props: {
        chartName: String,
        aTimes: Array,
        ChartData: Array
    },
    setup: (props) => {
        let lineColor = ""
        let areaColor = ""
        switch(props.chartName){
            case "CPU":
                lineColor = "rgba(244, 62, 59, 1)"
                areaColor = "rgba(252, 207, 206, 0.25)"
                break
            case "Storage":
                lineColor = "rgba(16, 180, 118, 1)"
                areaColor = "rgba(0, 175, 109, 1)"
                break
            case "Temperature":
                lineColor = "rgba(255, 226, 66, 1)"
                areaColor = "rgba(255, 225, 62, 1)"
                break
            default:
                lineColor = "rgba(244, 62, 59, 1)"
                areaColor = "rgba(252, 207, 206, 0.25)"
                break
        }
        const option = ref({
            width: "90%",
            height: 85,
            colorBy:"series",
            grid: {
                left: 15,
                right: 0,
                bottom: "60%",
                top:25,
                containLabel: true
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: props.aTimes
            },
            yAxis: {
                type: "value",
                axisLabel: {
                    formatter: "{value} %"
                }
            },

            series: [
                {
                    // name: props.alegendData[0],
                    type: "line",
                    symbol: "none",
                    smooth: true,
                    lineStyle:{
                        type:"solid",
                        color: lineColor
                    },
                    areaStyle: {
                        color:areaColor
                    },
                    data: props.ChartData
                }
            ]
        })

        return { option }
    }
})

</script>

<style scoped>
.chart {
  height: 150px;
}
</style>