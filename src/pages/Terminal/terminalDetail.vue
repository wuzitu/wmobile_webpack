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
    接入AP: "AP1",
    接入Radio: "2.4G"
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
