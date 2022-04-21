<template>
    <box-title :titleName="detailValue.echartTitle" style="position: relative;">
        <router-link :to="detailValue.detailRouter" style="position: absolute; top: 0; right: 0;">
            <span class="viewButton">
                <span>完整历史数据</span>
                <svg-icon icon-class="ic_arrow" class="goHistory"></svg-icon>
            </span>
        </router-link>
    </box-title>
</template>

<script setup>
import { defineStore } from "pinia"
import { ref, getCurrentInstance, provide, defineProps } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"

const { t } = useI18n()

const detailValue = defineProps({
    echartTitle: Object,
    detailRouter: String
})

// const detailRouter=defineProps(["detailRouter"])
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
