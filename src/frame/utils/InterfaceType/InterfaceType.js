import oRequest from "../request"
import checkAddr from "../Base"
import i18n from "@/i18n/i18n"
import getNCData from "./NCData"
import test from "./test"
const $t = i18n.global.t
const testData = test.testData

// g: global, o: object, a: array, b: boolean, s: string
let gaDialer = [],
    gsPort,
    gsVpnNatBoundsNum,
    gaInterfaces = [],
    gaInterfacesList = [],
    gaCellularInfo = [],
    goXBInterfaces,
    gaServerOnInterfaces,
    gaIpv4Addresses,
    goCellularList = {},
    goPBRIF = {},
    gaIbBackup,
    goMainBpi = {},
    goBpi = {},
    gaDiaRange,
    gaGERange,
    gaRoutePort = [],
    gbIfSupportLB = true

const initInterface = async () => {
    let NCList = []
    NCList.push(oRequest.getTableInstance("Outbound"))
    NCList.push(oRequest.getTableInstance("Interfaces"))
    NCList.push(oRequest.getTableInstance("XBInterfaces"))
    NCList.push(oRequest.getTableInstance("ServerOnInterfaces"))
    NCList.push(oRequest.getTableInstance("DHCPAlloc"))
    NCList.push(oRequest.getTableInstance("Ipv4Addresses"))
    NCList.push(oRequest.getTableInstance("SubChannel"))
    NCList.push(oRequest.getTableInstance("PBRIF"))
    NCList.push(oRequest.getTableInstance("PBRPolicyNode"))
    NCList.push(oRequest.getTableInstance("PBRApplyOutInterface"))
    NCList.push(oRequest.getTableInstance("MonitorPort"))
    NCList.push(oRequest.getTableInstance("IbBackup"))
    NCList.push(oRequest.getTableInstance("PPPUserPap"))

    let responseXml = await oRequest.getAll(NCList)
    responseXml = testData
    const aOutbound = oRequest.getTableRows("Outbound", responseXml)
    const aInterfaces = oRequest.getTableRows("Interfaces", responseXml)
    const aXBInterfaces = oRequest.getTableRows("XBInterfaces", responseXml) || []
    const aServerOnInterfaces = oRequest.getTableRows("ServerOnInterfaces", responseXml)
    const aDHCPAlloc = oRequest.getTableRows("DHCPAlloc", responseXml)
    const aIpv4Addresses = oRequest.getTableRows("Ipv4Addresses", responseXml)
    const aSubChannel = oRequest.getTableRows("SubChannel", responseXml)
    const aCapabilities = oRequest.getTableRows("Capabilities", responseXml)
    const aPBRIF = oRequest.getTableRows("PBRIF", responseXml) // to get policy route
    const aPBRPolicyNode = oRequest.getTableRows("PBRPolicyNode", responseXml)
    const aPBRApplyOutInt = oRequest.getTableRows("PBRApplyOutInterface", responseXml)
    const oMonitorPort = oRequest.getTableRows("MonitorPort", responseXml)
    const aIbBackup = oRequest.getTableRows("IbBackup", responseXml)
    const aPPPUserPap = oRequest.getTableRows("PPPUserPap", responseXml)

    gaServerOnInterfaces = aServerOnInterfaces
    gsPort = oMonitorPort.PortLayer

    let oPBROutIntArray = {}
    aPBRIF.forEach(function(value) {
        if (!oPBROutIntArray[value.PolicyName]) {
            oPBROutIntArray[value.PolicyName] = value
        }
    })
    aPBRPolicyNode.forEach(function(value) {
        if (oPBROutIntArray[value.PolicyName]) {
            oPBROutIntArray[value.PolicyName]["ACLNumber"] = value["ACLNumber"]
        }
    })

    for(let i = 0; i < aPBRApplyOutInt.length; i++) {
        let value = aPBRApplyOutInt[i]

        if (goPBRIF[value.IfIndex]) {
            goPBRIF[value.IfIndex]["array"].push(oPBROutIntArray[value.PolicyName])
        }

        if (!goPBRIF[value.IfIndex]) {
            goPBRIF[value.IfIndex] = {}
            goPBRIF[value.IfIndex]["ThreeIndex"] = value.IfIndex
            goPBRIF[value.IfIndex]["array"] = []
            goPBRIF[value.IfIndex]["array"].push(oPBROutIntArray[value.PolicyName])
        }
    }

    // 这里假定只有一个ACLNumber，如果有多个，而且找到的第一个是错的，就会出问题
    for (let i = 0; i < aOutbound.length; i++) {
        if (aOutbound[i].ACLNumber) {
            gsVpnNatBoundsNum = aOutbound[i].ACLNumber
            break
        }
    }

    gaIbBackup = aIbBackup
    for (let bp = 0; bp < gaIbBackup.length; bp++) {
        goMainBpi[gaIbBackup[bp].IfIndex] = 1
        goBpi[gaIbBackup[bp].BackupIfIndex] = 1
    }

    getRange(aCapabilities, aInterfaces)

    const cellularReg = /^Cellular.+$/
    let XBInterfacesList = aXBInterfaces

    for (let i = 0; i < aInterfaces.length; i++) {
        let inf = aInterfaces[i]
        if (cellularReg.test(inf.AbbreviatedName)) {
            XBInterfacesList.push({
                IfIndex: inf.IfIndex,
                PortPanel: "Cellular"
            })
            goCellularList[inf.IfIndex] = inf
        }
    }

    let oMap = {}
    goXBInterfaces = Object.fromEntries(lanToLanNum(XBInterfacesList).map((item, index) => [index + 1, item]))
    gaInterfacesList = JSON.parse(JSON.stringify(aInterfaces))

    for (let i = 0; i < gaInterfacesList.length; i++) {
        let inf = gaInterfacesList[i]
        gaInterfaces.push(inf)
        oMap[inf.IfIndex] = inf

        if(inf.Name.search("Dialer") != -1){
            gaDialer.push(inf)
        }

        aSubChannel.map((subChannel) => {
            if (subChannel.SubChannelIndex == inf.IfIndex) {
                goCellularList[subChannel.IfIndex].PortLayer = inf.PortLayer
                goCellularList[subChannel.IfIndex].SubIndex = inf.IfIndex
                goCellularList[subChannel.IfIndex].ConfigMTU = inf.ConfigMTU
                goCellularList[subChannel.IfIndex].OperStatus = inf.OperStatus
            }
        })

        if (!goXBInterfaces[inf.IfIndex]) {
            gaInterfacesList.splice(i, 1)
            i--
        } else {
            inf.PortLayer = getShowPortLayer(inf.PortLayer)
            inf.OperStatus = getShowOperStatus(inf.OperStatus)
            inf.AbbreviatedName = goXBInterfaces[inf.IfIndex].Name
            inf.connetType = $t("Interface.noneCfg")
            inf.LinkStatus = $t("Interface.unconnected")
            inf.Workmode = getWorkmode(inf.IfIndex)

            if (inf.Workmode == $t("Interface.connectedBackup")) {
                for(let n = 0; n < gaIbBackup.length; n++) {
                    if (inf.IfIndex == gaIbBackup[n].BackupIfIndex) {
                        let MainInterface = getInterface(gaIbBackup[n].IfIndex)
                        inf.MainIfIndex = MainInterface[0].Index
                        inf.MainDescription = MainInterface[0].IndexName
                        break
                    }
                }
            } else if (inf.Workmode == $t("Interface.connectedWork")) {
                if (gaIbBackup.length != 0) {
                    inf.BackupInteface = getBackupName(inf.IfIndex)
                }
            }
        }
    }

    gaIpv4Addresses = aIpv4Addresses
    let oIpv4Addresses = Object.fromEntries(aIpv4Addresses.map((item, index) => [index, item]))
    for (let i = 0; i < aDHCPAlloc.length; i++) {
        let dhcp = aDHCPAlloc[i]

        if (oMap[dhcp.IfIndex]) {
            if (dhcp.AllocEnable == "true") {
                oMap[dhcp.IfIndex].connetType = $t("Interface.dnsIp")
                oMap[dhcp.IfIndex].AllocEnable = "true"
                oMap[dhcp.IfIndex].LinkStatus = oIpv4Addresses[dhcp.IfIndex] ? $t("Interface.connected") : $t("Interface.unconnected")
            }
        }
    }

    for (let i = 0; i < aIpv4Addresses.length; i++) {
        let ip = aIpv4Addresses[i]
        if (oMap[ip.IfIndex]) {
            if (oMap[ip.IfIndex].AllocEnable != "true" && ip.Ipv4Address) {
                oMap[ip.IfIndex].connetType = $t("Interface.staticIp")
                oMap[ip.IfIndex].Ipv4Address = ip.Ipv4Address
                oMap[ip.IfIndex].Ipv4Mask = ip.Ipv4Mask
                oMap[ip.IfIndex].LinkStatus = getShowOperStatus(oMap[ip.IfIndex].OperStatus)
            }
        }
    }

    for (let i = 0; i < aPPPUserPap.length; i++) {
        let pap = aPPPUserPap[i]
        let IfIndex = portDtoG(pap.IfIndex)
        if (oMap[IfIndex]) {
            if (!(oMap[IfIndex].AllocEnable == "true")) {
                oMap[IfIndex].connetType = "PPPoE"
                oMap[IfIndex].UserName = pap.UserName
                oMap[IfIndex].PassWord = pap.PassWord
                oMap[IfIndex].LinkStatus = oIpv4Addresses[pap.IfIndex] ? $t("Interface.connected") : $t("Interface.unconnected")
            }
        }
    }

    for (let key in goCellularList) {
        let CellularInfo = goCellularList[key]
        CellularInfo.AbbreviatedName = goXBInterfaces[CellularInfo.IfIndex].Name
        CellularInfo.connetType = $t("Interface.cfgLte")
        CellularInfo.PortLayerNum = CellularInfo.PortLayer
        CellularInfo.PortLayer = getShowPortLayer(CellularInfo.PortLayer)
        CellularInfo.LinkStatus = getShowOperStatus(CellularInfo.OperStatus)


        if (CellularInfo.SubIndex) {
            CellularInfo.Workmode = getWorkmode(CellularInfo.SubIndex,gaIbBackup)
            if (CellularInfo.Workmode == $t("Interface.connectedBackup")) {
                for (let n = 0; n < gaIbBackup.length; n++) {
                    if (CellularInfo.SubIndex == gaIbBackup[n].BackupIfIndex) {
                        let MainInterface = getInterface(gaIbBackup[n].IfIndex)
                        CellularInfo.MainIfIndex = MainInterface[0].Index
                        CellularInfo.MainDescription = MainInterface[0].IndexName
                        break
                    }
                }
            } else if(CellularInfo.Workmode == $t("Interface.connectedWork")) {
                if (gaIbBackup.length != 0) {
                    CellularInfo.BackupInteface = getBackupName(CellularInfo.SubIndex)
                }
            }
            gaCellularInfo.push(CellularInfo)
        }
    }

    for(let i = 0; i < gaInterfacesList.length; i++){
        gaRoutePort.push({ Name: gaInterfacesList[i].Name, value: gaInterfacesList[i].IfIndex })

    }

    for(let j = 0; j < gaCellularInfo.length; j++){
        gaRoutePort.push({ Name: gaCellularInfo[j].Name, value: gaCellularInfo[j].SubIndex })
    }

    return {
        gaInterfacesList: gaInterfacesList,
        gaCellularInfo: gaCellularInfo
    }
}

const getInterfaceData = (data, oRowData) => {
    console.log(gsPort)

    // 初始化默认数据
    data.mtu = data.mtu == "" ? 1500 : data.mtu

    let returnData = {}
    // 一期不涉及连接方式
    if (ifChangeWorkmode) { console.log("ChangeWorkmode") }

    returnData.push(getNCData.mInterfaces(data.IfIndex, data.mtu))

    let GETcpMss = parseInt(data.mtu) - 102
    GETcpMss = GETcpMss <= 128 ? 128 : GETcpMss
    returnData.push(getNCData.mIPFWTcpMss(data.IfIndex, GETcpMss))

    let sDiaIndex = getDiaByGE(data.IfIndex)
    let sDialerIndex = portDtoG(data.IfIndex)
    if (data.connetType == 0) {
        data.mtu = data.mtu - 8
        let ncInterfaceRows = getNCData.mInterfaces(sDiaIndex, data.mtu).rows
        returnData = getNCData.addRows("Interface", ncInterfaceRows, returnData)

        let nDiaTcpMss = GETcpMss - 8
        nDiaTcpMss = nDiaTcpMss <= 128 ? 128 : nDiaTcpMss
        let ncIPFWTcpMssRows = getNCData.mIPFWTcpMss(sDiaIndex, nDiaTcpMss).rows
        returnData = getNCData.addRows("IPFWTcpMss", ncIPFWTcpMssRows, returnData)
    } else {
        returnData.push(getNCData.dDDR(sDialerIndex))
    }

    let bIfChangePBR = false
    let isNeedDelPppoe = false
    let isNeedDelDialer = false
    let isNeedAddDialer = false
    if (data.connetType == 2) {
        returnData.push(getNCData.mDHCPAlloc(data.IfIndex, true))

        if (oRowData.connetType == $t("PPPoE")) {
            isNeedDelPppoe = true

            // getDelPPPoEData
            returnData.push(getDelPPPoEData(data.IfIndex))

            if (sDialerIndex) {
                returnData.push(delVpnCfg(sDialerIndex))
            }

            let aServerData = getServerDataByIfIndex(sDialerIndex)
            if (aServerData.length > 0) {
                isNeedDelDialer = true
                returnData.push(getServerData(data.IfIndex, sDialerIndex, aServerData))
            }

            // delPBRApplyInt
            if (goPBRIF != {} && goPBRIF[sDialerIndex] != undefined) {
                // addPBRApplyInt
                bIfChangePBR = true
            } else {
                bIfChangePBR = false
            }

            // addVpnCfg
            returnData.push(addVpnCfg(data.IfIndex))

            if (gbIfSupportLB) {
                returnData.push(getNCData.dLBLinks(data.AbbreviatedName))
            }
        } else if (oRowData.connetType == $t("Interface.noneCfg")) {
            returnData.push(addVpnCfg(data.IfIndex))
        }

        returnData.push(delRoute(data))
    } else if (data.connetType == 1) {
        let result = ipAndMaskIsIllegal(data.ip, data.mask)
        if (result) {
            returnData.push(getNCData.mDHCPAlloc(data.IfIndex, false))

            if (oRowData.connetType == $t("Interface.staticIp")) {
                returnData.push(delIp(data))
                returnData.push(delRoute(data))
            } else if (oRowData.connetType == $t("Interface.dnsIp")) {
                returnData.push(delIp(data))
            } else if (oRowData.connetType == "PPPoE") {
                isNeedDelPppoe = true
                returnData.push(getDelPPPoEData(data.IfIndex))

                if (gbIfSupportLB) {
                    returnData.push(getNCData.dLBLinks(data.AbbreviatedName))
                }

                let aServerData = getServerDataByIfIndex(sDialerIndex)
                if (aServerData.length > 0) {
                    isNeedDelDialer = true
                    returnData.push(getServerData(data.IfIndex, sDialerIndex, aServerData))
                }

                // delPBRApplyInt
                if (goPBRIF != {} && goPBRIF[sDialerIndex] != undefined) {
                    // addPBRApplyInt
                    bIfChangePBR = true
                }

                returnData.push(delVpnCfg(sDialerIndex))
                returnData.push(addVpnCfg(data.IfIndex))
                returnData.push(delRoute(data))
            } else if (oRowData.connetType == $t("Interface.noneCfg")) {
                returnData.push(addVpnCfg(data.IfIndex))
            }

            let error = false
            for (let i = 0; i < gaIpv4Addresses.length; i++) {
                let item = gaIpv4Addresses[i]
                let resultCheckAddr = checkAddr([item.Ipv4Address, item.Ipv4Mask], [data.Ipv4Address, data.mask])
                if (!resultCheckAddr) {
                    error = true
                    break
                }
            }

            if (!error) {
                returnData.push(getNCData.mIpv4Addresses(data.Ipv4Address, data.mask, oRowData.IfIndex))
                let router = data.router == "" ? data.Ipv4Address.replace(/\.\d+$/,".1") : router
                returnData.push(getNCData.mStaticRoute(oRowData.IfIndex, router))
            }
        }
    } else if (data.connetType == 0 && data.password != oRowData.password && data.userName != oRowData.UserName) {
        returnData.push(getNCData.mDHCPAlloc(data.IfIndex, false))

        if (oRowData.connetType == $t("Interface.staticIp")) {
            returnData.push(delIp(data))
            returnData.push(delRoute(data))
        }

        if (oRowData.connetType != "PPPoE") {
            let aServerData = getServerDataByIfIndex(sDialerIndex)
            if (aServerData.length > 0) {
                isNeedDelDialer = true
                returnData.push(getServerData(data.IfIndex, sDialerIndex, aServerData))
            }

            // delPBRApplyInt
            if (goPBRIF != {} && goPBRIF[sDialerIndex] != undefined) {
                // addPBRApplyInt
                bIfChangePBR = true
            }

            returnData.push(delVpnCfg(sDialerIndex))
            returnData.push(addVpnCfg(data.IfIndex))
        }

        returnData.push(getNCData.mPppoecClient(oRowData.IfIndex, data.IfIndex))

        let dialerIfIndex = null
        for (let i = 0; i < gaDialer.length; i++) {
            let item = gaDialer[i]
            if (item.Name.split("Dialer")[1] == oRowData.Name.split("1/0/")[1]) {
                dialerIfIndex = item.IfIndex
                break
            }
        }
        returnData.push(getNCData.dStaticRoute(dialerIfIndex, "0.0.0.0"))
        returnData.push(getNCData.mPPPUserPap(dialerIfIndex, data.userName, data.password))
        returnData.push(getNCData.mPPPUserChap(dialerIfIndex, data.userName, data.password))
    }

    returnData.push(getNCData.dStaticRoute(oRowData.IfIndex, "0"))

    if (isNeedDelPppoe == false && isNeedDelDialer == false && isNeedAddDialer == false) {
        // 删除remove NC
    }

    if (bIfChangePBR) {
        // onDelPBRSuc
    } else {
        if (data.connetType == 0) {
            // onAddDDRIDLE
        } else {
            // refreshCurPage
        }
    }

    submit4GEdit
}

const submit4GEdit = () => {

}

const getRange = (aCapArr, aInterfaces) => {
    for (let i in aInterfaces) {
        for (let j in aCapArr) {
            if (aInterfaces[i].IfIndex == aCapArr[j].IfIndex
                && aInterfaces[i].AbbreviatedName.split("/")[0].indexOf("GE") != -1
                && aCapArr[j].MaxMTU != null && aCapArr[j].MinMTU != null) {

                for (let x in aInterfaces) {
                    if (aInterfaces[i].IfIndex == aInterfaces[x].IfIndex) {
                        for (let y in aInterfaces) {
                            if (aInterfaces[y].AbbreviatedName == "Dia" + aInterfaces[x].AbbreviatedName.split("/")[aInterfaces[x].AbbreviatedName.split("/").length - 1]) {
                                for (let z in aCapArr) {
                                    if (aInterfaces[y].IfIndex == aCapArr[z].IfIndex) {
                                        gaDiaRange = [parseInt(aCapArr[z]["MinMTU"]) + 8, parseInt(aCapArr[z]["MaxMTU"]) + 8]
                                    }
                                }
                            }
                        }
                    }
                }

                gaGERange = [parseInt(aCapArr[j]["MinMTU"]), parseInt(aCapArr[j]["MaxMTU"])]
                break
            }
        }
    }

    if (gaDiaRange && gaGERange) {
        // getRange
    }
}

const getShowPortLayer = (PortLayer) => {
    if(PortLayer == 1){
        PortLayer = $t("Default")
    } else if (PortLayer == 2) {
        PortLayer = $t("Work")
    } else {
        PortLayer = $t("Backup")
    }
    return PortLayer
}

const getShowOperStatus = (OperStatus) => {
    if(OperStatus == 1) {
        OperStatus = $t("Interface.up")
    } else if(OperStatus == 2) {
        OperStatus = $t("Interface.down")
    } else if(OperStatus == 3) {
        OperStatus = $t("Interface.testing")
    } else if(OperStatus == 4) {
        OperStatus = $t("Interface.unknown")
    } else if(OperStatus == 5) {
        OperStatus = $t("Interface.dormant")
    } else if(OperStatus == 6) {
        OperStatus = $t("Interface.notPresent")
    } else if(OperStatus == 7) {
        OperStatus = $t("Interface.lowerLayerDown")
    }
    return OperStatus
}

// 获取三层接口类型
const getWorkmode = (IfIndex) => {
    let oWorkmode = ""

    if(0 == gaIbBackup.length) {
        oWorkmode = $t("Interface.connectedWork")
    } else {
        for (let i = 0; i < gaIbBackup.length; i++) {
            if (IfIndex == gaIbBackup[i].BackupIfIndex) {
                oWorkmode = $t("Interface.connectedBackup")
                break
            } else if (i == gaIbBackup.length - 1) {
                oWorkmode = $t("Interface.connectedWork")
            }
        }
    }

    return oWorkmode
}

const getInterface = (IfIndex) => {
    let aTmp = []

    for (let i = 0; i < gaInterfacesList.length; i++) {
        if (IfIndex == gaInterfacesList[i].IfIndex) {
            aTmp.push({ Index: IfIndex, IndexName: gaInterfacesList[i].Name })
        }
    }

    return aTmp
}

const getBackupName = (IfIndex) => {
    let oBackupName = []
    for (let i = 0; i < gaIbBackup.length; i++) {
        if (IfIndex == gaIbBackup[i].IfIndex) {
            let Name = getInterfaceName(gaIbBackup[i].BackupIfIndex)
            oBackupName.push({ BackupIndex: gaIbBackup[i].BackupIfIndex, BackupName: Name })

        }
    }

    return oBackupName
}

const getInterfaceName = (BackupIfIndex) => {
    let aTemp = ""
    for (let i = 0; i < gaInterfacesList.length; i++) {
        if(gaInterfacesList[i].IfIndex == BackupIfIndex) {
            aTemp = gaInterfacesList[i].Name
            break
        }
    }
    return aTemp
}

const getDiaByGE = (sIfIndex) => {
    for(let i in gaInterfaces){
        if(gaInterfaces[i].IfIndex == sIfIndex){
            for(let j in gaInterfaces){
                if(gaInterfaces[j].AbbreviatedName == "Dia" + gaInterfaces[i].AbbreviatedName.split("/")[gaInterfaces[i].AbbreviatedName.split("/").length - 1]){
                    return gaInterfaces[j].IfIndex
                }
            }
        }
    }
}

const portDtoG = (IfIndex) => {
    let sGEIndex
    let portNum

    for (let i = 0; i < gaInterfaces.length; i++) {
        if (IfIndex == gaInterfaces[i].IfIndex) {
            portNum = gaInterfaces[i].Name.split("Dialer")[1]
            break
        }
    }

    for (let i = 0; i < gaInterfaces.length; i++) {
        if (portNum == gaInterfaces[i].Name.split("1/0/")[1]) {
            sGEIndex = gaInterfaces[i].IfIndex
            break
        }
    }

    return sGEIndex
}

const getServerDataByIfIndex = (IfIndex) => {
    let aOpt = []
    for (let i = 0; gaServerOnInterfaces.length && (i < gaServerOnInterfaces.length); i++) {
        if (IfIndex == gaServerOnInterfaces[i].IfIndex) {
            aOpt.push(gaServerOnInterfaces[i])
        }
    }
    return aOpt
}

// {IfIndex: "1", PortPanel: "LAN"} --> {IfIndex: "1", Name: "LAN1"}
const lanToLanNum = (aData) => {
    let aTmp = []
    let nLan = 0, nWan = 0

    for (let i = 0; i < aData.length; i++) {
        if (aData[i].PortPanel != "INNER") {
            let nTmp = null

            if (aData[i].PortPanel == "LAN") {
                nLan++
                nTmp = nLan
            } else if (aData[i].PortPanel == "WAN") {
                nWan++
                nTmp = nWan
            }

            aTmp.push({
                IfIndex: aData[i].IfIndex,
                Name: aData[i].PortPanel + nTmp
            })
        }
    }

    return aTmp
}

// 一期不涉及连接方式
const ifChangeWorkmode = () => {
    return false
}

const addVpnCfg = (IfIndex) => {
    let ncList = []

    if (gsVpnNatBoundsNum) {
        ncList.push(getNCData.dOutbound(IfIndex, gsVpnNatBoundsNum))
        ncList.push(getNCData.mOutbound(IfIndex))
    }
    return ncList
}

const delVpnCfg = (IfIndex) => {
    let ncList = []

    if (gsVpnNatBoundsNum) {
        ncList.push(getNCData.dOutbound(IfIndex, gsVpnNatBoundsNum))
        ncList.push(getNCData.mOutbound(IfIndex))
    }
    return ncList
}

const delRoute = (rowData) => {
    let ip = null
    let index = rowData.IfIndex
    if (rowData.connetType != $t("Interface.staticIp")) {
        for (let i = 0; i < gaDialer.length; i++) {
            let NameMark = gaDialer[i].Name.split("Dialer")[1]
            if (NameMark == rowData.Name.split("1/0/")[1]) {
                index = gaDialer[i].IfIndex
                break
            }
        }
        ip = "0.0.0.0"
    } else {
        ip = rowData.router || rowData.InetAddressIPV4.replace(/\.\d+$/,".1")
    }

    return getNCData.dStaticRoute(index, ip)
}

const delIp = (rowData) => {
    let ncList = []
    if (typeof(rowData.InetAddressIPV4) != "undefined" && rowData.InetAddressIPV4 != "") {
        ncList.push(getNCData.dIpv4Addresses(rowData.IfIndex, rowData.InetAddressIPV4))
    }

    let index = -1
    for (let i = 0 ; i < gaIpv4Addresses.length ; i++) {
        if (gaIpv4Addresses[i].Ipv4Address == rowData.InetAddressIPV4) {
            index = i
            break
        }
    }

    if(index != -1){
        gaIpv4Addresses.splice(index, 1)
    }

    return ncList
}

const getDelPPPoEData = (IfIndex) => {
    const ncList = []
    let dialerIfIndex = null
    for (let i = 0; i < gaDialer.length; i++) {
        if (gaDialer[i].Name.split("Dialer")[1] == IfIndex) {
            dialerIfIndex = gaDialer[i].IfIndex
        }
    }
    ncList.push(getNCData.dPPPUserPap(dialerIfIndex))
    ncList.push(getNCData.dPPPUserChap(dialerIfIndex))
    ncList.push(getNCData.dPppoecClient(dialerIfIndex))
    ncList.push(getNCData.mInterfaces(dialerIfIndex, 1492))
    ncList.push(getNCData.mIPFWTcpMss(dialerIfIndex, 1390))

    return ncList
}

const getServerData = (IfIndex, sDialerIndex, aServerData) => {
    const ncList = []
    let ncmServerOnInterfaces = {
        NC: "ServerOnInterfaces",
        operation: "merge",
        rows: []
    }
    let ncdServerOnInterfaces = {
        NC: "ServerOnInterfaces",
        operation: "remove",
        rows: []
    }

    for (let i = 0; i < aServerData.length; i++) {
        ncmServerOnInterfaces.push(getNCData.mServerOnInterfaces(IfIndex, aServerData[i]).rows)
        ncdServerOnInterfaces.push(getNCData.dServerOnInterfaces(sDialerIndex, aServerData[i]).rows)
    }

    ncList.push(ncmServerOnInterfaces)
    ncList.push(ncdServerOnInterfaces)
    return ncList
}

const pppoeData = (userName, password) => {
    const data = {}
    data.ConnectType = "0"
    console.log(userName)
    console.log(password)
    return "pppoe"
}

const staticIPData = (IP, netmask, gateway, dnsList) => {
    const data = {}
    data.ConnectType = "1"
    console.log(IP)
    console.log(netmask)
    console.log(gateway)
    console.log(dnsList)
    return "staticIP"
}

const ipToNumber = (ip) => {
    let ipNum = 0
    let num = ip.split(".")
    ipNum = parseInt(num[0]) * 256 * 256 * 256 +
            parseInt(num[1]) * 256 * 256 +
            parseInt(num[2]) * 256 +
            parseInt(num[3])
    ipNum = ipNum >>> 0
    return ipNum
}

const ipIsValid = (ipNum) => {
    if ((((ipNum & 0xff000000) >>> 0) == 0x7f000000) ||
        (((ipNum & 0xff000000) >>> 0) == 0)) {
        return false
    }
    if ((((ipNum & 0x80000000) >>> 0) != 0) &&
        (((ipNum & 0xc0000000) >>> 0) != 0x80000000) &&
        (((ipNum & 0xe0000000) >>> 0) != 0xc0000000)) {
        return false
    }
    return true
}

const maskIsValid = (maskNum) => {
    let i = 0
    let maskTemp = 0xffffffff
    if (0xffffffff == maskNum) {
        return false
    }
    for (i = 0; i <= 32; i++) {
        if (maskNum == maskTemp) {
            return true
        }
        maskTemp = maskTemp << 1
        maskTemp = maskTemp >>> 0
    }
    return false
}

const ipAndMaskIsIllegal = (ip, mask) => {
    let ipNum = ipToNumber(ip)
    let result = ipIsValid(ipNum)
    if (result == false) {
        return false
    }
    let maskNum = ipToNumber(mask)
    result = maskIsValid(maskNum)
    if(result == false){
        return false
    }

    if (((0xffffffff - 1) >>> 0) != maskNum){
        let netId = (ipNum & maskNum) >>> 0
        let hostId = (ipNum & ~maskNum) >>> 0
        let maskNum2 = (~maskNum) >>> 0
        if ((hostId == 0x00000000) || (hostId == maskNum2)){
            return false
        }

        if ((netId == 0x00000000) || (netId == maskNum)){
            return false
        }
    }
    return true
}

const dhcpData = () => {
    const data = []
    // data.push(NCDDR)

    // if (!gsVpnNatBoundsNum) {
    //     data.push(NCOutbound)
    // }

    // if (gsPort.ConnectType == "1" && gsPort.Route) {
    //     data.push(NCStaticRoute)
    // } else if (gsPort.ConnectType == "0") {
    //     data.push(NCDelPPPoE)

    //     if (gaServerOnInterfaces) {
    //         data.push(NCDelInterfaceMap)
    //     }
    // }

    // const DDR = {}
    // data.ConnectType = "2"
    return data
}

export default { pppoeData, staticIPData, dhcpData, initInterface, getInterfaceData }