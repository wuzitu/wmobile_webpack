<template>
    <div class="content">
        <box-title :titleName="t('Wireless.addWifiCfg')"></box-title>
        <form @submit="onSubmit">
            <field
                :label="t('Wireless.name')"
                type="text"
                :placeholder="t('Wireless.wifiNamePlaceholder')"
                v-model="wifiName"
                required
            ></field>
            <field
                :label="t('Wireless.remarks')"
                type="text"
                :placeholder="t('Wireless.vlanRemarksPlaceholder')"
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
            <!-- <field
                :label="t('Wireless.password')"
                :placeholder="t('Wireless.wifiPwdPlaceholder')"
                required
            ></field> -->
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
                ></picker>
            </van-popup>
            <div class="button-box">
                <van-button type="default" to="/WiFi">{{ t("Cancel") }}</van-button>
                <van-button type="primary" native-type="submit" color="#617CF0">{{ t("Apply") }}</van-button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, getCurrentInstance } from "vue"
import { useI18n } from "vue-i18n"
import { useRouter } from "vue-router"
import BoxTitle from "@/components/BoxTitle"
import { Form, Switch, Field, Cell, CellGroup, Popup, Picker, Toast } from "vant"
import PasswordField from "@/components/PasswordField"

const { t } = useI18n()

const wifiName = ref("")
const wifiRemarks = ref("")
const wifiEncryptionChecked = ref(true)
const wifiPassword = ref("")
const wifiHideChecked = ref(true)
const vlanIDshow = ref(false)
let vlanId = ref("2")

const columns = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
let selectedIndex = ref("4")

const onConfirm = (value, index) => {
    console.log(value)
    vlanId.value = value
    vlanIDshow.value = false
}

const onCancel = () => {
    Toast("取消")
    vlanIDshow.value = false
}
const showPopup = () => {
    vlanIDshow.value = true
}

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
    let response = await $req.set("create", aRequest)
    //假数据
    router.push({
        name:"WiFi",
        params:{
            name : wifiName.value,
            remarks : wifiRemarks.value,
            encryption :"是",
            hideStatus : wifiHideChecked.value == true ? "隐藏" : "显示",
            vlanId : vlanId.value,
            componentName : "AddWiFi"
        }
    })
    Toast("提交")
}
</script>
<style scoped>
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
</style>
