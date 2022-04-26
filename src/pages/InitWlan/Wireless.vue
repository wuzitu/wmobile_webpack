<template>
    <box-title :titleName="titleName"></box-title>
    <div class="base-wireless">
        <field v-model="SSID" :label="t('Wireless.name')" placeholder="H3C_Autonet" required></field>
        <van-cell center :title="t('Wireless.encryption')">
            <template #right-icon>
                <Switch v-model="checked" size="24" />
            </template>
        </van-cell>
        <div v-show="checked">
            <password-field
                :password="password"
                :label="t('Wireless.password')"
                :placeholder="t('Password.passwordLength')"
                @changePassword="wirelessPassword"
            ></password-field>
        </div>
    </div>
    <div class="advanced-cfg">
        <collapse v-model="vlanActive">
            <collapse-item :title="t('AdvancedCfg')" name="1">
                <field v-model="vlanId" label="VLAN" :placeholder="t('Vlan.initVlanTips')" required></field>
                <field v-model="remark" :label="t('Remark')" :placeholder="t('Vlan.initVlanRemark')"></field>
                <field v-model="gateway" :label="t('Network.gatewayAddress')" placeholder="192.168.1.1" required></field>
                <field v-model="netmask" :label="t('Network.subnetMask3')" placeholder="255.255.255.0" required></field>
                <field v-model="startAddress" :label="t('Network.assignmentStart')" placeholder="192.168.1.1" required></field>
                <field v-model="count" :label="t('Network.assignmentTotal')" placeholder="254" required></field>
            </collapse-item>
        </collapse>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Field, Switch, Collapse, CollapseItem } from "vant"
import BoxTitle from "../../components/BoxTitle"
import PasswordField from "../../components/PasswordField"

const { t } = useI18n()
const titleName = ref(t("Wireless.title1"))
const SSID = ref(""), checked = ref(true), password = ref("")
const vlanId = ref(""), remark = ref(""), gateway = ref(""), netmask = ref(""), startAddress = ref(""), count = ref("")
const vlanActive = ref([])

const wirelessPassword = (e) => {
    password.value = e
}

const returnData = () => {
    const data = {
        SSID: SSID,
        checked: checked,
        password: password,
        vlanId: vlanId,
        remark: remark,
        gateway: gateway,
        netmask: netmask,
        startAddress: startAddress,
        count: count
    }

    return data
}

defineExpose({
    returnData
})
</script>

<style scoped>
    .advanced-cfg {
        margin-bottom: 72px;
    }
    .advanced-cfg :deep(.van-collapse-item__content) {
        padding-top: 0;
        padding-bottom: 0;
    }
    .advanced-cfg :deep(.van-field__label) {
        width: 93px;
    }
</style>