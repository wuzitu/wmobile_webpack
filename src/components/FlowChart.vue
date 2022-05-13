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

import { ref,defineComponent, reactive ,watch, watchEffect } from "vue"
import { tSNamedTupleMember } from "@babel/types"

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
        aDownLink:Array,
        sYName:String
    },
    setup: (props) => {
        const { t } = useI18n()
        //aLegend
        // const sDown = t("DevInfo.downflow")
        // const sUp = t("DevInfo.upflow")
        //aUpLink = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
        //aDownLink = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
        //aTimes = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
        let sYName = ref("")
        let sDown = ref("")
        let sUp = ref("")
        let aTimes = ref([])
        let aUpLink = reactive([])
        let aDownLink = reactive([])
        sDown.value = (props.aLegend && props.aLegend[0]) || "N/A"
        sUp.value = (props.aLegend && props.aLegend[1]) || "N/A"
        aTimes.value = props.aTimes || []
        aUpLink.value = props.aUpLink || []
        aDownLink.value = props.aDownLink || []
        sYName.value = props.sYName || "Mbps"
        console.log("props update")

        let option = reactive({
            width: "100%",//echart 整体宽度
            height: "100%",//echart 整体高度
            legend:{
                orient:"horizontal",//图例方向
                right: 0,//图例位置
                top:12,//图例位置
                icon: "rect",//图例样式
                itemWidth:10,//图例宽度
                itemHeight:10,//图例高度
                data:[
                    {
                        name:sUp,//图例对应上部数据名称
                        itemStyle:{
                            color: "rgba(97, 124, 240, 1)"
                        },
                    },
                    {
                        name:sDown,//对应上面图例模块颜色
                        itemStyle:{ //对应下面图例模块颜色
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
            grid:[ //坐标系内绘图网格，单个 grid 内最多可以放置上下两个 X 轴，左右两个 Y 轴 这里有三个grid
                {
                    show: false,//是否显示直角坐标系网络
                    top:86,//bottom top  left right  坐标系位置
                    left:0,
                    right:0,
                    height:42,
                    containLabel: true
                    // width:'100%',//height width 坐标系高和宽度
                    // backgroundColor:"red"  背景色  只有show：true时有用 调位置好帮手
                },
                {
                    show: false,
                    top: 150,
                    left: 0,
                    right:0,
                    height: 0,
                    containLabel: true,
                    width:"auto"
                },
                {
                    show: false,
                    top: 44,
                    left:0,
                    right:0,
                    height:42,
                    containLabel: true,//是否包含坐标系刻度标签
                }
            ],
            xAxis : [
                {
                    //对应
                    type: "category",//x轴对应网格
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
                    gridIndex: 1,//x轴对应网格 对应我们需要的x轴数据
                    type: "category",
                    position: "center",
                    boundaryGap:["100%","100%"],
                    minInterval:0,
                    axisLine:{
                        show: false,
                        onZero:true
                    },
                    splitLine:{
                        show: false,
                        onZero:true,
                        lineStyle:{
                            type:"dashed",
                            color:"#EEEEEE"
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        interval:2,
                        showMaxLabel:true,
                        showMinLabel:true,
                        textStyle: {
                            color: "#666666",
                            fontSize: "10px"
                        }
                    },
                    data: aTimes.value,
                },
                {
                    gridIndex: 2,//x轴对应网格
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
                { //gridIndex 0
                    type: "value",
                    inverse: true, //echarts Y轴翻转属性, 对应向下翻转的y轴
                    position: "left", //位置属性
                    nameTextStyle:{
                        color:"#999999",
                        fontSize:"11px",
                        fontFamily:"PingFang-SC-Medium",
                        align: "right"
                    },
                    minInterval:100,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            color: "#666666",
                        }
                    },
                    splitNumber:2,
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: "#EEEEEE",
                            width: 1,
                            type:"dashed",
                        }
                    },
                    min:0,
                    max:100,
                },
                {
                    //gridIndex 1
                    gridIndex: 1, //对应的是grid  通过grid设置X Y相对位置
                    show: false,
                },
                {
                    name: sYName,
                    gridIndex: 2,
                    type: "value",
                    position: "left", //双Y轴一个翻转一个不翻转
                    min:0,
                    max:100,
                    splitNumber:2,
                    minInterval:100,
                    nameTextStyle:{
                        color:"#999999",
                        fontSize:"11px",
                        fontFamily:"PingFang-SC-Medium",
                        align: "right"
                    },
                    axisTick: {
                        interval: 100
                    },
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
                            color: "#EEEEEE",
                            width: 1,
                            type:"dashed",
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
            option.series[0].data = aUpLink.value
            option.series[1].data = aDownLink.value


            return { option }

        }
        watch(props,(newValue,oldValue) => {
            updateChart(newValue,option)
        })
        return { option }
    }
})


</script>

<style scoped>
.chart {
  height: 150px;
  width: inherit;
  margin-left: 16px;
}

.nodata {
    height: 50px;
    width: 50px;
}
</style>