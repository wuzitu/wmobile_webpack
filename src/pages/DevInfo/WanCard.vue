<template>
    <div class="wan-port">
        <wan-port></wan-port>
    </div>
    <div class="wan-card">
        <!-- 网关设备 -->
        <div class="config-box">
            <p class="config-title">{{ t("Network.deviceType1") }}</p>
            <select-picker
                :selected="selectedDevice"
                :columns="deviceList"
                @changeSelected="userDevice"
            ></select-picker>
        </div>
        <!-- 面板 -->
        <div class="config-box">
            <interface-type
                ref="interfaceForm"
                :selectedInterface="interfaceName"
                :interfaceList="interfaceList"
                :selectedType="networkProto"
            ></interface-type>
        </div>
        <van-divider  :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"/>
        <van-cell-group inset>
            <van-cell center :title="t('DevInfo.selfdefine') + 'MTU'" >
                <template #right-icon>
                    <Switch v-model="MTUChecked" @change="changeMTU" size="24" />
                </template>
            </van-cell>
            <van-field
                :class="{hide:isHide}"
                v-model="sMTU"
                placeholder="46-1560"
            />
        </van-cell-group>
    </div>


</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import {Form, Field,CellGroup ,Divider } from "vant"
import BoxTitle from "../../components/BoxTitle"
import SelectPicker from "../../components/SelectPicker"
import InterfaceType from "../../components/InterfaceType"
import WanPort from "./WanPort"

const { t } = useI18n()
const titleName = ref(t("Network.title1"))
let MTUChecked = ref(true)
let hideMTUInput = ref(true)

let selectedDevice = ref("MSG360(MAC:0001-002-0004)")
let deviceList = ["1", "2", "3", "MSG360(MAC:0001-002-0004)", "8", "9"]
const userDevice = (e) => {
    selectedDevice.value = e
}
let isHide = ref(true)
let MTU = ref("")

const interfaceForm = ref()
const getData = () => {
    return interfaceForm.value.returnData()
}

const returnData = () => {
    const interfaceData = getData()
    const data = {
        device: selectedDevice,
        interface: interfaceData.interface,
        type: interfaceData.type,
        config: interfaceData.config
    }

    return data
}

defineExpose({
    returnData
})

// 假数据
let interfaceName = "WAN(UP)"
const interfaceList = ["WAN(UP)", "WAN2(UP)", "WAN3(UP)"]
let networkProto = "PPPoE"

const changeMTU = ()=>{
    MTUChecked = MTUChecked ? false : true
    if(MTUChecked){
        isHide = false
    }
}
</script>

<style scoped>
    .wan-card {
        margin-bottom: 10px;
        background: #FFF;
        padding: 0 15px 15px 15px;
    }
    .wan-card .config-title {
        padding: 15px 0 10px 0;
        margin: 0;
    }

    .hide {
        display: none;
    }

    .wan-port {
        width: 100%;
    }

</style>