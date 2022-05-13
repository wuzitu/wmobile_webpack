<template>
    <div class="">
        <van-collapse v-model="activeNames0">
            <van-collapse-item v-for="(value, key, index) in oData.ajustDataByAP" :name="index">
                <template #title>
                    <div class="ajusttimestyle1">
                        <span class="circle"></span>
                        <span @click="jumpAPDetail(key)" class="apcolor">{{ key }}</span>
                    </div>
                </template>
                <van-collapse v-model="activeNames">
                    <van-collapse-item v-for="(item1, index1) in value" :name="index + '' + index1">
                        <template #title>
                            <div>{{ t("RRM.ajusttime") }}{{ item1.ChangeTime }}</div>
                        </template>
                        <div class="contents">
                            <div class="toggle">
                                <span class="toggleleft">Radio</span>
                                <span class="toggleright">Radio{{ item1.RadioID }}</span>
                            </div>
                            <div class="toggle">
                                <span class="toggleleft">{{ t("RRM.reason") }}</span>
                                <span class="toggleright">{{ item1.ReasonBitMap }}</span>
                            </div>
                            <div class="toggle">
                                <span class="toggleleft">{{ t("RRM.channelba") }}</span>
                                <span class="toggleright">
                                    <span class="before">{{ item1.ChlNumBef }}</span>
                                    /
                                    <span class="after">{{ item1.ChlNumAft }}</span>
                                </span>
                            </div>
                            <div class="toggle">
                                <span class="toggleleft">{{ t("RRM.powerba") }}</span>
                                <span class="toggleright">
                                    <span class="before">{{ item1.PwrLvlBef }}</span>
                                    /
                                    <span class="after">{{ item1.PwrLvlAft }}</span>
                                </span>
                            </div>
                            <div class="toggle special">
                                <span class="toggleleft">{{ t("RRM.bandwidthba") }}</span>
                                <span class="toggleright">
                                    <span class="before">{{ item1.BandwidthBef }}</span>
                                    /
                                    <span class="after">{{ item1.BandwidthAft }}</span>
                                </span>
                            </div>
                        </div>
                    </van-collapse-item>
                </van-collapse>
            </van-collapse-item>
        </van-collapse>
    </div>
</template>
<script setup>
import { defineProps } from "vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
const router = useRouter()
const { t } = useI18n()
let oData = defineProps({ ajustDataByAP: Object })
const activeNames = ref(["aa"])
const activeNames0 = ref(["bb"])
let jumpAPDetail = (apname) => {
    router.push({
        path: "/DevInfo/AP/AP"
    })
}
</script>
<style scoped>
.wraps {
    margin-bottom: 10px;
}
.ajusttimestyle {
    line-height: 50px;
    background: #ffffff;
}
.toggle {
    width: 100%;
    background: #f7f7f7;
    line-height: 40px;
    border-bottom: 1px solid #d8d8d8;
}
.toggleleft {
    width: 50%;
    display: inline-block;
    text-align: left;
}
.toggleright {
    width: 50%;
    display: inline-block;
    text-align: right;
}
.special {
    border-bottom: none;
}
.van-collapse-item__content {
    background: #f7f7f7;
}
.before {
    color: #f43e3b;
}
.after {
    color: #00af6d;
}
.van-collapse-item__wrapper {
    background: #f7f7f7;
}
:deep(.van-collapse-item__content) {
    /* padding-top: 0;
    padding-bottom: 0; */
    padding: 0;
}
.contents {
    padding-left: 20px;
    padding-right: 20px;
    background: #f7f7f7;
}
.circle {
    display: inline-block;
    border-radius: 50%;
    width: 5px;
    height: 5px;
    margin-right: 5px;
    background-color: #617cf0;
    vertical-align: middle;
}
.apcolor {
    color: #617cf0;
}
</style>
