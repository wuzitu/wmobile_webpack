<template>
    <div>
        <box-title :titleName="topologyTitle"></box-title>
        <div class="continer">
            <div class="echartsContiner">
                <v-chart class="main_chart" ref="MainChart" :option="option" :autoresize="true" draggable="false" />
                <div class="title_row">
                    <span class="dot"></span>
                    <span class="title_text">{{ OTHERS + ": " + OFFLINE }}</span>
                </div>
                <v-chart class="offline_chart" ref="OfflineChart" :option="offlineOption" :autoresize="true" draggable="false" />
                <div class="title_row">
                    <span class="dot"></span>
                    <span class="title_text">{{ OTHERS + ": " + ONLINE }}</span>
                </div>
                <v-chart class="online_chart" ref="OnlineChart" :option="onlineOption" :autoresize="true" draggable="false" />
            </div>
            <div class="legend_continer">
                <div class="legend_row">
                    <span class="dot"></span>
                    <span class="legend_text">{{ GATEWAY + ": " + GatewayNum.online + "/" + GatewayNum.total }}</span>
                </div>
                <div class="legend_row">
                    <span class="dot"></span>
                    <span class="legend_text">{{ SWITCH + ": " + SwitchNum.online + "/" + SwitchNum.total }}</span>
                </div>
                <div class="legend_row">
                    <span class="dot"></span>
                    <span class="legend_text">{{ AP + ": " + APNum.online + "/" + APNum.total }}</span>
                </div>
                <div class="legend_row">
                    <span class="dot"></span>
                    <span class="legend_text">{{ CLIENT + ": " + ClientNum.online }}</span>
                </div>
            </div>
            <div id="BtnBox" class="toolbox">
                <div id="BtnBig" class="toolbox_button" @click="zoom('+')">
                    <svg-icon icon-class="ic_enlarge" class="iconStyle"></svg-icon>
                    <span class="text">放大</span>
                </div>
                <div class="split-line"></div>
                <div id="BtnSmall" class="toolbox_button" @click="zoom('-')">
                    <svg-icon icon-class="ic_shrink" class="iconStyle"></svg-icon>
                    <span class="text">缩小</span>
                </div>
                <div class="split-line"></div>
                <div id="BtnExportImg" class="toolbox_button" @click="exportImage">
                    <svg-icon icon-class="ic_download" class="iconStyle"></svg-icon>
                    <span class="text">下载</span>
                </div>
                <div class="split-line"></div>
                <div id="BtnRefresh" class="toolbox_button" @click="onRefresh">
                    <svg-icon icon-class="ic_refresh" class="iconStyle"></svg-icon>
                    <span class="text">刷新</span>
                </div>
            </div>

            <div id="debug" class="debug">
                <li>{{ debug1 }}</li>
                <li>{{ debug2 }}</li>
                <li>{{ debug3 }}</li>
                <li>{{ debug4 }}</li>
            </div>
        </div>
    </div>
</template>

<script setup>
import { use } from "echarts/core"
import { CanvasRenderer } from "echarts/renderers"
import { TreeChart, CustomChart, GraphChart } from "echarts/charts"
import VChart from "vue-echarts"
import { UniversalTransition } from "echarts/features"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import html2canvas from "html2canvas"
// import { useRouter } from "vue-router"
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from "echarts/components"
import { ref, onMounted } from "vue"
import CloudImg from "@/frame/assets/img/ic_logo_cloudnet2.svg"
import InternetImg from "@/frame/assets/img/img_internet@3x.png"
import GatewayImg from "@/frame/assets/img/ic_gateway.svg"
import SwitchImg from "@/frame/assets/img/ic_switch.svg"
import APImg from "@/frame/assets/img/ic_ap_f.svg"
// import ClientImg from "@/frame/assets/img/ic_phone.svg"
import DisConnectImg from "@/frame/assets/img/disconnect.png"

// import { off } from "process"

use([CanvasRenderer, TitleComponent, TooltipComponent, LegendComponent, TreeChart, CustomChart, GridComponent, GraphChart, UniversalTransition])
const { t } = useI18n()
const topologyTitle = t("DashBoard.topology")
const SN = t("DashBoard.serialNumber")
const GATEWAY = t("MENU.gateway")
const SWITCH = t("MENU.switch")
const AP = t("MENU.ap")
const CLIENT = t("MENU.terminal")
const OTHERS = t("DashBoard.otherDevice")
const ONLINE = t("DashBoard.online")
const OFFLINE = t("DashBoard.offline")
// const router = useRouter()
let MainChart = ref("MainChart") //模板ref，获取dom元素节点，需放在setup中
let flag = true
let g_myChart = {}
const treeSize = {
    NodeGWSize: [464, 180],
    NodeSWSize: [464, 160],
    NodeRootSize: [284, 160],
    NodeAPSize: [464, 196],
    NodeClientSize: [168, 160]
}
let g_nZoom = 0.5 //容器缩放比默认设置为50%

let debug1 = ref("test") //调试
let debug2 = ref("test")
let debug3 = ref("test")
let debug4 = ref("test")
// const oDeviceType = {}
// oDeviceType[GATEWAY] =
// const oDeviceType = {
//     gateway:{
//         Text: t("MENU.gateway"),
//         Icon: GatewayImg
//     },
//     switch:{
//         Text: t("MENU.switch"),
//         Icon: GatewayImg
//     },
//     ap:{
//         Text: t("MENU.ap"),
//         Icon: GatewayImg
//     },
//     terminal:{
//         Text: t("MENU.terminal"),
//         Icon: GatewayImg
//     },
// }
const DeviceIcons = {
    "WA6520-C_T": APImg,
    "MSG360-4-PWR-F": GatewayImg,
    Switch: SwitchImg
}
const LineColor = "#617CF0"

let GatewayNum = { online: 10, total: 20 }
let SwitchNum = { online: 3, total: 5 }
let APNum = { online: 100, total: 200 }
let ClientNum = { online: 500 }

const oJsonData = {
    SmartMC: {
        DeviceList: {
            Device: [
                {
                    Id: "0",
                    MacAddress: "30-B0-37-A5-79-A0",
                    Role: "1",
                    HostName: "MSG360",
                    Model: "MSG360-4-PWR-F",
                    Hop: "0",
                    IpAddress: "127.0.0.1",
                    SerialNumber: "219801A2WY8217E000TZ",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "true",
                    Type: AP
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
                    IsSnapshot: "false",
                    Type: "SW"
                },
                {
                    Id: "2",
                    MacAddress: "5C-A7-21-EE-F8-E0",
                    Role: "2",
                    HostName: "SW-2",
                    Model: "Switch",
                    Hop: "1",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "SW"
                },
                {
                    Id: "3",
                    MacAddress: "5C-A7-21-EE-F8-E3",
                    Role: "2",
                    HostName: "SW-3",
                    Model: "Switch",
                    Hop: "3",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "SW"
                },
                {
                    Id: "4",
                    MacAddress: "5C-A7-21-EE-F8-E4",
                    Role: "2",
                    HostName: "SW-4",
                    Model: "Switch",
                    Hop: "4",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "SW"
                },
                {
                    Id: "5",
                    MacAddress: "5C-A7-21-EE-F8-E5",
                    Role: "2",
                    HostName: "WA6520-C_T",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "AP"
                },
                {
                    Id: "6",
                    MacAddress: "5C-A7-21-EE-F8-E5",
                    Role: "2",
                    HostName: "WA6520-C_T",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "AP"
                },
                {
                    Id: "7",
                    MacAddress: "5C-A7-21-EE-F8-E5",
                    Role: "2",
                    HostName: "WA6520-C_T",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "AP"
                },
                {
                    Id: "8",
                    MacAddress: "5C-A7-21-EE-F8-E6",
                    Role: "2",
                    HostName: "client1",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: CLIENT
                },
                {
                    Id: "9",
                    MacAddress: "5C-A7-21-EE-F8-E7",
                    Role: "2",
                    HostName: "client2",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: CLIENT
                },
                {
                    Id: "11", //独立节点
                    MacAddress: "5C-A7-21-EE-F8-E7",
                    Role: "2",
                    HostName: "client2",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "AP"
                },
                {
                    Id: "12",
                    MacAddress: "5C-A7-21-EE-F8-E7",
                    Role: "2",
                    HostName: "client2",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "1",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "AP"
                },
                {
                    Id: "13",
                    MacAddress: "5C-A7-21-EE-F8-E7",
                    Role: "2",
                    HostName: "SW-5",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "2",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "SW"
                },
                {
                    Id: "14",
                    MacAddress: "5C-A7-21-EE-F8-E7",
                    Role: "2",
                    HostName: "SW-6",
                    Model: "WA6520-C_T",
                    Hop: "5",
                    IpAddress: "192.168.2.6",
                    SerialNumber: "219801A3718216E00009",
                    Status: "2",
                    SysVersion: "7.1.064, ESS 5607",
                    IrfCount: "0",
                    IsSnapshot: "false",
                    Type: "SW"
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
                },
                {
                    SrcId: "7",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "8",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "8",
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
                    DesId: "9",
                    DesMAC: "00-E0-FC-00-51-00",
                    STPStatus: "false",
                    LinkStatus: "3"
                },
                {
                    SrcId: "9",
                    IfIndex: "3",
                    SrcMAC: "5C-A7-21-EE-F8-E0",
                    DesId: "7",
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
        obj.name = obj.Id //echarts tree 索引为name
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
        children: [oRoot],
        Type: "root"
        // NodeType:"root",    //添加根节点标识
    }
    return oRootVisual
}

function getLonelyDevices(aDeviceList, aLinkRelation) {
    /* 遍历出独立节点 */
    let oTmpId = {}
    let aDevices = aDeviceList.concat() //copy
    for (let i = 0; i < aLinkRelation.length; i++) {
        if (!oTmpId[aLinkRelation[i].SrcId]) {
            oTmpId[aLinkRelation[i].SrcId] = {} //
        }
        if (!oTmpId[aLinkRelation[i].DesId]) {
            oTmpId[aLinkRelation[i].DesId] = {} //
        }
    }
    for (let i = 0; i < aDevices.length; i++) {
        if (oTmpId[aDevices[i].Id]) {
            aDevices.splice(i, 1) //
            i--
        }
    }

    /* 独立节点分两种，一种是在线的，一种是离线的，根据status来判�?   这个要等待实际数�?来判�?�?否准�?！！！！！！！！！！！！�? */
    let aLoneyDevice = {
        online: [],
        offline: []
    }
    aDevices.forEach(function (obj, index) {
        // obj["NodeType"] = "Lonely";//添加�?立节点标�?
        if ("1" == obj.Status) {
            //1:normal 2:offline
            aLoneyDevice.online.push(obj)
        } else if ("2" == obj.Status) {
            aLoneyDevice.offline.push(obj)
        }
    })

    return aLoneyDevice
}

/* 设置节点的样式图 包括图标和文字的布局*/
function setNodeStyle(oTreeData) {
    setRootNodeStyle(oTreeData)
    setNomalNodeStyle(oTreeData.children)

    return oTreeData
}

/* 设置根节点的样式 */
function setRootNodeStyle(oTreeData) {
    let oRootNode = {
        //将cloud和internet做成一个整体，当做根节点，用富文本来实现
        height: 90,
        label: {
            // position: [0, 0],
            formatter: ["{WhiteContiner|}", "{Cloud|}{Internet|}", "{WhiteSpaceLeft|}{lineLeft|}{lineRight|}{WhiteSpaceRight|}", "{WhiteSpaceLeft2|}{IconDisConnectLeft|}{IconDisConnectRight|}{WhiteSpaceRight2|}", "{WhiteSpaceLeft|}{lineLeft|}{lineBottom|}{lineRight|}{WhiteSpaceRight|}"].join("\n"),
            rich: {
                WhiteContiner: {
                    //设置一个宽度，撑开容器
                    width: 380,
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
                    borderWidth: 2, //以后需要全局
                    borderColor: LineColor, //以后需要全局
                    width: 0.5,
                    height: 20,
                    align: "left"
                },
                lineBottom: {
                    borderWidth: 2, //以后需要全局
                    borderColor: LineColor, //以后需要全局
                    width: 300,
                    height: 0.5,
                    verticalAlign: "bottom"
                },
                lineRight: {
                    borderWidth: 2, //以后需要全局
                    borderColor: LineColor, //以后需要全局
                    width: 0.5,
                    height: 20,
                    align: "right"
                }
            }
        }
    }
    Object.assign(oTreeData, oRootNode) //根节点和样式 对象合并
}

/* 递归遍历子节点*/
function setNomalNodeStyle(aChildren) {
    if (!aChildren.length) return

    aChildren.forEach(function (oChild, index) {
        let oNomalNode = {
            //�?通节�?
            // name: oChild.Id,
            // height:90,
            label: {
                // position: [0, 0],
                formatter: ["{WhiteContiner|}", "{DeviceIcon|}", "{DeviceName|" + oChild.HostName + " (" + oChild.Type + ") " + "}", "{DeviceDesc|" + SN + ": " + oChild.SerialNumber + "}"].join("\n"),
                rich: {
                    WhiteContiner: {
                        //设置一�?宽度，撑开容器
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
                        // height: 40,
                        align: "center",
                        fontSize: 24,
                        fontWeight: 500,
                        lineHeight: 24,
                        padding: [20, 0, 0, 0]
                    },
                    DeviceDesc: {
                        // height: 24,
                        align: "center",
                        fontSize: 24,
                        lineHeight: 24,
                        padding: [26, 0, 0, 0]
                    }
                }
            }
        }
        Object.assign(oChild, oNomalNode) //根节点和样式 对象合并
        setNomalNodeStyle(oChild.children) //递归遍历子节点的子节�?
    })
}
/* 设置关系图的节点位置 */
function setNodePosition(aData) {
    if (!aData.length) return

    let nodeX = 100 //起始位置
    let nodeY = 40
    aData.forEach(function (obj, index) {
        obj.value = [nodeX, nodeY]
        nodeX += treeSize.NodeGWSize[0]
    })
}

/* 设置不同类型节点的尺寸 */
function getSymbolSize(params) {
    switch (
        params.data.Type //SW AC AP Others
    ) {
        case "root":
            return treeSize.NodeRootSize
        case GATEWAY:
            return treeSize.NodeGWSize
        case "SW":
            return treeSize.NodeSWSize
        case "AP":
            return treeSize.NodeAPSize
        case CLIENT:
            return treeSize.NodeClientSize
        default:
            return "Node symbolSize Error"
    }
}

let oData = oJsonData.SmartMC
let aDeviceList = oData.DeviceList.Device
let aLinkRelation = oData.LinkRelation.Relation
let oTreeData = transformRelationToTree(aDeviceList, aLinkRelation)
let oTreeEcharts = setNodeStyle(oTreeData) //给节点添加label标签等样式
let aLoneyDevice = getLonelyDevices(aDeviceList, aLinkRelation)
setNomalNodeStyle(aLoneyDevice.online)
setNomalNodeStyle(aLoneyDevice.offline)
setNodePosition(aLoneyDevice.online)
setNodePosition(aLoneyDevice.offline)

let option = ref({
    title: {},
    tooltip: {
        //提示框组件
        show: true,
        trigger: "item", //触发类型，默认：item（数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用）。可选：'axis'：坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。'none':什么都不触发。
        triggerOn: "mousemove" //提示框触发的条件，默认mousemove|click（鼠标点击和移动时触发）。可选mousemove：鼠标移动时，click：鼠标点击时，none：
    },
    grid: [
        {
            show: false,
            left: 0,
            top: 0,
            bottom: 0,
            right: 0,
            backgroundColor: "#E5E6E8"
            // borderColor: "#aae",
            // borderWidth: 4
        }
    ],
    xAxis: [
        {
            type: "value",
            show: false
        }
    ],
    yAxis: [
        {
            type: "value",
            show: false
        }
    ],
    series: [
        {
            type: "tree", //树图topo
            id: 0,
            name: "tree1",
            // bottom: treeSize.NodeGWSize * 2.5,
            // width:2000,//tree组件的�?�度�?
            // height:2000,
            // center:[500,500],//当前视�?�的�?心点
            // zoom:1,//当前视�?�的缩放比例�?
            symbol: "rect", // 长方形
            // symbolKeepAspect: "true", //是否在缩放时保持该图形的长宽比。
            symbolSize: function (value, params) {
                return getSymbolSize(params)
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
            },
            lineStyle: {
                color: LineColor,
                width: 2,
                curveness: 0
            },
            expandAndCollapse: false, //子树折叠和展开的交互，默认打开
            animationDuration: 100, //初始动画的时长，支持回调函数,默认1000
            animationDurationUpdate: 100, //数据更新动画的时长，默认300
            data: [oTreeEcharts]
        }
    ]
})
let offlineOption = ref({
    title: {},
    tooltip: {
        show: true,
        trigger: "item",
        triggerOn: "mousemove"
    },
    grid: [
        {
            left: 100,
            top: 100,
            bottom: 0,
            right: 0,
            show: false, //test
            borderColor: "#eee"
        }
    ],
    xAxis: [
        {
            min: 0,
            max: 2000, //需要使用全局变量
            positon: "top",
            show: false,
            type: "value"
        }
    ],
    yAxis: [
        {
            min: 0,
            max: 2000,
            show: false,
            inverse: true,
            type: "value"
        }
    ],
    series: [
        {
            name: "offlineChart",
            type: "graph",
            animation: false,
            coordinateSystem: "cartesian2d", //使用二维的直角坐标系
            roma: false,
            zlevel: 2,
            data: aLoneyDevice.offline,
            links: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            },
            symbol: "rect", // 长方�?
            symbolSize: function (value, params) {
                return getSymbolSize(params)
            },

            label: {
                //每个节点所对应的标签的样式
                show: true,
                position: "inside"
            },

            itemStyle: {
                color: "#fff"
            }
        }
    ]
})
let onlineOption = ref({
    title: {},
    tooltip: {
        //提示框组�?
        show: true,
        trigger: "item",
        triggerOn: "mousemove"
    },
    grid: [
        {
            left: 100,
            top: 100,
            bottom: 0,
            right: 0,
            show: false //test
            // borderColor: "#eee"
        }
    ],
    xAxis: [
        {
            min: 0,
            max: 2000, //需要使用全局变量
            positon: "top",
            show: false,
            type: "value"
        }
    ],
    yAxis: [
        {
            min: 0,
            max: 2000,
            show: false,
            inverse: true,
            type: "value"
        }
    ],
    series: [
        {
            name: "onlineChart",
            type: "graph",
            animation: false,
            coordinateSystem: "cartesian2d", //使用二维的直角坐标系
            roma: false,
            zlevel: 2,
            data: aLoneyDevice.online,
            links: [],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: "rgba(0, 0, 0, 0.5)"
                }
            },
            symbol: "rect",
            symbolSize: function (value, params) {
                return getSymbolSize(params)
            },
            label: {
                //每个节点所对应的标签的样式
                show: true,
                position: "inside"
            },
            itemStyle: {
                color: "#fff"
            }
        }
    ]
})
// console.log(option)
// console.log(offlineOption)

/*  画布宽高自适应，最大宽度以叶子节点数量为准，后期这里也需要考虑独立节点的数量；
            基本思路：画布最大宽度为叶子节点的数量，画布宽度确定后，就不再改变了；
                    画布高度为层级的数量，动态判断实际显示的层级，从而改变画布的高度；
                    resize之后，再次遍历所有节点，获取最左侧节点和最右侧节点的坐标，然后根据此坐标重新调整画布大小
        */
function resizeTree() {
    let ChartsDom = document.querySelector(".main_chart")
    let ChartsContiner = document.querySelector(".echartsContiner")
    let myChart = MainChart.value.chart // 需要在生命周期获取 .value
    let aNodes = Array.from(new Set(myChart._chartsViews[0]._data.tree._nodes)) //去重 + 伪数组转数组
    let nAllLeavesNodes = 0 //所有叶子节点的数量
    aNodes.forEach(function (obj, index) {
        !obj.children.length && nAllLeavesNodes++
    })

    let dep = myChart._chartsViews[0]._data.tree.root.height //获取层级
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
    let continerCenter = [ChartsContiner.clientWidth / 4, ChartsContiner.clientHeight / 4] //获取echarts所在屏幕显示区域的�?心点
    let chartsCenter = [newWidth / 2, newHeight / 2]
    ChartsContiner.style.left = continerCenter[0] - chartsCenter[0] + "px"
    ChartsContiner.style.top = "0px"
    ChartsContiner.style.zoom = g_nZoom * 100 + "%"
    // debug3.value = g_nZoom
    // debug4.value = newWidth + "  " + newHeight
    myChart.resize()
}

let MyChartDom = document.getElementById("MyEchart")
let touchXY = {}
let MyChartDomXY = {}
let isClick = true //true:点击事件 false:拖动事件
let count = 0

/* 消抖函数，比如输入框，连续输入，只在最后一次输入完成后等待delay时间后再响应fn事件 */
function debounce(fn,delay){
    var timer = null;
    return function(){
        var _this = this;
        var args = arguments;
        if(timer !== null){
            clearTimeout(timer);
        }
        timer = setTimeout(function(){
            fn.apply(_this,args);
        },delay);
    }
}

/* 节流函数，响应第一次fn触发后，等待delay时间后才能执行下一次响应 */
function throttle(fun,delay){
    var prev = Date.now(); // 闭包维护一个起始时间戳
    return function(){
        var context = this;
        var args = arguments;
        var now = Date.now();  // 每次任务函数触发的时候获取时间戳
        if(now-prev >= delay){ // 判断当前时间与起始时间戳的间隔 大余delay则触发任务函数
            fun.apply(context,args);
            prev = Date.now(); // 关键是要更新闭包中的 起始时间戳
        }
    }
}

/* 拖放画布事件 */
function bindDragEvents() {
    // let ChartContiner = document.getElementById("echart_continer");
    let MyChartDom = document.querySelector(".echartsContiner")
    let touchXY = {}
    let MyChartDomXY = {}
    let touchDistance = 0
    // 拖放开始事件 加红色边框
    MyChartDom.addEventListener(
        "touchstart",
        (e) => {
            debug1.value = "START"
            count = 0
            e.stopPropagation()
            e.preventDefault()//阻止默认浏览器动作(W3C)

            isClick = true

            //2个触摸点
            let touch1 = e.touches[0] //拖动以第一个点为准
            let touch2 = e.touches[1] //双指缩放以 1和2这两个点为准

            if (touch2) {
                //2个触摸点及以上
                let dx = Math.abs(touch2.pageX - touch1.pageX)
                let dy = Math.abs(touch2.pageY - touch1.pageY)
                touchDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) //两个点之间的距离
            }

            touchXY = { X: touch1.pageX, Y: touch1.pageY } //计算鼠标落下时的初始位置
            MyChartDomXY = { X: MyChartDom.style.left.split("px")[0] * 1, Y: MyChartDom.style.top.split("px")[0] * 1 }

            // console.log("touch",touch.pageX,touch.pageY);
            // console.log("MyChartDom",MyChartDom.style.left,MyChartDom.style.top);

            // debug2.value = MyChartDom.style.left + MyChartDom.style.top;
        },
        false
    )

    // 拖放进行中0
    MyChartDom.addEventListener(
        "touchmove",throttle((e) => {
            debug1.value = "MOVE " + count++
            e.stopPropagation()
            e.preventDefault()//阻止默认浏览器动作(W3C)

            //2个触摸点
            let touch1 = e.touches[0] //拖动以第一个点为准
            let touch2 = e.touches[1] //双指缩放以 1和2这两个点为准

            /* 拖动 */
            if (!touch1.pageX || !touch1.pageY) {
                //拖拽结束的时候，pageX和pageY会突变为0，所以为0的时候不做处理
                return false
            }
            MyChartDom.style.left = MyChartDomXY.X + (touch1.pageX - touchXY.X) / g_nZoom + "px" //这里偏移量要除以g_nZoom这个系数
            MyChartDom.style.top = MyChartDomXY.Y + (touch1.pageY - touchXY.Y) / g_nZoom + "px"

            /* 缩放 */
            if (touch2) {
                //2个触摸点及以上
                let dx = Math.abs(touch2.pageX - touch1.pageX)
                let dy = Math.abs(touch2.pageY - touch1.pageY)
                let newTouchDistance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2)) //两个点之间的距离
                g_nZoom = g_nZoom + ((newTouchDistance - touchDistance) / touchDistance) * 0.1 //0.5是自定义的缩放系数
                MyChartDom.style.zoom = g_nZoom
                debug2.value = dx + "  " + dy
                debug3.value = ((newTouchDistance - touchDistance) / touchDistance) * 0.1 + "  " + count
                touchDistance = newTouchDistance
            }

            // console.log("touch",touch.pageX,touch.pageY);
            // console.log(touch.pageX - touchXY.X)
            // console.log(MyChartDom.style.left.split("px")[0] * 1 -MyChartDomXY.X)
            // console.log("MyChartDom",MyChartDom.style.left,MyChartDom.style.top);

            return false
        },200)
        ,
        false
    )

    // 拖放进行后
    MyChartDom.addEventListener(
        "touchend",
        (e) => {
            e.stopPropagation()
            e.preventDefault()
            // console.log("mouse",touch.pageX,touch.pageY);
            // console.log("MyChartDom",MyChartDom.style.left,MyChartDom.style.top);
            debug1.value = "END"
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
    let ChartDom = document.querySelector(".echartsContiner")
    // let nZoom = ChartDom.style.zoom.split("%")[0] * 1

    if (action == "+") {
        g_nZoom += 0.05
        // console.log("zoom +");
    } else if (action == "-") {
        g_nZoom -= 0.05
        // console.log("zoom -");
    } else {
        return
    }
    ChartDom.style.zoom = g_nZoom * 100 + "%"
    g_myChart.resize()
}

/* 下载图片 */
function exportImage() {
    // let picInfo = g_myChart.getDataURL({
    //     type: "png",
    //     pixelRatio: 1.5, //放大两倍下载，之后压缩到同等大小展示。解决生成图片在移动�?模糊�?�?
    //     backgroundColor: "#fff"
    // }) //获取到的�?一串base64信息

    // let canvasId = this.$refs[]
    // const elink = document.createElement("a")
    // elink.download = "统�?�图"
    // elink.style.display = "none"
    // elink.href = picInfo
    // document.body.appendChild(elink)
    // elink.click()
    // URL.revokeObjectURL(elink.href) // 释放URL 对象
    // document.body.removeChild(elink)

    // 将echarts图表�?�?为canvas,并将canvas下载为图�?
    // 图表�?换成canvas
    html2canvas(document.querySelector(".echartsContiner")).then(function (canvas) {
        var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
        // 创建a标�?�，实现下载
        var creatIMg = document.createElement("a")
        creatIMg.download = "topo.png" // 设置下载的文件名
        creatIMg.style.display = "none"
        creatIMg.href = img // 下载url
        document.body.appendChild(creatIMg)
        creatIMg.click()
        creatIMg.remove() // 下载之后把创建的元素删除
    })
}

function onRefresh() {
    // $.getJSON("topodata2.json", function (result) {
    //如果json格式错误会无法进入回调函数且浏览器不报错
    //     let oData = result.SmartMC
    //     drawEcharts(oData)
    // })
}

onMounted(function () {
    g_myChart = MainChart.value.chart // 需要在生命周期获取 .value
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
.continer {
    width: 359px;
    height: 450px;
    margin: 8px;
    /* border: 1px solid red; */
    position: relative;
    overflow: hidden;
}
.echartsContiner {
    /* height: 450px; */
    /* width: 100%; */
    position: absolute;
    left: 0;
    top: 0;
    /* z-index: 1; */
    zoom: 50%;
    background: #e5e6e8;
}
.main_chart {
    /* border: 2px solid red; */
    /* height: 100%; */
    /* position: absolute; */
    /* left: 0; */
    /* top: 0; */
    /* z-index: 10; */
    /* zoom: 50%; */
}
.offline_chart,
.online_chart {
    height: 250px;
    /* width: 2000px; */
    /* position: relative; */
    /* border: 1px solid red; */
}
.legend_continer {
    width: 100px;
    height: 100px;
    position: absolute;
    text-align: left;
    line-height: 20px;
    /* z-index: 20; */
}
.title_row .dot,
.legend_continer .dot {
    width: 6px;
    height: 6px;
    background: #617cf0;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
.title_row .dot {
    width: 12px;
    height: 12px;
    margin: 0 10px 8px 0;
}
.echartsContiner .title_text,
.legend_continer .legend_text {
    height: 12px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    /* line-height: 0px; */
}
.echartsContiner .title_text {
    font-size: 24px;
    height: 24px;
}
.toolbox {
    position: absolute;
    right: 0px;
    top: 200px;
    /* z-index: 20; */
    width: 26px;
    height: 178px;
    background: #ffffff;
    border: 1px solid #9e9e9e;
    border-radius: 4px;
    padding: 8px 5px 8px 5px;
}
.toolbox .split-line {
    height: 1px;
    background: #9e9e9e;
    margin: 8px 0 8px 0;
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
.debug {
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1;
    /* width: 300px; */
    /* height: 1px; */
    /* background: #ffffff; */
    border: 1px solid #9e9e9e;
    border-radius: 4px;
    /* padding: 8px 5px 8px 5px; */
    text-align: right;
    /* overflow: visible; */
}
.debug li {
    font-size: 14px;
    color: red;
}
</style>
