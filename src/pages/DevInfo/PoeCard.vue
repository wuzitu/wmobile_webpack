<template>
    <div class="PoeCardWrap">
        <poe-port></poe-port>
        <poe-info :coreData="coreData"></poe-info>
        <port-list :model="sModel" :portList="aPort" :title="sTitle"></port-list>
    </div>
</template>

<script setup>
import { defineProps, ref, toRef } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import PoeInfo from "./PoeInfo"
import PortList from "./PortList"
import PoePort from "./PoePort"

const { t } = useI18n()
const router = useRouter()
const props = defineProps(["devData"])
// console.log(router.params)  ChartData: Array

let coreData = ref({})

coreData = Object.assign({}, props.devData)
let aTimes = ref(["00:00", "06:00", "08:00", "12:00", "18:00", "24:00"])
let aData = [0, 40, 50, 100, 75, 70, 65]

let sModel = props.devData.index
let sTitle = ref("")
sTitle = t("DevInfo.PoeInftConfig")

let aPort = ref([
    { name: "G1/0/1", type: "LAN", status: "1", isolate: "0", aggretation: "0", powerup: "0", PVID: "1", vlanid: "2", inrate: "0.02", outrate: "0.54", inerror: "1000", outerror: "110", curporwer: "123" },
    { name: "G1/0/2", type: "LAN", status: "0", isolate: "0", aggretation: "0", powerup: "0", PVID: "1", vlanid: "2", inrate: "0.02", outrate: "0.54", inerror: "1000", outerror: "110", curporwer: "123" },
    { name: "G1/0/3", type: "LAN", status: "0", isolate: "0", aggretation: "0", powerup: "0", PVID: "1", vlanid: "2", inrate: "0.02", outrate: "0.54", inerror: "1000", outerror: "110", curporwer: "123" },
    { name: "G1/0/4", type: "LAN", status: "0", isolate: "0", aggretation: "0", powerup: "0", PVID: "1", vlanid: "2", inrate: "0.02", outrate: "0.54", inerror: "1000", outerror: "110", curporwer: "123" },
    { name: "G1/0/5", type: "WAN", status: "0", isolate: "0", aggretation: "0", powerup: "0", PVID: "1", vlanid: "2", inrate: "0.02", outrate: "0.54", inerror: "1000", outerror: "110", curporwer: "123" }
])

/**
    ["00:00",0],
    ["06:00",40],
    ["08:00",50],
    ["12:00",75],
    ["18:00",70],
    ["24:00",65]
 */
</script>

<style scoped>
.PoeCardWrap {
    width: 375px;
    height: auto;
    overflow: auto;
}
</style>
