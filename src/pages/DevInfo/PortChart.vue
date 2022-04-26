<template>
    <!--<canvas class="port-canvas" :ref="canvasRef" :width="canvasWidth"  :height="canvasHeight" :style="portCanvasStyle"></canvas>-->
        <div class="img_device_bg">
            <div class="shadow"></div>
            <div class="device">
                <div :class ="{'upDownModule': isPortMore2Row , 'centerModule': isPortLess2Row}" v-for="item in aTemplatePorts" :key="item">
                    <div :class ="{'upModule': isPortMore2Row , 'middleModule': isPortLess2Row ,'margin-top2':isPortMore2Row}">
                        <div class="portModule" v-show="item" v-for="ifItem in item[0]" :title="ifItem.ifName" :key="ifItem.ifIndex">
                            <div class="porttag">
                                <span class="portspan" style="font-size: 2px;">{{ ifItem.ifName }}</span>
                            </div>
                            <div class="portImg ic_port_s" :class="{
                                'ic_port_down': ifItem.ifType == '1' && ifItem.Status == '0',
                                'ic_port_up':ifItem.ifType == '1' && ifItem.Status == '1',
                                'ic_port_adm':ifItem.ifType == '1' && ifItem.Status == '2',
                                'ic_lightport_down': ifItem.ifType == '2' && ifItem.Status == '0',
                                'ic_lightport_up':ifItem.ifType == '2' && ifItem.Status == '1',
                                'ic_lightport_adm':ifItem.ifType == '2' && ifItem.Status == '2',
                                }"></div>
                                <span class="poe-icon" :class="{
                                    'ic_poe_powering':bshowPoe && ifItem.PoeStatus == '2',
                                    'ic_poe_poweron':bshowPoe && ifItem.PoeStatus == '1',
                                    'ic_poe_poweroff':bshowPoe && ifItem.PoeStatus == '0',
                                    'ic_poe_fault':bshowPoe && ifItem.PoeStatus == '4',
                                    'ic_poe_unsupport':bshowPoe && ifItem.PoeStatus == '5',
                                }">
                                </span>
                        </div>
                    </div>
                    <div :class ="{'downModule':true,'margin-top2':isPortMore2Row}" v-show="isPortMore2Row && item[1] && item[1].length">

                        <div class="portModule"  v-show="item" v-for="ifItem in item[1]" :title="ifItem.ifName" :key="ifItem">
                                                   <!--(PoeStatus,Status,ifIndex,ifName,ifType)-->
                            <div class="portImg  ic_port_s" :class="{
                                'ic_port_down': ifItem.ifType == '1' && ifItem.Status == '0',
                                'ic_port_up':ifItem.ifType == '1' && ifItem.Status == '1',
                                'ic_port_adm':ifItem.ifType == '1' && ifItem.Status == '2',
                                'ic_lightport_down': ifItem.ifType == '2' && ifItem.Status == '0',
                                'ic_lightport_up':ifItem.ifType == '2' && ifItem.Status == '1',
                                'ic_lightport_adm':ifItem.ifType == '2' && ifItem.Status == '2',
                                'transform180': item[0].length > 0
                                }"></div>
                            <span class="poe-icon" :class="{
                                'ic_poe_powering':bshowPoe && ifItem.PoeStatus == '2',
                                'ic_poe_poweron':bshowPoe && ifItem.PoeStatus == '1',
                                'ic_poe_poweroff':bshowPoe && ifItem.PoeStatus == '0',
                                'ic_poe_fault':bshowPoe && ifItem.PoeStatus == '4',
                                'ic_poe_unsupport':bshowPoe && ifItem.PoeStatus == '5',
                                }"></span>
                            <div class="porttag">
                                <span class="portspan" style="font-size: 2px;">{{ ifItem.ifName }}</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
    </div>
</template>
<script setup>
import { appendFile } from "fs"
import { defineProps, ref ,computed,reactive ,toRef,onMounted } from "vue"
import { useRoute } from "vue-router"
import SvgIcon from "@/components/SvgIcon"

const route = useRoute()
const userData = ref()
console.log(route.params)
let aTestPorts = reactive(route.params.aTestPorts || [])
let arrPortPos = reactive(route.params.arrPortPos || [])
let bshowPoe = ref(true)

// let canvasRef = ref(null)
// let canvasWidth = ref(345)
// let canvasHeight = ref(70)

// let portCanvasStyle = {
//     "width": "345px",
//     "height": "70px"
// }

// const ctx = canvasRef.value.getContext("2d")
// ctx.clearRect(0,0,canvasWidth.value,canvasHeight.value)

aTestPorts = [
    { "ifIndex":"1","ifName":"1","ifType":"1","Status":"0","PoeStatus":"1" },
    { "ifIndex":"2","ifName":"2","ifType":"1","Status":"1","PoeStatus":"2" },
    { "ifIndex":"3","ifName":"3","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"4","ifName":"4","ifType":"1","Status":"2","PoeStatus":"3" },
    { "ifIndex":"5","ifName":"5","ifType":"1","Status":"1","PoeStatus":"3" },
    { "ifIndex":"6","ifName":"6","ifType":"1","Status":"1","PoeStatus":"0" },
    { "ifIndex":"7","ifName":"7","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"8","ifName":"8","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"9","ifName":"9","ifType":"1","Status":"1","PoeStatus":"4" },
    { "ifIndex":"10","ifName":"10","ifType":"1","Status":"1","PoeStatus":"0" },
    { "ifIndex":"11","ifName":"11","ifType":"1","Status":"1","PoeStatus":"1" },
    { "ifIndex":"12","ifName":"12","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"13","ifName":"13","ifType":"1","Status":"0","PoeStatus":"0" },
    { "ifIndex":"14","ifName":"14","ifType":"1","Status":"2","PoeStatus":"2" },
    { "ifIndex":"15","ifName":"15","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"16","ifName":"16","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"17","ifName":"17","ifType":"1","Status":"1","PoeStatus":"4" },
    { "ifIndex":"18","ifName":"18","ifType":"1","Status":"1","PoeStatus":"0" },
    { "ifIndex":"19","ifName":"19","ifType":"1","Status":"1","PoeStatus":"5" },
    { "ifIndex":"20","ifName":"20","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"21","ifName":"21","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"22","ifName":"22","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"23","ifName":"23","ifType":"1","Status":"2","PoeStatus":"0" },
    { "ifIndex":"24","ifName":"24","ifType":"1","Status":"1","PoeStatus":"0" },
    { "ifIndex":"25","ifName":"1","ifType":"2","Status":"2","PoeStatus":"0" },
    { "ifIndex":"26","ifName":"2","ifType":"2","Status":"1","PoeStatus":"0" }
]
// aTestPorts = [
//     { "ifIndex":"1","ifName":"LAN1","ifType":"1","Status":"0","PoeStatus":"1" },
//     { "ifIndex":"2","ifName":"LAN2","ifType":"1","Status":"1","PoeStatus":"2" },
//     { "ifIndex":"3","ifName":"LAN3","ifType":"1","Status":"2","PoeStatus":"0" },
//     { "ifIndex":"4","ifName":"LAN4","ifType":"1","Status":"2","PoeStatus":"3" },
//     { "ifIndex":"5","ifName":"LAN5","ifType":"2","Status":"1","PoeStatus":"3" }
// ]
arrPortPos = {
    port: [
        // [
        //     [1,2,3,4]
        // ],
        // [
        //     [5]
        // ]
        [
            [1,3,5,7],
            [2,4,6,8]
        ],
        [
            [9,11,13,15],
            [10,12,14,16]
        ],
        [
            [17,19,21,23],
            [18,20,22,24]
        ],
        [
            [],
            [25,26]
        ]
    ],
}


let moduleStyle = ref({})
let deviceWidth = 325

// onMounted(()=>{
//     // $nextTick(function () {
//     //     // ����������ͼ������Ⱦ֮��Ż����еĴ���
//         let nArryLen = arrPortPos["port"].length
//         console.log(document.querySelector(".img_device_bg .device").clientWidth)
//         let moduleWidth = ref(Math.ceil(document.querySelector(".img_device_bg .device").clientWidth / nArryLen ))
//         moduleStyle = {
//             'width':  moduleWidth.value + "px"
//         }
//     // })
// })

let nArryLen = arrPortPos["port"].length
let moduleWidth = computed(() => Math.ceil(deviceWidth / nArryLen))
moduleStyle = {
    "width":  moduleWidth.value + "px"
}


let isPortLess2Row = computed(() => {
    return aTestPorts.length < 8
})

let isPortMore2Row = computed(() => !isPortLess2Row.value)

console.log(isPortLess2Row)
let oDrawPorts = {}

for(let i = 0;i < aTestPorts.length;i++)
{
    let sIndex = aTestPorts[i]["ifIndex"]
    console.log(sIndex)
    if(!oDrawPorts[sIndex]){
        oDrawPorts[sIndex] = aTestPorts[i]
    }
}

let aTemplatePorts = ref([])
arrPortPos["port"].forEach((moduleItem) => {
    let aModule = []
    moduleItem.forEach((updownItem) => {
        let aUpdown = []
        updownItem.forEach((portItem) => {
            aUpdown.push(oDrawPorts[portItem])
        })

        aModule.push(aUpdown)
    })
    aTemplatePorts.value.push(aModule)
})


console.log(aTemplatePorts)

</script>

<style scoped>
.img_device_bg {
  height: 90px;
  background: url(../../frame/assets/img/panelsvg/img_device_bg.svg) no-repeat 0 0 ;
  background-size: 100% 100%;
  display:flex;
  flex-direction: column;
  min-width: 345px;
  vertical-align: center;
}


.img_device_bg .shadow{
    width: inherit;
    min-width: 345px;
    flex: 1;
}

.img_device_bg .device{
    width: fit-content;
    flex: 4;
    max-height:  80px;
    margin-left: 10px;
    overflow-x: auto;
    white-space:nowrap;
    padding-right: 20px;
}
.img_device_bg .device .device-details {
    width: inherit;
    height: inherit;

}
.img_device_bg .device .upDownModule,.img_device_bg .device .centerModule{
    display: inline-flex;
    flex-direction: column;
    height: inherit;
    flex-wrap: nowrap;
    width: fit-content;
    margin-left:10px;
}

.margin-top2 {
   margin-top: 5px;
}

.img_device_bg .device .upDownModule .upModule{
    width: fit-content;
    flex: 1;
    position: relative;
    display: flex;

}

.img_device_bg .device .upDownModule .downModule{
    width: fit-content;
    flex: 1;
    position: relative;
    display: flex;
}


.img_device_bg .device .portModule {
    flex:1;
    position: relative;
    min-width: 21px;
    min-height: 16px;
    height: fit-content;
    width: fit-content;
    vertical-align: bottom;
    display: inline-block;
}


.img_device_bg .device .portModule .porttag {
    min-width: 7.1px;
    min-height: 18px;
    width:fit-content;
    height: fit-content;

}

.img_device_bg .device .portModule .porttag span {
}

.img_device_bg .device .portModule .portImg{
    background-size: 100% 100%;
    position: absolute;
    z-index: 2;
}

.img_device_bg .device .portModule span.poe-icon{
    background-size: 100% 100%;
    position: absolute;
    z-index: 2;
}


/*------------------------------------------------------------------------------------*/
.img_device_bg .device .centerModule{
   text-align: center;
   vertical-align: middle;
   min-width: 90px;
   line-height: 32px;
   display: inline-block;

}
.img_device_bg .centerModule .middleModule{

    vertical-align: middle;

}

.img_device_bg .device  .centerModule  .portModule {
    height: 45px;
    min-width: 26px;
    width: 35px;
}

.img_device_bg .device .centerModule  .portModule  .portImg{
    width: 21px;
    height: 19px;
}

.img_device_bg .device .centerModule  .portModule  .porttag{
    left: 0px;
    padding: 0;
    position: absolute;
}

.img_device_bg .device .centerModule  .portModule  .poe-icon{
    min-width: 12px;
    min-height: 12px;
}

.img_device_bg .device  .middleModule  .portModule {

}
.img_device_bg .device .middleModule .portModule .portImg{
    top:16px;
    left: 9px;
}

.img_device_bg .device .middleModule .portModule .porttag{
      top:25px;
    left: 6px;

}

.img_device_bg .device .middleModule .portModule span.poe-icon{
    top:20px;
    left: 13px;
}

/*-------------------------------------------------------------------------------------*/

.img_device_bg .device  .updownModule  .portModule {
    height: 45px;
    min-width: 21px;
}

.img_device_bg .device .upDownModule  .portModule  .portImg{
    min-width: 18px;
    min-height: 16px;
}

.img_device_bg .device .upDownModule  .portModule  .porttag{
    left: 8px;
    padding: 0;
    position: absolute;
}

.img_device_bg .device .upDownModule  .portModule  .poe-icon{
    min-width: 12px;
    min-height: 12px;
}

.img_device_bg .device  .upModule  .portModule {

}
.img_device_bg .device .upModule .portModule .portImg{
    top:16px;
    left: 4px;
}

.img_device_bg .device .upModule .portModule .porttag{


}

.img_device_bg .device .upModule .portModule span.poe-icon{
    top:18px;
    left: 7px;
}
.img_device_bg .device .downModule .portModule .portImg{
    top:20px;
}

/*
.img_device_bg .device .portModule  .upDownModule .portImg.ic_port_s {
    // width:42.3px;
    // height:40px;
}
*/


.img_device_bg .device .downModule .portModule .porttag {
    position: absolute;
    top:30px;
    padding: 0;

}

.img_device_bg .device  .downModule  .portModule {

}
.img_device_bg .device .downModule .portModule .portImg{
    top:15px;
    left: 4px;

}

.img_device_bg .device .downModule .portModule span.poe-icon{
    top:17px;
    left: 7px;
}

.img_device_bg .device .portModule  .downModule .portImg.ic_port_s {
    width:42.3px;
    height:40px;
}

.img_device_bg .device .portModule .portImg.transform180 {
    transform: rotate(180deg);
}


.img_device_bg .portModule .portImg.ic_port_s {
    background: url(../../frame/assets/img/panelsvg/ic_port_s.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .portImg.ic_port_adm {
    background: url(../../frame/assets/img/panelsvg/ic_port_adm.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .portImg.ic_port_down {
    background: url(../../frame/assets/img/panelsvg/ic_port_down.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .portImg.ic_port_up {
    background: url(../../frame/assets/img/panelsvg/ic_port_up.svg) no-repeat 0 0;
    background-size: 100% 100%;
}


.img_device_bg .portModule .portImg.ic_lightport_adm {
    background: url(../../frame/assets/img/panelsvg/ic_lightport_adm.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .portImg.ic_lightport_down {
    background: url(../../frame/assets/img/panelsvg/ic_lightport_down.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .portImg.ic_lightport_up {
    background: url(../../frame/assets/img/panelsvg/ic_lightport_up.svg) no-repeat 0 0;
    background-size: 100% 100%;
}


.img_device_bg .portModule .poe-icon.ic_poe_powering {
    background: url(../../frame/assets/img/panelsvg/ic_poe_powering.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .poe-icon.ic_poe_poweroff {
    background: url(../../frame/assets/img/panelsvg/ic_poe_poweroff.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .poe-icon.ic_poe_poweron {
    background: url(../../frame/assets/img/panelsvg/ic_poe_poweron.svg) no-repeat 0 0;
    background-size: 100% 100%;
}

.img_device_bg .portModule .poe-icon.ic_poe_fault {
   /* background: url(../../frame/assets/img/ic_port_fault.svg) no-repeat 0 0;*/
   background: url(../../frame/assets/img/panelsvg/ic_fault.svg) no-repeat 0 0;
   background-size: 100% 100%;
}

.img_device_bg .portModule .poe-icon.ic_poe_unsupport {
    /*background: url(../../frame/assets/img/ic_port_fault.svg) no-repeat 0 0;*/
     background: url(../../frame/assets/img/panelsvg/ic_unsupport.svg) no-repeat 0 0;
     background-size: 100% 100%;
}
</style>

