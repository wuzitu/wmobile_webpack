<template>
    <v-chart class="chart" :option="option" />
</template>

<script>
import VChart, { THEME_KEY } from "vue-echarts"
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { LineChart } from "echarts/charts"
import { useI18n } from "vue-i18n"
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
        const { t } = useI18n()
        const sDown  = t("DevInfo.downflow")
        const sUp  = t("DevInfo.upflow")
        const option = ref({
            width: "92%",
            height: 142,
            legend:{
                orient:"horizontal",//图例方向
                right: "center",
                top: 0,
                bottom:0,
                icon: "rect",
                itemWidth:10,
                itemHeight:10,
                data:[
                    {
                        name:sUp,
                        itemStyle:{
                            color: "rgba(97, 124, 240, 1)"
                        },
                    },
                    {
                        name:sDown,
                        itemStyle:{
                            color:"rgba(255, 106, 56, 1)",
                        },

                    }
                ]
            },
            color: ["#3398DB"],
            tooltip : {
                trigger: "axis",
                axisPointer : { // 坐标轴指示器，坐标轴触发有效
                    type : "shadow" // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid:[ //用于调整X轴以及Y轴的位置
                {
                    show: false,
                    bottom: 50,
                    top:120,
                    left: 0,
                    right: 200,
                    containLabel: true,
                    height: 50,
                }, {
                    show: false,
                    top: 120,
                    left: 47,
                    height: 0,
                    zlevel:100
                }, {
                    show: false,
                    top: 70,
                    bottom: 50,
                    left: 0,
                    right:200,
                    containLabel: true,
                    height: 50
                }
            ],
            xAxis : [
                {
                    type: "category",
                    position: "bottom",
                    axisLine: {
                        show: false,
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                    },
                    data: [],

                }, {
                    gridIndex: 1,
                    type: "category",
                    position: "center",
                    axisLine: {
                        show: true
                    },
                    axisTick: {
                        show: true
                    },
                    zlevel:200,
                    axisLabel: {
                        show: true,
                        align: "center",
                        textStyle: {
                            color: "#323232",
                            fontSize: 12
                        }
                    },
                    data: ["00:00", "06:00", "12:00", "18:00", "24:00"],
                },
                {
                    gridIndex: 2,
                    type: "category",
                    position: "top",
                    axisLine: {
                        show: false
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                    },
                    data: [],
                }
            ],
            yAxis : [
                {
                    type: "value",
                    inverse: true, //echarts Y轴翻转属性,
                    position: "left", //位置属性
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#646464",
                            fontSize: 12,
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(0,162,255,0.08)",
                            width: 1,
                        }
                    },
                    min:0,
                    max:100,
                },
                {
                    gridIndex: 1, //对应的是grid  通过grid设置X Y相对位置
                    show: false,
                }, {
                    gridIndex: 2,
                    type: "value",
                    position: "left", //双Y轴一个翻转一个不翻转
                    min:0,
                    max:100,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#646464",
                            fontSize: 12,
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(0,162,255,0.08)",
                            width: 1,
                        }
                    }
                }
            ],
            series : [
                {
                    gridIndex:0, //选取调整好的轴,调整图形是向上还是向下
                    name:sUp,
                    type:"line",
                    data:[0, 50, 45,80,100,85,30, 0],
                    xAxisIndex: 2,
                    symbol: "none",
                    smooth: true,
                    yAxisIndex: 2,
                    itemStyle:{
                        color:"#B23AEE"
                    },
                    areaStyle: {
                        color:"rgba(215, 222, 251, 1)"
                    },
                    lineStyle:{
                        color:"rgba(97, 124, 240, 1)"
                    }
                },
                {
                    gridIndex:2, // 选取调整好的轴,调整图形是向上还是向下
                    name:sDown,
                    symbol: "none",
                    smooth: true,
                    type:"line",
                    data:[0, 50, 45, 60, 80,100,85,30, 0],
                    areaStyle: {
                        color:"rgba(255, 218, 205, 1)"
                    },
                    lineStyle:{
                        color:"rgba(255, 106, 56, 1)"
                    }
                }
            ] })

        return { option }
    }
})

</script>

<style scoped>
.chart {
  height: 180px;
  margin-top: 14px;
}
</style>