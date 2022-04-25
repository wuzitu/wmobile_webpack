<template>
    <box-title :titleName="titleValue">{{ name }}</box-title>
    <detail-list :listData="terminalData" />
    <div class="buttonStyle">
        <div ref="down" class="downButton" @click="downAp()">强制下线</div>
        <div ref="back" class="activeButton" @click="backFrom()">返回</div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import DetailList from "./detailList"

const { t } = useI18n()

let name = "0000-0001-0021"
const titleValue = ref(t("Terminal.terminalName"))

let terminalData = {
    厂商: "小米",
    IP地址: "192.168.0.1",
    接入AP: { name: "AP1", url: "/AP" },
    接入Radio: "Radio1",
    Radio类型: "2.4G",
    接入WIFI: "Guest",
    终端模式: "802.11ax",
    RSSI: "11db",
    协商速率: "54Mbps",
    实时速率: "73.2Kbps",
    上传流量: "1MB",
    下载流量: "1GB",
    上线时间: "2022-03-11 11:00:00",
    在线时长: "1MB",
    累计上线次数: "1GB",
    累计在线时长: "2022-03-11 11:00:00"
}

const down = ref(null)
const back = ref(null)

function downAp() {
    // down.value.removeClass("downButton")
    // down.value.addClass("activeButton")
}
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
