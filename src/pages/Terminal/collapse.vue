<template>
    <div class="terminalPage">
        <div style="background-color: #ffffff">
            <!-- 终端列表折叠面板 -->
            <van-collapse v-model="activeNames" class="terminalList">
                <van-collapse-item title="" v-for="item in wifiData" :key="item.name">
                    <template #title>
                        <div class="wifiTitle">
                            <svg-icon icon-class="ic_wifi" class="ic_wifi"></svg-icon>
                            <span>Wi-Fi: {{ item.SSID }}</span>
                        </div>
                        <span>终端总数： {{ item.modeAll }} |</span>
                        <span>2.4G终端： {{ item.mode24 }} |</span>
                        <span>5G终端： {{ item.mode5 }}</span>
                    </template>

                    <div class="alineItemsCenter">
                        <!-- <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>  -->

                        <div class="linkToAp">
                            <div class="paddingBottom5">
                                <span>{{ item.MAC }}</span>
                                <div v-if="item.WireLessMode == 1" class="radioStyle24">2.4G</div>
                                <div v-else class="radioStyle5">5G</div>
                            </div>
                            <div class="ipStyle paddingBottom5">
                                <span>IP地址：{{ item.IP }}</span>
                            </div>
                            <div>
                                <span>接入AP：</span>
                                <router-link :to="{ path: '/AP', query: { devName: item.ApName, devType: 'ap' } }" class="toAPdetail">
                                    {{ item.ApName }}
                                </router-link>
                                |
                                <span>连接时长：{{ item.CurrentUpTime }}</span>
                            </div>
                        </div>
                        <router-link class="detailIcon" :to="{ path: '/AP', query: { devName: item.ApName, devType: 'ap' } }">
                            <svg-icon icon-class="ic_arrow" class="goApView"></svg-icon>
                        </router-link>
                    </div>
                </van-collapse-item>
            </van-collapse>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps } from "vue"

// import { useI18n } from "vue-i18n"

const Datas = defineProps({
    wifiData: Array
})

let activeNames = ref([Datas.wifiData[0].SSID])
</script>

<style scoped>
.radioStyle24 {
    display: inline-block;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #00af6d;
    border-radius: 9px;
    font-size: 11px;
    font-family: PingFang SC;
    color: #ffffff;
    margin-left: 10px;
}
.radioStyle5 {
    display: inline-block;
    width: 44px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    background-color: #617cf0;
    border-radius: 9px;
    font-size: 11px;
    font-family: PingFang SC;
    color: #ffffff;
    margin-left: 10px;
}
/* .linkToAp {
    flex-grow: 1 ;
} */
.detailIcon {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
}
.linksStyle {
    padding-bottom: 14px;
    padding-top: 14px;
    border-bottom: 1px solid #d8d8d8;
}

.ic_wifi {
    width: 16px;
    height: 16px;
    margin-right: 5px;
}
.wifiTitle {
    display: flex;
    align-items: center;
}
.wifiTitle span {
    font-size: 14px !important;
    color: #333333 !important;
}
.ipStyle {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.goApView {
    width: 12px;
    height: 12px;
    margin-right: 12px;
    margin-top: 2px;
}
.terminalList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}

.alineItemsCenter {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.paddingBottom5 {
    padding-bottom: 5px;
}

.toAPdetail {
    color: #617cf0;
}
</style>

<style>
.terminalPage .terminalList .van-collapse-item__content {
    padding-top: 14px !important;
    padding-bottom: 14px !important;
}
.terminalPage .van-collapse-item__content {
    background-color: #f7f7f7 !important;
    padding-right: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
}
</style>
