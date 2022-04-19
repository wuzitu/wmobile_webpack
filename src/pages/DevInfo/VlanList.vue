<template>
    <div class="cardWrap">
        <div class="title">
            <span>
                <span class="vlan-name">VLAN ID: {{ vlanListData.vlanId }}</span>
            </span>
            <svg-icon icon-class="ic_deletevlan" v-show=" vlanListData.vlanId != 1" class="iconStyle" @click="delvlan(vlanListData.vlanId)"></svg-icon>
        </div>
        <p> <span class="vlan-remarks">{{ t('DevInfo.Backup') }} : {{ vlanListData.backup }}</span> </p>
        <p>
            <span class="vlan-remarks">{{ t('DevInfo.macaddress') }}: {{ vlanListData.passwd }}</span>
            <span class="lineSpan">{{ t('DevInfo.ipaddress') }} ：{{ vlanListData.vlanId }}</span>
        </p>
    </div>
</template>

<script setup>
import { defineProps } from "vue"
import { useI18n } from "vue-i18n"
import { Toast, Dialog } from "vant"
const { t } = useI18n()

const vlan = defineProps({ vlanData: Object })
console.log(vlan)
const vlanListData = vlan.vlanData
console.log(vlanListData)

const delvlan = (name) => {
    console.log(name)
    Dialog.confirm({
        title: t("DevInfo.delvlanTitle"),
        confirmButtonText: t("Apply"),
        cancelButtonText: t("Cancel"),
        confirmButtonColor: "#617CF0",
        message: t("DevInfo.delvlanMessage")
    }).then(() => {
        Toast.success(t("Wireless.delvlanSuccess"))
    }).catch(() => {
        Toast.success(t("Wireless.delvlanCancel"))
    })
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
.lineSpan{
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
