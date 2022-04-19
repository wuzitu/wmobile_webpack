<template>
    <div class="port-item">
        <van-cell-group>
            <van-cell :title="t('DevInfo.type')" :title-style="van-cellTitleStype" size="large" :value="oPort.type" v-show="isShowType">
                <template #right-icon>
                    <svg-icon icon-class="ic_arrow" class="rightIcon" @click="selectPortType"></svg-icon>
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.status')" size="large" :title-style="van-cellTitleStype">
                <template #value>
                    <van-switch v-model="checked" @change="statusChange" size="24"/>
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.isolate')" size="large" v-show="isShowIsolate"
                      :title-style="cellTitleStype"
            >
                <template #value>
                    <van-switch v-model="checked" @change="isolateChange" size="24"/>
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.aggretation')" size="large" :value="port.aggretation"  v-show="isShowAggretation"
                      :title-style="cellTitleStype"
            >
                <template #value>
                    <van-switch v-model="checked" @change="aggreChange" size="24"/>
                </template>
            </van-cell>
            <van-cell :title="t('DevInfo.powerup')" size="large"  value="内容"  v-show="isShowPowerup"
                      :title-style="cellTitleStype"
            >
                <template #value>
                    <van-switch v-model="checked" @change="powerChange" size="24"/>
                </template>
            </van-cell>
            <Field label="PVID" name="PVID"  clearable v-model="pvid"
                   size="24" :placeholder="t('DevInfo.inputvlanid') + '(1-4094)'" input-align="right"
                   :focus="pvidFieldFocus" :blur="pvidFieldBlur" v-show="isShowPvid"
            />
            <van-cell title="VLAN ID" size="large" :value="port.vlanid" v-show="isShowVlanid" @click="selectVlanId" :title-style="cellTitleStype">
                <template #right-icon>
                    <svg-icon icon-class="ic_arrow" class="rightIcon"></svg-icon>
                </template>
            </van-cell>
            <van-cell :title="inwardRate" :value="port.inrate" size="large" v-show="isShowInRate" :title-style="cellTitleStype"/>
            <van-cell :title="outwardRate" :value="port.outrate" size="large" v-show="isShowOutRate" :title-style="cellTitleStype"/>
            <van-cell :title="curPower" :value="port.curporwer" size="large" v-show="isShowCurPower" :title-style="cellTitleStype" />
            <van-cell :title="summitPower" :value="port.inerror" size="large" v-show="isShowSumitPower" :title-style="cellTitleStype" />
            <van-cell :title="inwardError" :value="port.inerror" size="large" v-show="isShowInError" :title-style="cellTitleStype"/>
            <van-cell :title="outwardError" :value="port.outerror" size="large" v-show="isShowOutError" :title-style="cellTitleStype"/>
        </van-cell-group>
        <van-popup v-model:show="show" position="bottom" :style="{height:'30%'}">
           <van-picker v-model="pvid" :columns="colums_category"
                      @confirm ="onConfirm" @cancel="onCancel" @change="onChange"
                      columns-field-names="vlanid" confirm-button-text="t('Apply')"
                      cancel-button-text="t('Cancel')" show-toolbar="true"
            >
                        {{ sSelectTitle}}
           </van-picker>
        </van-popup>
    </div>
</template>

<script setup>
import { defineProps,ref } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Cell, CellGroup ,Switch as VanSwitch,Popup,Picker as VanPicker,Field ,Toast} from "vant"

const { t } = useI18n()
const cellTitleStype = {
    "font-size":"14px",
    "width":"27px",
    "height":"13px",
    "font-family":"PingFang SC",
    "font-weight":"500",
    "color":"#333333"
}

// const router = useRouter()
// console.log(router.params)
const props = defineProps({ port: Object,model:String })
let oPort = Object.assign({},props.port)
let sModel = props.model
let show = ref(false)

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

isShowType = ref((sModel == "dev_dashboard") || (sModel == "dev_lan"))
isShowIsolate = ref((sModel == "dev_dashboard") || (sModel == "dev_lan") || (sModel == "ap_port"))
isShowAggretation = ref((sModel == "dev_dashboard") || (sModel == "dev_lan"))
isShowPowerup = ref((sModel == "poe"))
isShowPvid = ref((sModel == "dev_dashboard") || (sModel == "dev_lan") || (sModel == "ap_port"))
isShowVlanid = ref((sModel == "dev_dashboard") || (sModel == "dev_lan"))
isShowInRate = ref((sModel == "dev_dashboard"))
isShowOutRate = ref((sModel == "dev_dashboard"))
isShowInError = ref((sModel == "dev_dashboard"))
isShowOutError = ref((sModel == "dev_dashboard"))
isShowCurPower = ref((sModel == "poe"))
isShowSumitPower = ref((sModel == "poe"))

let sSelectTitle = ref("请选择一个VLAN ID")

const colums_category = ["WAN","LAN"]
const colums_vlanid = ref(["1","2","3","4","5","100"])
const colums = []
const checked = false

let pvid = ref(oPort.pvid)


const statusChange = () => {

}

const isolateChange = () => {

}

const aggreChange = () => {

}

const powerChange = () => {

}

const selectVlanId = () => {
    sSelectTitle = t("DevInfo.pleaseSelect") + "VLAN ID"
    show.value = true
}

const selectPortType = () => {
    sSelectTitle = t("DevInfo.pleaseSelect") + t("DevInfo.interface") + t("DevInfo.interface")
    show.value = true

}

const result = ref("")

const onConfirm = (value,index) => {
    result.value = value
    show.value = false
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}

const onCancel = () => {

}

const onChange = () => {

}

const pvidFieldFocus = () => {

}

const pvidFieldBlur = () => {

}
</script>

<style scoped>
.rightIcon {
    width: 12px;
    height: 12px;
    margin-top: 5px;
}
</style>
