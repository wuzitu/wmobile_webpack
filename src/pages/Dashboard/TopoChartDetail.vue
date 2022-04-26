<template>
    <div>
        <box-title :titleName="topologyTitle"></box-title>
        <div class="echartContiner">
            <v-chart class="topo-chart" ref="TopoChart" :option="option" :autoresize="true" :style="echartsStyle" draggable="true" />
            <div id="BtnBox" class="btn_box">
                <button id="BtnBig" class="btn btn-big" @click="zoom('+')">+</button>
                <button id="BtnSmall" class="btn btn-small" @click="zoom('-')">-</button>
                <button id="BtnList" class="btn btn-List">Mor</button>
                <button id="BtnExportImg" class="btn btn-exportImg" @click="exportImage">Img</button>
                <button id="BtnRefresh" class="btn btn-refresh" @click="onRefresh">Refresh</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { TreeChart } from "echarts/charts"
import VChart from "vue-echarts"
import { UniversalTransition } from "echarts/features"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { useRouter } from "vue-router"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components"
import { ref, onMounted } from "vue"
import CloudImg from "@/frame/assets/img/ic_logo_cloudnet2.svg"
import InternetImg from "@/frame/assets/img/img_internet@3x.png"
import GatewayImg from "@/frame/assets/img/ic_gateway.svg"
import SwitchImg from "@/frame/assets/img/ic_switch.svg"
import APImg from "@/frame/assets/img/ic_ap_f.svg"
import ClientImg from "@/frame/assets/img/ic_phone.svg"
import DisConnectImg from "@/frame/assets/img/disconnect.png"

// import { off } from "process"

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, TreeChart, GridComponent, UniversalTransition])
const { t } = useI18n()
const topologyTitle = ref(t("DashBoard.topology"))
// const router = useRouter()
let TopoChart = ref(null) //模板ref，获取dom元素节点，需放在setup中
let flag = true
let g_myChart = {}
const DeviceIcons = {
    "WA6520-C_T": APImg,
    "MSG360-4-PWR-F": GatewayImg,
    Switch: SwitchImg
}

const oJsonData = {
    SmartMC: {
        DeviceList: {
            Device: [
                {
                    Id: "0",
                    MacAddress: "30-B0-37-A5-79-A0",
                    Role: "1",
                    HostName: "H3C",
                    Model: "MSG360-4-PWR-F",
                    Hop: "0",
                    IpAddress: "127.0.0.1",
                    SerialNumber: "219801A2WY8217E000TZ",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "true"
                },
                {
                    Id: "1",
                    MacAddress: "00-E0-FC-00-51-00",
                    Role: "2",
                    HostName: "SW-1",
                    Model: "MSG360-4-PWR-F",
                    Hop: "2",
                    IpAddress: "192.168.2.2",
                    SerialNumber: "DPPMWWB123456",
                    Status: "1",
                    SysVersion: "7.1.070 Release 6338",
                    IrfCount: "1",
                    IsSnapshot: "false"
                },
                {
                    Id: "2",
                    MacAddress: "5C-A7-21-EE-F8-E0",
                    Role: "2",
                    HostName: "H3C",
                    Model: "Switch",
                    Hop: "1",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false"
                },
                {
                    Id: "3",
                    MacAddress: "5C-A7-21-EE-F8-E3",
                    Role: "2",
                    HostName: "H3C",
                    Model: "Switch",
                    Hop: "3",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false"
                },
                {
                    Id: "4",
                    MacAddress: "5C-A7-21-EE-F8-E4",
                    Role: "2",
                    HostName: "H3C",
                    Model: "Switch",
                    Hop: "4",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false"
                },
                {
                    Id: "5",
                    MacAddress: "5C-A7-21-EE-F8-E5",
                    Role: "2",
                    HostName: "H3C",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false"
                },
                {
                    Id: "6",
                    MacAddress: "5C-A7-21-EE-F8-E5",
                    Role: "2",
                    HostName: "H3C",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false"
                },
                {
                    Id: "7",
                    MacAddress: "5C-A7-21-EE-F8-E5",
                    Role: "2",
                    HostName: "H3C",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false"
                }
            ]
        },
        LinkRelation: {
            Relation: [
                {
                    SrcId: "0",
                    IfIndex: "1",
                    SrcMAC: "30-B0-37-A5-79-A0",
                    DesId: "2",
                    DesMAC: "5C-A7-21-EE-F8-E0",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "1",
                    IfIndex: "5",
                    SrcMAC: "00-E0-FC-00-51-00",
                    DesId: "2",
                    DesMAC: "5C-A7-21-EE-F8-E0",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "2",
                    IfIndex: "1",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "0",
                    DesMAC: "30-B0-37-A5-79-A0",
                    STPStatus: "false",
                    LinkStatus: "1"
                },
                {
                    SrcId: "2",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "1",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "2",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "4",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "4",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "2",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "3",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "2",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "2",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "3",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "4",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "5",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "5",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "4",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "4",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "6",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "5",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "4",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "4",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "7",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "7",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "4",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                }
            ]
        },
        StartProgress: {
            Role: "TM",
            Username: "admin"
        }
    }
}

/* 将关系图构造为树图 */
function transformRelationToTree(aDeviceList, aLinkRelation) {
    /* 构造树 */
    let oLinkRelation = {}
    let oDeviceList = {}
    aDeviceList.forEach(function (obj, index) {
        // obj.name = obj.Id;//echarts tree 索引为name
        obj.children = [] //add children
        oDeviceList[obj.Id] = obj
    })
    aLinkRelation.forEach(function (obj, index) {
        oLinkRelation[obj.Id] = obj
    })

    /* 原始数据连接关系是双份的，去掉重复数据 */
    let oTmpLinks = {}
    let aLinkRelationLite = aLinkRelation.concat() //copy
    for (let i = 0; i < aLinkRelationLite.length; i++) {
        let sIndex = [aLinkRelationLite[i].SrcId, aLinkRelationLite[i].DesId].sort().join("_") //将源id和目标id做成一个字符串
        if (!oTmpLinks[sIndex]) {
            oTmpLinks[sIndex] = {} //仅仅做一下记录
        } else {
            aLinkRelationLite.splice(i, 1) //如果有重复的，就删掉
            i-- //
        }
    }

    /* 遍历出独立节点 */
    let oTmpId = {}
    let aLoneyDevice = aDeviceList.concat() //copy
    for (let i = 0; i < aLinkRelationLite.length; i++) {
        if (!oTmpId[aLinkRelationLite[i].SrcId]) {
            oTmpId[aLinkRelationLite[i].SrcId] = {} //
        }
        if (!oTmpId[aLinkRelationLite[i].DesId]) {
            oTmpId[aLinkRelationLite[i].DesId] = {} //
        }
    }
    for (let i = 0; i < aLoneyDevice.length; i++) {
        if (oTmpId[aLoneyDevice[i].Id]) {
            aLoneyDevice.splice(i, 1) //
            i--
        }
    }
    aLoneyDevice.forEach(function (obj, index) {
        // obj["NodeType"] = "Lonely";//添加独立节点标识
    })

    function getChildren(oParent) {
        //oParent:当前元素 sData:需要遍历的元素
        if (!oParent) {
            console.log("linksData not match DeviceData")
            return
        }
        let aChildren = oParent.children

        for (let i = 0; i < aLinkRelationLite.length; i++) {
            if (oParent.Id == aLinkRelationLite[i].SrcId) {
                aChildren.push(oDeviceList[aLinkRelationLite[i].DesId])
                aLinkRelationLite.splice(i, 1)
                i--
            } else if (oParent.Id == aLinkRelationLite[i].DesId) {
                aChildren.push(oDeviceList[aLinkRelationLite[i].SrcId])
                aLinkRelationLite.splice(i, 1) //此方式是为了减少下次的遍历次数
                i--
            } else {
                continue
            }
        }
        for (let i = 0; i < aChildren.length; i++) {
            getChildren(aChildren[i])
        }
    }

    let oRoot = JSON.parse(JSON.stringify(aDeviceList[0])) //这里假定第id为0的就是根节点
    getChildren(oRoot)

    let oRootVisual = {
        //创建一个根节点，为云和互联网
        // name:"cloudAndInternet",
        children: [oRoot]
        // NodeType:"root",    //添加根节点标识
    }
    return oRootVisual
}

/* 设置节点的样式图 包括图标和文字的布局*/
function setNodeStyle(oTreeData) {
    /* 递归遍历子节点*/
    function setChildrenNode(aChildren) {
        aChildren.forEach(function (oChild, index) {
            let oNomalNode = {
                //普通节点
                name: oChild.Id,
                // height:90,
                label: {
                    position: [0, 0],
                    formatter: ["{WhiteContiner|}", "{DeviceIcon|}", "{DeviceName|" + oChild.HostName + "}", "{DeviceModel|" + oChild.Model + "}"].join("\n"),
                    rich: {
                        WhiteContiner: {
                            //设置一个宽度，撑开容器
                            width: 480,
                            height: 0
                        },
                        DeviceIcon: {
                            height: 60,
                            align: "center",
                            backgroundColor: {
                                image: DeviceIcons[oChild.Model]
                            }
                        },
                        DeviceName: {
                            height: 40,
                            align: "center",
                            fontSize: 26,
                            fontWeight: 500
                        },
                        DeviceModel: {
                            height: 20,
                            align: "center",
                            fontSize: 24
                        }
                    }
                }
            }
            Object.assign(oChild, oNomalNode) //根节点和样式 对象合并
            setChildrenNode(oChild.children) //递归遍历子节点的子节点
        })
    }

    let oRootNode = {
        //将cloud和internet做成一个整体，当做根节点，用富文本来实现
        name: "cloudAndInternet",
        // children:[oTreeData],
        height: 90,
        label: {
            // position: [0, 0],
            formatter: ["{WhiteContiner|}", "{Cloud|}{Internet|}", "{WhiteSpaceLeft|}{lineLeft|}{lineRight|}{WhiteSpaceRight|}", "{WhiteSpaceLeft2|}{IconDisConnectLeft|}{IconDisConnectRight|}{WhiteSpaceRight2|}", "{WhiteSpaceLeft|}{lineLeft|}{lineBottom|}{lineRight|}{WhiteSpaceRight|}"].join("\n"),
            rich: {
                WhiteContiner: {
                    //设置一个宽度，撑开容器
                    width: 480,
                    height: 0
                },
                Cloud: {
                    height: 80,
                    align: "left",
                    backgroundColor: {
                        image: CloudImg
                    }
                },
                Internet: {
                    height: 80,
                    align: "right",
                    backgroundColor: {
                        image: InternetImg
                    }
                },
                IconDisConnectLeft: {
                    height: 40,
                    align: "left",
                    backgroundColor: {
                        image: DisConnectImg
                    }
                },
                IconDisConnectRight: {
                    height: 40,
                    align: "right",
                    backgroundColor: {
                        image: DisConnectImg
                    }
                },
                WhiteSpaceLeft: {
                    width: 40,
                    height: 0,
                    align: "left"
                },
                WhiteSpaceRight: {
                    width: 40,
                    height: 0,
                    align: "right"
                },
                WhiteSpaceLeft2: {
                    width: 20,
                    height: 0,
                    align: "left"
                },
                WhiteSpaceRight2: {
                    width: 20,
                    height: 0,
                    align: "right"
                },
                lineLeft: {
                    borderWidth: 1, //以后需要全局
                    borderColor: "#000", //以后需要全局
                    width: 0.5,
                    height: 20,
                    align: "left"
                },
                lineBottom: {
                    borderWidth: 1, //以后需要全局
                    borderColor: "#000", //以后需要全局
                    width: 400,
                    height: 0.5,
                    verticalAlign: "bottom"
                },
                lineRight: {
                    borderWidth: 1, //以后需要全局
                    borderColor: "#000", //以后需要全局
                    width: 0.5,
                    height: 20,
                    align: "right"
                }
            }
        }
    }
    Object.assign(oTreeData, oRootNode) //根节点和样式 对象合并

    setChildrenNode(oTreeData.children) //遍历子节点

    return oTreeData
}

let oData = oJsonData.SmartMC
let aDeviceList = oData.DeviceList.Device
let aLinkRelation = oData.LinkRelation.Relation
let oTreeData = transformRelationToTree(aDeviceList, aLinkRelation)
let oTreeEcharts = setNodeStyle(oTreeData) //给节点添加label标签等样式

let option = ref({
    title: {},
    tooltip: {
        //提示框组件
        show: true,
        trigger: "item", //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
        triggerOn: "mousemove" //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
    },
    series: [
        {
            type: "tree", //树图topo
            id: 0,
            name: "tree1",
            symbol: "rect", // 长方形
            // symbolKeepAspect: "true", //是否在缩放时保持该图形的长宽比。
            symbolSize: function (value, params) {
                if (1 === params.dataIndex) {
                    //根节点index为1！！！
                    return [480, 160]
                } else {
                    return [480, 120]
                }
            }, //标记的大小，就是那个小圆圈，默认7
            // nodePadding:[],//自定义间距 需要修改echarts源码
            // roam:"move",      //是否开启鼠标缩放和平移漫游。可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            roam: false, //是否开启鼠标缩放和平移漫游。可以设置成 'scale' 或者 'move'。设置成 true 为都开启
            orient: "TB",
            edgeShape: "polyline", //树图在 正交布局 下，边的形状。分别有曲线和折线两种，对应的取值是 curve 和 polyline.
            edgeForkPosition: "50%", //正交布局下当边的形状是折线时，子树中折线段分叉的位置。这里的位置指的是分叉点与子树父节点的距离占整个子树高度的百分比。默认取值是 '50%'，可以是 ['0', '100%'] 之间。
            initialTreeDepth: 5, //树图初始展开的层级（深度）。如果设置为 -1 或者 null 或者 undefined，所有节点都将展开。
            label: {
                //每个节点所对应的标签的样式
                show: true,
                position: "inside",
                // offet:0,         //是否对文字进行偏移。默认不偏移。例如：[60, 80] 表示文字在横向上偏移 30，纵向上偏移 40。
                // align:"right",          //文字水平对齐方式，默认自动。可选：top，center，bottom //不要加！！否则收缩节点的时候，标签会偏移
                vcerticalAlign: "middle", //文字垂直对齐方式，默认自动。可选：top，middle，bottom
                fontSize: 9 //标签文字大小
            },
            leaves: {
                //叶子节点的特殊配置，如上面的树图示例中，叶子节点和非叶子节点的标签位置不同（叶子节点就是没有子节点的节点，子节点是相对于父节点来说的，它是父节点的下一层节点。）
                label: {
                    normal: {
                        // position: 'right',
                        // verticalAlign: 'middle',
                        // align: 'left'
                    }
                }
            },
            itemStyle: {
                //当symbol为图片的时候，下面的配置不生效
                color: "#fff" //填充色
                // borderColor:"#f00",
                // borderWidth:1,
                // borderType:"solid",
                // opacity: 1,
            },
            lineStyle: {
                opacity: 0.9,
                width: 4,
                curveness: 0
            },
            expandAndCollapse: false, //子树折叠和展开的交互，默认打开
            animationDuration: 100, //初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 100, //数据更新动画的时长，默认300
            data: [oTreeEcharts]
        }
    ]
})

/*  画布宽高自适应，最大宽度以叶子节点数量为准，后期这里也需要考虑独立节点的数量；
            基本思路：画布最大宽度为叶子节点的数量，画布宽度确定后，就不再改变了；
                    画布高度为层级的数量，动态判断实际显示的层级，从而改变画布的高度；
                    resize之后，再次遍历所有节点，获取最左侧节点和最右侧节点的坐标，然后根据此坐标重新调整画布大小
        */
function resizeTree() {
    let ChartsDom = document.querySelector(".topo-chart")
    let ChartsContiner = document.querySelector(".echartContiner")
    let myChart = TopoChart.value.chart // 需要在生命周期获取 .value
    // let nodes = Array.from(new Set(myChart._chartsViews[0]._data._graphicEls)); //去重 + 伪数组转数组
    let aNodes = Array.from(new Set(myChart._chartsViews[0]._data.tree._nodes)) //去重 + 伪数组转数组
    let nAllLeavesNodes = 0 //所有叶子节点的数量
    aNodes.forEach(function (obj, index) {
        !obj.children.length && nAllLeavesNodes++
    })

    let dep = myChart._chartsViews[0]._data.tree.root.height //获取树高
    let layer_height = 200 //层级之间的高度
    // let domHeight = ChartsDom.clientHeight;
    let newHeight = layer_height * (dep + 1) || layer_height
    // let newHeight = Math.max(currentHeight, domHeight);
    let min_width = 480 // 兄弟节点之间的距离
    let domWidth = ChartsDom.clientWidth
    let currentWidth = min_width * nAllLeavesNodes || min_width
    let newWidth = Math.max(currentWidth, domWidth)
    ChartsDom.style.width = newWidth + "px"
    ChartsDom.style.height = newHeight + "px"
    let continerCenter = [ChartsContiner.clientWidth / 2, ChartsContiner.clientHeight / 2] //获取echarts所在屏幕显示区域的中心点
    let chartsCenter = [newWidth / 2, newHeight / 2]
    ChartsDom.style.left = continerCenter[0] - chartsCenter[0] + "px"
    ChartsDom.style.top = "0px"
    ChartsDom.style.zoom = "50%"
    myChart.resize()
}

let MyChartDom = document.getElementById("MyEchart")
let touchXY = {}
let MyChartDomXY = {}

/* 拖放画布事件 */
function bindDragEvents() {
    // let ChartContiner = document.getElementById("echart_continer");
    let MyChartDom = document.querySelector(".topo-chart")
    let touchXY = {}
    let MyChartDomXY = {}
    // 拖放开始事件 加红色边框
    MyChartDom.addEventListener(
        "touchstart",
        (e) => {
            let touch = e.touches[0] //暂时只支持一个触摸点
            /* 动态创建一个空白的canvas，用来代替drag时的半透明图像 */
            /* 记录触摸点和画布的初始位置 */
            touchXY = { X: touch.pageX, Y: touch.pageY } //计算鼠标落下时的初始位置
            MyChartDomXY = { X: MyChartDom.style.left.split("px")[0] * 1, Y: MyChartDom.style.top.split("px")[0] * 1 }
            // console.log("touch",touch.pageX,touch.pageY);
            // console.log("MyChartDom",MyChartDom.style.left,MyChartDom.style.top);
        },
        false
    )

    // 拖放进行中0
    MyChartDom.addEventListener(
        "touchmove",
        (e) => {
            // event.stopPropagation();
            // event.preventDefault();
            let touch = e.touches[0] //暂时只支持一个触摸点
            if (!touch.pageX || !touch.pageY) {
                //拖拽结束的时候，pageX和pageY会突变为0，所以为0的时候不做处理
                return false
            }
            MyChartDom.style.left = MyChartDomXY.X + touch.pageX - touchXY.X + "px"
            MyChartDom.style.top = MyChartDomXY.Y + touch.pageY - touchXY.Y + "px"
            // console.log("touch",touch.pageX,touch.pageY);
            // console.log(touch.pageX - touchXY.X)
            // console.log(MyChartDom.style.left.split("px")[0] * 1 -MyChartDomXY.X)
            // console.log("MyChartDom",MyChartDom.style.left,MyChartDom.style.top);
        },
        false
    )

    // 拖放进行后
    MyChartDom.addEventListener(
        "touchend",
        (e) => {
            // event.stopPropagation();
            // event.preventDefault();
            // console.log("mouse",touch.pageX,touch.pageY);
            // console.log("MyChartDom",MyChartDom.style.left,MyChartDom.style.top);
        },
        false
    )
}
/* 显示设备列表 */
function showDeviceList() {
    console.log("showDeviceList")
}

/* 缩放图表 */
function zoom(action) {
    let ChartDom = document.querySelector(".topo-chart")
    let nZoom = ChartDom.style.zoom.split("%")[0] * 1

    if (action == "+") {
        nZoom += 5
        // console.log("zoom +");
    } else if (action == "-") {
        nZoom -= 5
        // console.log("zoom -");
    } else {
        return
    }
    ChartDom.style.zoom = nZoom + "%"
    g_myChart.resize()
}

/* 下载图片 */
function exportImage() {
    let picInfo = g_myChart.getDataURL({
        type: "png",
        pixelRatio: 1.5, //放大两倍下载，之后压缩到同等大小展示。解决生成图片在移动端模糊问题
        backgroundColor: "#fff"
    }) //获取到的是一串base64信息

    const elink = document.createElement("a")
    elink.download = "统计图"
    elink.style.display = "none"
    elink.href = picInfo
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
}

function onRefresh() {
    $.getJSON("topodata2.json", function (result) {
        //如果json格式错误会无法进入回调函数且浏览器不报错
        let oData = result.SmartMC
        drawEcharts(oData)
    })
}

onMounted(function () {
    g_myChart = TopoChart.value.chart // 需要在生命周期获取 .value
    g_myChart.on("finished", function () {
        if (flag) {
            flag = false
            // console.log(1)
            resizeTree()
            bindDragEvents()
        }
    })
})
</script>

<style scoped>
/* scoped内只对组件作用 */
.echartContiner {
    width: 400px;
    height: 700px;
    /* margin:auto; */
    /* border: 2px solid red; */
    position: relative;
    /* overflow: hidden; */
}
.btn_box {
    width: 50px;
    height: 200px;
    position: absolute;
    left: 20px;
    top: 20px;
    border: 1px solid green;
    z-index: 20;
}
.btn_box button {
    width: 40px;
    height: 40px;
}
.topo-chart {
    /* border: 2px solid blue; */
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 20;
    zoom: 50%;
}
</style>
