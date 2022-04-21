<template>
    <div class="port-flow">
       <box-title :titleName="t('DevInfo.portflowtend')">
            <div class="right-btn">
                    <span class="right-text" style="{ 'font-size':14px;'color':'#66666'}"> {{ t("DevInfo.allhistory") }}</span>
                    <svg-icon class="ic_arrow" icon-class="ic_arrow"></svg-icon>
            </div>
       </box-title>
       <flow-chart class="flow-chart"></flow-chart>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import SvgIcon from "@/components/SvgIcon"
import FlowChart from "./FlowChart.vue"

const { t } = useI18n()

const router = useRouter()
console.log(router.params)
const propsData = defineProps({ portIndex: String })
</script>

<style scoped>
   .port-flow {
       width: 375px;
       height: 308px;
       background-color: #FFFFFF;
   }

   .right-btn {
        width: 98px;
        height: 13px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        display: inline-block;
        float: right;
   }

   .right-text {
       display: inline-block;
       width: 86px;
   }
   .ic_arrow{
       width: 12px;
       height: 12px;
       display: inline-block;
   }
   .flow-chart {
       background-color: #FFFFFF;
   }
</style>
