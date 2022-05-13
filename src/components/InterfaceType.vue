<template>
    <!-- 上网口 -->
    <div class="config-box">
        <slot name="interface-title"></slot>
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
        <div class="type-config type-pppoe" v-else-if="selectedType == typeList[1]">
            <field
                v-model="userName"
                :label="t('Password.account')"
                :border="false"
                placeholder="account"
                required
            ></field>
            <password-field
                :password="password"
                :label="t('Password.password')"
                :border="false"
                placeholder="password"
                @changePassword="pppoePassword"
            ></password-field>
        </div>
        <div class="type-config type-static" v-else>
            <field
                v-model="IPv4Address"
                :label="t('Network.IPAddress')"
                :border="false"
                placeholder="192.168.1.1"
                required
            ></field>
            <field
                v-model="netmask"
                :label="t('Network.subnetMask1')"
                :border="false"
                placeholder="255.255.255.0"
                required
            ></field>
            <field
                v-model="gateway"
                :label="t('Network.gatewayAddress')"
                :border="false"
                placeholder="192.168.0.100"
                required
            ></field>
            <multi-input
                ref="multiDns"
                :label="t('Network.DNSAddress')"
                :dataList="dnsList"
                placeholder="8.8.8.8"
                :maxCount="6"
                :maxToast="t('Network.maxDnsTips').replace(/\d/, props.maxDns)"
                :border="false"
            ></multi-input>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { useI18n } from "vue-i18n"
import { Field } from "vant"
import SelectPicker from "./SelectPicker"
import PasswordField from "./PasswordField"
import MultiInput from "./MultiInput"
import InterfaceType from "../frame/utils/InterfaceType/InterfaceType"

const { t } = useI18n()
const typeList = ref(["DHCP", "PPPoE", t("Network.staticNet")])
const userName = ref("")
const password = ref("")
const IPv4Address = ref("")
const netmask = ref("")
const gateway = ref("")
const dnsList = ref([""])

const props = defineProps({
    selectedInterface: {
        type: String,
        default: ""
    },
    interfaceList: {
        type: Array,
        default: () => []
    },
    typeList: {
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
                dnsList: [""]
            }
        }
    },
    maxDns: {
        type: Number,
        default: 0
    }
})

typeList.value = props.typeList == [] ? typeList.value : typeList.value

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

// 接收子组件端口
const userInterface = (e) => {
    selectedInterface.value = e
}

// 接收子组件上网方式
const userType = (e) => {
    selectedType.value = e
}

// 接收子组件pppoe password
const pppoePassword = (e) => {
    password.value = e
}

// 获取子组件dns数据
const multiDns = ref()
const getDns = () => {
    return multiDns.value.returnData()
}

onMounted(async() => {
    const interfaceData = InterfaceType.initInterface()
    console.log(interfaceData)
})

const returnData = () => {
    const data = {
        interface: selectedInterface,
        type: selectedType,
        config: {}
    }

    if (data.type.value == "DHCP") {
        // const dataInterface = InterfaceType.dhcpData
        // console.log(dataInterface)
    } else if (data.type.value == "PPPoE") {
        // const dataInterface = InterfaceType.pppoeData(userName, password)
        // console.log(dataInterface)
        data.config.userName = userName
        data.config.password = password
    } else if (data.type.value == t("Network.staticNet")) {
        // const dataInterface = InterfaceType.staticIPData(IPv4Address, netmask, gateway, getDns())
        // console.log(dataInterface)
        data.config.IPv4Address = IPv4Address
        data.config.netmask = netmask
        data.config.gateway = gateway
        data.config.dnsList = getDns()
    }

    return data
}

defineExpose({
    returnData
})

</script>

<style scoped>
    .type-config {
        padding: 10px 0;
        margin-top: 10px;
        background: #f9f9f9;
    }
    .type-config :deep(.van-cell) {
        background: #f9f9f9;
    }
    .type-config :deep(.van-field) {
        padding: 5px;
        padding-bottom: 5px;
        height: 52px;
        line-height: 40px;
    }
    .type-config :deep(.van-field__body) {
        border: 1px solid #9e9e9e;
        border-radius: 4px;
        padding-right: 5px;
    }
    .type-pppoe :deep(.van-field__body) {
        width: 250px;
    }
    .type-pppoe :deep(.van-field__label) {
        color: #333;
        width: 45px;
    }
    .type-static :deep(.van-field__body) {
        width: 230px;
    }
    .type-static :deep(.van-field__label) {
        color: #333;
        width: 65px;
    }
    .type-config :deep(.van-field__control) {
        padding-left: 5px;
    }
    .type-dhcp {
        text-align: center;
    }

</style>