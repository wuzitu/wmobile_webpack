// 第一次搭建框架，继续使用jquery
import $ from "jquery"
import { Toast } from "vant"
import MyConfig from "./MyConfig"
// window.Utils = {
//     addComma,
//     isEmptyObj
// }

/* 判断对象是否为空 */
function isEmptyObj(oObj) {
  var bEmpty = true
  for (var i in oObj) {
    bEmpty = false
    break
  }
  return bEmpty
}

function addComma(sNum, sType /*sType=rate,memory*/, nStart, nEnd) {
  function doFormat(num, type, start, end) {
    if (
      !(typeof num === "string" || typeof num === "number") ||
      Number(num) != Number(num)
    ) {
      return num
    }

    var max, len, remain, unit, fixed
    start = start || 0
    end = typeof end == "undefined" ? 3 : end

    switch (type) {
      case "memory":
        max = 1000
        unit = ["B", "KB", "MB", "GB"]
        break
      case "rate":
        max = 1024
        unit = ["bps", "Kbps", "Mbps", "Gbps"]
        break
      default:
        max = Infinity
        unit = [""]
        fixed = 0
        break
    }

    while (num >= max && start < end) {
      num = num / max
      start++
      fixed = 1
    }
    num = Number(num).toFixed(fixed).split(".")

    if (fixed) {
      unit = "." + num[1] + unit[start]
    } else {
      unit = unit[start]
    }

    num = num[0]
    len = num.length

    if (len <= 3) {
      return num + unit
    }

    remain = len % 3
    if (remain > 0) {
      num =
        num.slice(0, remain) +
        "," +
        num.slice(remain, len).match(/\d{3}/g).join(",")
    } else {
      num = num.slice(remain, len).match(/\d{3}/g).join(",")
    }

    return num + unit
  }

  if ($.isPlainObject(sNum)) {
    for (key in sNum) {
      sNum[key] = doFormat(sNum[key], sType, nStart, nEnd)
    }
  } else {
    sNum = doFormat(sNum, sType, nStart, nEnd)
  }

  return sNum
}

function showError(msg, jScope) {
  var sErrMsg = $.isArray(msg) ? msg.join("") : msg
  Toast(sErrMsg)
}

let getDynUrl = function (sUrl) {
  var sDynUrl = MyConfig.root + "../wnm/" + sUrl

  if (true === MyConfig.config.local) {
    sDynUrl = sDynUrl.replace(/\.j/, ".php")
  }

  var s = -1 == sDynUrl.indexOf("?") ? "?" : "&"
  console.log(process.env)
  var sid = process.env.VUE_APP_SESSIONID || ""
  sDynUrl += s + "sessionid=" + sid

  return sDynUrl
}
export default {
  isEmptyObj,
  addComma,
  showError,
  getDynUrl
}
