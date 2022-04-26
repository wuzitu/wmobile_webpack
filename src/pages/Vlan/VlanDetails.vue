<template>
    <vlan-card></vlan-card>
    <device-card>
         <template #device-title>
            <span>{{ t("Vlan.devicePort") }}</span>
        </template>
    </device-card>
    <dhcp-card></dhcp-card>
</template>

<script setup>
import { ref } from "vue"
import { useI18n } from "vue-i18n"
import VlanCard from "./VlanCard"
import DeviceCard from "./DeviceCard"
import DhcpCard from "./DhcpCard"
const { t } = useI18n()
</script>

<style scoped>
.deviceHeader span {
    padding-left: 15px;
    color: #333333;
    font-family: "Microsoft YaHei";
}
</style>