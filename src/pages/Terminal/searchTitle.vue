<template>
    <div class="wifiHeader">
        <span>终端列表</span>
        <van-Search class="searchStyle" v-model="value" left-icon="none" placeholder="请输入终端名称、IP地址或MAC地址" />
        <svg-icon icon-class="ic_search" class="iconRight"></svg-icon>
    </div>
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
</script>

<style scoped>
.wifiHeader {
    padding-right: 10px;
    background: #ffffff;
    border-bottom: 1px solid #f2f3f5;
    position: relative;
    display: flex;
    align-items: center;
}

.wifiHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}

.wifiHeader::before {
    content: "";
    display: block;
    position: absolute;
    width: 4px;
    height: 12px;
    top: 50%;
    transform: translate(0, -50%);
    background: #617cf0;
}
.searchStyle {
    flex: 1;
}
.iconRight {
    width: 14px;
    height: 14px;
}
</style>
