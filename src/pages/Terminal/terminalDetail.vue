<template>
    <box-title :titleName="titleValue">{{ listTitle }}</box-title>
    <detail-list :listData="terminalData" />
    <div class="buttonStyle">
        <div ref="down" class="downButton" @click="downAp()">强制下线</div>
        <div ref="back" class="activeButton" @click="backFrom()">返回</div>
    </div>
</template>

<script setup>
import { getCurrentInstance, ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import DetailList from "./detailList"

const route = useRoute()
console.log("routeparams:" + route.query.TCID)
let tcid = route.query.TCID
const { t } = useI18n()
const titleValue = ref(t("Terminal.terminalName"))
const { proxy } = getCurrentInstance()
const $req = proxy.$req
let terminalData = ref({})
let listTitle = ref("")
let allDev = []

function mode802(value) {
    switch (value) {
        case "1":
            return "802.11b"
        case "2":
            return "802.11a"
        case "4":
            return "802.11g"
        case "8":
            return "802.11gn"
        case "16":
            return "802.11an"
        case "32":
            return "802.11gac"
        case "64":
            return "802.11ac"
        case "128":
            return "802.11gax"
        case "256":
            return "802.11ax"
        default:
            break
    }
}

// 强制下线成功
function disConnectSuccess() {
    console.log("disConnect-success")
}

// 强制下线
function downAp() {
    let oReset = $req.getTableInstance("ResetClient")
    oReset.addRows({ MacAddress: route.query.MAC })

    let sXml = $req.makeEditChannelXml("edit-config", [oReset], "merge")

    // 强制下线：由于漫游原因，给所有的tc设备下发相同的MAC地址，此处MAC指终端MAC
    let aReqTables = []
    for (let i = 0; i < allDev.length; i++) {
        if (allDev[i].Role == 2) {
            //如果是TC,获取当前TC的TCID，根据TCID下发终端的MAC进行reset操作

            let oEditChannel = oEditChannel + i
            oEditChannel = $req.getTableInstance("EditChannel")
            oEditChannel.addRows({ TargetType: "single", TCId: allDev[i].Id, Save: true, XmlRequest: sXml })
            aReqTables.push(oEditChannel)
        }
    }
    $req.action([aReqTables], disConnectSuccess, true)
}

onMounted(async () => {
    let oDeviceList = $req.getTableInstance("DeviceList")
    let OnlineStations = $req.getTableInstance("OnlineStations")
    let oStationWmmInformation = $req.getTableInstance("StationWmmInformation")
    let oStations = $req.getTableInstance("Stations")

    oDeviceList.addFilter({ Id: tcid })
    OnlineStations.addFilter({ MAC: route.query.MAC })
    oStationWmmInformation.addFilter({ MacAddress: route.query.MAC })
    oStations.addFilter({ MacAddress: route.query.MAC })

    // base64编码部分，临时隐藏
    // let sXmlDeviceList = $req.makeEditChannelXml("get", [oDeviceList])
    // let sXmlOnlineStations = $req.makeEditChannelXml("get", [OnlineStations])
    // let sXmlStationWmmInformation = $req.makeEditChannelXml("get", [oStationWmmInformation])
    // let sXmlStations = $req.makeEditChannelXml("get", [oStations])

    // let oGetChannel = $req.getTableInstance("GetChannel")
    // let oGetChannel2 = $req.getTableInstance("GetChannel")
    // let oGetChannel3 = $req.getTableInstance("GetChannel")
    // let oGetChannel4 = $req.getTableInstance("GetChannel")

    // oGetChannel.addRows({ TCId: tcid, XmlRequest: sXmlDeviceList })
    // oGetChannel2.addRows({ TCId: tcid, XmlRequest: sXmlOnlineStations })
    // oGetChannel3.addRows({ TCId: tcid, XmlRequest: sXmlStationWmmInformation })
    // oGetChannel4.addRows({ TCId: tcid, XmlRequest: sXmlStations })

    let aReqTable = []
    // aReqTable.push(oGetChannel, oGetChannel2, oGetChannel3, oGetChannel4)
    aReqTable.push(oDeviceList, OnlineStations, oStationWmmInformation, oStations)

    //getAll待确认
    await $req.getAll(aReqTable).then((data) => {
        let aDeviceList = $req.getTableRows("DeviceList", data)
        let aOnlineStations = $req.getTableRows("OnlineStations", data)
        let aStationWmmInformation = $req.getTableRows("StationWmmInformation", data)
        let aStations = $req.getTableRows("Stations", data)

        // 返回数据情况-待定
        // let XmlResponse = $req.getTableRows("GetChannel", data)
        // $req.decodingXmltoJson(XmlResponse)

        listTitle.value = aStations[0].Ssid

        terminalData.value = {
            [t("Terminal.ClassifyDeviceType")]: aStations[0].ClassifyDeviceType,
            [t("Terminal.IP")]: aStations[0].Ipv4Address,
            [t("Terminal.ApName")]: { name: aDeviceList[0].HostName, url: "/AP" },
            [t("Terminal.RadioId")]: "Radio" + aStations[0].RadioId,
            [t("Terminal.RadioType")]: aStations[0].RadioId == "1" ? "5G" : "2.4G",
            [t("Terminal.SSID")]: { name: aStations[0].Ssid, url: "/AP" },
            [t("Terminal.WireLessMode")]: mode802(aOnlineStations[0].WireLessMode),
            [t("Terminal.RSSI")]: aOnlineStations[0].RSSI,
            [t("Terminal.SupportedRate")]: aOnlineStations[0].SupportedRate,
            [t("Terminal.TxRate")]: aStations[0].TxRate,
            [t("Terminal.RxRate")]: aStations[0].RxRate,
            [t("Terminal.UpCacBytes")]: aStationWmmInformation[0].UpCacBytes,
            [t("Terminal.DownCacBytes")]: aStationWmmInformation[0].DownCacBytes,
            [t("Terminal.OnlineMoment")]: aOnlineStations[0].OnlineMoment,
            [t("Terminal.OnlineTime")]: aOnlineStations[0].OnlineTime,
            [t("Terminal.TotalOnlineCnt")]: aOnlineStations[0].TotalOnlineCnt,
            [t("Terminal.TotalOnlineTime")]: aOnlineStations[0].TotalOnlineTime
        }

        allDev = aDeviceList
    })
})

function backFrom() {
    history.go(-1) //回到浏览器上一页。
    // back.value.removeClass("downButton")
    // back.value.addClass("activeButton")
}
</script>

<style scoped>
.buttonStyle {
    background-color: #f7f7f7;
    width: 100%;
    height: 87px;
    display: flex;
    align-items: end;
}
.buttonStyle div {
    width: 50%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
}
.downButton {
    background-color: #ffffff !important;
    color: #333333;
}
.activeButton {
    background-color: #617cf0 !important;
    color: #ffffff;
}

.viewButton {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    display: flex;
    align-items: center;
}
.goHistory {
    width: 12px;
    height: 12px;
    margin-top: 2px !important;
}
</style>
