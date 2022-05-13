<template>
    <div class="content">
        <box-title :titleName="t('Wireless.wifiCfg')"></box-title>
        <form @submit="onSubmit">
            <field
                :label="t('Wireless.name')"
                type="text"
                :placeholder="t('Wireless.wifiNamePlaceholder')"
                required
                v-model="wifiName"
            ></field>
            <field
                :label="t('Wireless.remarks')"
                type="text"
                :placeholder="t('Wireless.wifiPlaceholder')"
                v-model="wifiRemarks"
            ></field>
            <van-cell center :title="t('Wireless.wifiEncryption')" required>
                <template #right-icon>
                    <Switch v-model="wifiEncryptionChecked" size="24" />
                </template>
            </van-cell>
             <div v-show="wifiEncryptionChecked" class="pwd">
                <password-field
                    :password="wifiPassword"
                    :label="t('Wireless.password')"
                    :placeholder="t('Wireless.wifiPwdPlaceholder')"
                    @changePassword="wirelessPassword"
                ></password-field>
            </div>
            <!-- <field :label="t('Wireless.password')" :placeholder="t('Wireless.wifiPwdPlaceholder')" required></field> -->
            <van-cell center :title="t('Wireless.hide')" required>
                <template #right-icon>
                    <Switch v-model="wifiHideChecked" size="24" />
                </template>
            </van-cell>
            <van-cell title="VLAN ID" @click="showPopup" is-link :value="vlanId" />
            <van-popup v-model:show="vlanIDshow" position="bottom" :style="{ height: '50%' }">
                <picker
                    :columns="columns"
                    :default-index="selectedIndex"
                    @confirm="onConfirm"
                    @cancel="onCancel"
                >
                </picker>
            </van-popup>
           <div class="button-box">
                <van-button type="default" @click="cancelWifiCfg">{{ t("Cancel") }}</van-button>
                <van-button type="primary" native-type="submit">{{ t("Apply") }}</van-button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance} from "vue"
import { useI18n } from "vue-i18n"
import BoxTitle from "@/components/BoxTitle"
import PasswordField from "@/components/PasswordField"
import { Form, Switch, Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"
import { useRouter, useRoute } from "vue-router"

const route = useRoute()
let routeParams = route.params

const wifiName = ref("")
const wifiRemarks = ref("")
const wifiPassword = ref("")
const wifiHideChecked = ref(true)
const wifiEncryptionChecked = ref(true)
const vlanIDshow = ref(false)

const { t } = useI18n()
// const password = ref("")
const wirelessPassword = (e) => {
    wifiPassword.value = e
}

let vlanId = ref(routeParams.vlanId)
let columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
let selectedIndex = ref("4")
const onConfirm = (value, index) => {
    console.log(value)
    vlanId.value = value
    vlanIDshow.value = false
}
const onCancel = () => {
    Toast("取消")
    vlanId.value = routeParams.vlanId
    vlanIDshow.value = false
}
const showPopup = () => {
    vlanIDshow.value = true
}
//编辑Wi-Fi相关配置
const { proxy } = getCurrentInstance()
const $req = proxy.$req
const router = useRouter()
const onSubmit = async (values) => {
    console.log("submit", values)
    let aRequest = []
    let oTemplate = $req.getTableInstance("GlobalServiceTemplates")
    //获取wifi数据
    let oWifiData = {
        Name : wifiName.value,
        SSID : wifiName.value,
        PskPassPhraseKey : wifiPassword.value,
        HideSsid : wifiHideChecked.value,
        DefaultVlan : vlanId.value
    }
    console.log(oWifiData)
    oTemplate.addRows(oWifiData)
    aRequest.push(oTemplate)
    let response = await $req.set("merge", aRequest)
    //假数据
    router.push({
        name:"WiFiDetails",
        params:{
            name : wifiName.value,
            remarks : wifiRemarks.value,
            encryption :"是",
            hideStatus : wifiHideChecked.value == true ? "隐藏" : "显示",
            vlanId : vlanId.value
        }
    })
    Toast("提交成功")
}
const cancelWifiCfg = () => {
    router.push({
        name:"WiFiDetails",
        params:routeParams
    })
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
