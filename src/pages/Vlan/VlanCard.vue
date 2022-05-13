<template>
    <div class="content">
        <box-title :titleName="vlanIdTitle"></box-title>
        <div class="vlan-info" v-if="isShow">
            <van-cell :title="t('Vlan.remarks')" :value="vlanInfo.remarks" />
            <van-cell :title="t('Vlan.gateway')" :value="vlanInfo.gateway" />
            <van-cell :title="t('Vlan.addressMask')" :value="vlanInfo.addressMask" />
            <van-cell :title="t('Vlan.lease')" :value="vlanInfo.lease" />
            <van-cell :title="t('Vlan.addressAssignment')" :value="vlanInfo.addressAssignment" />
            <van-button type="primary" block @click="vlanEdit">编辑</van-button>
        </div>
        <div class="vlan-edit" v-else>
            <form @submit="onSubmit">
                <field :label="t('Vlan.remarks')" :placeholder="vlanInfo.remarks"></field>
                <field :label="t('Vlan.gateway')" :placeholder="vlanInfo.gateway" required></field>
                <field :label="t('Vlan.addressMask')" :placeholder="vlanInfo.addressMask" required></field>
                <field :label="t('Vlan.lease')" :placeholder="t('Vlan.defaultLease')" required  is-link  @click="showLeasePopup"></field>
                <van-popup v-model:show="leaseShow" position="bottom" :style="{ height: '50%' }">
                 <van-datetime-picker v-model="currentDate" type="datetime" title="选择时间" :min-date="minDate" :max-date="maxDate" :formatter="formatter" @confirm="onConfirmLease" @cancel="onCancelLease" @change="onChangeLease" />
                </van-popup>
                <field :label="t('Vlan.addressAssignment')" placeholder="50%"></field>
                <div class="button-box">
                    <van-button type="default" @click="cancelEdit">{{ t("Cancel") }}</van-button>
                    <van-button type="primary" native-type="submit">{{ t("Apply") }}</van-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"

const { t } = useI18n()
const vlanId = "1"
const vlanIdTitle = "VLAN ID : " + vlanId + t('Vlan.globalVlanId')

const vlanInfo = reactive({
    vlanId: "1",
    remarks: "默认VLAN",
    gateway: "192.168.1.1",
    addressMask: "255.255.255.0",
    lease:"1天0时0分0秒",
    addressAssignment: "50%"
})
let isShow = ref(true)
const vlanEdit = () => {
    isShow.value = isShow.value == true ? false : true
    console.log("Vlan编辑页面")
}

const leaseShow = ref(false)
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
const showLeasePopup = () => {
    leaseShow.value = true
}

const cancelEdit = () => {
    isShow.value = isShow.value == true ? false : true
    console.log("取消Vlan编辑")
}
const onSubmit = (values) => {
    console.log("submit", values)
    isShow.value = isShow.value == true ? false : true
    Toast("提交成功")
}
</script>
<style scoped>
.content{
    margin-bottom: 10px;
}
.vlan-info .van-cell {
    color: #333333;
}
.vlan-info .van-button--primary {
    height: 50px;
    background: #ffffff;
    color: #617cf0;
    border-radius: 0px;
    border: none;
}
/* vlan编辑 */
.vlan-edit{
    margin-bottom: -8px;
}
.button-box {
    width: 100%;
    display: flex;
    flex: 2;
    height: 50px;
}
.button-box button {
    flex: 1;
}
.button-box .van-button--default{
    color: #666666;
    border: none;
    text-align: right;
}
.button-box .van-button--primary{
    color: #617CF0;
    background-color: #ffffff;
    border: none;
    border-left: 1px solid #ebedf0;
}

</style>
