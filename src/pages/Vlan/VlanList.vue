<template>
    <div class="cardWrap" @click="vlanDetails">
        <div class="title">
            <span>
                <span class="vlan-name">VLAN ID: {{ vlanListData.id }}</span>
            </span>
            <svg-icon icon-class="ic_deletevlan" class="iconStyle" v-show="vlanListData.id=='1'? false : true"  @click.stop="delVlan(vlanListData.name)"></svg-icon>
        </div>
        <p>
            <span class="vlan-remarks">{{ t("Vlan.remarks") }}: {{ vlanListData.remarks }}</span>
        </p>
        <p>
            <span class="vlan-remarks">{{ t("Vlan.ip") }}: {{ vlanListData.ip }}</span>
            <span class="lineSpan">{{ t("Vlan.addressAssignment") }}：{{ vlanListData.addressAssignment }}</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Toast, Dialog } from "vant"

const { t } = useI18n()
const router = useRouter()
const vlan = defineProps({ vlanData: Object })
console.log(vlan)
const vlanListData = vlan.vlanData
console.log(vlanListData)

const delVlan = (name) => {
    console.log(name)
    Dialog.confirm({
        title: t("Vlan.delVlanTitle"),
        confirmButtonText: t("Apply"),
        cancelButtonText: t("Cancel"),
        confirmButtonColor: "#617CF0",
        message: t("Vlan.delVlanMessage")
    })
        .then(() => {
            Toast.success(t("Vlan.delVlanSuccess"))
        })
        .catch(() => {
            Toast.success(t("Vlan.delVlanCancel"))
        })
}

const vlanDetails = () => {
    console.log("VLAN详情页面")
    router.push("/WiFiDetails?vlanId=" + vlanListData.vlanId)
}
</script>

<style scoped>
.iconStyle {
    width: 15px;
    height: 15px;
}
.cardWrap {
    background: #ffffff;
    padding: 10px;
    flex: 1;
}
.title {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

p {
    margin: 5px 0;
    padding: 0;
    color: #666666;
}

p span {
    margin: 0 5px;
}

p span:nth-child(1) {
    margin-left: 0;
}
.vlan-name {
    color: #333333;
    font-size: 14px;
}
.vlan-remarks {
    font-size: 13px;
    color: #666666;
    border-radius: 3px;
    display: inline-block;
}
.lineSpan {
    font-size: 13px;
    color: #666666;
}
.lineSpan::before {
    content: "|";
    position: relative;
    left: -5px;
    color: #999999;
}
</style>
