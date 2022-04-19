<template>
  <div class="devbg">
	<div class="img_device_bg">
        <div class="shadow"></div>
        <div class="device">
            <div class="dev-detail">
                <div class ="upDownModule" v-for="item in aTemplatePorts" :key="item">
                    <div class="upModule">
                        <div class="portModule" v-show="ifIndex" v-for="{ifIndex,ifName,ifType,Status,PoeStatus} in item[0]" :title="ifName" :key="ifIndex">
                            <svg-icon class="portImg" :icon-class="[sTypeClass[ifType],sStatusClass[Status],sPoeStatusClass[PoeStatus]]"></svg-icon>
                            <span>{{ ifName }}</span>
                        </div>
                    </div>
                    <div class="downModule" v-show="item[1] && item[1].length">
                        <div class="portModule" v-show="ifIndex" v-for="{ifIndex,ifName,ifType,Status,PoeStatus}  in item[1]" :title="ifName" :key="ifIndex">
                            <svg-icon class="portImg" :icon-class="sPortType"></svg-icon>
                            <span>{{ ifName  }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

  </div>
</template>
<script setup>
import { appendFile } from "fs"
import { defineProps, ref ,computed,reactive ,toRef} from "vue"
import { useRoute } from "vue-router"
import SvgIcon from "@/components/SvgIcon"
import imgDeviceBg from "@/frame/assets/icon/img_device_bg.svg"
const route = useRoute()
const userData = ref()
console.log(route.params)
//route.params.aports ||
let aports = reactive([])
// route.params.arrPortPos ||
let arrPortPos = reactive([])
let sStatusClass = reactive(["on","off","adm"])
let sTypeClass = reactive(["elec","light"])
let sPoeStatusClass = reactive(["poe-on","poe-off","poe-elec","poe-bad","poe-unsupport"])
// { "ifIndex":"6","ifName":"LAN 6","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"7","ifName":"LAN 7","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"8","ifName":"LAN 8","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"9","ifName":"LAN 9","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"10","ifName":"LAN 10","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"11","ifName":"LAN 11","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"12","ifName":"LAN 12","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"13","ifName":"LAN 13","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"14","ifName":"LAN 14","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"15","ifName":"LAN 15","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"16","ifName":"LAN 16","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"17","ifName":"LAN 17","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"18","ifName":"LAN 18","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"19","ifName":"LAN 19","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"20","ifName":"LAN 20","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"21","ifName":"LAN 21","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"22","ifName":"LAN 22","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"23","ifName":"LAN 23","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"24","ifName":"LAN 24/WAN 3","ifType":"1","Status":"1","PoeStatus":"0" },
// { "ifIndex":"25","ifName":"WAN 1","ifType":"1","Status":"2","PoeStatus":"0" },
// { "ifIndex":"26","ifName":"WAN 2","ifType":"1","Status":"1","PoeStatus":"0" }
aports = ref([
    { "ifIndex":"1","ifName":"LAN 1","ifType":"1","Status":"1","PoeStatus":"0" ,"sPortType":"ic_port_up" },
    { "ifIndex":"2","ifName":"LAN 2","ifType":"1","Status":"1","PoeStatus":"0" ,"sPortType":"ic_port_up" },
    { "ifIndex":"3","ifName":"LAN 3","ifType":"1","Status":"2","PoeStatus":"0" ,"sPortType":"ic_port_adm" },
    { "ifIndex":"4","ifName":"LAN 4","ifType":"1","Status":"2","PoeStatus":"0" ,"sPortType":"ic_port_down" },
    { "ifIndex":"5","ifName":"LAN 5","ifType":"1","Status":"1","PoeStatus":"0" ,"sPortType":"ic_poe_powering" },

])
arrPortPos = toRef({
    port: [
        [
            { ifnum: 1, ifcount: 5, step: 1 },
            // { ifnum: 2, ifcount: 4, step: 2 },
        ],

    ],
})

// [
//     { ifnum: 9, ifcount: 4, step: 2 },
//     { ifnum: 10, ifcount: 4, step: 2 },
// ],
// [
//     { ifnum: 17, ifcount: 4, step: 2 },
//     { ifnum: 18, ifcount: 4, step: 2 },
// ],
// [
//     { ifnum: 25, ifcount: 0, step: 0 },
//     { ifnum: 25, ifcount: 2, step: 1 },
// ],

let oDrawPorts = {}

for(let i = 0;i < aports.length;i++)
{
    let sIndex = aports[i]["ifIndex"]
    console.log(sIndex)
    if(!oDrawPorts[sIndex]){
        oDrawPorts[sIndex] = aports[i]
    }
}

let aTemplatePorts = reactive([])

for(let i = 0;i < arrPortPos["port"].length;i++)
{
    let aItem = arrPortPos["port"][i]
    let aItemOut = []
    for(let k = 0;k < aItem.length;k++){
        let aItemInside = []
        for(let j = aItem[k].ifnum; j <= aItem[k].ifnum - 1 + aItem[k].ifcount * aItem[k].step; j += aItem[k].step)
        {
            let sIndex = "" + j
            aItemInside.push(oDrawPorts[sIndex])
        }
        aItemOut.push(aItemInside)
    }
    aTemplatePorts.push(aItemOut)
}

console.log(aTemplatePorts)
</script>

<style scoped>
.img_device_bg {
  width: auto;
  height: auto;
  background: url(../../frame/assets/img/img_device_bg.svg) no-repeat;
  background-size: contain;
  display:block;
}

.img_device_bg .shadow{
    width: inherit;
    height: 16.6%;
    display: block;
}

.img_device_bg .device{
    width: 345px;
    min-height: 70px;
    display: block;
    margin: 0 auto;
    vertical-align: center;
    /*  */
}

.img_device_bg .device .dev-detail{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
}

.img_device_bg .upDownModule{
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
    flex-wrap: wrap;
    /* border: 1px blue solid; */
    flex-shrink:1;
    flex-basis: fit-content;
    justify-content: center;
}

.img_device_bg .upModule{
    flex: 1  20px;
    display: flex;
    flex-direction: row;
    flex-grow: 0;
    flex-wrap: wrap;
    border: 1px black solid;
    flex-shrink:1;
    flex-basis: fit-content;
    /* justify-content: space-around; */
}

.img_device_bg .downModule{
    flex: 1  20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    flex-grow: 0;
    border: 1px black solid;
    flex-shrink:1;
    flex-basis: fit-content;
    /* justify-content: space-around; */
}

.img_device_bg .portModule{
    flex:1;
    /* border: 1px  seagreen solid; */
    flex-shrink:1;
    flex-grow: 0;
    /* flex-basis: fit-content; */
    align-self:center;
    display: flex;
    justify-content: center;
    flex-direction: column;
    /* border: 1px lightblue solid; */
    flex-basis: min-content;
}

.img_device_bg .portModule .portImg{
    width:10px;
    height:10px;
    border: 1px darkorchid solid;
    display: inline-block;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
}

.img_device_bg .portModule span{
    width: 20px;
    height: 20px;
    /* border: 1px red solid; */
    display: inline-block;
    flex-wrap: wrap;
    font-size: 0.0005px;
    justify-content: center;
    margin: 0 auto;
    padding: 0;
}
.devbg {
  width: 375px;
  height: 200px;
}

.lackAngle {
  position: relative;
  height: 20px;
}

.lackAngle::before {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    right: 0;
    bottom: 0;
    border: 5px solid #fff;
    border-top-color: transparent;
    border-left-color: transparent;
}

.lackAngle::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    left: 0;
    top: 0;
    border: 5px solid #fff;
    border-bottom-color: transparent;
    border-right-color: transparent;
}
</style>
