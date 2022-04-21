<template>
    <box-title :titleName="titleValue">{{ name }}</box-title>
    <detail-list :listData="terminalData" />
</template>

<script setup>
import { defineStore } from "pinia"
import { ref, getCurrentInstance, provide, defineProps } from "vue"
import { useI18n } from "vue-i18n"
import { Cell, CellGroup, CellSize, CellProps, CellGroupProps, CellArrowDirection } from "vant"
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
</script>

<style scoped>
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
