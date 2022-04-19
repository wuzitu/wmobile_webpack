<template>
    <box-title :titleName="titleName"></box-title>
    <div class="base-wireless">
        <field v-model="SSID" :label="t('Wireless.name')" placeholder="H3C_Autonet" required></field>
        <van-cell center :title="t('Wireless.encryption')">
            <template #right-icon>
                <Switch v-model="checked" size="24" />
            </template>
        </van-cell>
        <field v-model="password" :label="t('Wireless.password')" required></field>
    </div>
    <div class="advanced-cfg">
        <collapse v-model="vlanActive">
            <collapse-item :title="t('AdvancedCfg')" name="1">
                <field v-model="vlanId" label="VLAN" required></field>
                <field v-model="remark" :label="t('Remark')"></field>
                <field v-model="gateway" :label="t('Network.gatewayAddress')" required></field>
                <field v-model="netmask" :label="t('Network.subnetMask3')" required></field>
                <field v-model="startAddress" :label="t('Network.assignmentStart')" required></field>
                <field v-model="count" :label="t('Network.assignmentTotal')" required></field>
            </collapse-item>
        </collapse>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Field, Switch, Collapse, CollapseItem } from "vant"
import BoxTitle from "../../components/BoxTitle"

const { t } = useI18n()
const titleName = ref(t("Wireless.title1"))
const SSID = ref(""), checked = ref(true), password = ref("")
const vlanId = ref(""), remark = ref(""), gateway = ref(""), netmask = ref(""), startAddress = ref(""), count = ref("")
const vlanActive = ref([])

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