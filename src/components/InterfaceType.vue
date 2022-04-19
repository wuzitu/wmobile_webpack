<template>
    <!-- 上网口 -->
    <div class="config-box">
        <p class="config-title">{{ t("Network.interfaceWan") }}</p>
        <select-picker
            :selected="selectedInterface"
            :columns="props.interfaceList"
            @changeSelected="userInterface"
        ></select-picker>
    </div>
    <!-- 上网方式 -->
    <div class="config-box">
        <p class="config-title">{{ t("Network.networkType") }}</p>
        <select-picker
            :selected="selectedType"
            :columns="typeList"
            @changeSelected="userType"
        ></select-picker>
        <div class="type-config type-dhcp" v-if="selectedType == typeList[0]">{{ t("Network.dhcpTips") }}</div>
        <div class="type-config" v-else-if="selectedType == typeList[1]">
            <field
                v-model="userName"
                :label="t('Password.account')"
                :border="false"
                required
            ></field>
            <field v-model="password" :label="t('Password.password')" :border="false" required></field>
        </div>
        <div class="type-config" v-else>
            <field v-model="IPv4Address" :label="t('Network.IPAddress')" placeholder="192.168.1.1" required></field>
            <field v-model="netmask" :label="t('Network.subnetMask1')" placeholder="255.255.255.0" required></field>
            <field v-model="gateway" :label="t('Network.gatewayAddress')" placeholder="192.168.0.100" required></field>
            <field :label="t('Network.DNSAddress')" placeholder="8.8.8.8" required></field>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import { Field } from "vant"
import SelectPicker from "./SelectPicker"
const { t } = useI18n()
const typeList = ["DHCP", "PPPoE", t("Network.staticNet")]
const userName = ref("")
const password = ref("")
const IPv4Address = ref("")
const netmask = ref("")
const gateway = ref("")
const dnsList = ref([])

const props = defineProps({
    selectedInterface: {
        type: String,
        default: ""
    },
    interfaceList: {
        type: Array,
        default: () => []
    },
    selectedType: {
        type: String,
        default: "DHCP"
    },
    selectedCfg: {
        type: Object,
        default: () => {
            return {
                userName: "",
                password: "",
                IPv4Address: "",
                netmask: "",
                gateway: "",
                dnsList: []
            }
        }
    }
})

if (props.selectedType == "PPPoE") {
    userName.value = props.selectedCfg.userName
    password.value = props.selectedCfg.password
} else if (props.selectedType == t("Network.staticNet")) {
    IPv4Address.value = props.selectedCfg.IPv4Address
    netmask.value = props.selectedCfg.netmask
    gateway.value = props.selectedCfg.gateway
    dnsList.value = props.selectedCfg.dnsList
}

let selectedInterface = ref(props.selectedInterface)
let selectedType = ref(props.selectedType)

const userInterface = (e) => {
    selectedInterface.value = e
}

const userType = (e) => {
    selectedType.value = e
}

const returnData = () => {
    const data = {
        interface: selectedInterface,
        type: selectedType,
        config: {}
    }

    if (data.type.value == "PPPoE") {
        data.config.userName = userName
        data.config.password = password
    } else if (data.type.value == t("Network.staticNet")) {
        data.config.IPv4Address = IPv4Address
        data.config.netmask = netmask
        data.config.gateway = gateway
        data.config.dnsList = []
    }

    return data
}

defineExpose({
    returnData
})

</script>

<style scoped>
    .init-network .type-config {
        padding: 10px 0;
        margin-top: 10px;
        background: #f9f9f9;
    }
    .init-network .type-config :deep(.van-cell) {
        background: #f9f9f9;
    }
    .init-network .type-config :deep(.van-field) {
        padding-top: 5px;
        padding-bottom: 5px;
        height: 52px;
        line-height: 40px;
    }
    .init-network .type-config :deep(.van-field__label) {
        width: 65px;
    }
    .init-network .type-config :deep(.van-field__control) {
        border: 1px solid #9e9e9e;
        border-radius: 4px;
        width: 225px;
    }
    .init-network .type-dhcp {
        text-align: center;
    }
</style>