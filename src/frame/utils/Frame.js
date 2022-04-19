/**
 * 页面初始化的依赖任务
 * keep-alive 请求发送
 * sessionID判断逻辑
 * 暂未开发
 */

import MyConfig from "./MyConfig"
import $ from "jquery"
import Cookies from "js-cookie"
import Base from "./Base"
import $req from "@/frame/utils/request"
// 引入FrameInfo
if (sessionStorage.getItem("FrameInfo")) {
    window.FrameInfo = JSON.parse(sessionStorage.getItem("FrameInfo"))
} else {
    window.FrameInfo = {}
}
const Server = {
    _cach: {},

    get: function (sKey, cb) {
        let oServer = this
        let oBase = $req.getTableInstance("WebUI", { count: 1 })
        $req.getAll([oBase], { onSuccess: myCallback, menu: "FRAME" })

        function myCallback(oInfos) {
            let aBase = $req.getTableRows("WebUI", oInfos)
            if (aBase.length == 0) return
            let val = aBase[0].SessionAgingTime
            oServer._cach[sKey] = val
            cb && cb(val)
        }

        return true
    }
}

const FrameInit = () => {
    // 初始化超时idleTimeOut配置
    Server.get(
        "idletime",
        function () {
            keepAlive.init()
        },
        10
    )

    return
}
const keepAlive = {
    _lastOptTime: false,
    _hDelay: false,
    init: function () {
        function userAlive() {
            if (!keepAlive._hDelay) {
                return
            }

            let oCurTime = new Date()
            if (oCurTime - keepAlive._lastOptTime > MyConfig.config.keepAlive) {
                Frame.Ajax.send(Frame.Util.getDynUrl("keepalive.j"), { showMsg: false })
                // eslint-disable-next-line no-undef
                if (FrameInfo.devtype == "uww" && opener && false != opener.Frame.keepAlive._hDelay) {
                    opener.Frame.keepAlive.pause()
                }
            }
            keepAlive._lastOptTime = oCurTime
        }

        this._lastOptTime = new Date()
        this.start()
        document.querySelector("body").bind("keyup", userAlive).bind("click", userAlive)
    },
    start: function () {
        function checkTimeout() {
            let nIdleTimeMs = Server._cach["idletime"] || 10 * 60000
            if (new Date() - keepAlive._lastOptTime > nIdleTimeMs) {
                logOut()
                return
            }
            keepAlive._hDelay = Frame.OS.delay("Frame.KeepAlive", MyConfig.config.checkTimeout, checkTimeout)
        }

        if (false !== this._lastOptTime && false === keepAlive._hDelay) {
            this._lastOptTime = new Date()
            checkTimeout()
        }
    },
    update: function () {
        if (false !== this._lastOptTime) {
            Frame.Ajax.send(Frame.Util.getDynUrl("keepalive.j"), { showMsg: false })
            this._lastOptTime = new Date()
        }
    },
    pause: function () {
        Frame.OS.cancelDelay(keepAlive._hDelay)
        keepAlive._hDelay = false
    }
}
const logOut = function () {
    // Frame.Ajax.disable()

    $.ajax({
        cache: false,
        dataType: "json",
        type: "POST",
        url: Base.getDynUrl("logout.j"),
        success: function () {
            let sUrl = "../"
            window.location = Base.getPathUrl(sUrl)
        },
        error: function () {
            let sUrl = "../"
            window.location = Base.getPathUrl(sUrl)
        },
        complete: function () {
            let sessionid = Cookies.get("sessionid") || ""
            Cookies.remove(sessionid)
        }
    })
}

export default {
    keepAlive,
    FrameInit,
    logOut
}
