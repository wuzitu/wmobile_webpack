<template>
    <box-title :titleName="rrmTitle">
        <span class="line"></span>
        <span class="drop1">
            <span @click="ondropControl">{{ ajustDrop }}</span>
            <svg-icon :icon-class="icDropDown" class="icondown" @click="ondropControl"></svg-icon>
            <div :class="dropControl">
                <!-- <div @click="selectDrop(0)" class="dropline">{{ ajustDataMsg }}</div> -->
                <div @click="selectDrop(1)">{{ ajustEffectaMsg }}</div>
            </div>
        </span>
    </box-title>
    <div class="wrap_byAP">
        <van-search v-model="searchVal" :placeholder="searchPlaceholder" @search="onSearch" @cancel="onCancel" @clear="onCancel" action-text="取消" />
        <van-collapse v-model="activeNames0">
            <van-collapse-item v-for="(value, key, index) in oAjustDataByAP.data" :name="index" @click.native="show_collapse(key)">
                <template #title>
                    <div class="ajusttimestyle1">
                        <span class="circle"></span>
                        <span @click="jumpAPDetail(key)" class="apcolor">{{ ID_host[key] }}</span>
                    </div>
                </template>
                <!-- {{ value }} -->
                <van-collapse v-model="activeNames">
                    <van-collapse-item v-for="(item1, index1) in value" :name="index + '' + index1">
                        <template #title>
                            <div>{{ t("RRM.ajusttime") }}{{ item1.ChangeTime }}</div>
                        </template>
                        <div class="contents">
                            <div class="toggle">
                                <span class="toggleleft">Radio</span>
                                <span class="toggleright">Radio{{ item1.RadioID }}</span>
                            </div>
                            <div class="toggle">
                                <span class="toggleleft">{{ t("RRM.reason") }}</span>
                                <span class="toggleright">{{ item1.ReasonBitMap }}</span>
                            </div>
                            <div class="toggle">
                                <span class="toggleleft">{{ t("RRM.channelba") }}</span>
                                <span class="toggleright">
                                    <span class="before">{{ item1.ChlNumBef }}</span>
                                    /
                                    <span class="after">{{ item1.ChlNumAft }}</span>
                                </span>
                            </div>
                            <div class="toggle">
                                <span class="toggleleft">{{ t("RRM.powerba") }}</span>
                                <span class="toggleright">
                                    <span class="before">{{ item1.PwrLvlBef }}</span>
                                    /
                                    <span class="after">{{ item1.PwrLvlAft }}</span>
                                </span>
                            </div>
                            <div class="toggle special">
                                <span class="toggleleft">{{ t("RRM.bandwidthba") }}</span>
                                <span class="toggleright">
                                    <span class="before">{{ item1.BandwidthBef }}</span>
                                    /
                                    <span class="after">{{ item1.BandwidthAft }}</span>
                                </span>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-collapse-item>
        </van-collapse>
        <!-- <ajust-by-a-p :ajustDataByAP="oAjustDataByAP.data"></ajust-by-a-p> -->
    </div>
    <!-- <div class="ajustContent_wrap1">
        <van-tabs v-model:active="ajustactive" type="card" color="#617CF0" title-inactive-color="#333333">
            <van-tab :title="$t('RRM.searchByTime')">
                <ajust-by-time :ajustDataByTime="oAjustDataBytime"></ajust-by-time>
            </van-tab>
            <van-tab :title="$t('RRM.searchByAP')">
                <div class="wrap_byAP">
                    <van-search v-model="searchVal" :placeholder="searchPlaceholder" @search="onSearch" @cancel="onCancel" @clear="onCancel" action-text="取消" />
                    <ajust-by-a-p :ajustDataByAP="oAjustDataByAP.data"></ajust-by-a-p>
                </div>
            </van-tab>
        </van-tabs>
    </div> -->
</template>
<script setup>
import { ref, reactive, toRef, provide, getCurrentInstance, onMounted, toRefs } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle.vue"
import AjustByAP from "@/pages/RRM/AjustByAP.vue"
import AjustByTime from "@/pages/RRM/AjustByTime.vue"
import SelectRadio from "@/pages/RRM/SelectRadio.vue"
import { useRouter } from "vue-router"
const router = useRouter()
const { t } = useI18n()
const activeNames = ref(["aa"])
const activeNames0 = ref(["bb"])
const searchPlaceholder = t("RRM.searchPlaceholder")
const rrmTitle = t("RRM.rrmtitle")
const ajustDataMsg = t("RRM.ajustmsgData")
const ajustEffectaMsg = t("RRM.interference")
let ajustactive = ref(0)
let ajustDrop = ref(ajustDataMsg)
let dropControl = ref("hide")
let icDropDown = ref("ic_list_down")
let rrmReason = t("RRM.reasonType").split(",")
let searchVal = ref("")
const { proxy } = getCurrentInstance()
const $req = proxy.$req
let ID_host = reactive({})
const handleChange = (arr1) => {
    console.log(arr1)
}
const show_collapse = (TCID) => {
    console.log(TCID)
    oAjustDataByAP.data[TCID].length = []
    //根据TCID获取单个AP的调整信息
    //获取rrm
    /*let oHistoryList = $req.getTableInstance("HistoryList")
    let sXml = $req.makeGetChannelXml("get", [oHistoryList])//编码
    let oGetChannel = $req.getTableInstance("GetChannel")
    oGetChannel.addRows({ TCId: "1", XmlRequest: sXml })
    let responseoGetChannel = await $req.action([oGetChannel])
    let GetChannelData = $req.getTableRows("GetChannel", responseoGetChannel)
    let callbackrrmData = $req.decodingXmltoJson(GetChannelData.XmlRequest)//解码
    */
    //将rrmData xml格式转为json格式

    //遍历push到oAjustDataByAP.data[TCID]
    let callbackrrmData = [
        { ApName: "4330", RadioID: "1", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "13", LoadAft: "6", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "1", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "7", LoadAft: "6", TotalIntrfBef: "1", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "60", ChlNumAft: "157", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "1", HistoryCnt: "3", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "6", LoadAft: "6", TotalIntrfBef: "0", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "1", LoadBef: "14", LoadAft: "28", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "52", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "7", TotalIntrfBef: "0", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "52", ChlNumAft: "157", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "3", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "8", LoadAft: "14", TotalIntrfBef: "0", TotalIntrfAft: "3", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "44", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "4", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "2", LoadBef: "11", LoadAft: "22", TotalIntrfBef: "3", TotalIntrfAft: "8", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "36", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "3", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-F0", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "64", UtilBef: "1", UtilAft: "1", LoadBef: "94", LoadAft: "94", TotalIntrfBef: "69", TotalIntrfAft: "69", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "6", ChlNumAft: "6", PwrLvlBef: "11", PwrLvlAft: "8", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "4330", RadioID: "3", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-F0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "64", UtilBef: "0", UtilAft: "0", LoadBef: "94", LoadAft: "94", TotalIntrfBef: "83", TotalIntrfAft: "83", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "6", ChlNumAft: "6", PwrLvlBef: "8", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" }
    ]
    for (let i = 0; i < callbackrrmData.length; i++) {
        oAjustDataByAP.data[TCID].push(callbackrrmData[i])
    }
    // oAjustDataByAP.data[TCID].push({ ApName: "4330", RadioID: "1", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "13", LoadAft: "6", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" })
}
const ondropControl = () => {
    if (icDropDown.value == "ic_list_down") {
        dropControl.value = "show"
        icDropDown.value = "ic_list_up"
    } else {
        dropControl.value = "hide"
        icDropDown.value = "ic_list_down"
    }
}
const selectDrop = (clickIndex) => {
    if (clickIndex == 0) {
    } else {
        router.push({
            path: "/RRM/Index2"
        })
    }
}
const dealReason = (reason) => {
    let sItem = ""
    reason = parseInt(reason).toString(2).split("").reverse()
    if (reason[0] == 1) {
        sItem = sItem + rrmReason[0] + "," //带宽调整
    }
    if (reason[1] == 1) {
        sItem = sItem + rrmReason[1] + "," //干扰
    }
    if (reason[3] == 1) {
        sItem = sItem + rrmReason[2] + "," //丢包
    }
    if (reason[4] == 1) {
        sItem = sItem + rrmReason[3] + "," //重传
    }
    if (reason[5] == 1) {
        sItem = sItem + rrmReason[4] + "," //雷达
    }
    if (reason[6] == 1) {
        sItem = sItem + rrmReason[5] + "," //信号覆盖
    }
    if (reason[2] == 1 || reason[7] == 1 || reason[8] == 1 || reason[9] == 1 || reason[10] == 1) {
        sItem = sItem + rrmReason[8] + "," //其他
    }
    if (reason[11] == 1) {
        sItem = sItem + rrmReason[6] + "," //信道繁忙
    }
    if (reason[12] == 1) {
        sItem = sItem + rrmReason[7] + "," //手动触发
    }
    return sItem
}
let testData =
    "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iR0IxODAzMCI/PjxlbnY6RW52ZWxvcGUgeG1sbnM6ZW52PSJodHRwOi8vd3d3LnczLm9yZy8yMDAzLzA1L3NvYXAtZW52ZWxvcGUiPjxlbnY6SGVhZGVyPjxhdXRoOkF1dGhlbnRpY2F0aW9uIHhtbG5zOmF1dGg9Imh0dHA6Ly93d3cuaDNjLmNvbS9uZXRjb25mL2Jhc2U6MS4wIiBlbnY6bXVzdFVuZGVyc3RhbmQ9InRydWUiPjxhdXRoOkF1dGhJbmZvPjEwMDAwMzg3ZGIzNzAzZDUwMDk3YWU1N2U4Zjg1ZjUyYmNhMjwvYXV0aDpBdXRoSW5mbz48L2F1dGg6QXV0aGVudGljYXRpb24+PC9lbnY6SGVhZGVyPjxlbnY6Qm9keT48cnBjLXJlcGx5IHhtbG5zPSJ1cm46aWV0ZjpwYXJhbXM6eG1sOm5zOm5ldGNvbmY6YmFzZToxLjAiIG1lc3NhZ2UtaWQ9IjIzMzMtODgiPjxkYXRhPjx0b3AgeG1sbnM9Imh0dHA6Ly93d3cuaDNjLmNvbS9uZXRjb25mL2RhdGE6MS4wIj48TExEUD48TExEUE5laWdoYm9ycz48TExEUE5laWdoYm9yPjxUaW1lTWFyaz4yNjMyPC9UaW1lTWFyaz48SWZJbmRleD40PC9JZkluZGV4PjxOZWlnaGJvckluZGV4PjE8L05laWdoYm9ySW5kZXg+PFN5c3RlbU5hbWU+SDNDPC9TeXN0ZW1OYW1lPjxDaGFzc2lzSWQ+MjRiYi1kMWNkLTBhMDA8L0NoYXNzaXNJZD48UG9ydElkPkdpZ2FiaXRFdGhlcm5ldDEvMC8xPC9Qb3J0SWQ+PC9MTERQTmVpZ2hib3I+PExMRFBOZWlnaGJvcj48VGltZU1hcms+MzgwMzwvVGltZU1hcms+PElmSW5kZXg+MTI5PC9JZkluZGV4PjxOZWlnaGJvckluZGV4PjE8L05laWdoYm9ySW5kZXg+PFN5c3RlbU5hbWU+SDNDPC9TeXN0ZW1OYW1lPjxDaGFzc2lzSWQ+MjRiYi1kMWNkLTBhMDA8L0NoYXNzaXNJZD48UG9ydElkPk0tR2lnYWJpdEV0aGVybmV0MC8wLzA8L1BvcnRJZD48L0xMRFBOZWlnaGJvcj48L0xMRFBOZWlnaGJvcnM+PC9MTERQPjwvdG9wPjwvZGF0YT48L3JwYy1yZXBseT48L2VudjpCb2R5PjwvZW52OkVudmVsb3BlPgA="
let testData11 = $req.decodingXmltoJson(testData)
console.log(testData11)
// let jsonObj = x2jsone.xml2js('<rpc-reply message-id="" xmlns="urn:ietf:params:xml:ns:netconf:base:1.0" xmlns:xc="urn:ietf:params:xml:ns:netconf:base:1.0"><data><top xmlns="http://www.h3c.com/netconf/data:1.0"><LLDP><LLDPNeighbors><LLDPNeighbor><TimeMark>2632</TimeMark><IfIndex>4</IfIndex><NeighborIndex>1</NeighborIndex><SystemName>H3C</SystemName><ChassisId>24bb-d1cd-0a00</ChassisId><PortId>GigabitEthernet1/0/1</PortId></LLDPNeighbor></LLDPNeighbors></LLDP></top></data></rpc-reply>')
// let newjsonObj = jsonObj["rpc-reply"]["data"]["top"]
// console.log(newjsonObj)
//获取数据

let rrmData = reactive()
let oAjustDataByAP = reactive()
let oAjustDataBytime = reactive({})
let oAjustDataByAP1 = reactive({})
oAjustDataByAP = reactive({ data: oAjustDataByAP1 })
const getConf = async () => {
    /*
     //smartmc获取组网内AP
    let oDeviceList = $req.getTableInstance("DeviceList")
    oDeviceList.addFilter({ Type: "AP" })
    let responseDeviceList = await $req.getAll([oDeviceList])
    let allAPList = $req.getTableRows("DeviceList", responseDeviceList)
    //遍历allAPList获取TCID  hostname
    let TCId = []
    for (let i = 0; i < allAPList.length; i++) {
        TCId.push(allAPList[i].TCId)
    }
    
*/
    let allAPList = [
        {
            Id: "1",
            Type: "AP",
            MacAddress: "5C-A7-21-EE-F8-E5",
            Role: "2",
            HostName: "WA6520-C_T1",
            Model: "WA6520-C_T",
            Hop: "5",
            IpAddress: "192.168.2.6",
            SerialNumber: "219801A3718216E00009",
            Status: "1",
            SysVersion: "7.1.064, ESS 5607",
            IrfCount: "0",
            IsSnapshot: "false",
            ModelType: "AP"
        },
        {
            Id: "6",
            Type: "AP",
            MacAddress: "5C-A7-21-EE-F8-E5",
            Role: "2",
            HostName: "WA6520-C_T2",
            Model: "WA6520-C_T",
            Hop: "5",
            IpAddress: "192.168.2.6",
            SerialNumber: "219801A3718216E00009",
            Status: "1",
            SysVersion: "7.1.064, ESS 5607",
            IrfCount: "0",
            IsSnapshot: "false",
            ModelType: "AP"
        },
        {
            Id: "8",
            Type: "AP",
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
            ModelType: "AP"
        }
    ]

    for (let i = 0; i < allAPList.length; i++) {
        let temptID = allAPList[i].Id
        let temptHostName = allAPList[i].HostName
        oAjustDataByAP1[temptID] = []
        ID_host[temptID] = temptHostName
    }
    console.log(ID_host)

    /*rrmData = [
        { ApName: "4330", RadioID: "1", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "13", LoadAft: "6", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "1", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "7", LoadAft: "6", TotalIntrfBef: "1", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "60", ChlNumAft: "157", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "1", HistoryCnt: "3", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "6", LoadAft: "6", TotalIntrfBef: "0", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "1", LoadBef: "14", LoadAft: "28", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "52", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "7", TotalIntrfBef: "0", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "52", ChlNumAft: "157", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "3", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "8", LoadAft: "14", TotalIntrfBef: "0", TotalIntrfAft: "3", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "44", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "4", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "2", LoadBef: "11", LoadAft: "22", TotalIntrfBef: "3", TotalIntrfAft: "8", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "36", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "3", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-F0", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "64", UtilBef: "1", UtilAft: "1", LoadBef: "94", LoadAft: "94", TotalIntrfBef: "69", TotalIntrfAft: "69", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "6", ChlNumAft: "6", PwrLvlBef: "11", PwrLvlAft: "8", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "4330", RadioID: "3", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-F0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "64", UtilBef: "0", UtilAft: "0", LoadBef: "94", LoadAft: "94", TotalIntrfBef: "83", TotalIntrfAft: "83", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "6", ChlNumAft: "6", PwrLvlBef: "8", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "1", HistoryCnt: "1", BasicBSSID: "70-3D-15-83-41-80", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "10", LoadBef: "6", LoadAft: "24", TotalIntrfBef: "3", TotalIntrfAft: "8", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "52", ChlNumAft: "36", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", R: "8", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "3", HistoryCnt: "5", BasicBSSID: "70-3D-15-83-41-A0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "1", UtilAft: "24", LoadBef: "25", LoadAft: "42", TotalIntrfBef: "18", TotalIntrfAft: "9", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "1", ChlNumAft: "11", PwrLvlBef: "6", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "3", HistoryCnt: "6", BasicBSSID: "70-3D-15-83-41-A0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "1", UtilAft: "14", LoadBef: "37", LoadAft: "30", TotalIntrfBef: "17", TotalIntrfAft: "9", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "11", ChlNumAft: "1", PwrLvlBef: "6", PwrLvlAft: "6", RetryBef: "5", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "3", HistoryCnt: "7", BasicBSSID: "70-3D-15-83-41-A0", ChangeTime: "2022-04-27T07:53:51", ReasonBitMap: "2048", UtilBef: "1", UtilAft: "5", LoadBef: "17", LoadAft: "19", TotalIntrfBef: "7", TotalIntrfAft: "7", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "1", ChlNumAft: "6", PwrLvlBef: "6", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "1", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T11:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "2", LoadBef: "1", LoadAft: "17", TotalIntrfBef: "3", TotalIntrfAft: "11", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "2", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T12:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "7", LoadAft: "8", TotalIntrfBef: "4", TotalIntrfAft: "4", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "161", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "3", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T13:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "14", TotalIntrfBef: "5", TotalIntrfAft: "11", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "4", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T14:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "10", TotalIntrfBef: "10", TotalIntrfAft: "10", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "153", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "5", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T16:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "14", LoadAft: "8", TotalIntrfBef: "11", TotalIntrfAft: "3", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "153", ChlNumAft: "157", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "6", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T18:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "3", LoadAft: "5", TotalIntrfBef: "2", TotalIntrfAft: "2", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "161", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "7", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T19:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "11", LoadAft: "8", TotalIntrfBef: "4", TotalIntrfAft: "4", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "8", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T20:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "1", TotalIntrfBef: "8", TotalIntrfAft: "1", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "157", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "9", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T21:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "1", LoadAft: "1", TotalIntrfBef: "1", TotalIntrfAft: "1", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "161", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "10", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T23:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "3", LoadAft: "12", TotalIntrfBef: "2", TotalIntrfAft: "6", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" }
    ]
    for (let i = 0; i < rrmData.length; i++) {
        let time = rrmData[i].ChangeTime
        let sItem = dealReason(rrmData[i].ReasonBitMap)
        if (sItem == "") {
            rrmData[i].ReasonBitMap = "--"
        } else {
            rrmData[i].ReasonBitMap = sItem.substring(0, sItem.length - 1)
        }
        if (oAjustDataBytime[time]) {
            oAjustDataBytime[time].push(rrmData[i])
        } else {
            oAjustDataBytime[time] = []
            oAjustDataBytime[time].push(rrmData[i])
        }
        let apname = rrmData[i].ApName
        if (oAjustDataByAP1[apname]) {
            oAjustDataByAP1[apname].push(rrmData[i])
        } else {
            oAjustDataByAP1[apname] = []
            oAjustDataByAP1[apname].push(rrmData[i])
        }
    }*/
    console.log(oAjustDataByAP1)
}
/*const getConf = async () => {
    let o = $req.getTableInstance("HistoryList")
    let response = await $req.getAll([o])
    rrmData = $req.getTableRows("HistoryList", response)
    rrmData = [
        { ApName: "4330", RadioID: "1", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "13", LoadAft: "6", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "1", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "7", LoadAft: "6", TotalIntrfBef: "1", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "60", ChlNumAft: "157", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "1", HistoryCnt: "3", BasicBSSID: "48-7A-DA-17-4D-D0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "6", LoadAft: "6", TotalIntrfBef: "0", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "60", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "1", LoadBef: "14", LoadAft: "28", TotalIntrfBef: "5", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "52", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "7", TotalIntrfBef: "0", TotalIntrfAft: "0", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "52", ChlNumAft: "157", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "3", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "0", LoadBef: "8", LoadAft: "14", TotalIntrfBef: "0", TotalIntrfAft: "3", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "44", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "2", HistoryCnt: "4", BasicBSSID: "48-7A-DA-17-4D-E0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "2", LoadBef: "11", LoadAft: "22", TotalIntrfBef: "3", TotalIntrfAft: "8", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "44", ChlNumAft: "36", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "4330", RadioID: "3", HistoryCnt: "1", BasicBSSID: "48-7A-DA-17-4D-F0", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "64", UtilBef: "1", UtilAft: "1", LoadBef: "94", LoadAft: "94", TotalIntrfBef: "69", TotalIntrfAft: "69", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "6", ChlNumAft: "6", PwrLvlBef: "11", PwrLvlAft: "8", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "4330", RadioID: "3", HistoryCnt: "2", BasicBSSID: "48-7A-DA-17-4D-F0", ChangeTime: "2022-04-27T00:23:51", ReasonBitMap: "64", UtilBef: "0", UtilAft: "0", LoadBef: "94", LoadAft: "94", TotalIntrfBef: "83", TotalIntrfAft: "83", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "6", ChlNumAft: "6", PwrLvlBef: "8", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "1", HistoryCnt: "1", BasicBSSID: "70-3D-15-83-41-80", ChangeTime: "2022-04-26T21:53:51", ReasonBitMap: "2048", UtilBef: "0", UtilAft: "10", LoadBef: "6", LoadAft: "24", TotalIntrfBef: "3", TotalIntrfAft: "8", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "52", ChlNumAft: "36", PwrLvlBef: "11", PwrLvlAft: "11", RetryBef: "0", R: "8", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "3", HistoryCnt: "5", BasicBSSID: "70-3D-15-83-41-A0", ChangeTime: "2022-04-27T02:53:51", ReasonBitMap: "2048", UtilBef: "1", UtilAft: "24", LoadBef: "25", LoadAft: "42", TotalIntrfBef: "18", TotalIntrfAft: "9", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "1", ChlNumAft: "11", PwrLvlBef: "6", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "3", HistoryCnt: "6", BasicBSSID: "70-3D-15-83-41-A0", ChangeTime: "2022-04-27T05:23:51", ReasonBitMap: "2048", UtilBef: "1", UtilAft: "14", LoadBef: "37", LoadAft: "30", TotalIntrfBef: "17", TotalIntrfAft: "9", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "11", ChlNumAft: "1", PwrLvlBef: "6", PwrLvlAft: "6", RetryBef: "5", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "5530", RadioID: "3", HistoryCnt: "7", BasicBSSID: "70-3D-15-83-41-A0", ChangeTime: "2022-04-27T07:53:51", ReasonBitMap: "2048", UtilBef: "1", UtilAft: "5", LoadBef: "17", LoadAft: "19", TotalIntrfBef: "7", TotalIntrfAft: "7", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "1", ChlNumAft: "6", PwrLvlBef: "6", PwrLvlAft: "6", RetryBef: "0", RetryAft: "0", BandwidthBef: "1", BandwidthAft: "1" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "1", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T11:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "2", LoadBef: "1", LoadAft: "17", TotalIntrfBef: "3", TotalIntrfAft: "11", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "2", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T12:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "7", LoadAft: "8", TotalIntrfBef: "4", TotalIntrfAft: "4", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "161", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "3", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T13:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "14", TotalIntrfBef: "5", TotalIntrfAft: "11", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "4", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T14:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "10", TotalIntrfBef: "10", TotalIntrfAft: "10", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "153", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "5", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T16:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "14", LoadAft: "8", TotalIntrfBef: "11", TotalIntrfAft: "3", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "153", ChlNumAft: "157", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "6", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T18:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "3", LoadAft: "5", TotalIntrfBef: "2", TotalIntrfAft: "2", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "161", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "7", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T19:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "11", LoadAft: "8", TotalIntrfBef: "4", TotalIntrfAft: "4", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "8", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T20:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "12", LoadAft: "1", TotalIntrfBef: "8", TotalIntrfAft: "1", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "149", ChlNumAft: "157", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "9", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T21:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "1", LoadAft: "1", TotalIntrfBef: "1", TotalIntrfAft: "1", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "157", ChlNumAft: "161", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" },
        { ApName: "80f6-2edd-d2c0", RadioID: "1", HistoryCnt: "10", BasicBSSID: "80-F6-2E-DD-D2-C0", ChangeTime: "2022-04-27T23:54:06", ReasonBitMap: "4096", UtilBef: "0", UtilAft: "0", LoadBef: "3", LoadAft: "12", TotalIntrfBef: "2", TotalIntrfAft: "6", PacketErrBef: "0", PacketErrAft: "0", ChlNumBef: "161", ChlNumAft: "149", PwrLvlBef: "20", PwrLvlAft: "20", RetryBef: "0", RetryAft: "0", BandwidthBef: "2", BandwidthAft: "2" }
    ]
    for (let i = 0; i < rrmData.length; i++) {
        let time = rrmData[i].ChangeTime
        let sItem = dealReason(rrmData[i].ReasonBitMap)
        if (sItem == "") {
            rrmData[i].ReasonBitMap = "--"
        } else {
            rrmData[i].ReasonBitMap = sItem.substring(0, sItem.length - 1)
        }
        if (oAjustDataBytime[time]) {
            oAjustDataBytime[time].push(rrmData[i])
        } else {
            oAjustDataBytime[time] = []
            oAjustDataBytime[time].push(rrmData[i])
        }
        let apname = rrmData[i].ApName
        if (oAjustDataByAP1[apname]) {
            oAjustDataByAP1[apname].push(rrmData[i])
        } else {
            oAjustDataByAP1[apname] = []
            oAjustDataByAP1[apname].push(rrmData[i])
        }
    }
}*/
getConf()
let jumpAPDetail = (apname) => {
    router.push({
        path: "/DevInfo/AP/AP"
    })
}
const onSearch = (val) => {
    let isSearched = false
    let searchID = []
    for (let key in ID_host) {
        if (ID_host[key] == val) {
            isSearched = true
            oAjustDataByAP.data = {}
            oAjustDataByAP.data[key] = oAjustDataByAP1[key]
            searchID.push(key)
        }
    }
    if (isSearched) {
        for (let i = 0; i < searchID.length; i++) {
            oAjustDataByAP.data[searchID[i]] = oAjustDataByAP1[searchID[i]]
        }
    } else {
        oAjustDataByAP.data = {}
    }
    // if (oAjustDataByAP1[val]) {
    //     oAjustDataByAP.data = {}
    //     oAjustDataByAP.data[val] = oAjustDataByAP1[val]
    // } else {
    //     oAjustDataByAP.data = {}
    // }
}
const onCancel = () => {
    for (let i in oAjustDataByAP1) {
        oAjustDataByAP.data[i] = oAjustDataByAP1[i]
    }
}
</script>
<style scoped>
.wrap_byAP {
    /* margin-top: 20px; */
}
.ajustContent_wrap1 {
    padding-top: 20px;
    background: #ffffff;
}
.ajustbutton {
    position: absolute;
    top: 55px;
    right: 10px;
}
.search_input {
    width: 80%;
}
.drop1 {
    width: 100px;
    position: relative;
    height: 44px;
    margin-left: 10px;
}
.icondown {
    width: 14px;
    height: 14px;
}
.hide {
    display: none;
}
.show {
    display: block;
    position: absolute;
    z-index: 10;
    background: #ffffff;
    left: 0px;
    border: 1px solid #f7f7f7;
}
:deep(.van-collapse-item__content) {
    padding: 0;
}
.line {
    width: 1px;
    height: 14px;
    background: #333333;
    display: inline-block;
    margin-left: 10px;
    line-height: 44px;
}

/*AP*/
.wraps {
    margin-bottom: 10px;
}
.ajusttimestyle {
    line-height: 50px;
    background: #ffffff;
}
.toggle {
    width: 100%;
    background: #f7f7f7;
    line-height: 40px;
    border-bottom: 1px solid #d8d8d8;
}
.toggleleft {
    width: 50%;
    display: inline-block;
    text-align: left;
}
.toggleright {
    width: 50%;
    display: inline-block;
    text-align: right;
}
.special {
    border-bottom: none;
}
.van-collapse-item__content {
    background: #f7f7f7;
}
.before {
    color: #f43e3b;
}
.after {
    color: #00af6d;
}
.van-collapse-item__wrapper {
    background: #f7f7f7;
}
:deep(.van-collapse-item__content) {
    /* padding-top: 0;
    padding-bottom: 0; */
    padding: 0;
}
.contents {
    padding-left: 20px;
    padding-right: 20px;
    background: #f7f7f7;
}
.circle {
    display: inline-block;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin-right: 5px;
    background-color: #617cf0;
    vertical-align: middle;
}
.apcolor {
    color: #617cf0;
}
</style>
