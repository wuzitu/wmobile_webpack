<template>
    <div class="port-chart-legend">
        <span class="title-span" style="font-size:12px;">{{ sDiagram }}</span>
        <div class="legendBtn">
            <Icon name="question-o" color="#617CF0"></Icon>
            <span class="btn-span" style="font-size:12px;color:#617CF0;" @click="viewLegend">{{ sLegend }}</span>
        </div>
    </div>
    <Dialogs class="Dlg" v-model:show="show" width="335" height="134" :confirmButtonText="getRcStr('known')"
            confirmButtonColor="#617CF0" :title="getRcStr('legendDlgTitle')"
    >
        <div class="standPos">
            <div class="legendDlg">
                <div class="legend-line">
                    <div class="legend-content" :class="{en:bIfEn}" v-for="(item, index)  in aPortStatus" :key="index">
                        <svg-icon v-if="item.showIcon" :icon-class="item.name" class="port-icon" :class="item.classname"></svg-icon>
                        <div v-if="!item.showIcon" class="port-dot port-icon" :class="item.classname">
                                <div :class="`${item.classname}_dot Status`"></div>
                        </div>
                        <div class="icontext">
                            <span>{{ item.text }}</span>
                        </div>
                    </div>
                </div>
                <div class="legend-line">
                    <div class="legend-content" :class="{en:bIfEn}" v-for="(item, index) in aPoeStatus" :key="index">
                        <svg-icon v-if="item.showIcon" :icon-class="item.name" class="port-icon" :class="item.classname"></svg-icon>
                        <div class="icontext" :class="{long:item.long}">
                            <span>{{ item.text }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Dialogs>
</template>

<script setup>
import { defineProps, ref ,reactive } from "vue"
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { Icon, Dialog } from "vant"
import SvgIcon from "../../components/SvgIcon.vue"
import Cookies from "js-cookie"

const { t } = useI18n()
// const router = useRouter()
// console.log(router.params)
// const propsData = defineProps({ apName: String })
const Dialogs = Dialog.Component
let show = ref(false)
let bIfEn = ref(false)
let lang = Cookies.get("lang")
bIfEn.value = lang == "en" ? true : false

const getRcStr = (str) => {
    let sModule = `DevInfo.${str}`
    return t(sModule)
}

const sLegend = ref(getRcStr("legendDlgTitle"))
const sDiagram = ref(getRcStr("portLegend"))

const aPortStatus = ref([
    { "name":"UP","text":getRcStr("UP"),"classname":"UP", "showIcon":false ,"long":false },
    { "name":"DOWN","text":getRcStr("DOWN"),"classname":"Down", "showIcon":false,"long":false },
    { "name":"ADM","text":getRcStr("ADM") ,"classname":"adm", "showIcon":false ,"long":false },
    { "name":"ic_port_e","text":getRcStr("OpticalPort"),"classname":"elec", "showIcon":true ,"long":false },
    { "name":"ic_lightport_e","text":getRcStr("ElectricalPort") ,"classname":"optical", "showIcon":true ,"long":false }
])

const aPoeStatus = ref([
    { "name":"ic_poe_powering_e","text":getRcStr("PowerUping") ,"classname":"powering", "showIcon":true ,"long":false },
    { "name":"ic_poe_poweron_e","text":getRcStr("PoEOpened") ,"classname":"poweron", "showIcon":true ,"long":false },
    { "name":"ic_poe_poweroff_e","text":getRcStr("PoEClosed") ,"classname":"poweroff-e", "showIcon":true ,"long":false },
    { "name":"ic_poe_fault_e","text":getRcStr("BreakDown") ,"classname":"poe-fault-e", "showIcon":true ,"long":false },
    { "name":"ic_poe_unsupport_e","text":getRcStr("NonsupportPoE") ,"classname":"poe-unsupport-e", "showIcon":true ,"long":false },
])

const viewLegend = () => {
    show.value = true
    // Dialog.alert({
    //     title: getRcStr("legendDlgTitle"),
    // }).then(() => {

    // })
}

</script>

<style scoped>
.port-chart-legend {
    width: 100%;
    height: 36px;
    min-width: 345px;
    margin: 20px 10px 20px 10px;
    position:relative;
    color: #333;
    top:50%;
    margin: 0px;
    padding: 0px;
}

.port-chart-legend .title-span {
    display: inline-block;
    margin-left: 0px;
}

.port-chart-legend .legendBtn {
    display: inline-block;
    float: right;
}

.standPos {
    width: 335px;
    height: 134px;
    border-bottom: #D8D8D8 1px solid;
    border-top:#D8D8D8 1px solid;
}
.legendDlg {
    display: flex;
    flex-direction:column;
    height: inherit;
    width: 279px;
    height: 77px;
    margin: 25px  28px  32px 28px;

}

.legendDlg .legend-line {
    flex:1;
    display: flex;
    width: inherit;
    flex-direction: row;
}

.legendDlg .legend-line .legend-content{
    flex:1;
    display: flex;
    width: inherit;
    flex-direction: column;
    text-align: center;
    vertical-align: middle;
    margin: 0 auto;
}

.legendDlg .legend-line .legend-content.en {
   flex: 1 87.44px;
}

.legendDlg .legend-line .legend-content .icontext{
    flex:1;
    display: flex;
    flex-direction: column;
    margin-right: 5px;
}


.legendDlg .legend-line .legend-content .port-icon{
    padding-left: 15px;
    width: 21px;
    height: 19px;
}
.legendDlg .legend-line .legend-content .port-dot .Status{
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.legendDlg .legend-line .legend-content .port-dot .Status.UP_dot{
    background: #00AF6D;
}

.legendDlg .legend-line .legend-content .port-dot .Status.Down_dot{
    background: #999999;
}


.legendDlg .legend-line .legend-content .port-dot .Status.adm_dot{
    background: #F43E3B;
}

.legendDlg .legend-line .legend-content .port-dot .Status{
    width: 12px;
    height: 12px;
    border-radius: 50%;
}

.legendDlg .legend-line .legend-content.en svg.svg-icon.port-icon.poe-fault-e.port-icon.poe-fault-e {
    padding-left: 5px;
}
.legendDlg .legend-line .legend-content.en svg.svg-icon.port-icon.poe-unsupport-e.port-icon.poe-unsupport-e {
    padding-left: 35px;
}


:deep(.van-dialog__header) {
    padding-top: 5px;
}
</style>
