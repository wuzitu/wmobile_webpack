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
             <!-- 端口示意图 -->
            <div class="wan-port-select">
                <port-chart :bshowPoe="showPoe" :arrPortPos="arrPortPos" :aTestPorts="aTestPorts"></port-chart>
             </div>
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
// import WanPort from "@/pages/DevInfo/WanPort"
import PortChart from "@/pages/DevInfo/PortChart"
import SelectPicker from "../../components/SelectPicker"
import InterfaceType from "../../components/InterfaceType"

const { t } = useI18n()

let showPoe = ref(false)

let arrPortPos = ref({
    port: [
        [
            [1, 3, 5, 7],
            [2, 4, 6, 8]
        ],
        [
            [9, 11, 13, 15],
            [10, 12, 14, 16]
        ],
        [
            [17, 19, 21, 23],
            [18, 20, 22, 24]
        ],
        [[], [25, 26]]
    ]
})

let aTestPorts = ref([
    { ifIndex: "1", ifName: "1", ifType: "1", Status: "0" },
    { ifIndex: "2", ifName: "2", ifType: "1", Status: "1" },
    { ifIndex: "3", ifName: "3", ifType: "1", Status: "2" },
    { ifIndex: "4", ifName: "4", ifType: "1", Status: "2" },
    { ifIndex: "5", ifName: "5", ifType: "1", Status: "1" },
    { ifIndex: "6", ifName: "6", ifType: "1", Status: "1" },
    { ifIndex: "7", ifName: "7", ifType: "1", Status: "2" },
    { ifIndex: "8", ifName: "8", ifType: "1", Status: "2" },
    { ifIndex: "9", ifName: "9", ifType: "1", Status: "1" },
    { ifIndex: "10", ifName: "10", ifType: "1", Status: "1" },
    { ifIndex: "11", ifName: "11", ifType: "1", Status: "1" },
    { ifIndex: "12", ifName: "12", ifType: "1", Status: "2" },
    { ifIndex: "13", ifName: "13", ifType: "1", Status: "0" },
    { ifIndex: "14", ifName: "14", ifType: "1", Status: "2" },
    { ifIndex: "15", ifName: "15", ifType: "1", Status: "2" },
    { ifIndex: "16", ifName: "16", ifType: "1", Status: "2" },
    { ifIndex: "17", ifName: "17", ifType: "1", Status: "1" },
    { ifIndex: "18", ifName: "18", ifType: "1", Status: "1" },
    { ifIndex: "19", ifName: "19", ifType: "1", Status: "1" },
    { ifIndex: "20", ifName: "20", ifType: "1", Status: "2" },
    { ifIndex: "21", ifName: "21", ifType: "1", Status: "2" },
    { ifIndex: "22", ifName: "22", ifType: "1", Status: "2" },
    { ifIndex: "23", ifName: "23", ifType: "1", Status: "2" },
    { ifIndex: "24", ifName: "24", ifType: "1", Status: "1" },
    { ifIndex: "25", ifName: "1", ifType: "2", Status: "2" },
    { ifIndex: "26", ifName: "2", ifType: "2", Status: "1" }
])

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
    .wan-port-select{
        margin-top: 10px;
    }
    .wan-port-select .poe-port{
        width: auto;
    }

</style>