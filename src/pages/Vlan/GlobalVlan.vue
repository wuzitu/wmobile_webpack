<template>
    <div class="content">
        <box-title :titleName="t('Vlan.addGloVlan')"></box-title>
        <div>
            <field label="VLAN ID" :placeholder="t('Vlan.plsInputVlanId')" required></field>
            <field :label="t('Vlan.remarks')" :placeholder="t('Vlan.pslInputRemarks')"></field>
            <field :label="t('Vlan.gateway')" placeholder="192.168.1.1" required></field>
            <field :label="t('Vlan.addressMask')" placeholder="255.255.255.0" required></field>
            <field :label="t('Vlan.lease')" :placeholder="t('Vlan.defaultLease')" required is-link @click="showLeasePopup"></field>
            <van-popup v-model:show="leaseShow" position="bottom" :style="{ height: '50%' }">
                <van-datetime-picker v-model="currentDate" type="datetime" title="选择时间" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="onConfirmLease" @cancel="onCancelLease" @change="onChangeLease" />
            </van-popup>

            <field :label="t('Vlan.selectWifi')" :placeholder="t('Vlan.notInvolved')" is-link @click="showWifiPopup"></field>
            <van-popup v-model:show="wifishow" position="bottom" :style="{ height: '50%' }">
                <picker :title="t('Vlan.selectWifi')" :columns="columns" default-index="1" @confirm="onConfirm" @cancel="onCancel" @change="onChange"></picker>
            </van-popup>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { Form, Switch, Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"

const { t } = useI18n()
const returnData = () => {
    const data = {
        id: "4",
        ip: "1.2.2.1"
    }

    return data
}
defineExpose({
    returnData
})

//time st
const currentDate = ref(new Date())
const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)
const formatter = (type, val) => {
    if (type === "year") {
        return `${val}年`
    }
    if (type === "month") {
        return `${val}月`
    }
    if (type === "day") {
        return `${val}日`
    }
    if (type === "hour") {
        return `${val}时`
    }
    if (type === "minute") {
        return `${val}分`
    }
    return val
}
const onConfirmLease = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
    leaseShow.value = false
}
const onChangeLease = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}
const onCancelLease = () => {
    Toast("取消")
    leaseShow.value = false
}
// time en

const leaseShow = ref(false)
const wifishow = ref(false)
const columns = ["public", "guest"]

const showLeasePopup = () => {
    leaseShow.value = true
}

const onConfirm = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
    wifishow.value = false
}
const onChange = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}
const onCancel = () => {
    Toast("取消")
    wifishow.value = false
}
const showWifiPopup = () => {
    wifishow.value = true
}
</script>
<style scoped></style>
