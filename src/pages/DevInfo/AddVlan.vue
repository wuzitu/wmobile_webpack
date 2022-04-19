<template>
    <div class="cardWrap">
        <div class="title">
            <span>
                <span class="vlan-name">{{ t('Wireless.name') }}: {{ vlanListData.name }}</span>
            </span>
            <svg-icon icon-class="ic_deletevlan" class="iconStyle" @click="delvlan(vlanListData.name)"></svg-icon>
        </div>
        <p> <span class="vlan-remarks">{{ t('Wireless.remarks') }}: {{ vlanListData.remarks }}</span> </p>
        <p>
            <span class="vlan-remarks">{{ t('Wireless.vlanPwd') }}: {{ vlanListData.passwd }}</span>
            <span class="lineSpan">VLAN ID：{{ vlanListData.vlanId }}</span>
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
        title: t("Wireless.delvlanTitle"),
        confirmButtonText: t("Apply"),
        cancelButtonText: t("Cancel"),
        confirmButtonColor: "#617CF0",
        message: t("Wireless.delvlanMessage")
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


.rightIcon {
    width: 12px;
    height: 12px;
    vertical-align: middle;
}

.add-vlan-icon{
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
.vlan-list{
    margin-top: 10px;
}

.vlanCardWrap {
    margin-top: 8px;
    display: flex;
    padding: 0 15px;
}

.vlan-describe{
    width: 344px;
    height: 33px;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #999999;
    line-height: 19px;
    padding-left: 15px;
    padding-right: 15px;
}

.header-title {
    float: right;
    padding-right: 10px;
    color: #666666;
}
.add-vlan{
    width: 100px;
    height: 30px;
    margin: 0 auto;
    margin-top: 22px;
    text-align: center;
    line-height: 30px;
}
.add-vlan-title{
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #F43E3B;
    padding-left: 9px;
}
</style>
