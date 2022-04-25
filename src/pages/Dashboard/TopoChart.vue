<template>
    <div>
        <box-title :titleName="topologyTitle"></box-title>
        <div class="chartContiner">
            <div class="legend_continer">
                <div class="legend_row">
                    <van-icon name="circle" style="color: red; font-weight: bold" />
                    <span>{{ GATEWAY + " : " + GatewayNum }}</span>
                </div>
                <div class="legend_row">
                    <van-icon name="circle" style="color: black; font-weight: bold" />
                    <span>{{ SWITCH + " : " + SwitchNum }}</span>
                </div>
                <div class="legend_row">
                    <van-icon name="circle" style="color: blue; font-weight: bold" />
                    <span>{{ AP + " : " + APNum }}</span>
                </div>
            </div>
            <div class="toolbox">
                <van-button class="toolbox_button" type="primary" @click="gotoDetail">详图</van-button>
                <van-button class="toolbox_button" type="primary" @click="onRefresh">刷新</van-button>
            </div>
            <v-chart class="topologyChart" :option="option" :autoresize="true" />
        </div>
    </div>
</template>

<script setup>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { GraphChart, LinesChart } from "echarts/charts"
import VChart from "vue-echarts"
import { UniversalTransition } from "echarts/features"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { useRouter } from "vue-router"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components"
import { ref } from "vue"
import CloudImg from "@/frame/assets/img/cloud.png"
import InternetImg from "@/frame/assets/img/internet.png"
import GatewayImg from "@/frame/assets/img/MSG360-4-PWR-F.png"
import SwitchImg from "@/frame/assets/img/Switch.png"
import APImg from "@/frame/assets/img/WA6520-C_T.png"

// import { off } from "process"

use([CanvasRenderer, GraphChart, TitleComponent, TooltipComponent, LegendComponent, LinesChart, GridComponent, UniversalTransition])
const { t } = useI18n()
const topologyTitle = ref(t("DashBoard.topology"))
const GATEWAY = t("MENU.gateway")
const SWITCH = t("MENU.switch")
const AP = t("MENU.ap")
const router = useRouter()

const gotoDetail = () => {
    // const paramsData = {}
    // router.push({ path:`/DevInfo/${devData.devName}/${devData.devType}`})
    router.push("/TopoChartDetail")
}
const onRefresh = () => {
    /* getData */
    /* refresh option */
    /* refresh legend */
}

let GatewayNum = 20
let SwitchNum = 10
let APNum = 5

const X1 = 130 //左侧cloud
const X2 = 270 //右侧internet
const X3 = X1 + (X2 - X1) / 2 //中间分割点
const Y1 = 60 //第一行Y坐标
const Y2 = 150 //第二行Y坐标
const Y3 = 250 //第三行Y坐标
const Y4 = 350 //第四行Y坐标
const Y5 = Y1 + (Y2 - Y1) / 2 //第一行和第二行之间分叉点Y坐标

// let ImgPath = "image://" + "@/frame/assets/img/"
let graphData = [
    {
        name: "Cloud",
        symbol: "image://" + CloudImg,
        value: [X1, Y1], //使用2d坐标系的时候，要用value的形式，不能用x y
        symbolSize: [62, 40],
    },
    {
        name: "Internet",
        symbol: "image://" + InternetImg,
        value: [X2, Y1],
        symbolSize: [40, 40]
    },
    {
        name: "Gateway",
        text:GATEWAY,
        symbol: "image://" + GatewayImg,
        value: [X3, Y2],
        symbolSize: [125, 30]
    },
    {
        name: "Switch",
        text:SWITCH,
        symbol: "image://" + SwitchImg,
        value: [X3, Y3],
        symbolSize: [158, 30]
    },
    {
        name: "AP",
        text:AP,
        symbol: "image://" + APImg,
        value: [X3, Y4],
        symbolSize: [50, 50]
    }
]
let linksData = [
    {
        coords: [
            [X1, Y1 + 20],
            [X1, Y5]
        ]
    },
    {
        coords: [
            [X2, Y1 + 20],
            [X2, Y5]
        ]
    },
    {
        coords: [
            [X1, Y5],
            [X2, Y5]
        ]
    },
    {
        coords: [
            [X3, Y5],
            [X3, Y2 - 20]
        ]
    },
    {
        coords: [
            [X3, Y2 + 40],
            [X3, Y3 - 20]
        ]
    },
    {
        coords: [
            [X3, Y3 + 40],
            [X3, Y4 - 30]
        ]
    }
]
let option = ref({
    tooltip: {
        trigger: "item"
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // legend:{
    //     show:true,
    //     zlevel:4,
    //     left:"left",
    //     top:"top",
    //     orient:"vertical",
    //     ailgn:"left",
    //     padding:10,
    //     itemGap:10,
    //     itemWidth:10,
    //     itemHeight:10,
    //     data:[
    //         {
    //             name:GATEWAY + ":" + 20,
    //             icon:"circle"
    //         },
    //         {
    //             name:SWITCH + ":" + 20,
    //             icon:"circle"
    //         },
    //         {
    //             name:couldupdate + ":" + 20,
    //             icon:"circle"
    //         },
    //     ]
    // },
    grid: [
        {
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            show: false //test
            // borderColor: '#eee',
        }
    ],
    xAxis: [
        {
            min: 0,
            max: 400,
            // gridIndex: 0,
            positon: "top",
            show: false,
            type: "value"
        }
    ],
    yAxis: [
        {
            min: 0,
            max: 400,
            // gridIndex: 0,
            show: false,
            inverse: true,
            type: "value"
        }
    ],
    series: [
        {
            name: "TopologyChart",
            type: "graph",
            animation:false,
            // layout: 'none',
            coordinateSystem: "cartesian2d", //使用二维的直角坐标系
            // force: null,
            // draggable: true,
            // roam: true,
            // xAxisIndex:0,
            // yAxisIndex:0,
            roma: false,
            // zoom:1,
            zlevel: 2,
            data: graphData,
            links: [],
            // symbolKeepAspect: true,
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            },
            label: {
                show: true,
                // position: "insideTopRight",
                // offset: [10, -15],
                // color: "#fff",
                // fontSize: 10,
                // backgroundColor: "rgba(78, 144, 249, 1)",
                // borderRadius: 8,
                // padding: 3,
                // lineHeight: 12,
                // formatter: function () {
                //     return "10/30"
                // }
                position: "bottom",
                // offset: [10, -15],
                color: "rgba(104, 104, 105, 1)",
                fontSize: 14,
                // backgroundColor: "rgba(78, 144, 249, 1)",
                borderRadius: 8,
                padding: 3,
                lineHeight: 12,
                formatter: function (params) {
                    return params.data.text || ""
                }
            }
        },
        {
            name: "Lines",
            type: "lines",
            // polyline: true,
            coordinateSystem: "cartesian2d",
            zlevel: 1,
            lineStyle: {
                type: "solid",
                width: 2,
                color: "#175064"
            },
            // effect: {
            //     show: true,
            //     trailLength: 0.1,
            //     symbol: "arrow",
            //     color: "orange",
            //     symbolSize: 8
            // },
            data: linksData
        }
    ]
})
// console.log(option)
</script>

<style scoped>
/* scoped内只对组件作用 */
.chartContiner {
    height: 400px;
    width: 344px;
    position: relative; /* 父元素需要设定relative，子元素的absolute才会生效 */
    /* padding-left: 10px; */
    /* padding-right: 10px; */
    text-align: center;
    font-weight: 60px;
    /* border:1px solid red; */
    background: #ffffff;
    /* padding: 10px; */
    /* flex: 1; */
    margin: auto;
}
.legend_continer {
    /* border: 1px solid green; */
    margin-top: 10px;
    /* margin-left: 2px; */
    width: 100px;
    height: 100px;
    position: absolute;
    text-align: left;
    line-height: 20px;
    z-index: 999;
}
.toolbox {
    position: absolute;
    right: 10px;
    bottom: 30px;
    width: 50px;
    z-index: 999;
}
.toolbox .toolbox_button {
    width: 50px;
    height: 25px;
    margin-bottom: 10px;
    word-break: keep-all; /* 不换行 */
}
</style>
