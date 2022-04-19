<template>
    <box-title :titleName='t("DevInfo.poeinfotitle")'></box-title>
    <div class="poe-info">
         <div class="content">
             <div class="content-row" :style="{'flex':'1 90px'}">
                <div class="data-div" :style="{'width':'89px'}">
                    <div class="content-col" :style="{'width':'87px','margin-left':'-5px'}">
                        <div class="dot-div">
                            <div class="content-dot cpu-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ sMaxPowerTitle }}</span>
                    </div>
                    <div class="content-col">
                        <span :style="dataStyle">{{ coreData.maxpower }}</span>
                        <span :style="dataUnitStyle"> W </span>
                    </div>
                </div>
             </div>
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class=" content-dot store-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ sCusumePowerTitle }}</span>
                    </div>
                    <div class="content-col" >
                        <span :style="dataStyle">{{ coreData.cosumepower }}</span>
                        <span :style="dataUnitStyle"> W </span>
                    </div>
                </div>

             </div>
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class="content-dot uprate-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ sAveragePowerTitle }}</span>
                    </div>
                    <div class="content-col" :style="dataUnitStyle">
                        <span :style="dataStyle">{{ coreData.averagepower }}</span>
                        <span :style="dataUnitStyle"> W </span>
                    </div>
                </div>

             </div>
             <div class="content-row">
                <div class="data-div">
                    <div class="content-col">
                        <div class="dot-div">
                            <div class="content-dot downrate-dot"></div>
                        </div>
                        <span class="content-title" :style="titleStyle">{{ t("DevInfo.downrate") }}</span>
                    </div>
                    <div class="content-col" :style="dataUnitStyle">
                        <span :style="dataStyle">{{ coreData.summitpower }}</span>
                        <span :style="dataUnitStyle"> W </span>
                    </div>
                </div>

             </div>
         </div>
    </div>
</template>

<script setup>
import { ref,defineProps } from "vue"
import { useI18n } from "vue-i18n"
import { useRoute } from "vue-router"
import BoxTitle from "@/components/BoxTitle"

const router = useRoute()
console.log(router.params)
const { t } = useI18n()

const props = defineProps(["coreData"])
const sMaxPowerTitle = t("DevInfo.max") + t("DevInfo.powerup") + t("DevInfo.power")
const sCusumePowerTitle = t("DevInfo.consume") + t("DevInfo.power")
const sAveragePowerTitle = t("DevInfo.average") + t("DevInfo.power")

let coreData = ref({ ...props.coreData }) || ref({})
coreData = ref({
    "maxpower": "280",
    "cosumepower": "200",
    "averagepower":"150",
    "summitpower":"200"
})

const dataStyle = {
    "font-size":"16px",
    "color":"#333333",
    "font-weight":"Bold",
    "margin-left":"-25px"
}

const dataUnitStyle = {
    "font-size":"11px",
    "color":"#333333",
    "font-weight":"Bold",
    "margin-top":"3px"
}

const titleStyle = {
    // "width": "77px",
    // "height": "13px",
    "font-size": "13px",
    "font-family": "PingFang SC",
    "font-weight": "500",
    "color": "#666666",
}

</script>

<style scoped>

  .poe-info {
      width: 375px;
      height: 90px;
      display: flex;
      align-items: center;
      background-color: #FFFFFF;
      justify-content: center;
  }

  .poe-info .content {
      width: 345px;
      height: 60px;
      background-color: #f9f9f9;
      display: flex;
  }

 .poe-info .content .content-row{
     flex:1;
     height: 60px;
     display: flex;
     justify-content: center;
     align-items: center;
  }

  .poe-info .content .content-row:nth-child(2)::before,
  .poe-info .content .content-row:nth-child(3)::before,
  .poe-info .content .content-row:nth-child(4)::before{
        content: "";
        width: 1px;
        height: 40px;
        background:#D8D8D8;
        display: inline-block;
        float: left;
        margin-left: -1px;
   }

/*.poe-info .content .content-row:nth-child(3) .data-div,*/
  .poe-info .content .content-row .data-div{
      margin-left: 10px;
  }

   .poe-info .content  .content-row .data-div {
        display: flex;
        flex-direction: column;
        height: 37px;
        width: 77px;
   }

   .poe-info .content  .content-row .data-div .content-col {
        flex: 1 32px;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
   }

    .poe-info .content .content-row .content-col .dot-div{
        display: inline-block;
        line-height: 10px;
        height: 10px;
        margin:0;
        padding:0;
        margin-bottom: 4px;
        margin-right: 4px;
    }
 .poe-info .content .content-row .content-col .content-title{
      line-height: 10px;
      height: 10px;
      width: 82px;
  }

  .poe-info .content .content-row .content-col .cpu-dot{
      background: #F43E3B;
  }

 .poe-info .content .content-row .content-col .content-dot{
      width: 5px;
      height: 5px;
      border-radius: 50%;
      display:inline-block ;
  }

  .poe-info .content .content-row .content-col .store-dot  {
      background: #00AF6D;

  }
  .poe-info .content .content-row .content-col .uprate-dot  {
      background: #617CF0;
  }
  .poe-info .content .content-row .content-col .downrate-dot  {
      background: #FF6A38;
  }
</style>