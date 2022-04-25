<template>
    <div class="port-item">
        <van-cell-group :style="{ padding: 0, margin: 0, backgroud: '#F7F7F7' }">
            <van-cell :title="t('DevInfo.type')" :title-style="van - cellTitleStype" size="large" :value="oPort.type" v-show="isShowType">
                <template #right-icon>
                    <svg-icon icon-class="ic_arrow" class="rightIcon" @click="selectPortType"></svg-icon>
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.status')" size="large" :title-style="van - cellTitleStype">
                <template #value>
                    <van-switch v-model="statusChecked" @change="statusChange" size="24" active-color="#617CF0" />
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.isolate')" size="large" v-show="isShowIsolate" :title-style="cellTitleStype">
                <template #value>
                    <van-switch v-model="isolateChecked" @change="isolateChange" size="24" active-color="#617CF0" />
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.aggretation')" size="large" :value="oPort.aggretation" v-show="isShowAggretation" :title-style="cellTitleStype">
                <template #value>
                    <van-switch v-model="aggretChecked" @change="aggreChange" size="24" active-color="#617CF0" />
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.powerup')" size="large" value="内容" v-show="isShowPowerup" :title-style="cellTitleStype">
                <template #value>
                    <van-switch v-model="powerChecked" @change="powerChange" size="24" active-color="#617CF0" />
                </template>
            </van-cell>
            <Field label="PVID" name="PVID" clearable v-model="pvid" size="24" :placeholder="t('DevInfo.inputvlanid') + '(1-4094)'" input-align="right" :focus="pvidFieldFocus" :blur="pvidFieldBlur" v-show="isShowPvid" />
            <van-cell title="VLAN ID" size="large" :value="oPort.vlanid" v-show="isShowVlanid" @click="selectVlanId" :title-style="cellTitleStype">
                <template #right-icon>
                    <svg-icon icon-class="ic_arrow" class="rightIcon"></svg-icon>
                </template>
            </van-cell>
            <van-cell :title="inwardRate" :value="oPort.inrate" size="large" v-show="isShowInRate" :title-style="cellTitleStype" />
            <van-cell :title="outwardRate" :value="oPort.outrate" size="large" v-show="isShowOutRate" :title-style="cellTitleStype" />
            <van-cell :title="curPower" :value="oPort.curporwer" size="large" v-show="isShowCurPower" :title-style="cellTitleStype" />
            <van-cell :title="summitPower" :value="oPort.inerror" size="large" v-show="isShowSumitPower" :title-style="cellTitleStype" />
            <van-cell :title="inwardError" :value="oPort.inerror" size="large" v-show="isShowInError" :title-style="cellTitleStype" />
            <van-cell :title="outwardError" :value="oPort.outerror" size="large" v-show="isShowOutError" :title-style="cellTitleStype" />
        </van-cell-group>
        <van-popup v-model:show="showType" position="bottom" :style="{ height: '30%' }">
            <van-picker v-model="oPort.type" :columns="CategoryColumn" @confirm="onConfirmType" @cancel="onCancelType" @change="onChangeVlanId" columns-field-names="type" :confirm-button-text="t('Apply')" :cancel-button-text="t('Cancel')" show-toolbar="true"></van-picker>
        </van-popup>
        <van-popup v-model:show="showVlanid" position="bottom" :style="{ height: '30%' }">
            <van-picker v-model="oPort.vlanid" :columns="VlanidColumn" @confirm="onConfirmVlanId" @cancel="onCancelVlanId" @change="onChangeVlanId" columns-field-names="vlanid" :confirm-button-text="t('Apply')" :cancel-button-text="t('Cancel')" show-toolbar="true"></van-picker>
        </van-popup>
        <van-dialog />
    </div>
</template>

<script setup>
import { defineProps, ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Cell, CellGroup, Switch as VanSwitch, Popup, Picker as VanPicker, Field, Toast, Dialog } from "vant"

const { t } = useI18n()
const VanDialog = Dialog.Component

const cellTitleStype = {
    "font-size": "14px",
    width: "27px",
    height: "13px",
    "font-family": "PingFang SC",
    "font-weight": "500",
    color: "#333333"
}

// const router = useRouter()
// console.log(router.params)
const props = defineProps({ port: Object, model: String })
let oData = Object.assign({}, props.port)
let oPort = reactive(oData)
let sModel = props.model
let showType = ref(false)
let showVlanid = ref(false)

const inwardRate = t("DevInfo.inward") + t("DevInfo.rate")
const outwardRate = t("DevInfo.outward") + t("DevInfo.rate")
const curPower = t("DevInfo.current") + t("DevInfo.power")
const summitPower = t("DevInfo.sumit") + t("DevInfo.power")
const inwardError = t("DevInfo.inward") + t("DevInfo.wrongmsg")
const outwardError = t("DevInfo.outward") + t("DevInfo.wrongmsg")

let isShowType = ref(false)
let isShowIsolate = ref(false)
let isShowAggretation = ref(false)
let isShowPowerup = ref(false)
let isShowPvid = ref(false)
let isShowVlanid = ref(false)
let isShowInRate = ref(false)
let isShowOutRate = ref(false)
let isShowInError = ref(false)
let isShowOutError = ref(false)
let isShowCurPower = ref(false)
let isShowSumitPower = ref(false)

isShowType = ref(sModel == "dev_dashboard" || sModel == "dev_lan")
isShowIsolate = ref(sModel == "dev_dashboard" || sModel == "dev_lan" || sModel == "ap_port")
isShowAggretation = ref(sModel == "dev_dashboard" || sModel == "dev_lan")
isShowPowerup = ref(sModel == "poe")
isShowPvid = ref(sModel == "dev_dashboard" || sModel == "dev_lan" || sModel == "ap_port")
isShowVlanid = ref(sModel == "dev_dashboard" || sModel == "dev_lan")
isShowInRate = ref(sModel == "dev_dashboard")
isShowOutRate = ref(sModel == "dev_dashboard")
isShowInError = ref(sModel == "dev_dashboard")
isShowOutError = ref(sModel == "dev_dashboard")
isShowCurPower = ref(sModel == "poe")
isShowSumitPower = ref(sModel == "poe")

let aCategory = ["WAN", "LAN"]
const CategoryColumn = reactive(aCategory)
let aVlanId = ["1", "2", "3", "4", "5", "100"]
const VlanidColumn = reactive(aVlanId)
const statusChecked = ref(false)
const isolateChecked = ref(false)
const aggretChecked = ref(false)
const powerChecked = ref(false)

let pvid = ref(oPort.pvid)

const statusChange = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangeIsolate")
    }).then(() => {
        statusChecked.value = newValue
        Toast(t("SET_SUCCESS"))
    })
}

const isolateChange = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangeIsolate")
    }).then(() => {
        isolateChecked.value = newValue
        Toast(t("SET_SUCCESS"))
    })
}

const aggreChange = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangeAggretation")
    }).then(() => {
        aggretChecked.value = newValue
        Toast(t("SET_SUCCESS"))
    })
}

const powerChange = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangePower")
    }).then(() => {
        powerChecked.value = newValue
        Toast(t("SET_SUCCESS"))
    })
}

const selectVlanId = () => {
    showVlanid.value = true
}

const selectPortType = () => {
    showType.value = true
}

const result = ref("")

const onConfirmType = (value, index) => {
    result.value = value
    showType.value = false
    Toast(`当前值: ${value}, 当前索引: ${index}`)
    oPort.type = value
    Toast(t("SET_SUCCESS"))
}

const onCancelType = () => {}

const onConfirmVlanId = (value, index) => {
    result.value = value
    showVlanid.value = false
    Toast(`当前值: ${value}, 当前索引: ${index}`)
    oPort.vlanid = value
    Toast(t("SET_SUCCESS"))
}

const onCancelVlanId = () => {}

const onChangeVlanId = () => {}

const pvidFieldFocus = () => {}

const pvidFieldBlur = () => {
    Toast(t("SET_SUCCESS"))
}
</script>

<style scoped>
.port-item {
    background-color: #f7f7f7;
    padding: 0;
    margin: 0;
}
.rightIcon {
    width: 12px;
    height: 12px;
    margin-top: 5px;
}

.van-cell-group {
    width: 100%;
    background: #f7f7f7;
}

.van-cell {
    background: #f7f7f7;
}

.van-field_control {
    color: #999999;
}

.van-cell:after {
    border-bottom: 1px solid #d8d8d8;
}
</style>
