<template>
    <div class="terminalPage">
        <div style="background-color: #ffffff">
            <!-- 终端列表折叠面板 -->
            <van-collapse v-model="activeNamesAp" class="apList">
                <van-collapse-item title="" v-for="(val, key) in apData" :key="key">
                    <template #title>
                        <div class="wifiTitle">
                            <span>AP: {{ key }}</span>
                        </div>
                        <span>终端总数： {{ apCount[key].all }} |</span>
                        <span>2.4G终端： {{ apCount[key].Num2G }} |</span>
                        <span>5G终端： {{ apCount[key].Num5G }}</span>
                    </template>

                    <div v-for="item in val" :key="item.ApName">
                        <router-link to="/Terminal/terminalDetail" class="alineItemsCenter">
                            <img src="../../../src/frame/assets/img/img_head_iphone@2x.png" class="logoImg" />

                            <div class="linkToAp linksStyle">
                                <div class="paddingBottom5">
                                    <span>{{ item.MAC }}</span>
                                    <div v-if="item.mode == 2" class="radioStyle24">2.4G</div>
                                    <div v-else class="radioStyle5">5G</div>
                                </div>
                                <div class="ipStyle paddingBottom5">
                                    <span>IP地址：{{ item.IP }}</span>
                                </div>
                                <div>
                                    <span>接入WIFI：</span>
                                    <router-link :to="{ path: '/WIFI', query: { devName: item.SSID, devType: 'ap' } }" class="toAPdetail">
                                        {{ item.SSID }}
                                    </router-link>
                                    |
                                    <span>连接时长：{{ item.CurrentUpTime }}</span>
                                </div>
                            </div>
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
    apData: Object,
    apCount: Object
})

let activeNamesAp = ref(["1"])
</script>

<style scoped>
.logoImg {
    width: 41px;
    height: 41px;
}
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
.linkToAp {
    flex-grow: 1;
}
.detailIcon {
    display: flex;
    flex-grow: 1;
    justify-content: flex-end;
}
.linksStyle {
    padding-bottom: 14px;
    padding-top: 14px;
    margin-left: 7px;
}
.borderBottom {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #d8d8d8;
    margin-right: 20px;
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
    border-bottom: 1px solid #d8d8d8;
    margin-right: 12px;
}

.paddingBottom5 {
    padding-bottom: 5px;
}

.toAPdetail {
    color: #617cf0;
}
.apList span {
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
}
</style>

<style>
.terminalPage .van-collapse-item__content {
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
