<template>
    <div class="echarts-box">
        <v-chart class="chart" :option="option" :autoresize="true" />
    </div>
</template>

<script>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { PieChart } from "echarts/charts"
import { LineChart } from "echarts/charts"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from "echarts/components"
import VChart, { THEME_KEY } from "vue-echarts"
import { ref, defineComponent, defineProps } from "vue"

use([CanvasRenderer, PieChart, LineChart, TitleComponent, TooltipComponent, LegendComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent])

export default defineComponent({
    name: "HelloWorld",
    components: {
        VChart
    },
    provide: {
        [THEME_KEY]: "dark"
    },
    setup: (props) => {
        const option = ref({
            width: "90%",
            // height: 200,
            tooltip: {
                trigger: "axis"
            },
            color: ["#4472C5"],
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
                data: ["17:00:00", "17:05:00", "17:10:00", "17:15:00", "17:20:00", "17:25:00", "17:30:00", "17:35:00", "17:40:00", "17:45:00", "17:50:00", "17:55:00", "18:00:00", "18:05:00", "18:10:00", "18:15:00", "18:20:00", "18:25:00", "18:30:00", "18:35:00"]
            },
            yAxis: {
                type: "value"
                // axisLabel: {
                //     formatter: "{value} %"
                // }
            },
            series: [
                {
                    name: "数量",
                    type: "line",
                    symbol: "none",
                    data: [10, 30, 18, 20, 20, 20, 20, 20, 23, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
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
    /* height: 100%; */
    /* background: #073055; */
    box-sizing: border-box;
    padding: 0.5rem 0.425rem 0.4rem 0.425rem;
    display: inline-block;
    /* .echart {
    width: 100%;
    height: 100%;
  } */
}

.chart {
    width: 100%;
    height: 250px;
}
</style>
