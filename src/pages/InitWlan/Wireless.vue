<template>
    <Form>
        <box-title :titleName="titleName"></box-title>
        <div class="base-wireless">
            <field
                v-model="SSID"
                :label="t('Wireless.name')"
                placeholder="H3C_Autonet"
                required
            ></field>
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
                    <field
                        class="digits"
                        v-model="VlanID"
                        type="digit"
                        label="VLAN"
                        :placeholder="t('Vlan.initVlanTips')"
                        maxlength="4"
                        required
                        :rules="[{ validator: widget['digitsVlan'] }]"
                    ></field>
                    <field
                        v-model="Description"
                        :label="t('Remark')"
                        :placeholder="t('Vlan.initVlanRemark')"
                    ></field>
                    <field
                        v-model="GatewayIpv4Address"
                        :label="t('Network.gatewayAddress')"
                        placeholder="192.168.1.1"
                        required
                    ></field>
                    <field
                        v-model="NetworkIpv4Mask"
                        :label="t('Network.subnetMask3')"
                        placeholder="255.255.255.0"
                        required
                    ></field>
                    <field
                        v-model="StartIpv4Network"
                        :label="t('Network.assignmentStart')"
                        placeholder="192.168.1.1"
                        required
                    ></field>
                    <field
                        v-model="EndIpv4Network"
                        :label="t('Network.assignmentEnd')"
                        placeholder="192.168.1.254"
                        required
                    ></field>
                </collapse-item>
            </collapse>
        </div>
    </Form>
</template>

<script setup>
import { ref, watchEffect } from "vue"
import { useI18n } from "vue-i18n"
import { Field, Switch, Collapse, CollapseItem, Form } from "vant"
import BoxTitle from "../../components/BoxTitle"
import PasswordField from "../../components/PasswordField"
import widget from "../../frame/utils/widget"

const props = defineProps({
    serviceTemplate: {
        type: Object,
        default: () => {
            return {
                SSID: "H3C_Autonet",
                DefaultVlan: "1",
                AkmMode: "2"
            }
        }
    }
})

const { t } = useI18n()
const titleName = ref(t("Wireless.title1"))
const SSID = ref("")
const checked = ref(true)
const password = ref("")
const VlanID = ref("")
const Description = ref("")
const GatewayIpv4Address = ref("")
const NetworkIpv4Mask = ref("")
const StartIpv4Network = ref("")
const EndIpv4Network = ref("")
const vlanActive = ref([])

watchEffect(() => {
    SSID.value = props.serviceTemplate.SSID
    VlanID.value = props.serviceTemplate.DefaultVlan

    if (props.serviceTemplate.AkmMode == "2") {
        checked.value = true
    } else {
        checked.value = false
    }
})

const wirelessPassword = (e) => {
    password.value = e
}

const mGlobalServiceTemplates = () => {
    let ncTable = {
        NC: "GlobalServiceTemplates",
        operation: "merge",
        rows: [
            {
                Name: "H3C_Autonet",
                SSID: props.serviceTemplate.SSID,
                HideSsid: "false",
                Enable: "true",
                DefaultVlan: VlanID.value == "" ? "1" : VlanID.value
            }
        ]
    }

    if (checked) {
        ncTable.rows[0].PskPassPhraseKey = password.value
    }

    return ncTable
}

const mGlobalVlan = () => {
    let ncTable = {
        NC: "GlobalVlan",
        operation: "merge",
        rows: [
            {
                VlanID: VlanID.value
            }
        ]
    }

    if (Description.value) {
        ncTable.rows[0].Description = Description.value
    }

    return ncTable
}

const mVlanPool = () => {
    const ncTable = {
        NC: "GlobalVlan",
        operation: "merge",
        rows: [
            {
                VlanID: VlanID.value,
                Ipv4: {
                    Ipv4Address: GatewayIpv4Address.value,
                    Ipv4Mask: NetworkIpv4Mask.value
                }
            }
        ]
    }

    return ncTable
}

const mDHCPServerIpPool = (sLocalNet) => {
    const ncTable = {
        NC: "GlobalVlan",
        operation: "merge",
        rows: [
            {
                PoolIndex: "0",
                PoolName: VlanID.value,
                NetworkIpv4Address: sLocalNet,
                NetworkIpv4Mask: NetworkIpv4Mask.value,
                DNSIpv4Address: GatewayIpv4Address.value,
                GatewayIpv4AddressIpv4Address: GatewayIpv4Address.value
            }
        ]
    }

    return ncTable
}

const returnData = () => {
    let sLocalNet = ""
    let ncList = []
    for (let i = 0; i < 4; i++) {
        sLocalNet += GatewayIpv4Address.value.split(".")[i] & NetworkIpv4Mask.value.split(".")[i]
        if (i != 3) {
            sLocalNet += "."
        }
    }

    ncList.push(mGlobalServiceTemplates())

    if (VlanID.value == "" || VlanID.value == "1") {
        if (GatewayIpv4Address.value) {
            ncList.push(mVlanPool())
            ncList.push(mDHCPServerIpPool(sLocalNet))
        }
    } else {
        ncList.push(mGlobalVlan())
    }

    return ncList
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