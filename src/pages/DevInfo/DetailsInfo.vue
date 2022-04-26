<template>
    <div class="DetailsInfo">
        <div class="DetailsWrap">
            <div class="row">
                <span :style="rowStyle">{{ version }} : </span>
                <div class="content" :style="rowStyle">{{ oInfo.version }}</div>
                <span class="upgrade" v-if="oInfo.isUpGrade=='true'">可升级</span>
            </div>
            <div class="row">
                <span :style="rowStyle">{{ sn }} : </span>
                <div  class="content" :style="rowStyle">{{ oInfo.sn }}</div>
            </div>
            <div class="row">
                <span :style="rowStyle">{{ ipaddress }} : </span>
                <div  class="content" :style="rowStyle">{{ oInfo.ipaddress }}</div>
            </div>
            <div class="row">
                <span :style="rowStyle">{{macaddress}} : </span>
                <div  class="content" :style="rowStyle">{{ oInfo.macaddress }}</div>
            </div>
            <div class="row">
                <span :style="rowStyle">{{ status }} : </span>
                <div  class="content" :style="rowStyle">{{ oInfo.status }}</div>
            </div>
            <div class="row">
                <span  :style="rowStyle">{{ runtime }} : </span>
                <div class="content" :style="rowStyle">{{ oInfo.runtime}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps,ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Col,Row } from "vant"

const { t } = useI18n()

const router = useRouter()
console.log(router.params)
const propsData = defineProps({ devName: String })

const version = t("DevInfo.version");
const sn = t("DevInfo.sn");
const ipaddress = t("DevInfo.ipaddress");
const macaddress = t("DevInfo.macaddress");
const status = t("DevInfo.status");
const runtime = t("DevInfo.runtime");

const oInfo = ref({
    "version":"R2401",
    "sn":"123456789201225",
    "ipaddress":"192.168.0.1",
    "macaddress":"0000-0000-0001",
    "status":"在线",
    "runtime":"5天10小时25分钟30秒",
    "isUpGrade":"true"
})

const rowStyle = ref({
    "font-size": "13px !important",
    "font-weight": "Medium !important",
    "font-family": "PingFang-SC-Medium !important",
    "color":"#333333"
})
</script>

<style scoped>
.DetailsInfo {
   height: 151px;
   background: #FFFFFF;
   display: block;
   width: 375px;
}
.DetailsInfo .DetailsWrap {
    height: auto;
    width:240px;
    display: block;
    margin-left: 16px;   
}

.DetailsInfo .DetailsWrap .row {
    display: block;
    line-height: 24px;
    vertical-align: center;  
    text-align: start;
    overflow: auto;

}

.DetailsInfo .DetailsWrap .row .content,.DetailsInfo .DetailsWrap .row span{
    display: inline-block;
    width: fit-content;
    float: left;
}

.DetailsInfo .DetailsWrap .row span.upgrade{
    color: #F43E3B;
    border: 1px solid #F43E3B;
    display: inline-block;
    font-size: 12px;
    padding: 3px 4px;
    border-radius: 3px;
    transform: scale(0.8);
    width: 40px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    vertical-align: center;
}
</style>
