<template>
    <global-vlan ref="gVlanData"></global-vlan>
    <device-card ref="devListData">
        <template #device-title>
            <span>{{ t("Vlan.selectDevice") }}</span>
        </template>
    </device-card>
    <div class="button-box">
        <van-button type="default" to="/Vlan">{{ t("Cancel") }}</van-button>
        <van-button type="primary" color="#617CF0" @click="initSubmit">{{ t("Apply") }}</van-button>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Toast } from "vant"
import GlobalVlan from "./GlobalVlan"
import DeviceCard from "./DeviceCard"

const { t } = useI18n()
const gVlanData = ref()
const devListData = ref()
const initSubmit = () => {
    let gVlanInfo = gVlanData.value.returnData()
    // let devListInfo = devListData.value.returnData()
    console.log(gVlanInfo)
    // console.log(devListInfo)
    Toast("提交成功")
}
</script>

<style scoped>
.button-box {
    width: 100%;
    display: flex;
    flex: 2;
    position: fixed;
    bottom: 0;
}
.button-box button {
    flex: 1;
}

.deviceHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}
</style>