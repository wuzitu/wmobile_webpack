<template>
    <div>
        <box-title :titleName="topologyTitle"></box-title>
        <div class="chartContiner">
            <div class="legend_continer">
                <div class="legend_row">
                    <span class="dot"></span>
                    <span>{{ ONLINE + GatewayNum }}</span>
                </div>
                <div class="legend_row">
                    <span class="dot"></span>
                    <span>{{ OFFLINE + SwitchNum }}</span>
                </div>
            </div>
            <div class="toolbox">
                <div class="toolbox_button" @click="gotoDetail">
                    <svg-icon icon-class="ic_detail" class="iconStyle"></svg-icon>
                    <span class="text">详图</span>
                </div>
                <div class="split-line"></div>
                <div class="toolbox_button" @click="onRefresh">
                    <svg-icon icon-class="ic_refresh" class="iconStyle"></svg-icon>
                    <span class="text">刷新</span>
                </div>
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
import CloudImg from "@/frame/assets/img/ic_logo_cloudnet2.svg"
import InternetImg from "@/frame/assets/img/img_internet@3x.png"
import GatewayImg from "@/frame/assets/img/ic_gateway.svg"
import SwitchImg from "@/frame/assets/img/ic_switch.svg"
import APImg from "@/frame/assets/img/ic_ap_f.svg"
import ClientImg from "@/frame/assets/img/ic_phone.svg"

// import { off } from "process"

use([CanvasRenderer, GraphChart, TitleComponent, TooltipComponent, LegendComponent, LinesChart, GridComponent, UniversalTransition])
const { t } = useI18n()
const topologyTitle = ref(t("DashBoard.topology"))
const GATEWAY = t("MENU.gateway")
const SWITCH = t("MENU.switch")
const AP = t("MENU.ap")
const CLIENT = t("MENU.terminal")
const ONLINE = t("DashBoard.online")
const OFFLINE = t("DashBoard.offline")

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

const X1 = 147 //左侧cloud
const X2 = 230 //右侧internet
const X3 = X1 + (X2 - X1) / 2 //中间分割点
const Y1 = 39 //第一行Y坐标
const Y3 = 118 //第二行Y坐标
const Y2 = Y1 + (Y3 - Y1) / 2 + 5 //第一行和第二行之间分叉点Y坐标
const Y4 = 192.5 //第三行Y坐标
const Y5 = 270 //第四行Y坐标
const Y6 = 353 //第5行Y坐标

// let ImgPath = "image://" + "@/frame/assets/img/"
let graphData = [
    {
        name: "Cloud",
        nodeType: "root",
        symbol: "image://" + CloudImg,
        value: [X1, Y1], //使用2d坐标系的时候，要用value的形式，不能用x y
        symbolSize: [53, 58]
    },
    {
        name: "Internet",
        value: [X2, Y1],
        nodeType: "root",
        label: {
            show: true,
            position: [-23.5, -29.5],
            formatter: "{Internet|}\n{Text|Internet}",
            rich: {
                Internet: {
                    width: 47,
                    height: 47,
                    lineHeight: 47,
                    align: "center",
                    backgroundColor: {
                        image: InternetImg
                    }
                },
                Text: {
                    width: 41.5,
                    height: 12,
                    align: "center",
                    fontSize: 12,
                    lineHeight: 12,
                    padding: [5, 0, 0, 0]
                }
            }
        }
    },
    {
        name: "Gateway",
        text: GATEWAY,
        symbol: "image://" + GatewayImg,
        value: [X3, Y3],
        symbolSize: [76, 34],
        online: 2,
        total: 5
    },
    {
        name: "Switch",
        text: SWITCH,
        symbol: "image://" + SwitchImg,
        value: [X3, Y4],
        symbolSize: [76, 23],
        online: 1,
        total: 3
    },
    {
        name: "AP",
        text: AP,
        symbol: "image://" + APImg,
        value: [X3, Y5],
        symbolSize: [40, 40],
        online: 20,
        total: 50
    },
    {
        name: "Client",
        text: CLIENT,
        symbol: "image://" + ClientImg,
        value: [X3, Y6],
        symbolSize: [21, 40],
        total: 500,
        nodeType: "client"
    }
]

graphData.forEach(function (oNode, index) {
    if ("root" == oNode.nodeType) {
        return
    } else if ("client" == oNode.nodeType) {
        oNode.label = {
            show: true,
            position: [0, -8],
            width: oNode.symbolSize[0],
            formatter: "{WhiteSpace1|}{CountNum|" + oNode.total + "}\n{Type|" + oNode.text + "}",
            rich: {
                WhiteSpace1: {
                    width: oNode.symbolSize[0] //根据图标尺寸进行计算
                },
                CountNum: {
                    align: "center",
                    verticalAlign: "top",
                    width: 32,
                    height: 13,
                    fontSize: 10,
                    fontFamily: "PingFang SC",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    backgroundColor: "#617CF0",
                    borderRadius: 8,
                    padding: [2, 0, 0, 0], //微调文字，使其上下居中
                    lineHeight: oNode.symbolSize[1] + 13 //根据图标尺寸进行计算
                },
                Type: {
                    align: "center",
                    // width:oNode.symbolSize[0],
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#666666",
                    fontFamily: "PingFang SC"
                }
            }
        }
    } else {
        oNode.label = {
            show: true,
            position: [0, -8],
            width: oNode.symbolSize[0],
            formatter: "{WhiteSpace1|}{CountNum|" + oNode.online + "/" + oNode.total + "}\n{Type|" + oNode.text + "}",
            rich: {
                WhiteSpace1: {
                    width: oNode.symbolSize[0] //根据图标尺寸进行计算
                },
                CountNum: {
                    align: "center",
                    verticalAlign: "top",
                    width: 32,
                    height: 13,
                    fontSize: 10,
                    fontFamily: "PingFang SC",
                    fontWeight: 500,
                    color: "#FFFFFF",
                    backgroundColor: "#617CF0",
                    borderRadius: 8,
                    padding: [2, 0, 0, 0],
                    lineHeight: oNode.symbolSize[1] + 13 //根据图标尺寸进行计算
                },
                Type: {
                    align: "center",
                    // width:oNode.symbolSize[0],
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#666666",
                    fontFamily: "PingFang SC"
                }
            }
        }
    }
})

let linksData = [
    {
        coords: [
            [X1, Y1 + 33],
            [X1, Y2]
        ]
    },
    {
        coords: [
            [X2, Y1 + 33],
            [X2, Y2]
        ]
    },
    {
        coords: [
            [X1, Y2],
            [X2, Y2]
        ]
    },
    {
        coords: [
            [X3, Y2],
            [X3, Y3 - 20]
        ]
    },
    {
        coords: [
            [X3, Y3 + 40],
            [X3, Y4 - 20]
        ]
    },
    {
        coords: [
            [X3, Y4 + 35],
            [X3, Y5 - 30]
        ]
    },
    {
        coords: [
            [X3, Y5 + 40],
            [X3, Y6 - 30]
        ]
    }
]
let option = ref({
    tooltip: {
        trigger: "item"
        // formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
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
            max: 345,
            positon: "top",
            show: false,
            type: "value"
        }
    ],
    yAxis: [
        {
            min: 0,
            max: 405,
            show: false,
            inverse: true,
            type: "value"
        }
    ],
    series: [
        {
            name: "TopologyChart",
            type: "graph",
            animation: false,
            coordinateSystem: "cartesian2d", //使用二维的直角坐标系
            roma: false,
            zlevel: 2,
            data: graphData,
            links: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            }
        },
        {
            name: "Lines",
            type: "lines",
            coordinateSystem: "cartesian2d",
            zlevel: 1,
            lineStyle: {
                type: "solid",
                width: 1,
                color: "#617CF0"
            },
            data: linksData
        }
    ]
})
console.log(option)
</script>

<style scoped>
/* scoped内只对组件作用 */
.chartContiner {
    height: 405px;
    width: 345px;
    position: relative; /* 父元素需要设定relative，子元素的absolute才会生效 */
    text-align: center;
    font-weight: 60px;
    background: #ffffff;
    margin: 15px;
}
.legend_continer {
    width: 100px;
    height: 100px;
    position: absolute;
    text-align: left;
    line-height: 20px;
    z-index: 999;
}
.legend_continer .dot {
    width: 6px;
    height: 6px;
    background: #00af6d;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
.toolbox {
    position: absolute;
    right: 0px;
    bottom: 0px;
    z-index: 10;
    width: 24px;
    height: 76px;
    background: #ffffff;
    border: 1px solid #9e9e9e;
    border-radius: 4px;
    padding: 8px 5px 8px 5px;
}
.toolbox .split-line {
    height: 1px;
    background: #9e9e9e;
    margin: 5px 0 5px 0;
}
.toolbox .toolbox_button {
    width: 24px;
}
.toolbox .toolbox_button .iconStyle {
    width: 16px;
    height: 16px;
    margin: 0 auto;
    display: block;
}
.toolbox .toolbox_button .text {
    width: 24px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    text-align: center;
    margin: 0 auto;
    display: block;
}
</style>
