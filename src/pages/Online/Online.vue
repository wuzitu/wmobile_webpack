<template>
    <box-title :titleName="t('Network.onlineCfg')"></box-title>
    <div class="init-network">
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
                :componentName="componentName"
                :maxDns="6"
            >
             <template #interface-title>
               <p class="config-title">{{ t("Network.port") }}
                    <van-button plain type="primary">{{ t("Network.switchWan") }}</van-button>
                </p>
            </template>
            </interface-type>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "../../components/BoxTitle"
import SelectPicker from "../../components/SelectPicker"
import InterfaceType from "../../components/InterfaceType"

const { t } = useI18n()

let selectedDevice = ref("MSG360(MAC:0001-002-0004)")
let deviceList = ["1", "2", "3", "MSG360(MAC:0001-002-0004)", "8", "9"]
const userDevice = (e) => {
    selectedDevice.value = e
}

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
let networkProto = "静态IP"
let componentName = "Online"
</script>

<style scoped>
    .init-network {
        margin-bottom: 10px;
        background: #FFF;
        padding: 0 15px 15px 15px;
    }
    .init-network .config-title {
        padding: 15px 0 10px 0;
        margin: 0;
    }
     .config-title .van-button--plain{
        float: right;
        height: 20px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #617CF0;
        line-height: 0px;
        border: none;
    }
</style>