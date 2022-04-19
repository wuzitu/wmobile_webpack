<template>
    <div class="">
        <van-collapse v-model="activeNames0">
            <van-collapse-item v-for="(item, index) in oData.ajustDataByAP" :name="index">
                <template #title>
                    <div class="ajusttimestyle1">{{ item.APname }}</div>
                </template>
                <van-collapse v-model="activeNames">
                    <van-collapse-item v-for="(item1, index1) in item.ajustdatas" :name="index + '' + index1">
                        <template #title>
                            <div>调整时间：{{ item1.time }}</div>
                        </template>
                        <div class="toggle">
                            <span class="toggleleft">Radio</span>
                            <span class="toggleright">{{ item1.radio }}</span>
                        </div>
                        <div class="toggle">
                            <span class="toggleleft">原因</span>
                            <span class="toggleright">{{ item1.reason }}</span>
                        </div>
                        <div class="toggle">
                            <span class="toggleleft">信道前/后</span>
                            <span class="toggleright">
                                <span class="before">{{ item1.chalbefore }}</span>
                                /
                                <span class="after">{{ item1.chalafter }}</span>
                            </span>
                        </div>
                        <div class="toggle">
                            <span class="toggleleft">功率前/后</span>
                            <span class="toggleright">
                                <span class="before">{{ item1.powerbefore }}</span>
                                /
                                <span class="after">{{ item1.powerafter }}</span>
                            </span>
                        </div>
                        <div class="toggle special">
                            <span class="toggleleft">频宽前/后</span>
                            <span class="toggleright">
                                <span class="before">{{ item1.bwbefore }}</span>
                                /
                                <span class="after">{{ item1.bwafter }}</span>
                            </span>
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
let oData = defineProps({ ajustDataByAP: Object })
const activeNames = ref(["aa"])
const activeNames0 = ref(["bb"])
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
</style>
