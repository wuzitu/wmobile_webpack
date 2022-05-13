<template>
    <div class="port-flow">
        <box-title :titleName="t('DevInfo.portflowtend')">
            <div class="right-btn" @click="switchToHistory">
                <span class="right-text" style="{ 'font-size':14px;'color':'#66666';}">{{ t("DevInfo.allhistory") }}</span>
                <svg-icon class="ic_arrow" icon-class="ic_arrow"></svg-icon>
            </div>
        </box-title>
        <div class="port-content">
            <div class="operate">
                <div class="select-port">
                    <p
                        class="select-title"
                        style="
                             {
                                'font-size':'14px','color': '#333333';
                            }
                        "
                    >
                        {{ t("DevInfo.interface") }} :
                    </p>
                    <div class="select-block" @click="seletPort">
                        <span
                            class="selected-port"
                            style="
                                 {
                                    'font-size':'14px','color': '#333333';
                                }
                            "
                        >
                            {{ sSelectedPort }}
                        </span>
                        <svg-icon class="select-arrow" icon-class="ic_arrow_down"></svg-icon>
                    </div>
                </div>
                <div class="switch-type" @click="changeType" v-if="isChangePortType">
                    <span style="{'font-size': '14px'}">{{ t("DevInfo.changeto")}} {{ portType }}</span>
                </div>
            </div>
            <flow-chart class="flow-chart" :aLegend="aLegend" :aUpLink="aUpLink" :aDownLink="aDownLink" :aTimes="aTimes" sYName="Mbps"></flow-chart>
        </div>
        <van-popup v-model:show="showPortName" position="bottom" :style="{ height: '30%' }">
            <van-picker v-model="sSelectedPort" :columns="aPortColumn" @confirm="onConfirmPort" @cancel="onCancelPort" @change="onChangePort" columns-field-names="portname" :confirm-button-text="t('Apply')" :cancel-button-text="t('Cancel')" show-toolbar="true"></van-picker>
        </van-popup>
    </div>
</template>

<script setup>
import { defineProps, ref, provide, inject, computed } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Dialog, Popup as VanPopup, Picker as VanPicker, Toast } from "vant"
import BoxTitle from "@/components/BoxTitle"
import SvgIcon from "@/components/SvgIcon"
import FlowChart from "@/components/FlowChart.vue"

const { t } = useI18n()

const router = useRouter()
console.log(router.params)
const props = defineProps({ portIndex: String, tabName: String })

let aLegend = ref([t("DevInfo.uprate"), t("DevInfo.downrate")])
let aUpLink = ref([])
let aDownLink = ref([])
let aTimes = ref([])
let aPortColumn = ref([])
let sPort = ref("")
let showPortName = ref(false)
let portType = ref("WAN")
let sSelectedPort = ref("")
let isChangePortType = computed(() => props.tabName == "dev_lan")

aDownLink.value = ["0", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"]
aUpLink.value = ["0", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"]
aTimes.value = ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]

let oChartData = {
    "All": {
        downlink: ["100", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    },
    "LAN(UP)": {
        downlink: ["100", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    },
    "LAN3(UP)": {
        downlink: ["100", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "35", "52", "0", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    },
    "LAN2(UP)": {
        downlink: ["0", "50", "60", "48", "35", "100", "65", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    },
    "WAN(UP)": {
        downlink: ["100", "50", "60", "49", "35", "52", "95", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "25", "92", "65", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    },
    "WAN2(UP)": {
        downlink: ["0", "50", "60", "48", "35", "52", "65", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "35", "52", "100", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    },
    "WAN3(UP)": {
        downlink: ["0", "50", "60", "49", "35", "52", "100", "73", "69", "64", "72", "100", "85"],
        uplink: ["0", "50", "60", "48", "25", "92", "65", "73", "69", "64", "72", "100", "85"],
        aTimes: ["00:00", "03:00", "06:00", "07:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "24:00"]
    }
}

const aHistory = [
    { "IfIndex":"2","RecordTime":"1651044239","Name":"GigabitEthernet1/0/1","InPkts":"4406","OutPkts":"599","InOctets":"577115","OutOctets":"72429" },{ "IfIndex":"2","RecordTime":"1651044539","Name":"GigabitEthernet1/0/1","InPkts":"5257","OutPkts":"580","InOctets":"632430","OutOctets":"50785" },{ "IfIndex":"2","RecordTime":"1651044839","Name":"GigabitEthernet1/0/1","InPkts":"5274","OutPkts":"561","InOctets":"633993","OutOctets":"49985" },
    { "IfIndex":"2","RecordTime":"1651045139","Name":"GigabitEthernet1/0/1","InPkts":"6412","OutPkts":"915","InOctets":"701948","OutOctets":"91970" },
    { "IfIndex":"2","RecordTime":"1651045439","Name":"GigabitEthernet1/0/1","InPkts":"4367","OutPkts":"559","InOctets":"552674","OutOctets":"49392" },
    { "IfIndex":"2","RecordTime":"1651045739","Name":"GigabitEthernet1/0/1","InPkts":"4836","OutPkts":"708","InOctets":"609774","OutOctets":"58800" },{ "IfIndex":"2","RecordTime":"1651046039","Name":"GigabitEthernet1/0/1","InPkts":"4477","OutPkts":"597","InOctets":"594625","OutOctets":"72033" },{ "IfIndex":"2","RecordTime":"1651046339","Name":"GigabitEthernet1/0/1","InPkts":"4790","OutPkts":"568","InOctets":"603701","OutOctets":"50784" },
    { "IfIndex":"2","RecordTime":"1651046639","Name":"GigabitEthernet1/0/1","InPkts":"4710","OutPkts":"550","InOctets":"593745","OutOctets":"48849" },
    { "IfIndex":"2","RecordTime":"1651046939","Name":"GigabitEthernet1/0/1","InPkts":"5946","OutPkts":"567","InOctets":"679140","OutOctets":"49695" },
    { "IfIndex":"2","RecordTime":"1651047239","Name":"GigabitEthernet1/0/1","InPkts":"6653","OutPkts":"4758","InOctets":"896310","OutOctets":"5584771" },
    { "IfIndex":"2","RecordTime":"1651047539","Name":"GigabitEthernet1/0/1","InPkts":"10871","OutPkts":"12119","InOctets":"1378579","OutOctets":"16149088" },{ "IfIndex":"3","RecordTime":"1651044239","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651044539","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651044839","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651045139","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651045439","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651045739","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651046039","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651046339","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651046639","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651046939","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651047239","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"3","RecordTime":"1651047539","Name":"GigabitEthernet1/0/2","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651044239","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651044539","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651044839","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651045139","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651045439","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651045739","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651046039","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651046339","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651046639","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651046939","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651047239","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"4","RecordTime":"1651047539","Name":"GigabitEthernet1/0/3","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651044239","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651044539","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651044840","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651045139","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651045439","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651045739","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651046039","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651046339","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651046640","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651046939","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651047239","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"5","RecordTime":"1651047539","Name":"GigabitEthernet1/0/4","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651044239","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651044539","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651044840","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651045139","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651045439","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651045739","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651046039","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651046339","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651046640","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651046939","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651047239","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"6","RecordTime":"1651047539","Name":"GigabitEthernet1/0/5","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651044239","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651044539","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651044840","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651045139","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651045439","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651045739","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651046039","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651046339","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651046640","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651046939","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651047239","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"7","RecordTime":"1651047539","Name":"GigabitEthernet1/0/6","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651044239","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651044539","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651044840","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651045139","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651045439","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651045739","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651046039","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651046339","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651046640","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651046939","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651047239","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"8","RecordTime":"1651047539","Name":"GigabitEthernet1/0/7","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651044239","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651044539","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651044840","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651045139","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651045439","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651045739","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651046039","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651046339","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651046640","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651046939","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651047239","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"9","RecordTime":"1651047539","Name":"GigabitEthernet1/0/8","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651044239","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651044539","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651044840","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651045139","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651045439","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651045739","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651046039","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651046339","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651046640","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651046939","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651047239","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"10","RecordTime":"1651047539","Name":"GigabitEthernet1/0/9","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651044239","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651044539","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651044840","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651045139","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651045439","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651045739","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651046039","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651046339","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651046640","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651046939","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651047239","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"11","RecordTime":"1651047539","Name":"GigabitEthernet1/0/10","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651044239","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651044539","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651044840","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651045139","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651045439","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651045739","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651046039","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651046339","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651046640","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651046939","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651047239","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"12","RecordTime":"1651047539","Name":"GigabitEthernet1/0/11","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651044239","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651044539","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651044840","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651045139","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651045439","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651045739","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651046039","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651046339","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651046640","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651046939","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651047239","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"13","RecordTime":"1651047539","Name":"GigabitEthernet1/0/12","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651044239","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651044540","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651044840","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651045139","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651045439","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651045740","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651046039","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651046339","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651046640","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651046939","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651047239","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"14","RecordTime":"1651047539","Name":"GigabitEthernet1/0/13","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651044239","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651044540","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651044840","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651045140","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651045439","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651045740","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651046039","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651046340","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651046640","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651046940","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651047239","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"15","RecordTime":"1651047539","Name":"GigabitEthernet1/0/14","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651044240","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651044540","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651044840","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651045140","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651045439","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651045740","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651046039","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651046340","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651046640","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651046940","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651047239","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"16","RecordTime":"1651047540","Name":"GigabitEthernet1/0/15","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651044240","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651044540","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651044840","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651045140","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651045439","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651045740","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651046040","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651046340","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651046640","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651046940","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651047240","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"17","RecordTime":"1651047540","Name":"GigabitEthernet1/0/16","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651044240","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651044540","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651044840","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651045140","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651045440","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651045740","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651046040","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651046340","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651046640","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651046940","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651047240","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"18","RecordTime":"1651047540","Name":"GigabitEthernet1/0/17","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651044240","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651044540","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651044840","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651045140","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651045440","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651045740","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651046040","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651046340","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651046640","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651046940","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651047240","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"19","RecordTime":"1651047540","Name":"GigabitEthernet1/0/18","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651044240","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651044540","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651044840","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651045140","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651045440","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651045740","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651046040","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651046340","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651046640","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651046940","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651047240","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"20","RecordTime":"1651047540","Name":"GigabitEthernet1/0/19","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651044240","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651044540","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651044840","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651045140","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651045440","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651045740","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651046040","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651046340","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651046640","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651046940","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651047240","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"21","RecordTime":"1651047540","Name":"GigabitEthernet1/0/20","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651044240","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651044540","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651044840","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651045140","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651045440","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651045740","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651046040","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651046340","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651046640","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651046940","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651047240","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"22","RecordTime":"1651047540","Name":"GigabitEthernet1/0/21","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651044240","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651044540","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651044840","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651045140","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651045440","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651045740","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651046040","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651046340","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651046640","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651046940","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651047240","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"23","RecordTime":"1651047540","Name":"GigabitEthernet1/0/22","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651044240","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651044540","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651044840","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651045140","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651045440","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651045740","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651046040","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651046340","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651046640","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651046940","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651047240","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"24","RecordTime":"1651047540","Name":"GigabitEthernet1/0/23","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651044240","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651044540","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651044840","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651045140","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651045440","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651045740","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651046040","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651046340","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651046640","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651046940","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651047240","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"25","RecordTime":"1651047540","Name":"GigabitEthernet1/0/24","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651044240","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651044540","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651044840","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651045140","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651045440","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651045740","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651046040","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651046340","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651046640","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651046940","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651047240","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"26","RecordTime":"1651047540","Name":"Ten-GigabitEthernet1/0/25","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651044240","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651044540","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651044840","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651045140","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651045440","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651045740","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651046040","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651046340","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651046640","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651046940","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651047240","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"27","RecordTime":"1651047540","Name":"Ten-GigabitEthernet1/0/26","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651044240","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651044540","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651044840","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651045140","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651045440","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651045740","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651046040","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651046340","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651046640","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651046940","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651047240","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"28","RecordTime":"1651047540","Name":"Ten-GigabitEthernet1/0/27","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651044240","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651044540","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651044840","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651045140","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651045440","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651045740","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651046040","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651046340","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651046640","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651046940","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651047240","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"29","RecordTime":"1651047540","Name":"Ten-GigabitEthernet1/0/28","InPkts":"0","OutPkts":"0","InOctets":"0","OutOctets":"0" },
    { "IfIndex":"63","RecordTime":"1651044240","Name":"Vlan-interface1","InPkts":"4184","OutPkts":"409","InOctets":"549233","OutOctets":"46743" },
    { "IfIndex":"63","RecordTime":"1651044540","Name":"Vlan-interface1","InPkts":"5045","OutPkts":"391","InOctets":"606625","OutOctets":"25255" },
    { "IfIndex":"63","RecordTime":"1651044840","Name":"Vlan-interface1","InPkts":"4932","OutPkts":"367","InOctets":"596156","OutOctets":"23979" },
    { "IfIndex":"63","RecordTime":"1651045140","Name":"Vlan-interface1","InPkts":"5765","OutPkts":"1229","InOctets":"629474","OutOctets":"85132" },
    { "IfIndex":"63","RecordTime":"1651045440","Name":"Vlan-interface1","InPkts":"4151","OutPkts":"369","InOctets":"526299","OutOctets":"24170" },
    { "IfIndex":"63","RecordTime":"1651045740","Name":"Vlan-interface1","InPkts":"3992","OutPkts":"1008","InOctets":"510305","OutOctets":"52988" },
    { "IfIndex":"63","RecordTime":"1651046040","Name":"Vlan-interface1","InPkts":"4284","OutPkts":"410","InOctets":"569192","OutOctets":"46789" },
    { "IfIndex":"63","RecordTime":"1651046340","Name":"Vlan-interface1","InPkts":"4533","OutPkts":"373","InOctets":"572269","OutOctets":"24694" },
    { "IfIndex":"63","RecordTime":"1651046640","Name":"Vlan-interface1","InPkts":"4477","OutPkts":"359","InOctets":"564122","OutOctets":"23407" },
    { "IfIndex":"63","RecordTime":"1651046940","Name":"Vlan-interface1","InPkts":"5743","OutPkts":"377","InOctets":"653978","OutOctets":"24339" },
    { "IfIndex":"63","RecordTime":"1651047240","Name":"Vlan-interface1","InPkts":"6422","OutPkts":"4594","InOctets":"868538","OutOctets":"5578377" },
    { "IfIndex":"63","RecordTime":"1651047540","Name":"Vlan-interface1","InPkts":"10654","OutPkts":"11906","InOctets":"1351868","OutOctets":"16038913" }
]


let oDevTime = { "nDevTime":1651047645,"nUpTime":1205310,"nDevOffsetTime":480 }
let Index = ref("")

const toStrTime = (nTime) => {
    return nTime < 10 ? "0" + nTime : "" + nTime
}

const getShowTime = (nRecordTime, oDeviceTime) => {
    let oTime = {}
    let sHouTime = "", sMinTime = "", sSecTime = ""
    let nCurTimezoneOffset = new Date().getTimezoneOffset()
    let nDevOffsetTime = oDeviceTime.nDevOffsetTime

    if(0 == nRecordTime)
    {
        nRecordTime = oDeviceTime.nDevTime
    }

    nRecordTime = (Number(nRecordTime) + (nCurTimezoneOffset + nDevOffsetTime) * 60) * 1000
    oTime = new Date(nRecordTime)
    sHouTime = toStrTime(oTime.getHours())
    sMinTime = toStrTime(oTime.getMinutes())
    sSecTime = toStrTime(oTime.getSeconds())

    return sHouTime + ":" + sMinTime + ":" + sSecTime
}

let sUnit = ref("KB")
let nKbps = 1024 * 300
let nMbps = 1024 * nKbps
let nGbps = 1024 * nMbps
let nUnit = nKbps
let aCurData = []
let oFlowData = {
    aInOctets:[],
    aOutOctets: []
}
let aTimesArr = []

for(let i = 0; i < aHistory.length; i++)
{
    let oCurData = aHistory[i]
    let nRecordTime = Number(oCurData.RecordTime)
    let nLeadTime = 60 * 60

    if((Index == oCurData.IfIndex) && (nRecordTime <= oDevTime.nDevTime) && (nRecordTime > oDevTime.nDevTime - nLeadTime))
    {
        let nInOctetFlows = oCurData.InOctets * 8
        let nOutOctetFlows = oCurData.OutOctets * 8

        if("GB" != sUnit && (Math.floor(nInOctetFlows / nGbps) > 0) || (Math.floor(nOutOctetFlows / nGbps) > 0))
        {
            sUnit = "GB"
            nUnit = nGbps
        }
        else if("GB" != sUnit && "MB" != sUnit && (Math.floor(nInOctetFlows / nMbps) > 0 || Math.floor(nOutOctetFlows / nMbps) > 0))
        {
            sUnit = "MB"
            nUnit = nMbps
        }

        aTimesArr.push(getShowTime(nRecordTime, oDevTime))
        aCurData.push(aHistory[i])
    }
}

if(!aCurData.length)
{
    oFlowData.aInOctets.push(0)
    oFlowData.aOutOctets.push(0)
    aTimesArr.push(getShowTime(0, oDevTime))
}
else if(aCurData.length < 12)
{
    oFlowData.aInOctets.push(0)
    oFlowData.aOutOctets.push(0)
    aTimesArr.unshift(getShowTime(aCurData[0].RecordTime - 300, oDevTime))
}

for(let i = 0; i < aCurData.length; i++)
{
    oFlowData.aInOctets.push((aCurData[i].InOctets * 8 / nUnit).toFixed(2))
    oFlowData.aOutOctets.push((aCurData[i].OutOctets * 8 / nUnit).toFixed(2))
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

const onCancelPort = () => {}

const onChangePort = () => {}

const changeType = (newValue) => {
    Dialog.confirm({
        title: t("CONFIRM_WINDOW"),
        message: t("DevInfo.IfChangePortType")
    }).then(() => {
        portType.value = portType.value == "WAN" ? "LAN" : "WAN"
        if (portType.value == "LAN") {
            aPortColumn.value = ["All","WAN(UP)", "WAN2(UP)", "WAN3(UP)"]
        } else {
            aPortColumn.value = ["All","LAN(UP)", "LAN2(UP)", "LAN3(UP)"]
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

const switchToHistory = () => {
    router.push({ name: "History" })
}
</script>

<style scoped>
.port-flow {
    width: 375px;
    height: 250px;
    background-color: #ffffff;
}

.right-btn {
    width: auto;
    height: inherit;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
    display: inline-block;
    float: right;
    text-align: center;
    vertical-align: middle;
    line-height: inherit;
}

.right-text {
    display: inline-block;
    height: 13px;
    min-width: 86px;
    overflow:hidden;
    height: inherit;
}
.ic_arrow {
    width: 12px;
    height: inherit;
    display: inline-block;
    
}

.port-content {
    width: 345px;
}
.flow-chart {
    background-color: #ffffff;
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

.operate .select-port .select-title {
    display: inline-block;
    height: inherit;
    width: 36px;
    margin: 0;
    padding: 0;
}
.operate .select-port .select-block {
    display: inline-block;
    height: inherit;
    width: fit-content;
    margin: 0;
    padding: 0;
}
.operate .select-port .select-block .selected-port {
    display: inline-block;
    height: inherit;
    width: 70px;
}
.operate .select-port .select-block .select-arrow {
    display: inline-block;
    height: 12px;
    width: 12px;
    padding-left: 1px;
    margin: -1px auto;
}
.switch-type {
    padding: 0;
    margin: 0;
    display: inline-block;
    float: right;
    color: #617cf0;
    font-size: 14px;
}
</style>
