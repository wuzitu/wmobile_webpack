<template>
    <div class="wan-port">
        <wan-port></wan-port>
    </div>
    <div class="wan-card">
        <!-- 面板 -->
        <div class="config-box">
            <interface-type ref="interfaceForm" :selectedInterface="interfaceName" :interfaceList="interfaceList" :selectedType="networkProto">
                <template #interface-title>
                    <p class="config-title">{{ t("DevInfo.interface") }}</p>
                    <div class="switch-type" @click="changeType">
                        <span>{{ t("DevInfo.changeto") }} {{ portType }}</span>
                    </div>
                </template>
            </interface-type>
        </div>
        <div style="{ color: '#D8D8D8', backgroud: '#D8D8D8', width: '345px', height: '10px' }"></div>
        <van-cell-group>
            <van-cell :title="t('DevInfo.selfdefine') + 'MTU'">
                <template #right-icon>
                    <van-switch v-model="showMTUInput" @change="changeMTU" size="24" />
                </template>
            </van-cell>
            <van-field :class="{ hide: !showMTUInput }" v-model="sMTU" placeholder="   46-1560" />
        </van-cell-group>
    </div>
    <div class="button-box">
        <van-button type="primary" color="#617CF0" @click="initSubmit">{{ t("Apply") }}</van-button>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useI18n } from "vue-i18n"
import { Form, Field as VanField, CellGroup, Divider, Toast, Dialog, Cell, Switch as VanSwitch } from "vant"
import BoxTitle from "../../components/BoxTitle"
import SelectPicker from "../../components/SelectPicker"
import InterfaceType from "../../components/InterfaceType"
import WanPort from "./WanPort"

const { t } = useI18n()
let showMTUInput = ref(false)
let sMTU = ref("")
let portType = ref("WAN")

const interfaceForm = ref()
const getData = () => {
    return interfaceForm.value.returnData()
}

const returnData = () => {
    const interfaceData = getData()
    const data = {
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
let interfaceList = ref(["WAN(UP)", "WAN2(UP)", "WAN3(UP)"])
let networkProto = "PPPoE"

const changeMTU = (newValue) => {
    showMTUInput.value = newValue
}

const changeType = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangePortType")
    }).then(() => {
        portType.value = portType.value == "WAN" ? "LAN" : "WAN"
        if (portType.value == "WAN") {
            interfaceList.value = ["WAN(UP)", "WAN2(UP)", "WAN3(UP)"]
        } else {
            interfaceList.value = ["LAN(UP)", "LAN2(UP)", "LAN3(UP)"]
        }
        Toast(t("SET_SUCCESS"))
    })
}
const gCfgData = ref()
const initSubmit = () => {
    let gCfgInfo = gCfgData.value.returnData()
    // let devListInfo = devListData.value.returnData()
    console.log(gCfgData)
    // console.log(devListInfo)
    Toast("提交成功")
}
</script>

<style scoped>
.wan-card {
    margin-bottom: 45px;
    background: #fff;
    padding: 0 15px 15px 15px;
    height:auto;
}
.wan-card .config-title {
    padding: 15px 0 10px 0;
    margin: 0;
    display: inline-block;
}

.wan-card .switch-type {
    padding: 15px 0px 10px 0;
    margin: 0;
    display: inline-block;
    float: right;
    color: #617cf0;
    font-size: 14px;
}

.hide {
    display: none;
}

.wan-port {
    width: 100%;
}

.config-title {
    display: inline-block;
    width: auto;
}

.wan-card :deep(.van-cell) {
    padding-left: 0;
}

.wan-card :deep(.van_field-body) {
    width: 345px;
    height: 45px;
    background: #f7f8fa;
    border-radius: 4px;
}

.wan-card :deep(.van_field-body #placeHolder) {
    padding-left: 15px;
}

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
</style>