<template>
   <div class="tabCardWrap">
        <dev-card :devData="oTabData" v-if="isShowDevDash"></dev-card>
        <wan-card :devData="oTabData" v-if="isShowDevWan"></wan-card>
        <lan-card :devData="oTabData" :tabName="index" v-if="isShowInterCard"></lan-card>
        <vlan-card :devData="oTabData" :devName="sDevname" v-if="isShowDevVlan"></vlan-card>
        <poe-card :devData="oTabData" v-if="isShowDevPoe"></poe-card>
        <ap-card :devData="oTabData" v-if="isShowAPDash"></ap-card>
        <radio-card  :devData="oTabData" v-if="isShowAPRadio"></radio-card>
        <client-card  :devData="oTabData" v-if="isShowAPClient"></client-card>
        <!--<port-card  :devData="oTabData" v-if="index == 'ap_port'"></port-card>-->
   </div>
</template>

<script setup>
import { ref,defineProps ,computed} from "vue"
import { useRoute } from "vue-router"
import ApCard from "./ApdashboardCard"
import ClientCard from "./ClientCard" //可引用  后期上传后替换
import RadioCard from "./RadioCard"
// import PortCard from "./PortCard"
import DevCard from "./DevdashCard"
import LanCard from "./LanCard"
import WanCard from "./WanCard"
import PoeCard from "./PoeCard"
import VlanCard from "@/pages/Vlan/Index" //后期上传后替换

const router = useRoute()
console.log(router.params)

const props = defineProps({
    tabData: Object
})

const oTabData = props.tabData || {}
const index = ref(oTabData.index) || ref("")
const sDevname = ref(oTabData.devName) || ref("")

const isShowInterCard = computed(()=>(index.value == 'dev_lan' || index.value == 'ap_port'))
const isShowDevDash = computed(()=>(index.value == 'dev_dashboard'))
const isShowDevWan = computed(()=>(index.value == 'dev_wan'))
const isShowDevVlan = computed(()=>(index.value == 'dev_vlan'))
const isShowDevPoe = computed(()=>(index.value == 'poe'))
const isShowAPDash = computed(()=>(index.value == 'ap_dashboard'))
const isShowAPRadio = computed(()=>(index.value == 'ap_radio'))
const isShowAPClient = computed(()=>(index.value == 'ap_client'))
console.log(isShowInterCard)

</script>


<style scoped>
.deviceCardWrap {
    height: auto;
    width: auto;

}
</style>
