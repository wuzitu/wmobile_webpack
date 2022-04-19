<template>
   <div class="tabCardWrap">
        <dev-card :devData="oTabData" v-if="index == 'dev_dashboard'"></dev-card>
        <wan-card :devData="oTabData" v-if="index == 'dev_wan'"></wan-card>
        <lan-card :devData="oTabData" v-if="index == 'dev_lan'"></lan-card>
        <vlan-card :devData="oTabData" :devName="sDevname" v-if="index == 'dev_vlan'"></vlan-card>
        <poe-card :devData="oTabData" v-if="index == 'poe'"></poe-card>
        <ap-card :devData="oTabData" v-if="index == 'ap_dashboard'"></ap-card>
        <radio-card  :devData="oTabData" v-if="index == 'ap_radio'"></radio-card>
        <client-card  :devData="oTabData" v-if="index == 'ap_client'"></client-card>
        <port-card  :devData="oTabData" v-if="index == 'ap_port'"></port-card>
   </div>
</template>

<script setup>
import { ref,defineProps } from "vue"
import { useRoute } from "vue-router"
import ApCard from "./ApdashboardCard"
import ClientCard from "./ClientCard" //可引用  后期上传后替换
import RadioCard from "./RadioCard"
import PortCard from "./PortCard"
import DevCard from "./DevdashCard"
import LanCard from "./LanCard"
import WanCard from "./WanCard"
import PoeCard from "./PoeCard"
// import VlanCard from "../../pages/Vlan/Index" //后期上传后替换
import VlanCard from "./VlanCard"

const router = useRoute()
console.log(router.params)

const props = defineProps({
    tabData: Object
})

const oTabData = props.tabData || {}
const index = ref(oTabData.index) || ref("")
const sDevname = ref(oTabData.devName) || ref("")


// const index

</script>


<style scoped>
.deviceCardWrap {
    height: auto;
    width: auto;

}
</style>
