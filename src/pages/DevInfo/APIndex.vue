<template>
    <div class="devIndex">
        <van-tabs v-model:active="activeName" type="line" :before-change="beforeChange" color="#617CF0" swipeable lazy-render sticky title-active-color="#333333" title-inactive-color="#33333" line-height:2px line-width:69px ellipsis="true">
            <van-tab :title="$t('MENU.dashboard-side')" name="0">{{ $t("MENU.dashboard-side") }}</van-tab>
            <van-tab title="Radio" name="1">Radio</van-tab>
            <van-tab :title="$t('DevDetails.terminal')" name="2">{{ $t("DevDetails.terminal") }}</van-tab>
            <van-tab :title="$t('DevDetails.port')" name="3">{{ $t("DevDetails.port") }}</van-tab>
            <van-tab v-show="bIfSupportPoE" title="PoE" name="4">PoE</van-tab>
        </van-tabs>
    </div>
</template>
<script setup>
import { ref, reactive } from "vue"

const activeName = ref("0")
// const onClickTab = ({ title }) => Toast(title)
const beforeChange = (item) => {
    return new Promise((resolve) => {
        resolve(true)
    })
}

const bIfSupportPoE = ref(true)
</script>
<style scoped>
.devIndex {
    background: #f7f7f7;
    width: 100%;
    height: 600px;
}
</style>
