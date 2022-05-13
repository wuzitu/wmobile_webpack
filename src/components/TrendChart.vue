<template>
    <v-chart class="chart" :option="option" />
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart } from "echarts/charts"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from "echarts/components"

import { ref, defineComponent } from "vue"

use([CanvasRenderer, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent])

export default defineComponent({
    components: {
        VChart
    },
    provide: {
        [THEME_KEY]: "light"
    },
    props: {
        xaxisData: Object,
        yaxisData: Array
    },
    setup: (props) => {
        const option = ref({
            colorBy: "series",
            grid: {
                x: 35,
                y: 19,
                x2: 15,
                y2: 30
            },
            xAxis: {
                type: "category",
                boundaryGap: false,
                data: props.xaxisData,
                axisTick: { //决定是否显示坐标刻度
                    alignWithLabel: true,
                    show: false,
                    lineStyle: {
                        type: "dashed",
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: "dashed",
                        color: "#eeeeee"
                    }
                },
                axisLabel: {
                    color: "#666666",
                    padding: [0, 0, 0, 22]
                }
            },
            yAxis: {
                type: "value",
                splitLine: {
                    lineStyle: {
                        type: "dashed"
                    }
                },
            },

            series: [
                {
                    type: "line",
                    symbol: "none",
                    smooth: true,
                    lineStyle: {
                        type: "solid",
                        color: "#617CF0",
                        width: 1
                    },
                    areaStyle: {
                        color: "#617CF0",
                        opacity: 0.25,
                    },
                    data: props.yaxisData
                }
            ]
        })

        return { option }
    }
})

</script>

<style scoped>
.chart {
    background-color: #FFFFFF;
    height: 150px;
}
</style>