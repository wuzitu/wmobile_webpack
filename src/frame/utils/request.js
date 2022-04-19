// 第一次搭建框架，继续使用jquery
import $ from "jquery"
import { Toast } from "vant"
import axios from "axios"
import qs from "qs"
import Base from "./Base"
import MyConfig from "./MyConfig"
import NC from "../../../public/nc"
import i18n from "@/i18n/i18n"
import tmpJson from "./tmpJSON"

const $t = i18n.global.t

const Utils = {
    Base,
    Request: oRequest
}

const oRequest = {
    getTableInstance: getTableInstance,
    getTableRows: getTableRows,
    mergeRequestTables: mergeRequestTables,
    set: set,
    action: action,
    getAll: getAll,
    getBulk: getBulk,
    get: get,
    getConfigAll: getConfigAll,
    saveCfg: saveCfg,
    loadCfg: loadCfg,
    rollbackCfg: rollbackCfg,
    sendCli: sendCli,
    sendUrl: sendUrl,
    clearMoudleAjax: clearMoudleAjax
}

function sendUrl(sUrl, pfOnSuccess, pfOnFailed) {
    let opt = {
        onSuccess: pfOnSuccess,
        onFailed: pfOnFailed
    }
    return sendRequest(sUrl, "url", opt)
}

function saveCfg(sFileName, bAllMdc, pfOnSuccess, pfOnFailed) {
    let sXml = oActionFunc["save"]("save", sFileName, bAllMdc)
    let opt = pfOnSuccess || {}

    if (!$.isPlainObject(opt)) {
        opt = {
            onSuccess: pfOnSuccess,
            onFailed: pfOnFailed
            // showSucMsg: false,
            // showErrMsg: false
        }
    }

    return sendRequest("set.j", sXml, opt)
}

function loadCfg(sFileName, bAllMdc, pfOnSuccess, pfOnFailed) {
    let sXml = oActionFunc["load"]("load", sFileName, bAllMdc)
    let opt = {
        onSuccess: pfOnSuccess,
        onFailed: pfOnFailed
    }
    return sendRequest("set.j", sXml, opt)
}

function rollbackCfg(sFileName, pfOnSuccess, pfOnFailed) {
    let sXml = oActionFunc["rollback"]("rollback", sFileName, false)
    let opt = {
        onSuccess: pfOnSuccess,
        onFailed: pfOnFailed
    }
    return sendRequest("set.j", sXml, opt)
}

function sendCli(cli, pfOnSuccess, pfOnFailed) {
    let aCli = cli
    if (!$.isArray(cli)) {
        aCli = []
        aCli.push(cli)
    }

    let sUrl = "get.j"

    ////{{ local run start
    if (true === MyConfig.config.local) {
        sUrl = aCli[0] + ".j"
    }
    ////}}

    let opt = pfOnSuccess || {}
    if (!$.isPlainObject(opt)) {
        opt = {
            onSuccess: pfOnSuccess,
            onFailed: pfOnFailed,
            dataType: "text"
        }
    }

    return sendRequest(sUrl, makeCliXml(aCli), opt)
}

function getConfigAll(oTables, pfFunc) {
    return procGet("get-config", oTables, pfFunc)
}

function getAll(oTables, pfFunc, pfOnFailed, oOpts) {
    return procGet("get", oTables, pfFunc, pfOnFailed, oOpts)
}

function getBulk(oTables, pfFunc, pfOnFailed, oOpts) {
    return procGet("get-bulk", oTables, pfFunc, pfOnFailed, oOpts)
}

function get(oTables, nCount, pfFunc, pfOnFailed) {
    return procGet("get", oTables, pfFunc, pfOnFailed, null, nCount)
}

function convertToXmlStr(sStr) {
    return sStr.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/ /g, "&#32;")
}

////{{ local run start
function _getUrl(sXml) {
    if (!sXml) {
        return "get.j"
    }

    let nStart = sXml.indexOf("<top ")
    let sTemp = sXml.substring(nStart + 5)

    nStart = sTemp.indexOf(">")
    sTemp = sTemp.substring(nStart + 2)

    let nEnd = sTemp.indexOf(">")
    let sUrl = sTemp.substring(0, nEnd).toLowerCase()

    return sUrl + ".php"
}
////}}

function procGet(sType, oTables, pfOnSuccess, pfOnFailed, oOpts, nCount) {
    let aTables = oTables
    if (!$.isArray(oTables)) {
        aTables = [oTables]
    }

    let sXml = oActionFunc[sType](sType, aTables, nCount)

    let sUrl = "get.j"
    let opt = pfOnSuccess || {}
    if (!$.isPlainObject(opt)) {
        opt = {
            onSuccess: pfOnSuccess,
            onFailed: pfOnFailed
        }
    }

    if (oOpts) {
        $.each(oOpts, function (sIndex, oItem) {
            opt[sIndex] = oItem
            return
        })
    }

    ////{{ local run start
    if (MyConfig.config.local) {
        sUrl = opt.name ? opt.name + ".php" : _getUrl(sXml)
    }
    ////}}
    return sendRequest(sUrl, sXml, opt)
}

function action(oTables, pfOnSuccess, pfOnFailed, bErrorContinue) {
    let aTables = oTables
    if (!$.isArray(oTables)) {
        aTables = [oTables]
    }

    let opt = pfOnSuccess || {}
    if (!$.isPlainObject(opt)) {
        opt = {
            onSuccess: pfOnSuccess,
            onFailed: pfOnFailed
        }
    } else {
        bErrorContinue = opt.errorContinue
    }

    let sXml = oActionFunc["action"](aTables, bErrorContinue)
    let sUrl = "set.j"

    ////{{ local run start
    if (MyConfig.config.local) {
        sUrl = _getUrl(sXml)
    }
    ////}}

    return sendRequest(sUrl, sXml, opt)
}

function set(sType, oTables, pfOnSuccess, pfOnFailed, bErrorContinue) {
    let aTables = oTables
    if (!$.isArray(oTables)) {
        aTables = [oTables]
    }

    let opt = pfOnSuccess || {}
    if (!$.isPlainObject(opt)) {
        opt = {
            onSuccess: pfOnSuccess,
            onFailed: pfOnFailed
        }
    } else {
        bErrorContinue = opt.errorContinue
    }

    let sXml = oActionFunc["edit-config"]("edit-config", aTables, sType, bErrorContinue)
    return sendRequest("set.j", sXml, opt)
}

function getTableInstance(sTable, oOpt) {
    let oTable = NC[sTable]
    return new tableRequest(oTable, oOpt)
}

function getTableRows(sTable, oDataInfo) {
    let oTable = NC[sTable]
    let aRows = []
    let oTemData = oDataInfo

    if (oTemData["action-result"]) {
        aRows = oTemData["action-result"][0]["result-data"]
    } else
        try {
            for (let i = 0; i < oTable.nodes.length; i++) {
                if (oTable.nodes[i] in oTemData) {
                    oTemData = oTemData[oTable.nodes[i]]
                } else {
                    oTemData = oTable.row ? [] : null
                    break
                }
            }

            aRows = oTemData || []
            formatRowData(oTable, aRows)
        } catch (e) {
            aRows = []
        }

    return aRows
}

/*****************************************************************************
@FuncName: public, Utils.Request.mergeRequestTables
@DateCreated: 2014-09-28
@Author: Huangdongxiao 02807
@Description: merge some netconf tables to one array
    <b>Notice:</b> The first table is the master table, this action will extend all
    the others properties in other tables to the master table by index columns.
    It like a SQL "select table1.a, table1.b, table1.c from table1, table2 where table1.index=table2.key"
@Usage:
@ParaIn:
    * aTableDef, Array, Netconf table defination in nc.js
    * oJsonData, Object, a JSON data recieved from device
    * aMap, Array, The mapping relations of the netconf tables. the element's struck is as below:
    ////table start sep=//
    属性名//类型//描述
    src//Object//Defination of a netconf table in "nc.js"//
    column//Array//Key columns in "src" table and "dest" table//
    dest//Object//Defination of the target netconf table in "nc.js". All the properties in src table
        will be added to the target table, and overwrite the same fields.
    ////table end
    * bMatchAll, boolean, Default is false. If true, only return the matched data,
        or return all the target data.
@Return: None
@Caution:
@Modification:
    * yyyy-mm-dd: Auth, add or modify something
*****************************************************************************/
function mergeRequestTables(aTableDef, oJsonData, aMap, bMatchAll /*=false*/) {
    let aNewTable = []
    let oHashTable = {}

    function getHashKey(aIndexDef, oData) {
        let aTemp = []
        for (let k = 0; k < aIndexDef.length; k++) {
            aTemp.push(oData[aIndexDef[k]])
        }

        return aTemp.join("_")
    }

    function hashTable(oTableDef) {
        let oHashData = {}

        let aData = Utils.Request.getTableRows(oTableDef, oJsonData)
        for (let i = 0; i < aData.length; i++) {
            let oData = aData[i]
            let sIndexKey = getHashKey(oTableDef.index, oData)
            oHashData[sIndexKey] = aData[i]
        }

        let sTableName = oTableDef.nodes.join(".")
        oHashTable[sTableName] = oHashData
    }

    function mergeOneTable(oMap) {
        let oDestDef = oMap.dest
        let oDestData = oHashTable[oDestDef.nodes.join(".")]
        let aSrcData = Utils.Request.getTableRows(oMap.src, oJsonData)
        let aMachedData = {}

        for (let i = 0; i < aSrcData.length; i++) {
            let sIndexKey = getHashKey(oMap.column, aSrcData[i])
            let oData = oDestData[sIndexKey]
            if (oData) {
                $.extend(oData, aSrcData[i])
                aMachedData[sIndexKey] = oData
            }
        }

        return bMatchAll ? aMachedData : oDestData
    }

    // hash tables
    for (let i = 0, k = aTableDef.length; i < k; i++) {
        hashTable(aTableDef[i])
    }

    let oData = {}
    for (let i = 0, k = aMap.length; i < k; i++) {
        let oMap = aMap[i]
        oData = mergeOneTable(oMap, oData)
    }

    $.each(oData, function (key, oItem) {
        aNewTable.push(oItem)
    })
    return aNewTable
}

function formatRowData(oTable, aRows) {
    // let aDesRows = []
    let aCols = []
    let bNeedFormat = false
    let oFormatCol = {}

    $.each(oTable.index, function (index, oEle) {
        aCols.push(oEle)
    })
    $.merge(aCols, oTable.column)
    for (let i = 0, j = aCols.length; i < j; i++) {
        let aColName = aCols[i].split(".")
        if (aColName.length > 1) {
            bNeedFormat = true
            oFormatCol[aCols[i]] = []
            $.merge(oFormatCol[aCols[i]], aColName)
        }
    }

    if (bNeedFormat == false) {
        return
    }

    for (let i = 0, j = aRows.length; i < j; i++) {
        let oData = aRows[i]
        $.each(oFormatCol, function (sIndex, aItem) {
            let oValue = oData
            try {
                for (let k = 0, l = aItem.length; k < l; k++) {
                    oValue = oValue[aItem[k]]
                }

                if (oValue || oValue == "") {
                    oData[sIndex] = oValue
                }
            } catch (err) {
                console.log(err)
            }
        })
    }

    return
}

let _oAjaxList = {}

function getXPath(sXPath) {
    let nStart = sXPath.indexOf("/top[1]/")
    sXPath = sXPath.substring(nStart + 8)
    return sXPath.replace(/\[[0-9]*\]/g,"")
}

function getRpcErr(aErrs) {
    let aMsgAll = []
    for (let i = 0; i < aErrs.length; i++) {
        let oErr = aErrs[i]
        let sMsg = oErr["error-message"]
        if ("access-denied" == oErr["error-tag"]) {
            sMsg = $.MyLocale.NO_PRIVILEGE
        }
        let sXPath = oErr["error-path"]
        let oErrInfo = oErr["error-info"] ? oErr["error-info"]["top"] : {}
        let sCfg = sXPath
            ? {
                XPath: getXPath(sXPath),
                msg: sMsg,
                data: oErrInfo
            }
            : sMsg
        aMsgAll.push(sCfg)
    }
    return aMsgAll
}

function sendRequest(sUrl, sXml, oPara) {
    return new Promise((resolve, reject) => {
    // 调试用本地数据
        if (process.env.VUE_APP_LOCALDEBUG) {
            resolve(tmpJson)
            return
        }
        let opt = {
            showSucMsg: true,
            showErrMsg: true,
            showMsg: false,
            paras: {
                type: oPara.dataType
            } // URL paras
        }

        $.extend(opt, oPara)
        opt.onSuccess = onSuccess
        opt.onFailed = onFailed
        opt.paras.xml = "<rpc message-id='101' xmlns='urn:ietf:params:xml:ns:netconf:base:1.0'  xmlns:web='urn:ietf:params:xml:ns:netconf:base:1.0'>" + sXml + "</rpc>"
        // eslint-disable-next-line camelcase
        opt.paras.req_menu = opt.menu || "M_Wmobile"

        // Empty request can't be allowed.
        if (!sXml) {
            onFailed("emptyXml", "emptyXml")
            return
        }

        // if (opt.showErrMsg) {
        //     Utils.Base.showError("", opt.scope);
        // }

        sUrl = Utils.Base.getDynUrl(sUrl)

        // 真正地触发ajax请求
        // var tmp = {
        //   cache: false,
        //   dataType: "json",
        //   type: "POST",
        //   url: sUrl,
        //   data: opt ? opt.paras : null,
        //   complete: opt ? opt.onComplete : null,
        //   success: function (oJson, sCode) {
        //     var pfOutput = $.noop
        //     var sMsg
        //     var bSuccess = true
        //     if (oJson.ok) {
        //       sMsg = opt.successMsg ? opt.successMsg : "$.MyLocale.SET_SUCCESS"
        //     } else if (oJson.error) {
        //       sMsg = opt.failedMsg ? opt.failedMsg : oJson.error
        //       bSuccess = false
        //     } else if (oJson["rpc-error"]) {
        //       var aRpcErr = oJson["rpc-error"]
        //       Toast($t("error"))
        //       bSuccess = false
        //     }
        //     opt.showMsg && pfOutput(sMsg)

        //     if (bSuccess) {
        //       if ("text" == opt.dataType) {
        //         opt.onSuccess.apply({}, [oJson, sMsg])
        //       } else {
        //         opt.onSuccess.apply(oJson, [sMsg])
        //       }
        //     } else {
        //       opt.onFailed.apply(oJson, ["failed", sMsg])
        //     }
        //   }
        // }
        // var oAjax = $.ajax(tmp);

        let postData = opt ? qs.stringify(opt.paras) : {}
        let postOpt = {
            url: sUrl,
            method: "POST",
            data: postData,
            headers: {
                Authorization: process.env.VUE_APP_SESSIONID + "=true",
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }
        axios(postOpt)
            .then((res) => {
                let sMsg
                let bSuccess = true
                let oJson = res.data
                if (oJson.ok) {
                    sMsg = opt.successMsg ? opt.successMsg : $t("SET_SUCCESS")
                } else if (oJson.error) {
                    sMsg = opt.failedMsg ? opt.failedMsg : oJson.error
                    bSuccess = false
                } else if (oJson["rpc-error"]) {
                    let aRpcErr = oJson["rpc-error"]
                    if (aRpcErr.length > 1) {
                        sMsg = getRpcErr(aRpcErr)
                    } else {
                        sMsg = opt.failedMsg ? opt.failedMsg : getRpcErr(aRpcErr)
                    }
                    bSuccess = false
                }
                opt.showMsg && Toast(sMsg)

                if (bSuccess) {
                    if ("text" == opt.dataType) {
                        // 成功返回Promise的唯一出口
                        resolve(oJson, sMsg)
                        // opt.onSuccess.apply({}, [oJson, sMsg]);
                    } else {
                        resolve(oJson, sMsg)
                        // opt.onSuccess.apply(oJson, [sMsg]);
                    }
                } else {
                    onFailed("failed", sMsg)
                }
            })
            .catch((err) => {
                onFailed("ajax err", err)
            })
        opt.paras.xml = null
        // delete sXml;
        sXml = null

        // var sModule = oPara.module;
        // if (!sModule) {
        //     sModule = $(".portlet").attr("modid") ? $(".portlet").attr("modid") : $(".tab-content").attr("modid");
        // }

        // if (!_oAjaxList[sModule]) {
        //     _oAjaxList[sModule] = [];
        // }

        // _oAjaxList[sModule].push(oAjax);

        function onSuccess(sMsg) {
            if (this.ok && opt.showSucMsg) {
                Frame.Msg.info(sMsg)
            }

            // user process
            let pfOnSuccess = oPara.onSuccess

            if (oPara.isSave === true) {
                onSaveCfg(pfOnSuccess, sMsg)
            } else {
                pfOnSuccess && pfOnSuccess(this, sMsg)
            }
        }

        function onFailed(sErrType, msg) {
            // show error in form first
            let aMsg = "string" == typeof msg ? [msg] : msg
            let getErrStr = function () {
                let aUserMsg = []
                for (let i = 0, ii = aMsg.length; i < ii; i++) {
                    let info = aMsg[i]
                    let str = "string" == typeof info ? info : info.msg
                    //aUserMsg.push (str);
                    aUserMsg.push("<span class=\"error-reason\" style=\"word-break: break-word;\">" + str + "</span></br>")
                }

                return aUserMsg.join("")
            }

            if (opt.showErrMsg) {
                let aErr = []
                for (let i = 0, k = aMsg.length; i < k; i++) {
                    let oInfo = aMsg[i]
                    if ("string" == typeof oInfo) {
                        oInfo = {
                            XPath: false,
                            msg: oInfo
                        }
                    }

                    if (!oInfo.msg) {
                        continue
                    }

                    let pfGetErrObj =
            opt.getErrObj ||
            function (sXPath, jScope) {
                let aTemp = sXPath.split("/")
                let sLast = aTemp.pop()
                let sItem = sLast.replace(/\[[0-9]*\]/g, "")
                return $("#" + sItem, jScope)
            }

                    let jErr = oInfo.XPath ? pfGetErrObj(oInfo.XPath, opt.scope, oInfo.data, oInfo.msg) : []
                    if (jErr.specialFlag === "bindapFlag") {
                        aErr.push("<span class=\"error-reason\">" + jErr.oInfomsg + "</span></br>")
                    } else {
                        if (jErr.length > 0) {
                            Utils.Widget.setError(jErr, oInfo.msg)
                        } else {
                            aErr.push("<span class=\"error-reason\" style=\"word-break: break-word;\">" + oInfo.msg + "</span></br>")
                        }
                    }
                }

                if (aErr.length > 0) {
                    // Utils.Base.showError(aErr.join(''), opt.scope);
                    Toast.fail({
                        type: "html",
                        message: aErr.join("")
                    })
                }
            }

            let sErrMsg = getErrStr()
            // let pfOnFailed = oPara.onFailed
            reject(sErrType, sErrMsg, aMsg)
            // pfOnFailed && pfOnFailed(sErrType, sErrMsg, aMsg);
        }

        function onSaveCfg(pfCallBack, sMsg) {
            //var hWait = Frame.Msg.wait($.MyLocale.SAVING);
            saveCfg(
                null,
                false,
                function () {
                    //hWait.close();
                    pfCallBack && pfCallBack(sMsg)
                },
                function (sErrType, msg) {
                    //hWait.close();
                    Toast.fail({
                        type: "html",
                        message: msg
                    })
                }
            )
        }
    })
}

function clearMoudleAjax(sMoudle) {
    if (_oAjaxList[sMoudle]) {
        $.each(_oAjaxList[sMoudle], function (iIndex, oItem) {
            if (oItem) {
                oItem.abort()
                _oAjaxList[sMoudle][iIndex] = null
            }
        })
        _oAjaxList[sMoudle] = []
    }
    // 检查并清空Frame请求列表(system.js中，是undefined module,建议排查下)
    if (_oAjaxList["Frame"] && _oAjaxList["Frame"].length) {
        let clear = true
        // eslint-disable-next-line no-unused-vars
        $.each(_oAjaxList["Frame"], function (iIndex, oItem) {
            if (_oAjaxList["Frame"][iIndex] != null) {
                clear = false
            }
        })
        if (clear) {
            _oAjaxList["Frame"] = []
        }
    }
}

// function onAjaxBack(oAjax, sMoudle) {
//     $.each(_oAjaxList[sMoudle], function (iIndex, oItem) {
//         if (oItem == oAjax) {
//             _oAjaxList[sMoudle][iIndex] = null
//         }
//     })
// }

const oActionFunc = {
    get: makeGetXml,
    "get-bulk": makeGetXml,
    "get-config": makeGetXml,
    "get-bulk-config": makeGetXml,
    "edit-config": makeEditXml,
    action: makeActionXml,
    load: makeCfgFileXml,
    save: makeCfgFileXml,
    rollback: makeCfgFileXml,
    cli: makeCliXml
}

let DEF_NS = {
    base: "http://www.h3c.com/netconf/base:1.0",
    data: "http://www.h3c.com/netconf/data:1.0",
    config: "http://www.h3c.com/netconf/config:1.0",
    action: "http://www.h3c.com/netconf/action:1.0"
}

function getNS() {
    let FrameInfo = FrameInfo || {}
    return FrameInfo.ns || DEF_NS
}

function getTableXml(aTables) {
    function getTableXmlArray(oNode) {
        let aXml = []
        for (let sIndex in oNode) {
            let oTemNode = oNode[sIndex]
            if (Utils.Base.isEmptyObj(oTemNode.subnode) && oTemNode.rows.length == 0) {
                if (oTemNode.value) {
                    if ($.isArray(oTemNode.value)) {
                        $.each(oTemNode.value, function (iIndex, oItem) {
                            aXml.push("<" + sIndex + oTemNode.opt + ">" + oItem + "</" + sIndex + ">")
                        })
                    } else {
                        aXml.push("<" + sIndex + oTemNode.opt + ">" + oTemNode.value + "</" + sIndex + ">")
                    }
                } else {
                    aXml.push("<" + sIndex + oTemNode.opt + "/>")
                }
            } else {
                if (!oTemNode.disView) {
                    aXml.push("<" + sIndex + oTemNode.opt + ">")
                }

                if (oTemNode.rows.length != 0) {
                    for (let k = 0, f = oTemNode.rows.length; k < f; k++) {
                        $.merge(aXml, getTableXmlArray(oTemNode.rows[k]))
                    }
                } else {
                    $.merge(aXml, getTableXmlArray(oTemNode.subnode))
                }

                if (!oTemNode.disView) {
                    aXml.push("</" + sIndex + ">")
                }
            }
        }
        return aXml
    }

    let aXml = []

    for (let i = 0, j = aTables.length; i < j; i++) {
        $.merge(aXml, getTableXmlArray(aTables[i]))
    }

    return aXml.join("")
}

function mergeTable(aTables) {
    function insertTable(oDest, oSrc) {
        for (let sIndex in oSrc.subnode) {
            if (sIndex in oDest.subnode) {
                if (Utils.Base.isEmptyObj(oSrc.subnode[sIndex].subnode)) {
                    $.merge(oDest.subnode[sIndex].rows, oSrc.subnode[sIndex].rows)
                } else {
                    insertTable(oDest.subnode[sIndex], oSrc.subnode[sIndex])
                }
            } else {
                oDest.subnode[sIndex] = oSrc.subnode[sIndex]
            }
        }
    }

    let aTotalTable = []
    let oTotalTable = {}
    let bEmpty = true

    for (let i = 0, j = aTables.length; i < j; i++) {
        let oTable = aTables[i]
        if (!oTable) {
            continue
        }

        if (bEmpty == true) {
            $.each(oTable, function (sIndex, oItem) {
                oTotalTable[sIndex] = oItem
                return
            })
            bEmpty = false
            continue
        }

        $.each(oTable, function (sIndex, oItem) {
            if (sIndex in oTotalTable) {
                insertTable(oTotalTable[sIndex], oItem)
            } else {
                oTotalTable[sIndex] = oItem
            }
            return
        })
    }

    $.each(oTotalTable, function (sIndex, oItem) {
        let oTemTable = {}
        oTemTable[sIndex] = oItem
        aTotalTable.push(oTemTable)
        return
    })
    return aTotalTable
}

function makeTableXml(stype, aTables, bMerge) {
    let aTableXml = []
    $.each(aTables, function (index, oEle) {
        let oTable = oEle ? oEle.getXml(stype) : null
        if (oTable) {
            aTableXml.push(oTable)
        }
        return
    })

    if (bMerge) {
        aTableXml = mergeTable(aTableXml)
    }
    return getTableXml(aTableXml)
}

function makeGetXml(sAction, aTables, oCount) {
    let sCountAttr = " xmlns:web='" + getNS().base + "'" + " xmlns:data='" + getNS().data + "'"
    let nCount = parseInt(oCount)
    let oActionOpt = {
        get: {
            ns: getNS().data,
            source: ""
        },
        "get-bulk": {
            ns: getNS().data,
            source: ""
        },
        "get-config": {
            ns: getNS().config,
            source: "<source><running/></source>"
        },
        "get-bulk-config": {
            ns: getNS().config,
            source: "<source><running/></source>"
        }
    }
    let sContent = makeTableXml("get", aTables, true)
    let sGetXml = null

    if (sContent != "") {
        if (!isNaN(nCount)) {
            sCountAttr += " web:count='" + nCount + "'"
        }

        sGetXml = "<" + sAction + ">" + oActionOpt[sAction].source + "<filter type='subtree'><top xmlns='" + oActionOpt[sAction].ns + "'" + sCountAttr + ">"
        sGetXml += sContent
        sGetXml += "</top></filter></" + sAction + ">"
    }

    return sGetXml
}

function makeEditXml(sAction, aTables, sType, bErrorContinue) {
    let sEdit = null
    let sContent = makeTableXml("set", aTables, false)

    if (sContent != "") {
        sEdit = "<" + sAction + "><target><running/></target>"

        if (bErrorContinue) {
            sEdit += "<error-option>continue-on-error</error-option>"
        }

        sEdit += "<config><top xmlns='" + getNS().config + "' web:operation='" + sType + "'>" + sContent + "</top></config></" + sAction + ">"
    }

    return sEdit
}

function makeActionXml(aTables, bErrorContinue) {
    let sXml = null
    let sContent = makeTableXml("set", aTables, false)

    if (sContent != "") {
        sXml = "<action>"
        if (bErrorContinue) {
            sXml += "<error-option>continue-on-error</error-option>"
        }
        sXml += "<top xmlns='" + getNS().action + "'>" + sContent + "</top></action>"
    }
    return sXml
}

function makeCfgFileXml(sAction, sFileName, bAllMdc) {
    let sXml = ""
    if (!sFileName && !bAllMdc) {
        sXml = "<" + sAction + "/>"
    } else {
        let sAttr = true == bAllMdc ? " AllMDC=\"true\"" : ""
        let sFile = sFileName && sFileName != "" ? "<file>" + convertToXmlStr(sFileName) + "</file>" : ""
        sXml = "<" + sAction + sAttr + ">" + sFile + "</" + sAction + ">"
    }
    return sXml
}

function makeCliXml(aCli) {
    let sXml = null
    if (aCli.length > 0) {
        sXml = "<CLI><Configuration>" + aCli.join("\r\n") + "</Configuration></CLI>"
    }
    return sXml
}

function tableRequest(oTable, oOpt) {
    this.addRows = addRows
    this.addFilter = addFilter
    this.addRegFilter = addRegFilter
    this.addMatchFilter = addMatchFilter
    this.addColumOpt = addColumOpt
    this.getXml = getXml
    this.oTable = oTable

    let _oTable = oTable || {}
    let _oOpt = oOpt || {}
    let _aRows = []
    let _oFilters = {}
    let _oRegFilters = {}
    let _oMatchFilters = {}
    let _oColumOpt = {}

    function addRows(oData, bOnlyIndex /*=false*/) {
        let aData = oData
        if (!$.isArray(oData)) {
            aData = [oData]
        }

        for (let i = 0; i < aData.length; i++) {
            let aRowData = []
            for (let j = 0; j < _oTable.index.length; j++) {
                let sItem = _oTable.index[j]
                aRowData[sItem] = aData[i][sItem] || aData[i][sItem] == "" ? aData[i][sItem] : null
            }

            let aCol = true === bOnlyIndex ? [] : _oTable.column
            for (let j = 0; j < aCol.length; j++) {
                let sItem = _oTable.column[j]
                aRowData[sItem] = aData[i][sItem] || aData[i][sItem] == "" ? aData[i][sItem] : null
            }

            let aGroup = _oTable["loopgroup"] ? _oTable["loopgroup"] : []
            for (let j = 0; j < aGroup.length; j++) {
                let sItem = _oTable.loopgroup[j]
                aRowData[sItem] = aData[i][sItem] || aData[i][sItem] == "" ? aData[i][sItem] : null
            }

            _aRows.push(aRowData)
        }
        return
    }

    function addColumOpt(sColum, oData) {
        _oColumOpt[sColum] = oData
        return
    }

    function addFilter(oData) {
        for (let sIndex in oData) {
            _oFilters[sIndex] = oData[sIndex]
        }
        return
    }

    function addRegFilter(oData) {
        for (let sIndex in oData) {
            _oRegFilters[sIndex] = oData[sIndex]
        }
        return
    }

    function addMatchFilter(oData) {
        for (let sIndex in oData) {
            _oMatchFilters[sIndex] = oData[sIndex]
        }
        return
    }

    // eslint-disable-next-line no-shadow
    function makeGetXml() {
        let aTotalCol = []
        let aTotalNodes = []
        let oTableNode = {}

        $.each(_oTable.index, function (index, oEle) {
            aTotalCol.push(oEle)
        })
        $.merge(aTotalCol, _oTable.column)

        aTotalNodes = $.merge([], _oTable.nodes)
        if (_oTable.row) {
            aTotalNodes.push(_oTable.row)
        }

        for (let i = 0; i < aTotalCol.length; i++) {
            let sName = aTotalCol[i]
            let sFilter = _oFilters[sName] ? convertToXmlStr(_oFilters[sName]) : ""
            let sRegFilter = _oRegFilters[sName] ? " web:regExp=\"" + convertToXmlStr(_oRegFilters[sName]) + "\"" : ""
            let sMatchFilter = _oMatchFilters[sName] ? " web:match=\"" + convertToXmlStr(_oMatchFilters[sName]) + "\"" : ""

            appendNode(oTableNode, aTotalNodes, sName, sRegFilter + sMatchFilter, sFilter)
        }

        let sOpt = ""
        $.each(_oOpt, function (index, oEle) {
            sOpt += " web:" + index + "='" + convertToXmlStr(oEle) + "'"
            return
        })

        if (sOpt) {
            appendNode(oTableNode, [], _oTable.nodes.join("."), sOpt, null)
        }

        return oTableNode
    }

    function getOptStr(oOpstion) {
        let sOpt = ""

        if (!oOpstion) {
            return sOpt
        }

        if ("web" in oOpstion || "data" in oOpstion) {
            if (oOpstion["web"]) {
                $.each(oOpstion["web"], function (index, oEle) {
                    sOpt += " web:" + index + "='" + convertToXmlStr(oEle) + "'"
                    return
                })
            }

            if (oOpstion["data"]) {
                $.each(oOpstion["data"], function (index, oEle) {
                    sOpt += " data:" + index + "='" + convertToXmlStr(oEle) + "'"
                    return
                })
            }
        } else {
            $.each(oOpstion, function (index, oEle) {
                sOpt += " web:" + index + "='" + convertToXmlStr(oEle) + "'"
                return
            })
        }
        return sOpt
    }

    function getXml(sType) {
        if (_aRows.length == 0) {
            if (sType == "get") {
                return makeGetXml()
            }
            return null
        }

        let oTableXml = {}
        let aRows = []
        let sOpt = ""
        let aNodes = []

        if (_oTable.row) {
            aNodes.push(_oTable.row)
        }

        let oLoopGroup = {}
        if (_oTable["loopgroup"]) {
            $.each(_oTable["loopgroup"], function (iLoopIndex, sGroup) {
                oLoopGroup[sGroup] = {}
                $.each(_oTable["column"], function (iCol, sCol) {
                    let aItem = sCol.split(",")
                    if (aItem.length > 1 && aItem[0] == sGroup) {
                        oLoopGroup[sGroup][aItem[1]] = ""
                    }
                })
            })
        }

        for (let i = 0; i < _aRows.length; i++) {
            let oRowNode = {}
            let oRowData = _aRows[i]

            for (let sIndex in oRowData) {
                if ((oRowData[sIndex] || oRowData[sIndex] == "") && !(sIndex in oLoopGroup)) {
                    if ($.isArray(oRowData[sIndex])) {
                        $.each(oRowData[sIndex], function (iIndex, oItem) {
                            oRowData[sIndex][iIndex] = convertToXmlStr(oItem)
                        })
                        appendNode(oRowNode, aNodes, sIndex, null, oRowData[sIndex])
                    } else {
                        let sValue = convertToXmlStr(oRowData[sIndex])
                        appendNode(oRowNode, aNodes, sIndex, null, sValue)
                    }
                }
            }

            if (_oTable["loopgroup"]) {
                // eslint-disable-next-line no-unused-vars
                $.each(oLoopGroup, function (sGroup, oSubItem) {
                    let aGroupRows = []
                    let bHasValue = false
                    let aGroupNodes = [sGroup]
                    if (oRowData[sGroup] && $.isArray(oRowData[sGroup])) {
                        $.each(oRowData[sGroup], function (sGroupRowIndex, oRowItems) {
                            let oGroupRowNode = {}
                            // eslint-disable-next-line no-unused-vars
                            $.each(oRowItems, function (sGroupCol, oColItem) {
                                let sValue = convertToXmlStr(oRowItems[sGroupCol])
                                appendNode(oGroupRowNode, aGroupNodes, sGroupCol, null, sValue)
                                bHasValue = true
                            })
                            aGroupRows.push(oGroupRowNode)
                        })
                    }

                    if (bHasValue) {
                        aGroupNodes = []
                        $.merge(aGroupNodes, aNodes)
                        aGroupNodes.push(sGroup)
                        addNodeRows(oRowNode, aGroupNodes, aGroupRows, true)
                    }
                })
            }

            aRows.push(oRowNode)
        }

        addNodeRows(oTableXml, _oTable.nodes, aRows)
        $.each(_oOpt, function (index, oEle) {
            sOpt += " web:" + index + "='" + oEle + "'"
            return
        })
        if (sOpt) {
            appendNode(oTableXml, [], _oTable.nodes.join("."), sOpt, null)
        }

        return oTableXml
    }

    function appendNode(oBaseNode, aParentNode, sNode, sOpt, sValue) {
        let oSubNode = oBaseNode
        let oNode = null
        let aNodes = sNode.split(".")
        let aTotalNode = $.merge([], aParentNode)
        $.merge(aTotalNode, aNodes)

        for (let i = 0, j = aTotalNode.length; i < j; i++) {
            let sParNode = aTotalNode[i]
            if (!(sParNode in oSubNode)) {
                let sNodeOpt = getOptStr(_oColumOpt[sParNode])
                oSubNode[sParNode] = {
                    subnode: {},
                    opt: sNodeOpt,
                    value: "",
                    rows: []
                }
            }
            oNode = oSubNode[sParNode]
            oSubNode = oSubNode[sParNode].subnode
        }

        if (oNode) {
            oNode.opt += sOpt ? sOpt : ""
            oNode.value = sValue ? sValue : ""
        }

        return oBaseNode
    }

    function addNodeRows(oBaseNode, aNodes, aRows, bDisView) {
        let oSubNode = oBaseNode
        let oNode = null

        for (let i = 0, j = aNodes.length; i < j; i++) {
            let sParNode = aNodes[i]
            if (!(sParNode in oSubNode)) {
                let sNodeOpt = getOptStr(_oColumOpt[sParNode])
                oSubNode[sParNode] = {
                    subnode: {},
                    opt: sNodeOpt,
                    value: "",
                    rows: [],
                    disView: bDisView
                }
            }
            oNode = oSubNode[sParNode]
            oSubNode = oSubNode[sParNode].subnode
        }

        if (oNode) {
            $.merge(oNode.rows, aRows)
        }
        return oBaseNode
    }
}

export default oRequest
