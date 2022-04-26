<template>
    <div class="port-flow">
       <box-title :titleName="t('DevInfo.portflowtend')">
            <div class="right-btn">
                <span class="right-text" style="{ 'font-size':14px;'color':'#66666'}"> {{ t("DevInfo.allhistory") }}</span>
                <svg-icon class="ic_arrow" icon-class="ic_arrow"></svg-icon>
            </div>
       </box-title>
       <div class="port-content">
            <div class="operate">
                <div class="select-port">
                    <p class="select-title" style="{'font-size': '14px', 'color':'#333333'}">{{ t("DevInfo.interface")}} :</p>
                    <div class="select-block" @click="seletPort">
                        <span class="selected-port" style="{'font-size': '14px', 'color':'#333333'}">{{ sSelectedPort }}</span>
                        <svg-icon class="select-arrow" icon-class="ic_arrow_down"></svg-icon>
                    </div>
                </div>
                <div class="switch-type" @click="changeType" v-if="isChangePortType">
                    <span style="{'font-size': '14px'}">{{t("DevInfo.changeto")}}{{portType}}</span>
                </div>
            </div>
            <flow-chart class="flow-chart" :aLegend="aLegend" :aUpLink="aUpLink" :aDownLink="aDownLink" :aTimes="aTimes"></flow-chart>
       </div>
       <van-popup v-model:show="showPortName" position="bottom" :style="{ height: '30%' }">
            <van-picker v-model="sSelectedPort" :columns="aPortColumn" @confirm="onConfirmPort" @cancel="onCancelPort" @change="onChangePort" columns-field-names="portname" :confirm-button-text="t('Apply')" :cancel-button-text="t('Cancel')" show-toolbar="true"></van-picker>
       </van-popup>
    </div>
</template>

<script setup>
import { defineProps,ref,provide,inject ,computed} from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Dialog , Popup as VanPopup , Picker as VanPicker,Toast} from "vant"
import BoxTitle from "@/components/BoxTitle"
import SvgIcon from "@/components/SvgIcon"
import FlowChart from "./FlowChart.vue"

const { t } = useI18n()

const router = useRouter()
console.log(router.params)
const props = defineProps({ portIndex: String ,tabName:String})

let aLegend = ref([t("DevInfo.uprate"),t("DevInfo.downrate")])
let aUpLink = ref([])
let aDownLink = ref([])
let aTimes = ref([])
let aPortColumn = ref([])
let sPort = ref("")
let showPortName = ref(false)
let portType = ref("LAN")
let sSelectedPort = ref("")
let isChangePortType = computed(()=>props.tabName == "dev_lan")

aDownLink.value = ["0","50","60", "48","35","52","65","73","69","64","72","100","85"]
aUpLink.value = ["0","50","60", "48","35","52","65","73","69","64","72","100","85"]
aTimes.value = ["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]

let oChartData = {
    "LAN(UP)":{
        "downlink":["100","50","60", "48","35","52","65","73","69","64","72","100","85"],
        "uplink": ["0","50","60", "48","35","52","65","73","69","64","72","100","85"],
        "aTimes":["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
    },
    "LAN3(UP)":{
        "downlink":["100","50","60", "48","35","52","65","73","69","64","72","100","85"],
        "uplink": ["0","50","60", "48","35","52","0","73","69","64","72","100","85"],
        "aTimes":["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
    },
    "LAN2(UP)":{
        "downlink":["0","50","60", "48","35","100","65","73","69","64","72","100","85"],
        "uplink": ["0","50","60", "48","35","52","65","73","69","64","72","100","85"],
        "aTimes":["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
    },
    "WAN(UP)":{
        "downlink":["100","50","60", "49","35","52","95","73","69","64","72","100","85"],
        "uplink": ["0","50","60", "48","25","92","65","73","69","64","72","100","85"],
        "aTimes":["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
    },
    "WAN2(UP)":{
        "downlink":["0","50","60", "48","35","52","65","73","69","64","72","100","85"],
        "uplink": ["0","50","60", "48","35","52","100","73","69","64","72","100","85"],
        "aTimes":["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
    },
    "WAN3(UP)":{
        "downlink":["0","50","60", "49","35","52","100","73","69","64","72","100","85"],
        "uplink": ["0","50","60", "48","25","92","65","73","69","64","72","100","85"],
        "aTimes":["00:00","03:00","06:00", "07:00","08:00","10:00","12:00","14:00","16:00","18:00","20:00","24:00"]
    }
}

aPortColumn = ref(["LAN(UP)", "LAN2(UP)", "LAN3(UP)"])

sSelectedPort.value = aPortColumn.value[0]

const onConfirmPort = (newValue) => {
    showPortName.value = false
    sSelectedPort.value = newValue
    aUpLink.value = oChartData[newValue]["uplink"]
    aDownLink.value = oChartData[newValue]["downlink"]
    aTimes.value = oChartData[newValue]["aTimes"]
}

const onCancelPort = () => {

}

const onChangePort = () => {}

const changeType = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangePortType")
    }).then(() => {
        portType.value = portType.value == "WAN" ? "LAN" : "WAN"
        if (portType.value == "WAN") {
            aPortColumn.value = ["WAN(UP)", "WAN2(UP)", "WAN3(UP)"]
        } else {
            aPortColumn.value = ["LAN(UP)", "LAN2(UP)", "LAN3(UP)"]
        }
        sSelectedPort.value = aPortColumn.value[0]
        aUpLink.value = oChartData[sSelectedPort.value]["uplink"] || []
        aDownLink.value = oChartData[sSelectedPort.value]["downlink"] || []
        aTimes.value = oChartData[sSelectedPort.value]["aTimes"]
        Toast(t("SET_SUCCESS"))
    })
}


const seletPort = () => {
    showPortName.value = true
}
</script>

<style scoped>
   .port-flow {
       width: 375px;
       height: 250px;
       background-color: #FFFFFF;
   }

   .right-btn {
        width: 98px;
        height: 13px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #666666;
        display: inline-block;
        float: right;
   }

   .right-text {
       display: inline-block;
       width: 86px;
   }
   .ic_arrow{
       width: 12px;
       height: 12px;
       display: inline-block;
   }
   .flow-chart {
       background-color: #FFFFFF;
   }

   .operate {
      width: 345px;
      height: 20px;
      padding: 0 16px;
      display: block;
      margin-top: 15px;
   }

   .operate .select-port {
       display: inline-block;
       height: inherit;
       width: 120px;
       float: left;
   }

    .operate .select-port .select-title{
       display: inline-block;
       height: inherit;
       width: 36px;
       margin: 0;
       padding: 0;
   }
   .operate .select-port .select-block{
       display: inline-block;
       height: inherit;
       width: fit-content;
       margin: 0;
       padding: 0;
   }
    .operate .select-port .select-block .selected-port{
       display: inline-block;
       height: inherit;
       width: 70px;
   }
    .operate .select-port .select-block .select-arrow{
       display: inline-block;
       height: 12px;
       width: 12px;
       padding-left: 1px;
       margin: -1px auto
   }
   .switch-type {
        padding:0;
        margin: 0;
        display: inline-block;
        float: right;
        color: #617cf0;
        font-size: 14px;
    }
</style>
