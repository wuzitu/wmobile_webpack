<template>
    <div class="content">
        <box-title :titleName="t('Wireless.wifiCfg')"></box-title>
        <form @submit="onSubmit">
            <field :label="t('Wireless.name')" :placeholder="t('Wireless.wifiNamePlaceholder')" required></field>
            <field :label="t('Wireless.remarks')" :placeholder="t('Wireless.vlanRemarksPlaceholder')"></field>
            <van-cell center :title="t('Wireless.wifiEncryption')" required>
                <template #right-icon>
                    <Switch v-model="wifiEncryptionChecked" @change="intelligentOptimization" size="24" />
                </template>
            </van-cell>
            <field :label="t('Wireless.password')" :placeholder="t('Wireless.wifiPwdPlaceholder')" required></field>
            <van-cell center :title="t('Wireless.hide')" required>
                <template #right-icon>
                    <Switch v-model="wifiHideChecked" @change="intelligentOptimization" size="24" />
                </template>
            </van-cell>
            <van-cell title="VLAN ID" @click="showPopup" is-link value="2" />
            <van-popup v-model:show="vlanIDshow" position="bottom" :style="{ height: '50%' }">
                <picker title="VLAN ID" :columns="columns" default-index="1" @confirm="onConfirm" @cancel="onCancel" @change="onChange"></picker>
            </van-popup>
           <div class="button-box">
                <van-button type="default" to="/WiFiDetails">{{ t("Cancel") }}</van-button>
                <van-button type="primary" native-type="submit">{{ t("Apply") }}</van-button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import { Form, Switch, Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"

const { t } = useI18n()
const wifiEncryptionChecked = ref(true)
const wifiHideChecked = ref(true)
const vlanIDshow = ref(false)
const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
const onConfirm = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
    vlanIDshow.value = false
}
const onChange = (value, index) => {
    Toast(`当前值: ${value}, 当前索引: ${index}`)
}
const onCancel = () => {
    Toast("取消")
    vlanIDshow.value = false
}
const showPopup = () => {
    vlanIDshow.value = true
}
const onSubmit = (values) => {
    console.log("submit", values)
    Toast("提交")
}
</script>
<style scoped>
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

.van-switch--on {
    background: #617cf0;
}

.content .van-cell--required:before {
    padding-left: 6px;
}
.content .van-cell--center {
    padding-left: 25px;
    color: #646566;
}
.content .van-cell--clickable {
    color: #646566;
}
.van-button--primary{
     background: #ffffff;
}
</style>
