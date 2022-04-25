<template>
    <van-collapse v-model="activeNames">
        <van-collapse-item v-for="(a1, indexa1) in oData.ajustEffectListData" :name="oData.activeName + indexa1">
            <template #title>
                <div>{{ t("RRM.ajusttime") }}{{ a1.time }}</div>
            </template>
            <div class="contents">
                <div class="toggle">
                    <span class="toggleleft">{{ t("RRM.loadBA") }}(%)</span>
                    <span class="toggleright">
                        <span class="before">{{ a1.loadRateBefore }}</span>
                        /
                        <span class="after">{{ a1.loadRateAfter }}</span>
                    </span>
                </div>
                <div class="toggle">
                    <span class="toggleleft">{{ t("RRM.InterferenceBA") }}(%)</span>
                    <span class="toggleright">
                        <span class="before">{{ a1.interferenceRateBefore }}</span>
                        /
                        <span class="after">{{ a1.interferenceRateAfter }}</span>
                    </span>
                </div>
                <div class="toggle">
                    <span class="toggleleft">{{ t("RRM.retransmissionBA") }}(%)</span>
                    <span class="toggleright">
                        <span class="before">{{ a1.retransmissionRateBefore }}</span>
                        /
                        <span class="after">{{ a1.retransmissionRateAfter }}</span>
                    </span>
                </div>
                <div class="toggle">
                    <span class="toggleleft">{{ t("RRM.bitErrorBA") }}(%)</span>
                    <span class="toggleright">
                        <span class="before">{{ a1.biterrorRateBefore }}</span>
                        /
                        <span class="after">{{ a1.biterrorRateAfter }}</span>
                    </span>
                </div>
                <div class="toggle">
                    <span class="toggleleft">{{ t("RRM.channelUtilizationBA") }}(%)</span>
                    <span class="toggleright">
                        <span class="before">{{ a1.channekUtilizationRateBefore }}</span>
                        /
                        <span class="after">{{ a1.channekUtilizationRateAfter }}</span>
                    </span>
                </div>
            </div>
        </van-collapse-item>
    </van-collapse>
</template>
<script setup>
import { defineProps } from "vue"
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
const activeNames = ref(["cc"])
const router = useRouter()
const { t } = useI18n()
let oData = defineProps({ ajustEffectListData: Array, activeName: String })
// const activeNames = ref(["aa"])
// const activeNames0 = ref(["bb"])
// let jumpAPDetail = (apname) => {
//     router.push({
//         path: "/DevInfo/AP/AP"
//     })
// }
</script>
<style scoped>
.contents {
    padding-left: 20px;
    padding-right: 20px;
    background: #f7f7f7;
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
.before {
    color: #f43e3b;
}
.after {
    color: #00af6d;
}
</style>
