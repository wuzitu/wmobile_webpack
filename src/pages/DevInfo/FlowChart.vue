<template>
  <!-- <span class="nodata" v-if="bIfEmpty">{{ t("DevInfo.Empty") }}</span> -->
    <v-chart class="chart" :option="option"></v-chart>
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

import { ref,defineComponent, reactive ,watch, watchEffect} from "vue"

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
        aLegend:Array,
        aTimes: Array,
        aUpLink: Array,
        aDownLink:Array
    },
    setup: (props) => {
        const { t } = useI18n()
        //aLegend
        // const sDown = t("DevInfo.downflow")
        // const sUp = t("DevInfo.upflow")
        //aUpLink = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
        //aDownLink = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
        //aTimes = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
        let sDown = ref("")
        let sUp = ref("")
        let aTimes = ref([])
        let aUpLink = ref([])
        let aDownLink = ref([])
        // let bHaveUpLink = props.aUpLink && props.aUpLink.length
        // let bHaveDownLink = props.aDownLink && props.aDownLink.length
        // let bHaveTimes = props.aTimes && props.aTimes.length
        sDown.value = (props.aLegend && props.aLegend[0]) || "N/A"
        sUp.value = (props.aLegend && props.aLegend[1]) || "N/A"
        aTimes.value = props.aTimes || []
        aUpLink.value = props.aUpLink || []
        aDownLink.value = props.aDownLink || []
        console.log("props update")

        let option = reactive({
            width: "85%",
            height: 142,
            legend:{
                orient:"horizontal",//图例方向
                right: "right",
                top: "14rem",
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
            color: ["#EEEEEE"],
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
                    top:102,
                    left: "15rem",
                    right: 0,
                    containLabel: true,
                    height: "42rem",
                    width:"98%"
                }, {
                    show: false,
                    top: "140rem",
                    bottom:"20rem",
                    left: "50rem",
                    right:0,
                    height: 0,
                    zlevel:100
                }, {
                    show: false,
                    top: 60,
                    bottom: 50,
                    left: "15rem",
                    right:0,
                    containLabel: true,
                    width:"98%",
                    height: "42rem"
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

                },
                {
                    gridIndex: 1,
                    type: "category",
                    position: "center",
                    boundaryGap:false,
                    splitNumber:5,
                    max:11,
                    axisLine:{
                        show: true,
                        lineStyle:{
                            type:"dashed",
                            color:"#EEEEEE"
                        }
                    },
                    splitLine:{
                        show: true,
                        lineStyle:{
                            type:"dashed",
                            color:"#EEEEEE"
                        }
                    },
                    axisTick: {
                        show: true
                    },
                    zlevel:200,
                    axisLabel: {
                        show: true,
                        align: "center",
                        textStyle: {
                            color: "#666666",
                            fontSize: 12
                        }
                    },
                    data: aTimes.value,
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
                            color: "#666666",
                            fontSize: 12,
                        }
                    },
                    splitNumber:1,
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
                },
                {
                    gridIndex: 2,
                    type: "value",
                    position: "left", //双Y轴一个翻转一个不翻转
                    min:0,
                    max:100,
                    splitNumber:1,
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
                    name:sUp.value,
                    type:"line",
                    data:aUpLink.value,
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
                    name:sDown.value,
                    symbol: "none",
                    smooth: true,
                    type:"line",
                    data:aDownLink.value,
                    areaStyle: {
                        color:"rgba(255, 218, 205, 1)"
                    },
                    lineStyle:{
                        color:"rgba(255, 106, 56, 1)"
                    }
                }
            ]
        })
        const updateChart = (props,option) => {
            sDown.value = (props.aLegend && props.aLegend[0]) || "N/A"
            sUp.value = (props.aLegend && props.aLegend[1]) || "N/A"
            aTimes.value = props.aTimes || []
            aUpLink.value = props.aUpLink || []
            aDownLink.value = props.aDownLink || []

            option.legend.data[0].name = sUp
            option.legend.data[1].name = sDown
            option.xAxis[1].data = aTimes
            option.series[0].name = sUp
            option.series[1].name = sDown
            option.series[0].data = aUpLink
            option.series[1].data = aDownLink


            return { option }
        
        }
        watch(props,(newValue,oldValue) => {
            updateChart(newValue,option)
        });
        return { option }
    }
})


</script>

<style scoped>
.chart {
  height: 180px;
  margin-top: 0;
  
}

.nodata {
    height: 50px;
    width: 50px;
}
</style>