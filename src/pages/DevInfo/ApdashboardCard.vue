<template>
    <div class="ApListWrap">
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ RelClientNumsTitle }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.RelClientNumsTitle }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ Clients2_4GNumsTitle }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.Clients2_4GNumsTitle }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ Clients5GNumsTitle }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.Clients5GNumsTitle }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APOnlineTime }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APOnlineTime }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APLinkTime }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APLinkTime }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APOfflineTime }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APOfflineTime }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APUpRate }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APUpRate }}</van-col>
        </van-row>
        <van-row class="apline">
            <van-col span="8" class="apdetailtitle">
                <p>{{ APDownRate }}</p>
            </van-col>
            <van-col span="16" class="apdetailvalue">{{ apInfo.APDownRate }}</van-col>
        </van-row>
    </div>
</template>

<script setup>
import { defineProps, ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const router = useRouter()
console.log(router.params)
const propsData = defineProps({ apName: String })

const RelClientNumsTitle = t("DevInfo.relclientnumsTitle")
const Clients2_4GNumsTitle = t("DevInfo.clients2_4GnumsTitle")
const Clients5GNumsTitle = t("DevInfo.clients5GnumsTitle")
const APOnlineTime = t("DevInfo.onlinetime")
const APLinkTime = t("DevInfo.linktime")
const APOfflineTime = t("DevInfo.offlinetime")
const APUpRate = t("DevInfo.uprate")
const APDownRate = t("DevInfo.downrate")

const apInfo = ref({
    RelClientNumsTitle: "15",
    Clients2_4GNumsTitle: "10",
    Clients5GNumsTitle: "5",
    APOnlineTime: "2022-03-16 11:00:30",
    APLinkTime: "5天10小时25分钟45秒",
    APOfflineTime: "无",
    APUpRate: "1Mbps",
    APDownRate: "1Mbps"
})
</script>

<style scoped>
.ApListWrap {
    background: #ffffff;
    /* padding: 10px; */
    /* flex: 1; */
    font-size: 14px;
    color: #333333;
    /* height: 800px; */
}
.apline {
    height: 50px;
    border-top: 1px solid #f7f7f7;
    border-bottom: 1px solid #f7f7f7;
    justify-content: center;
    align-items: center;
}
.apdetailtitle {
    width: 100%;
    height: 100%;
    background-color: #f9f9f9;
    padding-left: 16px;
}
.apdetailvalue {
    padding-left: 16px;
}
</style>
